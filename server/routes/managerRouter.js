const Router = require("express").Router;
const router = new Router();
const managerController = require("../controller/managerController.js");
const validator = require("../validator/validation.js");

router.post(
  "/client-registration",
  // validator.validateRegistration,
  managerController.registrationClient
);
router.delete("/client-delete/:id", managerController.delete);
router.get("/clients", managerController.getClients);
router.get("/client/:id", managerController.getClientById);
router.get("/activate/:link", managerController.activate);
router.get("/:id", managerController.getManagerById);

module.exports = router;
