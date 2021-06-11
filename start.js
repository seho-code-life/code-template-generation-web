#!/usr/bin/env node

// 引入助手
const program = require("commander");
// 获取版本号
const version = require("./package.json").version;
const chalk = require("chalk");
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const child_process = require("child_process");

// 输入-v， --version查看当前工具的版本
program
  .version(version, "-v, --version")
  .description("查看当前版本号")
  .option("-sp, --servicePort [8888]", "工具后端服务端口，默认8899", 8899)
  .option("-cp, --clientPort [8080]", "工具前端GUI端口，默认8080", 8080);

program.parse(process.argv);
const { servicePort, clientPort } = program.opts();
// 解构option数据
program
  .command("serve")
  .description("开启代码生成在线服务")
  .action(() => {
    console.log(
      warning(`
      代码生成工具🔧运行中...
      version: ${version}
      请使用命令-v检查工具是否是最新版本
      如果不是最新版本，立即前往 https://npm.registry.xian.develop.zhigui.com/-/web/detail/code-template-generation-web 进行更新
    `)
    );
    // 执行命令的设置
    const execOption = {
      cwd: __dirname,
    }
    console.log(chalk.blue("项目根目录为:", process.cwd()));
    const clientProcess = child_process.exec(`npm run dev -- --port ${clientPort}`, execOption);
    const serviceProcess = child_process.exec(`cross-env PORT=${servicePort} node src/server/app.js}`, execOption);
    clientProcess.stdout.on("data", function(data) {console.warn(data);});
    clientProcess.stderr.on("data", function(data) {error(data)});
    serviceProcess.stdout.on("data", function(data) {console.warn(data);});
    serviceProcess.stderr.on("data", function(data) {error(data)});
  });

program.parse(process.argv);
