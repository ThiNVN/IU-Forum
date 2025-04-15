const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') });
const mysql = require('mysql2/promise');

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
// Test.env
console.log('DB_HOST:', db_host);
console.log('DB_HOST:', db_host);
console.log('DB_PORT:', db_port);
console.log('DB_USER:', db_user);
console.log('DB_PASSWORD:', db_password ? 'Exists' : 'Not Found');
const connection = mysql.createPool({
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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