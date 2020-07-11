const express = require('express'),
    router = express.Router(),
    prestCtrl = require('../controller/prestadorController')

    router.get('/',permit('user'),prestCtrl.listar)

module.exports = router
//localhost:3000/login