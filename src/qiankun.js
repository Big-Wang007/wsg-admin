import { registerMicroApps, start } from "qiankun";

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
    {
      name: "reactApp",
      entry: "//localhost:8082",
      container: "#container",
      activeRule: "/wsg-admin/react-app",
      props: {
        basePath: "/wsg-admin/react-app",
      },
      loader: loading => console.log(loading), // 可选，加载状态
      excludeAssetFilter: assetUrl => {
        // 排除特定资源，返回true表示该资源不被import-html-entry处理
        // 这里我们排除`/@react-refresh`相关的资源
        return assetUrl.includes("/@react-refresh");
      },
    },
  ]);
  start(
    {
      sandbox: {
        experimentalStyleIsolation: true,
        excludeAssetFilter: assetUrl => {
          // 排除React Refresh资源
          return assetUrl.includes("/@react-refresh") || assetUrl.includes("react-refresh");
        },
      },
    }, // CSS隔离
  );
}
