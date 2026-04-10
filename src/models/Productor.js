const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Productor = sequelize.define('Productor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id'
        }
    }
}, {
    tableName: 'productor',
    timestamps: false
});

module.exports = Productor;
