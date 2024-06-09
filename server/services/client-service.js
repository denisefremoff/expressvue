const models = require("../models/index.js");
const Client = models.Client;
class ClientService {
  async redaction(info) {
    try {
      const client = await Client.update(
        { ...info },
        {
          where: { activationLink: info.activationLink },
        }
      );

      return client;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ClientService();
