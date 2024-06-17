const clientModel = require('../models/clientModel');
const asyncHandler = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');
const AppError = require('../utils/customErrors');
const clientView = require('../views/clientView');

const getAllClients = asyncHandler(async (req, res, next) => {
  try {
    const clients = await clientModel.getAllClients();
    clientView.sendClientsList(res, clients);
  } catch (err) {
    next(new AppError('Не удалось восстановить клиентов', 500));
  }
});

const getClientById = asyncHandler(async (req, res, next) => {
  try {
    const client = await clientModel.getClientById(req.params.id);
    if (!client) {
      return next(new AppError('Клиент не найден', 404));
    }
    clientView.sendClient(res, client);
  } catch (err) {
    next(new AppError('Не удалось получить доступ к клиенту', 500));
  }
});

const getClientForEdit = asyncHandler(async (req, res, next) => {
  try {
    const client = await clientModel.getClientForEdit(req.params.id);
    if (!client) {
      return next(new AppError('Клиент не найден', 404));
    }
    clientView.sendClient(res, client);
  } catch (err) {
    next(new AppError('Не удалось получить клиент для редактирования', 500));
  }
});

const createClient = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const client = await clientModel.createClient(req.body);
    clientView.sendClient(res, client);
  } catch (err) {
    next(new AppError('Не удалось создать клиента', 500));
  }
});

const updateClient = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const client = await clientModel.updateClient(req.params.id, req.body);
    if (!client) {
      return next(new AppError('Клиент не найден', 404));
    }
    clientView.sendClient(res, client);
  } catch (err) {
    next(new AppError('Не удалось обновить клиента', 500));
  }
});

const deleteClient = asyncHandler(async (req, res, next) => {
  try {
    const client = await clientModel.deleteClient(req.params.id);
    if (!client) {
      return next(new AppError('Клиент не найден', 404));
    }
    clientView.sendSuccess(res);
  } catch (err) {
    next(new AppError('Не удалось удалить клиента', 500));
  }
});

module.exports = {
  getAllClients,
  getClientById,
  getClientForEdit,
  createClient,
  updateClient,
  deleteClient,
};

