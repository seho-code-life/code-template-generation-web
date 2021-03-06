import request from "@/common/request";

export default class BasicApi {
    constructor(data) {
      const { version = "", moduleName } = data;
      this.url = `${version === "" ? "" : "/" + version}/${moduleName}`;
    }
    /**
     * @name 新增数据
     * @params {Object} params - 需要新增的数据结构体
     * @description This code is completed by the generator (create)
     * @returns Data
     */
    async create(params) {
      return new Promise((resolve) => {
        request({
          method: "POST",
          url: this.url,
          data: params
        }).then((res) => {
          resolve(res);
        });
      });
    }
    /**
     * @name 删除指定资源
     * @params {Object} params - 删除指定资源API的参数
     * @params {string} params.id - 资源ID
     * @description This code is completed by the generator (update)
     * @returns Data
     */
    async deleteByID(params) {
      return new Promise((resolve) => {
        request({
          method: "DELETE",
          url: this.url + `/${params.id}`
        }).then((res) => {
          resolve(res);
        });
      });
    }
    /**
     * @name 修改指定资源
     * @params {Object} params - 修改指定资源API的参数
     * @params {string} params.id - 资源ID
     * @description This code is completed by the generator (update)
     * @returns Data
     */
    async update(params) {
      return new Promise((resolve) => {
        request({
          method: "PATCH",
          url: this.url + `/${params.id}`,
          data: params
        }).then((res) => {
          resolve(res);
        });
      });
    }
    /**
     * @name 获取列表数据
     * @description This code is completed by the generator (read)
     * @returns List<Data>
     */
    async read() {
      return new Promise((resolve) => {
        request({
          method: "GET",
          url: this.url
        }).then((res) => {
          resolve(res);
        });
      });
    }
    /**
     * @name 获取指定资源
     * @params {Object} params - 获取指定资源API的参数
     * @params {string} params.id - 资源ID
     * @description This code is completed by the generator (read)
     * @returns Data
     */
    async readByID(params) {
      return new Promise((resolve) => {
        request({
          method: "GET",
          url: this.url + `/${params.id}`
        }).then((res) => {
          resolve(res);
        });
      });
    }
  }
  