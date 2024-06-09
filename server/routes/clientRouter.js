const Router = require("express").Router;
const router = new Router();
const clientController = require("../controller/clientController.js");

router.patch("/redaction", clientController.redaction);

module.exports = router;
