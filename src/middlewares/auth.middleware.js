const jwt = require('jsonwebtoken')
const UserError = require('../user.error')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        throw new UserError('The Authorization header is required')
    }

    let token = req.headers.authorization.split('Bearer ')[1]

    jwt.verify(token, process.env.PRIVATE_KEY);

    next()
}
