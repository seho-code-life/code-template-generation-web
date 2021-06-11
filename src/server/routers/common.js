const Router = require("koa-router");
const commonController = require("../controllers/common");
const commonRouter = new Router();


commonRouter.get("/getCurrentProjectUrl", commonController.getCurrentProjectUrl);

// 导出
module.exports = commonRouter;