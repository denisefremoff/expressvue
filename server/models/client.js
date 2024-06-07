"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Client.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      contract_number: DataTypes.STRING,
      contract_term: DataTypes.STRING,
      password: DataTypes.STRING,
      managerID: DataTypes.INTEGER,
      role: DataTypes.STRING,
      isActivated: DataTypes.BOOLEAN,
      activationLink: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
