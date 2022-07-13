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
* Utilizamos query para el get imagen get con query
* git tag -a v1.0.0 -m "Fin sección 8 RestServer"
        git push --tags
* Lo cargo en heroku 
        Primero creo la app en heroku
        heroku git:remote -a restserver-webserver-node-8
        git push heroku main
        y luego en el package.json -> "start": "node app"
        Añado a git un nuevo repositorio
        git push heroku main
* Crear dos ambientes uno de producción y uno de desarrollo en postman
        Environments -> + -> Nombre y añadimos variable url, con la dirección heroku 
        luego ya solo necesitariamos poner {{url}} al inicio de la ruta en postman

*       CURSO 9

*       Usamos:
        Mongo Atlas 
        Mongo Compass 
        mongoose instalamos con npm i
        configuramos la carpeta database.

*       Modelo usuario 

USER_NODE_CAFE
8hjXHupazrP33ZBe

*       Para encriptar la contraseña npm i bcryptjs
        Y en el post encriptamos la contraseña
*       Correo válido -> npm i express-validator
        chequeo el correo en routes

* 124.Validar rol contra base de datos 
        En Compass creamos una colección y añadimos el data, img: coleccion-roles 
        En models creamos role.js es el nombre de la colección de Compass sin la s.

* 125. Centralizar la validación del rol.
        Creamos la carpeta helpers y así podemos limpiar nuestras routes para cotejar el role con la bd.
        esRoleValido en db-validators.js
* 142. Generar un JWT
        npm i jsonwebtoken
*149 HEroku establecer variables de entorno.
        heroku config -ver las variables de entorno
        heroku config:set NOMBRE="PASSWORD" (sin espacios)
        git status para comprobar que todo esta subido o subirlo.
        git push heroku main
        heroku logs -n 100 (para poder ver en la terminal lo que pasa en producción)
        heroku logs -n 100 --tail (mantiene todos los logs)

------------- LECCIÓN 11----- GOOGLE SIGN IN----------------------------------
        
https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid

        1. Creamos consentimientos 
        2. Creamos credenciales y añadimos dos rutas
        Orígenes autorizados de JavaScript

Para usar con solicitudes de un navegador
http://localhost
URI 1 *
http://localhost:8090
URI 2 *
        3. Generamos un client-id y una contraseña secreta.
        4. Para personalizar la entrada de google
        https://developers.google.com/identity/gsi/web/tools/configurator?hl=en
        5.Colocamos el callback de cuando la autenticacion es exictosa, en vez de la 
        línea anterior del index.html
        https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions?hl=en
        data-callback="handleCredentialResponse"
        6.cambiamos el data_client_id por nuestro client_id
        7. pegamos el script del callback,
        pero luego hacemos una configuración personalizada.
        8. verificamos el token en el lado del servidor
        https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
        npm install google-auth-library --save
        9.Creamos el button signout en html

