const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors');

module.exports = (scope) => {
    return (req, res, next) => {
        if (req.scopes.indexOf(scope) === -1) {
            throw new Forbidden('Resource not allowed');
        }
    
        next();
    }
}
