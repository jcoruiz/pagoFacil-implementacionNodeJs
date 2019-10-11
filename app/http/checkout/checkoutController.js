var express = require('express');
//var router = express.Router();

class checkoutController {

    checkout (req, res, next) {
        console.log(req.body)       
        res.render('test', { 
            title: 'Express' })
    }

}
module.exports = checkoutController;