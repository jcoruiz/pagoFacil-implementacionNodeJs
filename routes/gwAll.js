var express = require('express')
var router = express.Router()

var GwAll = require('../app/http/gwAll/indexController')
var gwAll = new GwAll()

router.get('/', function(req, res, next) {   
  gwAll.index(req, res, next)
})

router.post('/checkout', function(req, res, next) {   
  gwAll.checkout(req, res, next)
  return res
})

router.post('/response', function(req, res, next) {
  gwAll.response(req, res, next)
  return res
})

module.exports = router