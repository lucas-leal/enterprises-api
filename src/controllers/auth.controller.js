const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { BadRequest } = require('../errors');
const User = require('../models/user');
const validation = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/authorize', validation.required(['username', 'password']), async (req, res, next) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}});

        if (user instanceof User) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {scopes: user.scopes};

                const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: 3600});

                res.send({accessToken});
                
                return;
            }
        }

        throw new BadRequest('Wrong credentials');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
