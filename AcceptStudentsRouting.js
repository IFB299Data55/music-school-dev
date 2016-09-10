exports.include = (app) => {
	require('./database.js');

	app.get('/teacher/studentApplications/', function(request, response) {
		response.render('acceptStudents/index');
	});

	app.get('/teacher/studentApplications/getStudents/', function(request, response) {

		var teacherID = request.query.id;
		var studentsResult = [];
		var result = {
			status: true,
			students: studentsResult
		}

		var getQuery = "SELECT lr.request_id as requestid, s.first_name as firstname, s.surname as lastname, TO_CHAR(s.dob,'YYYY-MM-DD') as dob, it.name as instrument, se.grade as grade FROM music_school.lesson_requests lr, music_school.students s, music_school.instrument_types it, music_school.student_experience se WHERE lr.student_id = s.student_id AND lr.inst_type_id = it.inst_type_id AND lr.approved_date IS NULL AND s.student_id = se.student_id AND se.inst_type_id = lr.inst_type_id";

		app.client.query(getQuery).on('row', function(row) {
			studentsResult.push(row);
		})
		.on('end', function(){
			if (!response.headersSent) {
				if (studentsResult.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					response.send(result);
				}
			}
		});
	});

	app.post('/teacher/studentApplications/individual/', function(request, response) {
		// do stuff
	});

	app.get('/teacher/studentApplications/*', function(request, response) {
	  response.render('acceptStudents/index');
	});
}