exports.include = (app) => {
	require('./database.js');

	app.post('/login/', function(request, response) {
		var user = request.body;
		//ADD EMAIL VALIDATION

		var salt = '';
		var password = '';
		app.client.query("SELECT salt, password FROM music_school.passwords WHERE password_id = (SELECT password_id FROM music_school.students WHERE email='"+user.email+"');")
		.on('row', function(row) {
			console.log(row);
		    salt = row.salt;
		    password = row.password;

		    var inputPassSalted = user.password + salt;

			console.log(inputPassSalted);
			console.log(inputPassSalted.HashCode());
			if(inputPassSalted.HashCode() == password) {
				userCookie = {
					valid: 'valid',
					email: user.email,
					validation: user.password.HashCode()
				};

				response.send(userCookie);
			} else {
				var valid = {
					valid: 'invalid'
				}
				response.send(valid);
			}
		});

		//response.send('Student Registered');
		//response.sendStatus('201');
		//response.sendStatus('500');
	});
}

String.prototype.HashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};