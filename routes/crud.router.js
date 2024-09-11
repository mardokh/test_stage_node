// import modules
const express = require('express')
const authController = require('../controllers/auth.controller.js')
const userController = require('../controllers/user.controller.js')
const jwtMiddleware = require('../middleware/jwt.auth.js')
const registerMiddleware = require('../middleware/register.check.js')
const loginMiddleware = require('../middleware/login.check.js')


// Initialize express router
const crudRouter = express.Router()

// Get user
crudRouter.get('/user', jwtMiddleware.checkToken, userController.getUser)

// Create new user
crudRouter.post('/register', registerMiddleware.checkRegister, authController.registerUser)

// Login user
crudRouter.post('/login', loginMiddleware.checkLogin, authController.loginUser)

// Logout user
crudRouter.get('/logout', authController.logoutUser)

// Check user session
crudRouter.get('/session', jwtMiddleware.checkToken, authController.checkSession)


// Export modules
module.exports = crudRouter