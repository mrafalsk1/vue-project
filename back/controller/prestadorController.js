const Prestador = require('../models/Prestador'),
    bcrypt = require('bcrypt')
    Usuario = require('../models/Usuario')

exports.listar = (req, res, next) => {
    let prestadores = []
    Usuario.find({servicos: {$in:[req.query.categoria]}}, (error,response) => {
        console.log(error);
        res.send({
            'response':response,
            'usuario':res.locals.usuario
        })
        
    })
    
}