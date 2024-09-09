// import modules
const express = require('express')
const authController = require('../controllers/authController.js')
const sessionController = require('../controllers/sessionController.js')
const userController = require('../controllers/userController.js')
const middleware = require('../middleware/jwt.auth.js')

// Initialize express router
const endPoint = express.Router()

endPoint.get('/user', middleware.checkToken, userController.getUser)

// Create a new user
endPoint.post('/register', authController.registerUser)

// Login user
endPoint.post('/login', authController.loginUser) // middelxare login

// Logout user
endPoint.get('/logout', userController.logoutUser)

// Check user session
endPoint.get('/session', middleware.checkToken, sessionController.checkSession)


module.exports = endPoint