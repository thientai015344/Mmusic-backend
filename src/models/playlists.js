'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  playlists.init({
    playlistname: DataTypes.STRING,
    imgplaylist: DataTypes.BLOB('long'),
    trackId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'playlists',
  });
  return playlists;
};