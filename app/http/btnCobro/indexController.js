var express = require('express');
var dotenv = require('dotenv').config()
var data = require('../utils/data');


class indexController {

    async index (req, res, next) {
        //Solo rendereamos la pagina index
        res.render('btnCobro/index', {})
    } 

    async checkout (req, res, next) {
        //Leemos los parametros del request
        var objRequest = req.body

        //Obtenemos los parametros de entorno
        var pf_user = process.env.PF_USER
        var pf_pass = process.env.PF_PASS
        var pf_account_id = process.env.PF_ACCOUNT_ID

        var objLogin = {
            username: pf_user,
            password: pf_pass
        }

        //Nos logueamos en la api de pago facil, para esto le pasamos usuario y password guardados en variables de entorno
        var loginResponse = await data.execApi('login', objLogin, 'POST')

        //Creamos el objeto de transaccion que solicita el metodo /trxs/create
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

        //creamos el objeto de autenticacion con el resultado de la primera llamada a la api
        var authObj = {
            bearer: loginResponse.access_token_jwt            
        }

        //Llamamos a la api de pago facil con el objeto completo
        var createTransactionResponse = await data.execApi('trxs/create', objCreateTransaction, 'POST', authObj)
        
        //redireccionamos a checkout con el id y link de la transaccion generados
        res.render('btnCobro/checkout', {
            idTrx: createTransactionResponse.idTrx,
            payUrl: createTransactionResponse.payUrl
        })                       
    }
}
module.exports = new indexController;