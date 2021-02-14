'use strict';
module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    name: DataTypes.STRING,
    img: DataTypes.BLOB
  }, {});
  Theme.associate = function(models) {
    // associations can be defined here
  };
  return Theme;
};