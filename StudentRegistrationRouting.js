exports.include = (app) => {
	require('./database.js');

	app.get('/register/student/', function(request, response) {
	  response.render('studentRegistration/index');
	});

	app.post('/register/student/', function(request, response) {
		/* DATABASE CONNECTION
		app.client.query("SELECT * FROM test;")
		.on('row', function(row) {
		    console.log(row);
		});
		*/
		var student = request.body;
		//response.send('Student Registered');
		response.sendStatus('201');
		//response.sendStatus('500');
	});

	app.get('/register/student/*', function(request, response) {
	  response.render('studentRegistration/index');
	});
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