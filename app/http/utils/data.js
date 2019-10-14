var express = require('express');
var request = require('request');
var dotenv = require('dotenv').config()

class data {

    async execApi (action, obj = {}, verb = 'GET', auth = null) {
        try {
            console.log('utils/data')

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