const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;
const webRoutes = require('./routes/web');
const path = require('path');
const cookieParser = require('cookie-parser');

console.log("Looking for web.js at:", path.resolve(__dirname, './routes/web'));

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true // Allow cookies
}));
app.use(cookieParser());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

// Register route
app.use('/api', webRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});