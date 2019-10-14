var express = require('express');
var dotenv = require('dotenv').config()
var data = require('../utils/data');


class indexController {

    async index (req, res, next) {
        console.log('btnCobro/index')
        res.render('btnCobro/index', {})
    } 

    async checkout (req, res, next) {
        console.log('btnCobro/checkout')   
        
        var objRequest = req.body

        var pf_user = process.env.PF_USER
        var pf_pass = process.env.PF_PASS
        var pf_account_id = process.env.PF_ACCOUNT_ID

        var objLogin = {
            username: pf_user,
            password: pf_pass
        }

        var loginResponse = await data.execApi('login', objLogin, 'POST')

        var objCreateTransaction = {
            x_url_callback: "https://www.pagofacil.cl/?payment",
            x_url_cancel: "https://www.pagofacil.cl/?cancel",
            x_url_complete: "https://www.pagofacil.cl/?complete",
            x_customer_email: objRequest.txtEmailCliente,
            x_reference: objRequest.txtReference,
            x_account_id: pf_account_id,
            x_amount: objRequest.txtAmount,
            x_currency: objRequest.selCurrency,
            x_shop_country: objRequest.selCountry
        }

        //console.log(loginResponse)
        var authObj = {
            bearer: loginResponse.access_token_jwt            
        }
        var createTransactionResponse = await data.execApi('trxs/create', objCreateTransaction, 'POST', authObj)
        

        res.render('btnCobro/checkout', {
            idTrx: createTransactionResponse.idTrx,
            payUrl: createTransactionResponse.payUrl
        })                       
    }
}
module.exports = new indexController;