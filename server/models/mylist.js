"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class myList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      myList.belongsTo(models.book, {
        as: "myBook",
        foreignKey: {
          name: "idBook",
        },
      });

      myList.belongsTo(models.user, {
        as: "me",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  myList.init(
    {
      idUser: DataTypes.INTEGER,
      idBook: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "myList",
    }
  );
  return myList;
};
