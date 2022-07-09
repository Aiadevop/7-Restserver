const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    //Si no le meto el parametro nombre es no name
    const { q, nombre = "No name", apikey, page, limit } = req.query;

    res.status(200).json({
        "msg": "get API-Controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe.
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: "El correo ya está registrado."
        })
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10); //Que número de vueltas de seguridad se le quiere dar.
    usuario.password = bcryptjs.hashSync(password, salt); //encriptarlo en una sola vía.

    console.log(usuario);
    //Guardar en la BD
    await usuario.save(usuario);

    res.json({
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    //params.(nombre que se puso en la ruta.)
    const { id } = req.params;

    res.status(400).json({
        "msg": "put API-Controlador",
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "delete API-Controlador"
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        "msg": "patch API-Controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}