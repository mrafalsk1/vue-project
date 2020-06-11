const express = require('express'),
    router = express.Router(),
    prestCtrl = require('../controller/prestadorController')

    router.get('/',prestCtrl.listar)

module.exports = router
//localhost:3000/login