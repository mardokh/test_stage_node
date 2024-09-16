// Import modules
const User = require('../models/user')


// Get user
exports.getUser = async (req, res) => {

    // Extract id 
    if (!req.user || !req.user.id) {
      return res.status(400).json({message: 'Missing user id !', data: [], type: "Failed"})
    }

    const id = req.user.id

    try {
      // Get user
      const user = await User.findById(id)
  
      // Check if user exist
      if (!user) {
        return res.status(404).json({message: 'User not found !', data: [], type: "Failed"})
      }
  
      // Success response
      return res.json({message: "User getting successfully", data: user, type: "Success"})
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }
  
  }