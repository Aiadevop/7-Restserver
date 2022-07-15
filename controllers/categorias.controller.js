const { response } = require("express");
const { Categoria } = require("../models");

//obtenerCategorias - paginado - nºcategorias - metodo populate

//obtenerCategoria- populate {}

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

//BorrarCategoria - estado false

module.exports = {crearCategoria}