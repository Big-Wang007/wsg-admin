import { registerMicroApps, start } from "qiankun";

export function registerQiankunApps(mode) {
  registerMicroApps([
    {
      name: "vueApp",
      entry: mode === "production" ? "//big-wang007.github.io/vue-app/" : "//localhost:8081",
      container: "#container",
      activeRule: "/vue-app",
      props: {
        basePath: "/vue-app",
      },
    },
    // {
    //   name: "reactApp",
    //   entry: "//localhost:8082",
    //   container: "#container",
    //   activeRule: "/react-app",
    // },
  ]);
  start(
    { sandbox: { experimentalStyleIsolation: true } }, // CSS隔离
  );
}
