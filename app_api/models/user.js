module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		username : { 
					type : DataTypes.STRING,
					allowNull : false,
					unique : true 
					},
		password : DataTypes.STRING,
		email : DataTypes.STRING
	}, {
		classMethods: {
			associate : function(models) {
				User.hasMany(models.Task)
			}
		}
	});
	
	return User;
}