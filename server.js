// Import modules
require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require('./config/db')


// Import routes
const static = require('./routes/static.router')
const endPoint = require('./routes/endPoint.router')

// Initialize express
const app = express()

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
    console.log('Server is running', process.env.JWT_SECRET)
})
