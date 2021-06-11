const commonService = require("../services/common")
module.exports = {
  getCurrentProjectUrl: async (ctx, next) => {
    ctx.response.body = await commonService.getCurrentProjectUrl(ctx.request.body)
  },
};