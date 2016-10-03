/* Routing for Teacher Application */
exports.include = (app) => {
	require('./database.js');

	/* Display Page */
	app.get('/apply/teacher/', function(request, response) {
	  response.render('teacherApplication/index');
	});

	/* Teacher Application */
	app.post('/apply/teacher/', function(request, response) {
		// Get Post Data
		var teacherApplication = request.body;

		//Set up error array
		var isValid = {
			firstName:true,
			middleName:true,
			lastName:true,
			birthday:true,
			phoneNumber:true,
			coverLetter:true,
			reference1name:true,
			reference1number:true,
			reference2name:true,
			reference2number:true,
			reference3name:true,
			reference3number:true,
			hours:true,
			email:true,
			dbError:false,
			dbErrorMessage:''
		};

		//Set up response
		var valid = {
			status:false,
			errorArray:isValid
		};
		
		//Run validation
		if (validateAll(teacherApplication, isValid)) {
			valid.status = true;
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}

		if(valid.status) {
			console.log('response');
			response.send(valid);

			var teacherApplicantsCols = "first_name, middle_name, last_name, dob, phone_no, email, coverletter, date_applied, status, is_short_listed, is_approved"
			var newTeacherApplicantQuery = {
				text: "INSERT INTO music_school.teacher_applicants("+teacherApplicantsCols+") VALUES("
						+"$1,$2,$3,"
						+"to_date($4, 'DD MM YYYY'),$5,$6,$7,now(),"
						+"1,FALSE,FALSE"
					 +")",
				name: "create-new-teacher-applicant",
				values: [
					  teacherApplication.firstName
					, teacherApplication.middleName
					, teacherApplication.lastName
					, teacherApplication.birthday
					, teacherApplication.phoneNumber
					, teacherApplication.email
					, teacherApplication.coverLetter
				]
			};

			//Run Queries
			/*app.client.query(newTeacherApplicantQuery)
			.on('error', function(err) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.dbError = true;
					isValid.dbErrorMessage = 'An error has occured. Please try again later or contact an administrator';
					response.send(valid);
					console.log("Error occured in TeacherApplication: ", err);
				}
			})
			.on('end', function() {
				if (!response.headersSent) {
					//Send Email
					var textMessage = "Dear " + teacher.firstName + " " + teacher.lastName + ", "
								 +"\n\nYou have been registered as a teacher for the School of Music."
								 +"\nYour Temprary password is: '" + teacher.password +"'."
								 +"\nWe hope you enjoy your employment with us."
								 +"\n\nRegards,"
								 +"\nSchool of Music Team";

					var htmlMessage = textMessage.replace(new RegExp("^"), '<p>')
												 .replace(new RegExp("$"), '</p>')
												 .replace(new RegExp("\n\n","g"), '</p><br/><p>')
												 .replace(new RegExp("\n","g"), '</p><p>');

					var teacherConfirmationEmail = {
						from: '"School of Music Admin" <test@gmail.com>',
						to: teacher.email,
						subject: "New Teacher Account",
						text: textMessage,
						html: htmlMessage
					};

					app.transporter.sendMail(teacherConfirmationEmail, function(error, info) {
						if(error) {
							console.log(error);
						}
					});

					response.send(valid);
				}
			});*/
		}
	});

	app.get('/apply/teacher/*', function(request, response) {
	  response.render('teacherApplication/index');
	});
}

function validateAll(teacherApplication, isValid) {
	if (validateFirstName(teacherApplication.firstName, isValid) &&
		validateMiddleName(teacherApplication.middleName, isValid) &&
		validateLastName(teacherApplication.lastName, isValid) &&
		validateBirthday(teacherApplication.birthday, isValid) &&
		validatePhoneNumber(teacherApplication.phoneNumber, isValid) &&
		validateCoverLetter(teacherApplication.coverLetter, isValid) &&
		validateInstruments(teacherApplication.instruments, isValid) &&
		validateReferences(teacherApplication, isValid) &&
		validateHours(teacherApplication.hours, isValid) &&
		validateEmail(teacherApplication.email, isValid)) {
		return true;
	} else {
		return false;
	}
}

