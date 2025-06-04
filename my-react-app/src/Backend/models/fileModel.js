const connection = require('../configuration/database');

class File {
    // Get all files
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM file');
        return rows;
    }

    // Insert a new file
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

    // Create a new file (alias for insertFile for consistency)
    static async create(user_id, file_link, thread_id = null) {
        return this.insertFile(user_id, file_link, thread_id);
    }

    // Update a file
    static async update(id, user_id, file_link, thread_id = null) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            await dbConnection.query(
                'UPDATE file SET user_id = ?, link = ?, thread_id = ? WHERE id = ?',
                [user_id, file_link, thread_id, id]
            );
            await dbConnection.commit();
            return { id, user_id, file_link, thread_id };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Delete a file
    static async delete(id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            await dbConnection.query(
                'DELETE FROM file WHERE id = ?',
                [id]
            );
            await dbConnection.commit();
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