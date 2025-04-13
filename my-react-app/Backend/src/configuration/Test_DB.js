const path = require('path');
require('dotenv').config({ path: path.resolve('./Backend/.env') });
const mysql = require('mysql2/promise');
//Test .env
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'Exists' : 'Not Found');
// console.log('DB_NAME:', process.env.DB_NAME);
//Test DB
(async () => {
    try {


        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('✅ Connected to the database successfully!');

        // Test a simple query
        const [rows] = await connection.execute('SELECT NOW()');
        console.log('Database Time:', rows[0]);

        await connection.end();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
})();