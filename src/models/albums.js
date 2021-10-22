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
    nameAlbum: DataTypes.STRING,
    imgAlbum: DataTypes.BLOB('long'),
    userId: DataTypes.INTEGER,
    tracksId: DataTypes.INTEGER,
    

    
  }, {
    sequelize,
    modelName: 'tracks',
  });
  return tracks;
};