var express= require('express');
var app= express.Router(); /* me permite crear las rutas donde viajar la información  */

var userController= require('../controllers/userController') /* Requerimos el archivo que acabamos de crear */

app.post('/registrar', userController.registrar) /* creamos la ruta que nos permitirá registrar */

module.exports=app;