const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    //Si no le meto el parametro nombre es no name
    //const { q, nombre = "No name", apikey, page, limit } = req.query;

    //muestra todos los usuarios.
    //const usu = await Usuario.find();

    const { limite = 5, desde = 0 } = req.query;
    const usu = Usuario.find({ estado: true }) //le puedo poner condiciones
        .skip(Number(desde))
        .limit(Number(limite)); //hay que transformar el limite a un numero pq siempre devuevle un String si lo escribimos.

    const tot = Usuario.countDocuments({ estado: true });

    //metemos las dos promesas en el mismo await para que se ejecuten
    //de manera simultanea y que no esperen la una por la otra.
    const [total, usuarios] = await Promise.all([
        tot,
        usu
    ])

    res.status(200).json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

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


//Actualización de datos de usuario.
const usuariosPut = async(req, res = response) => {

    //params.(nombre que se puso en la ruta.)
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TO DO validar contra BD
    //Si nos marcan el password es pq quieren actualizar su contraseña
    if (password) {
        const salt = bcryptjs.genSaltSync(10); //Que número de vueltas de seguridad se le quiere dar.
        resto.password = bcryptjs.hashSync(password, salt);
    }

    //encuentra un usuario y lo actualiza
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(400).json({
        usuario,
        id
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //const uid = req.uid;

    //EL DELETE SOLO FUNCIONA CON USUARIOS ESPECIFICOS EJEMPLO EL ADMIN.

    //Si queremos borrarlo físicamente.
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({

        "Usuario borrado": usuario,

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