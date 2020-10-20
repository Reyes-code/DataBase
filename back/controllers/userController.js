/* Aqui es donde vamos a crear registros, modificaciones, eliminar  */
var User= require('../models/user'); /* traemos el modelo que acabamos de crear */
var bcrypt= require('bcrypt-nodejs'); /* Encriptar las contraseñas */

function registrar(req , res) {
    var params= req.body; /* Guarda información de quien se esta registrando  */
    var user = new User(); /* vamos a usar siempre este mismo modelo para cada usuario nuevo */

    user.nombre= params.nombre; 
    user.email= params.email;
    user.imagen= null;
    user.telefono= '';
    user.bio= '';
    user.curso='undefined';
    user.estado= false;

    /* si hay una contraseña en el envio de la petición  */
    if (params.password) { /* la vamos a encriptar */
        bcrypt.hash(params.password, null, null,function (err, hash) {
            user.password= hash; /* le digo que en el modelo de mongoDB se va a almacenar la contraseña de una vez encriptada   */

            User.findOne({email: params.email}, (err, user_data)=>{
                if (!user_data) {/* si no hay un usuario registrado con ese correo, lo vamos a registrar */
                    user.save((err, user)=>{
                        if (user) {/* si el usuario se registra */
                            res.status(200).send({user:user})/* me va a devolver el objeto de usuario  */
                        } else {/* si no se puede registrar el usuario  */
                            require.status(404).send({message: err})
                        }
                    })
                    
                } else { /* si esta registrado */
                    res.status(404).send({message: "El correo ya esta registrado"})
                }


            })

        });
    } else {/* si no hay una contraseña */
        res.status(500).send({message: 'Ingrese su contraseña'})
    }
}

module.exports={
    registrar
}