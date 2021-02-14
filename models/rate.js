'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    rate: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    story_id: DataTypes.INTEGER
  }, {});
  Rate.associate = function(models) {
    Rate.belongsToMany(models.Story, {
      through: 'story_rate',
      foreignKey: 'story_id'
    })
    Rate.belongsToMany(models.Story, {
      through: "user_rate",
      foreignKey: "user_id"
    })
  };
  return Rate;
};
