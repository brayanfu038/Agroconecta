

const ProductoService = require('./producto.service');

const ProductoController = {
    getAll: async (req, res) => {
        try {
            const result = await ProductoService.getAll();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getById: async (req, res) => {
        try {
            const result = await ProductoService.getById(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json(err);
        }
    },

    getByFinca: async (req, res) => {
        try {
            const result = await ProductoService.getByFinca(req.params.finca_id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getByCategoria: async (req, res) => {
        try {
            const result = await ProductoService.getByCategoria(req.params.categoria);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    create: async (req, res) => {
        try {
            const result = await ProductoService.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    update: async (req, res) => {
        try {
            const result = await ProductoService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateCantidad: async (req, res) => {
        try {
            const result = await ProductoService.updateCantidad(req.params.id, req.body.cantidad);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    delete: async (req, res) => {
        try {
            const result = await ProductoService.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = ProductoController;