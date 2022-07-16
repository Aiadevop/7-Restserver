const { response } = require("express");
const Categoria = require('../models/categoria');


const validarCategoria = async(req = request, res = response, next) => {

    const {categoria} = req.body;
    console.log('categoriaid',categoria);
    if (!categoria) {
        return res.status(401).json({
            msg: 'Cree primero la categoría'
        });
    }

    try {
        
        const categoriax = await Categoria.findById(categoria);//.populate('categoria');
        console.log('y la categoria es', categoriax);

        if (!categoriax) {
            return res.status(401).json({
                msg: 'Id de categoría no existente'
            })
        }

        req.categoria = categoriax;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Error de categoría'
        })
        return;
    }

}
module.exports = {
    validarCategoria
}