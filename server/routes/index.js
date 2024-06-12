const Router = require("express");
const router = new Router();

const managerRouter = require("./managerRouter.js");
const clientRouter = require("./clientRouter.js");
const adminRouter = require("./adminRouter.js");
// const authRouter = require("./authRouter.js");

router.use("/manager", managerRouter);
router.use("/client", clientRouter);
router.use("/admin", adminRouter);
// router.use("/auth", authRouter);

module.exports = router;
