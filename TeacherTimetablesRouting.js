/* Manages Instrument Return Routing */
exports.include = (app) => {
	require('./database.js');

	/* Display Page */
	app.get('/teacher/timetable/', function(request, response) {
		response.render('teacherTimetable/index');
	});

	app.get('/teacher/timetable/getLessons/', function(request, response) {

		var res = {
			valid: true,
			error: '',
			lessons: []
		}

		if (!teacherID) {
			res.valid = false;
			res.error = 'You are not logged in properly.';
			response.send(res);
		}

		/*
		SELECT l.id,
			   s.first_name,
			   s.last_name,
			   it.name as instrument_type,
			   se.grade as student_grade,
			   l.lesson_day,
			   l.lesson_start_time as start_time,
			   l.lesson_end_time as end_time
		FROM music_school.lessons l,
		 	 music_school.students s, 
		 	 music_school.instrument_types it, 
		 	 music_school.student_experience se
		WHERE l.student_id = s.id
		  AND l.student_id = se.student_id
		  AND l.inst_type_id = it.id
		  AND l.teacher_id = $1
		  AND l.request_status_id = 2 /* I Think? *//*
		*/


		var getQuery = "SELECT l.id as requestid, s.first_name as firstname, s.last_name as lastname, "
						+"TO_CHAR(s.dob,'YYYY-MM-DD') as dob, it.name as instrument, se.grade as grade "
						+"FROM music_school.lessons l, music_school.students s, "
						+"music_school.instrument_types it, music_school.student_experience se "
						+"WHERE l.student_id = s.id AND l.inst_type_id = it.id "
						+"AND (l.teacher_id = "+teacherID+" OR l.teacher_id IS NULL) "
						+"AND (l.request_status_id IS NULL OR l.request_status_id = 1) "
						+"AND l.id NOT IN (SELECT lesson_id FROM music_school.lesson_rejections WHERE teacher_id="+teacherID+") "
						+"AND s.id = se.student_id AND se.inst_type_id = l.inst_type_id;";
		var getLessonsQuery = {
			text: "",
			name: "get-teacher-lessons"
			values: [

			]
		}

		app.client.query(getQuery).on('row', function(row) {
			res.lessons.push(row);
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

	app.get('/teacher/timetable/*', function(request, response) {
	  response.render('teacherTimetable/index');
	});
}