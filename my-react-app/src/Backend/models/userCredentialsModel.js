const connection = require('../configuration/database');
const bcrypt = require('bcrypt');
class userCredentials {
    // Get all users from the database
    static async getAllUserCredentials() {
        const [rows] = await connection.query('SELECT * FROM user_credentials');
        return rows;
    }

    //Insert new user_credential

    static async insertNewUserCredentials(email, password, user_id, dbConnection) {
        try {
            // Insert into 'user' table
            const password_hash = await userCredentials.hashPassword(password);
            const [userResult] = await dbConnection.query(
                'INSERT INTO user_credentials (email, password_hash, user_id) VALUES (?, ?, ?)',
                [email, password_hash, user_id]
            );
            // console.log("User_credential inserted:", credentialsResult);
            return 1;  // Return the userId or any other result if needed
        } catch (err) {
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        }
    }

    // Get User Credentials by user id
    static async getUserCredentialsByID(user_id, dbConnection) {
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM user_credentials WHERE user_id = ?',
                [user_id]
            );
            return Result;
        } catch (err) {
            console.error("Database error:", err);
            throw err;
        }
    }

    // Get User Credentials by email
    static async getUserCredentialsByEmail(email, dbConnection) {
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM user_credentials WHERE email = ?',
                [email]
            );
            return Result;
        } catch (err) {
            console.error("Database error:", err);
            throw err;
        }
    }

    // Update User Credentials
    static async updateUserCredentials(email, password, user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Get user credential by user id
            const password_hash = await userCredentials.hashPassword(password);
            const [Result] = await dbConnection.query(
                'UPDATE user_credentials SET email = ?, password_hash = ? WHERE user_id =  ?',
                [email, password_hash, user_id]
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

    //Delete User Credentials
    static async deleteUserCredentials(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Delete user credential by user id
            const [Result] = await dbConnection.query(
                'DELETE FROM user_credentials WHERE user_id = ?;',
                [user_id]
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

    // Hash password using bcrypt
    static async hashPassword(password) {
        try {
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
            return hash;
        } catch (err) {
            console.error('Error hashing password:', err);
            throw err;
        }
    }
}

module.exports = userCredentials;