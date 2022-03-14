const { HttpError, BadRequest } = require("../errors");

module.exports = (err, req, res, next) => {
    let response = {message: err.message};

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    let status = err instanceof HttpError ? err.httpCode : 500;

    if (err instanceof BadRequest) {
        response.errors = err.errors;
    }

    res.status(status);
    res.send(response);
}
