const Usuario = require('../models/Usuario'),
    Prestador = require('../models/Prestador'),
    Categoria = require('../models/Categoria'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
    let { email, senha } = req.body
    console.log(email, senha);

    if (!email || !senha) return res.status(401).send({message:'Informe email/senha'});
    //busca usuário
    Usuario.findOne({ email }, (error, usuario) => {
        if (error) return next(error)
        if (!usuario) return res.status(401).send({message:'Usuário ou senha inválidos'});

            // VERIFICA HASH SENHA
        bcrypt.compare(senha, usuario.senha, (err, match) => {
            if (!match) return res.status(401).send({message:'Usuário ou senha inválidos'});
             //GERAR TOKEN
            const token = jwt.sign({
                usuario: {
                    _id: usuario._id,
                    roles: usuario.roles
                }
            }, process.env.SECRET_JWT, { expiresIn: '30d' });
            console.log('foi?');
            
            res.json({
                usuario: {
                    id: usuario._id,
                    nome: usuario.nome,
                    email: usuario.email,
                    roles: usuario.roles
                },
                token
            })
        })
       

    })

}
exports.cadastrar = (req, res, next) => {
    let u = req.body

    //console.log('Usuario :'+res.locals.usuario._id);
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(u.senha, salt, (err, hash) => {
            if (err) return res.status(500).send({message:"erro"})
            u.senha = hash
            Usuario.create(req.body, (error, usuario) => {
                if (error) return res.status(500).send({message:'erro'})
                res.json(usuario)
            })
        })
    })
}
exports.categorias = (req,res,next) => {
    Categoria.find((error,categorias) => {
        if(error) return res.status(500).send({message:"error"})
        let data = {
            'categorias': categorias,
            'usuario':res.locals.usuario
        }
        res.send(data)
    })
}
exports.cadastrarPrestador = (req,res,next) => {
    console.log('alo');
    
    let p = req.body
    console.log(p);
    if (!p.email || !p.senha || !p.servicos || !p.cnpj || !p.servicos[0]) return res.status(401).send({message:'Encha o tanque'});
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(p.senha, salt, (err, hash) => {
            if (err) return res.status(500).send({message:"erro"})
            p.senha = hash
            Usuario.create(req.body, (error, prestador) => {
                console.log(error);
                
                if (error) return res.status(500).send({message:'erro'})
                res.json(prestador)
            })
        })
    })
}