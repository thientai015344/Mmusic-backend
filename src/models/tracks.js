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
      tracks.belongsToMany(models.singers,{ through: "singer_track",as: "singers",foreignKey: "trackId",});
      tracks.belongsToMany(models.playlists,{ through: "Playlist_track",as: "playlists",foreignKey: "trackId",});
      tracks.belongsToMany(models.albums,{ through: "Album_track",as: "albums",foreignKey: "trackId",});
      tracks.hasMany(models.comments,{ foreignKey: "trackId",});




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
  
  }, {
    sequelize,
    modelName: 'tracks',
  });
  return tracks;
};