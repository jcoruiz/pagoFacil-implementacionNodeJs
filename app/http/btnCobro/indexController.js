var express = require('express');

class indexController {

    async index (req, res, next) {
        console.log('btnCobro/index')
        res.render('btnCobro/index', {})
    }

}
module.exports = indexController;