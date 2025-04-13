const connection = require('../configuration/database');

const insertNewUser = async (username, email, displayName, password) => {
    try {
        const [results, fields] = await connection.query(
            'INSERT INTO user (username, full_name) VALUES (?, ?)',
            [username, displayName]  // Adjust this based on your table structure
        );
        console.log("User inserted:", results);
    } catch (err) {
        console.error("Database error:", err); // Log the database error
        throw err;
    }
};
module.exports = {
    insertNewUser
}