const Router = require("express").Router;
const router = new Router();
const managerController = require("../controller/managerController.js");

router.post("/client-registration", managerController.registration);
// app.get("/clients", clientController);
// app.get("/clients/:id");

module.exports = router;
