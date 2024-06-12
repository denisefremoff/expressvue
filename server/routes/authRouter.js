const Router = require("express").Router;
const router = new Router();
const validator = require("../validator/validation.js");
const authController = require("../controller/authController.js");

router.post(
  "/",
  // validator.validateAuth,
  authController.login
);

module.exports = router;
