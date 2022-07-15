const { response, json } = require("express");
const { Categoria } = require("../models");
const categoria = require("../models/categoria");
const mongoose = require('mongoose');
const { Schema } = mongoose;

//obtenerCategorias - paginado - nºcategorias - metodo populate

const obtenerCategorias = async (req, res=response) =>{

    const { limite = 5, desde = 0 } = req.query;
    const cat = Categoria.find({ estado: true })
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite));
    const tot = Categoria.countDocuments({ estado: true });
    
    const [total, categorias] = await Promise.all([
        tot,
        cat        
    ])

    res.status(200).json({
        total,
        categorias          
    })
}

//obtenerCategoria- populate {}

const obtenerCategoria = async (req, res=response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario');
   
    res.status(200).json({
        categoria
    })
    
}

const crearCategoria = async (req, res=response) => {

    const categoria = req.body.categoria.toUpperCase();

    const categoriaDB = await Categoria.findOne({categoria})

    if(categoriaDB){
        res.status(400).json({
            msg: `La categoría ${categoria} ya existe`
        })
        return
    };

    const data = {
        categoria,
        usuario: req.usuario._id
    }
    console.log(data);

    const categoriax = new Categoria (data);
    console.log(categoriax);
    await categoriax.save(categoriax);
    res.status(201).json(data);
}

//ActualizarCategoria - recibir el nombre

const actualizarCategoria = async (req, res=response) =>{
  
    const { id } = req.params;
    const { usuario, estado, ...resto } = req.body;
    console.log(resto,'Hola');

    resto.categoria  = resto.categoria.toUpperCase();
      
    //encuentra una categoría y lo actualiza
    const categorias = await Categoria.findByIdAndUpdate(id,resto, {new:true});
    //con eso se mira en la respuesta la nueva información
    console.log(categorias);

    res.status(400).json({
        categorias
    })
}

//BorrarCategoria - estado false

const borrarCategoria = async (req, res=response) =>{

    const { id } = req.params;

    const {categoria} = await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
        "Categoria borrada": categoria
    })
    
}

module.exports = {
    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,    
    
}