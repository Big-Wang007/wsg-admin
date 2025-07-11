const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/layout-DytZK7_g.js","assets/vue-router-DoFbvi5_.js","assets/@vue-D-mnPpXN.js","assets/vue-i18n-Vcz8nxxl.js","assets/@intlify-6TXC-gFd.js","assets/plugin-vueexport-helper-1tPrXgE0.js","assets/@ant-design-tMLE6zg2.js","assets/@ctrl-i2BXpzPC.js","assets/ant-design-vue-CxifP5iN.js","assets/@babel-BH5WFgda.js","assets/lodash-es-B3klq8D0.js","assets/resize-observer-polyfill-C80vHMkG.js","assets/dayjs-LsVTM95D.js","assets/vue-types-Bu_jFbQT.js","assets/dom-align-C8FpptQ1.js","assets/@emotion-D9dI_Y91.js","assets/stylis-Bw1ygUgA.js","assets/qiankun-DFwBr9iv.js","assets/lodash-KqrOsjaQ.js","assets/single-spa-BhgqiMF-.js","assets/import-html-entry-DDVcqYXZ.js","assets/layout-D2BGL4kf.css","assets/index-kcKoOdN0.js","assets/axios-CAnGA6pv.js","assets/echarts-EVDkv5SO.js","assets/zrender-Bhf3wa3H.js","assets/index-DdMwi49-.css","assets/microApp-C5GSFSrk.js"])))=>i.map(i=>d[i]);
import { n as nextTick, r as ref, w as watch, R as createBlock, u as unref, S as resolveComponent, U as openBlock, V as withCtx, c as createVNode, j as computed, W as createElementBlock, X as createBaseVNode, Y as normalizeStyle, Z as createApp } from "./@vue-D-mnPpXN.js";
import { c as createPinia } from "./pinia-3T1y7YGo.js";
import { l as localeValues, a as localeValues$1, C as ConfigProvider, B as Button, L as Layout, D as Dropdown, A as Avatar, S as Statistic, _ as __unplugin_components_1, T as Tabs, R as RangePicker } from "./ant-design-vue-CxifP5iN.js";
import { d as dayjs } from "./dayjs-LsVTM95D.js";
import { c as createI18n, u as useI18n } from "./vue-i18n-Vcz8nxxl.js";
import { c as createRouter, a as createWebHashHistory } from "./vue-router-DoFbvi5_.js";
import { M as Mock } from "./mockjs-DBu4vKV9.js";
import "./@babel-BH5WFgda.js";
import "./lodash-es-B3klq8D0.js";
import "./resize-observer-polyfill-C80vHMkG.js";
import "./@ant-design-tMLE6zg2.js";
import "./@ctrl-i2BXpzPC.js";
import "./vue-types-Bu_jFbQT.js";
import "./dom-align-C8FpptQ1.js";
import "./@emotion-D9dI_Y91.js";
import "./stylis-Bw1ygUgA.js";
import "./@intlify-6TXC-gFd.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/wsg-admin/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p$1) => Promise.resolve(p$1).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v = glob$1[path$13];
  if (v) return typeof v === "function" ? v() : Promise.resolve(v);
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
const options = {
  legacy: false,
  locale: "zh",
  fallbackLocale: "zh"
};
const i18n = createI18n(options);
function setupI18n() {
  setI18nLanguage(i18n, options?.locale ?? "zh");
  return i18n;
}
function setI18nLanguage(i18n2, locale) {
  if ("mode" in i18n2 && i18n2.mode === "legacy") {
    i18n2.global.locale = locale;
  } else {
    i18n2.global.locale.value = locale;
  }
  document.querySelector("html")?.setAttribute("lang", locale);
}
async function loadLocaleMessages(i18n2, locale) {
  const localFilename = locale.split("-")[0];
  const messages = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./locales/en.json": () => __vitePreload(() => import("./en-Dn47ZHrY.js"), true ? [] : void 0), "./locales/zh.json": () => __vitePreload(() => import("./zh-Du-Y6_o-.js"), true ? [] : void 0) }), `./locales/${localFilename}.json`, 3);
  i18n2.global.setLocaleMessage(locale, { ...messages });
  return nextTick();
}
const _sfc_main$1 = {
  __name: "App",
  setup(__props) {
    dayjs.locale("zh-cn");
    const lang = ref("zh");
    const { locale } = useI18n();
    watch(
      () => locale.value,
      (val) => {
        console.log(val);
        if (val === "en") {
          dayjs.locale("en-us");
          lang.value = "en";
          loadLocaleMessages(i18n, lang.value);
        } else {
          dayjs.locale("zh-cn");
          lang.value = "zh";
          loadLocaleMessages(i18n, lang.value);
        }
      },
      { deep: true }
    );
    return (_ctx, _cache) => {
      const _component_RouterView = resolveComponent("RouterView");
      const _component_a_config_provider = ConfigProvider;
      return openBlock(), createBlock(_component_a_config_provider, {
        locale: lang.value === "en" ? unref(localeValues) : unref(localeValues$1)
      }, {
        default: withCtx(() => [
          createVNode(_component_RouterView)
        ]),
        _: 1
      }, 8, ["locale"]);
    };
  }
};
const router = createRouter({
  // 这里的import.meta.env.BASE_URL取值于vite.config.js中的base属性。
  // 只有在生产环境才需要加/h5/前缀访问。
  // history: createWebHistory(import.meta.env.BASE_URL),
  // github pages为静态托管，不支持history模式
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => __vitePreload(() => import("./layout-DytZK7_g.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]) : void 0),
      redirect: "home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => __vitePreload(() => import("./index-kcKoOdN0.js"), true ? __vite__mapDeps([22,23,24,25,12,9,5,6,2,7,8,10,11,13,14,15,16,26]) : void 0)
        },
        // vue微应用路由配置
        {
          path: "vue-app",
          name: "vueAppContainer",
          component: () => __vitePreload(() => import("./microApp-C5GSFSrk.js"), true ? __vite__mapDeps([27,5,2]) : void 0),
          meta: { title: "vue微应用容器" },
          children: [
            // 捕获所有微应用子路由
            {
              path: ":pathMatch(.*)*",
              component: () => __vitePreload(() => import("./microApp-C5GSFSrk.js"), true ? __vite__mapDeps([27,5,2]) : void 0)
            }
          ]
        },
        // react微应用路由配置
        {
          path: "react-app",
          name: "reactAppContainer",
          component: () => __vitePreload(() => import("./microApp-C5GSFSrk.js"), true ? __vite__mapDeps([27,5,2]) : void 0),
          meta: { title: "react微应用容器" },
          children: [
            // 捕获所有微应用子路由
            {
              path: ":pathMatch(.*)*",
              component: () => __vitePreload(() => import("./microApp-C5GSFSrk.js"), true ? __vite__mapDeps([27,5,2]) : void 0)
            }
          ]
        }
      ]
    }
  ]
});
function installAntd(app2) {
  app2.use(Button);
  app2.use(Layout);
  app2.use(Dropdown);
  app2.use(Avatar);
  app2.use(Statistic);
  app2.use(__unplugin_components_1);
  app2.use(Tabs);
  app2.use(RangePicker);
}
async function initI18n(I18n2) {
  const lang = "zh";
  {
    await loadLocaleMessages(I18n2, lang);
  }
  setI18nLanguage(I18n2, lang);
}
if (typeof window !== "undefined") {
  let loadSvg = function() {
    var body = document.body;
    var svgDom = document.getElementById("__svg__icons__dom__");
    if (!svgDom) {
      svgDom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgDom.style.position = "absolute";
      svgDom.style.width = "0";
      svgDom.style.height = "0";
      svgDom.id = "__svg__icons__dom__";
      svgDom.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgDom.setAttribute("xmlns:link", "http://www.w3.org/1999/xlink");
    }
    svgDom.innerHTML = '<symbol class="icon" viewBox="0 0 1024 1024"  id="down-green"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" fill="currentColor" /></symbol><symbol class="icon" viewBox="0 0 1427 1024"  id="icon-book"><path d="M1351.065 123.556h-107.863V92.969l-36.66-14.396c-7.35-2.875-181.789-70.64-334.374-70.64-71.44 0-128.593 14.72-170.787 43.88-42.194-29.16-99.302-43.88-170.764-43.88-152.586 0-327.025 67.765-334.374 70.64l-36.64 14.396v30.587H54.293a43.318 43.318 0 0 0-43.318 43.318V964.69c0 23.929 19.39 43.318 43.318 43.318h1296.773a43.318 43.318 0 0 0 43.318-43.318V166.874a43.318 43.318 0 0 0-43.318-43.318zm-165.62 8.776V765.5c-89.446-30.63-327.003-100.038-455.185-25.204v-637.73c36.142-26.998 87.025-36.898 141.908-36.898 143.42 0 313.277 66.663 313.277 66.663zm-65.41 672.64h-380.74c74.294-70.468 258.244-36.596 380.74 0zM530.618 65.668c54.86 0 105.766 9.921 141.886 36.898v637.73c-128.182-74.79-365.696-5.426-455.164 25.204V132.33S387.196 65.67 530.617 65.67zm132.85 739.302H282.662c122.454-36.638 306.49-70.575 380.805 0zm644.28 116.401H97.61V210.17h61.994v652.537h1083.598V210.17h64.545v711.202z" fill="currentColor" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="up-red"><path d="M858.9 689 530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" fill="currentColor" /></symbol>';
    body.insertBefore(svgDom, body.lastChild);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSvg);
  } else {
    loadSvg();
  }
}
const _hoisted_1 = ["xlink:href"];
const _sfc_main = {
  __name: "index",
  props: {
    iconClass: String,
    width: {
      type: [Number, String],
      default: "1em"
    },
    height: {
      type: [Number, String],
      default: "1em"
    },
    color: {
      type: [Number, String],
      default: "#333"
    }
  },
  setup(__props) {
    const props = __props;
    const iconName = computed(() => {
      return `#${props.iconClass}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        class: "svg-icon",
        "aria-hidden": "true",
        style: normalizeStyle({ width: __props.width, height: __props.height, color: __props.color })
      }, [
        createBaseVNode("use", { "xlink:href": iconName.value }, null, 8, _hoisted_1)
      ], 4);
    };
  }
};
const homeData = {
  "visitData": [
    {
      "x": "2025-07-09",
      "y": 7
    },
    {
      "x": "2025-07-10",
      "y": 5
    },
    {
      "x": "2025-07-11",
      "y": 4
    },
    {
      "x": "2025-07-12",
      "y": 2
    },
    {
      "x": "2025-07-13",
      "y": 4
    },
    {
      "x": "2025-07-14",
      "y": 7
    },
    {
      "x": "2025-07-15",
      "y": 5
    },
    {
      "x": "2025-07-16",
      "y": 6
    },
    {
      "x": "2025-07-17",
      "y": 5
    },
    {
      "x": "2025-07-18",
      "y": 9
    },
    {
      "x": "2025-07-19",
      "y": 6
    },
    {
      "x": "2025-07-20",
      "y": 3
    },
    {
      "x": "2025-07-21",
      "y": 1
    },
    {
      "x": "2025-07-22",
      "y": 5
    },
    {
      "x": "2025-07-23",
      "y": 3
    },
    {
      "x": "2025-07-24",
      "y": 6
    },
    {
      "x": "2025-07-25",
      "y": 5
    }
  ],
  "visitData2": [
    {
      "x": "2025-07-09",
      "y": 1
    },
    {
      "x": "2025-07-10",
      "y": 6
    },
    {
      "x": "2025-07-11",
      "y": 4
    },
    {
      "x": "2025-07-12",
      "y": 8
    },
    {
      "x": "2025-07-13",
      "y": 3
    },
    {
      "x": "2025-07-14",
      "y": 7
    },
    {
      "x": "2025-07-15",
      "y": 2
    }
  ],
  "salesData": [
    {
      "x": "1月",
      "y": 901
    },
    {
      "x": "2月",
      "y": 677
    },
    {
      "x": "3月",
      "y": 1084
    },
    {
      "x": "4月",
      "y": 209
    },
    {
      "x": "5月",
      "y": 347
    },
    {
      "x": "6月",
      "y": 1196
    },
    {
      "x": "7月",
      "y": 667
    },
    {
      "x": "8月",
      "y": 1041
    },
    {
      "x": "9月",
      "y": 565
    },
    {
      "x": "10月",
      "y": 371
    },
    {
      "x": "11月",
      "y": 528
    },
    {
      "x": "12月",
      "y": 863
    }
  ],
  "visitData": [
    {
      "x": "1月",
      "y": 408
    },
    {
      "x": "2月",
      "y": 677
    },
    {
      "x": "3月",
      "y": 396
    },
    {
      "x": "4月",
      "y": 209
    },
    {
      "x": "5月",
      "y": 547
    },
    {
      "x": "6月",
      "y": 1120
    },
    {
      "x": "7月",
      "y": 567
    },
    {
      "x": "8月",
      "y": 941
    },
    {
      "x": "9月",
      "y": 565
    },
    {
      "x": "10月",
      "y": 371
    },
    {
      "x": "11月",
      "y": 598
    },
    {
      "x": "12月",
      "y": 563
    }
  ],
  "searchData": [
    {
      "index": 1,
      "keyword": "搜索关键词-0",
      "count": 316,
      "range": 76,
      "status": 0
    },
    {
      "index": 2,
      "keyword": "搜索关键词-1",
      "count": 560,
      "range": 79,
      "status": 0
    },
    {
      "index": 3,
      "keyword": "搜索关键词-2",
      "count": 367,
      "range": 43,
      "status": 1
    },
    {
      "index": 4,
      "keyword": "搜索关键词-3",
      "count": 701,
      "range": 42,
      "status": 0
    },
    {
      "index": 5,
      "keyword": "搜索关键词-4",
      "count": 729,
      "range": 31,
      "status": 1
    },
    {
      "index": 6,
      "keyword": "搜索关键词-5",
      "count": 65,
      "range": 52,
      "status": 1
    },
    {
      "index": 7,
      "keyword": "搜索关键词-6",
      "count": 436,
      "range": 59,
      "status": 0
    },
    {
      "index": 8,
      "keyword": "搜索关键词-7",
      "count": 946,
      "range": 88,
      "status": 1
    },
    {
      "index": 9,
      "keyword": "搜索关键词-8",
      "count": 995,
      "range": 61,
      "status": 0
    },
    {
      "index": 10,
      "keyword": "搜索关键词-9",
      "count": 44,
      "range": 99,
      "status": 1
    },
    {
      "index": 11,
      "keyword": "搜索关键词-10",
      "count": 140,
      "range": 12,
      "status": 0
    },
    {
      "index": 12,
      "keyword": "搜索关键词-11",
      "count": 49,
      "range": 88,
      "status": 1
    },
    {
      "index": 13,
      "keyword": "搜索关键词-12",
      "count": 702,
      "range": 72,
      "status": 1
    },
    {
      "index": 14,
      "keyword": "搜索关键词-13",
      "count": 271,
      "range": 17,
      "status": 1
    },
    {
      "index": 15,
      "keyword": "搜索关键词-14",
      "count": 367,
      "range": 65,
      "status": 0
    },
    {
      "index": 16,
      "keyword": "搜索关键词-15",
      "count": 670,
      "range": 89,
      "status": 0
    },
    {
      "index": 17,
      "keyword": "搜索关键词-16",
      "count": 840,
      "range": 85,
      "status": 1
    },
    {
      "index": 18,
      "keyword": "搜索关键词-17",
      "count": 791,
      "range": 48,
      "status": 0
    },
    {
      "index": 19,
      "keyword": "搜索关键词-18",
      "count": 387,
      "range": 63,
      "status": 1
    },
    {
      "index": 20,
      "keyword": "搜索关键词-19",
      "count": 680,
      "range": 76,
      "status": 1
    },
    {
      "index": 21,
      "keyword": "搜索关键词-20",
      "count": 211,
      "range": 96,
      "status": 1
    },
    {
      "index": 22,
      "keyword": "搜索关键词-21",
      "count": 204,
      "range": 41,
      "status": 0
    },
    {
      "index": 23,
      "keyword": "搜索关键词-22",
      "count": 643,
      "range": 16,
      "status": 1
    },
    {
      "index": 24,
      "keyword": "搜索关键词-23",
      "count": 429,
      "range": 41,
      "status": 0
    },
    {
      "index": 25,
      "keyword": "搜索关键词-24",
      "count": 160,
      "range": 82,
      "status": 1
    },
    {
      "index": 26,
      "keyword": "搜索关键词-25",
      "count": 572,
      "range": 8,
      "status": 1
    },
    {
      "index": 27,
      "keyword": "搜索关键词-26",
      "count": 329,
      "range": 28,
      "status": 0
    },
    {
      "index": 28,
      "keyword": "搜索关键词-27",
      "count": 546,
      "range": 22,
      "status": 0
    },
    {
      "index": 29,
      "keyword": "搜索关键词-28",
      "count": 708,
      "range": 36,
      "status": 1
    },
    {
      "index": 30,
      "keyword": "搜索关键词-29",
      "count": 399,
      "range": 54,
      "status": 0
    },
    {
      "index": 31,
      "keyword": "搜索关键词-30",
      "count": 306,
      "range": 35,
      "status": 1
    },
    {
      "index": 32,
      "keyword": "搜索关键词-31",
      "count": 421,
      "range": 71,
      "status": 1
    },
    {
      "index": 33,
      "keyword": "搜索关键词-32",
      "count": 707,
      "range": 98,
      "status": 0
    },
    {
      "index": 34,
      "keyword": "搜索关键词-33",
      "count": 888,
      "range": 39,
      "status": 0
    },
    {
      "index": 35,
      "keyword": "搜索关键词-34",
      "count": 582,
      "range": 39,
      "status": 0
    },
    {
      "index": 36,
      "keyword": "搜索关键词-35",
      "count": 151,
      "range": 68,
      "status": 0
    },
    {
      "index": 37,
      "keyword": "搜索关键词-36",
      "count": 107,
      "range": 51,
      "status": 0
    },
    {
      "index": 38,
      "keyword": "搜索关键词-37",
      "count": 532,
      "range": 27,
      "status": 0
    },
    {
      "index": 39,
      "keyword": "搜索关键词-38",
      "count": 205,
      "range": 47,
      "status": 1
    },
    {
      "index": 40,
      "keyword": "搜索关键词-39",
      "count": 280,
      "range": 9,
      "status": 0
    },
    {
      "index": 41,
      "keyword": "搜索关键词-40",
      "count": 769,
      "range": 9,
      "status": 0
    },
    {
      "index": 42,
      "keyword": "搜索关键词-41",
      "count": 700,
      "range": 51,
      "status": 0
    },
    {
      "index": 43,
      "keyword": "搜索关键词-42",
      "count": 80,
      "range": 28,
      "status": 0
    },
    {
      "index": 44,
      "keyword": "搜索关键词-43",
      "count": 967,
      "range": 57,
      "status": 1
    },
    {
      "index": 45,
      "keyword": "搜索关键词-44",
      "count": 582,
      "range": 39,
      "status": 1
    },
    {
      "index": 46,
      "keyword": "搜索关键词-45",
      "count": 279,
      "range": 96,
      "status": 1
    },
    {
      "index": 47,
      "keyword": "搜索关键词-46",
      "count": 340,
      "range": 83,
      "status": 1
    },
    {
      "index": 48,
      "keyword": "搜索关键词-47",
      "count": 935,
      "range": 39,
      "status": 1
    },
    {
      "index": 49,
      "keyword": "搜索关键词-48",
      "count": 761,
      "range": 59,
      "status": 0
    },
    {
      "index": 50,
      "keyword": "搜索关键词-49",
      "count": 836,
      "range": 58,
      "status": 1
    }
  ],
  "offlineData": [
    {
      "name": "Stores 0",
      "cvr": 0.5
    },
    {
      "name": "Stores 1",
      "cvr": 0.2
    },
    {
      "name": "Stores 2",
      "cvr": 0.4
    },
    {
      "name": "Stores 3",
      "cvr": 0.1
    },
    {
      "name": "Stores 4",
      "cvr": 0.9
    },
    {
      "name": "Stores 5",
      "cvr": 0.7
    },
    {
      "name": "Stores 6",
      "cvr": 0.2
    },
    {
      "name": "Stores 7",
      "cvr": 0.1
    },
    {
      "name": "Stores 8",
      "cvr": 0.2
    },
    {
      "name": "Stores 9",
      "cvr": 0.2
    }
  ],
  "offlineChartData": [
    {
      "date": "04:18",
      "type": "客流量",
      "value": 43
    },
    {
      "date": "04:18",
      "type": "支付笔数",
      "value": 36
    },
    {
      "date": "04:48",
      "type": "客流量",
      "value": 91
    },
    {
      "date": "04:48",
      "type": "支付笔数",
      "value": 81
    },
    {
      "date": "05:18",
      "type": "客流量",
      "value": 39
    },
    {
      "date": "05:18",
      "type": "支付笔数",
      "value": 23
    },
    {
      "date": "05:48",
      "type": "客流量",
      "value": 100
    },
    {
      "date": "05:48",
      "type": "支付笔数",
      "value": 27
    },
    {
      "date": "06:18",
      "type": "客流量",
      "value": 57
    },
    {
      "date": "06:18",
      "type": "支付笔数",
      "value": 43
    },
    {
      "date": "06:48",
      "type": "客流量",
      "value": 64
    },
    {
      "date": "06:48",
      "type": "支付笔数",
      "value": 52
    },
    {
      "date": "07:18",
      "type": "客流量",
      "value": 20
    },
    {
      "date": "07:18",
      "type": "支付笔数",
      "value": 14
    },
    {
      "date": "07:48",
      "type": "客流量",
      "value": 70
    },
    {
      "date": "07:48",
      "type": "支付笔数",
      "value": 94
    },
    {
      "date": "08:18",
      "type": "客流量",
      "value": 60
    },
    {
      "date": "08:18",
      "type": "支付笔数",
      "value": 26
    },
    {
      "date": "08:48",
      "type": "客流量",
      "value": 24
    },
    {
      "date": "08:48",
      "type": "支付笔数",
      "value": 10
    },
    {
      "date": "09:18",
      "type": "客流量",
      "value": 66
    },
    {
      "date": "09:18",
      "type": "支付笔数",
      "value": 76
    },
    {
      "date": "09:48",
      "type": "客流量",
      "value": 101
    },
    {
      "date": "09:48",
      "type": "支付笔数",
      "value": 91
    },
    {
      "date": "10:18",
      "type": "客流量",
      "value": 42
    },
    {
      "date": "10:18",
      "type": "支付笔数",
      "value": 11
    },
    {
      "date": "10:48",
      "type": "客流量",
      "value": 19
    },
    {
      "date": "10:48",
      "type": "支付笔数",
      "value": 54
    },
    {
      "date": "11:18",
      "type": "客流量",
      "value": 83
    },
    {
      "date": "11:18",
      "type": "支付笔数",
      "value": 59
    },
    {
      "date": "11:48",
      "type": "客流量",
      "value": 28
    },
    {
      "date": "11:48",
      "type": "支付笔数",
      "value": 20
    },
    {
      "date": "12:18",
      "type": "客流量",
      "value": 109
    },
    {
      "date": "12:18",
      "type": "支付笔数",
      "value": 43
    },
    {
      "date": "12:48",
      "type": "客流量",
      "value": 100
    },
    {
      "date": "12:48",
      "type": "支付笔数",
      "value": 69
    },
    {
      "date": "13:18",
      "type": "客流量",
      "value": 56
    },
    {
      "date": "13:18",
      "type": "支付笔数",
      "value": 106
    },
    {
      "date": "13:48",
      "type": "客流量",
      "value": 100
    },
    {
      "date": "13:48",
      "type": "支付笔数",
      "value": 90
    }
  ],
  "salesTypeData": [
    {
      "x": "家用电器",
      "y": 4544
    },
    {
      "x": "食用酒水",
      "y": 3321
    },
    {
      "x": "个护健康",
      "y": 3113
    },
    {
      "x": "服饰箱包",
      "y": 2341
    },
    {
      "x": "母婴产品",
      "y": 1231
    },
    {
      "x": "其他",
      "y": 1231
    }
  ],
  "salesTypeDataOnline": [
    {
      "x": "家用电器",
      "y": 244
    },
    {
      "x": "食用酒水",
      "y": 321
    },
    {
      "x": "个护健康",
      "y": 311
    },
    {
      "x": "服饰箱包",
      "y": 41
    },
    {
      "x": "母婴产品",
      "y": 121
    },
    {
      "x": "其他",
      "y": 111
    }
  ],
  "salesTypeDataOffline": [
    {
      "x": "家用电器",
      "y": 99
    },
    {
      "x": "食用酒水",
      "y": 188
    },
    {
      "x": "个护健康",
      "y": 344
    },
    {
      "x": "服饰箱包",
      "y": 255
    },
    {
      "x": "其他",
      "y": 65
    }
  ],
  "radarData": [
    {
      "name": "个人",
      "label": "引用",
      "value": 10
    },
    {
      "name": "个人",
      "label": "口碑",
      "value": 8
    },
    {
      "name": "个人",
      "label": "产量",
      "value": 4
    },
    {
      "name": "个人",
      "label": "贡献",
      "value": 5
    },
    {
      "name": "个人",
      "label": "热度",
      "value": 7
    },
    {
      "name": "团队",
      "label": "引用",
      "value": 3
    },
    {
      "name": "团队",
      "label": "口碑",
      "value": 9
    },
    {
      "name": "团队",
      "label": "产量",
      "value": 6
    },
    {
      "name": "团队",
      "label": "贡献",
      "value": 3
    },
    {
      "name": "团队",
      "label": "热度",
      "value": 1
    },
    {
      "name": "部门",
      "label": "引用",
      "value": 4
    },
    {
      "name": "部门",
      "label": "口碑",
      "value": 1
    },
    {
      "name": "部门",
      "label": "产量",
      "value": 6
    },
    {
      "name": "部门",
      "label": "贡献",
      "value": 5
    },
    {
      "name": "部门",
      "label": "热度",
      "value": 7
    }
  ]
};
const getHomeData = () => {
  return {
    data: homeData,
    code: 200
  };
};
Mock.mock(/admin\/v1\/fake_analysis_chart_data/, "get", getHomeData);
const I18n = setupI18n();
initI18n(I18n);
const app = createApp(_sfc_main$1);
installAntd(app);
app.use(createPinia());
app.use(router);
app.use(I18n);
app.component("svg-icon", _sfc_main);
app.mount("#app");
//# sourceMappingURL=index-ykOPrxGZ.js.map
