const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const webRoutes = require('./routes/web');
const cookieParser = require('cookie-parser');

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Apply CORS middleware first
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    optionsSuccessStatus: 204
}));

app.use(cookieParser());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('<h1>Hello from backend!</h1>');
});

// Register routes
app.use('/api', webRoutes);

// Error handler for debugging
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Unexpected server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});