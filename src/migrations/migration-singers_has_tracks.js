'use strict';
module.exports = {
   
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('singer_has_tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      singerId: {
        type: Sequelize.INTEGER,
      },
    
      tracksId: {
        type: Sequelize.INTEGER
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('singes_has_tracks');
  }
};