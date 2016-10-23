exports.include = (app) => {
	require('./database.js');

	app.get('/management/instruments/', function(request, response) {
		response.render('viewInstruments/index');
	});

	app.get('/management/instruments/getIndividualInstrument/', function(request, response) {
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

			var getQuery = {
				text: "SELECT "
						+"i.id, "
						+"serial_no as serialNumber, "
						+"name as instType, "
						+"TO_CHAR(purchase_date,'YYYY-MM-DD') as purchaseDate, "
						+"condition, "
						+"purchase_price as price, "
						+"model, "
						+"inst_notes as notes, "
						+"hire_fee as hireFee "
					+"FROM "
						+"music_school.instruments i "
						+"LEFT JOIN music_school.instrument_types it "
							+"ON inst_type_id = it.id "
						+"LEFT JOIN music_school.conditions c "
							+"ON condition_id = c.id "
					+"WHERE i.id = $1 "
					+"ORDER BY name ASC",
				name: "get-individual-instrument",
				values: [
					instrumentID
				]
			};

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
				console.log(err);
				result.status = false;
				response.send(result);
			});
		}
	});

	app.get('/management/instruments/getAllInstruments/', function(request, response) {
		var instrumentsResult = [];
		var result = {
			status: true,
			instruments: instrumentsResult
		}

		var getQuery = {
			text: "SELECT "
					+"i.id, "
					+"serial_no as serialNumber, "
					+"name as instType, "
					+"TO_CHAR(purchase_date,'YYYY-MM-DD') as purchaseDate, "
					+"condition, "
					+"purchase_price as price, "
					+"model, "
					+"hire_fee as hireFee "
				+"FROM "
					+"music_school.instruments i "
					+"LEFT JOIN music_school.instrument_types it "
						+"ON inst_type_id = it.id "
					+"LEFT JOIN music_school.conditions c "
						+"ON condition_id = c.id "
				+"WHERE is_sold_or_disposed = FALSE "
				+"ORDER BY name ASC",
			name: "get-instruments",
			values: []
		};

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

	app.post('/management/instruments/getIndividualInstrument/delete/', function(request,response) {
		var instrumentID = request.body.id;
		var result = {
			status: true,
		};

		var deleteQuery = {
			text: "UPDATE music_school.instruments SET is_sold_or_disposed = TRUE WHERE id = $1",
			name: "delete-instrument",
			values: [
				instrumentID
			]
		}

		app.client.query(deleteQuery).on('error', function(err) {
			result.status = false;
			response.send(result);
		})
		.on('end', function() {
			if (!response.headersSent) {
				response.send(result);
			}
		})
	});

	app.get('/management/instruments/*', function(request, response) {
	  response.render('viewInstruments/index');
	});
}