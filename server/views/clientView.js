// Отправка списка клиентов
const sendClientsList = (res, clients) => {
  res.status(200).json(clients);
};

// Отправка одного клиента
const sendClient = (res, client) => {
  res.status(200).json(client);
};

// Отправка сообщения об успешном удалении
const sendSuccess = (res) => {
  res.status(200).json({ message: 'Клиент успешно удален' });
};

// Отправка сообщения об ошибке "Клиент не найден"
const sendNotFoundError = (res) => {
  res.status(404).json({ message: 'Клиент не найден' });
};

// Отправка сообщения об ошибке сервера
const sendError = (res, error) => {
  res.status(500).json({ error });
};

module.exports = {
  sendClientsList,
  sendClient,
  sendSuccess,
  sendNotFoundError,
  sendError,
};
