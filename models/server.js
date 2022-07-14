const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {


    constructor() {
        //Creamos express como una propiedad en el servidor.
        this.app = express();
        this.port = process.env.PORT;
        //clave para entrar en las routes.
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath= '/api/categorias';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares (función que siempre se ejecuta al levantar nuestro servidor.)
        this.middlewares();

        //Rutas de mi aplicación.
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        //Cualquier información del front-end la va a intentar serializar a un JSON
        this.app.use(express.json());

        //.use es la palabra clave para determinar que es un middleware.
        this.app.use(express.static('public'));
    }

    //Método con las rutas.
    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));

    }

    //Puerto que escucha
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }
}

module.exports = Server;