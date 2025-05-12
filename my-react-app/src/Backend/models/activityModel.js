const connection = require('../configuration/database');

class Activity {
    // Get all activities from the database
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM activity');
        return rows;
    }

    // Insert a new activity
    static async insertNewActivity(user_id, activity_type, description) {
        const dbConnection = await connection.getConnection();  // Get a connection for the transaction
        await dbConnection.beginTransaction();  // Start transaction

        try {
            // Insert into 'activity' table
            const [activityResult] = await dbConnection.query(
                'INSERT INTO activity (user_id, activity_type, description) VALUES (?, ?, ?)',
                [user_id, activity_type, description]
            );
            await dbConnection.commit();
            return activityResult;  // Return the userId or any other result if needed
        } catch (err) {
            // Rollback the transaction in case of an error
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;  // Re-throw the error so it can be handled elsewhere
        } finally {
            dbConnection.release();  // Release the connection back to the pool
        }
    }

    // Get 10 lasted activity by user id
    static async get10ActivityByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {

            const [activities] = await dbConnection.query(
                `SELECT activity_type, description, created_at
                FROM activity
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT 10
                `,
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
}

module.exports = Activity;