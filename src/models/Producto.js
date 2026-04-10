const db = require("../config/db");

const Producto = {
    // Obtener todos los productos
    getAll: (callback) => {
        const sql = `SELECT * FROM producto WHERE activo = TRUE`;
        db.query(sql, callback);
    },

    // Obtener producto por ID
    getById: (id, callback) => {
        const sql = `SELECT * FROM producto WHERE id = ? AND activo = TRUE`;
        db.query(sql, [id], callback);
    },

    // Obtener productos por finca
    getByFinca: (finca_id, callback) => {
        const sql = `SELECT * FROM producto WHERE finca_id = ? AND activo = TRUE`;
        db.query(sql, [finca_id], callback);
    },

    // Obtener productos por categoría
    getByCategoria: (categoria, callback) => {
        const sql = `SELECT * FROM producto WHERE categoria = ? AND activo = TRUE`;
        db.query(sql, [categoria], callback);
    },

    // Crear producto
    create: (data, callback) => {
        const sql = `
        INSERT INTO producto 
        (nombre, descripcion, precio, cantidad_disponible, categoria, foto_url, unidad_medida, finca_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [
            data.nombre,
            data.descripcion,
            data.precio,
            data.cantidad_disponible,
            data.categoria,
            data.foto_url,
            data.unidad_medida,
            data.finca_id,
        ];
        db.query(sql, values, callback);
    },

    // Actualizar producto
    update: (id, data, callback) => {
        const sql = `
        UPDATE producto 
        SET nombre = ?, descripcion = ?, precio = ?, 
            cantidad_disponible = ?, categoria = ?, 
            foto_url = ?, unidad_medida = ?
        WHERE id = ?
    `;
        const values = [
            data.nombre,
            data.descripcion,
            data.precio,
            data.cantidad_disponible,
            data.categoria,
            data.foto_url,
            data.unidad_medida,
            id,
        ];
        db.query(sql, values, callback);
    },

    // Actualizar cantidad disponible
    updateCantidad: (id, cantidad, callback) => {
        const sql = `UPDATE producto SET cantidad_disponible = ? WHERE id = ?`;
        db.query(sql, [cantidad, id], callback);
    },

    // Eliminar producto (soft delete)
    delete: (id, callback) => {
        const sql = `UPDATE producto SET activo = FALSE WHERE id = ?`;
        db.query(sql, [id], callback);
    },
};

module.exports = Producto;
