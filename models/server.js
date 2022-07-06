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
            res.status(200).json({
                "msg": "get API"
            })
        })

        //Actualizar DATA: ej. datos actualizados
        this.app.put('/api', (req, res) => {
            res.json({
                "msg": "put API"
            })
        })

        //Nuevos recursos: ej. usuario creado
        this.app.post('/api', (req, res) => {
            res.json({
                "msg": "post API"
            })
        })

        //Borra algo
        this.app.delete('/api', (req, res) => {
            res.json({
                "msg": "delete API"
            })
        })

        //Ruta
        this.app.patch('/api', (req, res) => {
            res.json({
                "msg": "patch API"
            })
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