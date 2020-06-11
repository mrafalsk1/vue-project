const express = require('express'),
    router = express.Router(),
    catCtrl = require('../controller/categoriaController')
    permit = require('../middlewares/permission')
router.get('/',catCtrl.listar)
router.post('/',permit('adm'),catCtrl.salvar)
module.exports = router
//localhost:3000/login