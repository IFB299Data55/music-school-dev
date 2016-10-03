/* Manages Instrument Return Routing */
exports.include = (app) => {
	require('./database.js');

	/* Display Page */
	app.get('/teacher/timetable/', function(request, response) {
		response.render('teacherTimetable/index');
	});

	app.get('/teacher/timetable/*', function(request, response) {
	  response.render('teacherTimetable/index');
	});
}