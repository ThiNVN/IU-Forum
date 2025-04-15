const connection = require('../configuration/database');

const insertNewUser = async (username, email, displayName, password) => {
    try {
        // Insert into 'user' table
        const [userResult] = await connection.query(
            'INSERT INTO user (username, full_name) VALUES (?, ?)',
            [username, displayName]
        );

        const userId = userResult.insertId;

        // Insert into 'user_credentials' table
        const [credentialsResult] = await connection.query(
            'INSERT INTO user_credentials (email, password_hash, user_id) VALUES (?, ?, ?)',
            [email, password, userId]
        );

        console.log("User inserted:", credentialsResult);
    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
};

module.exports = {
    insertNewUser
};