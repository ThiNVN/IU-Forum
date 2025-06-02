const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

const express = require('express');
const cors = require('cors');
const app = express();
const webRoutes = require('./routes/web');
const cookieParser = require('cookie-parser');

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Apply CORS middleware first
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://iu-forum-server.vercel.app']
        : [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    optionsSuccessStatus: 204
}));

app.use(cookieParser());
app.use(express.json({ charset: 'utf-8' }));
app.use(express.urlencoded({ extended: true }));

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

app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Only for local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Development server running on http://localhost:${PORT}`);
    });
}

// Export for Vercel serverless
module.exports = app;