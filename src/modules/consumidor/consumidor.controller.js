const consumidorService = require('./consumidor.service');

const getAll = async (req, res) => {
    try {
        const data = await consumidorService.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar consumidores', error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await consumidorService.getById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Consumidor no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener consumidor', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const data = await consumidorService.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear consumidor', error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const data = await consumidorService.update(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({ message: 'Consumidor no encontrado' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar consumidor', error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await consumidorService.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Consumidor no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar consumidor', error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
