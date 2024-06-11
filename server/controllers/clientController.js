const clientModel = require('../models/clientModel');

const getAllClients = async (req, res) => {
  try {
    const clients = await clientModel.getAllClients();
    res.json(clients);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
};

const getClientById = async (req, res) => {
  const clientId = req.params.id;
  try {
    const client = await clientModel.getClientById(clientId);
    if (!client) {
      res.status(404).send('Клиент не найден');
    } else {
      res.json(client);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
};

const createClient = async (req, res) => {
  try {
    const newClient = await clientModel.createClient(req.body);
    res.status(201).json(newClient);
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
};

const updateClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClient = await clientModel.updateClient(clientId, req.body);
    if (!updatedClient) {
      res.status(404).send('Клиент не найден');
    } else {
      res.json(updatedClient);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
};

const deleteClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClient = await clientModel.deleteClient(clientId);
    if (!deletedClient) {
      res.status(404).send('Клиент не найден');
    } else {
      res.json(deletedClient);
    }
  } catch (err) {
    console.error('Ошибка при выполнении запроса к базе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
