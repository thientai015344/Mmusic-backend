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
      // playlists.belongsToMany(models.tracks,{ through: "Playlist_track",as: "tracks",foreignKey: "playlistId",});


      
      // define association here
    }
  };
  playlists.init({
    playlistname: DataTypes.STRING,
    imgplaylist: DataTypes.BLOB('long'),
    userId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'playlists',
  });
  return playlists;
};