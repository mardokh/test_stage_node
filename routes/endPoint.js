// import modules
const express = require('express');
const path = require('path')
const controller = require('../controllers/user.controller.js')
const middleware = require('../middleware/jwt.auth.js')


// Initialize express router
const endPoint = express.Router()

// Main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Dashboard page 
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'))
})

router.get('/api/user', middleware.checkToken, controller.getUser)

// Create a new user
router.post('/api/register', controller.registerUser)

// Login user
router.post('/api/login', controller.loginUser)


module.exports = endPoint