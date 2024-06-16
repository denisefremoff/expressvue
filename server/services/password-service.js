const models = require("../models/index.js");
const Client = models.Client;
const Manager = models.Manager;
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error.js");
class Password {
  // ------ функция для проверки подлиности пароля  пользователя ------
  async comparePass(oldpassword, newpassword, email) {
    const client = await Client.findOne({ where: { email } });
    const manager = await Manager.findOne({ where: { email } });
    if (client) {
      const hashPassword = await bcrypt.compare(oldpassword, client.password);
      if (!hashPassword) {
        throw ApiError.badRequest(`Неверный пароль`);
      }
      const hasрPasswordCompare = await bcrypt.compare(
        newpassword,
        client.password
      );
      if (hasрPasswordCompare) {
        throw ApiError.badRequest(`Новый пароль должен отличаться от старого`);
      }
      const hashNewPassword = await bcrypt.hash(newpassword, 5);
      const update = await Client.update(
        { password: hashNewPassword },
        { where: { email } }
      );
      return { update };
    }
    if (manager) {
      const hashPassword = await bcrypt.compare(oldpassword, client.password);
      if (!hashPassword) {
        throw ApiError.badRequest(`Неверный пароль`);
      }
      const hasрPasswordCompare = await bcrypt.compare(
        newpassword,
        client.password
      );
      if (hasрPasswordCompare) {
        throw ApiError.badRequest(`Новый пароль должен отличаться от старого`);
      }
      const hashNewPassword = await bcrypt.hash(newpassword, 5);
      const update = await Manager.update(
        { password: hashNewPassword },
        { where: { email } }
      );
      return { update };
    }
    throw ApiError.badRequest(`Пользователь не найден.`);
  }
}
module.exports = new Password();
