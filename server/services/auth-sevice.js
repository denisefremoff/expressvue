const models = require("../models/index.js");
const Client = models.Client;
const Manager = models.Manager;
class AuthService {
  async login(email, password) {
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      const isPassEquals = await bcrypt.compare(password, candidate.password);
      if (isPassEquals) {
        return candidate;
      }
      throw ApiError.BadRequest("Неверный пароль");
    }
    const manager = await Manager.findOne({ where: { email } });
    if (manager) {
      const isPassEquals = await bcrypt.compare(password, manager.password);
      if (isPassEquals) {
        return manager;
      }
      throw ApiError.BadRequest("Неверный пароль");
    }
    throw ApiError.BadRequest("Пользователь не найден");
  }
}

module.exports = new AuthService();
