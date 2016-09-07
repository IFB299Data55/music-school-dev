exports.include = (app) => {
	require('./database.js');

	app.get('/register/student/', function(request, response) {
	  response.render('studentRegistration/index');
	});

	app.post('/register/student/', function(request, response) {
		//DATABASE CONNECTION
		var student = request.body;
		var isValid = {
			firstName:true,
			middleName:true,
			lastName:true,
			birthday:true,
			address:true,
			phoneNumber:true,
			email:true,
			password:true,
			errorMessage: ''
		};
		var valid = {
			status:false,
			errorArray:isValid
		};

		if (validateAll(student, isValid)) {
			valid.status = true;
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}

		if(valid.status) {
			var d = new Date();
			var n = d.getTime();

			var saltedPassword = student.password + n;
			var hashedPassword = saltedPassword.hashCode();
			var insertValuesString = "(SELECT COALESCE((SELECT MAX(student_id + 1) FROM music_school.students), 1)), '" 
									+ student.firstName + "', '"
									+ student.middleName + "', '"
									+ student.lastName + "', "
									+ "to_date('"+student.birthday+"', 'DD MM YYYY'), '"
									+ student.address + "', '"
									+ student.phoneNumber + "', '"
									+ student.email + "', "
									+ "(SELECT MAX(password_id) FROM music_school.passwords), "
									+ "FALSE, "
									+ "to_date('" + d.toDateString() + "', 'Dy Mon dd YYYY')";
			var checkQuery = "SELECT 1 FROM music_school.students WHERE email = '"+student.email+"';";
			var passQuery = "INSERT INTO music_school.passwords(password_id, salt, password) VALUES((SELECT MAX(password_id+1) FROM music_school.passwords), " + n + ", " + hashedPassword + ");";
			var regQuery = "INSERT INTO music_school.students(student_id, first_name, middle_name, surname, dob, address, phone_no, email, password_id, is_dormant, date_registered) SELECT "+insertValuesString
							+ " WHERE NOT EXISTS(SELECT 1 FROM music_school.students WHERE email = '" + student.email + "');";
			app.client.query(checkQuery).on('row', function(row) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.errorMessage = 'Email is already in use. Please enter a new email.';
					response.send(valid);
				}
			})
			.on('end', function(){
				app.client.query(passQuery).on('error', function(err) {
					if (!response.headersSent) {
						valid.status = false;
						isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
						response.send(valid);
					}
				})
				.on('end', function() {
					app.client.query(regQuery).on('error', function(err) {
						if (!response.headersSent) {
							valid.status = false;
							isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
							response.send(valid);
						}
					})
					.on('end', function() {
						if (!response.headersSent) {
							response.send(valid);
						}
					});
				});
			});

			

			

			

			
			//response.send('Student Registered');
			//response.sendStatus('500');
		}
	});

	app.get('/register/student/*', function(request, response) {
	  response.render('studentRegistration/index');
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

function validateAll(student, isValid) {
	if (validateFirstName(student.firstName, isValid) &&
		validateMiddleName(student.middleName, isValid) &&
		validateLastName(student.lastName, isValid) &&
		validateBirthday(student.birthday, isValid) &&
		validateAddress(student.address, isValid) &&
		validatePhoneNumber(student.phoneNumber, isValid) &&
		validateEmail(student.email, isValid) &&
		validatePassword(student.password, isValid)) {
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
	var regexp1 = "^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$";
	var regexp2 = "^[0-9]{2}-[0-9]{2}-[0-9]{4}$";
	var days, months, years;
	//if (regexp1.test(birthday)) {
	if (birthday.match(regexp1)) {
		var days = parseInt(birthday.split('/')[0]);
		var months = parseInt(birthday.split('/')[1]);
		var years = parseInt(birthday.split('/')[2]);
	//} else if (regexp2.test(birthday)) {
	} else if (birthday.match(regexp2)) {
		var days = parseInt(birthday.split('-')[0]);
		var months = parseInt(birthday.split('-')[1]);
		var years = parseInt(birthday.split('-')[2]);
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
	var regexp = new RegExp("^[A-Za-z0-9, ]+$");
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

function validatePassword(password, isValid) {
	var regexp = new RegExp("^.{6,}$");
	if (regexp.test(password)) {
		return true;
	}
	isValid.password = false;
	return false;
}
/* DATABASE STUFF

var query = client.query("SELECT * FROM junk");
//fired after last row is emitted

query.on('row', function(row) {
    console.log(row);
});

query.on('end', function() {
    client.end();
});



//queries can be executed either via text/parameter values passed as individual arguments
//or by passing an options object containing text, (optional) parameter values, and (optional) query name
client.query({
    name: 'insert beatle',
    text: "INSERT INTO beatles(name, height, birthday) values($1, $2, $3)",
    values: ['George', 70, new Date(1946, 02, 14)]
});

//subsequent queries with the same name will be executed without re-parsing the query plan by postgres
client.query({
    name: 'insert beatle',
    values: ['Paul', 63, new Date(1945, 04, 03)]
});
var query = client.query("SELECT * FROM beatles WHERE name = $1", ['john']);

//can stream row results back 1 at a time
query.on('row', function(row) {
    console.log(row);
    console.log("Beatle name: %s", row.name); //Beatle name: John
    console.log("Beatle birth year: %d", row.birthday.getYear()); //dates are returned as javascript dates
    console.log("Beatle height: %d' %d\"", Math.floor(row.height / 12), row.height % 12); //integers are returned as javascript ints
});

//fired after last row is emitted
query.on('end', function() {
    client.end();
});

*/