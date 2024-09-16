const { emptyField } = require('../utils/form.util')


exports.checkLogin = async (req, res, next) => {

    try {
        // Extract inputs
        const { email, password } = req.body
        
        // Check empty fields
        if (!emptyField([email, password])) {
            return res.status(400).json({message: 'Plase complete all fields of the form', data: [], type: "Failed"})
        }

        // controller l'email 
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error !', data: [], type: "Failed"})
    }

    return next()
}