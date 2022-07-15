const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias.controller');

const {
    validarCampos,
    validarJWT,
} = require('../middlewares')

const router = Router();

//{{url}}/api/categorias

//Obtener todas las categorias-publico
router.get('/', (req, res = response) => {
    res.json('get')
});

//Obtener una categoria por id - publico.
router.get('/:id', [
    //check ('id').custom(existeCategoria)
],(req, res = response) => {
    res.json('get-id')
});

//Crear categoría - privado con cualquier persona con token valido.
router.post('/', [
    validarJWT,
    check('categoria', 'El nombre de la categoria es obligatorio.').not().isEmpty(),
    validarCampos

], crearCategoria);

//Actualizar -privado-cualquiera con token válido
router.put('/:id', (req, res = response) => {
    res.json('put-id')
});

//Borrar categoria - Admin
router.delete('/:id', (req, res = response) => {
    res.json('delete')
});



module.exports = router;