import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// 图片压缩
import viteImagemin from "vite-plugin-imagemin";
import compression from "vite-plugin-compression";
// 生成包大小的可视化报告
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  return {
    // base: mode === "production" ? "/wsg-admin/" : "/",
    base: "/wsg-admin/",
    resolve: {
      // 导入时想要省略的扩展名列表
      // 默认： ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      vue(),
      VueDevTools(),
      compression(),
      visualizer({ open: true, gzipSize: true, brotliSize: true, template: "treemap" }),
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL("./src/utils/svgIcon/icons", import.meta.url))],
        symbolId: "[name]",
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // 是否自动导入样式，根据你的需求
          }),
        ],
      }),
      viteImagemin({
        // gif压缩配置
        gifsicle: {
          // 优化级别，取值范围1-3。3表示最高级别的优化（最慢但压缩率最高）
          optimizationLevel: 3,
          /* 
          是否生成交错GIF（即渐进式加载）。`false`表示不生成交错GIF。
          交错GIF在加载时先显示低分辨率图像，然后逐渐清晰，但会增加一点文件大小。
          */
          interlaced: false,
        },
        // png压缩配置
        optipng: {
          // 优化级别，取值范围0-7。7表示最高级别的优化（最慢但压缩率最高）
          optimizationLevel: 7,
        },
        // jpeg压缩配置
        mozjpeg: {
          // 图片质量，取值范围0-100。数值越低，压缩率越高，图片质量越差。
          quality: 60,
        },
        // 另一种PNG压缩工具，通常比optipng压缩得更小
        pngquant: {
          // 指定压缩后的质量范围。`[0.8, 0.9]` 表示压缩后的图片质量在80%到90%之间。
          quality: [0.8, 0.9],
          // 压缩速度，取值范围1（最慢但压缩率最高）到11（最快但压缩率最低）。
          speed: 4,
        },
        // 优化SVG矢量图
        svgo: {
          plugins: [
            /* 
            如果启用了`removeViewBox`，则会移除`viewBox`属性。
            但请注意，移除`viewBox`可能会破坏SVG的响应性，因此通常不推荐移除。 
            */
            // {
            //   name: "removeViewBox",
            // },
            // 用于移除空的属性
            {
              name: "removeEmptyAttrs",
              // `active: false`表示不移除空属性
              active: false,
            },
          ],
        },
      }),
    ],
    build: {
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("vue")) {
              } else if (["vue-router", "pinia"].some(pkg => id.includes(pkg))) {
                return "vue";
              } else if (["axios", "lodash"].some(pkg => id.includes(pkg))) {
                return "axios_lodash";
              } else if (id.includes("echarts")) {
                return "echarts";
              } else if (id.includes("ant-design-vue")) {
                return "ant-design-vue";
              } else if (["compressorjs", "cropperjs"].some(pkg => id.includes(pkg))) {
                return "compressor_cropper";
              } else {
                return "vender";
              }
            }
          },
          // 定义入口 chunk 文件的命名格式
          entryFileNames: `assets/[name]-[hash].js`,
          // 定义生成的 chunk 文件的命名格式（除了入口 chunk 和动态导入的 chunk 外)
          chunkFileNames: `assets/[name]-[hash].js`,
          // 定义静态资源文件（如 CSS、图片、字体等）的命名格式。
          assetFileNames: `assets/[name]-[hash].[ext]`,
        },
      },
    },
    server: {
      headers: {
        "access-control-allow-origin": "*",
      },
      port: 8080,
      cors: true,
      open: true,
      origin: "//localhost:8080",
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
