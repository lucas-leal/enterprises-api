const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');

module.exports.required = (params) => {
    return (req, res, next) => {
        const paramsWithError = params.filter(param => !req.body[param]);
        
        if (paramsWithError.length) {
            const errors = paramsWithError.map(param => {
                return {
                    param: param,
                    message: 'The param '+param+' is required'
                };
            });

            throw new BadRequest('Validation error', errors);
        }
    
        next();
    }
}
