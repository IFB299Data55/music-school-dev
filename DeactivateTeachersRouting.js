exports.include = (app) => {
	require('./database.js');

	app.get('/management/teachers/', function(request, response) {
		response.render('deactivateTeachers/index');
	});

	app.post('/management/teachers/individual/deactivate/', function(request, response) {
		var teacherID = request.body.teacherID;
		var result = {
			status: true,
		}

		if (!teacherID) {
			teacherID = 1;
		}

		var deactivateQuery = "UPDATE music_school.teachers SET date_terminated = NOW(), is_terminated = TRUE WHERE id = "+teacherID+";";

		app.client.query(deactivateQuery).on('error', function(err) {
			result.status = false;
			response.send(result);
		})
		.on('end', function() {
			if (!response.headersSent) {
				response.send(result);
			}
		})
	});

	app.get('/management/teachers/individual/', function(request, response) {
		var teacherID = request.query.id;
		var teacher = [];
		var result = {
			status: true,
			teacher: teacher
		}

		var getQuery = "SELECT id, first_name as firstname, last_name as lastname, TO_CHAR(dob,'YYYY-MM-DD') as dob, email as email, "
						+"address as address, phone_no as phone, TO_CHAR(date_employed,'YYYY-MM-DD') as dateemployed "
						+"FROM music_school.teachers WHERE id="+teacherID+";";

		app.client.query(getQuery).on('row', function(row) {
			teacher.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (teacher.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					response.send(result);
				}
			}
		})
		.on('error', function(err) {
			result.status = false;
			response.send(result);
		});
	});

	app.get('/management/teachers/all/', function(request, response) {
		var teachersResult = [];
		var result = {
			status: true,
			teachers: teachersResult
		}

		var getQuery = "SELECT id, first_name as firstname, last_name as lastname, TO_CHAR(dob,'YYYY-MM-DD') as dob, email as email, "
						+"address as address, phone_no as phone, TO_CHAR(date_employed,'YYYY-MM-DD') as dateemployed "
						+"FROM music_school.teachers WHERE is_terminated = FALSE;";

		app.client.query(getQuery).on('row', function(row) {
			teachersResult.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (teachersResult.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					response.send(result);
				}
			}
		});
	});

	app.get('/management/teachers/*', function(request, response) {
	  response.render('deactivateTeachers/index');
	});
}