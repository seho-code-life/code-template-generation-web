const Router = require("koa-router");
const apiController = require("../controllers/api");
const apiRouter = new Router();


apiRouter.get("/getApiList", apiController.getApiList);
apiRouter.post("/addApi", apiController.addApi);

// 导出
module.exports = apiRouter;