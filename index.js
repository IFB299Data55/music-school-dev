var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

require('./database.js').include(app);

var transporter = nodemailer.createTransport('smtps://ifb299data55%40gmail.com:IFB299d55@smtp.gmail.com');

/*var mailOptions = {
	from: '"Data Team" <test@data55.com>',
	to: 'rvanw9@hotmail.com',
	subject: 'Hello',
	text: 'Hi',
	html: '<b>Hello</b>'
};

transporter.sendMail(mailOptions, function (error, info) {
	if(error) {
		return console.log(error);
	}
	console.log('Message sent: ' + info.response);
});*/


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

app.use(function(request, response) {
	response.render('404');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});