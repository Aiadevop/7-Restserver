const { response } = require('express');


const usuariosGet = (req, res) => {
    res.status(200).json({
        "msg": "get API-Controlador"
    })
}

const usuariosPut = (req, res) => {
    res.status(400).json({
        "msg": "put API-Controlador"
    })
}

const usuariosPost = (req, res) => {
    res.status(201).json({
        "msg": "post API-Controlador"
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        "msg": "delete API-Controlador"
    })
}

const usuariosPatch = (req, res) => {
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