const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    consumidorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'consumidor_id'
    }
}, {
    tableName: 'carrito',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Carrito;