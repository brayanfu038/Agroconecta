const db = require("../config/db");

const Horario = {
    // Obtener horarios por finca
    getByFinca: (finca_id, callback) => {
        const sql = `SELECT * FROM horario_atencion WHERE finca_id = ?`;
        db.query(sql, [finca_id], callback);
    },

    // Obtener horario por ID
    getById: (id, callback) => {
        const sql = `SELECT * FROM horario_atencion WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    // Crear horario
    create: (data, callback) => {
        const sql = `
        INSERT INTO horario_atencion (finca_id, dia_semana, hora_inicio, hora_fin)
        VALUES (?, ?, ?, ?)
    `;
        const values = [
            data.finca_id,
            data.dia_semana,
            data.hora_inicio,
            data.hora_fin,
        ];
        db.query(sql, values, callback);
    },

    // Actualizar horario
    update: (id, data, callback) => {
        const sql = `
        UPDATE horario_atencion 
        SET dia_semana = ?, hora_inicio = ?, hora_fin = ?
        WHERE id = ?
    `;
        const values = [data.dia_semana, data.hora_inicio, data.hora_fin, id];
        db.query(sql, values, callback);
    },

    // Eliminar horario
    delete: (id, callback) => {
        const sql = `DELETE FROM horario_atencion WHERE id = ?`;
        db.query(sql, [id], callback);
    },
};

module.exports = Horario;
