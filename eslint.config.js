import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 忽略目录
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  // JS 推荐规则
  js.configs.recommended,
  // 全局环境
  {
    languageOptions: {
      globals: {
        ...globals.browser, // window, document, fetch …
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  // TypeScript 推荐规则（作用于 .ts/.tsx）
  ...tseslint.configs.recommended,
  // Vue 基础规则
  pluginVue.configs["flat/essential"],
  // Vue 文件中启用 TS 解析器
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: pluginVue.parsers,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  // Prettier 放在最后
  eslintPluginPrettierRecommended,
]);
