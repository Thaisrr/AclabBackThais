'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  Comment.associate = function(models) {
    Comment.belongsToMany(models.Story, {
      through: 'story_comments',
      as: 'story',
      foreignKey: 'story_id'
    })
    Comment.belongsToMany(models.User, {
      through: "user_comments",
      foreignKey: "user_id",
      as: "user"
    })
  };
  return Comment;
};
