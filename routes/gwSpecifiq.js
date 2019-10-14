var express = require('express')
var router = express.Router()

//Se importa controlador del ejemplo gwSpecifiq para implementar sus metodos de acuerdo a las rutas
var gwSpecifiq = require('../app/http/gwSpecifiq/indexController')

router.get('/', function(req, res, next) {   
    gwSpecifiq.index(req, res, next)
})

router.post('/checkout', function(req, res, next) {   
    gwSpecifiq.checkout(req, res, next)
    return res
})

router.post('/response', function(req, res, next) {
    gwSpecifiq.response(req, res, next)
    return res
})

module.exports = router