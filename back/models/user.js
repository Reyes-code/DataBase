var mongoose= require('mongoose'); /* conexión a base de datos */
var Schema= mongoose.Schema; /* creamos la variable que va a enviar el modelo a mongo */

var userSchema= Schema({
    nombre: String,
    email: String,
    password: String,
    imagen: String,
    telefono: String,
    bio: String,
    curso: String,
    estado: Boolean // Estado de conexión
});

module.exports= mongoose.model('user', userSchema)