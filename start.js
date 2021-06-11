#!/usr/bin/env node

// 引入助手
const program = require("commander");
// 获取版本号
const version = require("./package.json").version;

// 输入-v， --version查看当前工具的版本
program.version(version, "-v, --version").description("查看当前版本号");

program
  .command("dev")
  .description("开启代码生成在线服务")
  .action((command) => {
    const child_process = require("child_process");
    const workerProcess = child_process.exec("npm run serve", {
      cwd: __dirname,
    });
    workerProcess.stdout.on("data", function(data) {
      console.warn(data);
    });
    workerProcess.stderr.on("data", function(data) {
      console.log(data)
      // if (data.indexOf("vue-cli-service: command not found") >= 0) {
      //   console.log(
      //     "tips: 检测到未安装部分依赖，正在自动执行安装依赖的命令，请稍后"
      //   );
      // } else {
      //   console.warn("出错", data);
      // }
    });
  });

program.parse(process.argv);
