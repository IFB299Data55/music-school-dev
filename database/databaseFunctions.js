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
				duration:   ,
				day:       
			}
		*/
		if(availabilityCheck.studentId == '' 
		 ||availabilityCheck.startTime == ''
		 ||availabilityCheck.duration == ''
		 ||availabilityCheck.day == '') response.send('Unavailable');
		else response.send('Available');
	});
}