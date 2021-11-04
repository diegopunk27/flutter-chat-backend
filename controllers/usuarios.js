const { response } = require("express");
const Usuario = require("../models/usuario");

const getUsuarios = async function (req, res = response) {
    try {
        /*
            - Con find() obtenemos todos los documentos de la coleccion.
            - Si pasamos como parametro {_id:{ $ne:req.uidFromJWT }, filtramos los id
            menos el id del solicitante ($ne=not exist). En resumen es id != uidFromJWT. 
            Así cuando listemos los usuarios conectados, se mostraran todos menos el usuario conectado
            - uidFromJWT es el uid establecido al request en el middleware validar-jwt, que en la ruta
            es llamado primero para validar el token, y deja el uid para que lo use el controlador.
            - sort() los ordena segun un criterio, en este caso por los que estan online. Si tiene el -
            entonces se ordena de forma descendete, sin simbolo se ordena de forma ascendente.

            PAGINACION de la consulta
            - Con skip() - cota inferior - podemos seleccionar desde que numero de usuario en adelante queremos solicitar
            a la base de datos. La variable "desde" captura el query del get y lo castea en numero (Number(req.query.desde))
            pero si no existe un query en la url lo deja por defecto en 0.
            - Con limit() - cota superior - se establece un límite de usuarios que se retorna para cada consulta/ paginacion

        */
        const desde = Number(req.query.desde) || 0;
        const usuarios = await Usuario.find({ _id: { $ne: req.uidFromJWT } }).sort("-online").skip(desde).limit(20);


        res.json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        });
    }
}

module.exports = {
    getUsuarios
}