var express = require('express');
const crypto = require('crypto');

class indexController {

    async index (req, res, next) {
        //Solo rendereamos la pagina index
        res.render('gwSpecifiq/index', {})
    }

    async checkout (req, res, next) { 
        //Obtenemos los parametros del request
        var objRequest = req.body

        //Obtenemos las variables de entorno
        var pf_token_id = process.env.PF_TOKEN_ID
        var pf_token_secret = process.env.PF_TOKEN_SECRET
        var pf_url_gw = process.env.PF_URL_GW

        //Creamos el objeto que solicita el initTransaction de Pago Facil
        var objCreateTransaction = {
            x_account_id: pf_token_id,
            x_amount:objRequest.txtAmount,
            x_currency:objRequest.selCurrency,
            x_reference:objRequest.txtReference,
            x_customer_email:objRequest.txtEmailCliente,
            x_url_complete:'http://localhost:3000/gwSpecifiq/response?status=complete',
            x_url_cancel:'http://localhost:3000/gwSpecifiq/response?status=cancel',
            x_url_callback:'http://localhost:3000/gwSpecifiq/response?status=callback',            
            x_shop_country:objRequest.selCountry,
            x_session_id:'a0010010001'            
        }    

        //creamos la firma del objeto de la forma que solicita pago facil, para mas informacion ver
        // https://apidocs.pagofacil.cl/proceso-de-firmado
        var sign = await this.signPayload(objCreateTransaction, pf_token_secret)
        objCreateTransaction.x_signature = sign
        objCreateTransaction.medio_de_pago = objRequest.selMedio

        let objCheckout = {...objCreateTransaction}
        objCheckout.pf_url_gw = pf_url_gw
        //Rendereamos un formulario que realiza el post a initTransaction de Pago Facil
        res.render('gwSpecifiq/checkout', objCheckout)                                  
    }

    async response (req, res, next) { 
        //Procesamos la respuesta de pago facil y enviamos los valores a gwAll/response         
        var objResponse = {...req.body}
        objResponse.estado = req.query.status
        res.render('gwSpecifiq/response', {...objResponse})
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