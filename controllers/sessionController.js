
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