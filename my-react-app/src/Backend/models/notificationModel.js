const connection = require('../configuration/database');

class Notification {
    // Get all notifications
    static async getAll() {
        const [rows] = await connection.query('SELECT * FROM notification');
        return rows;
    }

    // Insert a new notification
    static async insertNotification(thread_id, user_id, from_user_id, comment_id, like_id, message, is_read, 
                                    new_thread, new_follower, new_comment, new_reply, new_like) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            // Insert into Notification table
            const [notificationResult] = await dbConnection.query(
                `INSERT INTO notification (
                    thread_id, user_id, from_user_id, comment_id, like_id,
                    message, is_read, create_at, new_thread, new_follower,
                    new_comment, new_reply, new_like
                ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
                [
                    thread_id, user_id, from_user_id, comment_id, like_id,
                    message, is_read, new_thread, new_follower,
                    new_comment, new_reply, new_like
                ]
            );

            await dbConnection.commit();
            return notificationResult;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Get notifications by user ID
    static async getNotificationsByUserID(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [notifications] = await dbConnection.query(
                `SELECT n.*, 
                    u.username as from_username,
                    u.avatar as from_avatar
                FROM notification n
                LEFT JOIN user u ON n.from_user_id = u.ID
                WHERE n.user_id = ?
                ORDER BY n.create_at DESC`,
                [user_id]
            );

            await dbConnection.commit();
            return notifications;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Mark notification as read
    static async markAsRead(notification_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE notification SET is_read = 1 WHERE ID = ?',
                [notification_id]
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

    // Mark all notifications as read for a user
    static async markAllAsRead(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'UPDATE notification SET is_read = 1 WHERE user_id = ?',
                [user_id]
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

    // Delete a notification
    static async deleteNotification(notification_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [Result] = await dbConnection.query(
                'DELETE FROM notification WHERE ID = ?',
                [notification_id]
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

    // Get unread notification count for a user
    static async getUnreadCount(user_id) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [Result] = await dbConnection.query(
                'SELECT COUNT(*) as count FROM notification WHERE user_id = ? AND is_read = 0',
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

    // Admin: Get all notifications with user details
    static async getAllNotifications() {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();
        try {
            const [notifications] = await dbConnection.query(
                `SELECT n.*, 
                    u.username as user_username,
                    u.avatar as user_avatar,
                    fu.username as from_username,
                    fu.avatar as from_avatar
                FROM notification n
                LEFT JOIN user u ON n.user_id = u.ID
                LEFT JOIN user fu ON n.from_user_id = fu.ID
                ORDER BY n.create_at DESC`
            );

            await dbConnection.commit();
            return notifications;
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Admin: Create notification
    static async createNotification(thread_id, user_id, from_user_id, comment_id, like_id, message, is_read, 
                                    new_thread, new_follower, new_comment, new_reply, new_like) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            const [notificationResult] = await dbConnection.query(
                `INSERT INTO notification (
                    thread_id, user_id, from_user_id, comment_id, like_id,
                    message, is_read, create_at, new_thread, new_follower,
                    new_comment, new_reply, new_like
                ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)`,
                [
                    thread_id, user_id, from_user_id, comment_id, like_id,
                    message, is_read, new_thread, new_follower,
                    new_comment, new_reply, new_like
                ]
            );

            const [newNotification] = await dbConnection.query(
                'SELECT * FROM notification WHERE ID = ?',
                [notificationResult.insertId]
            );

            await dbConnection.commit();
            return newNotification[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }

    // Admin: Update notification
    static async updateNotification(id, thread_id, user_id, from_user_id, comment_id, like_id, message, is_read, 
                                    new_thread, new_follower, new_comment, new_reply, new_like) {
        const dbConnection = await connection.getConnection();
        await dbConnection.beginTransaction();

        try {
            await dbConnection.query(
                `UPDATE notification SET 
                    thread_id = ?, user_id = ?, from_user_id = ?, comment_id = ?, like_id = ?,
                    message = ?, is_read = ?, new_thread = ?, new_follower = ?,
                    new_comment = ?, new_reply = ?, new_like = ?
                WHERE ID = ?`,
                [
                    thread_id, user_id, from_user_id, comment_id, like_id,
                    message, is_read, new_thread, new_follower,
                    new_comment, new_reply, new_like, id
                ]
            );

            const [updatedNotification] = await dbConnection.query(
                'SELECT * FROM notification WHERE ID = ?',
                [id]
            );

            await dbConnection.commit();
            return updatedNotification[0];
        } catch (err) {
            await dbConnection.rollback();
            console.error("Database error:", err);
            throw err;
        } finally {
            dbConnection.release();
        }
    }
}

module.exports = Notification; 