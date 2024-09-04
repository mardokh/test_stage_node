// import modules
const express = require('express');
const path = require('path')

// Initialize express router
const static = express.Router()

// Main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static', 'index.html'))
})

// Dashboard page 
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static', 'dashboard.html'))
})


module.exports = static