# Integracion Pago Facil en NodeJs + Express


![](https://img.shields.io/github/stars/jcoruiz/pagoFacil-implementacionNodeJs) ![](https://img.shields.io/github/forks/jcoruiz/pagoFacil-implementacionNodeJs) ![](https://img.shields.io/github/issues/jcoruiz/pagoFacil-implementacionNodeJs) ![](https://img.shields.io/github/release/jcoruiz/pagoFacil-implementacionNodeJs) 


**Table of Contents**

[TOC]

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

Necesitas tener en tu maquina al menos la version 8.14.1 de [**NodeJs**](https://nodejs.org "**NodeJs**")

### Instalación 🔧

Despues de clonar, entrar a la carpeta del repositorio y ejecutar

`$ npm install`

copiar el archivo **.example.env** y dejarlo como **.env**

`$ cp .example.env .env`

Configurar las distintas variables del archivo **.env**

*Parametros necesarios para la creacion de link de cobro*
PF_USER= [Corresponde al usuario para iniciar sesion en el portal de Pago Facil]
PF_PASS= [Corresponse a la contraseña para iniciar sesion en el portal de Pago Facil]
PF_ACCOUNT_ID= [Corresponde al numero id del servicio a utilizar]
PF_API_URL= [Corresponde al endpoint de la api del portal Ej: https://api-dev.pgf.cl]

*Parametros necesarios para la derivacion al portal de pagos*
PF_TOKEN_ID= [Corresponde al Token Service del servicio]
PF_TOKEN_SECRET= [Corresponde al Token Secret del servicio]

Iniciar el proyecto con `$ DEBUG=pf-implementacion-gw:* npm start`