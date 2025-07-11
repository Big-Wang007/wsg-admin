import { a as axios } from "./axios-CAnGA6pv.js";
import { e as echarts, u as use, i as install, a as install$1, b as install$2, c as install$3, d as install$4, f as install$5, g as install$6, h as install$7, j as install$8, k as install$9, l as install$a, m as install$b, n as install$c, o as installLabelLayout, p as installUniversalTransition, q as install$d } from "./echarts-EVDkv5SO.js";
import { d as dayjs } from "./dayjs-LsVTM95D.js";
import { _ as _export_sfc } from "./plugin-vueexport-helper-1tPrXgE0.js";
import { d as ExclamationCircleOutlined } from "./@ant-design-tMLE6zg2.js";
import { S as Statistic, _ as __unplugin_components_1, T as Tabs, c as __unplugin_components_5, d as __unplugin_components_3, e as __unplugin_components_2, R as RangePicker } from "./ant-design-vue-CxifP5iN.js";
import { r as ref, a as reactive, W as createElementBlock, X as createBaseVNode, c as createVNode, u as unref, I as createTextVNode, S as resolveComponent, V as withCtx, U as openBlock, F as Fragment, $ as renderList, _ as toDisplayString, n as nextTick } from "./@vue-D-mnPpXN.js";
import "./zrender-Bhf3wa3H.js";
import "./@babel-BH5WFgda.js";
import "./@ctrl-i2BXpzPC.js";
import "./lodash-es-B3klq8D0.js";
import "./resize-observer-polyfill-C80vHMkG.js";
import "./vue-types-Bu_jFbQT.js";
import "./dom-align-C8FpptQ1.js";
import "./@emotion-D9dI_Y91.js";
import "./stylis-Bw1ygUgA.js";
use([
  install,
  install$1,
  install$2,
  install$3,
  install$4,
  install$5,
  install$6,
  install$7,
  install$8,
  install$9,
  install$a,
  install$b,
  install$c,
  installLabelLayout,
  installUniversalTransition,
  install$d
]);
const _hoisted_1 = { class: "header" };
const _hoisted_2 = { class: "sales-volume-wrapper" };
const _hoisted_3 = { class: "sales-volume" };
const _hoisted_4 = { class: "content" };
const _hoisted_5 = { class: "title-tip" };
const _hoisted_6 = { style: { "font-size": "14px", "line-height": "22px" } };
const _hoisted_7 = { style: { "display": "inline-flex", "align-items": "center" } };
const _hoisted_8 = { style: { "font-size": "14px", "line-height": "22px" } };
const _hoisted_9 = { style: { "display": "inline-flex", "align-items": "center" } };
const _hoisted_10 = { class: "bottom" };
const _hoisted_11 = { class: "visit-volume-wrapper" };
const _hoisted_12 = { class: "visit-volume" };
const _hoisted_13 = { class: "content" };
const _hoisted_14 = { class: "title-tip" };
const _hoisted_15 = { class: "bottom" };
const _hoisted_16 = { class: "pay-volume-wrapper" };
const _hoisted_17 = { class: "pay-volume" };
const _hoisted_18 = { class: "content" };
const _hoisted_19 = { class: "title-tip" };
const _hoisted_20 = { class: "bottom" };
const _hoisted_21 = { class: "operation-volume-wrapper" };
const _hoisted_22 = { class: "operation-volume" };
const _hoisted_23 = { class: "content" };
const _hoisted_24 = { class: "title-tip" };
const _hoisted_25 = { style: { "margin-top": "12px" } };
const _hoisted_26 = { class: "bottom" };
const _hoisted_27 = { style: { "font-size": "14px", "line-height": "22px", "margin-right": "12px" } };
const _hoisted_28 = { style: { "display": "inline-flex", "align-items": "center" } };
const _hoisted_29 = { style: { "font-size": "14px", "line-height": "22px" } };
const _hoisted_30 = { style: { "display": "inline-flex", "align-items": "center" } };
const _hoisted_31 = { class: "main" };
const _hoisted_32 = { style: { "display": "flex", "padding-right": "16px" } };
const _hoisted_33 = { style: { "margin-right": "24px" } };
const _hoisted_34 = { style: { "display": "flex", "padding-bottom": "32px" } };
const _hoisted_35 = { class: "sales-rank" };
const _hoisted_36 = { style: { "display": "flex", "padding-bottom": "32px" } };
const _hoisted_37 = { class: "visit-rank" };
const _sfc_main = {
  __name: "index",
  setup(__props) {
    function initLineChart(visitData) {
      const list = [];
      visitData.forEach((val) => {
        const arr = [];
        arr.push(val.x);
        arr.push(val.y);
        list.push(arr);
      });
      const lineChartDom = document.getElementById("visit-main");
      const lineChart = echarts.init(lineChartDom);
      const lineChartOption = {
        xAxis: {
          type: "category",
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
            // 不显示分割线（即网格线）
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
            // 不显示分割线（即网格线）
          }
        },
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: [...list],
            type: "line",
            smooth: true,
            areaStyle: {},
            symbol: "none"
          }
        ]
      };
      lineChart.setOption(lineChartOption);
    }
    function initBarChart(visitData) {
      const list = [];
      visitData.forEach((val) => {
        const arr = [];
        arr.push(val.x);
        arr.push(val.y);
        list.push(arr);
      });
      const barChartDom = document.getElementById("pay-main");
      const barChart = echarts.init(barChartDom);
      const barChartOption = {
        xAxis: {
          type: "category",
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
            // 不显示分割线（即网格线）
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
            // 不显示分割线（即网格线）
          }
        },
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: [...list],
            type: "bar",
            smooth: true
          }
        ]
      };
      barChart.setOption(barChartOption);
    }
    function initSalesVolume(salesData) {
      const list = [];
      salesData.forEach((val) => {
        const arr = [];
        arr.push(val.x);
        arr.push(val.y);
        list.push(arr);
      });
      const salesVolumetDom = document.getElementById("sales-volume-main");
      const salesVolumeChart = echarts.init(salesVolumetDom);
      const salesVolumeChartOption = {
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        grid: {
          // top: 0,
          // right: 0,
          bottom: 30
          // left: 0,
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            name: "销售额",
            data: [...list],
            type: "bar",
            smooth: true,
            areaStyle: {},
            symbol: "none"
          }
        ]
      };
      salesVolumeChart.setOption(salesVolumeChartOption);
    }
    function initVisitVolume(salesData) {
      const list = [];
      salesData.forEach((val) => {
        const arr = [];
        arr.push(val.x);
        arr.push(val.y);
        list.push(arr);
      });
      const visitVolumetDom = document.getElementById("visit-volume-main");
      const visitVolumeChart = echarts.init(visitVolumetDom);
      const visitVolumeChartOption = {
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        grid: {
          // top: 0,
          // right: 0,
          bottom: 30
          // left: 0,
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            name: "访问量",
            data: [...list],
            type: "bar",
            smooth: true,
            areaStyle: {},
            symbol: "none"
          }
        ]
      };
      visitVolumeChart.setOption(visitVolumeChartOption);
    }
    const homeData = ref();
    const tabRadioDate = ref("day");
    const dateTime = ref([dayjs(), dayjs()]);
    function changeDate(en) {
      if (en.target.value === "day") {
        dateTime.value = [dayjs(), dayjs()];
      } else if (en.target.value === "week") {
        dateTime.value = [dayjs().startOf("week"), dayjs().endOf("week")];
      } else if (en.target.value === "month") {
        dateTime.value = [dayjs().startOf("month"), dayjs().endOf("month")];
      } else if (en.target.value === "year") {
        dateTime.value = [dayjs().startOf("year"), dayjs().endOf("year")];
      }
      console.log(dayjs().startOf("week").format("YYYY-MM-DD HH"));
      console.log(dayjs().endOf("week").format("YYYY-MM-DD"));
    }
    function init() {
      axios.get("/admin/v1/fake_analysis_chart_data").then((res) => {
        const { code, data } = res.data;
        if (code === 200) {
          homeData.value = data;
          initLineChart(homeData.value.visitData);
          initBarChart(homeData.value.visitData);
          initSalesVolume(homeData.value.salesData);
          console.log(data);
        }
      });
    }
    init();
    const activeKey = ref("sales");
    function changeTab(key) {
      if (key === "sales") {
        initSalesVolume(homeData.value.salesData);
      } else {
        nextTick(() => {
          initVisitVolume(homeData.value.visitData);
        });
      }
    }
    const salesRanking = reactive([
      { rank: 1, name: "莲花大道1号门店", valume: "999,999" },
      { rank: 2, name: "莲花大道2号门店", valume: "888,888" },
      { rank: 3, name: "莲花大道3号门店", valume: "777,777" },
      { rank: 4, name: "莲花大道4号门店", valume: "666,999" },
      { rank: 5, name: "莲花大道5号门店", valume: "555,999" },
      { rank: 6, name: "莲花大道6号门店", valume: "444,999" },
      { rank: 7, name: "莲花大道7号门店", valume: "333,999" }
    ]);
    return (_ctx, _cache) => {
      const _component_a_statistic = Statistic;
      const _component_svg_icon = resolveComponent("svg-icon");
      const _component_a_progress = __unplugin_components_1;
      const _component_a_radio_button = __unplugin_components_2;
      const _component_a_radio_group = __unplugin_components_3;
      const _component_a_range_picker = RangePicker;
      const _component_a_tab_pane = __unplugin_components_5;
      const _component_a_tabs = Tabs;
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "title" }, "总销售额", -1)),
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", null, [
                    _cache[3] || (_cache[3] = createBaseVNode("span", null, "总销售额", -1)),
                    createVNode(unref(ExclamationCircleOutlined))
                  ]),
                  createVNode(_component_a_statistic, {
                    value: 123456,
                    prefix: "¥",
                    "value-style": { color: "#000000e0", fontSize: "30px" }
                  })
                ]),
                createBaseVNode("div", _hoisted_6, [
                  _cache[4] || (_cache[4] = createBaseVNode("span", null, [
                    createTextVNode("周同比"),
                    createBaseVNode("span", { style: { "margin-left": "8px" } }, "12%")
                  ], -1)),
                  createBaseVNode("span", _hoisted_7, [
                    createVNode(_component_svg_icon, {
                      "icon-class": "up-red",
                      style: { "color": "#ff4c4c" }
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_8, [
                  _cache[5] || (_cache[5] = createBaseVNode("span", null, [
                    createTextVNode("日同比"),
                    createBaseVNode("span", { style: { "margin-left": "8px" } }, "11%")
                  ], -1)),
                  createBaseVNode("span", _hoisted_9, [
                    createVNode(_component_svg_icon, {
                      "icon-class": "down-green",
                      style: { "color": "#52c41a" }
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_10, [
                  _cache[6] || (_cache[6] = createBaseVNode("span", null, "日销售额", -1)),
                  createVNode(_component_a_statistic, {
                    value: 123456,
                    prefix: "¥",
                    "value-style": { color: "#000000e0", fontSize: "14px", marginLeft: "8px" }
                  })
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              _cache[11] || (_cache[11] = createBaseVNode("div", { class: "title" }, "访问量", -1)),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", null, [
                    _cache[8] || (_cache[8] = createBaseVNode("span", null, "访问量", -1)),
                    createVNode(unref(ExclamationCircleOutlined))
                  ]),
                  createVNode(_component_a_statistic, {
                    value: 8848,
                    "value-style": { color: "#000000e0", fontSize: "30px" }
                  })
                ]),
                _cache[10] || (_cache[10] = createBaseVNode("div", { id: "visit-main" }, null, -1)),
                createBaseVNode("div", _hoisted_15, [
                  _cache[9] || (_cache[9] = createBaseVNode("span", null, "日访问量", -1)),
                  createVNode(_component_a_statistic, {
                    value: 1234,
                    "value-style": { color: "#000000e0", fontSize: "14px", marginLeft: "8px" }
                  })
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("div", _hoisted_17, [
              _cache[15] || (_cache[15] = createBaseVNode("div", { class: "title" }, "支付笔数", -1)),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("div", null, [
                    _cache[12] || (_cache[12] = createBaseVNode("span", null, "支付笔数", -1)),
                    createVNode(unref(ExclamationCircleOutlined))
                  ]),
                  createVNode(_component_a_statistic, {
                    value: 6543,
                    "value-style": { color: "#000000e0", fontSize: "30px" }
                  })
                ]),
                _cache[14] || (_cache[14] = createBaseVNode("div", { id: "pay-main" }, null, -1)),
                createBaseVNode("div", _hoisted_20, [
                  _cache[13] || (_cache[13] = createBaseVNode("span", null, "转化率", -1)),
                  createVNode(_component_a_statistic, {
                    value: 60,
                    suffix: "%",
                    "value-style": { color: "#000000e0", fontSize: "14px", marginLeft: "8px" }
                  })
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_21, [
            createBaseVNode("div", _hoisted_22, [
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "title" }, "运营活动效果", -1)),
              createBaseVNode("div", _hoisted_23, [
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("div", null, [
                    _cache[16] || (_cache[16] = createBaseVNode("span", null, "运营活动效果", -1)),
                    createVNode(unref(ExclamationCircleOutlined))
                  ]),
                  createVNode(_component_a_statistic, {
                    value: 78,
                    suffix: "%",
                    "value-style": { color: "#000000e0", fontSize: "30px" }
                  })
                ]),
                createBaseVNode("div", _hoisted_25, [
                  createVNode(_component_a_progress, {
                    percent: 78,
                    "stroke-color": {
                      "0%": "#108ee9",
                      "100%": "#87d068"
                    }
                  })
                ]),
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("div", _hoisted_27, [
                    _cache[17] || (_cache[17] = createBaseVNode("span", null, [
                      createTextVNode("周同比"),
                      createBaseVNode("span", { style: { "margin-left": "8px" } }, "12%")
                    ], -1)),
                    createBaseVNode("span", _hoisted_28, [
                      createVNode(_component_svg_icon, {
                        "icon-class": "up-red",
                        style: { "color": "#ff4c4c" }
                      })
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_29, [
                    _cache[18] || (_cache[18] = createBaseVNode("span", null, [
                      createTextVNode("日同比"),
                      createBaseVNode("span", { style: { "margin-left": "8px" } }, "11%")
                    ], -1)),
                    createBaseVNode("span", _hoisted_30, [
                      createVNode(_component_svg_icon, {
                        "icon-class": "down-green",
                        style: { "color": "#52c41a" }
                      })
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_31, [
          createVNode(_component_a_tabs, {
            activeKey: activeKey.value,
            "onUpdate:activeKey": _cache[2] || (_cache[2] = ($event) => activeKey.value = $event),
            tabBarStyle: "padding-left: 16px; height: 56px",
            onChange: changeTab
          }, {
            rightExtra: withCtx(() => [
              createBaseVNode("div", _hoisted_32, [
                createBaseVNode("div", _hoisted_33, [
                  createVNode(_component_a_radio_group, {
                    value: tabRadioDate.value,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => tabRadioDate.value = $event),
                    onChange: changeDate
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_radio_button, {
                        type: "text",
                        value: "day"
                      }, {
                        default: withCtx(() => _cache[20] || (_cache[20] = [
                          createTextVNode("今日")
                        ])),
                        _: 1,
                        __: [20]
                      }),
                      createVNode(_component_a_radio_button, {
                        type: "text",
                        value: "week"
                      }, {
                        default: withCtx(() => _cache[21] || (_cache[21] = [
                          createTextVNode("本周")
                        ])),
                        _: 1,
                        __: [21]
                      }),
                      createVNode(_component_a_radio_button, {
                        type: "text",
                        value: "month"
                      }, {
                        default: withCtx(() => _cache[22] || (_cache[22] = [
                          createTextVNode("本月")
                        ])),
                        _: 1,
                        __: [22]
                      }),
                      createVNode(_component_a_radio_button, {
                        type: "text",
                        value: "year"
                      }, {
                        default: withCtx(() => _cache[23] || (_cache[23] = [
                          createTextVNode("本年")
                        ])),
                        _: 1,
                        __: [23]
                      })
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                createBaseVNode("div", null, [
                  createVNode(_component_a_range_picker, {
                    value: dateTime.value,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => dateTime.value = $event),
                    size: "default",
                    format: "YYYY-MM-DD",
                    style: { "width": "256px", "height": "32px" }
                  }, null, 8, ["value"])
                ])
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_a_tab_pane, {
                key: "sales",
                tab: "销售额"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_34, [
                    _cache[25] || (_cache[25] = createBaseVNode("div", { id: "sales-volume-main" }, null, -1)),
                    createBaseVNode("div", _hoisted_35, [
                      _cache[24] || (_cache[24] = createBaseVNode("h4", null, "门店销售额排名", -1)),
                      createBaseVNode("ul", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(salesRanking, (item) => {
                          return openBlock(), createElementBlock("li", null, [
                            createBaseVNode("span", null, toDisplayString(item.rank), 1),
                            createBaseVNode("span", null, toDisplayString(item.name), 1),
                            createBaseVNode("span", null, toDisplayString(item.valume), 1)
                          ]);
                        }), 256))
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_a_tab_pane, {
                key: "visit",
                tab: "访问量"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_36, [
                    _cache[27] || (_cache[27] = createBaseVNode("div", { id: "visit-volume-main" }, null, -1)),
                    createBaseVNode("div", _hoisted_37, [
                      _cache[26] || (_cache[26] = createBaseVNode("h4", null, "门店销售额排名", -1)),
                      createBaseVNode("ul", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(salesRanking, (item) => {
                          return openBlock(), createElementBlock("li", null, [
                            createBaseVNode("span", null, toDisplayString(item.rank), 1),
                            createBaseVNode("span", null, toDisplayString(item.name), 1),
                            createBaseVNode("span", null, toDisplayString(item.valume), 1)
                          ]);
                        }), 256))
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["activeKey"])
        ])
      ]);
    };
  }
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-61972222"]]);
export {
  index as default
};
//# sourceMappingURL=index-kcKoOdN0.js.map
