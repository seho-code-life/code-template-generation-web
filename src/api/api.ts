import request from "@/common/request";


/**
 * @name 获取api列表
 * @returns 
 */
export async function getApiList(): Promise<ActionResult> {
  return new Promise((resolve) => {
    request({
      url: "/api/getApiList",
    }).then((res) => {
      resolve(res);
    });
  });
}

/**
 * @name 添加api
 * @param params 
 * @returns 
 */
export async function addApi(params: {
  moduleName: string,
  generateType: string,
  version: string,
  checkFeatures?: string[]
}): Promise<ActionResult> {
  return new Promise((resolve) => {
    request({
      url: "/api/addApi",
      method: "POST",
      data: {
        ...params
      }
    }).then((res) => {
      resolve(res);
    });
  });
}