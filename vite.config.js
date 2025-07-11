import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // base: mode === "production" ? "/wsg-admin/" : "/",
    base: "/wsg-admin/",
    resolve: {
      // 导入时想要省略的扩展名列表
      // 默认： ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      extensions: [".js", ".jsx", ".json"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      vue(),
      VueDevTools(),
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL("./src/utils/svgIcon/icons", import.meta.url))],
        symbolId: "[name]",
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    server: {
      headers: {
        "access-control-allow-origin": "*",
      },
      port: 8080,
      cors: true,
      open: true,
      origin: "//localhost:8081",
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: env.VITE_APP_SERVICE_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/dev-api/, ""),
      //   },
      // },
    },
  };
});
