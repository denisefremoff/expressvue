const Router = require("express").Router;
const router = new Router();
const managerController = require("../controller/managerController.js");

router.post("/client-registration", managerController.registration);
router.get("/clients", managerController.getClients);
router.get("/client/:id", managerController.getClientById);

module.exports = router;
