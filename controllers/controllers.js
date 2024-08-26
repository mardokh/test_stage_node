// Export modules
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const User = require('../models/user')


// Register user
exports.registerUser = async (req, res) => {
  
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName|| !lastName || !email || !password) {
      return res.status(400).json({message: 'Plase complete all fields of the form'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ firstName, lastName, email, password: hashedPassword })

    await user.save()

    return res.json({ message: 'Registration successful' })
  } 
  catch (error) {
    return res.status(500).json({ message: 'Database error!', error: error.message, stack: error.stack });
  }
}


// Login user
exports.loginUser = async (req, res) => {

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({message: 'Plase complete all fields of the form'})
    }
   
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password !' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password !' })
    }

    // Generate a token
    const token = jwt.sign({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
  }, 'chakibenaissa', {expiresIn: "24h"})

    return res.json({ message: 'Login successful', token })
  } 
  catch (error) {
    return res.status(500).json({ message: 'Database error!', error: error.message, stack: error.stack })
  }
}

// Get user
exports.getUser = async (req, res) => {

  try {
    const id = req.user._id
    
    if (!id) {
      return res.status(400).json({message: 'User id missing !'})
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({message: 'User not found !'})
    }

    return res.json({data: user})
  }
  catch (err) {
    return res.status(500).json({ message: 'Database error!', error: err.message, stack: err.stack })
  }

}