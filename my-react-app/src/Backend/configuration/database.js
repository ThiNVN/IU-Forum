require('dotenv').config();
const mysql = require('mysql2/promise');

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;

const connection = mysql.createPool({
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_database,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 50
});

// Test the connection
(async () => {
    try {
        const [rows] = await connection.query('SELECT 1 + 1 AS result');
        console.log('Connection successful. Test result:', rows[0].result); // should log 2
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
})();

module.exports = connection;