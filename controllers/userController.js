// Export modules
const User = require('../models/user')


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