exports.include = (app) => {
	require('./database.js');

	app.get('/management/reports/', function(request, response) {
		response.render('generateReports/index');
	});

	app.get('/management/generateReports/getReports/', function(request, response) {
		var reportsResult = [];
		var result = {
			status: true,
			reports: reportsResult
		}

		var getQuery = {
			text: "SELECT id, name FROM music_school.reports",
			name: "get-report-names",
			values: []
		}

		app.client.query(getQuery).on('row', function(row) {
			reportsResult.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (reportsResult.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					result.error = 'There are no reports available';
					response.send(result);
				}
			}
		});
	});

	app.get('/management/generateReports/getReport/', function(request, response) {
		var reportID = request.query.id;
		var studentsResult = [];
		var result = {
			status: true,
			students: studentsResult
		}

		if (!teacherID) {
			teacherID = 1;
		}

		var getQuery = "SELECT l.id as requestid, s.first_name as firstname, s.last_name as lastname, "
						+"TO_CHAR(s.dob,'YYYY-MM-DD') as dob, it.name as instrument, se.grade as grade "
						+"FROM music_school.lessons l, music_school.students s, "
						+"music_school.instrument_types it, music_school.student_experience se "
						+"WHERE l.student_id = s.id AND l.inst_type_id = it.id "
						+"AND (l.teacher_id = "+teacherID+" OR l.teacher_id IS NULL) "
						+"AND (l.request_status_id IS NULL OR l.request_status_id = 1) "
						+"AND l.id NOT IN (SELECT lesson_id FROM music_school.lesson_rejections WHERE teacher_id="+teacherID+") "
						+"AND s.id = se.student_id AND se.inst_type_id = l.inst_type_id;";

		app.client.query(getQuery).on('row', function(row) {
			studentsResult.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (studentsResult.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					result.error = 'You have no lesson requests from any students.';
					response.send(result);
				}
			}
		});
	});

	app.get('/management/reports/*', function(request, response) {
	  response.render('generateReports/index');
	});
}