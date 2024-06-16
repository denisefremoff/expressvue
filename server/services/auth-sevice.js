const models = require("../models/index.js");
const Client = models.Client;
const Manager = models.Manager;
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error.js");
const ClientDto = require("../dtos/client-dto.js");
const ManagerDto = require("../dtos/manager-dto.js");
const tokenService = require("../services/token-service.js");
class AuthService {
  async login(email, password) {
    //-----------------по базе клиентов-------------------
    const client = await Client.findOne({ where: { email } });
    if (client) {
      const isPassEquals = await bcrypt.compare(password, client.password);
      if (isPassEquals) {
        const clientDto = new ClientDto(client);
        const tokens = tokenService.generateTokens({ ...clientDto });
        await tokenService.saveToken(clientDto.email, tokens.refreshToken);
        return { ...tokens, client: clientDto };
      }
      throw ApiError.badRequest("Неверный пароль");
    }

    //-----------------по базе менеджеров-------------------
    const manager = await Manager.findOne({ where: { email } });
    if (manager) {
      const isPassEquals = await bcrypt.compare(password, manager.password);
      if (isPassEquals) {
        const managerDto = new ManagerDto(manager);
        const tokens = tokenService.generateTokens({ ...managerDto });
        await tokenService.saveToken(managerDto.email, tokens.refreshToken);
        return { ...tokens, manager: managerDto };
      }
      throw ApiError.badRequest("Неверный пароль");
    }
    throw ApiError.badRequest("Пользователь не найден");
  }
}

module.exports = new AuthService();
