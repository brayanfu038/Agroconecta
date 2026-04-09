const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItemPedido = sequelize.define('ItemPedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'pedido_id'
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
    precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'precio_unitario'
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'item_pedido',
    timestamps: false
});

module.exports = ItemPedido;