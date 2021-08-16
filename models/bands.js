const Band = require('./band');

class Bands {
    constructor() {
        this.bands = [];
    }

    //El parametro band se define por defeco como un objeto Band... es lo mas parecido a un tipado en js
    addBand(band = new Band()) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    //Por defecto se inicializa id para que no genere un posible error de nullidad
    deleteBand(id = '') {
        /* El filter() devuelve todos los elementos que cumplen con la condicion, es decir las bandas que 
        son distintas del id ingresado, por lo tanto dicho id se elimina */
        this.bands = this.bands.filter(function (band) {
            return band.id !== id;
        });
    }

    //Sumar un voto a una banda en base al id ingresado
    voteBand(id = '') {
        /* El map() recorre el arreglo, y se busca la banda que tenga el id que se ingreso para sumarle
           un voto */
        this.bands = this.bands.map(function (band) {
            if (band.id === id) {
                band.votes++;
            }
            //console.log(band);
            return band;
        });
    }
}

module.exports= Bands;