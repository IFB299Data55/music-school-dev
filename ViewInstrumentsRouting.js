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

			var getQuery = "SELECT id "
							+"FROM music_school.instruments WHERE id="+instrumentID+";";

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

		var getQuery = "SELECT id "
						+"FROM music_school.instruments WHERE is_disposed = FALSE;";

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

	app.get('/management/instruments/*', function(request, response) {
	  response.render('viewInstruments/index');
	});
}