const express = require('express'),
    router = express.Router(),
    servCtrl = require('../controller/servicoController')

    router.post('/',permit('user'),servCtrl.salvar) //user
    router.get('/',permit('prest'),servCtrl.listar) //p
    router.patch('/aceitar',permit('prest'),servCtrl.aceitar) //p
    router.get('/aceitos',permit('prest'),servCtrl.listarAceitos) //p
    router.patch('/finalizar',permit('prest'),servCtrl.finalizar) //p
    router.get('/avaliar',permit('user'),servCtrl.avaliar) //user
    router.patch('/avaliar',permit('user'),servCtrl.avaliado) //user
    router.delete('/recusar',permit('prest'),servCtrl.recusar)

module.exports = router
//localhost:3000/login