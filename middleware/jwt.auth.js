const jwt = require('jsonwebtoken')


exports.checkToken = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(403).json({ message: 'Token not found', type: "Forbidden" })
    }

    try {
        const decoded = await jwt.verify(token, 'chakibenaissa')
        req.user = decoded
    } 
    catch (err) {
        return res.status(401).json({ message: 'Bad token', type: "UnAuthorized" })
    }

    return next()
}

