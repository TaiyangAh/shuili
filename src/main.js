import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BaiduMap from "vue-baidu-map";

Vue.config.productionTip = false;

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
Vue.use(BaiduMap, {
  ak: "iKGbffXDnYdmDEkMGaaGLXBfNm2f7Xig",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
