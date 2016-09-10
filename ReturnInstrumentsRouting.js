exports.include = (app) => {
	require('./database.js');

	app.get('/management/instrument/return/', function(request, response) {
		response.render('returnInstruments/index');
	});

	app.post('/management/instrument/return/', function(request, response) {
		// do stuff
	});

	app.get('/management/instrument/return/*', function(request, response) {
	  response.render('returnInstruments/index');
	});
}