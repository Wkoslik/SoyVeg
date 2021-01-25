'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userSavesIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userSavesIngredient.init({
    Id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    ingredientId: DataTypes.STRING,
    likeOrDislike: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userSavesIngredient',
  });
  return userSavesIngredient;
};