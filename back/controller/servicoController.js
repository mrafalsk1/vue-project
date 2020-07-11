const Servico = require('../models/Servico'),
    Prestador = require('../models/Prestador'),
    Usuario = require('../models/Usuario')
    bcrypt = require('bcrypt')

exports.salvar = (req,res,next) => {
    console.log('alo');    
        let s = req.body
        if(!s.assunto,!s.descricao,!s.endereco,!s.contato) return res.status(400).send({message:'Prencha todos os campos'})
        Servico.create(s,(error,response) => {
            console.log(error);
            
            if(error) return res.status(401).send({message:'Encha o tanque'})
            res.json(response)
        })
}
exports.listar = (req,res,next) => {
    console.log('oi');
    Servico.find({prestador_id:req.query.prestador,data_conf: {$exists:false}},(error, response) => {
        if(error) return res.status(500).send({message:'Erro ao listar'})
        console.log(response);
        
        res.send(response)
    })
}
exports.aceitar = (req,res,next) => {
    console.log('oi');
    console.log(req.body.data.data_conf);
    

    
    Servico.findOneAndUpdate({_id:req.body.data.id},{$set:{data_conf:req.body.data.data_conf}}).then((response) => {
        console.log(response);
        res.send(response)
    })
    //users.findOneAndUpdate({name: 'foo'}, { $set: { name: 'bar'} }).then((updatedDoc) => {})
    
}
exports.listarAceitos = (req,res,next) => {
    Servico.find({data_conf: {$exists:true},prestador_id:req.query.prestador,data_fim:{$exists:false}},(error, response) => {
        if(error) return res.status(500).send({message:'Erro ao listar'})
        console.log(error);
        
        res.send(response)
    })
}
exports.finalizar = (req,res,next) => {
    Servico.findOneAndUpdate({_id:req.body.data.id},{$set:{data_fim:req.body.data.data_fim,valor:req.body.data.valor}}).then((response) => {
        console.log(response);
        res.send(response)
    })
}
exports.avaliar = (req,res,next) => {
    Servico.find({usuario_id:req.query.user,avaliacao:{$exists:false},data_fim:{$exists:true}},(error, response) => {
        if(error) return res.status(500).send({message:'Erro ao listar'})
        console.log(error);
        
        res.send(response)
    })
}
exports.avaliado = (req,res,next) => {
    console.log(req.body.data.avaliacao);
    Servico.findOneAndUpdate({_id:req.body.data.id},{$set:{avaliacao:req.body.data.avaliacao}}).then((response) => {
        console.log(response);
        console.log('loa');
        
        res.send(response)
    })
}
exports.recusar = (req,res,next) => {
    console.log(req.body);
    Servico.findByIdAndDelete({_id:req.body.id}).then((response) =>{
        res.send(response)
    })
}