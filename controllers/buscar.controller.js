const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria,/* Producto */} = require('../models')

const coleccionesPermitidas = [
    'categoria',
    // 'productos',
    'roles',
    'usuarios',
];

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        console.log(categoria);
        return res.status(400).json({
            results: (categoria) ? [categoria] : []
        })
    }
    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        $or: [{ categoria: regex }],
        $and: [{ estado: true }]
    });


    return res.status(400).json({
        results: (categorias) ? [categorias] : []
    })

}

// const buscarProductos = async (termino = '', res = response) => {
//     const esMongoID = ObjectId.isValid(termino);
//     console.log(termino);
//     if (esMongoID) {
//         const producto = await Producto.findById(termino).populate('categoria','nombre')
//         console.log(producto);
//         return res.status(400).json({
//             results: (producto) ? [producto] : []
//         })
//     }

//     //búsquedas insensibles. //Expresion regular importada de JS 
//     //insensible a mayusculas y minusculas.
//     const regex = new RegExp(termino, 'i');
//     console.log(regex);
//     const productos = await Producto.find({
//         $or: [{ producto: regex }], //¿Como hacer la búsqueda por precio??
//         $and: [{ estado: true }]
        
//     }).populate('categoria','categoria').populate('usuario','nombre'); 


//     return res.status(400).json({
//         results: (productos) ? [productos] : []
//     })

// }

const buscarRoles = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    console.log(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        console.log(usuario);
        return res.status(400).json({
            results: (usuario) ? [usuario.nombre,usuario.rol] : []
        })
    }

    //búsquedas insensibles. //Expresion regular importada de JS 
    //insensible a mayusculas y minusculas.
    const regex = new RegExp(termino, 'i');
    console.log(regex);
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { rol: regex }],
        $and: [{ estado: true }]
    });


    return res.status(400).json({
        results: (usuarios) ? [usuarios] : []
    })

}

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    console.log(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        console.log(usuario);
        return res.status(400).json({
            results: (usuario) ? [usuario] : []
        })
    }

    //búsquedas insensibles. //Expresion regular importada de JS 
    //insensible a mayusculas y minusculas.
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });


    return res.status(400).json({
        results: (usuarios) ? [usuarios] : []
    })

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
        })
    }
    switch (coleccion) {
        case 'categoria':
            buscarCategoria(termino, res);
            break;
        // case 'productos':
        //     buscarProductos(termino, res);
        //     break;
        case 'roles':
            buscarRoles(termino,res)
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        default:
            res.status(500).json({
                msg: `Se me olvidó hacer la búsqueda `,
            })
    }
}

module.exports = {
    buscar,
    buscarCategoria,
    // buscarProductos,
    buscarRoles,
    buscarUsuarios,
    
}