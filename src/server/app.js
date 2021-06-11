const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./router");

const app = new Koa();

// 使用路由
app.use(router.routes()).use(router.allowedMethods());
app.use(bodyParser());

app.on("error", function (err, ctx) {
  console.log("server error", err);
}); //监听错误信息

app.listen(8899, () => {
  console.warn("代码生成工具后端服务已开启 at http://localhost:8899 🎉🎉🎉"); //监控3000端口
});

module.exports = app;
