// import modules
const express = require('express')
const usersController = require('../controllers/users.controller.js')
const jwtMiddleware = require('../middleware/jwt.auth.js')
const usersMiddleware = require('../middleware/users.check.js')

// Initialize express router
const usersRouter = express.Router()


// Create user
usersRouter.post('/create/user', usersMiddleware.checkUsers, usersController.createUser)

// Get users
usersRouter.get('/getting/users', usersController.getUsers)

// Update user
usersRouter.put('/update/user/:id?', usersMiddleware.checkUsers, usersController.updateUser)

// Delete user
usersRouter.delete('/delete/user/:id?', usersController.deleteUser)

// Unable/Disable user
//usersRouter.post('/status/user', jwtMiddleware.checkToken, usersController)



// Export modules
module.exports = usersRouter