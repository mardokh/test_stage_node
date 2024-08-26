const jwt = require('jsonwebtoken')


exports.checkToken = (req, res, next) => {

    const token = req.headers['authorization']

    if (!token) {
        return res.status(403).json({ message: 'Missing Token' })
    }

    try {
        const decoded = jwt.verify(token, 'chakibenaissa')
        req.user = decoded
    }
    catch (err) {
        return res.status(401).json({ message: 'Bad Token' })
    }

    return next()
}
