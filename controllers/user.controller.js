const { response, request } = require('express');
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

    // const body = req.body;

    // res.status(201).json({
    //     "msg": "post API-Controlador",
    //     body
    // })

    //Se puede hacer desestructurando el body

    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();

    res.json({
        "msg": "post API-Controlador",
        usuario
    })
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