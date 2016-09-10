exports.include = (app) => {
	require('./database.js');

	app.get('/management/teachers/', function(request, response) {
		response.render('deactivateTeachers/index');
	});

	app.post('/management/teachers/individual/', function(request, response) {
		// do stuff
	});

	app.get('/management/teachers/*', function(request, response) {
	  response.render('deactivateTeachers/index');
	});
}