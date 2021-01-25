'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userSavesRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userSavesRecipe.init({
    Id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.STRING,
    likeOrDislike: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userSavesRecipe',
  });
  return userSavesRecipe;
};