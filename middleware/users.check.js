// Imports modules
const { emptyField, validateEmail, validatePassword } = require('../utils/form.util')


exports.checkUsers = async (req, res, next) => {
    
    try {
        // Extract inputs
        const { firstName, lastName, email, password } = req.body

        // Validations errors messages array
        let formatErrors = []

        // Check empty fields
        if (!emptyField([firstName, lastName, email, password])) {
            return res.status(400).json({ message: 'Please complete all fields of the form', data: [], type: "Failed" })
        }

        // Check email format
        if (!validateEmail(email)) {
            formatErrors.push({ message: 'Email field requires a valid email address format', data: "invalidEmail", type: "Failed" })
        }

        // Check password format
        if (!validatePassword(password)) {
            formatErrors.push({ message: 'Password must contain at least one capital letter and two numbers', data: "invalidPassword", type: "Failed" })
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