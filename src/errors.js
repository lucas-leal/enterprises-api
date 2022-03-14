class HttpError extends Error {}

class BadRequest extends HttpError {
    get httpCode() {
        return 400;
    }
}

class Unauthorized extends HttpError {
    get httpCode() {
        return 401;
    }
}

class Forbidden extends HttpError {
    get httpCode() {
        return 403;
    }
}

module.exports = {HttpError, BadRequest, Unauthorized, Forbidden};
