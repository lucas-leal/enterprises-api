require('dotenv').config();

const Employee = require('../models/employee');
const Address = require('../models/address');
const User = require('../models/user');

let refreshDb = async () => {
    await User.drop();
    await Address.drop();
    await Employee.drop();
    
    await Employee.sync();
    await User.sync();
    await Address.sync();

    const employee = await Employee.create({
        name: 'Michael Admin',
        documentNumber: '23944423',
        birthDate: '1980-03-12',
        position: 'CEO',
        startDate: '2010-08-27',
        salary: 15800
    });

    Address.create({
        addressLine: 'Howe St',
        city: 'Auckland',
        state: 'Vancouver',
        zipCode: '1125',
        country: 'Canadá',
        employeeId: employee.id
    });

    User.create({
        username: 'admin',
        password: '$2b$04$W8MipPZhsljb.RAy/LRNu.JnrfK5mFUJb8Y.WiRajeL7lOnqY6qsi',
        scopes: 'users.list users.create employees.list employees.create',
        employeeId: employee.id
    });
}

refreshDb();
