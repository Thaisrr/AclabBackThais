'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Role, {
      through: "user_roles",
    });
    User.belongsToMany(models.Story, {
      through: "user_stories",
    });

  };
  return User;
};
