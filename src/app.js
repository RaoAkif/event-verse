const express = require('express');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('QuickMeet API is running!');
});

module.exports = app;
