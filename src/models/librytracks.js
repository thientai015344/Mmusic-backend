'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class librytracks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      librytracks.belongsTo(models.user,{ foreignKey: "userId",});
      librytracks.belongsTo(models.tracks,{foreignKey: "trackId",});



      // define association here
    }
  };
  librytracks.init({
    trackId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'librytracks',
  });
  return librytracks;
};