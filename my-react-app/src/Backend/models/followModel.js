const connection = require('../configuration/database');

class Follow {
    // Get all follows
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM follow');
        return rows;
    }

    // Follow a user
    static async followUser(follower_id, following_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Check if follow already exists
            const [existingFollow] = await dbConnection.query(
                'SELECT * FROM follow WHERE follower_id = ? AND following_id = ?',
                [follower_id, following_id]
            );

            if (existingFollow.length > 0) {
                // Follow already exists, remove it (unfollow)
                const [Result] = await dbConnection.query(
                    'DELETE FROM follow WHERE follower_id = ? AND following_id = ?',
                    [follower_id, following_id]
                );
                await dbConnection.commit();
                return { success: true, action: 'unfollowed' };
            }

            // Insert new follow
            const [followResult] = await dbConnection.query(
                'INSERT INTO follow (follower_id, following_id, create_at) VALUES (?, ?, NOW())',
                [follower_id, following_id]
            );

            await dbConnection.commit();
            return { success: true, action: 'followed', followId: followResult.insertId };
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get all followers of a user
    static async getFollowers(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [followers] = await dbConnection.query(
                `SELECT f.*, u.username, u.avatar
                FROM follow f
                LEFT JOIN user u ON f.follower_id = u.ID
                WHERE f.following_id = ?
                ORDER BY f.create_at DESC`,
                [user_id]
            );

            await dbConnection.commit();
            return followers;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get all users that a user is following
    static async getFollowing(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [following] = await dbConnection.query(
                `SELECT f.*, u.username, u.avatar
                FROM follow f
                LEFT JOIN user u ON f.following_id = u.ID
                WHERE f.follower_id = ?
                ORDER BY f.create_at DESC`,
                [user_id]
            );

            await dbConnection.commit();
            return following;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Check if one user is following another
    static async isFollowing(follower_id, following_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT * FROM follow WHERE follower_id = ? AND following_id = ?',
                [follower_id, following_id]
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

    // Get follower count for a user
    static async getFollowerCount(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM follow WHERE following_id = ?',
                [user_id]
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

    // Get following count for a user
    static async getFollowingCount(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM follow WHERE follower_id = ?',
                [user_id]
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

    // Unfollow a user
    static async unfollowUser(follower_id, following_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'DELETE FROM follow WHERE follower_id = ? AND following_id = ?',
                [follower_id, following_id]
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

module.exports = Follow; 