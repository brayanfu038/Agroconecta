const sequelize = require('../config/db');

const Carrito = require('./Carrito');
const ItemCarrito = require('./ItemCarrito');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');
const Envio = require('./Envio');
const EmpresaLogistica = require('./EmpresaLogistica');

// Carrito -> ItemCarrito
Carrito.hasMany(ItemCarrito, {
    foreignKey: 'carrito_id',
    as: 'items'
});
ItemCarrito.belongsTo(Carrito, {
    foreignKey: 'carrito_id',
    as: 'carrito'
});

// Pedido -> ItemPedido
Pedido.hasMany(ItemPedido, {
    foreignKey: 'pedido_id',
    as: 'itemsPedido'
});
ItemPedido.belongsTo(Pedido, {
    foreignKey: 'pedido_id',
    as: 'pedido'
});

// Pedido -> Envio
Pedido.hasOne(Envio, {
    foreignKey: 'pedido_id',
    as: 'envio'
});
Envio.belongsTo(Pedido, {
    foreignKey: 'pedido_id',
    as: 'pedido'
});

// EmpresaLogistica -> Envio
EmpresaLogistica.hasMany(Envio, {
    foreignKey: 'empresa_logistica_id',
    as: 'envios'
});
Envio.belongsTo(EmpresaLogistica, {
    foreignKey: 'empresa_logistica_id',
    as: 'empresaLogistica'
});

module.exports = {
    sequelize,
    Carrito,
    ItemCarrito,
    Pedido,
    ItemPedido,
    Envio,
    EmpresaLogistica
};