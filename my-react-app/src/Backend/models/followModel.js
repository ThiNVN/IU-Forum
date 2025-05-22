const connection = require('../configuration/database');

class Follow {
    // Get all follows
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM follow');
        return rows;
    }

    // Insert a new follow relationship
    static async insertFollow(follower_id, following_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [followResult] = await dbConnection.query(
                'INSERT INTO follow (follower_id, following_id, create_at) VALUES (?, ?, NOW())',
                [follower_id, following_id]
            );

            await dbConnection.commit();
            return followResult;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get followers of a user
    static async getFollowers(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [followers] = await dbConnection.query(
                `SELECT f.*, u.username, u.avatar, u.full_name
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

    // Get users being followed by a user
    static async getFollowing(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [following] = await dbConnection.query(
                `SELECT f.*, u.username, u.avatar, u.full_name
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

    // Check if a user is following another user
    static async isFollowing(follower_id, following_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [follows] = await dbConnection.query(
                'SELECT * FROM follow WHERE follower_id = ? AND following_id = ?',
                [follower_id, following_id]
            );

            await dbConnection.commit();
            return follows.length > 0;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Delete a follow relationship
    static async deleteFollow(follower_id, following_id) {
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

    // Get follower count for a user
    static async getFollowerCount(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM follow WHERE following_id = ?',
                [user_id]
            );

            await dbConnection.commit();
            return result[0].count;
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
            const [result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM follow WHERE follower_id = ?',
                [user_id]
            );

            await dbConnection.commit();
            return result[0].count;
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