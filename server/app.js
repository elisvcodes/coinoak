const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
require('./db/db');

// Admin Middleware
app.use('/api/v1/coin', require('./routes/coin'));

// Assets middleware
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const PORT = process.env.PORT ? process.env.PORT : 7000;
app.listen(PORT);
