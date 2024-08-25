// import modules
const express = require('express');
const path = require('path')
const controller = require('../controllers/controller')

// Initialize express router
const router = express.Router()

// Main page
router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Dashboard page 
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'))
})

// Create a new user
router.post('/register', controller.createUser)

// Login user
router.post('/connection', controller.loginUser)



module.exports = router