'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tracks.init({
    namesong: DataTypes.STRING,
    imgsong: DataTypes.BLOB('long'),
    filetrack: DataTypes.BLOB('long'),
    duration: DataTypes.STRING,
    SingerID: DataTypes.INTEGER,
    lyric: DataTypes.CITEXT,                  
    listen: DataTypes.INTEGER,
    albumsId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    

    
  }, {
    sequelize,
    modelName: 'tracks',
  });
  return tracks;
};