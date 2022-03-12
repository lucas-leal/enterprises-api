require('dotenv').config();

const User = require('./user');

User.sync({force: true});
