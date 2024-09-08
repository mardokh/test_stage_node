// Import modules
require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require('./config/db')


// Initialize express
const app = express()

// Import routes
const static = require('./routes/static.router')
const endPoint = require('./routes/endPoint.router')

// Middleware to prevent caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
  });


// Cookie handler
app.use(cookieParser())

// Set communication format
app.use(express.json())

// Static file handler
app.use(express.static(path.join(__dirname, 'public')));

// Routing end-point
app.use('', static)
app.use('/api', endPoint)


// Start server
app.listen(3000, () => {
    console.log('Server is running')
})
