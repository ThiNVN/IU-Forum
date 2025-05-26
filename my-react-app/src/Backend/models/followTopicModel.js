const connection = require('../configuration/database');

class FollowTopic {
    // Get all follow topic
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM followtopic');
        return rows;
    }

    // Insert a new thread_tag
    static async insertFollowTopic(thread_id, user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'INSERT INTO followtopic (thread_id, user_id) VALUES (?, ?)',
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

}


module.exports = FollowTopic;