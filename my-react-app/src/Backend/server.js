const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.NODE_ENV === 'production' 
    ? '0.0.0.0'  // Listen on all available network interfaces
    : 'localhost';
const webRoutes = require('./routes/web');
const cookieParser = require('cookie-parser');
// const threadRoutes = require('./routes/threadRoutes');

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Apply CORS middleware first
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://iu-forum-server.vercel.app']
        : [process.env.FRONTEND_URL || 'http://localhost:3000'],
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

// Check if SSL certificates exist for HTTPS
const sslKeyPath = path.join(__dirname, 'ssl', 'key.pem');
const sslCertPath = path.join(__dirname, 'ssl', 'cert.pem');

let server;

if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
    // HTTPS server
    const sslOptions = {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath)
    };
    
    server = https.createServer(sslOptions, app);
    server.listen(PORT, HOST, () => {
        const protocol = 'https';
        const host = process.env.NODE_ENV === 'production' 
            ? 'iu-forum-server.vercel.app'
            : `${HOST}:${PORT}`;
        console.log(`🚀 Server running on ${protocol}://${host}`);
    });
} else {
    // Fallback to HTTP if no SSL certificates
    server = app.listen(PORT, HOST, () => {
        const protocol = 'http';
        const host = process.env.NODE_ENV === 'production' 
            ? 'iu-forum-server.vercel.app'
            : `${HOST}:${PORT}`;
        console.log(`🚀 Server running on ${protocol}://${host}`);
    });
}

// WebSocket server setup
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

app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));
// app.use('/api/threads', threadRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Development server running on http://localhost:${PORT}`);
    });
}

// Export the Express API
module.exports = app;