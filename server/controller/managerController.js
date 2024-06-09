const managerService = require("../services/manager-services");
const ApiError = require("../exceptions/api-error.js");
class ManagerController {
  async registration(req, res, next) {
    try {
      const { fullName, email, contract_number, contract_term, password } =
        req.body;
      const client = await managerService.registration(
        fullName,
        email,
        contract_number,
        contract_term,
        password
      );
      return res.json({ message: "Клиент зарегистрирован" });
    } catch (e) {
      next(e);
    }
  }

  async getClients(req, res, next) {
    try {
      const clients = await managerService.getClients();
      return res.json(clients);
    } catch (e) {
      next(e);
    }
  }

  async getClientById(req, res, next) {
    try {
      const client = await managerService.getClientById(req.params.id);
      return res.json(client);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const client = await managerService.destroyClient(id);

      return res.json({ message: "Клиент удален" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ManagerController();
