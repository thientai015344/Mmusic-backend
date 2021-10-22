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
      // define association here
    }
  };
  singers.init({
   
    tracksID: DataTypes.INTEGER,
    singerId: DataTypes.INTEGER,
    
    

    
  }, {
    sequelize,
    modelName: 'singers',
  });
  return singers;
};