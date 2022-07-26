const path = require ('path');
const { v4: uuidv4 } = require('uuid');


const { response } = require("express");

const cargarArchivo = (req, res =response) =>{

    //el .archivo es lo que se esta esperando en el backend, lo hemos añadido
    //en postman

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json('No hay archivos que subir');
      return;
    } 
  
    const {archivo} = req.files;

    //cortamos el nombre del archivo para sacar la extensión
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado [nombreCortado.length - 1];

    //que extensiones voy a permitir

    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            msg: 'Las extensiones validas son: '+ extensionesValidas
        })
    }

    console.log(nombreCortado);
    console.log(extension);

    const nombreTemp = uuidv4() + '.' + extension; //nombre temporal  
    const uploadPath = path.join(__dirname , '../uploads/' , nombreTemp);
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({err});
      }
  
      res.json({msg:'File uploaded to ' + uploadPath});
    });
}

module.exports = {
    cargarArchivo
};