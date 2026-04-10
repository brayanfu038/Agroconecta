
const db = require('../config/db');

const Finca = {
  // Obtener todas las fincas
  getAll: (callback) => {
    const sql = `SELECT * FROM finca WHERE activa = TRUE`;
    db.query(sql, callback);
  },

  // Obtener finca por ID
  getById: (id, callback) => {
    const sql = `SELECT * FROM finca WHERE id = ? AND activa = TRUE`;
    db.query(sql, [id], callback);
  },

  // Obtener fincas por productor
  getByProductor: (productor_id, callback) => {
    const sql = `SELECT * FROM finca WHERE productor_id = ? AND activa = TRUE`;
    db.query(sql, [productor_id], callback);
  },

  // Crear finca
  create: (data, callback) => {
    const sql = `
      INSERT INTO finca (nombre, direccion, latitud, longitud, descripcion, productor_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.nombre,
      data.direccion,
      data.latitud,
      data.longitud,
      data.descripcion,
      data.productor_id
    ];
    db.query(sql, values, callback);
  },

  // Actualizar finca
  update: (id, data, callback) => {
    const sql = `
      UPDATE finca 
      SET nombre = ?, direccion = ?, latitud = ?, longitud = ?, descripcion = ?
      WHERE id = ?
    `;
    const values = [
      data.nombre,
      data.direccion,
      data.latitud,
      data.longitud,
      data.descripcion,
      id
    ];
    db.query(sql, values, callback);
  },

  // Eliminar finca (soft delete)
  delete: (id, callback) => {
    const sql = `UPDATE finca SET activa = FALSE WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = Finca;