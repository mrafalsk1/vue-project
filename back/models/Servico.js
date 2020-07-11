const mongoose = require('mongoose')
    Schema = mongoose.Schema

let ServicoModel = new Schema({
    usuario_id:{type: Schema.Types.ObjectId,required: true},
    prestador_id:{type: Schema.Types.ObjectId, required: true},
    endereco:{type: String, required: true},
    contato:{type: String, required: true},
    data_inicio:{type: Date, default: Date.now},
    data_fim:{type: Date},
    data_conf:{type: Date},
    descricao:{type: String, required:true},
    avaliacao: { type: Number, set: function (v) { return Math.round(v) ;}},
    valor: { type: Number, set: function (v) { return Math.round(v) ;}},
    assunto:{type: String, required: true}
}, {collection: 'servicos', versionKey: false}) 

module.exports = mongoose.model('Servico', ServicoModel)