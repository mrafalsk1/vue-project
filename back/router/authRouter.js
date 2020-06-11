const express = require('express'),
    router = express.Router(),
    authCtrl = require('../controller/authController')

router.post("/login", authCtrl.login)
router.post('/cadastrar',authCtrl.cadastrar)
router.get('/categorias',authCtrl.categorias)
router.post('/cadastrar/prestador',authCtrl.cadastrarPrestador)
module.exports = router
//localhost:3000/login