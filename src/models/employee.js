const { DataTypes, Model, UUIDV4 } = require('sequelize');
const sequelize = require('./sequelize')

const Address = require('./address');
const User = require('./user');

class Employee extends Model { }

Employee.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees'
});

Employee.hasOne(Address, {
    foreignKey: {
        name: 'employeeId',
        allowNull: false,
        unique: true
    }
});

Employee.hasOne(User, {
    foreignKey: {
        name: 'employeeId',
        allowNull: false,
        unique: true
    }
});

module.exports = Employee;
