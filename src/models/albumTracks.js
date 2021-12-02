'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albumtracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      albumtracks.belongsTo(models.albums,{ foreignKey: "albumId",});
      albumtracks.belongsTo(models.tracks,{foreignKey: "trackId",});



      // define association here
    }
  };
  albumtracks.init({
    trackId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'albumtracks',
  });
  return albumtracks;
};