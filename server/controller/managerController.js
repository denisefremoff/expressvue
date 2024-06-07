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
}

module.exports = new ManagerController();
