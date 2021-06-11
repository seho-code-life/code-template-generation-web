const Router = require("koa-router");
const commonController = require("../controllers/common");
const commonRouter = new Router();


commonRouter.get("/getCurrentProject", commonController.getCurrentProject);

// 导出
module.exports = commonRouter;