exports.include = (app) => {
	require('./database.js');

	app.get('/myportal/', function(request, response) {
		response.render('myPortal/index');
	});

	app.post('/myportal/SavePersonalData', function(request, response) {
		var user = request.body;

		var res = {
			valid: true,
			error: ''
		};

		if(userIsValid(app, user)) {
			var counter = 1;
			var updateUserQuery = "UPDATE music_school." + user.type + "s ";
			var updateUserValues = [];
			Object.keys(user).forEach(function (key) {
				if(key != 'id' && key != 'type') {
					if(counter == 1) {
						updateUserQuery += "SET "
					} else {
						updateUserQuery += ", "
					}
					updateUserQuery += key+"=$"+ counter++ +" ";
					updateUserValues.push(user[key]);
				}
			});
			updateUserQuery += "WHERE id=$" + counter++;
			updateUserValues.push(user.id);

			app.client.query(updateUserQuery, updateUserValues)
			.on('error', function(err) {
				/* Error Handling */
				if (!response.headersSent) {
					res.valid = false;
					res.error = 'An error has occured. Please try again later or contact an administrator';
					console.log("Errors Happened within MyPortalRouting : SavePersonalData");
					console.log("Params: user = ", user);
					console.log("query: \n", updateUserQuery,"\n\n");
					console.log("values: \n", updateUserValues,"\n\n");
					response.send(res);
				}
			})
			.on('end', function() {
				//return response
				if (!response.headersSent) {
					response.send(res);
				}
			});

		} else {
			res.valid = 'false';
			res.error = 'Invalid input values';
			response.send(res);
		}
	});

	app.get('/myportal/*', function(request, response) {
	  response.render('myPortal/index');
	});
}

function userIsValid(app, user) {
	if(app.validateId(user.id) &&
	   app.validateType(user.type) &&
	   app.validateName(user.first_name) &&
	   app.validateName(user.middle_name, true) && //Optional = true
	   app.validateName(user.last_name) &&
	   app.validateEmail(user.email) &&
	   app.validateDate(user.dob) && //Format = ymd (year/month/day)
	   app.validateText(user.address) &&
	   app.validatePhone(user.phone_no) &&
	   app.validateGender(user.gender)) {
		return true;
	}

	return false;
}