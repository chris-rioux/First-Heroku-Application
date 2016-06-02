module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        title : DataTypes.STRING
    }, {
        classMethods: {
            associate : function(models) {
                Task.belongsTo(models.User, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false // must be associated
                    }
                });
            }
        }
    });

    return Task;
}