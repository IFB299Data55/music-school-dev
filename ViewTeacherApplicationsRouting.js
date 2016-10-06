exports.include = (app) => {
	require('./database.js');

	app.get('/management/teacherApplications/', function(request, response) {
		response.render('viewTeacherApplications/index');
	});

	app.get('/management/teacherApplications/getTeacherApplications/', function(request, response) {

		var teacherApplicationsResult = [];
		var result = {
			status: true,
			teacherApplications: teacherApplicationsResult
		}

		var getQuery = "SELECT id as teacherapplicantid, first_name as firstname, last_name as lastname, "
						+"TO_CHAR(dob,'YYYY-MM-DD') as dob, date_applied as dateapplied "
						+"FROM music_school.teacher_applicants "
						+"WHERE status = 1 AND is_approved = FALSE"; // applied and not approved

		app.client.query(getQuery).on('row', function(row) {
			teacherApplicationsResult.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (teacherApplicationsResult.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					response.send(result);
				}
			}
		});
	});

	app.get('/management/teacherApplications/getTeacherApplication/', function(request, response) {

		var teacherApplicationID = request.query.id;
		var teacherApplication = [];
		var result = {
			status: true,
			teacherApplication: teacherApplication
		}

		var getQuery = "SELECT l.id as requestid, s.first_name as firstname, s.last_name as lastname, "
						+"TO_CHAR(s.dob,'YYYY-MM-DD') as dob, it.name as instrument, se.grade as grade, "
						+"l.lesson_start_time as starttime, l.lesson_end_time as endtime, l.lesson_year as year, "
						+"l.lesson_term as term, l.lesson_fee as fee, l.lesson_notes as notes "
						+"FROM music_school.lessons l, music_school.students s, "
						+"music_school.instrument_types it, music_school.student_experience se "
						+"WHERE l.student_id = s.id AND l.inst_type_id = it.id AND l.id = "+teacherApplicationID
						+"AND s.id = se.student_id AND se.inst_type_id = l.inst_type_id";

		app.client.query(getQuery).on('row', function(row) {
			teacherApplication.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (teacherApplication.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					response.send(result);
				}
			}
		})
		.on('error', function() {
			result.status = false;
			response.send(result);
		});
	});

	app.post('/management/teacherApplications/individual/', function(request, response) {
		var applicationID = request.query.applicationID;
		var shortlist = request.query.shortlist; // true or false
		var result = {
			status: true,
		}

		if (shortlist) {
			var shortlistQuery = {
				text: "UPDATE TABLE music_school.teacher_applicants SET is_shortlisted = TRUE WHERE id = $1",
				name: "shortlist-application-query",
				values: [
					applicationID
				]
			}

			app.client.query(shortlistQuery).on('error', function() {
				result.status = false;
				response.send(result);
			})
			.on('end', function() {
				if (!response.headersSent) {
					response.send(result);
				}
			})
		} else {
			var rejectQuery = {
				text: "UPDATE TABLE music_school.teacher_applicants SET status = $1 WHERE id = $2",
				name: "reject-application-query",
				values: [
					3
					,applicationID
				]
			}

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

	app.get('/management/teacherApplications/*', function(request, response) {
	  response.render('viewTeacherApplications/index');
	});
}