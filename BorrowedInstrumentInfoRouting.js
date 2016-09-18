exports.include = (app) => {
	require('./database.js');

	app.get('/student/instruments/borrowed/', function(request, response) {
	  response.render('borrowedInstruments/index');
	});

	app.get('/student/instruments/borrowed/getInstrumentList/', function(request, response) {

		var studentID = request.query.id;

		var instrumentsResult = [];
		var result = {
			status: true,
			instruments: instrumentsResult
		}

		if (!studentID) {
			result.status = false;
			response.send(result);
		}

		var getQuery = "SELECT ih.id as hireid, hs.status as status, i.hire_fee as hirefee, c.condition as condition, i.serial_no as serialnumber, i.inst_notes as notes, "
						+"it.name as instrumenttype, i.model as instrumentname, TO_CHAR(ih.due_date,'YYYY-MM-DD') as duedate "
						+"FROM music_school.instrument_hire ih, music_school.students s, music_school.request_status hs, "
						+"music_school.instrument_types it, music_school.instruments i, music_school.conditions c "
						+"WHERE ih.student_id = s.id AND ih.instrument_id = i.id "
						+"AND i.inst_type_id = it.id AND i.condition_id = c.id AND ih.student_id ="+studentID+" "
						+"AND NOT ih.is_returned AND ih.hire_status_id IN (1,2) AND hs.id = ih.hire_status_id;";

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

	app.get('/student/instruments/borrowed/*', function(request, response) {
	  response.render('borrowedInstruments/index');
	});
}