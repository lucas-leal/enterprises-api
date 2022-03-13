class UserError extends Error {
    get httpCode() {
        return 400;
    }
}

class Unauthorized extends UserError {
    get httpCode() {
        return 401;
    }
}

module.exports = {UserError, Unauthorized};