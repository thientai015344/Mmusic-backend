'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class singers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      singers.belongsToMany(models.tracks,{ through: "singer_track",as: "tracks",foreignKey: "singerId",});
      
      // define association here
    }
  };
  
  singers.init({
    singername: DataTypes.STRING,
    description: DataTypes.TEXT,
    avatasinger: DataTypes.BLOB('long'),

  
    
    

    
  }, {
    sequelize,
    modelName: 'singers',
  });
  return singers;
};