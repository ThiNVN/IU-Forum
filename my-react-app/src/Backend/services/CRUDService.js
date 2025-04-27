const connection = require('../configuration/database');
const bcrypt = require('bcrypt');
const insertNewUser = async (username, email, displayName, password) => {
    try {
        // Insert into 'user' table
        const [userResult] = await connection.query(
            'INSERT INTO user (username, full_name) VALUES (?, ?)',
            [username, displayName]
        );

        const userId = userResult.insertId;
        const hashedPassword = await hashPassword(password);
        // Insert into 'user_credentials' table
        const [credentialsResult] = await connection.query(
            'INSERT INTO user_credentials (email, password_hash, user_id) VALUES (?, ?, ?)',
            [email, hashedPassword, userId]
        );

        console.log("User inserted:", credentialsResult);
    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
};

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Hashed password:', hash);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

// const bcrypt = require('bcrypt');

// const enteredPassword = 'myPlainTextPassword';
// const storedHash = '$2b$10$z4U...'; // From your DB

// bcrypt.compare(enteredPassword, storedHash, (err, result) => {
//     if (err) {
//         console.error('Error comparing passwords:', err);
//         return;
//     }
//     if (result) {
//         console.log('✅ Password is correct');
//     } else {
//         console.log('❌ Invalid password');
//     }
// });
module.exports = {
    insertNewUser
};