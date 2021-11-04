/*

    path: /api/usuarios

*/

const {Router} = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*post (ruta, middleware, controlador)*/
router.get("/",validarJWT,getUsuarios);

module.exports= router;

