const usuarioService = require('./usuario.service');

const getAll = async (req, res) => {
    try {
        const data = await usuarioService.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios', error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await usuarioService.getById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const data = await usuarioService.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const data = await usuarioService.update(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await usuarioService.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
