const Router = require("express").Router;
const router = new Router();
const managerController = require("../controller/managerController.js");
const validator = require("../validator/validation.js");

router.post(
  "/client-registration",
  validator.validateRegistration,
  managerController.registration
);
router.delete("/delete-client/:id", managerController.delete);
router.get("/clients", managerController.getClients);
router.get("/client/:id", managerController.getClientById);

module.exports = router;
