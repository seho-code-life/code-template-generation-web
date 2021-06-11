const commonService = require("../services/common")
module.exports = {
  getCurrentProject: async (ctx, next) => {
    ctx.response.body = await commonService.getCurrentProject(ctx.request.body)
  },
};
