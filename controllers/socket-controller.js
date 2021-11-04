const mensaje = require("../models/mensaje");
const Usuario = require("../models/usuario");


const conectarUsuario= async function(uid=''){
    /* 
    - Una forma de buscar un usuario por id y cambiarle el atributo online
    es mediante findByIdAndUpdate, como se implementa en esta funcion.

    - Otra manera es primero buscar el usuario con findById, luego 
    modificarlo al modelo (usuario.online=false) y finalmente grabarlo
    en la base de datos con usuario.save(). Est emodo se implementó en
    desconectarUsuario
    
    const usuario= await Usuario.findById(uid);
    usuario.online=true;
    
    */
    const usuario= await Usuario.findByIdAndUpdate(uid, {online:true});
    await usuario.save();
    return usuario;
}

const desconectarUsuario= async function(uid=''){
    const usuario= await Usuario.findById(uid);
    usuario.online=false;
    await usuario.save();
    return usuario;
}

const grabarMensaje= async function (payload){
    /*
      payload={
        de:"",
        para:"",
        mensaje:""
    } 
    */
    try {
        nuevoMensaje= new mensaje(payload);
        await nuevoMensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports={
    conectarUsuario,
    desconectarUsuario,
    grabarMensaje
}