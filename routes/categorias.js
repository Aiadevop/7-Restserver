const { Router, response } = require('express');
const { check } = require('express-validator');
const { 
    crearCategoria, 
    obtenerCategoria, 
    obtenerCategorias, 
    actualizarCategoria, 
    borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoria} = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../middlewares')

const router = Router();

//{{url}}/api/categorias

//Obtener todas las categorias-publico
router.get('/', [
    
],obtenerCategorias);

//Obtener una categoria por id - publico.
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check ('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//Crear categoría - privado con cualquier persona con token valido.
router.post('/', [
    validarJWT,
    check('categoria', 'El nombre de la categoria es obligatorio.').not().isEmpty(),
    validarCampos

], crearCategoria);

//Actualizar -privado-cualquiera con token válido
router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check ('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,   
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check ('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);



module.exports = router;