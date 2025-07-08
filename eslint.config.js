import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}"], languageOptions: { globals: globals.browser } },
  /* ts推荐配置 */
  tseslint.configs.recommended,
  /* vue推荐配置 */
  pluginVue.configs["flat/essential"],
  /* prettier配置 */
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  { plugins: { prettier: pluginPrettier }, rules: { "vue/multi-word-component-names": "off" } },
]);
