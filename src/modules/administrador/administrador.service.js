const {
    sequelize,
    Usuario,
    Administrador
} = require('../../models');

const getAll = async () => {
    return Administrador.findAll({
        include: [{ model: Usuario, as: 'usuario' }]
    });
};

const getById = async (id) => {
    return Administrador.findByPk(id, {
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

        const administrador = await Administrador.create({
            id: usuario.id
        }, { transaction });

        await transaction.commit();
        return getById(administrador.id);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const update = async (id, payload) => {
    const administrador = await Administrador.findByPk(id, {
        include: [{ model: Usuario, as: 'usuario' }]
    });

    if (!administrador) {
        return null;
    }

    await administrador.usuario.update({
        nombre: payload.nombre ?? administrador.usuario.nombre,
        correo: payload.correo ?? administrador.usuario.correo,
        telefono: payload.telefono ?? administrador.usuario.telefono,
        fechaRegistro: payload.fechaRegistro ?? administrador.usuario.fechaRegistro
    });

    return getById(id);
};

const remove = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const administrador = await Administrador.findByPk(id, { transaction });

        if (!administrador) {
            await transaction.rollback();
            return false;
        }

        await Administrador.destroy({ where: { id }, transaction });
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
