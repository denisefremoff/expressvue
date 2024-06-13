const Router = require("express").Router;
const router = new Router();
const validator = require("../validator/validation.js");
const Authtorisation = require("../controller/authController.js");

router.post(
  "/",
  //validator.validateAuth,
  Authtorisation.login
);

module.exports = router;
// return res.redirect(process.env.CLIENT_URL);
