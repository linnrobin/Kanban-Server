'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'organization', {
       type: Sequelize.STRING,
       allowNull: false,
       defaultValue: 'hacktiv8'
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'organization');
  }
};
