
// empty field
exports.emptyField = (fields) => {
    return fields.every(field => field.trim() !== '')
}

// email validation
exports.validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

// password validation
exports.validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d.*\d).+$/
    return regex.test(password)
}