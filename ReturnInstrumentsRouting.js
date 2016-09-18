exports.include = (app) => {
	require('./database.js');

	app.get('/management/instrument/return/', function(request, response) {
		response.render('returnInstruments/index');
	});

	app.get('/management/instruments/getInstruments/', function(request, response) {

		var instrumentsResult = [];
		var result = {
			status: true,
			instruments: instrumentsResult
		}

		var getQuery = "SELECT ih.id as hireid, s.first_name as firstname, s.last_name as lastname, "
						+"it.name as instrumenttype, i.model as instrumentname, TO_CHAR(ih.due_date,'YYYY-MM-DD') as duedate "
						+"FROM music_school.instrument_hire ih, music_school.students s, "
						+"music_school.instrument_types it, music_school.instruments i "
						+"WHERE ih.student_id = s.id AND ih.instrument_id = i.id "
						+"AND i.inst_type_id = it.id "
						+"AND NOT ih.is_returned AND ih.hire_status_id = 2;";

		app.client.query(getQuery).on('row', function(row) {
			instrumentsResult.push(row);
		})
		.on('end', function() {
			if (!response.headersSent) {
				if (instrumentsResult.length > 0) {
					response.send(result);
				} else {
					result.status = false;
					response.send(result);
				}
			}
		});
	});

	app.get('/management/instruments/getInstrument/', function(request, response) {

		var instrumentID = request.query.id;
		var instrument = [];
		var result = {
			status: true,
			instrument: instrument
		}

		if (!instrumentID) {
			result.status = false;
			response.send(result);
		} else {
			var getQuery = "SELECT ih.id as hireid, s.first_name as firstname, s.last_name as lastname, "
							+"s.phone_no as phone, s.email as email, TO_CHAR(ih.hire_date,'YYYY-MM-DD') as hiredate, "
							+"it.name as instrumenttype, i.model as instrumentname, TO_CHAR(ih.due_date,'YYYY-MM-DD') as duedate, "
							+"i.serial_no as serialnumber, c.condition as condition, TO_CHAR(i.purchase_date,'YYYY-MM-DD') as purchasedate, "
							+"i.purchase_price as purchaseprice, i.hire_fee as hirefee "
							+"FROM music_school.instrument_hire ih, music_school.students s, "
							+"music_school.instrument_types it, music_school.instruments i, music_school.conditions c "
							+"WHERE ih.student_id = s.id AND ih.instrument_id = i.id "
							+"AND i.condition_id = c.id "
							+"AND i.inst_type_id = it.id AND ih.id ="+instrumentID+" "
							+"AND NOT ih.is_returned AND ih.hire_status_id = 2;";

			app.client.query(getQuery).on('row', function(row) {
				instrument.push(row);
			})
			.on('end', function() {
				if (!response.headersSent) {
					if (instrument.length > 0) {
						response.send(result);
					} else {
						result.status = false;
						response.send(result);
					}
				}
			})
			.on('error', function(err) {
				result.status = false;
				response.send(result);
			});
		}

	});

	app.post('/management/instruments/individual/return/', function(request, response) {

		var hireID = request.body.requestID;
		var result = {
			status: true,
		}

		if (!hireID) {
			result.status = false;
			response.send(result);
		} else {
			var returnQuery = "UPDATE music_school.instrument_hire SET return_date = NOW(), hire_status_id = 6, is_returned = TRUE WHERE id = "+hireID+";";

			app.client.query(returnQuery).on('error', function(err) {
				result.status = false;
				response.send(result);
			})
			.on('end', function() {
				if (!response.headersSent) {
					response.send(result);
				}
			});
		}


	});

	app.get('/management/instrument/return/*', function(request, response) {
	  response.render('returnInstruments/index');
	});
}