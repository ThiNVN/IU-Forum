const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 3000;
const webRoutes = require('./routes/web');
const cookieParser = require('cookie-parser');

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Apply CORS middleware first
app.use(cors({
    origin: [process.env.FRONTEND_URL],
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

// Handle static files
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });

    // WebSocket server setup (only in development)
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log('Received:', message.toString());
            // Echo the message back to the client
            ws.send(message.toString());
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        // Send a welcome message
        ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WebSocket server' }));
    });
}

// Export the Express API
module.exports = app;