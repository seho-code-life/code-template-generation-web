const Router = require("koa-router");
const commonController = require("../controllers/common");
const commonRouter = new Router();


commonRouter.get("/getCurrentProjectUrl", commonController.getCurrentProjectUrl);
commonRouter.get("/getCurrentProjectInfo", commonController.getCurrentProjectInfo);
commonRouter.post("/checkFileExists", commonController.checkFileExists);

// 导出
module.exports = commonRouter;