// Export modules
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


// Register user
exports.registerUser = async (req, res) => {
  
  try {
    // Extract inputs
    const { firstName, lastName, email, password } = req.body

    // Check empty inputs
    if (!firstName|| !lastName || !email || !password) {
      return res.status(400).json({message: 'Plase complete all fields of the form', type: "Failed"})
    }

    // Get user
    const user = await User.findOne({email})

    // Check if user exist
    if (user) {
      return res.status(409).json({message: "This user already exist", type: "Failed"})
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = new User({ firstName, lastName, email, password: hashedPassword })

    // Save user
    await newUser.save()

    // Success response
    return res.status(201).json({ message: 'Registration successful', data: newUser, type: "Success" })
  }
  // Catching errors 
  catch (error) {
    console.log(err)
    return res.status(500).json({ message: 'Server error !', type: "Failed" })
  }
}


// Login user
exports.loginUser = async (req, res) => {

  try {
    // Extract inputs
    const { email, password } = req.body

    // Check empty inputs
    if (!email || !password) {
      return res.status(400).json({message: 'Plase complete all fields of the form', type: "Failed"})
    }
   
    // Get user
    const user = await User.findOne({ email })

    // Check if user exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password !', type: "Failed" })
    }

    // Comparing password
    const isMatch = await bcrypt.compare(password, user.password)

    // Check if password match
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password !', type: "Failed" })
    }

    // Generate a token
    const token = jwt.sign({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }, process.env.JWT_SECRET, {expiresIn: "24h"})

    // Set token cookie
    res.cookie('token', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

    // Success response
    return res.json({ message: 'Login successful', data: user, type: "Success"})
  } 
  // Catching errors 
  catch (error) {
    console.log(err)
    return res.status(500).json({ message: 'Server error !', type: "Failed"})
  }
}


// Get user
exports.getUser = async (req, res) => {

  try {
    // Extract id 
    const id = req.user.id

    // Check if id exist
    if (!id) {
      return res.status(400).json({message: 'Missing user id !', type: "Failed"})
    }

    // Get user
    const user = await User.findById(id)

    // Check if user exist
    if (!user) {
      return res.status(404).json({message: 'User not found !', type: "Failed"})
    }

    // Success response
    return res.json({message: "User getting successfully", data: user, type: "Success"})
  }
  // Catching errors
  catch (error) {
    console.log(err)
    return res.status(500).json({ message: 'Server error !', type: "Failed"})
  }

}

// Logout user
exports.logoutUser = async (req, res) => {

  try {
    res.cookie('token', '', { 
      expires: new Date(0),
      httpOnly: true,
      path: '/'
    })
    //res.redirect('/')
    return res.json({message: "Cookie successfully redefined", type: "Success"})
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server error !', type: "Failed"})
  }
}

// Check user session
exports.checkSession = async (req, res) => {

  try {
    // Check if user returner
    if (!req.user) {
      return res.status(401).json({message: "Disconnected status", type: "UnAuthorized"})
    }

    // Success response
    return res.json({message: "Logged-in status", type: "Success"})
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server error !', type: "Failed"})
  }
}
