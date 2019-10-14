var express = require('express');
const crypto = require('crypto');

class indexController {

    async index (req, res, next) {
        res.render('gwAll/index', {})
    }

    async checkout (req, res, next) { 
        
        var objRequest = req.body

        var pf_token_id = process.env.PF_TOKEN_ID
        var pf_token_secret = process.env.PF_TOKEN_SECRET

        var objCreateTransaction = {
            x_account_id: pf_token_id,
            x_amount:objRequest.txtAmount,
            x_currency:objRequest.selCurrency,
            x_reference:objRequest.txtReference,
            x_customer_email:objRequest.txtEmailCliente,
            x_url_complete:'http://localhost:3000/gwAll/response?status=complete',
            x_url_cancel:'http://localhost:3000/gwAll/response?status=cancel',
            x_url_callback:'http://localhost:3000/gwAll/response?status=callback',            
            x_shop_country:objRequest.selCountry,
            x_session_id:'a0010010001'
        }    

        var sign = await this.signPayload(objCreateTransaction, pf_token_secret)
        objCreateTransaction.x_signature = sign

        res.render('gwAll/checkout', {...objCreateTransaction})                                  
    }

    async response (req, res, next) {        
        var objResponse = {...req.body}
        objResponse.estado = req.query.status
        res.render('gwAll/response', {...objResponse})
    }

    async signPayload(payload, secret, prefix = "x_", signature = "signature") {
        var payload = Object.entries(payload).sort();
        let payloadFirmado;
        let firma = prefix + signature;
        let mensaje = "";
        for (let index = 0; index < payload.length; index++) {            
            if (payload[index][0] != firma) {
                mensaje += payload[index][0] + payload[index][1];
            }
        }
        let hmac = crypto.createHmac('sha256', secret);
        hmac.setEncoding('hex');
        hmac.write(mensaje);
        hmac.end();
        payloadFirmado = hmac.read();
        return payloadFirmado;
    }

}
module.exports = new indexController;