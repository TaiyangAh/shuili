import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {});
};

const routes = [
  {
    // 配置默认路由
    path: "/", 
    redirect: "/userInfo", // 重定向
  },
  {
    path: "/userInfo",
    meta: {
      title: "用户信息填报",
      keepAlive: true,
    },
    component: () => import("@/pages/UserInfoForm.vue"),
  },
  {
    path: "/workCard",
    meta: {
      title: "公告牌信息填报",
      keepAlive: true,
    },
    component: () => import("@/pages/workCardInfo.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
