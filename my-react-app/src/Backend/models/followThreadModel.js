const connection = require('../configuration/database');

class FollowThread {
    // Get all follow topic
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM follow_thread');
        return rows;
    }

    // Insert a new thread_tag
    static async insertFollowThread(thread_id, user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'INSERT INTO follow_thread (thread_id, user_id) VALUES (?, ?)',
                [thread_id, user_id]
            );

            await dbConnection.commit();
            return Result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async getFollowThreadByThread_ID(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM follow_thread WHERE thread_id = ?',
                [thread_id]
            );

            await dbConnection.commit();
            return Result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}


module.exports = FollowThread;