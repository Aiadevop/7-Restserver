const path = require ('path');
const fs = require ('fs');
const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require('../models')


const cargarArchivo = async (req, res = response) => {

    //el .archivo es lo que se esta esperando en el backend, lo hemos añadido
    //en postman

    //para validar si hemos añadido un archivo a subir hemos generado un middleware

    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json('No hay archivos que subir');
    //     return;
    // }

    try {
        //txt, md, pdf
        //const nombre = await subirArchivo(req.files, ['txt', 'md', 'pdf'], 'carpeta-textos');
        //imagenes
        const nombre = await subirArchivo(req.files, undefined, 'carpeta-imagenes');
        res.json({ nombre })
    } catch (msg) {
        //res.status(400).json({ msg })
        const imgNotFound = path.join(__dirname, '../assets/no-image.jpg')
        return res.sendFile(imgNotFound)
    }
}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
      
    }
    

    // Limpiar imágenes previas.

    try {

        if (modelo.img) {
            //Borrar imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen)
            }
        }

        
    } catch (error) {
        res.status(500).json({ msg: 'No se han podido limpiar las imágenes' })
    }    
    
    try {
        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = await nombre;
    
        await modelo.save();
    
        res.json(modelo);
    } catch (msg) {
        res.status(400).json({ msg })
    }

}

const mostrarImagen = async (req, res= response) => {
    
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
      
    }
    

    // Limpiar imágenes previas.

    try {

        if (modelo.img) {
            //Borrar imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
               return res.sendFile(pathImagen)
            }
        }
        const imgNotFound = path.join(__dirname, '../assets/no-image.jpg')
        return res.sendFile(imgNotFound)
        
    } catch (error) {
        res.status(500).json({ msg: 'No se han podido limpiar las imágenes' })
    }    
    

}
module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
};