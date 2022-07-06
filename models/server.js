const express = require('express');
const cors = require('cors');

class Server {


    constructor() {
        //Creamos express como una propiedad en el servidor.
        this.app = express();
        this.port = process.env.PORT;
        //clave para entrar en las routes.
        this.usuariosPath = '/api/usuarios';
        //Middlewares (función que siempre se ejecuta al levantar nuestro servidor.)
        this.middlewares();

        //Rutas de mi aplicación.
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //.use es la palabra clave para determinar que es un middleware.
        this.app.use(express.static('public'));
    }

    //Método con las rutas.
    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    //Puerto que escucha
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }
}

module.exports = Server;