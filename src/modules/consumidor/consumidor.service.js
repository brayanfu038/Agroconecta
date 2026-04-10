const {
    sequelize,
    Usuario,
    Consumidor,
    Pedido
} = require('../../models');

const getAll = async () => {
    return Consumidor.findAll({
        include: [
            { model: Usuario, as: 'usuario' },
            { model: Pedido, as: 'historialPedidos' }
        ]
    });
};

const getById = async (id) => {
    return Consumidor.findByPk(id, {
        include: [
            { model: Usuario, as: 'usuario' },
            { model: Pedido, as: 'historialPedidos' }
        ]
    });
};

const create = async (payload) => {
    const transaction = await sequelize.transaction();

    try {
        const usuario = await Usuario.create({
            nombre: payload.nombre,
            correo: payload.correo,
            telefono: payload.telefono,
            fechaRegistro: payload.fechaRegistro
        }, { transaction });

        const consumidor = await Consumidor.create({
            id: usuario.id,
            ubicacion: payload.ubicacion
        }, { transaction });

        await transaction.commit();
        return getById(consumidor.id);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const update = async (id, payload) => {
    const consumidor = await Consumidor.findByPk(id, {
        include: [{ model: Usuario, as: 'usuario' }]
    });

    if (!consumidor) {
        return null;
    }

    await consumidor.usuario.update({
        nombre: payload.nombre ?? consumidor.usuario.nombre,
        correo: payload.correo ?? consumidor.usuario.correo,
        telefono: payload.telefono ?? consumidor.usuario.telefono,
        fechaRegistro: payload.fechaRegistro ?? consumidor.usuario.fechaRegistro
    });

    if (payload.ubicacion !== undefined) {
        await consumidor.update({ ubicacion: payload.ubicacion });
    }

    return getById(id);
};

const remove = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const consumidor = await Consumidor.findByPk(id, { transaction });

        if (!consumidor) {
            await transaction.rollback();
            return false;
        }

        await Consumidor.destroy({ where: { id }, transaction });
        await Usuario.destroy({ where: { id }, transaction });

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
