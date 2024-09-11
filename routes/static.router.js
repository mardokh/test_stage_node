// Import modules
const express = require('express')
const path = require('path')


// Initialize express router
const staticRouter = express.Router()

// Main page
staticRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static', 'index.html'))
})

// Dashboard page 
staticRouter.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static', 'dashboard.html'))
})


// Export modules
module.exports = staticRouter;
