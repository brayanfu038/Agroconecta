const { Usuario } = require('../../models');

const getAll = async () => {
    return Usuario.findAll();
};

const getById = async (id) => {
    return Usuario.findByPk(id);
};

const create = async (payload) => {
    return Usuario.create(payload);
};

const update = async (id, payload) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return null;
    }

    await usuario.update(payload);
    return usuario;
};

const remove = async (id) => {
    const deleted = await Usuario.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
