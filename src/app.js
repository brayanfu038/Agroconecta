const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');
const usuarioRoutes = require('./modules/usuario/usuario.routes');
const productorRoutes = require('./modules/productor/productor.routes');
const consumidorRoutes = require('./modules/consumidor/consumidor.routes');
const administradorRoutes = require('./modules/administrador/administrador.routes');

const app = express();
const publicDir = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(publicDir));

app.get('/api', (req, res) => {
    res.json({ message: 'Backend AgroConecta - Fase de persistencia funcionando' });
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productores', productorRoutes);
app.use('/api/consumidores', consumidorRoutes);
app.use('/api/administradores', administradorRoutes);

app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
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