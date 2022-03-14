const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const scopes = require('../middlewares/scopes.middleware');

const router = express.Router();

router.post('/', scopes('users.create'), async (req, res, next) => {
    try {
        let salt = Math.random();
        let hash = bcrypt.hashSync(req.body.password, salt)
        
        const user = await User.create({
            username: req.body.username,
            password: hash,
            scopes: req.body.scopes,
            employeeId: req.body.employeeId
        });

        res.send({
            id: user.id, 
            username: user.username
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

