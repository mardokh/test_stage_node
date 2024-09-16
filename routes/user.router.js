// import modules
const express = require('express')
const userController = require('../controllers/user.controller.js')
const jwtMiddleware = require('../middleware/jwt.auth.js')


// Initialize express router
const userRouter = express.Router()

// Get user
userRouter.get('/user', jwtMiddleware.checkToken, userController.getUser)



// Export modules
module.exports = userRouter