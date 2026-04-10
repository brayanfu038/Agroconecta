const {
    sequelize,
    Usuario,
    Productor
} = require('../../models');

const getAll = async () => {
    return Productor.findAll({
        include: [{ model: Usuario, as: 'usuario' }]
    });
};

const getById = async (id) => {
    return Productor.findByPk(id, {
        include: [{ model: Usuario, as: 'usuario' }]
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

        const productor = await Productor.create({
            id: usuario.id
        }, { transaction });

        await transaction.commit();
        return getById(productor.id);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const update = async (id, payload) => {
    const productor = await Productor.findByPk(id, {
        include: [{ model: Usuario, as: 'usuario' }]
    });

    if (!productor) {
        return null;
    }

    await productor.usuario.update({
        nombre: payload.nombre ?? productor.usuario.nombre,
        correo: payload.correo ?? productor.usuario.correo,
        telefono: payload.telefono ?? productor.usuario.telefono,
        fechaRegistro: payload.fechaRegistro ?? productor.usuario.fechaRegistro
    });

    return getById(id);
};

const remove = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const productor = await Productor.findByPk(id, { transaction });

        if (!productor) {
            await transaction.rollback();
            return false;
        }

        await Productor.destroy({ where: { id }, transaction });
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
