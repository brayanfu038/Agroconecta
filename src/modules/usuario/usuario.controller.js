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

const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo) {
            return res.status(400).json({ message: 'El correo es obligatorio' });
        }

        if (!contrasena) {
            return res.status(400).json({ message: 'La contrasena es obligatoria' });
        }

        const usuario = await usuarioService.login(correo);

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales invalidas' });
        }

        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({ message: 'Credenciales invalidas' });
        }

        res.json({
            message: 'Inicio de sesion exitoso',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                telefono: usuario.telefono
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesion', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        if (!req.body.contrasena) {
            return res.status(400).json({ message: 'La contrasena es obligatoria' });
        }

        const data = await usuarioService.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El correo ya esta registrado' });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Datos de usuario invalidos', error: error.message });
        }

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
    login,
    create,
    update,
    remove
};
