const { response } = require("express");
const Mensaje= require("../models/mensaje");

const getMensajes = async function (req, res = response) {
    try {
        const miId= req.uidFromJWT; //id de token del usuario logueado
        const mensajesDe= req.params.de; //id obtenido del get de la ruta (:de)
        /*
        * Busca los ultimos 30 mensajes ordenados de forma descendente segun la fecha de creacion (createAt).
          En la condicion del find aplica un or ($or), para traer los mensajes del usuario logueado (de:del token) 
          para el usuario del parametro y viceversa. De esta manera se estarian recuperando todos los mensajes de
          esa sala de chat para esos dos usuarios
        */
        const last30= await Mensaje.find({
            $or: [{de:miId, para:mensajesDe},{de:mensajesDe, para:miId}]
        })
        .sort({createdAt: 'desc'})
        .limit(30);

        res.json({
            ok: true,
            mensajes:last30
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
    getMensajes
}