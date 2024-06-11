const models = require("../models/index.js");
const Client = models.Client;
class ClientService {
  async redaction(info) {
    const clientUpdate = await Client.update(
      { ...info },
      {
        where: { activationLink: info.activationLink },
      }
    );
    if (!clientUpdate) {
      throw ApiError.BadRequest("Клиент не найден");
    }
    return clientUpdate;
  }
}
module.exports = new ClientService();
