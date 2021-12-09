'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.comments,{ foreignKey: "userId",});
      user.hasMany(models.playlists,{ foreignKey: "userId",});
      user.hasMany(models.librytracks,{ foreignKey: "userId",});


      // define association here
    }
  };
  user.init({
    username: DataTypes.STRING,
    interfaceName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    avata: DataTypes.BLOB('long'),
    roleId: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};