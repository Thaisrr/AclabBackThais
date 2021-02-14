'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    seen_count: DataTypes.INTEGER,
    average_rate: DataTypes.FLOAT,
    average_rate_count: DataTypes.INTEGER,
    isTriggered: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.hasOne(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
    Story.belongsToMany(models.Theme, {
      foreignKey: 'story_id',
      through: 'story_theme'
    })
    Story.belongsToMany(models.User, {
      through: "user_watch_later",
      foreignKey: "user_id"
    })
    Story.belongsToMany(models.User, {
      through: "user_reading",
      foreignKey: "user_id"
    })
    Story.belongsToMany(models.User, {
      through: "user_finished",
      foreignKey: "user_id"
    })
    Story.belongsToMany(models.User, {
      through: "user_favorites",
      foreignKey: "user_id"
    })
  };
  return Story;
};
