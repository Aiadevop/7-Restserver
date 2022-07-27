const path = require('path');
const { v4: uuidv4 } = require('uuid');

//carpeta - es la carpeta donde pegar la imagen
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    //Lo hacemos con promesas porque aquí no tengo ni el req , ni el res
    return new Promise((resolve, reject) => {

        const { archivo } = files;

        //cortamos el nombre del archivo para sacar la extensión
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //que extensiones voy a permitir        
        if (!extensionesValidas.includes(extension)) {
            return reject('Las extensiones validas son: ' + extensionesValidas)
        }

        console.log(nombreCortado);
        console.log(extension);

        const nombreTemp = uuidv4() + '.' + extension; //nombre temporal  
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    })



}

module.exports = {
    subirArchivo
}