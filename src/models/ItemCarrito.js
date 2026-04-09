const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItemCarrito = sequelize.define('ItemCarrito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    carritoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'carrito_id'
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'producto_id'
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'item_carrito',
    timestamps: false
});

module.exports = ItemCarrito;