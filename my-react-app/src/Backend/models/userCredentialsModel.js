const connection = require('../configuration/database');
const bcrypt = require('bcrypt');

class UserCredentials {
    // Get all user credentials
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM user_credentials');
        return rows;
    }

    // Insert new user credentials
    static async insertNewUserCredentials(email, password_hash, user_id, dbConnection = null) {
        const shouldReleaseConnection = !dbConnection;
        if (!dbConnection) {
            dbConnection = await connection.getConnection();
            await dbConnection.beginTransaction();
        }

        try {
            const [credentialsResult] = await dbConnection.query(
                'INSERT INTO user_credentials (email, password_hash, user_id) VALUES (?, ?, ?)',
                [email, password_hash, user_id]
            );

            if (shouldReleaseConnection) {
                await dbConnection.commit();
            }
            return credentialsResult;
        } catch (err) {
            if (shouldReleaseConnection) {
                await dbConnection.rollback();
            }
            console.error("Database error:", err);
            throw err;
        } finally {
            if (shouldReleaseConnection) {
                dbConnection.release();
            }
        }
    }

    // Get user credentials by email
    static async getUserCredentialsByEmail(email, dbConnection = null) {
        const shouldReleaseConnection = !dbConnection;
        if (!dbConnection) {
            dbConnection = await connection.getConnection();
            await dbConnection.beginTransaction();
        }

        try {
            const [credentials] = await dbConnection.query(
                'SELECT * FROM user_credentials WHERE email = ?',
                [email]
            );

            if (shouldReleaseConnection) {
                await dbConnection.commit();
            }
            return credentials;
        } catch (err) {
            if (shouldReleaseConnection) {
                await dbConnection.rollback();
            }
            console.error("Database error:", err);
            throw err;
        } finally {
            if (shouldReleaseConnection) {
                dbConnection.release();
            }
        }
    }

    // Get user credentials by user ID
    static async getUserCredentialsByID(user_id, dbConnection = null) {
        const shouldReleaseConnection = !dbConnection;
        if (!dbConnection) {
            dbConnection = await connection.getConnection();
            await dbConnection.beginTransaction();
        }

        try {
            const [credentials] = await dbConnection.query(
                'SELECT * FROM user_credentials WHERE user_id = ?',
                [user_id]
            );

            if (shouldReleaseConnection) {
                await dbConnection.commit();
            }
            return credentials;
        } catch (err) {
            if (shouldReleaseConnection) {
                await dbConnection.rollback();
            }
            console.error("Database error:", err);
            throw err;
        } finally {
            if (shouldReleaseConnection) {
                dbConnection.release();
            }
        }
    }

    // Update user credentials
    static async updateUserCredentials(user_id, email = null, password_hash = null) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            let updateFields = [];
            let values = [];

            if (email !== null) {
                updateFields.push('email = ?');
                values.push(email);
            }
            if (password_hash !== null) {
                updateFields.push('password_hash = ?');
                values.push(password_hash);
            }

            if (updateFields.length === 0) {
                return false;
            }

            values.push(user_id);
            const [Result] = await dbConnection.query(
                `UPDATE user_credentials SET ${updateFields.join(', ')} WHERE user_id = ?`,
                values
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

    // Delete user credentials
    static async deleteUserCredentials(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'DELETE FROM user_credentials WHERE user_id = ?',
                [user_id]
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

    // Change password for a user
    static async changePassword(userId, newPassword) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Hash the new password
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            // Update password in user_credentials table
            const [result] = await dbConnection.query(
                'UPDATE user_credentials SET password_hash = ? WHERE user_id = ?',
                [hashedPassword, userId]
            );

            if (result.affectedRows === 0) {
                throw new Error('User credentials not found');
            }

            await dbConnection.commit();
            return true;
        } catch (err) {
            await dbConnection.rollback();
            console.error('Error changing password:', err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = UserCredentials;