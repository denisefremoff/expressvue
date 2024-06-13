const authService = require("../services/auth-sevice.js");
class Authorisation {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      console.log(user);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new Authorisation();
