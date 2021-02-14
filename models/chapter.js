'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    chapter_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    game_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER
  }, {});
  Chapter.associate = function(models) {
    Chapter.belongsTo(models.Story, {
      onDelete: "CASCADE",
      foreignKey: 'game_id'
    })
    Chapter.belongsToMany(models.Chapter, {
      foreignKey: 'parent_id',
      as: 'parent',
      through: 'story_chapter'
    })

  };
  return Chapter;
};
