#!/usr/bin/env node

const program = require("commander");
// 获取版本号
const version = require("../package.json").version;
const chalk = require("chalk");
const warning = chalk.keyword("orange");
// 项目根目录
const projectPath = process.cwd();

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
  .command("start")
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
    console.log(chalk.blue("项目根目录为:", projectPath));
    // 将项目启动的根目录存储
    process.env.projectPath = projectPath;
    const { handleStartClient, handleStartService } = require("./start");
    handleStartService(servicePort); // 开启后端服务
    handleStartClient(clientPort); // 开启前端服务
  });

program
  .command("create")
  .description("初始化项目")
  .action(() => require("./create"));
program
  .command("service")
  .description("仅开启代码生成服务的后端【仅开发调试使用】")
  .action(() => require("./start").handleStartService(servicePort));
program
  .command("client")
  .description("仅开启代码生成服务的前端【仅开发调试使用】")
  .action(() => require("./start").handleStartClient(clientPort));

program.parse(process.argv);
