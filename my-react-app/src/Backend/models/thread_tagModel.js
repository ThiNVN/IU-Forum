const connection = require('../configuration/database');

class ThreadTag {
    // Get all categories from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM thread_tag');
        return rows;
    }

    // Insert a new thread_tag
    static async insertThreadTag(thread_id, tag_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'INSERT INTO thread_tag (thread_id, tag_id) VALUES (?, ?)',
                [thread_id, tag_id]
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


module.exports = ThreadTag;