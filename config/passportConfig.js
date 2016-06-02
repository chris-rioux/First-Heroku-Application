var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var models = require('../app_api/models');

passport.use(new LocalStrategy(
	function(username, password, callback) {
		models.User.findOne({
			where : {
				username : username
			}
		})
		.then(function(user) {
			if (!user) {
				return callback(null, false);
			}
			bcrypt.compare(password, user.password, function(err, result) {
				if (err || !result) {
					console.log(password);
					console.log(user.password);
					return callback(null, false);
				}
				return callback(null, user);
			});
		})
		.catch(function(err) {
			return callback(err);
		});
	}));
	
passport.serializeUser(function(user, callback) {
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
	models.User.findById(id)
	.then(function(user) {
		callback(null, user);
	})
	.catch(function(err) {
		callback(err);
	});
});

module.exports = passport;