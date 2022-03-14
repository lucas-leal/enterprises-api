const express = require('express');
const Address = require('../models/address');
const router = express.Router();

const Employee = require('../models/employee');

const scopes = require('../middlewares/scopes.middleware');

router.get('/', scopes('employees.list'), async (req, res) => {
    const employees = await Employee.findAll({include: Address});

    res.send(employees);
});

router.post('/', scopes('employees.create'), async (req, res, next) => {
    try {
        const employee = await Employee.create({
            name: req.body.name,
            documentNumber: req.body.documentNumber,
            birthDate: req.body.birthDate,
            position: req.body.position,
            startDate: req.body.startDate,
            salary: req.body.salary
        });
    
        const address = await Address.create({
            addressLine: 'foo',
            city: 'Belo Horizonte',
            state: 'MG',
            zipCode: '30890000',
            country: 'Brazil',
            employeeId: employee.id
        });
    
        res.send(employee);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
