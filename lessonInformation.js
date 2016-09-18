/* Routing for Lesson Information Page */
exports.include = (app) => {
	app.get('/information/', function(request, response) {
	  response.render('serviceInformation/index');
	});
}