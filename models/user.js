'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const { Model } = sequelize.Sequelize
  const { encryptPass } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: false,
          msg: "Please enter valid email"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate(user, options) {
        user.password = encryptPass(user.password)
      }
    }
  })
  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};