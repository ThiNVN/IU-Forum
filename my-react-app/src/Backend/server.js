const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8081;
const webRoutes = require('./src/routes/web');
const path = require('path');
console.log("Looking for web.js at:", path.resolve(__dirname, './src/routes/web'));
app.use(cors());
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