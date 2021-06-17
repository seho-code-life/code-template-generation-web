#!/usr/bin/env node

const chalk = require("chalk");
const error = chalk.bold.red;
const child_process = require("child_process");
// 执行命令的设置
const execOption = {
  cwd: __dirname,
};

module.exports = {
  // 开启后端服务
  handleStartService: (servicePort) => {
    // 设置后端服务端口
    process.env.servicePort = servicePort;
    const serviceProcess = child_process.exec(
      `npm run service:production`,
      execOption
    );
    serviceProcess.stdout.on("data", function(data) {
      console.warn(data);
    });
    serviceProcess.stderr.on("data", function(data) {
      error(data);
    });
  },
  // 开启前端GUI服务
  handleStartClient: (clientPort) => {
    const clientProcess = child_process.exec(
      `npm run dev -- --port ${clientPort}`,
      execOption
    );
    clientProcess.stdout.on("data", function(data) {
      console.warn(data);
    });
    clientProcess.stderr.on("data", function(data) {
      error(data);
    });
  },
};
