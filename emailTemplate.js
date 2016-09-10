var mailOptions = {
	from: {
		name: 'Data55 Administration',
		address:'IFB299data55+administration@gmail.com'
	},
	to: 'example@example.com',
	subject: 'Hello',
	text: 'Hi',
	html: '<b>Hello</b>'
};

transporter.sendMail(mailOptions, function (error, info) {
	if(error) {
		return console.log(error);
	}
	console.log('Message sent: ' + info.response);
});