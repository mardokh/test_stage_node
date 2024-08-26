// import modules
const express = require('express');
const path = require('path')
const controller = require('../controllers/controllers.js')
const checkJwt = require('../auth/jwt_auth.js')

// Initialize express router
const router = express.Router()


// Main page
router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Dashboard page 
router.get('/dashboard', checkJwt.checkToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'))
})

// Create a new user
router.post('/api/register', controller.registerUser)

// Login user
router.post('/api/login', controller.loginUser)



module.exports = router