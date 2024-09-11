// Import modules
require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require('./config/db')


// Initialize express
const app = express()

// Import routes
const staticRouter = require('./routes/static.router')
const crudRouter = require('./routes/crud.router')

// Cookie handler
app.use(cookieParser())

// Set communication format
app.use(express.json())

// Static file handler
app.use(express.static(path.join(__dirname, 'public')))

// Routing end-point
app.use('', staticRouter)
app.use('/api', crudRouter)

// Start server
app.listen(3000, () => {
    console.log('Server is running')
})
