//para que se puedan importar juntos todos los middlewares

const validarArchivoSubir = require('../middlewares/validar-archivo');
const validarCampos = require('../middlewares/validar-campos');
const validaCategoria = require('../middlewares/validar-categoria');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarArchivoSubir,
    ...validarCampos,
    ...validaCategoria,
    ...validarJWT,
    ...validaRoles
}