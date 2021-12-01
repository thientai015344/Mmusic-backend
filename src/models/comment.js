'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.belongsTo(models.user,{ foreignKey: "userId",});
      comments.belongsTo(models.tracks,{foreignKey: "trackId",});



      // define association here
    }
  };
  comments.init({
    trackId: DataTypes.INTEGER,
    contentcmt: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};