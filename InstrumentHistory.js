exports.include = (app) => {
	app.get('/student/instruments/history/', function(request, response) {
	  response.render('instrumentHistory/index');
	});
}