const clientService = require("../services/manager-services");
class ManagerController {
  async registration(req, res) {
    try {
      const { fullName, email, contract_number, contract_term, password } =
        req.body;
      const client = await clientService.registration(
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
      const clients = await clientService.getClients();
      return res.json(clients);
    } catch (e) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getClientById(req, res) {
    try {
      const client = await clientService.getClientById(req.params.id);
      return res.json(client);
    } catch (e) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ManagerController();
