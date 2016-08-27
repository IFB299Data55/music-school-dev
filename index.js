var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/website'));
app.use(express.static(__dirname + '/node_modules'));

// views is directory for all template files
app.set('views', __dirname + '/website');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('main/index');
});

app.get('/dev', function(request, response) {
	response.render('dev-info/dev-info');
});

require('./ownerAPI.js').include(app);

app.use(function(request, response) {
	response.render('404');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});