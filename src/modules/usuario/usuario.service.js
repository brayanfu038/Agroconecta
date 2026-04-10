const { Usuario } = require('../../models');

const getAll = async () => {
    return Usuario.findAll();
};

const getById = async (id) => {
    return Usuario.findByPk(id);
};

const login = async (correo) => {
    return Usuario.scope('withPassword').findOne({ where: { correo } });
};

const create = async (payload) => {
    const usuario = await Usuario.create(payload);
    return Usuario.findByPk(usuario.id);
};

const update = async (id, payload) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return null;
    }

    await usuario.update(payload);
    return Usuario.findByPk(usuario.id);
};

const remove = async (id) => {
    const deleted = await Usuario.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAll,
    getById,
    login,
    create,
    update,
    remove
};
