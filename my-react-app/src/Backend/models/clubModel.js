const connection = require('../configuration/database');

class Club {
    // Get all clubs
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM club');
        return rows;
    }

    // Get club by ID
    static async getByID(ID) {
        const [rows] = await connection.query(
            'SELECT * FROM club WHERE id = ?',
            [ID]
        );
        return rows[0];
    }

    // Create new club
    static async create(name, description, president, contact_email) {
        const [result] = await connection.query(
            'INSERT INTO club (name, description, president_id, link) VALUES (?, ?, ?, ?)',
            [name, description, president, contact_email]
        );
        return result.insertId;
    }

    // Update club
    static async update(ID, name, description, president, link) {
        const [result] = await connection.query(
            'UPDATE club SET name = ?, description = ?, president_id = ?, link = ? WHERE id = ?',
            [name, description, president, link, ID]
        );
        return result.affectedRows > 0;
    }

    // Delete club
    static async delete(ID) {
        const [result] = await connection.query(
            'DELETE FROM club WHERE id = ?',
            [ID]
        );
        return result.affectedRows > 0;
    }

    // Get clubs by president ID
    static async getByPresident(presidentID) {
        const [rows] = await connection.query(
            'SELECT * FROM club WHERE president_id = ?',
            [presidentID]
        );
        return rows;
    }

    // Get club with president details
    static async getClubWithPresident(clubID) {
        const [rows] = await connection.query(
            `SELECT c.*, u.username as president_name, u.avatar as president_avatar 
             FROM club c 
             LEFT JOIN user u ON c.president = u.ID 
             WHERE c.id = ?`,
            [clubID]
        );
        return rows[0];
    }

    // Get all clubs with president details
    static async getAllWithPresidents() {
        const [rows] = await connection.query(
            `SELECT c.*, u.username as president_name, u.avatar as president_avatar 
             FROM club c 
             LEFT JOIN user u ON c.president_id = u.ID`
        );
        return rows;
    }
}

module.exports = Club; 