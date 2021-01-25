'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dislikedrecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.dislikedrecipe.belongsToMany(models.user, {through: "userdislikerecipe"})
    }
  };
  dislikedrecipe.init({
    recipeId: DataTypes.STRING,
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    healthLabel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dislikedrecipe',
  });
  return dislikedrecipe;
};