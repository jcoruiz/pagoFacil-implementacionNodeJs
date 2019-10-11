var express = require('express')
var router = express.Router()

var BtnCobro = require('../app/http/btnCobro/indexController')
var btnCobro = new BtnCobro()

router.get('/', function(req, res, next) {   
  btnCobro.index(req, res, next)
  return res
})

router.post('/checkout', function(req, res, next) {   
  btnCobro.checkout(req, res, next)
  return res
})

module.exports = router