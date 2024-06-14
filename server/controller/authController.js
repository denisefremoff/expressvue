const authService = require("../services/auth-sevice.js");
class Authorisation {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const candidateData = await authService.login(email, password);
      res.cookie("refreshToken", candidateData.refreshToken, {
        domain: process.env.CLIENT_URL,
        withCredentials: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ candidateData, message: "вы вошли" });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new Authorisation();
