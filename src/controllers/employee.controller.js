const express = require('express');
const Address = require('../models/address');

const Employee = require('../models/employee');
const scopes = require('../middlewares/scopes.middleware');
const validation = require('../middlewares/validation.middleware');

const { BadRequest } = require('../errors');

const router = express.Router();

router.get('/', scopes('employees.list'), async (req, res) => {
    const employees = await Employee.findAll({include: Address});

    res.send(employees);
});

router.post(
    '/',
    scopes('employees.create'),
    validation.required(['name', 'documentNumber', 'birthDate', 'position', 'startDate', 'salary', 'address']),
    async (req, res, next) => {
        try {
            await checkEmployee(req);

            const employee = await Employee.create({
                name: req.body.name,
                documentNumber: req.body.documentNumber,
                birthDate: req.body.birthDate,
                position: req.body.position,
                startDate: req.body.startDate,
                salary: req.body.salary
            });
        
            await Address.create({
                addressLine: req.body.address.addressLine,
                city: req.body.address.city,
                state: req.body.address.state,
                zipCode: req.body.address.zipCode,
                country: req.body.address.country,
                employeeId: employee.id
            });
        
            res.send(employee);
        } catch (error) {
            next(error);
        }
    }
);

async function checkEmployee(req) {
    const employee = await Employee.findOne({where: {documentNumber: req.body.documentNumber}});

    if (employee) {
        throw new BadRequest('Employee already exists', [{param: 'documentNumber', message: "The employee with document number '"+req.body.documentNumber+"' already exists"}])
    }
}

module.exports = router;
