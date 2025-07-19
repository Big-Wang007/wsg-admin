import "./assets/style/normalize.css";
import "./assets/style/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import { setupI18n } from "./lang/index";
import { initI18n } from "./utils/utils";

// 按需异步加载i18n
const I18n = setupI18n();
initI18n(I18n);

import VueVirtualScroller from "vue-virtual-scroller";

// 使用svg
import "virtual:svg-icons-register";
import SvgIcon from "./utils/svgIcon/index.vue";

import "@/api/mock/list.js";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(I18n);
app.component("svg-icon", SvgIcon);
app.use(VueVirtualScroller);
app.mount("#app");
