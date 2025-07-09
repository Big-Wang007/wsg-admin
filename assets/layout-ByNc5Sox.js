import { u as useRouter, b as useRoute } from "./vue-router-VELCurhE.js";
import { u as useI18n } from "./vue-i18n-BxOQ3a7f.js";
import { _ as _export_sfc } from "./plugin-vueexport-helper-1tPrXgE0.js";
import { A as AppstoreOutlined, M as MailOutlined, S as SettingOutlined, U as UserOutlined, G as GlobalOutlined } from "./@ant-design-C8rBI7nz.js";
import { a as reactive, h, w as watch, R as createElementBlock, c as createVNode, O as openBlock, S as createBaseVNode, P as withCtx, u as unref, A as withModifiers, U as toDisplayString, o as onMounted, N as resolveComponent } from "./@vue-CXFRJBEB.js";
import { M as Menu, A as Avatar, _ as __unplugin_components_1, D as Dropdown } from "./ant-design-vue-BPBWbRYd.js";
import { i as initGlobalState, r as registerMicroApps, s as start } from "./qiankun-DFwBr9iv.js";
import "./@intlify-6TXC-gFd.js";
import "./@ctrl-i2BXpzPC.js";
import "./@babel-BH5WFgda.js";
import "./lodash-es-DgEtFnDs.js";
import "./resize-observer-polyfill-C80vHMkG.js";
import "./dayjs-CLeEmiia.js";
import "./dom-align-C8FpptQ1.js";
import "./@emotion-D9dI_Y91.js";
import "./stylis-Bw1ygUgA.js";
import "./vue-types-Bu_jFbQT.js";
import "./lodash-KqrOsjaQ.js";
import "./single-spa-BhgqiMF-.js";
import "./import-html-entry-DDVcqYXZ.js";
const _hoisted_1$2 = { class: "sider-content" };
const _sfc_main$2 = {
  __name: "sider",
  setup(__props) {
    const { t } = useI18n();
    function getItem(label, key, icon, children, type) {
      return {
        key,
        icon,
        children,
        label,
        type
      };
    }
    const items = reactive([
      getItem("主应用", "admin", () => h(MailOutlined), [
        getItem("Option 1", "1"),
        getItem("Option 2", "2"),
        getItem("Option 3", "3"),
        getItem("Option 4", "4")
      ]),
      getItem(t("menu.vueMircoApp"), "vue-app", () => h(AppstoreOutlined), [
        getItem(t("menu.list"), "list"),
        getItem(t("menu.dashboard"), "dashboard"),
        getItem(t("menu.details"), "details")
      ]),
      getItem("react微应用", "react", () => h(SettingOutlined), [
        getItem("Option 9", "9"),
        getItem("Option 10", "10"),
        getItem("Option 11", "11"),
        getItem("Option 12", "12")
      ])
    ]);
    const state = reactive({
      openKeys: ["admin", "vue-app", "react"],
      selectedKeys: []
    });
    const router = useRouter();
    const handleClick = ({ keyPath }) => {
      const [subRoutePath, route2] = keyPath;
      router.push(`/${subRoutePath}/${route2}`);
    };
    const route = useRoute();
    watch(() => route.path, (val) => {
      const list = val.split("/");
      state.selectedKeys.push(list[2]);
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_a_menu = Menu;
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_a_menu, {
          selectedKeys: state.selectedKeys,
          "onUpdate:selectedKeys": _cache[0] || (_cache[0] = ($event) => state.selectedKeys = $event),
          style: { "width": "100%", "height": "100%" },
          mode: "inline",
          "open-keys": state.openKeys,
          theme: "dark",
          items,
          onSelect: handleClick
        }, null, 8, ["selectedKeys", "open-keys", "items"])
      ]);
    };
  }
};
const LayoutSider = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-60075187"]]);
const avatar = "/wsg-admin/assets/avatar-DNWYG7hT.png";
const initialState = {
  locale: "zh"
};
const qiankunActions = initGlobalState(initialState);
const _hoisted_1$1 = { class: "header-content" };
const _hoisted_2$1 = { class: "header-content-right" };
const _hoisted_3$1 = { class: "user" };
const _hoisted_4$1 = { class: "language" };
const _sfc_main$1 = {
  __name: "header",
  setup(__props) {
    const { t, locale } = useI18n();
    function changeLang(lang) {
      locale.value = lang;
      qiankunActions.setGlobalState({ locale: lang });
    }
    return (_ctx, _cache) => {
      const _component_a_avatar = Avatar;
      const _component_a_menu_item = __unplugin_components_1;
      const _component_a_menu = Menu;
      const _component_a_dropdown = Dropdown;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[6] || (_cache[6] = createBaseVNode("div", { class: "header-content-left" }, null, -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createVNode(_component_a_dropdown, { placement: "bottomLeft" }, {
              overlay: withCtx(() => [
                createVNode(_component_a_menu, null, {
                  default: withCtx(() => [
                    createVNode(_component_a_menu_item, null, {
                      default: withCtx(() => _cache[3] || (_cache[3] = [
                        createBaseVNode("a", { href: "javascript:;" }, "修改密码", -1)
                      ])),
                      _: 1,
                      __: [3]
                    }),
                    createVNode(_component_a_menu_item, null, {
                      default: withCtx(() => _cache[4] || (_cache[4] = [
                        createBaseVNode("a", { href: "javascript:;" }, "登出", -1)
                      ])),
                      _: 1,
                      __: [4]
                    })
                  ]),
                  _: 1
                })
              ]),
              default: withCtx(() => [
                createVNode(_component_a_avatar, {
                  size: "large",
                  src: unref(avatar)
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(UserOutlined))
                  ]),
                  _: 1
                }, 8, ["src"])
              ]),
              _: 1
            })
          ]),
          _cache[5] || (_cache[5] = createBaseVNode("p", { class: "email" }, "wsguangya@163.com", -1)),
          createBaseVNode("div", _hoisted_4$1, [
            createVNode(_component_a_dropdown, { placement: "bottomLeft" }, {
              overlay: withCtx(() => [
                createVNode(_component_a_menu, null, {
                  default: withCtx(() => [
                    createVNode(_component_a_menu_item, null, {
                      default: withCtx(() => [
                        createBaseVNode("a", {
                          href: "javascript:;",
                          onClick: _cache[1] || (_cache[1] = ($event) => changeLang("zh"))
                        }, toDisplayString(unref(t)("chinese")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_menu_item, null, {
                      default: withCtx(() => [
                        createBaseVNode("a", {
                          href: "javascript:;",
                          onClick: _cache[2] || (_cache[2] = ($event) => changeLang("en"))
                        }, toDisplayString(unref(t)("english")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                    }, ["prevent"]))
                  }, toDisplayString(unref(locale) === "zh" ? unref(t)("chinese") : unref(t)("english")), 1),
                  createVNode(unref(GlobalOutlined))
                ])
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
const LayoutHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-db14aee6"]]);
function registerQiankunApps() {
  registerMicroApps([
    {
      name: "vueApp",
      entry: "//big-wang007.github.io/vue-app/",
      container: "#container",
      activeRule: "/vue-app",
      props: {
        basePath: "/vue-app"
      }
    }
    // {
    //   name: "reactApp",
    //   entry: "//localhost:8082",
    //   container: "#container",
    //   activeRule: "/react-app",
    // },
  ]);
  start({
    sandbox: { experimentalStyleIsolation: true },
    // CSS隔离
    lifeCycles: {
      beforeLoad: (app) => console.log("[qiankun] before load", app),
      beforeMount: (app) => console.log("[qiankun] before mount", app),
      afterMount: (app) => console.log("[qiankun] after mount", app),
      beforeUnmount: (app) => console.log("[qiankun] before unmount", app)
    }
  });
}
const _hoisted_1 = { class: "layout" };
const _hoisted_2 = { class: "layout-sider" };
const _hoisted_3 = { class: "layout-header" };
const _hoisted_4 = { class: "layout-content" };
const _hoisted_5 = { class: "layout-content-wrapper" };
const _sfc_main = {
  __name: "layout",
  setup(__props) {
    onMounted(() => {
      registerQiankunApps();
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("section", _hoisted_1, [
        createBaseVNode("aside", _hoisted_2, [
          createVNode(LayoutSider)
        ]),
        createBaseVNode("header", _hoisted_3, [
          createVNode(LayoutHeader)
        ]),
        createBaseVNode("main", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_router_view)
          ])
        ])
      ]);
    };
  }
};
const layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a9d69be"]]);
export {
  layout as default
};
//# sourceMappingURL=layout-ByNc5Sox.js.map
