var models = require('../models');

module.exports.index = function(req, res) {
	models.User.findById(req.params.id, {
		include : [{
			model : models.Task
		}]
	})
		.then(function(users) {
			res.json(users);
		});
};

module.exports.addTask = function(req, res) {
	var task = req.body;
	task.UserId = req.params.id;
	
	models.Task.create(task)
		.then(function(task) {
			models.User.findById(req.params.id)
				.then(function(user) {
					user.addTask(task)
						.then(function() {
							res.json(user);
						})
				})
		})
};

module.exports.show = function(req, res) {
	models.User.findById(req.params.id) 
		.then(function(user) {
			models.Task.findById(req.params.tid) 
				.then(function(task) {
					res.json(task);
				});
			})
};	

module.exports.update = function(req, res) {
	var updatedTask = req.body;
	models.Task.upsert(updatedTask)
		.then(function(bool) {
			res.sendStatus(202);
		});
};

module.exports.destroy = function(req, res) {
	var id = req.params.tid;
	models.Task.destroy({
		where : {
			id : id
		}
	})
	.then(function() {
		res.sendStatus(202);
	})
	.catch(function(err) {
		res.status(500);
		res.send(err);
	});
};