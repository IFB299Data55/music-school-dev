/* Routing for Student Lesson Applications */
exports.include = (app) => {
	require('./database.js');

	/* Display Page */
	app.get('/lessons/application/', function(request, response) {
	  response.render('lessonApplication/index');
	});

	/* Check if Current Student Is Allowed To Register a Lesson */
	app.post('/lessons/application/checkStudent', function(request, response) {
		var student = request.body;

		//Setup response
		var res = {
			valid: false
		};

		//Validate
		if(validNumber(student.id)) {
			//Setup Query
			var checkStudentIdQuery = {
				text: "SELECT * FROM music_school.students_allowed_applications saa "
					 +"WHERE saa.id = $1",
				name: 'check-student-id',
				values: [
					  student.id
				]
			};

			//Run Query
			app.client.query(checkStudentIdQuery) 
			.on('error', function(err) {
				/* Error Handling */
				if (!response.headersSent) {
					res.valid = false;
					console.log("Errors Happened in stntIdChk 1: ", err);
					response.send(valid);
				}
			})
			.on('row', function(row) {
				/* Student Was there */
				if (!response.headersSent) {
					res.valid = true;
					response.send(res);
				}
			})
			.on('end', function() {
				/* Student wasn't there */
				if (!response.headersSent) {
					response.send(res);
				}
			});
		} else {
			response.send(res);
		}
	});

	/* Register Lesson */
	app.post('/lessons/application/', function(request, response) {
		validateInstId = false;
		var lesson = request.body;

		/* Setup error Array */
		var isValid = {
			instrumentType: true,
            hireType: true,
            grade: true,
            studentId: true,
            instrumentId: true,
            day: true,
            startTime: true,
            endTime: true,
            errorMessage:''
		};

		/* Setup response frame */
		var valid = {
			status:false,
			errorArray:isValid
		};

		/* Run validation */
		if (validateAll(lesson, isValid)) {
			valid.status = true;
			if(!validateInstId) lesson.instrumentId = '';
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}

		/* If is valid */
		if(valid.status) {
			/* Convert inputs into Database structure */
			var d = new Date();

			var databaseStartTimeString = TurnIntoDBTime(lesson.startTime);
			var databaseEndTimeString = TurnIntoDBTime(lesson.endTime);

			/* Setup queries */
			var lessonColumns = "student_id, inst_type_id, " + /*teacher_id, + */"request_date, request_status_id, lesson_start_time, lesson_end_time, lesson_day, lesson_year, lesson_term, lesson_fee";
			var newLessonQuery = {
				text: "INSERT INTO music_school.lessons("+lessonColumns+") VALUES("
					+"$1,$2,now(),1,$3,$4,$5,$6,$7,$8"
				+")",
				name: 'apply-for-lesson',
				values: [
					  lesson.studentId
					, lesson.instrumentType
					//, 1
					, databaseStartTimeString
					, databaseEndTimeString
					, lesson.day
					, 2016
					, 1
					, 30
				]
			};

			var experienceColumns = "student_id, inst_type_id, grade";
			var newExperienceQuery = {
				text: "INSERT INTO music_school.student_experience("+experienceColumns+") VALUES("
					+"$1,$2,$3"
				+") ON CONFLICT (student_id, inst_type_id) DO UPDATE SET grade = $3",
				name: 'log-experience-lesson',
				values: [
					  lesson.studentId
					, lesson.instrumentType
					, lesson.grade
				]
			};

			var instrumentHireColumns = "instrument_id, student_id, request_date, hire_status_id, is_returned";
			var instrumentHireQuery = {
				text: "INSERT INTO music_school.instrument_hire("+instrumentHireColumns+") VALUES("
					+"$1,$2,now(),$3,$4"
				+")",
				name: 'instrument-hire-request',
				values: [
					  lesson.instrumentId
					, lesson.studentId
					, 1
					, false
				]
			};

			/* Run queries */
			app.client.query(newLessonQuery) //Run First Query
			.on('error', function(err) {
				/* Error Handling */
				if (!response.headersSent) {
					valid.status = false;
					isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
					console.log("Errors Happened in StdntLsnAppRting 1: ", err);
					response.send(valid);
				}
			}).on('end', function() {
				app.client.query(newExperienceQuery) //Run Second Query
				.on('error', function(err) {
					/* Error Handling */
					if (!response.headersSent) {
						valid.status = false;
						isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
						console.log("Errors Happened in StdntLsnAppRting 2: ", err);
						response.send(valid);
					}
				}).on('end', function() {
					app.client.query(instrumentHireQuery) //Run Third Query
					.on('error', function(err) {
						/* Error Handling */
						if (!response.headersSent) {
							valid.status = false;
							isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
							console.log("Errors Happened in StdntLsnAppRting 3: ", err);
							response.send(valid);
						}
					}).on('end', function() {
						/* All queries ran: lesson registered */
						if (!response.headersSent) {
							response.send(valid);
						}
					});
				});
			});
		} else if (!response.headersSent) {
			/* Error Handling */
			console.log("Invalid data in StdntLsnAppRting 4:", request.body);
			response.send(valid);
		}
	});

	app.get('/lessons/application/*', function(request, response) {
	  response.render('lessonApplication/index');
	});
}

