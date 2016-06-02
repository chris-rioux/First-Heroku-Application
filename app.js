var express = require('express');
var app = express();
var path = require('path');
var bp = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var passportConfig = require('./config/passportConfig');
var models = require('./app_api/models');
var bcrypt = require('bcrypt');
var port = process.env.PORT || 3000;

var secret;

if (process.env.SECRET) {
	secret = process.env.SECRET;
}
else {
	secret = require('./credentials').secret;
}

app.use(bp.urlencoded({ extended : true }));
app.use(bp.json());

app.use(cookie(secret));

app.use(session({
	resave : false,
	saveUninitialized : false,
	secret : secret
}))

app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.use(express.static(__dirname + '/public'));

// find files to render
app.set("views", path.join(__dirname, "app_server", "views"));

// generate handlebars
var handlebars = require("express-handlebars").create({defaultLayout:"../../app_server/views/layouts/main"});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/users', require('./app_api/routes/userRoutes.js'));
app.use('/', require('./app_server/routes/loginRoutes.js'));

models.sequelize.sync({ force : true }) //  put force:true inside sync method to force db creation
	.then(function() {
		console.log('Successfully synced db');
		app.listen(port, function() {
			console.log('Listening on port ' + port);
			// models.User.create({
// 				username : 'admin',
// 				password : 'admin',
// 				email : 'admin@admin.com'
// 			})
// 			.then(function() {
// 				console.log('User successfully created.');
// 			})
		});
	})
	.catch(function(err) {
		console.error(err);
	});