function validateFirstName(firstName, isValid) {
	var regexp = new RegExp("^[A-Za-z ]+$");
	if (regexp.test(firstName)) {
		return true;
	}
	isValid.firstName = false;
	return false;
}

function validateMiddleName(middleName, isValid) {
	var regexp = new RegExp("^[A-Za-z ]*$");
	if (regexp.test(middleName)) {
		return true;
	}
	isValid.middleName = false;
	return false;
}

function validateLastName(lastName, isValid) {
	var regexp = new RegExp("^[A-Za-z ]+$");
	if (regexp.test(lastName)) {
		return true;
	}
	isValid.lastName = false;
	return false;
}

function validateBirthday(birthday, isValid) {
	var regexp1 = new RegExp("^([0-9]){2}\/([0-9]){2}\/([0-9]){4}$");
	var regexp2 = new RegExp("^([0-9]]){2}-([0-9]){2}-([0-9]){4}$");
	var days, months, years;
	if (regexp1.test(birthday)) {
		days = parseInt(birthday.split('/')[0]);
		months = parseInt(birthday.split('/')[1]);
		years = parseInt(birthday.split('/')[2]);
	} else if (regexp2.test(birthday)) {
		days = parseInt(birthday.split('-')[0]);
		months = parseInt(birthday.split('-')[1]);
		years = parseInt(birthday.split('-')[2]);
	}
	if (days && months && years) {
		if (days > 0 && days < 32 &&
			months > 0 && months < 13 &&
			years > 1900 && years < 2016) {
			return true;
		}
	}
	isValid.birthday = false;
	return false;
}

function validatePhoneNumber(phoneNumber, isValid) {
	var regexp = new RegExp("^[0-9]{8}$|^04[0-9]{8}$");
	if (regexp.test(phoneNumber)) {
		return true;
	}
	isValid.phoneNumber = false;
	return false;
}

function validateCoverLetter(coverLetter, isValid) {
	var regexp = new RegExp("^[A-Za-z0-9 ._%+-]+$");
	if (regexp.test(coverLetter)) {
		return true;
	}
	isValid.coverLetter = false;
	return false;
}

function validateInstruments(instruments, isValid) {
	var regexp = new RegExp("^([A-Za-z ]+,[ ]?[0-9];)+$");
	if (regexp.test(instruments)) {
		return true;
	}
	isValid.instruments = false;
	return false;
}

function validateReferences(teacherApplication, isValid) {
	var valid = true;
	if (!validateReferenceName(teacherApplication.reference1name)) {
		isValid.reference1name = false;
		valid = false;
	}
	if (!validateReferenceNumber(teacherApplication.reference1number)) {
		isValid.reference1number = false;
		valid = false;
	}
	if (teacherApplication.reference2name != '' && teacherApplication.reference2number != '') {
		if (!validateReferenceName(teacherApplication.reference2name)) {
			isValid.reference2name = false;
			valid = false;
		}
		if (!validateReferenceNumber(teacherApplication.reference2number)) {
			isValid.reference2number = false;
			valid = false;
		}
	}
	if (teacherApplication.reference3name != '' && teacherApplication.reference3number != '') {
		if (!validateReferenceName(teacherApplication.reference3name)) {
			isValid.reference3name = false;
			valid = false;
		}
		if (!validateReferenceNumber(teacherApplication.reference3number)) {
			isValid.reference3number = false;
			valid = false;
		}
	}
	return valid;
}

function validateHours(hours, isValid) {
	var regexp = new RegExp("^[0-9]+$");
	if (regexp.test(hours)) {
		return true;
	}
	isValid.hours = false;
	return false;
}

function validateEmail(email, isValid) {
	var regexp = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}\.[A-Za-z]{2,3}$");
	if (regexp.test(email)) {
		return true;
	}
	isValid.email = false;
	return false;
}

function validateReferenceName(name) {
	var regexpName = new RegExp("^[A-Za-z ]+$");
	if (regexpName.test(name)) {
		return true;
	} else {
		return false;
	}
}

function validateReferenceNumber(number) {
	var regexpNumber = new RegExp("^[0-9]{8}$|^04[0-9]{8}$");
	if (regexpNumber.test(number)) {
		return true;
	} else {
		return false;
	}
}