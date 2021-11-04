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

const verificarJWT= function(token=''){
    try {
        /* Se valida el token con verify contrastando con la secret key (JWT_KEY). Si la verificacion es válida
        el token debería tener el uid en el payload, y por desestructuracion lo asignamos a la variable
        {uid}. En caso de que no pueda extraerse el uid es porque el token no es valido 
        por lo tanto el error es capturado por el catch()        
        */
        const{uid}= jwt.verify(token, process.env.JWT_KEY);        
        return [true, uid];
        
    } catch (error) {
        return [false, null];
    }
};

module.exports={
    generarJWT,
    verificarJWT
};