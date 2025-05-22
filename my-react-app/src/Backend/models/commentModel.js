const connection = require('../configuration/database');

class Comment {
    // Get all comments
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM comment');
        return rows;
    }

    // Insert a new comment
    static async insertComment(thread_id, user_id, content) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [commentResult] = await dbConnection.query(
                'INSERT INTO comment (thread_id, user_id, content, create_at) VALUES (?, ?, ?, NOW())',
                [thread_id, user_id, content]
            );

            await dbConnection.commit();
            return commentResult;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get comments by thread ID
    static async getCommentsByThreadID(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [comments] = await dbConnection.query(
                `SELECT c.*, u.username, u.avatar
                FROM comment c
                LEFT JOIN user u ON c.user_id = u.ID
                WHERE c.thread_id = ?
                ORDER BY c.create_at ASC`,
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

    // Get comments by user ID
    static async getCommentsByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [comments] = await dbConnection.query(
                `SELECT c.*, t.title as thread_title
                FROM comment c
                LEFT JOIN thread t ON c.thread_id = t.ID
                WHERE c.user_id = ?
                ORDER BY c.create_at DESC`,
                [user_id]
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

    // Update a comment
    static async updateComment(comment_id, content) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE comment SET content = ? WHERE ID = ?',
                [content, comment_id]
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

    // Delete a comment
    static async deleteComment(comment_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // First delete any likes associated with this comment
            await dbConnection.query(
                'DELETE FROM like_table WHERE comment_id = ?',
                [comment_id]
            );

            // Then delete the comment
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