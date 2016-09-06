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
			var saltedPassword = teacher.password + n;
			var hashedPassword = saltedPassword.hashCode();
			var insertValuesString = "(SELECT COALESCE((SELECT MAX(teacher_id + 1) FROM music_school.teachers), 1)), '" 
									+ teacher.firstName + "', '"
									+ teacher.middleName + "', '"
									+ teacher.lastName + "', "
									+ "to_date('"+teacher.birthday+"', 'DD MM YYYY'), '"
									+ teacher.address + "', '"
									+ teacher.phoneNumber + "', '"
									+ teacher.email + "', "
									+ "(SELECT MAX(password_id) FROM music_school.passwords), "
									+ "FALSE, "
									+ "to_date('" + d.toDateString() + "', 'Dy Mon dd YYYY'), '"
									+ teacher.description.escapeHtml() + "'";
			var passQuery = "INSERT INTO music_school.passwords(password_id, salt, password) VALUES((SELECT MAX(password_id+1) FROM music_school.passwords), " + n + ", " + hashedPassword + ");";
			var regQuery = "INSERT INTO music_school.teachers(teacher_id, first_name, middle_name, surname, dob, address, phone_no, email, password_id, is_terminated, date_employed, staff_description) SELECT "+insertValuesString+" WHERE NOT EXISTS(SELECT 1 FROM music_school.teachers WHERE email = '"+teacher.email+"');";
			var checkQuery = "SELECT teacher_id FROM music_school.teachers WHERE email = '"+teacher.email+"';";

			app.client.query(passQuery).on('error', function(err) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.dbError = true;
					isValid.dbErrorMessage = 'An error has occured. Please try again later or contact an administrator';
					response.send(valid);
				}
			});

			app.client.query(regQuery).on('error', function(err) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.dbError = true;
					isValid.dbErrorMessage = 'An error has occured. Please try again later or contact an administrator';
					response.send(valid);
				}
			});

			app.client.query(checkQuery).on('row', function(row) {
				if (!response.headersSent) {
					response.send(valid);
				}
			});

			if (!response.headersSent) {
				valid.status = false;
				isValid.dbError = true;
				isValid.dbErrorMessage = 'Email is already in use. Please enter a new email.';
				response.send(valid);
			}

			

		}
	});

	app.get('/register/teacher/*', function(request, response) {
	  response.render('teacherRegistration/index');
	});
}

String.prototype.hashCode = function() {
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