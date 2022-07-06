const express = require('express');

class Server {


    constructor() {
        //Creamos express como una propiedad en el servidor.
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares (función que siempre se ejecuta al levantar nuestro servidor.)
        this.middlewares();

        //Rutas de mi aplicación.
        this.routes();
    }

    middlewares() {

        //.use es la palabra clave para determinar que es un middleware.
        this.app.use(express.static('public'));
    }

    //Método con las rutas.
    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World')
        })
    }

    //Puerto que escucha
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }
}

module.exports = Server;