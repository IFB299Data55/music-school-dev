exports.include = (app) => {
	require('./database.js');

	app.post('/login/', function(request, response) {
		var user = request.body;

		app.client.query("SELECT passwordid FROM musicschool.students WHERE email = '" + user.email + "' UNION SELECT passwordid FROM musicschool.managers WHERE email = 'rvanw9@hotmail.com' UNION SELECT passwordid FROM musicschool.teachers WHERE email = 'rvanw9@hotmail.com';")
		.on('row', function(row) {
		    console.log(row);
		});

		/*
			{
				email: ,
				password: 
			}
		*/

		userCookie = {
			id: 1,
			email: user.email,
			validation: user.password.HashCode()
		};

		response.send(userCookie);
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