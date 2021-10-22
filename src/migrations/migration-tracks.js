'use strict';
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namesong: {
        type: Sequelize.STRING
      },
      imgsong: {
        type: Sequelize.BLOB('long')
      },
      filetrack: {
        type: Sequelize.BLOB('long')
      },
      duration: {
        type: Sequelize.STRING
      },
      SingerID: {
        type: Sequelize.INTEGER
      },
      lyric: {
        type: Sequelize.STRING
      },
      listens: {
        type: Sequelize.STRING
      },
      albumsId: {
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
      userId:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tracks');
  }
};