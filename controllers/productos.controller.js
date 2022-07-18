const { response, json } = require("express");
const { Producto } = require("../models");
const producto = require("../models/producto");
const mongoose = require('mongoose');
const { Schema } = mongoose;

//obtenerCategorias - paginado - nºcategorias - metodo populate

const obtenerProductos = async (req, res=response) =>{

    const { limite = 5, desde = 0 } = req.query;
    const prod = Producto.find({ estado: true })
        .populate('usuario','nombre')
        .populate('categoria','categoria')
        .skip(Number(desde))
        .limit(Number(limite));
    const tot = Producto.countDocuments({ estado: true });
    
    const [total, productos] = await Promise.all([
        tot,
        prod        
    ])

    res.status(200).json({
        total,
        productos          
    })
}

//obtenerProducto- populate {}

const obtenerProducto = async (req, res=response) =>{
    const {id} = req.params; 
    const producto = await Producto.findById(id).populate('categoria','categoria').populate('usuario','nombre');   
    if(!producto){
        res.status(400).json({
            msg: `El id de este producto no existe.`            
        }) 
        return;       
    }
    res.status(200).json({
        producto
    })
    
}

const crearProducto = async (req, res=response) => {

    const producto = req.body.producto.toUpperCase();
    const descripcion = req.body.descripcion.toUpperCase();

    const productoDB = await Producto.findOne({producto})

    if(productoDB){
        res.status(400).json({
            msg: `El producto: ${producto} ya existe`
        })
        return
    };
    const data = {
        producto,
        descripcion,
        usuario: req.usuario._id,
        categoria: req.categoria._id
    }
    console.log('Esto es la data',data);

    const productox = new Producto (data);
    await productox.save(productox);
    res.status(201).json(data);
}

//ActualizarProducto - recibir el nombre

const actualizarProducto = async (req, res=response) =>{
  
    const { id } = req.params;
    const { usuario, estado, ...resto } = req.body;
    console.log(resto,'Hola');

    resto.producto  = resto.producto.toUpperCase();
      
    //encuentra una categoría y lo actualiza
    const productos = await Producto.findByIdAndUpdate(id,resto, {new:true});
    //con eso se mira en la respuesta la nueva información
    console.log(productos);

    res.status(400).json({
        productos
    })
}

//BorrarProducto - estado false

const borrarProducto = async (req, res=response) =>{

    const { id } = req.params;

    const {producto} = await Producto.findByIdAndUpdate(id, { estado: false });

    res.json({
        "Producto borrado": producto
    })
    
}

module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos,    
    //crearProducto
    
}