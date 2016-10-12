/* Manages Instrument Return Routing */
exports.include = (app) => {
	require('./database.js');

	/* Display Page */
	app.get('/teacher/timetable/', function(request, response) {
		response.render('teacherTimetable/index');
	});

	app.get('/teacher/timetable/getLessons/', function(request, response) {

		var teacherID = request.query.id;

		var res = {
			valid: true,
			error: '',
			lessons: []
		}

		if (!teacherID) {
			res.valid = false;
			res.error = 'You are not logged in properly.';
			response.send(res);
			return;
		}

		var getLessonsQuery = {
			text: "SELECT l.id, "
					    +"s.first_name, "
					    +"s.last_name, "
					    +"it.name as instrument_type, "
					    +"se.grade as student_grade, "
					    +"l.lesson_day, "
					    +"l.lesson_start_time as start_time, "
					    +"l.lesson_end_time as end_time "
				 +"FROM music_school.lessons l, "
				 	  +"music_school.students s,  "
				 	  +"music_school.instrument_types it,  "
				 	  +"music_school.student_experience se "
				 +"WHERE l.student_id = s.id "
				   +"AND l.student_id = se.student_id "
				   +"AND l.inst_type_id = it.id "
				   +"AND l.teacher_id = $1 "
				   +"AND l.request_status_id = 2",
			name: "get-teacher-lessons",
			values: [
				teacherID
			]
		}

		app.client.query(getLessonsQuery)
		.on('error', function(err) {
			res.valid = false;
			res.error = 'An error has occured. Please contact an administrator.';
			response.send(res);
			console.log('Error in TeacherTimetablesRouting : getLessons : getLessonsQuery');
			console.log(getLessonsQuery);
			console.log(err);
		})
		.on('row', function(row) {
			res.lessons.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (res.lessons.length > 0) {
					response.send(res);
				} else {
					res.valid = false;
					res.error = 'You have no lessons.'
					response.send(res);
				}
			}
		});
	});

	app.get('/teacher/timetable/*', function(request, response) {
	  response.render('teacherTimetable/index');
	});
}