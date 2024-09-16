// Imports modules
const { emptyField, validateEmail } = require('../utils/form.util')


exports.checkUsers = async (req, res, next) => {
    
    try {
        // Extract inputs
        const { firstName, lastName, email } = req.body

        // Validations errors messages array
        let formatErrors = []

        // Check empty fields
        if (!emptyField([firstName, lastName, email])) {
            return res.status(400).json({ message: 'Please complete all fields of the form', data: [], type: "Failed" })
        }

        // Check email format
        if (!validateEmail(email)) {
            formatErrors.push({ message: 'Email field requires a valid email address format', data: "invalidEmail", type: "Failed" })
        }

        // Validations errors messages return
        if (formatErrors.length > 0) {
            return res.status(422).json(formatErrors)
        }
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error!', data: [], type: "Failed" })
    }

    // Next code
    return next()
}