const fs = require("fs");
const { projectPath = "/Users/seho/Desktop/纸贵/test-template" } = process.env;
module.exports = {
  getCurrentProjectUrl: async (params) => {
    return process.cwd();
  },
  getCurrentProjectInfo: async (params) => {
    let result = {
      path: projectPath,
      state: "invalid",
    };
    // 读取信息
    const data = fs.readdirSync(projectPath, "utf-8");
    console.log(data)
    // 判断data中是否有package.json
    if (data.includes("package.json")) {
      // 读取package.json中的内容
      const packageInfo = require(projectPath + "/package.json");
      result.state = "pass";
      result.data = packageInfo;
    }
    return result;
  },
  checkFileExists: async (params) => {
    const { filePath } = params;
    console.log("进入如u uuu", projectPath + filePath)
    return fs.existsSync(projectPath + filePath);
  }
};
