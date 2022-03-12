require('dotenv').config();

const Employee = require('./employee');
const Address = require('./address');
const User = require('./user');

let synchronizeDatabase = async () => {
    await User.sync({force: true});
    await Employee.sync({force: true});
    await Address.sync({force: true});

    User.create({
        username: 'admin',
        password: '$2b$04$W8MipPZhsljb.RAy/LRNu.JnrfK5mFUJb8Y.WiRajeL7lOnqY6qsi'
    });
}

synchronizeDatabase();
