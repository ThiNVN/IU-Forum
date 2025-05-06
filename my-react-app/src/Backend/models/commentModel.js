const connection = require('../configuration/database');
const User = require('../models/userModel');
class Comment {
    // Get all comments from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM comment');
        return rows;
    }

    // Insert a new comment
    static async insertNewCommnent(post_id, user_id, parent_cmt_id, content) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Insert into 'post' table
            const [commentResult] = await dbConnection.query(
                'INSERT INTO comment (post_id, user_id, parent_cmt_id, content, create_at) VALUES (?, ?, ?, ?, NOW())',
                [post_id, user_id, parent_cmt_id, content]
            );
            await dbConnection.commit();
            return commentResult;  // Return the userId or any other result if needed
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Get comment by post_id
    static async getCommentByUserID(post_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get posts for this user (profile posts only)
            const [comments] = await dbConnection.query(
                `SELECT 
                    comment.ID,
                    comment.content,
                    comment.create_at,
                    comment.user_id,
                    user.username,
                    user.avatar
                 FROM comment
                 LEFT JOIN user ON comment.user_id = user.ID
                 WHERE comment.post_id = ?`,
                [post_id]
            );

            await dbConnection.commit();
            return comments;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get comment by id
    static async getCommentByID(comment_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get posts for this user (profile posts only)
            const comment = await dbConnection.query(
                `SELECT *
             FROM comment
             WHERE comment.ID = ?`,
                [comment_id]
            );

            await dbConnection.commit();
            return comment[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = Comment;