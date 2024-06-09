const Router = require("express");
const router = new Router();

const managerRouter = require("./managerRouter.js");
const clientRouter = require("./clientRouter.js");

router.use("/manager", managerRouter);
router.use("/client", clientRouter);

module.exports = router;
