const clientService = require("../services/client-service.js");
class ClientController {
  async redaction(req, res) {
    const info = req.body;
    try {
      const client = await clientService.redaction(info);
      return res.json(client);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

module.exports = new ClientController();
