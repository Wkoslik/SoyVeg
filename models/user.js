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
      // define association here
      models.user.hasMany(models.userlikeingredient);
      models.user.hasMany(models.userlikerecipe);
      models.user.hasMany(models.userdislikeingredient);
      models.user.hasMany(models.userdislikerecipe);
    }
  };
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    pronouns: DataTypes.STRING,
    nutrition_preference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};