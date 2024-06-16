const knex = require('knex')(require('../config/knexfile').development);
const { hashPassword } = require('../utils/passwordUtils');

// Удаляет поле password из объекта клиента
const removePasswordField = (client) => {
  if (client && client.password) {
    delete client.password;
  }
  return client;
};

// Получает всех клиентов
const getAllClients = async () => {
  const clients = await knex('clients')
    .select('id', 'name', 'email', 'contract_number', 'contract_term', 'created_at', 'updated_at')
    .orderBy('created_at', 'asc');
  return clients.map(removePasswordField);
};

// Получает клиента по ID
const getClientById = async (id) => {
  const client = await knex('clients').where({ id }).first();
  return removePasswordField(client);
};

// Получает клиента для редактирования по ID
const getClientForEdit = async (id) => {
  const client = await knex('clients')
    .select('id', 'name', 'email', 'contract_number', 'contract_term', 'password', 'created_at', 'updated_at')
    .where({ id })
    .first();
  return client;
};

// Создает нового клиента
const createClient = async (clientData) => {
  const { name, email, contract_number, contract_term, password } = clientData;
  const hashedPassword = await hashPassword(password);
  const [newClient] = await knex('clients')
    .insert({ name, email, contract_number, contract_term, password: hashedPassword })
    .returning('*');
  return removePasswordField(newClient);
};

// Обновляет клиента по ID
const updateClient = async (id, clientData) => {
  if (clientData.password) {
    clientData.password = await hashPassword(clientData.password);
  }
  clientData.updated_at = new Date().toISOString();
  const [updatedClient] = await knex('clients')
    .where({ id })
    .update(clientData)
    .returning('*');
  return removePasswordField(updatedClient);
};

// Удаляет клиента по ID
const deleteClient = async (id) => {
  const [deletedClient] = await knex('clients')
    .where({ id })
    .del()
    .returning('*');
  return removePasswordField(deletedClient);
};

module.exports = {
  getAllClients,
  getClientById,
  getClientForEdit,
  createClient,
  updateClient,
  deleteClient,
};
