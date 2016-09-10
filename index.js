var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./database.js').include(app);


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/website'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

// views is directory for all template files
app.set('views', __dirname + '/website');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('main/index');
});

app.get('/dev', function(request, response) {
	response.render('dev-info/dev-info');
});

require('./database/databaseFunctions.js').include(app);
require('./LoginModules.js').include(app);
require('./lessonInformation.js').include(app);
require('./ownerAPI.js').include(app);
require('./StudentRegistrationRouting.js').include(app);
require('./TeacherRegistrationRouting.js').include(app);
require('./StudentLessonApplicationRouting.js').include(app);
require('./NewInstrumentRouting.js').include(app);
require('./ReturnInstrumentsRouting.js').include(app);

app.use(function(request, response) {
	response.render('404');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});