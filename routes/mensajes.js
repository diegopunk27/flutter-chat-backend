/*
    Path: /api/mensajes
*/

const {Router} = require('express');
const { getMensajes } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*post (ruta, middleware, controlador)*/
router.get("/:de",validarJWT,getMensajes);

module.exports= router;