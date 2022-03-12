const { DataTypes, Model, UUIDV4 } = require('sequelize');
const sequelize = require('./sequelize')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User;
