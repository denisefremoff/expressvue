const clientModel = require('../models/clientModel');
const clientView = require('../views/clientView');

const getAllClients = async (req, res) => {
  try {
    const clients = await clientModel.getAllClients();
    clientView.sendClientsList(res, clients);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    clientView.sendError(res, 'Ошибка сервера');
  }
};

const getClientById = async (req, res) => {
  const clientId = req.params.id;
  try {
    const client = await clientModel.getClientById(clientId);
    if (!client) {
      clientView.sendNotFound(res, 'Клиент не найден');
    } else {
      clientView.sendClient(res, client);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    clientView.sendError(res, 'Ошибка сервера');
  }
};

const createClient = async (req, res) => {
  try {
    const newClient = await clientModel.createClient(req.body);
    res.status(201);
    clientView.sendClient(res, newClient);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    clientView.sendError(res, 'Ошибка сервера');
  }
};

const updateClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClient = await clientModel.updateClient(clientId, req.body);
    if (!updatedClient) {
      clientView.sendNotFound(res, 'Клиент не найден');
    } else {
      clientView.sendClient(res, updatedClient);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    clientView.sendError(res, 'Ошибка сервера');
  }
};

const deleteClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClient = await clientModel.deleteClient(clientId);
    if (!deletedClient) {
      clientView.sendNotFound(res, 'Клиент не найден');
    } else {
      clientView.sendClient(res, deletedClient);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    clientView.sendError(res, 'Ошибка сервера');
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
