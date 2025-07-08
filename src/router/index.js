import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  // 这里的import.meta.env.BASE_URL取值于vite.config.js中的base属性。
  // 只有在生产环境才需要加/h5/前缀访问。
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/components/layout.vue"),
      redirect: "home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
        },
        // 微应用路由配置
        {
          path: "vue-app",
          name: "vueAppContainer",
          component: () => import("@/components/microApp.vue"),
          meta: { title: "微应用容器" },
          children: [
            // 捕获所有微应用子路由
            {
              path: ":pathMatch(.*)*",
              component: () => import("@/components/microApp.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
