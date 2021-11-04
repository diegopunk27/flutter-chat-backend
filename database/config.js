const mongoose= require('mongoose');

const dbConecction= function(){
    try{
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify: false, //Evita que findByIdAndUpdate genere warning por Deprecation
        });
        console.log('DB online');
    }catch(error){
        console.log(error);
        throw new Error('Existe un error, comuniquese con el admin');
    }
};

module.exports= {
    dbConecction,
}