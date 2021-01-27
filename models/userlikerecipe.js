'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userlikerecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userlikerecipe.init({
    userId: DataTypes.INTEGER,
    likedrecipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userlikerecipe',
  });
  return userlikerecipe;
};