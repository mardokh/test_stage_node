// import modules
const express = require('express');
const path = require('path')
const controller = require('../controllers/controllers.js')
const jwt_auth = require('../auth/jwt.auth.js')


// Initialize express router
const router = express.Router()

// Main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Dashboard page 
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'))
})

router.get('/api/user', jwt_auth.checkToken, controller.getUser)

// Create a new user
router.post('/api/register', controller.registerUser)

// Login user
router.post('/api/login', controller.loginUser)


module.exports = router