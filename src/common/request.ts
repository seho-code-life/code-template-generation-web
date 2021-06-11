import axios, { AxiosRequestConfig } from "axios";

// 定义工具后端地址
const url = "http://localhost:8899/";
export default (params: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        ...params,
        url,
      })
      .then((res) => {
        resolve(res);
      });
  });
};
