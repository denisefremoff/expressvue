const jwt = require("jsonwebtoken");
const models = require("../models/index.js");
const Client = models.Client;
const Manager = models.Manager;
const ApiError = require("../exceptions/api-error.js");
//const manadgerToken = models.Manadger;

class TokenService {
  // ---------генерация рефреш и аксес токена
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  // ----- валидация аксес токена
  // validateAccessToken(token) {
  //   try {
  //     const clientData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  //     return clientData;
  //   } catch (e) {
  //     throw ApiError.badRequest(`Неверный токен`, e.message);
  //   }
  // }
  // -----валидация рефреш токена
  // validateRefreshToken(token) {
  //   try {
  //     const clientData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  //     return clientData;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  // -----сохранени токена в бд
  async saveToken(email, refreshToken) {
    const client = await Client.findOne({ where: { email } });
    const manager = await Manager.findOne({ where: { email } });
    if (client) {
      client.refreshToken = refreshToken;
      return client.save();
    }
    if (manager) {
      manager.refreshToken = refreshToken;
      return manager.save();
    }
  }
  // const token = await Client.update(
  //   { refreshToken: refreshToken },
  //   { where: { email } }
  // );
  // return token;
  // ------- удаление токена из бд
  // async removeToken(refreshToken) {
  //   const tokenData = await Client.findOne({ where: { refreshToken } });
  //   if (tokenData) {
  //     tokenData.refreshToken = null;
  //     return tokenData.save();
  //   }
  // }

  // ------- поиск пользавателя по токену
  // async findToken(refreshToken) {
  //   const tokenData = await Client.findOne({
  //     where: { refreshToken },
  //   });
  //   return tokenData;
  // }

  // ------- токен для сброса пароля
  // resetToken(email) {
  //   const resToken = jwt.sign({ email }, process.env.JWT_RESET_SECRET, {
  //     expiresIn: "10m",
  //   });
  //   return resToken;
  // }

  // ------- валидация токена для сброса пароля
  // validateResetToken(token) {
  //   try {
  //     const validToken = jwt.verify(token, process.env.JWT_RESET_SECRET);
  //     return validToken;
  //   } catch (e) {
  //     throw ApiError.badRequest(`Неверный токен`, e.message);
  //   }
  // }
}

module.exports = new TokenService();
