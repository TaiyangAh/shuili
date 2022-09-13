const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: "http://192.168.8.24:8000", //本地测试环境
    // proxy: "http://116.162.54.187:8081", //线上环境
    proxy: {
      "/river/": {
        target: "http://116.162.54.187/", //目标路径
        changeOrigin: true, //是否跨域
      },
    },
  },
});
