const Servico = require('../models/Servico'),
    Prestador = require('../models/Prestador'),
    bcrypt = require('bcrypt')

exports.salvar = (req,res,next) => {
    console.log('alo');    
        let s = req.body
        Servico.create(s,(error,response) => {
            console.log(error);
            
            if(error) return res.status(500).send({message:'Error ao cadastrar servico'})
            res.json(response)
        })
}