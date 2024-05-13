const express = require('express');
const connection = require('../db/connection');
const cors = require('cors');

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
        this.app.use('/api/usuarios', require('../routes/userRoutes.js'));
        this.app.use('/api/bientecnologico', require('../routes/bienesTecnologicos.routes.js'));
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
