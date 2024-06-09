const managerService = require("../services/manager-services");
class ManagerController {
  async registration(req, res) {
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
      return res.json(client);
    } catch (e) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getClients(req, res) {
    try {
      const clients = await managerService.getClients();
      return res.json(clients);
    } catch (e) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getClientById(req, res) {
    try {
      const client = await managerService.getClientById(req.params.id);
      return res.json(client);
    } catch (e) {
      return res.status(400).json({ message: error.message });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    try {
      const client = await managerService.destroyClient(id);
      return res.json({ message: "Клиент удален" });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new ManagerController();
