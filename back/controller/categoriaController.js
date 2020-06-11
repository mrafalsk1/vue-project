const Categoria = require('../models/Categoria'),
    Prestador = require('../models/Prestador'),
    bcrypt = require('bcrypt')



exports.listar = (req, res, next) => {
    console.log(res.locals.usuario);
    
    Categoria.find(async(error, categorias) => {
        if (error) return res.status(500).send({ message: "error" })
        let quantidade = [];
        for (let i = 0; i < categorias.length; i++) {
            const categoria = categorias[i];
            let qt = await Usuario.aggregate([{
                "$match": {
                    servicos: {
                        $in: [categoria.nome]
                    }
                }
            },
            { "$count": 'quantidade' }
            ])
            quantidade.push({
                'categoria':categoria.nome,
                'quantidade':qt.length > 0?qt[0].quantidade:0,
                'roles': res.locals.usuario
            })
        }
        res.send(quantidade)
    });
}

exports.salvar = (req, res, next) => {
    let c = req.body
    Categoria.create(c,(error,categoria) => {
        if(error) return res.status(500).send({message:"error"})
        console.log(categoria);
        
        res.json(categoria)
    })
}