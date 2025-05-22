const connection = require('../configuration/database');

class Activity {
    // Get all activities from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM activity');
        return rows;
    }

    // Insert a new activity
    static async insertActivity(user_id, activity_type, description) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [activityResult] = await dbConnection.query(
                'INSERT INTO activity (user_id, activity_type, description, created_at) VALUES (?, ?, ?, NOW())',
                [user_id, activity_type, description]
            );

            await dbConnection.commit();
            return activityResult;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get activities by user ID
    static async getActivitiesByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [activities] = await dbConnection.query(
                `SELECT a.*, u.username, u.avatar
                FROM activity a
                LEFT JOIN user u ON a.user_id = u.ID
                WHERE a.user_id = ?
                ORDER BY a.created_at DESC`,
                [user_id]
            );

            await dbConnection.commit();
            return activities;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get latest activities
    static async getLatestActivities(limit = 10) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [activities] = await dbConnection.query(
                `SELECT a.*, u.username, u.avatar
                FROM activity a
                LEFT JOIN user u ON a.user_id = u.ID
                ORDER BY a.created_at DESC
                LIMIT ?`,
                [limit]
            );

            await dbConnection.commit();
            return activities;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Delete an activity
    static async deleteActivity(activity_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'DELETE FROM activity WHERE ID = ?',
                [activity_id]
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

module.exports = Activity;