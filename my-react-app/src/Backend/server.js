const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
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
    origin: ['https://127.0.0.1:3000'],
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
    server.listen(PORT, () => {
        console.log(`🚀 HTTPS Server running on https://localhost:${PORT}`);
        console.log(`💡 To enable HTTPS, create SSL certificates in ./ssl/ directory`);
    });
} else {
    // Fallback to HTTP if no SSL certificates
    server = app.listen(PORT, () => {
        console.log(`🚀 HTTP Server running on http://localhost:${PORT}`);
        console.log(`💡 To enable HTTPS, create SSL certificates in ./ssl/ directory`);
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