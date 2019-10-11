var express = require('express');

class indexController {

    async index (req, res, next) {
        console.log('btnCobro/index')
        res.render('btnCobro/index', {})
    } 

    async checkout (req, res, next) {
        console.log('btnCobro/checkout')
        
        console.log(req.body)
        //return "test"
        //res.render('btnCobro/index', {})

        res.writeHead(302, {
            'Location': 'your/404/path.html'
            //add other headers here...
          });
          res.end();
    }

}
module.exports = indexController;