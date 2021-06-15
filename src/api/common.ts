import request from "@/common/request";

/**
 * @name 获取当前项目的信息
 * @returns 
 */
export async function getCurrentProjectInfo(): Promise<ActionResult> {
  return new Promise((resolve) => {
    request({
      url: "common/getCurrentProjectInfo",
    }).then((res) => {
      resolve(res);
    });
  });
}

export async function checkFileExists(params: {
  filePath: string
}): Promise<ActionResult> {
  return new Promise((resolve) => {
    request({
      method: "post",
      url: "common/checkFileExists",
      data: {
        filePath: params.filePath
      }
    }).then((res) => {
      resolve(res);
    });
  });
}