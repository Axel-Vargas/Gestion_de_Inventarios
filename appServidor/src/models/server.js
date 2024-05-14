const express = require('express');
const connection = require('../db/connection');
const cors = require('cors');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application corriendo en el puerto ${this.port}`);
        });
    }
    
    routes() {
        this.app.use('/api/mobiliarios', require('../routes/mobiliarioRoutes.js'));
        this.app.use('/api/areas', require('../routes/areasRoutes.js'));
        this.app.use('/api/roles', require('../routes/rolRoutes.js'));
        this.app.use('/api/usuarios', require('../routes/userRoutes.js'));
        this.app.use('/api/encargados', require('../routes/encargadoRoutes.js'));
        this.app.use('/api/bientecnologico', require('../routes/bienesTecnologicos.routes.js'));
        this.app.use('/api/componentes', require('../routes/componentes.routes.js'));
    
         // Configuración para servir archivos estáticos
         this.app.use('/public', express.static(path.join(__dirname, '..', 'controllers', 'public')));

    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }

    conectarDB() {
        return new Promise((resolve, reject) => {
            connection.getConnection((error, conn) => {
                if (error) {
                    console.error('Error al conectar a la base de datos:', error.message);
                    reject(error);
                } else {
                    console.log('Conexión exitosa');
                    conn.release();
                    resolve(conn);
                }
            });
        });
    }
  


}

module.exports = Server;
