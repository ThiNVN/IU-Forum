const connection = require('../configuration/database');
const bcrypt = require('bcrypt');
const userCredentials = require('../models/userCredentialsModel');

class User {
    // Get all users from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM user');
        return rows;
    }

    // Get user by ID
    static async getByID(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [users] = await dbConnection.query(
                'SELECT * FROM user WHERE ID = ?',
                [ID]
            );

            await dbConnection.commit();
            return users[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get user by username
    static async getByUsername(username) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [users] = await dbConnection.query(
                'SELECT * FROM user WHERE username = ?',
                [username]
            );

            await dbConnection.commit();
            return users[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Insert new user
    static async insertUser(username, full_name, avatar = null, age = null, school = null,
        major = null, bio = null, location = null, occupation = null,
        Twitter = null, LinkedIn = null, website = null) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [userResult] = await dbConnection.query(
                `INSERT INTO user (
                    username, full_name, avatar, age, school, major, bio,
                    is_admin, created_at, total_message, total_reaction, point,
                    title, location, occupation, Twitter, LinkedIn, website
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(), 0, 0, 0, 'Member', ?, ?, ?, ?, ?)`,
                [username, full_name, avatar, age, school, major, bio,
                    location, occupation, Twitter, LinkedIn, website]
            );

            await dbConnection.commit();
            return userResult;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Update user profile
    static async updateProfile(ID, full_name, avatar, age, school, major, bio,
        location, occupation, Twitter, LinkedIn, website) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                `UPDATE user SET 
                    full_name = ?, avatar = ?, age = ?, school = ?, major = ?,
                    bio = ?, location = ?, occupation = ?, Twitter = ?,
                    LinkedIn = ?, website = ?
                WHERE ID = ?`,
                [full_name, avatar, age, school, major, bio,
                    location, occupation, Twitter, LinkedIn, website, ID]
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

    // Update user stats
    static async updateStats(ID, total_message = null, total_reaction = null, point = null) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            let updateFields = [];
            let values = [];

            if (total_message !== null) {
                updateFields.push('total_message = ?');
                values.push(total_message);
            }
            if (total_reaction !== null) {
                updateFields.push('total_reaction = ?');
                values.push(total_reaction);
            }
            if (point !== null) {
                updateFields.push('point = ?');
                values.push(point);
            }

            if (updateFields.length === 0) {
                return false;
            }

            values.push(ID);
            const [Result] = await dbConnection.query(
                `UPDATE user SET ${updateFields.join(', ')} WHERE ID = ?`,
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

    // Update last login
    static async updateLastLogin(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE user SET last_login = NOW() WHERE ID = ?',
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

    // Delete user
    static async deleteUser(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'DELETE FROM user WHERE ID = ?',
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

    // Insert a new user and credentials (username, email, displayName, password)
    static async insertNewUser(username, email, displayName, password) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Insert into 'user' table
            const [userResult] = await dbConnection.query(
                'INSERT INTO user (username, full_name) VALUES (?, ?)',
                [username, displayName]
            );

            const userId = userResult.insertId;

            // Hash the password using bcrypt
            const hashedPassword = await User.hashPassword(password);
            console.log(password)
            console.log(hashedPassword)
            // Insert into 'user_credentials' table
            const result = await userCredentials.insertNewUserCredentials(email, hashedPassword, userId, dbConnection);

            // Commit the transaction if both queries succeed
            await dbConnection.commit();

            // console.log("User inserted:", userResult, credentialsResult);
            return userId;  // Return the userId or any other result if needed
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
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

    static async checkUserCredentials(emailOrUserName, password) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Check if input is email or username
            const checkResult = await User.checkEmailOrUsername(emailOrUserName);

            let Result;
            let userId;

            if (checkResult === 0) {
                // Case: email
                console.log("Case: email");
                const results = await userCredentials.getUserCredentialsByEmail(emailOrUserName, dbConnection);

                if (results && results.length > 0) {
                    Result = results[0];  // Get the first result if exists
                    const checkPasswordResult = await User.comparePassword(password, Result.password_hash);
                    if (checkPasswordResult === 1) {
                        console.log("User input correct, grant access.", Result);
                        userId = Result.ID;
                        return { status: 1, userId };
                    } else if (checkPasswordResult === 0) {
                        console.log("User input wrong, deny access.", Result, "Password: ", password, "hash_password: ", credentialResults[0].password_hash);
                        return 0;
                    } else {
                        console.log("Error occurred, deny access.", Result);
                        return 2;
                    }
                } else {
                    console.log("User not existed, deny access. Move to register.", Result);
                    return 3;
                }
            } else {
                // Case: username
                console.log("Case: username");
                const userResults = await User.getUserByUserName(emailOrUserName, dbConnection);

                if (userResults && userResults.length > 0) {
                    Result = userResults[0];  // Get the first result if exists
                    const credentialResults = await userCredentials.getUserCredentialsByID(Result.ID, dbConnection);

                    if (credentialResults && credentialResults.length > 0) {
                        const checkPasswordResult = await User.comparePassword(password, credentialResults[0].password_hash);
                        if (checkPasswordResult === 1) {
                            console.log("User input correct, grant access.", Result);
                            userId = Result.ID;
                            console.log("Password: ", password, "hash_password: ", credentialResults[0].password_hash)
                            return { status: 1, userId };
                        } else if (checkPasswordResult === 0) {
                            console.log("User input wrong, deny access.", Result, "Password: ", password, "hash_password: ", credentialResults[0].password_hash);
                            return 0;
                        } else {
                            console.log("Error occurred, deny access.", Result);
                            return 2;
                        }
                    } else {
                        console.log("User credentials not found, deny access.");
                        return 2;
                    }
                } else {
                    console.log("User not existed, deny access. Move to register.", Result);
                    return 3;
                }
            }

        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    static async checkEmailOrUsername(input) {
        // Regular expression for a simple email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(input)) {
            return 0;
        } else {
            return 1;
        }
    }


    static async comparePassword(enteredPassword, storedHash) {
        try {
            const result = await bcrypt.compare(enteredPassword, storedHash);
            if (result) {
                return 1; // Passwords match
            } else {
                return 0; // Passwords don't match
            }
        } catch (err) {
            console.error('Error comparing passwords:', err);
            return -1; // Error occurred
        }
    }

    // Get User by id
    static async getUserByID(ID) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction
        try {
            // Get user credential by id
            const Result = await dbConnection.query(
                'SELECT * FROM user WHERE ID = ?',
                [ID]
            );
            return Result[0];
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Get User by user name
    static async getUserByUserName(username) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM user WHERE username = ?',
                [username]
            );
            return Result;
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Update User
    static async updateUser(ID, username, title, location, occupation, website, Twitter, LinkedIn, bio) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE user SET username = ?, title = ?, location = ?, occupation = ?, website = ?,Twitter = ?, LinkedIn = ?, bio = ? WHERE ID =  ?',
                [username, title, location, occupation, website, Twitter, LinkedIn, bio, ID]
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

    //Update user last login status
    static async updateUserLastLoginStatus(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE user SET last_login = NOW() WHERE ID =  ?',
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

    //Delete User
    static async deleteUserCredentials(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Delete user credential by user id
            const [Result] = await dbConnection.query(
                'DELETE FROM user WHERE ID = ?;',
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
    static async changePassword(userId, newPassword) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Hash the new password
            const hashedPassword = await User.hashPassword(newPassword);

            // Update password in user_credentials table
            const [result] = await dbConnection.query(
                'UPDATE user_credentials SET password_hash = ? WHERE user_id = ?',
                [hashedPassword, userId]
            );

            if (result.affectedRows === 0) {
                throw new Error('User credentials not found');
            }

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

    // Update display name and profile (not username)
    static async updateDisplayNameAndProfile(ID, full_name, title, location, occupation, website, Twitter, LinkedIn, bio) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE user SET full_name = ?, title = ?, location = ?, occupation = ?, website = ?, Twitter = ?, LinkedIn = ?, bio = ? WHERE ID = ?',
                [full_name, title, location, occupation, website, Twitter, LinkedIn, bio, ID]
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

    static async getAvatar(ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [avatar] = await dbConnection.query(
                'SELECT avatar FROM user WHERE ID = ?',
                [ID]
            );

            await dbConnection.commit();
            return avatar[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async updateAvatar(avatar_path, ID) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [result] = await dbConnection.query(
                'UPDATE user SET avatar = ? WHERE ID = ?',
                [avatar_path, ID]
            );

            await dbConnection.commit();
            return result;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    static async getUserAvatarByUsername(username) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [avatar] = await dbConnection.query(
                'SELECT avatar FROM user WHERE username = ?',
                [username]
            );

            await dbConnection.commit();
            return avatar;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}
module.exports = User;
