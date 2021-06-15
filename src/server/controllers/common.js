const commonService = require("../services/common");
const Error = require("../common/error");
module.exports = {
  // 获取命令运行的项目根路径
  getCurrentProjectUrl: async (ctx, next) => {
    ctx.response.body = await commonService.getCurrentProjectUrl(
      ctx.request.body
    );
  },
  // 获取命令运行的项目信息
  getCurrentProjectInfo: async (ctx) => {
    ctx.response.body = await commonService.getCurrentProjectInfo(
      ctx.request.body
    );
  },
  // 检查文件是否存在
  checkFileExists: async (ctx) => {
    // 参数校验
    const { filePath } = ctx.request.body;
    if (filePath) {
      ctx.response.body = await commonService.checkFileExists(ctx.request.body);
    } else {
      ctx.response.body = Error(ctx.response, "filePath必传");
    }
  },
};
