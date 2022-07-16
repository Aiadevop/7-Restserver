const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const {Usuario, Categoria,Producto} = require ('../models')

const coleccionesPermitidas = [    
    'categoria',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsuarios = async (termino = '', res= response) =>{
    const esMongoID = ObjectId.isValid(termino);
    console.log(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        console.log(usuario);
        return res.status(400).json({
            results: (usuario)?[usuario]: []    
        }) 
    }

    //búsquedas insensibles. //Expresion regular importada de JS 
    //insensible a mayusculas y minusculas.
    const regex = new RegExp (termino,'i');

    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and: [{estado:true}]
    });
    

    return res.status(400).json({
        results: (usuarios)?[usuarios]: []    
    }) 

}

const buscar = (req, res=response) =>{

    const {coleccion,termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,    
        }) 
    }
    switch (coleccion) {
        case 'categoria':
            break;
        case 'productos':
            break;
        case 'roles':
            break;
        case 'usuarios':  
            buscarUsuarios(termino,res);
            break;
        default:
            res.status(500).json({
                msg:'Se me olvido hacer esta búsqueda.'
            })
    }
}

module.exports = {
    buscar
}