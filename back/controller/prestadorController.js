const Prestador = require('../models/Prestador'),
    bcrypt = require('bcrypt')
Usuario = require('../models/Usuario')
Servico = require('../models/Servico')

exports.listar = (req, res, next) => {
    let prestadores = []
    /*Usuario.find({servicos: {$in:[req.query.categoria]}}, (error,response) => {
        console.log(error);
        res.send({
            'response':response,
            'usuario':res.locals.usuario
        })
        
    })*/
    /*Servico.aggregate([{
        "$group": {
            "_id": '$prestador_id',
            "media": { "$avg": "$avaliacao" }
        }   
    },
    {"$sort":{"media":-1} }
    ]).exec(async (e, d) => {
        let dados = []
        for (let i = 0; i < d.length; i++) {
            const element = d[i];
            let prestador = await Usuario.findOne({ _id: element._id, servicos: { $in: [req.query.categoria] } }).exec()
            console.log(prestador);
            
            if (prestador != null) {
                
                dado = {
                    prestador,
                    media: element.media.toFixed()
                }
                dados.push(dado)
            }

        }
        console.log('--------------------');
        console.log(dados);
        console.log(dados.length)
        res.send(dados)
    })*/
    console.log('aaaaaaaaa');

    Usuario.find({ servicos: { $in: [req.query.categoria] } }, async (error, usuarios) => {
        if (error) return res.status(500).send({ message: "error" })
        let dados = []
        let alo = []
        console.log(usuarios.length);

        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i]

            let media = await Servico.aggregate([
                {
                    "$match": {
                        "prestador_id": usuario._id
                    }
                },
                {
                    "$group": {
                        "_id": "$prestador_id",
                        "media": { "$avg": "$avaliacao" }
                    }
                },
                { "$sort": { "media": -1 } }
            ])
            console.log(media);

            alo.push(media)
            dados.push({
                'media': media.length > 0 ? media[0].media.toFixed() : -1,
                'prestador': usuario
            })

        }
         // [10, 20, 40, 101]
         
        res.send(dados)
    })

    /*Categoria.find(async (error, categorias) => {
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
                'categoria': categoria.nome,
                'quantidade': qt.length > 0 ? qt[0].quantidade : 0,
                'roles': res.locals.usuario
            })
        }
        res.send(quantidade)
    });*/

}
