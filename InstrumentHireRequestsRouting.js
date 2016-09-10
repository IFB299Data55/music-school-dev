exports.include = (app) => {
	require('./database.js');

	app.get('/management/instrument/requests/', function(request, response) {
		response.render('instrumentHireRequests/index');
	});

	app.post('/management/instrument/requests/individual/', function(request, response) {
		// do stuff
	});

	app.get('/management/instrument/requests/*', function(request, response) {
	  response.render('instrumentHireRequests/index');
	});
}