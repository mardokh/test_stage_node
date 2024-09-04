// import modules
const express = require('express');
const controller = require('../controllers/user.controller.js')
const middleware = require('../middleware/jwt.auth.js')

// Initialize express router
const router = express.Router()

router.get('/user', middleware.checkToken, controller.getUser)

// Create a new user
router.post('/register', controller.registerUser)

// Login user
router.post('/login', controller.loginUser)


module.exports = router