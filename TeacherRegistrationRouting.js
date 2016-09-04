exports.include = (app) => {
	require('./database.js');

	app.get('/register/teacher/', function(request, response) {
	  response.render('teacherRegistration/index');
	});

	app.post('/register/teacher/', function(request, response) {
		/* DATABASE CONNECTION
		app.client.query("SELECT * FROM test;")
		.on('row', function(row) {
		    console.log(row);
		});
		*/
		var teacher = request.body;
		var isValid = {
			firstName:true,
			middleName:true,
			lastName:true,
			birthday:true,
			address:true,
			phoneNumber:true,
			email:true,
		};
		var valid = {
			status:false,
			errorArray:isValid
		};
		console.log(teacher);
		if (validateAll(teacher, isValid)) {
			valid.status = true;
			valid.errorArray = null;
			response.send(valid);
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}
	});

	app.get('/register/teacher/*', function(request, response) {
	  response.render('teacherRegistration/index');
	});
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