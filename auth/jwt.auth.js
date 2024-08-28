const jwt = require('jsonwebtoken')


exports.checkToken = async (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).json({ message: 'Missing Token' })
    }

    try {
        const decoded = await jwt.verify(token, 'chakibenaissa')
        req.user = decoded
    } 
    catch (err) {
        return res.status(401).json({ message: 'Bad token' })
    }

    return next()
}

