const Router = require("express").Router;
const router = new Router();
const adminController = require("../controller/adminController.js");
const validator = require("../validator/validation.js");

router.post(
  "/manager-registration",
  // validator.validateRegistration,
  adminController.managerRegistration
);
module.exports = router;
