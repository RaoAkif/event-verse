require('module-alias/register');

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('QuickMeet API is running!');
});

module.exports = app;
