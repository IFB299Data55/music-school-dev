exports.include = (app) => {
	var pg = require('pg');
	var conString = "postgres://gzlrnynoieypkd:qzIIVHYX2ah3yf3VXgAWWYWDNa@ec2-54-221-245-174.compute-1.amazonaws.com:5432/dc4aq2ag9h0ch0";
	pg.defaults.ssl = true;
	pg.connect(conString, function(err, client) {
	  if (err) {
	  	throw err;
	  };
		app.client = client;
	});
}