exports.include = (app) => {
	require('./database.js');

	app.post('/login/', function(request, response) {
		var user = request.body;
		//ADD EMAIL VALIDATION

		app.client.query("SELECT s.id, p.salt, p.password FROM music_school.passwords p, music_school.students s WHERE p.id = s.password_id AND s.email='"+user.email+"';")
		.on('row', function(row) {
		    var inputPassSalted = user.password + row.salt;

			if (inputPassSalted.HashCode() == row.password) {
				if (!response.headersSent) {
					userCookie = {
						valid: 'valid',
						id: row.id,
						email: user.email,
						validation: user.password.HashCode()
					};
					response.send(userCookie);
				}
			} else {
				if (!response.headersSent) {
					var valid = {
						valid: 'invalid',
						error: 'Incorrect Password'
					}
					response.send(valid);
				}
			}
		})
		.on('end', function() {
			if (!response.headersSent) {
				var valid = {
					valid: 'invalid',
					error: 'User does not exist'
				}
				response.send(valid);
			}
		})
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