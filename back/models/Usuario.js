const mongoose = require('mongoose')
    Schema = mongoose.Schema

let UsuarioModel = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    senha: {type: String, required: true},
    roles: {type: Array},
    servicos: {type: Array},
    cnpj:{type: String},
    telefone:{type: String, required: true},
    endereco:{type: String}
}, {collection: 'usuarios', versionKey: false}) 

module.exports = mongoose.model('Usuario', UsuarioModel)