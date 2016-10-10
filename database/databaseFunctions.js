/* Routing For Database Functions */
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

	/* Gets all Instrument Types */
	app.get('/database/getInstrumentTypes', function(request, response){
		//setup response frame
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
			/* Error Handling */
			if (!response.headersSent) {
				res.valid = false;
				res.errorMessage = 'An error has occured. Please try again later or contact an administrator';
				console.log("Errors Happened within DatabaseFunctions: ", err);
				response.send(res);
			}
		}).on('row', function(row) {
			//Add instrument types to array
			res.instrumentTypes.push(row);
		})
		.on('end', function() {
			//return response
			if (!response.headersSent) {
				response.send(res);
			}
		});
	});

	/* Gets All Conditions */
	app.get('/database/getConditions', function(request, response) {
		//setup response frame
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
			/* Error Handling */
			if (!response.headersSent) {
				res.valid = false;
				res.errorMessage = 'An error has occured. Please try again later or contact an administrator';
				console.log("Errors Happened within DatabaseFunctions: ", err);
				response.send(res);
			}
		}).on('row', function(row) {
			//add conditions to array
			res.conditions.push(row);
		})
		.on('end', function() {
			//return response
			if (!response.headersSent) {
				response.send(res);
			}
		});
	});

	/* Gets all Instruments of particular instrument Type */
	app.get('/database/getInstruments', function(request, response){
		var instrumentTypeId = request.query.id;
		var all = request.query.all;
		//setup response frame
		var res = {
			valid: false,
			instruments: [],
			error: ''
		};

		//Validate param (stop Injection attacks)
		res.valid = validateGeneral(instrumentTypeId);
		
		if(res.valid) {
			var getInstrumentsQuery;
			var conditionRestriction = '';
			if(!all){
				conditionRestriction = 'AND i.condition_id NOT IN (5)';
			}
			
			getInstrumentsQuery = {
				text: "SELECT i.id, i.serial_no, i.model, i.hire_fee, c.condition, i.inst_notes"
					 +" FROM music_school.instruments i, music_school.conditions c "
					 +"WHERE i.condition_id = c.id AND inst_type_id = $1 AND i.id NOT IN (SELECT instrument_id FROM music_school.instrument_hire "
					 	+"WHERE hire_status_id NOT IN (6))" + conditionRestriction,
				name: "get-instruments-of-type",
				values: [instrumentTypeId]
			};

			app.client.query(getInstrumentsQuery).on('error', function(err) {
				/* Error Handling */
				if (!response.headersSent) {
					res.valid = false;
					res.error = 'An error has occured. Please try again later or contact an administrator';
					console.log("Errors Happened within DatabaseFunctions getInsts: ", err);
					response.send(res);
				}
			}).on('row', function(row) {
				//Add instruments to array
				res.instruments.push(row);
			})
			.on('end', function() {
				//return response
				if (!response.headersSent) {
					response.send(res);
				}
			});
		} else {
			res.error = 'Regex is broken or we are being hacked.'
			response.send(res);
		}
	});

	/*
	Gets all the teachers qualified for a specific instrument and language
	Parameters: instId = ID of the instrument type requested
				langId = ID of the language requested
	Returns: 	List of teachers qualified
	*/
	app.get('/database/getTeachers', function(request, response){
		var instrumentTypeId = request.query.instId;
		var languageId = request.query.langId;
		//setup response frame
		var res = {
			valid: false,
			teachers: [],
			error: ''
		};

		//Validate param (stop Injection attacks)
		res.valid = validateGeneral(instrumentTypeId) && validateGeneral(languageId);
		
		if(res.valid) {
			var getTeacherQuery;
			
			getTeacherQuery = {
				text: "SELECT t.id, t.first_name, t.last_name, te.grade "
					 +"FROM music_school.teachers t, music_school.teacher_languages tl, music_school.teacher_experience te "
					 +"WHERE  t.id = tl.teacher_id"
					 +"   AND t.id = te.teacher_id"
					 +"   AND te.inst_type_id = $1"
					 +"   AND te.grade >= 4" //4 is the "teaching" requirement
					 +"   AND tl.language_id = $2"
					 +"   AND t.is_terminated = FALSE",
				name: "get-applicable-teachers",
				values: [
					instrumentTypeId,
					languageId
				]
			};

			app.client.query(getTeacherQuery).on('error', function(err) {
				/* Error Handling */
				if (!response.headersSent) {
					res.valid = false;
					res.error = 'An error has occured. Please try again later or contact an administrator';
					console.log("Errors Happened within DatabaseFunctions getTeachers:");
					console.log("Params: instTypeId = ", instrumentTypeId, " / languageId = ", languageId);
					console.log("query: \n", getTeacherQuery);
					console.log("\n",err);
					response.send(res);
				}
			}).on('row', function(row) {
				//Add instruments to array
				res.teachers.push(row);
			})
			.on('end', function() {
				//return response
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

/* General Validation Function */
function validateGeneral(string) {
	var regexp = new RegExp("^[A-Za-z0-9 ]*$");
	if (regexp.test(string)) {
		return true;
	}
	return false;
}