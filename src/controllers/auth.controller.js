const jwt = require('jsonwebtoken')
const UserError = require('../user.error')

const DEFAULT_USERNAME = 'admin'
const DEFAULT_PASSWORD = 'A234$6'

module.exports.authorize = (req, res) => {
    if (req.body.username !== DEFAULT_USERNAME || req.body.password !== DEFAULT_PASSWORD) {
        throw new UserError('Wrong credentials')
    }

    let accessToken = jwt.sign({}, process.env.PRIVATE_KEY, {expiresIn: 60})

    res.send({accessToken})
}
