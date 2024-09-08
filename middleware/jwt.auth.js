const jwt = require('jsonwebtoken')


exports.checkToken = async (req, res, next) => {

    // Extract token 
    const token = req.cookies.token

    // Check if token exist
    if (!token) {
        return res.status(403).json({ message: 'Token not found', type: "Forbidden" })
    }

    // Check token validity
    try {
        const decoded = await jwt.verify(token, 'chakibenaissa')
        // check user in database
        req.user = decoded
    }
    // Catching errors 
    catch (err) {
        return res.status(401).json({ message: 'Bad token', type: "UnAuthorized" })
    }

    // Next actions
    return next()
}

