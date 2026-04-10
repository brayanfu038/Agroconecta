const administradorService = require('./administrador.service');

const getAll = async (req, res) => {
    try {
        const data = await administradorService.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar administradores', error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await administradorService.getById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener administrador', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const data = await administradorService.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear administrador', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const data = await administradorService.update(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar administrador', error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await administradorService.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar administrador', error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
