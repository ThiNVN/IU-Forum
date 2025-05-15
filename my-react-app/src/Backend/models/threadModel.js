const connection = require('../configuration/database');

class Thread {
    // Get all threads from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM thread');
        return rows;
    }

    // Insert a new thread
    static async insertThread(ID, category_id, user_id, title, description) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            
            // Insert into 'thread' table
            const [threadResult] = await dbConnection.query(
                'INSERT INTO thread (category_id, user_id, title, description, create_at) VALUES (?, ?, ?, ?, NOW())',
                [category_id, user_id, title, description]
            );
            
            await dbConnection.commit();
            return { success: true, threadId: threadResult.insertId };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            return { success: false, error: err.message };
        } finally {
            dbConnection.release();
        }
    }

    // Get thread by ID
    static async getThreadByID(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM thread WHERE ID = ?',
                [ID]
            );
            return Result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get threads by category ID
    static async getThreadsByCategoryID(category_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM thread WHERE category_id = ?',
                [category_id]
            );
            return Result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get threads by user ID
    static async getThreadsByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM thread WHERE user_id = ?',
                [user_id]
            );
            return Result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Update thread
    static async updateThread(ID, title, description) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE thread SET title = ?, description = ? WHERE ID = ?',
                [title, description, ID]
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

    // Delete thread
    static async deleteThread(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'DELETE FROM thread WHERE ID = ?',
                [ID]
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

    // Get thread with user and category information
    static async getThreadWithDetails(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                `SELECT t.*, u.username, u.full_name, c.name as category_name 
                FROM thread t 
                JOIN user u ON t.user_id = u.ID 
                JOIN category c ON t.category_id = c.ID 
                WHERE t.ID = ?`,
                [ID]
            );
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

module.exports = Thread;
