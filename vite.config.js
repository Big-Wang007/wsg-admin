import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
  const DRIVE_LETTER_REGEX = /^[a-z]:/i;
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
    build: {
      outDir: "dist",
      minify: false, // 不压缩代码
      sourcemap: true, // 生成sourcemap
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // input: {
        //   index: index.html,
        // },
        output: {
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          // TODO: 处理GitHub Pages 部署 _plugin-vue_export-helper.js 404
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          sanitizeFileName(name) {
            const match = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter = match ? match[0] : "";
            // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
            // Otherwise, avoid them because they can refer to NTFS alternate data streams.
            return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return (
                id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups.moduleName ?? "vender"
              );
            }
          },
        },
      },
    },
    server: {
      headers: {
        "access-control-allow-origin": "*",
      },
      // host: "//big-wang007.github.io",
      port: 8080,
      cors: true,
      open: true,
      // origin: "//big-wang007.github.io:8081",
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
