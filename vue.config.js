const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://192.168.139.1:8000", //本地测试环境
    // proxy: "http://116.162.54.187:8000", //线上环境
  },
});
