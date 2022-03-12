const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.create = async (req, res) => {
    let salt = Math.random();
    let hash = bcrypt.hashSync(req.body.password, salt)
    
    const user = await User.create({
        username: req.body.username,
        password: hash
    });

    res.send({
        id: user.id, 
        username: user.username
    });
}
