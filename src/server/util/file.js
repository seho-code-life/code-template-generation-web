const ejs = require("ejs");
const fs = require("fs");

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
  // 编译ejs模板
  renderFileForEjs: (path, data = {}, opts = {}) => {
    const result = { success: true };
    return new Promise((resolve) => {
      ejs.renderFile(path, data, opts, (pullError, pullStr) => {
        // 拉取错误
        if (pullError) {
          result.success = false;
          result.msg = JSON.stringify(pullError);
        } else {
          result.data = pullStr;
        }
        resolve(result);
      });
    });
  },
  // 生成文件
  generateFile: (path, str) => {
    const result = { success: true };
    return new Promise((resolve) => {
      writeFileRecursive(path, Buffer.from(str), async (writeError) => {
        if (writeError) {
          result.success = false;
          result.msg = JSON.stringify(writeError);
        }
        resolve(result);
      });
    });
  },
};
