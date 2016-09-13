exports.include = (app) => {
	require('./database.js');

	app.get('/management/instrument/new', function(request, response) {
	  response.render('newInstrument/index');
	});

	app.post('/management/instrument/new', function(request, response) {
		//DATABASE CONNECTION
		var instrument = request.body;
		console.log(instrument);
		var isValid = {
			type:true,
			condition:true,
			serialNumber:true,
			model:true,
			purchasePrice:true,
			hireFee:true,
			purchaseDate:true,
			description:true,
			errorMessage: ''
		};
		var valid = {
			status:false,
			errorArray:isValid
		};

		if (validateAll(instrument, isValid)) {
			valid.status = true;
		} else {
			valid.status = false;
			valid.errorArray = isValid;
			response.send(valid);
		}

		if(valid.status) {
			var instrumentColumns = "inst_type_id, serial_no, condition_id, model, purchase_date, purchase_price, inst_notes, hire_fee, is_sold_or_disposed";
			var newInstrumentQuery = {
				text: "INSERT INTO music_school.instruments("+instrumentColumns+") VALUES("
						+"$1,$2,$3,$4,"+
						"to_date($5, 'DD MM YYYY'),$6,$7,$8,$9"
					 +")",
				name: "create-new-student",
				values: [
					  instrument.type
					, instrument.serialNumber
					, instrument.condition
					, instrument.model
					, instrument.purchaseDate
					, instrument.purchasePrice.substring(1)
					, instrument.description
					, instrument.hireFee.substring(1)
					,"FALSE"
				]
			};

			app.client.query(newInstrumentQuery).on('error', function(err) {
				if (!response.headersSent) {
					valid.status = false;
					isValid.errorMessage = 'An error has occured. Please try again later or contact an administrator';
					response.send(valid);
					console.log('error in NewInstrumentRouting: ', err);
				}
			})
			.on('end', function() {
				if (!response.headersSent) {
					response.send(valid);
				}
			});
		}
	});

	app.get('/management/instrument/new/*', function(request, response) {
	  response.render('newInstrument/index');
	});
}

function validateAll(instrument, isValid) {
	if (validateType(instrument.type, isValid) &&
		validateCondition(instrument.condition, isValid) &&
		validateSerialNumber(instrument.serialNumber, isValid) &&
		validatePurchasePrice(instrument.purchasePrice, isValid) &&
		validateHireFee(instrument.hireFee, isValid) &&
		validatePurchaseDate(instrument.purchaseDate, isValid) &&
		validateDescription(instrument.description, isValid)) {
		return true;
	} else {
		return false;
	}
}

function validateType(type, isValid) {
	var regexp = new RegExp("^[0-9]+$");
	if (regexp.test(type)) {
		return true;
	}
	isValid.type = false;
	return false;
}

function validateCondition(condition, isValid) {
	var regexp = new RegExp("^[0-9]+$");
	if (regexp.test(condition)) {
		return true;
	}
	isValid.condition = false;
	return false;
}

function validateSerialNumber(serialNumber, isValid) {
	var regexp = new RegExp("^[A-Z0-9]+$");
	if (regexp.test(serialNumber)) {
		return true;
	}
	isValid.serialNumber = false;
	return false;
}

function validateModel(model, isValid) {
	var regexp = new RegExp("^[A-Za-z0-9 ]+$");
	if (regexp.test(model)) {
		return true;
	}
	isValid.model = false;
	return false;
}

function validatePurchaseDate(purchaseDate, isValid) {
	var regexp1 = "^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$";
	var regexp2 = "^[0-9]{2}-[0-9]{2}-[0-9]{4}$";
	var days, months, years;
	//if (regexp1.test(purchaseDate)) {
	if (purchaseDate.match(regexp1)) {
		var days = parseInt(purchaseDate.split('/')[0]);
		var months = parseInt(purchaseDate.split('/')[1]);
		var years = parseInt(purchaseDate.split('/')[2]);
	//} else if (regexp2.test(purchaseDate)) {
	} else if (purchaseDate.match(regexp2)) {
		var days = parseInt(purchaseDate.split('-')[0]);
		var months = parseInt(purchaseDate.split('-')[1]);
		var years = parseInt(purchaseDate.split('-')[2]);
	}
	if (days && months && years) {
		if (days > 0 && days < 32 &&
			months > 0 && months < 13 &&
			years > 2015) {
			return true;
		}
	}
	isValid.purchaseDate = false;
	return false;
}

function validateHireFee(hireFee, isValid) {
	var regexp = new RegExp("^.[0-9]+(.[0-9]{2})?$");
	if (regexp.test(hireFee)) {
		return true;
	}
	isValid.hireFee = false;
	return false;
}

function validatePurchasePrice(purchasePrice, isValid) {
	var regexp = new RegExp("^.[0-9]+(.[0-9]{2})?$");
	if (regexp.test(purchasePrice)) {
		return true;
	}
	isValid.purchasePrice = false;
	return false;
}

function validateDescription(description, isValid) {
	var regexp = new RegExp("^[A-Za-z0-9 ._%+-]*$");
	if (regexp.test(description)) {
		return true;
	}
	isValid.description = false;
	return false;
}