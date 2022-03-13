const { UserError } = require("../errors");

module.exports = (err, req, res, next) => {
    let response = {message: err.message};

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    let status = err instanceof UserError ? err.httpCode : 500;

    res.status(status);
    res.send(response);
}
