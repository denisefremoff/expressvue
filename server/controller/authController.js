const authService = require("../services/auth-service");
class Authorisation {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authService.login(email, password);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new Authorisation();
