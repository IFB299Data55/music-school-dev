exports.include = (app) => {
	app.get('/register/teacher', function(request, response) {
	  response.render('teacherRegistration/index');
	});

	app.post('/register/teacher', function(request, response) {
	  response.render('owner/register');
	});

	app.delete('/register/teacher', function(request, response) {
	  response.end('This was a delete request');
	});
}