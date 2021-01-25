'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userlikeingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userlikeingredient.init({
    userId: DataTypes.INTEGER,
    ingredientId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userlikeingredient',
  });
  return userlikeingredient;
};