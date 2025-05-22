const connection = require('../configuration/database');

class LikeTable {
    // Get all likes
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM like_table');
        return rows;
    }

    // Insert a new like
    static async insertLike(thread_id, user_id, comment_id = null) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Check if like already exists
            const [existingLike] = await dbConnection.query(
                'SELECT * FROM like_table WHERE thread_id = ? AND user_id = ? AND comment_id = ?',
                [thread_id, user_id, comment_id]
            );

            if (existingLike.length > 0) {
                // Like already exists, remove it (toggle off)
                const [Result] = await dbConnection.query(
                    'DELETE FROM like_table WHERE thread_id = ? AND user_id = ? AND comment_id = ?',
                    [thread_id, user_id, comment_id]
                );
                await dbConnection.commit();
                return { success: true, action: 'unliked' };
            }
            
            const [likeResult] = await dbConnection.query(
                'INSERT INTO like_table (thread_id, user_id, comment_id, create_at) VALUES (?, ?, ?, NOW())',
                [thread_id, user_id, comment_id]
            );

            await dbConnection.commit();
            return { success: true, action: 'liked', likeId: likeResult.insertId };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get likes for a thread
    static async getLikesByThreadID(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [likes] = await dbConnection.query(
                `SELECT l.*, u.username, u.avatar
                FROM like_table l
                LEFT JOIN user u ON l.user_id = u.ID
                WHERE l.thread_id = ? AND l.comment_id IS NULL`,
                [thread_id]
            );

            await dbConnection.commit();
            return likes;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get likes for a comment
    static async getLikesByCommentID(comment_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [likes] = await dbConnection.query(
                `SELECT l.*, u.username, u.avatar
                FROM like_table l
                LEFT JOIN user u ON l.user_id = u.ID
                WHERE l.comment_id = ?`,
                [comment_id]
            );

            await dbConnection.commit();
            return likes;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Check if user has liked a thread
    static async hasUserLikedThread(thread_id, user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM like_table WHERE thread_id = ? AND user_id = ? AND comment_id IS NULL',
                [thread_id, user_id]
            );

            await dbConnection.commit();
            return Result.length > 0;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Check if user has liked a comment
    static async hasUserLikedComment(comment_id, user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM like_table WHERE comment_id = ? AND user_id = ?',
                [comment_id, user_id]
            );

            await dbConnection.commit();
            return Result.length > 0;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get like count for a thread
    static async getThreadLikeCount(thread_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM like_table WHERE thread_id = ? AND comment_id IS NULL',
                [thread_id]
            );

            await dbConnection.commit();
            return Result[0].count;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get like count for a comment
    static async getCommentLikeCount(comment_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM like_table WHERE comment_id = ?',
                [comment_id]
            );

            await dbConnection.commit();
            return Result[0].count;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = LikeTable; 