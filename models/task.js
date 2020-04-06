'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const { Model } = sequelize.Sequelize

  class Task extends Model {

  }

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Title cannot be empty"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Category cannot be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: "Task"
  })

  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};