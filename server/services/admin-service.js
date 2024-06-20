const models = require("../models/index.js");
const Manager = models.Manager;
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/api-error.js");
const mailService = require("./mail-service.js");
class AdminService {
  async registrationManager(email, password) {
    const candidate = await Manager.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest(
        `Пользователь с почтой ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const manadger = await Manager.create({
      // fullName,
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/manager/activate/${activationLink}`
    );
    return { manadger };
  }
}

module.exports = new AdminService();