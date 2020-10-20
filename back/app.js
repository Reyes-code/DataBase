/* Conectado a la base de datos, http, configuración */
var bodyparser= require("body-parser"); /* trae los metodos http  */
var mongose= require("mongoose"); /* Me permite hacer la conexión a la base de datos */

/* creamos el puerto  */
var port= process.env.PORT || 4201;

/* inicializar express */
var express= require("express");
var app= express() /* llamo la función de express */

var user_routes= require('../back/routes/user')/* llamamos al archivo de nuestras rutas  */

/* creamos el servidor para que trabaje con los metodos http y las funciones de express */
var server= require("http").createServer(app)
/* Envio de datos en tiempo real utilizando el servidor  */
var io= require('socket.io')(server);

/* utilizó socket para validar si estoy conectado al servidor (caso whatsapp si estoy en linea) */
io.on('conection', function (socket) {
    console.log("Usuario conectado")
})

/* conexión a la base de datos , primero la url donde mongo funciona */
mongose.connect('mongodb://localhost:27017/messengerdb', (err)=>{
    if (err) {/* si hay un error */
        throw err; /* throw me muestra especificamente el error que tenmos */
    } else {/* si nos conectamos bien */
        console.log("conectado a la base de datos ")
        app.listen(port, function () { /* en que puerto estamos trabajando */
            console.log("estamos trabajndo en el puerto " + port)
        })
    }
})

app.use(bodyparser.urlencoded({extended: true}))/* aqui viaja el cuerpo de la petición, en este caso el registro del formulario */
app.use(bodyparser.json()) /* le decimos que el formato de envio de datos va a ser un json */

app.use('api', user_routes)/* que en nueatra aplicación vamos a utilizar esas rutas */

module.exports=app;