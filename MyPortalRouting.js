exports.include = (app) => {
	require('./database.js');

	app.get('/myportal/', function(request, response) {
		response.render('myPortal/index');
	});

	app.get('/myportal/*', function(request, response) {
	  response.render('myPortal/index');
	});
}