/* Validation Functions */
var validateInstId = false;

function TurnIntoDBTime(startTime) {
	if (startTime < 10)
		return ("0" + startTime.toString() + ":00");
	else
		return (startTime.toString() + ":00");

}

function validateAll(lesson, isValid) {
	if (validateInstrumentType(lesson.instrumentType, isValid) &&
		validateGrade(lesson.grade, isValid) &&
		validateHireType(lesson.hireType, isValid) &&
		validateStudentId(lesson.studentId, isValid) &&
		validateInstrumentId(lesson.instrumentId, isValid) &&
		validateDay(lesson.day, isValid) &&
		validateStartTime(lesson.startTime, isValid) &&
		validateEndTime(lesson.endTime, isValid)) {
		return true;
	} else {
		return false;
	}
}

function validateGrade(grade, isValid) {
	var regexp = new RegExp("^[0-7]$");
	if (regexp.test(grade)) {
		return true;
	}
	isValid.instrumentType = false;
	return false;
}

function validateInstrumentType(instrumentType, isValid) {
	if (validNumber(instrumentType)) {
		return true;
	}
	isValid.instrumentType = false;
	return false;
}

function validateHireType(hireType, isValid) {
	var regexpBYO = new RegExp("^BYO$");
	var regexpHire = new RegExp("^Hire$");
	if (regexpBYO.test(hireType)) {
		return true;
	} if (regexpHire.test(hireType)) {
		validateInstId = true;
		return true;
	}
	isValid.hireType = false;
	return false;
}

function validateStudentId(studentId, isValid) {
	if (validNumber(studentId)) {
		return true;
	}
	isValid.instrumentId = false;
	return false;
}

function validateInstrumentId(instrumentId, isValid) {
	if(!validateInstId) return true;

	if (validNumber(instrumentId)) {
		return true;
	}
	isValid.instrumentId = false;
	return false;
}

function validateDay(day, isValid) {
	var regexp = new RegExp("^Mon$|^Tue$|^Wed$|^Thu$|^Fri$");
	if (regexp.test(day)) {
		return true;
	}
	isValid.day = false;
	return false;
}

function validateStartTime(startTime, isValid) {
	var regexp = new RegExp("^[6-9]$|^1[0-8]$");
	if (regexp.test(startTime)) {
		return true;
	}
	isValid.startTime = false;
	return false;
}

function validateEndTime(endTime, isValid) {
	var regexp = new RegExp("^[7-9]$|^1[0-9]$");
	if (regexp.test(endTime)) {
		return true;
	}
	isValid.endTime = false;
	return false;
}

function validNumber(number) {
	var regexp = new RegExp("^[0-9]+$");
	if(regexp.test(number)) return true;
	return false;
}