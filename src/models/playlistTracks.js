'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlisttracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      playlisttracks.belongsTo(models.playlists,{ foreignKey: "playlistId",});
      playlisttracks.belongsTo(models.tracks,{foreignKey: "trackId",});



      // define association here
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