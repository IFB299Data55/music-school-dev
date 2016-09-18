exports.include = (app) => {
	require('../database.js');

	app.post('/database/checkAvailability/', function(request, response) {
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

	app.get('/database/getInstrumentTypes', function(request, response){
		var res = {
			valid: true,
			instrumentTypes: [],
			error: ''
		};
		
		var getInstrumentTypesQuery = {
			text: "SELECT * FROM music_school.instrument_types",
			name: "get-instruments-types"
		};

		app.client.query(getInstrumentTypesQuery).on('error', function(err) {
			if (!response.headersSent) {
				res.valid = false;
				res.errorMessage = 'An error has occured. Please try again later or contact an administrator';
				console.log("Errors Happened within DatabaseFunctions: ", err);
				response.send(res);
			}
		}).on('row', function(row) {
			res.instrumentTypes.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				response.send(res);
			}
		});
	});

	app.get('/database/getConditions', function(request, response) {
		var res = {
			valid: true,
			conditions: [],
			error: ''
		};
		
		var getInstrumentTypesQuery = {
			text: "SELECT * FROM music_school.conditions",
			name: "get-conditions"
		};

		app.client.query(getInstrumentTypesQuery).on('error', function(err) {
			if (!response.headersSent) {
				res.valid = false;
				res.errorMessage = 'An error has occured. Please try again later or contact an administrator';
				console.log("Errors Happened within DatabaseFunctions: ", err);
				response.send(res);
			}
		}).on('row', function(row) {
			res.conditions.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				response.send(res);
			}
		});
	});

	app.get('/database/getInstruments', function(request, response){
		var instrumentId = request.query.id;
		var res = {
			valid: false,
			instruments: [],
			error: ''
		};

		res.valid = validateGeneral(instrumentId);
		
		if(res.valid) {
			var getInstrumentsQuery = {
				text: "SELECT i.id, i.serial_no, i.model, i.hire_fee, c.condition, i.inst_notes"
					 +" FROM music_school.instruments i, music_school.conditions c "
					 +"WHERE i.condition_id = c.id AND inst_type_id = $1 AND i.id NOT IN (SELECT instrument_id FROM music_school.instrument_hire "
					 	+"WHERE hire_status_id NOT IN (6))",
				name: "get-instruments-of-type",
				values: [instrumentId]
			};

			console.log(getInstrumentsQuery);

			app.client.query(getInstrumentsQuery).on('error', function(err) {
				if (!response.headersSent) {
					res.valid = false;
					res.errorMessage = 'An error has occured. Please try again later or contact an administrator';
					console.log("Errors Happened within DatabaseFunctions: ", err);
					response.send(res);
				}
			}).on('row', function(row) {
				res.instruments.push(row);
			})
			.on('end', function() {
				if (!response.headersSent) {
					response.send(res);
				}
			});
		} else {
			res.error = 'Regex is broken or we are being hacked.'
			response.send(res);
		}
	});
}

function validateGeneral(string) {
	var regexp = new RegExp("^[A-Za-z0-9 ]*$");
	if (regexp.test(string)) {
		return true;
	}
	return false;
}