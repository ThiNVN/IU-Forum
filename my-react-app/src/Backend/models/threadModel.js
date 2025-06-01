const connection = require('../configuration/database');
const User = require('./userModel');
// Category: Programming
//   └── Topic: How do I fix a NullPointerException?
//          ├── Thread 1 (Original Question)
//                  |-Comment
//          ├── Thread 2 (Reply)
//          └── Thread 3 (Follow-up)
class Thread {
    // Get all threads from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM thread');
        return rows;
    }

    // Insert a new thread (both normal thread and user profile thread)
    static async insertNewThread(topic_id, user_id, title, image, description, content) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Insert into 'thread' table
            const [threadResult] = await dbConnection.query(
                'INSERT INTO thread (topic_id, user_id, title, image, description, content, last_activity) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                [topic_id, user_id, title, image, description, content]
            );
            await dbConnection.commit();
            return threadResult;  // Return the userId or any other result if needed
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Get profile thread
    static async getProfileThreadByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get threads for this user (profile threads only)
            const [threads] = await dbConnection.query(
                'SELECT * FROM thread WHERE user_id = ? AND topic_id IS NULL',
                [user_id]
            );

            // Get user info
            const userRows = await User.getUserByID(user_id);
            const user = userRows[0];  // Get the first (and only) user row

            await dbConnection.commit();
            return { threads, user };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get normal thread of a user
    static async getNormalThreadByUserIDAndThreadID(user_id, topic_id) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM thread WHERE user_id = ? AND topic_id = ?',
                [user_id, topic_id]
            );
            return Result;
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Get normal thread of a thread
    static async getNormalThreadByTopicID(topic_id) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM thread WHERE topic_id = ?',
                [topic_id]
            );
            return Result;
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }
    // Get thread by id
    static async getThreadByID(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get threads for this user (profile threads only)
            const thread = await dbConnection.query(
                `SELECT *
         FROM thread
         WHERE ID = ?`,
                [thread_id]
            );

            await dbConnection.commit();
            return thread[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get normal thread of a category. Not yet

    // Delete a thread and its comments, files, and notifications
    static async deleteThread(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Delete notifications linked to comments on this thread
            await dbConnection.query(`
            DELETE n FROM notification n
            JOIN comment c ON n.comment_id = c.ID
            WHERE c.thread_id = ?
        `, [thread_id]);

            // Delete notifications linked directly to the thread
            await dbConnection.query(`
            DELETE FROM notification
            WHERE thread_id = ?
        `, [thread_id]);

            // Delete files linked to the thread
            await dbConnection.query(
                'DELETE FROM file WHERE thread_id = ?',
                [thread_id]
            );

            // Delete comments on this thread
            await dbConnection.query(
                'DELETE FROM comment WHERE thread_id = ?',
                [thread_id]
            );

            // Delete the thread itself
            const [Result] = await dbConnection.query(
                'DELETE FROM thread WHERE ID = ?',
                [thread_id]
            );

            await dbConnection.commit();
            return Result.affectedRows > 0;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    //Count thread by thread_id
    static async countThreadByTopicID(topic_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get threads for this user (profile threads only)
            const [count] = await dbConnection.query(
                `SELECT COUNT(*)
                AS count
                FROM thread
                WHERE topic_id = ?;`,
                [topic_id]
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
    //Update thread
    static async updateThread(id, topic_id, user_id, title, image, responses, views, description, content) {
        const dbConnection = await connection.getConnection(); // Get a connection for the transaction
        await dbConnection.beginTransaction(); // Start transaction

        try {
            // Update the existing thread
            const [result] = await dbConnection.query(
                `UPDATE thread 
                 SET topic_id = ?, 
                     user_id = ?, 
                     title = ?, 
                     image = ?, 
                     responses = ?, 
                     views = ?,
                     last_activity = NOW(),
                     description = ?,
                     content = ? 
                 WHERE id = ?`,
                [topic_id, user_id, title, image, responses, views, description, content, id]
            );

            await dbConnection.commit();
            return result;  // Return the result of the update
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get all thread by user id
    static async getThreadByUserID(userId) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get threads for this user (profile threads only)
            const threads = await dbConnection.query(
                `SELECT *
                    FROM thread
                    WHERE user_id = ?`,
                [userId]
            );

            await dbConnection.commit();
            return threads[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = Thread;
