/* Manages Instrument Return Routing */
exports.include = (app) => {
	app.validateId = function(id) {
		var regexp = new RegExp("^[1-9][0-9]*$");
		if (regexp.test(id)) {
			return true;
		}
		return false;
	}

	app.validateName = function(name) {
		var regexp = new RegExp("^[A-Za-z]([A-Za-z ]*[A-Za-z])?$");
		if (regexp.test(name)) {
			return true;
		}
		return false;
	}

	app.validateDate = function(date, fmt = 'dmy') {
		var regexp;
		if(fmt == 'dmy') {
			regexp = new RegExp("^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$");
		} else if (fmt = 'ymd') {
			regexp = new RegExp("^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$");
		} else {
			return false;
		}

		if (regexp.test(date)) {
			return true;
		}
		return false;
	}

	app.validatePhone = function(number) {
		var regexp = new RegExp("^[0-9]{8}$|^04[0-9]{8}$");
		if(regexp.test(number)) {
			return true;
		}
		return false;
	}
}