exports.include = (app) => {
	require('./database.js');

	app.post('/login/', function(request, response) {
		/* DATABASE CONNECTION
		app.client.query("SELECT * FROM test;")
		.on('row', function(row) {
		    console.log(row);
		});
		*/
		var user = request.body;
		/*
			{
				username: ,
				password: 
			}
		*/

		userCookie = {
			username: user.username,
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