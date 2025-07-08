import { registerMicroApps, start, initGlobalState } from "qiankun";

export function registerQiankunApps() {
  registerMicroApps([
    {
      name: "vueApp",
      entry: "//localhost:8081",
      container: "#container",
      activeRule: "/wsg-admin/vue-app",
      props: {
        basePath: "/wsg-admin/vue-app",
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
