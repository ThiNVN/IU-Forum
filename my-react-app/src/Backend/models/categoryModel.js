const connection = require('../configuration/database');

class Category {
    // Get all categories from the database
    static async getAllCategories() {
        const [rows] = await connection.query('SELECT * FROM category');
        return rows;
    }

    // Insert a new category
    static async insertNewCategory(name, description) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'INSERT INTO category (name, description) VALUES (?, ?)',
                [name, description]
            );

            await dbConnection.commit();
            return result.insertId;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get category by ID
    static async getCategoryByID(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'SELECT * FROM category WHERE ID = ?',
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

    // Get category by name
    static async getCategoryByName(name) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'SELECT * FROM category WHERE name = ?',
                [name]
            );
            return result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Update category
    static async updateCategory(ID, name, description) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'UPDATE category SET name = ?, description = ? WHERE ID = ?',
                [name, description, ID]
            );
            await dbConnection.commit();
            return 1;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Delete category
    static async deleteCategory(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [result] = await dbConnection.query(
                'DELETE FROM category WHERE ID = ?',
                [ID]
            );
            await dbConnection.commit();
            return 1;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = Category;
