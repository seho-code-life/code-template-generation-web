const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./router");
const app = new Koa();
const chalk = require("chalk");
// 通过参数获取到运行端口
let { PORT: port } = process.env;
// 使用路由
app.use(router.routes()).use(router.allowedMethods());
app.use(bodyParser());

app.on("error", function(err, ctx) {
  console.log("server error", err);
}); //监听错误信息

function handleListenCallback() {
  console.log(
    chalk.green(`代码生成工具后端服务已开启 at http://localhost:${port} 🎉🎉🎉`)
  );
  console.log(chalk.green("代码生成工具前端GUI服务开启中..."));
}
app
  .listen(port, () => handleListenCallback)
  .on("error", (error) => {
    if (error.message.indexOf("address already in use")) {
      // 端口+1，重新listen
      port++;
      app.listen(port, handleListenCallback)
    }
  });
module.exports = app;
