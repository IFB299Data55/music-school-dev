exports.include = (app) => {
	require('./database.js');

	app.get('/register/teacher/', function(request, response) {
	  response.render('teacherRegistration/index');
	});

	app.post('/register/teacher/', function(request, response) {
		// DATABASE CONNECTION
		
		var teacher = request.body;

		var isValid = {
			firstName:true,
			middleName:true,
			lastName:true,
			birthday:true,
			address:true,
			phoneNumber:true,
			email:true,
			dbError:false,
			dbErrorMessage:''
		};
		var valid = {
			status:false,
			errorArray:isValid
		};
		
		if (validateAll(teacher, isValid)) {
			valid.status = true;
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}

		if(valid.status) {
			var d = new Date();
			var n = d.getTime();

			teacher.password = "test";
			var saltedPassword = teacher.password + 'teacher'.HashCode() + n;
			var hashedPassword = saltedPassword.HashCode();

			var checkEmail = {
				text: "SELECT 1 FROM music_school.teachers WHERE email = $1",
				name: "check-teacher-email",
				values: [teacher.email]
			};

			var passwordCols = "salt, password"
			var newTeacherPasswordQuery = {
				text: "INSERT INTO music_school.passwords("+passwordCols+") VALUES("
					 	+"$1,$2"
					 +")",
				name: "create-new-teacher-password",
				values: [	
					  n
					, hashedPassword
				]
			};

			var teacherCols = "first_name, middle_name, last_name, dob, address, phone_no, email, password_id, is_terminated, date_employed, staff_description"
			var newTeacherQuery = {
				text: "INSERT INTO music_school.teachers("+teacherCols+") VALUES("
						+"$1,$2,$3,"
						+"to_date($4, 'DD MM YYYY'),$5,$6,$7,"
						+"(SELECT MAX(id) FROM music_school.passwords),"
						+"FALSE,"
						+"now(),$8"
					 +")",
				name: "create-new-teacher",
				values: [
					  teacher.firstName
					, teacher.middleName
					, teacher.lastName
					, teacher.birthday
					, teacher.address
					, teacher.phoneNumber
					, teacher.email
					, teacher.description.escapeHtml()
				]
			};

			app.client.query(checkEmail).on('row', function(row) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.dbError = true;
					isValid.dbErrorMessage = 'Email is already in use. Please enter a new email.';
					response.send(valid);
				}
			})
			.on('end', function(){
				app.client.query(newTeacherPasswordQuery).on('error', function(err) {
					if (!response.headersSent) {
						valid.status = false;
						isValid.dbError = true;
						isValid.dbErrorMessage = 'An error has occured. Please try again later or contact an administrator';
						response.send(valid);
						console.log("Error occured in TchrReg: ", err);
					}
				})
				.on('end', function(){
					app.client.query(newTeacherQuery).on('error', function(err) {
						if (!response.headersSent) {
							valid.status = false;
							isValid.dbError = true;
							isValid.dbErrorMessage = 'An error has occured. Please try again later or contact an administrator';
							response.send(valid);
							console.log("Error occured in TchrReg: ", err);
						}
					})
					.on('end', function(){
						if (!response.headersSent) {
							response.send(valid);
						}
					});
				});
			});
		}
	});

	app.get('/register/teacher/*', function(request, response) {
	  response.render('teacherRegistration/index');
	});
}

String.prototype.HashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

String.prototype.escapeHtml = function() {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return this.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function validateAll(teacher, isValid) {
	if (validateFirstName(teacher.firstName, isValid) &&
		validateMiddleName(teacher.middleName, isValid) &&
		validateLastName(teacher.lastName, isValid) &&
		validateBirthday(teacher.birthday, isValid) &&
		validateAddress(teacher.address, isValid) &&
		validatePhoneNumber(teacher.phoneNumber, isValid) &&
		validateEmail(teacher.email, isValid)) {
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

function validateAddress(address, isValid) {
	var regexp = new RegExp("^[A-Za-z0-9\-,/. ]+$");
	if (regexp.test(address)) {
		return true;
	}
	isValid.address = false;
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

function validateEmail(email, isValid) {
	var regexp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$|^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}\.[a-z]{2,3}$");
	if (regexp.test(email)) {
		return true;
	}
	isValid.email = false;
	return false;
}