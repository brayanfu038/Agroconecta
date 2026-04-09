const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    consumidorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'consumidor_id'
    },
    modalidadEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'modalidad_entrega'
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDIENTE'
    },
    costoEnvio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        field: 'costo_envio'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fechaPedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'fecha_pedido'
    }
}, {
    tableName: 'pedido',
    timestamps: false
});

module.exports = Pedido;