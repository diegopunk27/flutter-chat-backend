const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { body } = require("express-validator");

const crearUsuario = async function (req, res = response) {

    /*const {email}= req.body es una asignacion por desustruracion.
     Es equivalente a const email= req.body.email
    */
    const { email, password } = req.body;
    //console.log({email});

    try {
        /* Busca el email ingresado en la base de datos (a traves de findOne)
           Luego, se consulta si el resultado es distinto de vacio, es xq el mismo existe
           entonces se devuelve un resposponse con status 400 (bad request)  
        */
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya se encuentra registrado"
            });
        }

        //req.body contiene el json que se recibe en el request
        const usuario = new Usuario(req.body);

        /* Luego de importar bcrypt, se genera un salt.
           Luego al usuario generado se le modifica el password asignandole
           dicho password pero encriptado por el hashSync.
           Tener en cuenta que el parametro password se obtiene de 
           el request: {email, password}= req.body;
        */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //save() es el metodo para grabar en la base de datos
        await usuario.save();

        const jwt = await generarJWT(usuario.id, usuario.nombre);

        res.json({
            ok: true,
            usuario,
            jwt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        });
    }


};

const login = async function (req, res = response) {

    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        //console.log(usuarioDB.id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El email no fue encontrado"
            });
        }

        const validarPass= bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPass){
            return res.status(400).json({
                ok:false,
                msg: "El password es erroneo"
            });
        }

        const jwt= await generarJWT(usuarioDB.id, usuarioDB.nombre);
        res.json({
            ok: true,
            usuario:usuarioDB,
            jwt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        });
    }
};

const renewToken= async function (req, res=response){
    const uid= req.uidFromJWT; //uid es capturado luego de que validarJWT lo agregue al req
    //console.log(uid);
    
    const usuarioDB= await Usuario.findById(uid);

    const jwt= await generarJWT(usuarioDB.id, usuarioDB.nombre);

    try {
        res.json({
            ok:true,
            usuario:usuarioDB,
            jwt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Contactese con el administrador"
        });
    }
};

module.exports = {
    crearUsuario,
    login,
    renewToken
};