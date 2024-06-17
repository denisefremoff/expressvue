const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const clientController = require('../controllers/clientController');
const { validateClient } = require('../utils/validators');

const router = express.Router();

router.get('/clients', asyncHandler(clientController.getAllClients));
router.get('/clients/:id', asyncHandler(clientController.getClientById));
router.get('/clients/:id/edit', asyncHandler(clientController.getClientForEdit));
router.post('/clients', validateClient, asyncHandler(clientController.createClient));
router.patch('/clients/:id', validateClient, asyncHandler(clientController.updateClient));
router.delete('/clients/:id', asyncHandler(clientController.deleteClient));

module.exports = router;
