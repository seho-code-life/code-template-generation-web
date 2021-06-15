/**
 * 引入router下的的路由
 */
const Router = require("koa-router");
const router = new Router();
const commonRouter = require("./routers/common");
const apiRouter = require("./routers/api");

// 装载所有子路由
router.use("/common", commonRouter.routes(), commonRouter.allowedMethods());
router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());
module.exports = router;