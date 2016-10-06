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

	app.post('/management/teacherApplications/individual/', function(request, response) {
		var applicationID = request.query.applicationID;
		var shortlist = request.query.shortlist; // true or false
		var result = {
			status: true,
		}

		if (shortlist) {
			var shortlistQuery = "UPDATE TABLE music_school.teacher_applicants SET is_shortlisted = TRUE WHERE id = ?";
			// param: applicationID

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
			var rejectQuery = "";

			// change request status to be whatever rejected is
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