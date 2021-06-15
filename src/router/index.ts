import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "Welcome",
    path: "/",
    component: import("../views/Index/welcome.vue")
  },
  {
    name: "Start",
    path: "/start",
    component: import("../views/Index/start.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
