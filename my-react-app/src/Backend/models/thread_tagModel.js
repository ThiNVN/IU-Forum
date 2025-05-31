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

    static async getTop5Tag() {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
    
        try {
            const [result] = await dbConnection.query(`
                SELECT 
                    t.name AS tag_name, 
                    COUNT(tt.thread_id) AS thread_count,
                    t.ID as tag_id 
                FROM tag t
                JOIN thread_tag tt ON t.ID = tt.tag_id
                GROUP BY t.ID
                ORDER BY thread_count DESC
                LIMIT 5
            `);
    
            await dbConnection.commit();
            return result;
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