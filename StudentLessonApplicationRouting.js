exports.include = (app) => {
	require('./database.js');

	app.get('/lessons/application/', function(request, response) {
	  response.render('lessonApplication/index');
	});

	app.post('/lessons/application/', function(request, response) {
		// DATABASE CONNECTION
		/*app.client.query("SELECT * FROM test;")
		.on('row', function(row) {
		    console.log(row);
		});*/

		validateInstId = false;
		var lesson = request.body;
		console.log(lesson);
		var isValid = {
			instrumentType: true,
            hireType: true,
            studentId: true,
            instrumentId: true,
            day: true,
            startTime: true,
            endTime: true,
            errorMessage:''
		};
		var valid = {
			status:false,
			errorArray:isValid
		};

		if (validateAll(lesson, isValid)) {
			valid.status = true;
			if(!validateInstId) lesson.instrumentId = '';
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}

		if(valid.status) {
			var d = new Date();

			var databaseStartTimeString = TurnIntoDBTime(lesson.startTime);
			var databaseEndTimeString = TurnIntoDBTime(lesson.endTime);

			var columns = "lesson_id, inst_type_id, teacher_id, student_id, room_no, lessons_start_time, lesson_end_time, lesson_day, lesson_start_date, lesson_fee"
			var insertValuesString = "(SELECT COALESCE((SELECT MAX(lesson_id + 1) FROM music_school.lessons), 1)), " 
									+ lesson.instrumentType + ", "
									+ "1, "
									+ lesson.studentId + ", "
									+ "1, '"
									+ databaseStartTimeString+"', '"
									+ databaseEndTimeString+"', '"
									+ lesson.day + "', "
									+ "now(), "
									+ "30";
			var regQuery = "INSERT INTO music_school.lessons ("+columns+") SELECT " + insertValuesString +";";
			app.client.query(regQuery).on('error', function(err) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
					console.log("Errors Happened", err);
					response.send(valid);
				}
			}).on('end', function() {
				if (!response.headersSent) {
					response.send(valid);
				}
			});
		} else if (!response.headersSent) {
			console.log("Errors Happened");
			response.send(valid);
		}
		//response.send('Student Registered');
		//response.sendStatus('500');
	});

	app.get('/lessons/application/*', function(request, response) {
	  response.render('lessonApplication/index');
	});
}

var validateInstId = false;

function TurnIntoDBTime(startTime) {
	if (startTime < 10)
		return ("0" + startTime.toString() + ":00");
	else
		return (startTime.toString() + ":00");

}

function validateAll(lesson, isValid) {
	if (validateInstrumentType(lesson.instrumentType, isValid) &&
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

function validateInstrumentType(instrumentType, isValid) {
	var regexp = new RegExp("^[0-9]+$");
	if (regexp.test(instrumentType)) {
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
	var regexp = new RegExp("^[0-9]+$");
	if (regexp.test(studentId)) {
		return true;
	}
	isValid.instrumentId = false;
	return false;
}

function validateInstrumentId(instrumentId, isValid) {
	if(!validateInstId) return true;
	var regexp = new RegExp("^[0-9]+$");
	if (regexp.test(instrumentId)) {
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