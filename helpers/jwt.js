const jwt= require("jsonwebtoken");

const generarJWT= function(uid, nombre){
    return new Promise( function(resolve, reject){
        const payload={
            uid,
            nombre
        };
    
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: "24h",
        }, function(err, token){
            if(err){
                //En caso que exista un error al generar el token
                reject("No se pudo generar el JWT");
            }else{
                //Se generó exitosamente el token
                resolve(token);
            }
        });
    });
};

module.exports={
    generarJWT
};