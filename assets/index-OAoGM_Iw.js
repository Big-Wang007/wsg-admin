const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/layout-BbaHFy98.js","assets/vue-router-VELCurhE.js","assets/@vue-CXFRJBEB.js","assets/vue-i18n-BxOQ3a7f.js","assets/@intlify-6TXC-gFd.js","assets/plugin-vueexport-helper-1tPrXgE0.js","assets/@ant-design-C8rBI7nz.js","assets/@ctrl-i2BXpzPC.js","assets/ant-design-vue-BPBWbRYd.js","assets/@babel-BH5WFgda.js","assets/lodash-es-DgEtFnDs.js","assets/resize-observer-polyfill-C80vHMkG.js","assets/dayjs-CLeEmiia.js","assets/dom-align-C8FpptQ1.js","assets/@emotion-D9dI_Y91.js","assets/stylis-Bw1ygUgA.js","assets/vue-types-Bu_jFbQT.js","assets/qiankun-DFwBr9iv.js","assets/lodash-KqrOsjaQ.js","assets/single-spa-BhgqiMF-.js","assets/import-html-entry-DDVcqYXZ.js","assets/layout-BlahdlHd.css","assets/index--vQ1xlKW.js","assets/microApp-BJk8HPaK.js"])))=>i.map(i=>d[i]);
import { n as nextTick, r as ref, w as watch, M as createBlock, u as unref, N as resolveComponent, O as openBlock, P as withCtx, c as createVNode, Q as createApp } from "./@vue-CXFRJBEB.js";
import { c as createPinia } from "./pinia-CHILh0iM.js";
import { l as localeValues, a as localeValues$1, C as ConfigProvider, B as Button, L as Layout, D as Dropdown, A as Avatar } from "./ant-design-vue-BPBWbRYd.js";
import { d as dayjs } from "./dayjs-CLeEmiia.js";
import { c as createI18n, u as useI18n } from "./vue-i18n-BxOQ3a7f.js";
import { c as createRouter, a as createWebHashHistory } from "./vue-router-VELCurhE.js";
import "./@babel-BH5WFgda.js";
import "./lodash-es-DgEtFnDs.js";
import "./resize-observer-polyfill-C80vHMkG.js";
import "./@ant-design-C8rBI7nz.js";
import "./@ctrl-i2BXpzPC.js";
import "./dom-align-C8FpptQ1.js";
import "./@emotion-D9dI_Y91.js";
import "./stylis-Bw1ygUgA.js";
import "./vue-types-Bu_jFbQT.js";
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
const _sfc_main = {
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
      component: () => __vitePreload(() => import("./layout-BbaHFy98.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]) : void 0),
      redirect: "home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => __vitePreload(() => import("./index--vQ1xlKW.js"), true ? __vite__mapDeps([22,5,8,9,2,10,11,6,7,12,13,14,15,16]) : void 0)
        },
        // 微应用路由配置
        {
          path: "vue-app",
          name: "vueAppContainer",
          component: () => __vitePreload(() => import("./microApp-BJk8HPaK.js"), true ? __vite__mapDeps([23,5,2]) : void 0),
          meta: { title: "微应用容器" },
          children: [
            // 捕获所有微应用子路由
            {
              path: ":pathMatch(.*)*",
              component: () => __vitePreload(() => import("./microApp-BJk8HPaK.js"), true ? __vite__mapDeps([23,5,2]) : void 0)
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
}
async function initI18n(I18n2) {
  const lang = "zh";
  {
    await loadLocaleMessages(I18n2, lang);
  }
  setI18nLanguage(I18n2, lang);
}
const I18n = setupI18n();
initI18n(I18n);
const app = createApp(_sfc_main);
installAntd(app);
app.use(createPinia());
app.use(router);
app.use(I18n);
app.mount("#app");
//# sourceMappingURL=index-OAoGM_Iw.js.map
