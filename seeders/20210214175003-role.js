'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Roles', [
          {name: 'ADMIN'},
          {name: 'USER'},
          {name: 'MODERATOR'},
        ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Role', null, {});
  }
};
