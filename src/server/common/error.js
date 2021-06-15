module.exports = (response, msg) => {
  response.status = 500; // 设置返回状态码
  return {
    msg,
  };
};
