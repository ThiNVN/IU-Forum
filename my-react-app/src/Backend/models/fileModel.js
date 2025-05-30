const connection = require('../configuration/database');

class File {
    // Get all files
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM file');
        return rows;
    }

    // Insert a new thread_tag
    static async insertFile(user_id, link, thread_id = null) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'INSERT INTO file (user_id, link, thread_id) VALUES (?, ?, ?)',
                [user_id, link, thread_id]
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

    static async getFilesByThreadId(thread_id) {
        const [rows] = await connection.query('SELECT * FROM file WHERE thread_id = ?', [thread_id]);
        return rows;
    }

    static async getFileById(fileId) {
        const [rows] = await connection.query('SELECT * FROM file WHERE id = ?', [fileId]);
        return rows;
    }

}


module.exports = File;