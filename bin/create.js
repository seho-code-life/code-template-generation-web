#!/usr/bin/env node

const inquirer = require("inquirer");
const ora = require("ora");
const fs = require("fs");
const download = require("download-git-repo");
const chalk = require("chalk");
const spinner = ora("下载模板中, 请稍后");

// 模板字典
const template = [
  {
    name: "Vue3 + Vite2 + TypeScript + Antdesign (PC)",
    value: "gitlab:gitlab.ziggurat.cn:shenhao/vue3-vite2-ts-template",
  },
];

// 修改下载好的模板package.json
const editFile = function({ projectName }) {
  // 读取文件
  fs.readFile(`${process.cwd()}/${projectName}/package.json`, (err, data) => {
    if (err) throw err;
    // 获取json数据并修改项目名称和版本号
    let _data = JSON.parse(data.toString());
    _data.name = projectName;
    let str = JSON.stringify(_data, null, 4);
    // 写入文件
    fs.writeFile(`${process.cwd()}/${projectName}/package.json`, str, function(
      err
    ) {
      if (err) throw err;
    });
    spinner.text = `下载成功, 请进入${projectName}目录下运行 seho start 开始代码生成之旅~`;
    spinner.succeed();
  });
};

// 下载模板
const downloadTemplate = function({ repository, projectName }) {
  download(repository, projectName, (err) => {
    if (!err) {
      editFile({ projectName });
    } else {
      console.log(err);
      spinner.stop(); // 停止
      console.log(chalk.red("拉取模板出现未知错误"));
    }
  });
};
// 定义问题列表
const questions = [
  {
    type: "input",
    name: "projectName",
    message: "项目文件夹名称:",
    validate(val) {
      if (!val) {
        // 验证一下输入是否正确
        return "请输入文件名";
      }
      if (fs.existsSync(val)) {
        // 判断文件是否存在
        return "文件已存在";
      } else {
        return true;
      }
    },
  },
  {
    type: "list",
    name: "template",
    choices: template,
    message: "请选择要拉取的模板",
  },
];

inquirer.prompt(questions).then((answers) => {
  // 获取答案
  const { template: templateUrl, projectName } = answers;
  spinner.start();
  spinner.color = "green";
  // 开始下载模板
  downloadTemplate({
    repository: templateUrl,
    projectName,
  });
});
