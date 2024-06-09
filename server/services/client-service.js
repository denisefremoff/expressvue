const models = require("../models/index.js");
const Client = models.Client;
class ClientService {
  async redaction(info) {
    const client = await Client.findOne({
      where: { activationLink: info.activationLink },
    });

    if (!client) {
      throw ApiError.BadRequest("Клиент не найден");
    }
    const clientUpdate = await Client.update(
      { ...info },
      {
        where: { activationLink: info.activationLink },
      }
    );
    return clientUpdate;
  }
}

module.exports = new ClientService();
