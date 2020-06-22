const mongoose = require('mongoose')
    Schema = mongoose.Schema

let ServicoModel = new Schema({
    usuario_id:{type: Schema.Types.ObjectId,required: true},
    prestador_id:{type: Schema.Types.ObjectId, required: true},
    endereco:{type: String, required: true},
    contato:{type: String, required: true},
    data_inicio:{type: Date, default: Date.now},
    data_fim:{type: Date},
    descricao:{type: String, required:true}
}, {collection: 'servicos', versionKey: false}) 

module.exports = mongoose.model('Servico', ServicoModel)