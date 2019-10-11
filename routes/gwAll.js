var express = require('express')
var router = express.Router()

var GwAll = require('../app/http/gwAll/indexController')
var gwAll = new GwAll()

router.get('/', function(req, res, next) {   
    gwAll.index(req, res, next)
})

module.exports = router