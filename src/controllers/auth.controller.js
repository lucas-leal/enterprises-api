const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserError = require('../user.error');
const User = require('../models/user');

module.exports.authorize = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}});

        if (user instanceof User) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const accessToken = jwt.sign({}, process.env.PRIVATE_KEY, {expiresIn: 3600});

                res.send({accessToken});
                
                return;
            }
        }

        throw new UserError('Wrong credentials');
    } catch (error) {
        next(error);
    }
}
