const connection = require('../configuration/database');

const makeForumDB = async () => {
    try {


        const createUserTableSQL = `
            CREATE TABLE IF NOT EXISTS user (
                ID int NOT NULL AUTO_INCREMENT,
                username char(50) NOT NULL,
                full_name char(255) NOT NULL,
                avatar char(255) DEFAULT NULL,
                age int DEFAULT NULL,
                school char(255) DEFAULT NULL,
                major char(255) DEFAULT NULL,
                bio text,
                is_admin tinyint(1) DEFAULT '0',
                created_at timestamp NULL DEFAULT NULL,
                PRIMARY KEY (ID)
            );
        `;

        const createUserCredentialsTableSQL = `
            CREATE TABLE IF NOT EXISTS user_credentials (
                ID int NOT NULL AUTO_INCREMENT,
                email char(255) DEFAULT NULL,
                password_hash char(255) DEFAULT NULL,
                user_id int DEFAULT NULL,
                PRIMARY KEY (ID),
                KEY user_id (user_id),
                CONSTRAINT user_credentials_ibfk_1
                    FOREIGN KEY (user_id) REFERENCES user (ID)
                    ON DELETE CASCADE
            );
        `;

        const createCategoryTableSQL = `
        CREATE TABLE category (
            ID int NOT NULL AUTO_INCREMENT,
            name char(255) DEFAULT NULL,
            description char(255) DEFAULT NULL,
            PRIMARY KEY (ID)
          )
    `;

        const createPostTableSQL = `
    CREATE TABLE IF NOT EXISTS post (
        ID int NOT NULL AUTO_INCREMENT,
        user_id int NOT NULL,
        category_id int DEFAULT NULL,
        title char(255) DEFAULT NULL,
        content text,
        image char(255) DEFAULT NULL,
        create_at timestamp NULL DEFAULT NULL,
        PRIMARY KEY (ID),
        KEY category_id (category_id),
        KEY post_ibfk_1 (user_id),
        CONSTRAINT post_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (ID),
        CONSTRAINT post_ibfk_2 FOREIGN KEY (category_id) REFERENCES category (ID)
    )
`;

        const createCommentTableSQL = `
    CREATE TABLE IF NOT EXISTS comment (
        ID int NOT NULL AUTO_INCREMENT,
        post_id int NOT NULL,
        user_id int NOT NULL,
        parent_cmt_id int DEFAULT NULL,
        content text,
        create_at timestamp NULL DEFAULT NULL,
        PRIMARY KEY (ID),
        KEY parent_cmt_id (parent_cmt_id),
        KEY comment_ibfk_1 (user_id),
        KEY comment_ibfk_2 (post_id),
        CONSTRAINT comment_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (ID),
        CONSTRAINT comment_ibfk_2 FOREIGN KEY (post_id) REFERENCES post (ID),
        CONSTRAINT comment_ibfk_3 FOREIGN KEY (parent_cmt_id) REFERENCES comment (ID)
    )
`;

        const createLikeTableSQL = `
    CREATE TABLE IF NOT EXISTS like_table (
        ID int NOT NULL AUTO_INCREMENT,
        post_id int NOT NULL,
        user_id int NOT NULL,
        comment_id int DEFAULT NULL,
        create_at timestamp NULL DEFAULT NULL,
        PRIMARY KEY (ID),
        KEY comment_id (comment_id),
        KEY like_table_ibfk_1 (user_id),
        KEY like_table_ibfk_2 (post_id),
        CONSTRAINT like_table_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (ID),
        CONSTRAINT like_table_ibfk_2 FOREIGN KEY (post_id) REFERENCES post (ID),
        CONSTRAINT like_table_ibfk_3 FOREIGN KEY (comment_id) REFERENCES comment (ID)
    )
`;

        const createNotificationTableSQL = `
    CREATE TABLE IF NOT EXISTS notification (
        ID int NOT NULL AUTO_INCREMENT,
        post_id int DEFAULT NULL,
        user_id int DEFAULT NULL,
        from_user_id int DEFAULT NULL,
        comment_id int DEFAULT NULL,
        like_id int DEFAULT NULL,
        message text,
        is_read tinyint(1) DEFAULT NULL,
        create_at timestamp NULL DEFAULT NULL,
        new_post tinyint(1) DEFAULT '0',
        new_follower tinyint(1) DEFAULT '0',
        new_comment tinyint(1) DEFAULT '0',
        new_reply tinyint(1) DEFAULT '0',
        new_like tinyint(1) DEFAULT '0',
        PRIMARY KEY (ID),
        KEY user_id (user_id),
        KEY post_id (post_id),
        KEY comment_id (comment_id),
        KEY from_user_id (from_user_id),
        KEY like_id (like_id),
        CONSTRAINT notification_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (ID),
        CONSTRAINT notification_ibfk_2 FOREIGN KEY (post_id) REFERENCES post (ID),
        CONSTRAINT notification_ibfk_3 FOREIGN KEY (comment_id) REFERENCES comment (ID),
        CONSTRAINT notification_ibfk_4 FOREIGN KEY (from_user_id) REFERENCES user (ID),
        CONSTRAINT notification_ibfk_5 FOREIGN KEY (like_id) REFERENCES like_table (ID)
    )
`;

        const createFollowTableSQL = `
    CREATE TABLE IF NOT EXISTS follow (
        ID int NOT NULL AUTO_INCREMENT,
        follower_id int DEFAULT NULL,
        following_id int DEFAULT NULL,
        create_at timestamp NULL DEFAULT NULL,
        PRIMARY KEY (ID),
        KEY follower_id (follower_id),
        KEY following_id (following_id),
        CONSTRAINT follow_ibfk_1 FOREIGN KEY (follower_id) REFERENCES user (ID),
        CONSTRAINT follow_ibfk_2 FOREIGN KEY (following_id) REFERENCES user (ID)
    )
`;


        await connection.query(createUserTableSQL);
        console.log("User table created successfully!");

        await connection.query(createUserCredentialsTableSQL);
        console.log("User credentials table created successfully!");

        await connection.query(createCategoryTableSQL);
        console.log("Category table created successfully!");

        await connection.query(createPostTableSQL);
        console.log("Post table created successfully!");

        await connection.query(createCommentTableSQL);
        console.log("Comment table created successfully!");

        await connection.query(createLikeTableSQL);
        console.log("Like table created successfully!");

        await connection.query(createNotificationTableSQL);
        console.log("Notification table created successfully!");

        await connection.query(createFollowTableSQL);
        console.log("Follow table created successfully!");

    } catch (err) {
        console.error("Database error:", err);
        throw err;
    }
};


// Run the MakeTable
(async () => {
    try {
        await makeForumDB();
        console.log('All tables created successfully!');
        process.exit(0);  // Exit the process successfully
    } catch (error) {
        console.error('Error creating tables:', error);
        process.exit(1);  // Exit with an error code
    }
})();

// module.exports = makeForumDB;
