const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const scopes = require('../middlewares/scopes.middleware');
const validation = require('../middlewares/validation.middleware');
const { BadRequest } = require('../errors');

const router = express.Router();

router.get('/', scopes('users.list'), async (req, res) => {
    const users = await User.findAll({attributes: [
        'id',
        'username',
        'scopes',
        'employeeId',
        'createdAt',
        'updatedAt'
    ]});

    res.send(users);
});

router.post(
    '/',
    scopes('users.create'),
    validation.required(['username', 'password', 'scopes', 'employeeId']),
    async (req, res, next) => {
        try {
            await checkUser(req);

            let salt = Math.random();
            let hash = bcrypt.hashSync(req.body.password, salt)
            
            const user = await User.create({
                username: req.body.username,
                password: hash,
                scopes: req.body.scopes,
                employeeId: req.body.employeeId
            });

            res.status(201);
            res.send({
                id: user.id, 
                username: user.username,
                scopes: user.scopes,
                employeeId: user.employeeId
            });
        } catch (error) {
            next(error);
        }
    }
);

async function checkUser(req) {
    let user = await User.findOne({where: {username: req.body.username}});

    if (user) {
        throw new BadRequest('User already exists', [{param: 'username', message: "The user with username '"+req.body.username+"' already exists"}]);
    }

    user = await User.findOne({where: {employeeId: req.body.employeeId}});

    if (user) {
        throw new BadRequest('The employee already has a user', [{param: 'employeeId', message: "The employee '"+req.body.employeeId+"' already has a user"}]);
    }
}

module.exports = router;
