const express = require('express');
const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const clientController = require('../controllers/clientController');
const { validateClient } = require('../utils/validators');

const router = express.Router();

router.get('/clients', asyncHandler(clientController.getAllClients));
router.get('/clients/:id', asyncHandler(clientController.getClientById));
router.get('/clients/:id/edit', asyncHandler(clientController.getClientForEdit));
router.post('/clients', validateClient, asyncHandler((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors: ', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  clientController.createClient(req, res, next);
}));

router.patch('/clients/:id', validateClient, asyncHandler((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors: ', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  clientController.updateClient(req, res, next);
}));
router.delete('/clients/:id', asyncHandler(clientController.deleteClient));

module.exports = router;
