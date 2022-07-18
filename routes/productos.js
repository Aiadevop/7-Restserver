const { Router, response } = require('express');
// const { check } = require('express-validator');
// const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/Productos.controller');
// const { existeProducto} = require('../helpers/db-validators');


// const {
//     validarCampos,
//     validarJWT,
//     tieneRole,
//     validarCategoria
// } = require('../middlewares');

const router = Router();

//{{url}}/api/productos

//Obtener todas las Productos-publico
// router.get('/', 
// // obtenerProductos
//     res.status(200).json({
//        msg: "A ver si funciona"         
//     })
// );

// //Obtener una Producto por id - publico.
// router.get('/:id', [
//     check('id', 'No es un id válido').isMongoId(),
//     check ('id').custom(existeProducto),
//     validarCampos
// ],obtenerProducto);
    router.get('/:id',console.log('hola'));

// //Crear producto - privado con cualquier persona con token valido.
// router.post('/', [
//     validarJWT,
//     check('producto', 'El nombre de la producto es obligatorio.').not().isEmpty(),
//     validarCategoria,
//     check('categoria', 'La categoría es obligatoria.').not().isEmpty(),
//     check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
//     validarCampos
// ], crearProducto);

// //Actualizar -privado-cualquiera con token válido
// router.put('/:id',[
//     check('id', 'No es un id válido').isMongoId(),
//     check ('id').custom(existeProducto),
//     validarCampos
// ],actualizarProducto);

// //Borrar Producto - Admin
// router.delete('/:id', [
//     validarJWT,   
//     tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
//     check('id', 'No es un id válido').isMongoId(),
//     check ('id').custom(existeProducto),
//     validarCampos
// ], borrarProducto);



module.exports = router;