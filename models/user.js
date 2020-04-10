'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const { Model } = sequelize.Sequelize
  const { encryptPass } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        },
        isEmail: {
          args: false,
          msg: "Please enter valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null"
        },
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