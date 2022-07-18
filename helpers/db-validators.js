const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
// const Producto = require('../models/producto');


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD.`)
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}}, ya está registrado en la BD.`)
    }
}

const idExiste = async(id) => {

    const existeid = await Usuario.findById(id);
    if (!existeid) {
        throw new Error(`El id: ${id}, no existe en la BD.`)
    }
}

const existeCategoria = async(id) => {

    const existeCategoria = await Categoria.findById(id);    
    if (!existeCategoria) {
        throw new Error(`Este id de categoria: ${id}, no existe en la BD.`)
    }
    console.log('La categoria ',id, ' existe.');
    if(Usuario.estado===false){
        throw new Error(`La categoria con id: ${id}, ya no existe en la BD.`)
    }
}

// const existeProducto = async(id) => {

//     const existeProducto = await Producto.findById(id);    
//     if (!existeProducto) {
//         throw new Error(`Este id de producto: ${id}, no existe en la BD.`)
//     }
//     if(Producto.estado===false){
//         throw new Error(`El producto con id: ${id}, ya no existe en la BD.`)
//     }
// }


module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    existeCategoria,
    // existeProducto
};