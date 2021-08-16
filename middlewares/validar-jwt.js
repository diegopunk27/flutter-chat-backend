const jwt= require("jsonwebtoken");

const validarJWT= function(req, res, next){

    //Leer token
    const token = req.header("x-token");

    if(!token){
        //Si token vacio
        return res.status(401).json({
            ok: false,
            msg: "No se ingresó un token"
        });
    }

    //Validación
    try {
        /* Se valida el token con verify contrastando con la secret key (JWT_KEY). Si la verificacion es válida
        el token debería tener el uid en el payload, y por desestructuracion lo asignamos a la variable
        {uid}, que luego se lo asignamos al request para que el mismo sea accesible al momento de llamar
        al middleweare. En caso de que no pueda extraerse el uid es porque el token no es valido 
        por lo tanto el error es capturado por el catch()        
        */
        const{uid}= jwt.verify(token, process.env.JWT_KEY);
        req.uidFromJWT= uid; //Hace disponible el id para el controller

        next();
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg: "Token no válido"
        });
    }
};

module.exports={
    validarJWT
}