const db = require('../configuration/database');

class Comment {
    // Get all comments
    static async getAll() {
        const query = 'SELECT * FROM comment';
        try {
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get a comment by ID
    static async getById(id) {
        const query = 'SELECT * FROM comment WHERE ID = ?';
        try {
            const [rows] = await db.query(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Insert a new comment
    static async create(thread_id, user_id, content) {
        const query = 'INSERT INTO comment (thread_id, user_id, content) VALUES (?, ?, ?)';
        try {
            const [result] = await db.query(query, [thread_id, user_id, content]);
            return { id: result.insertId, thread_id, user_id, content };
        } catch (error) {
            throw error;
        }
    }

    // Update a comment
    static async update(id, content) {
        const query = 'UPDATE comment SET content = ? WHERE ID = ?';
        try {
            await db.query(query, [content, id]);
            return this.getById(id);
        } catch (error) {
            throw error;
        }
    }

    // Delete a comment
    static async delete(id) {
        const query = 'DELETE FROM comment WHERE ID = ?';
        try {
            await db.query(query, [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Get comments by thread ID
    static async getCommentsByThreadID(thread_id) {
        const dbConnection = await db.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [comments] = await dbConnection.query(
                `SELECT c.*, u.username, u.avatar
                FROM comment c
                LEFT JOIN user u ON c.user_id = u.ID
                WHERE c.thread_id = ?
                ORDER BY c.create_at ASC`,
                [thread_id]
            );

            await dbConnection.commit();
            return comments;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    //Get comments by ID
    static async getCommentByID(comment_id) {
        const dbConnection = await db.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [comments] = await dbConnection.query(
                `SELECT c.*, u.username, u.avatar
                FROM comment c
                LEFT JOIN user u ON c.user_id = u.ID
                WHERE c.ID = ?
                ORDER BY c.create_at ASC`,
                [comment_id]
            );

            await dbConnection.commit();
            return comments;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get comments by user ID
    static async getCommentsByUserID(user_id) {
        const dbConnection = await db.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [comments] = await dbConnection.query(
                `SELECT c.*, t.title as thread_title
                FROM comment c
                LEFT JOIN thread t ON c.thread_id = t.ID
                WHERE c.user_id = ?
                ORDER BY c.create_at DESC`,
                [user_id]
            );

            await dbConnection.commit();
            return comments;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Count comment by thread_id
    static async countCommentByThreadID(thread_id) {
        const dbConnection = await db.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get threads for this user (profile threads only)
            const [count] = await dbConnection.query(
                `SELECT COUNT(*)
                AS count
                FROM comment
                WHERE thread_id = ?;`,
                [thread_id]
            );

            await dbConnection.commit();
            return count[0].count;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Admin methods
    static async getTotalComments() {
        const dbConnection = await db.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [result] = await dbConnection.query('SELECT COUNT(*) as total FROM comment');
            await dbConnection.commit();
            return result[0].total;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async getCommentStats() {
        const dbConnection = await db.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [stats] = await dbConnection.query(`
                SELECT 
                    COUNT(*) as total_comments,
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as new_comments_7d,
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_comments_30d,
                    COUNT(DISTINCT user_id) as unique_commenters
                FROM comment
            `);
            await dbConnection.commit();
            return stats[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = Comment;