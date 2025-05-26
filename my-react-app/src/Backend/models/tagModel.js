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
}


module.exports = Tag;