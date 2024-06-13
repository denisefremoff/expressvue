const models = require("../models/index.js");
const Client = models.Client;
const Manager = models.Manager;
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error.js");
class AuthService {
  async login(email, password) {
    const client = await Client.findOne({ where: { email } });
    if (client) {
      const isPassEquals = await bcrypt.compare(password, client.password);
      if (isPassEquals) {
        return client;
      }
      throw ApiError.badRequest("Неверный пароль");
    }
    const manager = await Manager.findOne({ where: { email } });
    if (manager) {
      const isPassEquals = await bcrypt.compare(password, manager.password);
      if (isPassEquals) {
        return manager;
      }
      throw ApiError.badRequest("Неверный пароль");
    }
    throw ApiError.badRequest("Пользователь не найден");
  }
}

module.exports = new AuthService();
