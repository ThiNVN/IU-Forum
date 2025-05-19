const connection = require('../configuration/database');
const User = require('../models/userModel');
class Comment {
    // Get all comments from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM comment');
        return rows;
    }

    // Insert a new comment
    static async insertNewCommnent(thread_id, user_id, parent_cmt_id, content) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Insert into 'comment' table
            const [commentResult] = await dbConnection.query(
                'INSERT INTO comment (thread_id, user_id, parent_cmt_id, content) VALUES (?, ?, ?, ?)',
                [thread_id, user_id, parent_cmt_id, content]
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

    // Get comment by thread_id
    static async getCommentByUserID(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            // Get threads for this user (profile threads only)
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
                 WHERE comment.thread_id = ?
                 ORDER BY comment.create_at ASC`,
                [thread_id]
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
            // Get threads for this user (profile threads only)
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

    // Delete a comment and its replies
    static async deleteComment(comment_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Delete all child comments
            await dbConnection.query(
                'DELETE FROM comment WHERE parent_cmt_id = ?',
                [comment_id]
            );

            // Delete the comment itself
            const [Result] = await dbConnection.query(
                'DELETE FROM comment WHERE ID = ?',
                [comment_id]
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
}

module.exports = Comment;