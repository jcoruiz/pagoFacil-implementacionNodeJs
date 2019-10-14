var express = require('express')
var router = express.Router()

var btnCobro = require('../app/http/btnCobro/indexController')

router.get('/', function(req, res, next) {   
  btnCobro.index(req, res, next)
  return res
})

router.post('/checkout', function(req, res, next) {   
  btnCobro.checkout(req, res, next)
  return res
})

module.exports = router