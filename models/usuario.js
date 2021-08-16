const {Schema, model}= require('mongoose');

const UsuarioSchema= Schema({

    nombre:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        requred: true
    },

    online:{
        type: Boolean,
        default: false
    }
});

/* method("toJSON" se llama cuando enviamos json por response 
   Luego en la funcion callback se extrae la version (__v generado por mongo), el id (reemplazaremos por uid) y el password, ya
   que dicha informacion no queremos mostrar en el response (tampoco es obligatorio mostrar esta info en el
   response pero sirve a modo de practica). toObject() contiene la informacion de todos los datos, por lo que
   por destructuracion los extraemos, y con el rest (...object) nos quedamos con la info que queremos y que
   luego retornamos (antes agregando uid como reemplazo de _id)
*/
UsuarioSchema.method("toJSON", function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid= _id;
    return object;
});

module.exports= model('Usuario', UsuarioSchema);