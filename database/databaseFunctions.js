exports.include = (app) => {
	require('../database.js');
	app.post('/database/checkAvailability/', function(request, response) {
		/* DATABASE CONNECTION
		app.client.query("SELECT * FROM test;")
		.on('row', function(row) {
		    console.log(row);
		});
		*/
		var availabilityCheck = request.body;
		/*
			{
				studentId: ,
				startTime: ,
				EndTime:   ,
				Day:       
			}
		*/
		//response.send('Student Registered');
		response.send('Available');
		//response.sendStatus('500');
	});
}