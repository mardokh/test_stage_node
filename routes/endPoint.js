// import modules
const express = require('express')
const controller = require('../controllers/user.controller.js')
const middleware = require('../middleware/jwt.auth.js')

// Initialize express router
const endPoint = express.Router()

endPoint.get('/user', middleware.checkToken, controller.getUser)

// Create a new user
endPoint.post('/register', controller.registerUser)

// Login user
endPoint.post('/login', controller.loginUser)

// Logout user
endPoint.get('/logout', controller.logoutUser)


module.exports = endPoint