const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if (usuario.estado === false) { //!usuario.estado
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar contraseña
        const contraseñaValida = bcryptjs.compareSync(password, usuario.password)
        if (!contraseñaValida) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Login ok',
            usuario,
            token
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async (req, res=response) => {

    const {id_token} = req.body;

    res.json ({
        msg:'Todo ok',
        id_token
    })
}

module.exports = {
    login,
    googleSignIn

}