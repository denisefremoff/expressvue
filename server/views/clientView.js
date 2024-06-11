const sendClientsList = (res, clients) => {
  res.status(200).json(clients);
};

const sendClient = (res, client) => {
  res.status(200).json(client);
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
