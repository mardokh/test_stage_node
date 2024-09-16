// import modules
const express = require('express')
const authController = require('../controllers/auth.controller.js')
const jwtMiddleware = require('../middleware/jwt.auth.js')
const registerMiddleware = require('../middleware/register.check.js')
const loginMiddleware = require('../middleware/login.check.js')


// Initialize express router
const authRouter = express.Router()


// Create new user
authRouter.post('/register', registerMiddleware.checkRegister, authController.registerUser)

// Login user
authRouter.post('/login', loginMiddleware.checkLogin, authController.loginUser)

// Logout user
authRouter.get('/logout', jwtMiddleware.checkToken, authController.logoutUser)

// Check user session
authRouter.get('/session', jwtMiddleware.checkToken, authController.checkSession)


// Export modules
module.exports = authRouter