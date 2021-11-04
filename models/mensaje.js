const {Schema, model}= require('mongoose');

const MensajeSchema= Schema({
    /* El tipo para "de" y "para" es el id del objeto del modelo Usuario
    */
    de:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },

    para:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    mensaje:{
        type: String,
        required: true
    }
},{
    /*Aquí se define la configuracion adicional, y en este caso usamos timestamps activo para que mongo
      almacene la fecha del mensaje. Se podría haber definido el campo "fecha" de tipo Date, pero es mejor
      que mongo lo gestione automaticamente
    */
    timestamps:true
});

MensajeSchema.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject();
    return object;
});

//Se exporta con la llave en singular, porque mongo al crear la tabla lo pluraliza
module.exports= model('Mensaje', MensajeSchema);