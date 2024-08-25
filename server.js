// Import modules
const express = require('express')
const path = require("path")
const db = require('./config/db')

// Import routes
const routes = require('./routes/routes');

// Initialize express
const app = express();

// Set communication format
app.use(express.json());

// Static file handler
app.use(express.static('public'))

// Routing end-point
app.use('', routes);

// Start server
app.listen(3000, () => {
    console.log('Server is running');
});
