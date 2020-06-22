const Servico = require('../models/Servico'),
    Prestador = require('../models/Prestador'),
    Usuario = require('../models/Usuario')
    bcrypt = require('bcrypt')

exports.salvar = (req,res,next) => {
    console.log('alo');    
        let s = req.body
        if(!s) return res.status(401).send({message:'Encha o tanque'})
        Servico.create(s,(error,response) => {
            console.log(error);
            
            if(error) return res.status(401).send({message:'Encha o tanque'})
            res.json(response)
        })
}
exports.listar = (req,res,next) => {
    console.log('oi');
    Servico.find({prestador_id:req.query.prestador},(error, response) => {
        if(error) return res.status(500).send({message:'Erro ao listar'})
        console.log(response);
        
        res.send(response)
    })
}