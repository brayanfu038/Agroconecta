
const FincaService = require("./finca.service");

const FincaController = {
    getAll: async (req, res) => {
        try {
            const result = await FincaService.getAll();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getById: async (req, res) => {
        try {
            const result = await FincaService.getById(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json(err);
        }
    },

    getByProductor: async (req, res) => {
        try {
            const result = await FincaService.getByProductor(req.params.productor_id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    create: async (req, res) => {
        try {
            const result = await FincaService.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    update: async (req, res) => {
        try {
            const result = await FincaService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    delete: async (req, res) => {
        try {
            const result = await FincaService.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },
};

module.exports = FincaController;
