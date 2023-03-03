const { Unauthenticated } = require('../errors')
const jwt = require('jsonwebtoken')


const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthenticated('No token provided')
    }
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    // console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new Unauthenticated('Not authorized to access this route')
    }

}

module.exports = authenticationMiddleware