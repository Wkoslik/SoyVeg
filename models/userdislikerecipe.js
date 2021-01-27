'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userdislikerecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userdislikerecipe.init({
    userId: DataTypes.INTEGER,
    dislikedrecipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userdislikerecipe',
  });
  return userdislikerecipe;
};