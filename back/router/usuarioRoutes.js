const express = require('express'),
    router = express.Router(),
    userCtrl = require('../controller/usuarioController')

router.get("/",userCtrl.listar)
module.exports = router