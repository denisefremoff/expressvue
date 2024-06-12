const adminService = require("../services/admin-service");
class AdminController {
  async managerRegistration(req, res, next) {
    try {
      const { email, password } = req.body;
      const managerCandidate = await adminService.registrationManager(
        email,
        password
      );
      return res.json({ message: "Регистрация менеджера прошла успешно" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AdminController();
