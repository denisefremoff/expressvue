const models = require("../models/index.js");
const Client = models.Client;
const uuid = require("uuid");
const bcrypt = require("bcrypt");
class ManagerService {
  async registration(
    fullName,
    email,
    contract_number,
    contract_term,
    password
  ) {
    try {
      const candidate = await Client.findOne({ where: { email } });
      if (candidate) {
        throw new Error(`Пользователь с почтой ${email} уже существует`);
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
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new ManagerService();
