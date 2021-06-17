import axios, { AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";

// 定义工具后端地址
const baseUrl = `http://localhost:${process.env.servicePort || 8899}`;
export default (params: AxiosRequestConfig): Promise<ActionResult> => {
  const data: ActionResult = {
    success: false,
  };
  return new Promise((resolve, reject) => {
    axios
      .request({
        ...params,
        url: baseUrl + params.url,
      })
      .then((res) => {
        data.success = true;
        data.data = res.data;
        resolve(data);
      })
      .catch((error) => {
        if (error.response.data.msg) {
          // 如果报错有提示语，就弹出提示语
          message.error(error.response.data.msg);
        }
        resolve(data);
      });
  });
};
