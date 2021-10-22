'use strict';
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('singers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      singername: {
        type: Sequelize.STRING
      },
      avatasinger: {
        type: Sequelize.BLOB('long')
      },
      tracksId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('singers');
  }
};