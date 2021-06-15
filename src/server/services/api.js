const fs = require("fs");
const { projectPath = "/Users/seho/Desktop/纸贵/test-template" } = process.env;

// 递归创建文件，如果路径不存在则直接创建一个新的
const writeFileRecursive = (path, buffer, callback = () => {}) => {
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err);
    fs.writeFile(path, buffer, function(err) {
      if (err) return callback(err);
      return callback(null);
    });
  });
};

module.exports = {
  getApiList: (params) => {
    return new Promise((resolve, reject) => {
      // 如果根目录下没有src或者src下没有api文件夹，都会返回错误
      const fileList = fs.readdirSync(projectPath, "utf-8");
      if (fileList.includes("src")) {
        // 查找api文件夹
        const srcList = fs.readdirSync(projectPath + "/src", "utf-8");
        // 查看src中是否有api文件夹
        if (srcList.includes("api")) {
          // 列出下面所有的文件，仅显示拓展名js和ts的文件
          const suffix = [".js", ".ts"];
          resolve(
            fs.readdirSync(projectPath + "/src/api", "utf-8").filter((file) => {
              return suffix.includes(file.substring(file.lastIndexOf(".")));
            })
          );
        } else {
          reject("src中暂无api文件夹");
        }
      } else {
        reject("根目录暂无src文件夹");
      }
    });
  },

  addApi: async (params) => {
    // 如果没有没有src文件夹或者src中没有api则自动建立
    const { moduleName } = params;
    writeFileRecursive(projectPath + `/src/api/${moduleName}.js`, Buffer("HELLO"))
  },
};
