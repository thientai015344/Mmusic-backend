'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class singer_has_tracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  singer_has_tracks.init({
   
    tracksID: DataTypes.INTEGER,
    singerId: DataTypes.INTEGER,
    
    

    
  }, {
    sequelize,
    modelName: 'singer_has_tracks',
  });
  return singer_has_tracks;
};