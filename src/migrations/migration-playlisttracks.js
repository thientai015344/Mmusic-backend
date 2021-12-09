'use strict';
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlisttracks',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trackId:{
        type: Sequelize.INTEGER
      },
      playlistId:{
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
    await queryInterface.dropTable('playlisttracks');
  }
};