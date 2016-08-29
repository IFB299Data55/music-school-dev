exports.include = (app) => {
	app.get('/register/student/', function(request, response) {
	  response.render('studentRegistration/index');
	});

	app.post('/register/student/', function(request, response) {
		var student = request.body;
		//response.send('Student Registered');
		response.sendStatus('201');
		//response.sendStatus('500');
	});

	app.get('/register/student/*', function(request, response) {
	  response.render('studentRegistration/index');
	});
}