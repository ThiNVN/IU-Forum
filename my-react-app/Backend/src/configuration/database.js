const path = require('path');
require('dotenv').config({ path: path.resolve('./Backend/.env') });
const mysql = require('mysql2/promise');
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
// Test.env
// console.log('DB_HOST:', db_host);
// console.log('DB_PORT:', db_port);
// console.log('DB_USER:', db_user);
// console.log('DB_PASSWORD:', db_password ? 'Exists' : 'Not Found');
// console.log('DB_NAME:', db_database);

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

module.exports = connection;