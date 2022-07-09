const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/user.controller')

const router = Router();

router.get('/', usuariosGet);

//Actualizar DATA: ej. datos actualizados
router.put('/:id', usuariosPut);

//Nuevos recursos: ej. usuario creado
//si router.post{opc1(ruta,controlador) / opc2(ruta,middleware,controlador)}
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    check('rol', 'El rol no es correcto').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async(rol = '') => {
        const existeRol = await Role.findOne({ rol });
        if (!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la BD.`)
        }

    }),
    validarCampos,
], usuariosPost);

//Borra algo
router.delete('/', usuariosDelete);

//Ruta
router.patch('/', usuariosPatch);

module.exports = router;