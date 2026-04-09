const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Envio = sequelize.define('Envio', {
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
    empresaLogisticaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'empresa_logistica_id'
    },
    codigoSeguimiento: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'codigo_seguimiento'
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'CREADO'
    },
    costoCalculado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        field: 'costo_calculado'
    }
}, {
    tableName: 'envio',
    timestamps: false
});

module.exports = Envio;