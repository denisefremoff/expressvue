"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manager.hasMany(models.Client, {
        foreignKey: "managerID",
      });
    }
  }
  Manager.init(
    {
      fullName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      isActivated: DataTypes.BOOLEAN,
      activationLink: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Manager",
    }
  );
  return Manager;
};
