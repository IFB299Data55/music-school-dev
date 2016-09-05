exports.include = (app) => {
	require('./database.js');

	app.get('/register/student/', function(request, response) {
	  response.render('studentRegistration/index');
	});

	app.post('/register/student/', function(request, response) {
		//DATABASE CONNECTION
		var student = request.body;
		var d = new Date();
		var n = d.getTime();

		var saltedPassword = student.password + n;
		var hashedPassword = saltedPassword.hashCode();
		var insertValuesString = "(SELECT MAX(student_id + 1) FROM music_school.students), '" 
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
		var passQuery = "INSERT INTO music_school.passwords(password_id, salt, password) VALUES((SELECT MAX(password_id+1) FROM music_school.passwords), " + n + ", " + hashedPassword + ");"
		app.client.query(passQuery);
		var regQuery = "INSERT INTO music_school.students(student_id, first_name, middle_name, surname, dob, address, phone_no, email, password_id, is_dormant, date_registered) VALUES("+insertValuesString+");";
		app.client.query(regQuery);

		//response.send('Student Registered');
		response.sendStatus('201');
		//response.sendStatus('500');
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