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

		var getQuery = "SELECT lr.id as requestid, s.first_name as firstname, s.last_name as lastname, "
						+"TO_CHAR(s.dob,'YYYY-MM-DD') as dob, it.name as instrument, se.grade as grade "
						+"FROM music_school.lesson_requests lr, music_school.students s, "
						+"music_school.instrument_types it, music_school.student_experience se "
						+"WHERE lr.student_id = s.id AND lr.inst_type_id = it.id "
						+"AND lr.approved_date IS NULL AND s.id = se.student_id AND se.inst_type_id = lr.inst_type_id";

		app.client.query(getQuery).on('row', function(row) {
			studentsResult.push(row);
		})
		.on('end', function() {
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
		var requestID = request.query.requestID;
		var accept = request.query.accept; // true or false
		var result = {
			status: true,
		}

		if (accept) {
			var acceptQuery = "";

			// set request status to 2

			app.client.query(acceptQuery).on('error', function() {
				result.status = false;
				response.send(result);
			})
			.on('end', function() {
				if (!response.headersSent) {
					response.send(result);
				}
			})
		} else {
			var rejectQuery = "";

			// leave request status on 1
			// 

			app.client.query(rejectQuery).on('error', function() {
				result.status = false;
				response.send(result);
			})
			.on('end', function() {
				if (!response.headersSent) {
					response.send(result);
				}
			})
		}
	});

	app.get('/teacher/studentApplications/*', function(request, response) {
	  response.render('acceptStudents/index');
	});
}