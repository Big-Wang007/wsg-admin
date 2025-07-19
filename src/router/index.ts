import { createRouter, /* createWebHistory, */ createWebHashHistory } from "vue-router";

const router = createRouter({
  // 这里的import.meta.env.BASE_URL取值于vite.config.js中的base属性。
  // 只有在生产环境才需要加/h5/前缀访问。
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
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
        {
          path: "power-list-one",
          name: "powerListOne",
          component: () => import("@/views/powerListOne/index.vue"),
          children: [
            {
              path: "virtual-scroll",
              name: "virtualScroll",
              component: () => import("@/views/powerListOne/virtualScroll.vue"),
            },
            {
              path: "compression-and-clip",
              name: "compressionAndClip",
              component: () => import("@/views/powerListOne/compressionAndClip.vue"),
            },
          ],
        },
        // vue微应用路由配置
        {
          path: "vue-app",
          name: "vueAppContainer",
          component: () => import("@/components/microApp.vue"),
          meta: { title: "vue微应用容器" },
          children: [
            // 捕获所有微应用子路由
            {
              path: ":pathMatch(.*)*",
              component: () => import("@/components/microApp.vue"),
            },
          ],
        },
        // react微应用路由配置
        {
          path: "react-app",
          name: "reactAppContainer",
          component: () => import("@/components/microApp.vue"),
          meta: { title: "react微应用容器" },
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
