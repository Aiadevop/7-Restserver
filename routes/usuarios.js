const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

//esto es equivalente a lo de arriba con el index.
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares') //esto apunta al index de los middlewares

const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

//Actualizar DATA: ej. datos actualizados
router.put('/:id', [
        //middlewares
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(idExiste),
        check('rol').custom(esRoleValido),
        validarCampos
    ],
    usuariosPut);

//Nuevos recursos: ej. usuario creado
//si router.post{opc1(ruta,controlador) / opc2(ruta,middleware,controlador)}
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    check('rol', 'El rol no es correcto').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
], usuariosPost);

//Borra algo
router.delete('/:id', [
    validarJWT,
    //esAdminRole, (esto solo vale para AdminRole si queremos + variables distinto middleware, el de abajo.)
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], usuariosDelete);

//Ruta
//router.patch('/', usuariosPatch);

module.exports = router;