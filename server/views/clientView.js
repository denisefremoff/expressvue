const sendClientsList = (res, clients) => {
  res.json(clients);
};

const sendClient = (res, client) => {
  res.json(client);
};

const sendError = (res, error) => {
  res.status(500).send({ error });
};

const sendNotFound = (res, message) => {
  res.status(404).send({ message });
};

module.exports = {
  sendClientsList,
  sendClient,
  sendError,
  sendNotFound,
};
