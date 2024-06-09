const models = require("../models/index.js");
const Client = models.Client;
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error.js");
class ManagerService {
  async registration(
    fullName,
    email,
    contract_number,
    contract_term,
    password
  ) {
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const client = await Client.create({
      fullName,
      email,
      contract_number,
      contract_term,
      password: hashPassword,
      activationLink,
    });
    return client;
  }

  async getClients() {
    const clients = await Client.findAll();
    return clients;
  }
  async getClientById(id) {
    const client = await Client.findOne({ where: { id } });
    if (!client) {
      throw ApiError.BadRequest("Клиент не найден");
    }
    return client;
  }

  async destroyClient(id) {
    const client = await Client.destroy({ where: { id: id } });
    if (!client) {
      throw ApiError.BadRequest("Клиент не найден");
    }
    return client;
  }
}
module.exports = new ManagerService();
