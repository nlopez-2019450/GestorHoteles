'use strict'

const Usuarios = require('./src/models/user.model');
const bcrypt = require('bcrypt');
const {generateJWT} = require('./src/helpers/create-jwt');

//Crear Usuario por defecto
const adminApp = async() =>{
    try{
        const user = new Usuarios();
        user.name = 'Administrador';
        user.lastname = 'Administrador';
        user.email = 'admin@correo.com';
        user.password = '123456';
        user.rol = 'ADMINAPP';
        const userEncontrado = await Usuarios.findOne({email: user.email})

        if(userEncontrado) return console.log('El AdminApp está listo');

        //Encriptación de contraseña
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

        //Guardar Usuario
        user = await user.save();

        if(!user) return console.log('El AdminApp no esta listo');
        return console.log('El AdminApp está listo');
        
    }catch(error){
        console.log(error)
    }
}

module.exports = {adminApp};