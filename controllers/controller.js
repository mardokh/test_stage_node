// Export modules
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


// Create a new user
exports.createUser = async (req, res) => {
  
  const { firstName, lastName, email, password } = req.body

  try {
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

  const { email, password } = req.body

  try {
   
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate a token
    const token = jwt.sign({
      id: user._id,
      email: user.email
  }, 'chakibenaissa', {expiresIn: "24h"})

    return res.json({ message: 'Login successful', token })
  } 
  catch (error) {
    return res.status(500).json({ message: 'Database error!', error: error.message, stack: error.stack })
  }
}