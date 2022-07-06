* npm init -y
* npm i express dotenv
* .gitignore 
* app.js 
* Crear repositorio.
*   Pegamos en app.js el inicio de npm express
* Configuramos el .env con el puerto 
        Lo importamos en app.js con require('dotenv').config();
* Directorio models 
        Server.js archivo de clase 
        Esta clase Server la podemos reutilizar para conectar siempre con el servidor.
        Y llamos al servidor en app.js con : const server = new Server();
        listen()
* Creamos la carpeta public
        index.html (ahí meteriamos nuestra página web.)
        se introducen los middleware en server.js con la palabra clave .use 
* Establecemos el método de rutas como un json en vez de html 
* Instalar npm cors (middleware) - npm i cors
        Nos permite proteger nuestro servidor.
* Extraemos las routes a una nueva carpeta para que sea más fácil leer la información del servidor 
        Se genera la clave usuariosPath para que todos puedan conocer la ruta de las routes.
        Esta clave simplemente se escribirá en el navegador para conectar con las routes.
* Lo del interior de las rutas debería estar en un archivo independiente, llamado controllers.
* En los middleware
        //Lectura y parseo del body
        //Cualquier información del front-end la va a intentar serializar a un JSON
        this.app.use(express.json());
        Imagen: Envío de json desde el frontend