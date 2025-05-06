const connection = require('../configuration/database');
const User = require('../models/userModel');
// Category: Programming
//   └── Thread: How do I fix a NullPointerException?
//          ├── Post 1 (Original Question)
//          ├── Post 2 (Reply)
//          └── Post 3 (Follow-up)
class Post {
    // Get all posts from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM post');
        return rows;
    }

    // Insert a new post (both normal post and user profile post)
    static async insertNewPost(thread_id, user_id, content, image) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Insert into 'post' table
            const [postResult] = await dbConnection.query(
                'INSERT INTO post (thread_id, user_id, content, image, create_at) VALUES (?, ?, ?, ?, NOW())',
                [thread_id, user_id, content, image]
            );
            await dbConnection.commit();
            return postResult;  // Return the userId or any other result if needed
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Get profile post
    static async getProfilePostByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get posts for this user (profile posts only)
            const [posts] = await dbConnection.query(
                'SELECT * FROM post WHERE user_id = ? AND thread_id IS NULL',
                [user_id]
            );

            // Get user info
            const userRows = await User.getUserByID(user_id);
            console.log(userRows)
            const user = userRows[0];  // Get the first (and only) user row

            await dbConnection.commit();
            return { posts, user };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get normal post of a user
    static async getNormalPostByUserIDAndThreadID(user_id, thread_id) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM post WHERE user_id = ? AND thread_id = ?',
                [user_id, thread_id]
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

    // Get normal post of a thread
    static async getNormalPostByThreadID(thread_id) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction
        try {
            // Get user credential by id
            const [Result] = await dbConnection.query(
                'SELECT * FROM post WHERE thread_id = ?',
                [thread_id]
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
    // Get post by id
    static async getPostByID(post_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get posts for this user (profile posts only)
            const post = await dbConnection.query(
                `SELECT *
         FROM post
         WHERE ID = ?`,
                [post_id]
            );

            await dbConnection.commit();
            return post[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }


    // Get normal post of a category. Not yet

}

module.exports = Post;
