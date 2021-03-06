'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likedrecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.likedrecipe.belongsToMany(models.user, {through: "userlikerecipe"})
    }
  };
  likedrecipe.init({
    recipeId: DataTypes.STRING,
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    healthLabel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'likedrecipe',
  });
  return likedrecipe;
};