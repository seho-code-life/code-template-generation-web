const apiService = require("../services/api");
const Error = require("../common/error");
module.exports = {
  getApiList: async (ctx, next) => {
    try {
      ctx.response.body = await apiService.getApiList(ctx.request.body);
    } catch (error) {
      ctx.response.body = Error(ctx.response, error);
    }
  },
  addApi: async (ctx) => {
    try {
      ctx.response.body = await apiService.addApi(ctx.request.body);
    } catch (error) {
      ctx.response.body = Error(ctx.response, error);
    }
  }
};
