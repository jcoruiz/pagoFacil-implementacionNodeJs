var express = require('express')
var router = express.Router()

var GwSpecifiq = require('../app/http/gwSpecifiq/indexController')
var gwSpecifiq = new GwSpecifiq()

router.get('/', function(req, res, next) {   
    gwSpecifiq.index(req, res, next)
})

module.exports = router