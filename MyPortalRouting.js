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

	app.post('/myportal/SavePasswordData', function(request, response) {
		var password = request.body;

		var res = {
			valid: true,
			error: ''
		};

		if(passwordIsValid(app, password)) {
			var checkOldPasswordQuery = {
				text: "SELECT p.salt, p.password from music_school." + password.type + "s u, music_school.passwords p "
					 +"WHERE u.password_id = p.id "
					 +"AND u.id=$1",
				name: "get-old-password",
				values: [password.id]
			};

			app.client.query(checkOldPasswordQuery)
			.on('error', function(err) {
				res.valid = false;
				res.error = 'The server is currently down. Try again later.';
				response.send(res);
				console.log("Error in MyPortalRouting : SavePasswordData : CheckOldPasswordQuery");
				console.log("Query:\n",checkOldPasswordQuery,"\n\n");
				console.log("Input:\n",password,"\n\n");
				console.log("error:\n",err,"\n\n");
			})
			.on('row', function(row) {
			    var inputPassSalted = password.old + password.type.HashCode() + row.salt;
				if (inputPassSalted.HashCode() == row.password) { //Passwords Match
					var d = new Date();
					var n = d.getTime();

					var saltedPassword = password.new + password.type.HashCode() + n;
					var hashedPassword = saltedPassword.HashCode();

					var passwordCols = "salt, password"
					var newPasswordQuery = "INSERT INTO music_school.passwords("+passwordCols+") VALUES("+n+", "+hashedPassword+"); "
										  +"UPDATE music_school."+password.type+"s SET password_id = ("
										  	+"SELECT MAX(id) FROM music_school.passwords"
										  +") WHERE id="+password.id+";"

					app.client.query(newPasswordQuery)
					.on('error', function(err) {
						/* Error Handling */
						if (!response.headersSent) {
							res.valid = false;
							res.error = 'The server is currently down. Try again later.';
							response.send(res);
							console.log("Error in MyPortalRouting : SavePasswordData : newPasswordQuery");
							console.log("Query:\n",newPasswordQuery,"\n\n");
							console.log("Input:\n",password,"\n\n");
						}
					})
					.on('end', function() {
						if (!response.headersSent) {
							response.send(res);
						}
					});
				} else {
					if (!response.headersSent) {
						res.valid = false;
						res.error = "Old password is incorrect.";
						response.send(res);
					}
				}
			})
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

function passwordIsValid(app, password) {
	if(app.validateId(password.id) &&
	   app.validateType(password.type) &&
	   app.validatePassword(password.old) &&
	   app.validatePassword(password.new)) {
		return true;
	}

	return false;
}