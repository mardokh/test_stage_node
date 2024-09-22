// Import modules
const Users = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


// Create user
exports.createUser = async (req, res) => {

    // Extract inputs
    const { firstName, lastName, email, password} = req.body

    try {
        // Search user in database
        const user = await Users.findOne({email})

        // Check if user already exist
        if (user) {
            return res.status(409).json({message: "This user already exist", data: user, type: "Failed"})
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const newUser = new Users({ firstName, lastName, email, password: hashedPassword })

        // Save user
        await newUser.save()

        // Success response
        return res.status(201).json({ message: 'User created successfully', data: newUser, type: "Success"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }
}


// Get users
exports.getUsers = async (req, res) => {

    try {
        // Get all users
        const users = await Users.find()

        // Check if users exist
        if (users.length === 0) {
            return res.status(404).json({ message: "No users founded", data: [], type: "Failed"})
        }

        // Success response
        return res.json({message: 'Users getting successfully', data: users, type: "success" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }
}


// Get user
exports.getUser = async (req, res) => {

    // Extract user id
    const id = req.params.id

    // Check if id is missing
    if (!id) {
        return res.status(400).json({ message: "Missing user id", data: [], type: "Failed" })
    }

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id", data: [], type: "Failed" })
    }

    try {
        // Get user
        const user = await Users.findById(id)

        // Check if user exist
        if (!user) {
            return res.status(404).json({ message: "This user does not exist", data: [], type: "Failed"})
        }

        // Success response
        return res.json({message: 'User getting successfully', data: user, type: "success" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }
}


// Search user
exports.searchUser = async (req, res) => {

    const searchTerm = req.query.query

    try {
        // Find users
        const users = await Users.find({
            $or: [
                { firstName: new RegExp(searchTerm, 'i') },
                { lastName: new RegExp(searchTerm, 'i') }
            ]
        })

        // Success response
        return res.json({message: 'User finded successfully', data: users, type: "success" })
    } 
    catch (error) {
        console.log(err)
        return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }
}


// Update user
exports.updateUser = async (req, res) => {

    // Extract user id
    const id = req.params.id

    // Check if id is missing
    if (!id) {
        return res.status(400).json({ message: "Missing user id", data: [], type: "Failed" })
    }

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id", data: [], type: "Failed" })
    }
       
    try {
        // Search user in database
        const user = await Users.findById(id)

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "This user does not exist", data: [], type: "Failed" })
        }

        // Extract body request
        const newData = req.body;

        // Update user
        const updatedUser = await Users.findByIdAndUpdate(id, newData, { new: true })

        // Success response
        return res.json({ message: "User updated successfully", data: updatedUser, type: "Success" })
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error!', data: [], type: "Failed" })
    }
}


// Delete user
exports.deleteUser = async (req, res) => {

    // Extract user id
    const id = req.params.id

    // Check id validity
    if (!id) {
        return res.status(400).json({message: "Missing user id", data: [], type: "Failed"})
    }

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id", data: [], type: "Failed" })
    }

    // Search user in database
    const user = await Users.findById(id)

    // Check if user exist
    if (!user) {
        return res.status(404).json({message: "This user do not exist", data: [], type: "Failed"})
    }

    try {
        // Delete user
        await Users.findByIdAndDelete(id)

        // Sucess response
        return res.status(204).send()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }

}


// Disable/Unable user

// ....