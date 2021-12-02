const fs = require("fs");
const path = require("path");
const commonService = require("./common");
// util
const { renderFileForEjs, generateFile } = require("../util/file");
const { resolve } = require("path");
const { projectPath = "/Users/seho/Desktop/纸贵/test-template" } = process.env;

// 首字母大写
const firstUpperCase = (str = "") => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};

// 批量生成所需要的文件，class
const _batchGenerateFile = (result, moduleName) => {
  return new Promise(async (resolve, reject) => {
    // 由于files数组是同步生成的，所以生成的顺序和文件名需要和编译模板时候顺序一致
    const paths = [
      "/src/module/api/basicApi.ts",
      `/src/module/${moduleName}Model.ts`,
      `/src/module/api/${moduleName}ModelApi.ts`,
    ];
    for (let i = 0; i < paths.length; i++) {
      try {
        await generateFile(projectPath + paths[i], result[i]);
      } catch (error) {
        reject(error);
      }
    }
  });
};

// 批量编译所需要的模板, class
const _batchCompileTemplate = () => {
  return new Promise(async (resolve, reject) => {
    // 定义一个files队列
    const files = [
      "../template/api/ts/basicApi.ejs",
      "../template/api/ts/model.ejs",
      "../template/api/ts/modelApi.ejs",
    ];
    const result = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const res = await renderFileForEjs(path.resolve(__dirname, files[i]));
        result.length === files.length ? resolve(result) : result.push(res);
      } catch (error) {
        reject(error);
      }
    }
  });
};
// 模板编译成功后，写入文件的操作
const _writeApiFile = (moduleName, generateType, str) => {
  return new Promise(async (resolve, reject) => {
    // 写入模板文件
    const writeTemplateResult = await generateFile(
      projectPath + `/src/api/${moduleName}.js`,
      str
    );
    if (writeTemplateResult.success) {
      if (generateType === "function") {
        resolve();
      }
      // 如果是class类型的api文件
      // 更新最新的basicAPI.ts，拉取需要的模板，apimodel以及实体model
      // 批量编译模板
      _batchCompileTemplate()
        .then(async (compileResult) => {
          // 批量写入模板文件
          try {
            await _batchGenerateFile(compileResult, moduleName);
          } catch (error) {
            // 写入错误
            reject(error);
          }
          // 编译错误
        })
        .catch((error) => reject(error));
    }
    reject(writeTemplateResult.msg); // 生成失败返回的错误
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
    return new Promise(async (resolve, reject) => {
      // 编译模板内容，首先解构参数
      const {
        moduleName,
        moduleCN = "",
        version = "v1",
        generateType = "class",
        checkFeatures = ["create", "delete", "update", "read"],
      } = params;
      // 根据生成方式不同，匹配正确的模板, 下方提供了生成模板需要的变量
      const renderTemplateResult = await renderFileForEjs(
        path.resolve(__dirname, `../template/api/js/${generateType}.ejs`),
        {
          checkFeatures,
          moduleName: {
            capital: firstUpperCase(moduleName),
            lowerCase: moduleName.toLowerCase(),
          },
          moduleCN,
          version,
          url: `${
            version === "" ? "" : "/" + version
          }/${moduleName.toLowerCase()}`,
        }
      );
      if (renderTemplateResult.success) {
        // 写入操作
        _writeApiFile(moduleName, generateType, renderTemplateResult.data)
          .then(() => {
            resolve();
          })
          .catch((err) => reject(err));
      } else {
        reject(renderTemplateResult.msg); // 编译模板失败返回的错误
      }
    });
  },
};
