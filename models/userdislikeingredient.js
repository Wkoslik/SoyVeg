'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userdislikeingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userdislikeingredient.init({
    userId: DataTypes.INTEGER,
    dislikedingredientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userdislikeingredient',
  });
  return userdislikeingredient;
};