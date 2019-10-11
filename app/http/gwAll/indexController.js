var express = require('express');

class indexController {

    async index (req, res, next) {
        console.log('gwAll/index')
        res.render('gwAll/index', {})
    }

}
module.exports = indexController;