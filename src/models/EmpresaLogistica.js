const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EmpresaLogistica = sequelize.define('EmpresaLogistica', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apiEndpoint: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'api_endpoint'
    }
}, {
    tableName: 'empresa_logistica',
    timestamps: false
});

module.exports = EmpresaLogistica;