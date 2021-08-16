/*Se recibe el objeto io del archivo index, y de esta manera se separa del index el codigo que controla
el tráfico de mensajes
*/
const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands;

bands.addBand(new Band('Matellica'));
bands.addBand(new Band('Nirvana'));
bands.addBand(new Band('Pearl Jam'));
bands.addBand(new Band('Rata Blanca'));

io.on('connection', client => {
    // Mensaje en consola al conectase un cliente
    console.log("Cliente conectado");

    // Mensaje en consola al desconectase un cliente
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje', function (payload) {
        console.log("Nuevo mensaje: ", payload['contenido']);

        io.emit('retorno', { contenido: "Mensaje recibido" });
    });

    client.on('emitir-mensaje', function (payload) {
        client.broadcast.emit('nuevo-mensaje', payload);// Emite a todos menos a si mismo el payload recibido
    });

    /* Sockets de bandas*/
    
    
});