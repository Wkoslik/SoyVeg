'use strict';
const bcrypt= require('bcrypt');
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
      //models.user.hasMany(models.userlikeingredient); //switch this to belongs to mang likedingredient through userlikedingredient
      models.user.belongsToMany(models.likedingredient, {through: "userlikeingredient"});
      models.user.belongsToMany(models.likedrecipe, {through: "userlikerecipe"});
      models.user.belongsToMany(models.dislikedingredient, {through: "userdislikeingredient"});
      models.user.belongsToMany(models.dislikedrecipe, {through: "userdislikerecipe"});
    }

    validPassword(typedPassword) {
      let isValid = bcrypt.compareSync(typedPassword, this.password);//returns a boolean
      return isValid;
    }

    toJSON(){
      let userData = this.get(); //gets all of the data 
      delete userData.password;
      return userData;
    }
  };
  user.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        },
        notContains: {
          args: this.name,
          msg: 'password cannot contain your name'
        }
      }
    },
    age: DataTypes.INTEGER,
    pronouns: DataTypes.STRING,
    nutrition_preference: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (pendingUser, options) =>{
        //check if there is a user being pass AND that that user has a password
        if(pendingUser && pendingUser.password){
        //hash the password
        let hash = bcrypt.hashSync(pendingUser.password, 12);
        //store the hash as the users password
        pendingUser.password = hash;
        }
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};