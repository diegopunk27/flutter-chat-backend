/*Se recibe el objeto io del archivo index, y de esta manera se separa del index el codigo que controla
el tráfico de mensajes
*/
const { conectarUsuario, desconectarUsuario, grabarMensaje } = require('../controllers/socket-controller.js');
const { verificarJWT } = require('../helpers/jwt.js');
const { io } = require('../index.js');


io.on('connection', client => {
    /* Primero se obtiene el token de la conexion entrante, y se lo envia a la funcion verificarJWT
       la cual retorna true y el uid en caso de que el token sea valido. En caso que el token
       no sea valida, la funcion retorna false y el control posterior (if(!validaOk)) cierra la conexión
    */
    const token= client.handshake.headers["x-token"];
    const [validaOk, uid]= verificarJWT(token);

    if(!validaOk){
        return client.disconnect();
    }

    // Mensaje en consola al conectase un cliente
    console.log("Cliente conectado");
    //Cambiando usuario online a true y obreniendo el usuario
    const usuario= conectarUsuario(uid);

    /* Conectando al usuario a una sala en particular para mensajes punto a punto.

       Nota: Se podría conectar a una sala mediante client.id, que identifica de forma única al cliente socket, pero
       éste cambiará en cada reconexión, por eso se utiliza el uid que es el id de mongo el cual siempre
       será único.
       Nota 2: El usuario socket ya está conectado a una sala global gracias a "io", el cual permite hacer broadcast
       y enviar un mensaje a todos los usuarios conectados. Pero se utiliza join para unir al usuario a una sala particular
       y evitar el brodcast 
    
    */
    client.join(uid);

    // Mensaje en consola al desconectase un cliente
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
        //Cambiando usuario online a false
        desconectarUsuario(uid);
    });

    client.on('mensaje', function (payload) {
        //console.log("Nuevo mensaje: ", payload['contenido']);

        io.emit('retorno', { contenido: "Mensaje recibido" });
    });

    client.on('emitir-mensaje', function (payload) {
        client.broadcast.emit('nuevo-mensaje', payload);// Emite a todos menos a si mismo el payload recibido
    });

    /* Sockets de chat*/

    //escuchando los mensajes
    client.on('mensaje-personal', async function(payload){
        //console.log(payload);

        await grabarMensaje(payload);
        /* En el callback, luego de escuhar el  mensaje, lo redirecciona al usuario correspondiente.
           El método "to()" recibe como parametro el id del usuario destino con "payload.to", 
           y reenvia el payload completo
        */
        io.to(payload.to).emit('mensaje-personal', payload);
    });
    
    
});