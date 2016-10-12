exports.include = (app) => {
	require('./database.js');

	app.get('/management/teacherApplications/', function(request, response) {
		response.render('viewTeacherApplications/index');
	});

	app.get('/management/teacherApplications/getTeacherApplications/', function(request, response) {

		var teacherApplicationsResult = [];
		var teacherInstrumentExperience = [];
		var teacherLanguageSkill = [];
		var result = {
			status: true,
			teacherApplications: teacherApplicationsResult,
			teacherInstrument: teacherInstrumentExperience,
			teacherLanguage: teacherLanguageSkill
		}


		var getQuery = "SELECT id, first_name as firstname, last_name as lastname, "
						//+"TO_CHAR(dob,'YYYY-MM-DD') as dob, "
						+"date_applied as dateapplied "
						+"FROM music_school.teacher_applicants "
						+"WHERE "/*+"status = 1 AND "*/+"is_approved = FALSE"; // applied and not approved

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

		var getQuery = {
			text: "SELECT first_name as firstname, last_name as lastname, email "
					+"FROM music_school.teacher_applicants "
					+"WHERE id = $1",
			name: "get-individual-teacher-application",
			values: [
				teacherApplicationID
			]
		}

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

	app.post('/management/teacherApplications/individual/shortlist/', function(request,response) {
		var applicationID = request.query.applicationID;
		var result = {
			status: true,
		}

		var shortlistQuery = {
			text: "UPDATE TABLE music_school.teacher_applicants SET is_shortlisted = $1, status = $2 WHERE id = $3",
			name: "shortlist-application-query",
			values: [
				TRUE
				,1
				,applicationID
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
	});

	app.post('/management/teacherApplications/individual/reject/', function(request, response) {
		var applicationID = request.query.applicationID;
		var result = {
			status: true,
		}

		var rejectQuery = {
			text: "UPDATE TABLE music_school.teacher_applicants SET status = $1, is_shortlisted = $2 WHERE id = $3",
			name: "reject-application-query",
			values: [
				3
				,FALSE
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
	});

	app.get('/management/teacherApplications/*', function(request, response) {
	  response.render('viewTeacherApplications/index');
	});
}