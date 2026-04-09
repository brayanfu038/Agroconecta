const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Backend AgroConecta - Fase de persistencia funcionando' });
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexion a MySQL exitosa');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Modelos sincronizados correctamente');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al iniciar la aplicacion:', error);
    });