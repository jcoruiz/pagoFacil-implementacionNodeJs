var express = require('express');

class indexController {

    async index (req, res, next) {
        console.log('gwSpecifiq/index')
        res.render('gwSpecifiq/index', {})
    }

}
module.exports = indexController;