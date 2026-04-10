

const HorarioService = require('./horario.service');

const HorarioController = {
    getByFinca: async (req, res) => {
        try {
            const result = await HorarioService.getByFinca(req.params.finca_id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getById: async (req, res) => {
        try {
            const result = await HorarioService.getById(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json(err);
        }
    },

    create: async (req, res) => {
        try {
            const result = await HorarioService.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    update: async (req, res) => {
        try {
            const result = await HorarioService.update(req.params.id, req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    delete: async (req, res) => {
        try {
            const result = await HorarioService.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = HorarioController;