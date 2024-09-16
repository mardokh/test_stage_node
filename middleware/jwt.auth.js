const jwt = require('jsonwebtoken')


exports.checkToken = async (req, res, next) => {

    // Extract token 
    const token = req.cookies.token

    // Check if token exist
    if (!token) {
        return res.status(403).json({ message: 'Token not found', data: [], type: "Forbidden" })
    }

    // Check token validity
    try {
        const decoded = await jwt.verify(token, 'chakibenaissa')
        req.user = decoded
    }
    // Catching errors 
    catch (err) {
        return res.status(401).json({ message: 'Bad token', data: [], type: "UnAuthorized" })
    }

    // Next actions
    return next()
}

