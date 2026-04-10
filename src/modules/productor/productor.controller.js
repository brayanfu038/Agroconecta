const productorService = require('./productor.service');

const getAll = async (req, res) => {
    try {
        const data = await productorService.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar productores', error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await productorService.getById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Productor no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productor', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const data = await productorService.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear productor', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const data = await productorService.update(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({ message: 'Productor no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar productor', error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await productorService.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Productor no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar productor', error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
