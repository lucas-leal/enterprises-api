class HttpError extends Error {
    #errors;

    constructor(message, errors) {
        super(message);

        this.#errors = errors;
    }

    get errors() {
        return this.#errors;
    }
}

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
