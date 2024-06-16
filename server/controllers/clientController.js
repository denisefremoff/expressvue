const clientModel = require('../models/clientModel');
const clientView = require('../views/clientView');

// get-запрос для страницы список всех клиентов
const getAllClients = async (req, res, next) => {
  try {
    const clients = await clientModel.getAllClients();
    clientView.sendClientsList(res, clients);
  } catch (err) {
    next(err);
  }
};

// get-запрос для страницы одного клиента
const getClientById = async (req, res, next) => {
  try {
    const client = await clientModel.getClientById(req.params.id);
    if (!client) {
      return clientView.sendNotFoundError(res);
    }
    clientView.sendClient(res, client);
  } catch (err) {
    next(err);
  }
};

// get-запрос для заполнения формы на странице редактирования клиента
const getClientForEdit = async (req, res, next) => {
  try {
    const client = await clientModel.getClientForEdit(req.params.id); // Здесь вызывается метод getClientForEdit
    if (!client) {
      return clientView.sendNotFoundError(res);
    }
    clientView.sendClient(res, client);
  } catch (err) {
    next(err);
  }
};

// post-запрос для страницы создания клиента
const createClient = async (req, res, next) => {
  try {
    console.log('Создание клиента с данными: ', req.body);
    const newClient = await clientModel.createClient(req.body);
    console.log('Создан новый клиент:', newClient);
    clientView.sendClient(res, newClient);
  } catch (err) {
    console.error('Ошибка при создании клиента:', err);
    next(err);
  }
};

// patch-запрос для редактирования клиента
const updateClient = async (req, res, next) => {
  try {
    console.log('Updating client with ID:', req.params.id, 'with data: ', req.body);
    const updatedClient = await clientModel.updateClient(req.params.id, req.body);
    if (!updatedClient) {
      return clientView.sendNotFoundError(res);
    }
    clientView.sendClient(res, updatedClient);
  } catch (err) {
    next(err);
  }
};

// delete-запрос для удаления клиента
const deleteClient = async (req, res, next) => {
  try {
    console.log('Deleting client with ID:', req.params.id);
    const deletedClient = await clientModel.deleteClient(req.params.id);
    if (!deletedClient) {
      return clientView.sendNotFoundError(res);
    }
    clientView.sendSuccess(res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllClients,
  getClientById,
  getClientForEdit, // Экспортируем новый метод
  createClient,
  updateClient,
  deleteClient,
};
