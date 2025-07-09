import { registerMicroApps, start } from "qiankun";

export function registerQiankunApps() {
  registerMicroApps([
    {
      name: "vueApp",
      entry: "//localhost:8081",
      container: "#container",
      activeRule: location => {
        const active = location.hash.startsWith("#/vue-app");
        console.log("乾坤activeRule匹配：", location, active);
        return "#/vue-app";
      },
      props: {
        // 传递basePath，注意：这里应该传递hash路由的base路径，即#号后面的部分的前缀
        basePath: "/vue-app/", // 注意：以斜杠开头，没有#号
      },
    },
  ]);
  start({
    sandbox: { experimentalStyleIsolation: true }, // CSS隔离
    lifeCycles: {
      beforeLoad: app => console.log("[qiankun] before load", app),
      beforeMount: app => console.log("[qiankun] before mount", app),
      afterMount: app => console.log("[qiankun] after mount", app),
      beforeUnmount: app => console.log("[qiankun] before unmount", app),
    },
    errorHandler: error => {
      console.error("[Qiankun] 全局错误", error);
    },
  });
}
