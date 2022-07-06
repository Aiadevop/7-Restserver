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
        