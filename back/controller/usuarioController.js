const Usuario = require('../models/Usuario'),
    bcrypt = require('bcrypt')



exports.listar = (req,res, next) => {
    Usuario.find((error,usuarios) => {
        if(error) return res.status(500).send({message:"error"})
        res.send(usuarios)
    })
}