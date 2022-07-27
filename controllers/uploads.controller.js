const { response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivo = async (req, res = response) => {

    //el .archivo es lo que se esta esperando en el backend, lo hemos añadido
    //en postman

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No hay archivos que subir');
        return;
    }

    try {
        //txt, md, pdf
        //const nombre = await subirArchivo(req.files, ['txt', 'md', 'pdf'], 'carpeta-textos');
        //imagenes
        const nombre = await subirArchivo(req.files, undefined, 'carpeta-imagenes');
        res.json({ nombre })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}

module.exports = {
    cargarArchivo
};