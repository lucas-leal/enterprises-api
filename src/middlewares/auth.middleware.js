const jwt = require('jsonwebtoken');
const { UserError, Unauthorized } = require('../errors');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        throw new UserError('The Authorization header is required');
    }

    let token = req.headers.authorization.split('Bearer ')[1];

    try {
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        
        req.scopes = payload.scopes.split(' ');
    } catch (error) {
        throw new Unauthorized(error.message);
    }

    next();
}
