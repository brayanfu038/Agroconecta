const sequelize = require('../config/db');

const Carrito = require('./Carrito');
const ItemCarrito = require('./ItemCarrito');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');
const Envio = require('./Envio');
const EmpresaLogistica = require('./EmpresaLogistica');
const Usuario = require('./Usuario');
const Productor = require('./Productor');
const Consumidor = require('./Consumidor');
const Administrador = require('./Administrador');

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

// Usuario -> roles
Usuario.hasOne(Productor, {
    foreignKey: 'id',
    as: 'productor'
});
Productor.belongsTo(Usuario, {
    foreignKey: 'id',
    as: 'usuario'
});

Usuario.hasOne(Consumidor, {
    foreignKey: 'id',
    as: 'consumidor'
});
Consumidor.belongsTo(Usuario, {
    foreignKey: 'id',
    as: 'usuario'
});

Usuario.hasOne(Administrador, {
    foreignKey: 'id',
    as: 'administrador'
});
Administrador.belongsTo(Usuario, {
    foreignKey: 'id',
    as: 'usuario'
});

// Consumidor -> Pedido (historial de pedidos)
Consumidor.hasMany(Pedido, {
    foreignKey: 'consumidor_id',
    sourceKey: 'id',
    as: 'historialPedidos',
    onDelete: 'CASCADE'
});
Pedido.belongsTo(Consumidor, {
    foreignKey: 'consumidor_id',
    targetKey: 'id',
    as: 'consumidor'
});



module.exports = {
    sequelize,
    Carrito,
    ItemCarrito,
    Pedido,
    ItemPedido,
    Envio,
    EmpresaLogistica,
    Usuario,
    Productor,
    Consumidor,
    Administrador
};