import { registerMicroApps, start } from "qiankun";

export function registerQiankunApps() {
  registerMicroApps([
    {
      name: "vueApp",
      entry: "//big-wang007.github.io/vue-app/",
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
