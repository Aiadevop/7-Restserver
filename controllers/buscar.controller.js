const { response } = require("express");



const buscar = (req, res=response) =>{

    const {coleccion,termino} = req.params;


    res.status(200).json({
        msg: `Buscar...`,
        coleccion,
        termino
    })  

}

module.exports = {
    buscar
}