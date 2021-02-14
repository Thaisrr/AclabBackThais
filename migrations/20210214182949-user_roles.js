'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user_roles', {
          createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
          updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
          user_id: {
              type: Sequelize.UUID,
              primaryKey: true
          },
          role_id: {
              type: Sequelize.UUID,
              primaryKey: true
          }
      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user_roles');

  }
};
