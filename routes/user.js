const { Router } = require('express');

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
router.put('/', usuariosPut);

//Nuevos recursos: ej. usuario creado
router.post('/', usuariosPost);

//Borra algo
router.delete('/', usuariosDelete);

//Ruta
router.patch('/', usuariosPatch);

module.exports = router;