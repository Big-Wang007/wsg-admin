export default {
  // JS / TS / Vue 先 ESLint 再 Prettier
  "**/*.{js,jsx,mjs,ts,tsx,mts,cts,vue}": filenames => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
  // 其余走 Prettier
  "**/*.{json,html,css,md}": "prettier --write",
};
