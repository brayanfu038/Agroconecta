const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Consumidor = sequelize.define('Consumidor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id'
        }
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'consumidor',
    timestamps: false
});

module.exports = Consumidor;
