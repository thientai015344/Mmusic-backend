'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


      
    //  albums.belongsToMany(models.tracks,{ through: "Album_track",as: "tracks",foreignKey: "albumId",});
      // define association here
    }
  };
  albums.init({
    nameAlbum: DataTypes.STRING,
    imgAlbum: DataTypes.BLOB('long'),


    

    
  }, {
    sequelize,
    modelName: 'albums',
  });
  return albums;
};