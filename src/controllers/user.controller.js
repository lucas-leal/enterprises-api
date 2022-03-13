const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.create = async (req, res, next) => {
    try {
        let salt = Math.random();
        let hash = bcrypt.hashSync(req.body.password, salt)
        
        const user = await User.create({
            username: req.body.username,
            password: hash,
            employeeId: req.body.employeeId
        });

        res.send({
            id: user.id, 
            username: user.username
        });
    } catch (error) {
        next(error);
    }
}
