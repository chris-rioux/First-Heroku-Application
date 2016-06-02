var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.home = function(req, res) {
	res.render('index', {user : req.user});
};

module.exports.login = function(req, res) {
	res.render('login')
};

module.exports.authenticate = function(req, res) {
	console.log(req.body);
	passportConfig.authenticate('local', function(err, user, info) {
		if (err || !user) {
			return res.render('index');
		}
		req.login(user,function(err) {
			return res.render('index');
		})
	})(req,res);
};

module.exports.signup = function(req, res) {
	res.render('signup');
};

module.exports.register = function(req, res) {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		models.User.create({
			username : req.body.username,
			password : hash
		})
			.then(function(user) {
				req.login(user,function(err) {
					return res.render('index');
				})
			});
	});
};

module.exports.logout = function(req, res) {
	req.logout();
	res.render('index');
}