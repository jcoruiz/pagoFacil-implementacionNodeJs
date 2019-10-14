var express = require('express');
var request = require('request');
var dotenv = require('dotenv').config()

class data {

    /**
     * Metodo que se encarga de comunicarse con la api de PagoFacil en la generacion del link de cobro
     * @param {endpoint a ejecutar} action 
     * @param {objeto con los parametros que recibe el servicio} obj 
     * @param {verbo a utilizar para llamar a la api, por defecto es GET} verb 
     * @param {permite especificar la autenticacion del servicio} auth 
     */
    async execApi (action, obj = {}, verb = 'GET', auth = null) {
        try {
            //Conformamos la url del endpoint juntando la parte del .env y del parametro action recibido
            var url = `${process.env.PF_API_URL}/${action}`

            var options = { 
                method: verb,
                url: url,
                headers: 
                { 
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json' 
                },
                body: obj,
                json: true 
            }

            if(auth != null){
                options.auth = auth
            }
                        
            var execution = await this.doRequest(options)                   
            
            return execution
        } catch (error) {
            console.log(error)
            return false
        }                                
    }

    /**
     * Metodo encargado de encapsular en una promesa el request realizado a la api
     * @param {} options 
     */
    async doRequest(options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }

}
module.exports = new data;