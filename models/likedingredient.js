'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likedingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.likedingredient.belongsToMany(models.user, {through: "userlikeingredient"})
    }
  };
  likedingredient.init({
    foodId: DataTypes.STRING,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    measureUri: DataTypes.STRING,
    healthLabel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'likedingredient',
  });
  return likedingredient;
};