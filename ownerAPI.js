exports.include = (app) => {
	app.get('/owner', function(request, response) {
	  response.render('pages/owner/home');
	});

	app.post('/owner', function(request, response) {
	  response.render('pages/owner/posted');
	});

	app.delete('/owner', function(request, response) {
	  response.end('This was a delete request');
	});
}