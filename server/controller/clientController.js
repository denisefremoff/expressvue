const clientService = require("../services/client-service.js");
class ClientController {
  async redaction(req, res, next) {
    try {
      const info = req.body;
      const client = await clientService.redaction(info);
      console.log(client);
      return res.json({ message: "Информация обновлена" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ClientController();
