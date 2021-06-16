import BasicApi from "./basicApi";

class File extends BasicApi {
  constructor() {
    super({
      version: "v1",
      moduleName: "file"
    });
  }
}

export default File;
