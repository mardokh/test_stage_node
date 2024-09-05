// import modules
const express = require('express');
const path = require('path')

// Initialize express router
const static = express.Router()

// Main page
static.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static', 'index.html'))
})

// Dashboard page 
static.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static', 'dashboard.html'))
})


module.exports = static