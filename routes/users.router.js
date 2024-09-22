// import modules
const express = require('express')
const usersController = require('../controllers/users.controller.js')
//const jwtMiddleware = require('../middleware/jwt.auth.js')
//const usersMiddleware = require('../middleware/users.check.js')

// Initialize express router
const usersRouter = express.Router()


// Create user
usersRouter.post('/create/user', usersController.createUser)

// Get users
usersRouter.get('/getting/users', usersController.getUsers)

// Get user
usersRouter.get('/getting/user/:id?', usersController.getUser)

// Update user
usersRouter.put('/update/user/:id?', usersController.updateUser)

// Delete user
usersRouter.delete('/delete/user/:id?', usersController.deleteUser)

// Search user 
usersRouter.get('/search/users', usersController.searchUser)

// Unable/Disable user
//usersRouter.post('/status/user', jwtMiddleware.checkToken, usersController)



// Export modules
module.exports = usersRouter