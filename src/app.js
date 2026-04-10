const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');
const usuarioRoutes = require('./modules/usuario/usuario.routes');
const productorRoutes = require('./modules/productor/productor.routes');
const consumidorRoutes = require('./modules/consumidor/consumidor.routes');
const administradorRoutes = require('./modules/administrador/administrador.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Backend AgroConecta - Fase de persistencia funcionando' });
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productores', productorRoutes);
app.use('/api/consumidores', consumidorRoutes);
app.use('/api/administradores', administradorRoutes);

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