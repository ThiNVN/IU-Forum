const connection = require('../configuration/database');
const Topic = require('../models/TopicModel');
const Thread = require('../models/threadModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

class Search {
    static async searchByCategory(category_input) {
        const dbConnection = await connection.getConnection();
        try {
            const [categories] = await dbConnection.query(
                `SELECT * 
                 FROM category
                 WHERE name LIKE ? OR description LIKE ?`,
                [`%${category_input}%`, `%${category_input}%`]
            );

            const result = [];

            for (const category of categories) {
                const topics = await Topic.getTopicsByCategoryID(category.ID);

                const listTopics = await Promise.all(topics.map(async (topic) => {
                    const countThreads = await Thread.countThreadByTopicID(topic.ID);
                    return {
                        id: topic.ID,
                        title: topic.title,
                        description: topic.description,
                        threadCount: countThreads,
                        lastActivity: topic.last_activity
                    };
                }));

                result.push({
                    id: category.ID,
                    title: category.name,
                    description: category.description,
                    topics: listTopics
                });
            }

            return result;
        } catch (err) {
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async searchByTopic(topic_input) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [topics] = await dbConnection.query(
                `SELECT * 
                 FROM topic
                 WHERE title LIKE ? OR description LIKE ?`,
                [`%${topic_input}%`, `%${topic_input}%`]
            );

            const result = [];

            for (const t of topics) {
                const threads = await Thread.getNormalThreadByTopicID(t.ID);

                const listThreads = await Promise.all(threads.map(async (thread) => {
                    const countReply = await Comment.countCommentByThreadID(thread.ID);
                    const author = await User.getUserByID(thread.user_id);
                    return {
                        id: thread.ID,
                        title: thread.title,
                        author: author[0].username,
                        createdAt: thread.create_at,
                        lastActivity: thread.last_activity,
                        replyCount: countReply === 0 ? (thread.responses - 1) : (countReply - 1),
                        description: thread.description
                    };
                }));

                result.push({
                    title: t.title,
                    description: t.description,
                    threads: listThreads
                });
            }

            return result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async searchByTag(tag_input) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [rows] = await dbConnection.query(
                `SELECT thread.*
                 FROM thread
                 INNER JOIN topic ON thread.topic_id = topic.ID
                 INNER JOIN category ON topic.category_id = category.ID
                 INNER JOIN category_tag ON category.ID = category_tag.category_id
                 INNER JOIN tag ON category_tag.tag_id = tag.ID
                 WHERE tag.name LIKE ?`,
                [`%${tag_input}%`]
            );
            return rows;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async searchByThreadTitle_User(thread_input, username_input) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Base SQL
            let sql = `
                SELECT thread.*
                FROM thread
                INNER JOIN topic ON thread.topic_id = topic.ID
                INNER JOIN category ON topic.category_id = category.ID
                INNER JOIN user ON thread.user_id = user.ID
                WHERE thread.title LIKE ?
            `;

            const params = [`%${thread_input}%`];

            // Add optional username filter
            if (username_input && username_input.trim() !== '') {
                sql += ` AND user.username LIKE ?`;
                params.push(`%${username_input}%`);
            }

            const [rows] = await dbConnection.query(sql, params);

            await dbConnection.commit();
            return rows;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
    static async searchByUser(username_input) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Base SQL
            const [rows] = await dbConnection.query(`
                SELECT thread.*
                FROM thread
                INNER JOIN topic ON thread.topic_id = topic.ID
                INNER JOIN category ON topic.category_id = category.ID
                INNER JOIN user ON thread.user_id = user.ID
                WHERE user.username LIKE ?
            `, [`%${username_input}%`]);
            return rows;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

}

module.exports = Search;