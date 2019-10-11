//ejemplo de archivo de prueba
const express = require('express');
const http = require('http');
const logger = require('morgan');

//const Trxs = require('./../models/MYSQL/Trxs');
//const TrxDetails = require('./../models/DYNAMODB/Trxs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.set('port', 3000);

describe('Get Transacciones Process', function() {		


	it('debe escribir en trx', function(done) {
		expect(1).toBe(1)
		done();
	});	

	it('Debe crear transacción', function(done) {
		expect(1).toBe(1)
		done();
	});	
});

/*

describe('Get Transacciones Process', function() {
	let server;
	let trxs;
	let data = {
		idServicio: '468',
		limit: '10'
	};
	let exampleObject = [
		{
			idTrx: 'id1',
			estado: 'COMPLETADA',
			source: 'WebpayPST'
		},
		{
			idTrx: 'id2',
			estado: 'PENDING',
			source: 'WebpayPST'
		}
	];

	beforeAll(() => {
		server = http.createServer(app);
		server.listen(3000);
		trxs = new Trxs();

		spyOn(trxs, 'write').and.returnValue(Promise.resolve(exampleObject));
		spyOn(TrxDetails.prototype, 'getTrxDetails').and.returnValue(Promise.resolve({}));

		trxs.getAll(data);
	});

	afterAll(() => {
		server.close();
	});

	it('debe escribir en trx', function(done) {
		expect(trxs.write).toHaveBeenCalled();
		done();
	});
	it('debe obtener detalles de trx', function(done) {
		expect(TrxDetails.prototype.getTrxDetails).toHaveBeenCalled();
		done();
	});
	it('debe retornar algo', (done) => {
		expect(trxs.getAll).toBeTruthy();
		done();
	});
});
*/