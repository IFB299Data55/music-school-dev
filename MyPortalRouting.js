exports.include = (app) => {
	require('./database.js');

	app.get('/myportal/', function(request, response) {
		response.render('myPortal/index');
	});

	app.post('/myportal/SavePersonalData', function(request, response) {
		var user = request.body;
	});

	app.get('/myportal/*', function(request, response) {
	  response.render('myPortal/index');
	});
}