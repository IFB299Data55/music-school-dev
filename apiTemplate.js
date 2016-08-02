exports.include = (app) => {
	app.get('/sampleAPI', function(request, response) {
	  response.render('pages/owner/home');
	});

	app.post('/sampleAPI', function(request, response) {
	  response.end('This was posted');
	});

	app.delete('/sampleAPI', function(request, response) {
	  response.end('This was a delete request');
	});
}