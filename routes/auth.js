/*

    path: /api/login

*/

const {Router} = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const validar= validarCampos;

/*post (ruta, middleware, controlador)*/
router.post('/new', [
    check("nombre", "El nombre no fue ingresado").not().isEmpty(),
    check("email", "El email no fue ingresado").not().isEmpty(),
    check("email", "El formato del email es erroreno").isEmail(),
    check("password", "El password no fue ingresado").not().isEmpty(),
    validar
    // check("password", "El formato del password es erroreno").isStrongPassword(),
] ,crearUsuario);

router.post('/', [
    check("email", "El email no fue ingresado").not().isEmpty(),
    check("email", "El formato del email es erroreno").isEmail(),
    check("password", "El password no fue ingresado").not().isEmpty(),
    validarCampos
    // check("password", "El formato del password es erroreno").isStrongPassword(),
] ,login);

router.get("/renew",validarJWT,renewToken);


module.exports= router;