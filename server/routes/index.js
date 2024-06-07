const Router = require("express");
const router = new Router();

const managerRouter = require("./managerRouter.js");

router.use("/manager", managerRouter);

module.exports = router;
