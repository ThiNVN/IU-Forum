const connection = require('../configuration/database');

class Tag {
    // Get all tags from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM tag');
        return rows;
    }

    // Get tag by ID
    static async getTagByID(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'SELECT * FROM tag WHERE ID = ?',
                [ID]
            );
            return result[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Create a new tag
    static async create(name) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'INSERT INTO tag (name) VALUES (?)',
                [name]
            );
            await dbConnection.commit();
            return { id: result.insertId, name };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Update a tag
    static async update(id, name) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            await dbConnection.query(
                'UPDATE tag SET name = ? WHERE ID = ?',
                [name, id]
            );
            await dbConnection.commit();
            return { id, name };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Delete a tag
    static async delete(id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            await dbConnection.query(
                'DELETE FROM tag WHERE ID = ?',
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
}

module.exports = Tag;