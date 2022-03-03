'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlisttracks extends Model {
    
    static associate(models) {
      playlisttracks.belongsTo(models.playlists,{ foreignKey: "playlistId",});
      playlisttracks.belongsTo(models.tracks,{foreignKey: "trackId",});

    }
  };
  playlisttracks.init({
    trackId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'playlisttracks',
  });
  return playlisttracks;
};