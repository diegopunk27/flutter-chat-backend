/*Importamos paquete uuid. 
Version instalada 8.3.0
> npm i uuid@8.3.0
*/
const {v4: uuidV4}= require('uuid');

class Band{

    constructor(name='sin-nombre'){
        this.id= uuidV4(); //identificador unico
        this.name=name;
        this.votes=0;
    }
}

/* Generando exportación para usar en el proyecto. Solo se necesitara importar el archivo en otro documento*/
module.exports= Band;