exports.include = (app) => {
	require('./database.js');

	app.get('/teacher/studentApplications/', function(request, response) {
		response.render('acceptStudents/index');
	});

	app.post('/teacher/studentApplications/individual/', function(request, response) {
		// do stuff
	});

	app.get('/teacher/studentApplications/*', function(request, response) {
	  response.render('acceptStudents/index');
	});
}