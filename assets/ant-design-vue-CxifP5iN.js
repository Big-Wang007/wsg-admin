import { _ as _extends, a as _objectSpread2 } from "./@babel-BH5WFgda.js";
import { F as Fragment, b as isVNode, C as Comment, T as Text, d as defineComponent, a as reactive, o as onMounted, e as onUpdated, f as onUnmounted, w as watch, g as getCurrentInstance, j as computed, i as inject, p as provide, r as ref, u as unref, s as shallowRef, k as watchEffect, l as onBeforeUnmount, t as triggerRef, c as createVNode, h, m as Transition, q as withDirectives, v as resolveDirective, x as cloneVNode, n as nextTick, y as toRef, z as vShow, A as withModifiers, B as onBeforeMount, D as Teleport, E as toRaw, G as render, H as useAttrs, I as createTextVNode, J as onBeforeUpdate, K as getCurrentScope, L as onScopeDispose, M as TransitionGroup } from "./@vue-D-mnPpXN.js";
import { i as isEqual$1, a as isEmpty, u as uniq, p as pick } from "./lodash-es-B3klq8D0.js";
import { i as index } from "./resize-observer-polyfill-C80vHMkG.js";
import { g as generate, L as LoadingOutlined, E as EllipsisOutlined, R as RightOutlined, P as PlusOutlined, C as CloseOutlined, a as ExclamationCircleFilled, b as CloseCircleFilled, c as CheckCircleFilled, I as InfoCircleFilled, d as ExclamationCircleOutlined, e as CloseCircleOutlined, f as InfoCircleOutlined, h as CheckCircleOutlined, i as ClockCircleOutlined, j as CalendarOutlined, S as SwapRightOutlined, B as BarsOutlined, k as LeftOutlined, p as presetPrimaryColors, l as CheckOutlined } from "./@ant-design-tMLE6zg2.js";
import { T as TinyColor } from "./@ctrl-i2BXpzPC.js";
import { d as dayjs, c as customParseFormat, a as advancedFormat, w as weekday, l as localeData, b as weekOfYear, e as weekYear, q as quarterOfYear } from "./dayjs-LsVTM95D.js";
import { z } from "./vue-types-Bu_jFbQT.js";
import { a as alignElement, b as alignPoint } from "./dom-align-C8FpptQ1.js";
import { m as murmur2, u as unitlessKeys } from "./@emotion-D9dI_Y91.js";
import { s as serialize, c as compile, a as stringify } from "./stylis-Bw1ygUgA.js";
const isFunction = (val) => typeof val === "function";
const isArray = Array.isArray;
const isString = (val) => typeof val === "string";
const isObject = (val) => val !== null && typeof val === "object";
const onRE = /^on[^a-z]/;
const isOn = (key2) => onRE.test(key2);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key2) => hasOwnProperty.call(val, key2);
function resolvePropValue(options, props, key2, value) {
  const opt = options[key2];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
    }
    if (opt.type === Boolean) {
      if (!hasOwn(props, key2) && !hasDefault) {
        value = false;
      } else if (value === "") {
        value = true;
      }
    }
  }
  return value;
}
function toPx(val) {
  if (typeof val === "number") return `${val}px`;
  return val;
}
function renderHelper(v) {
  let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let defaultV = arguments.length > 2 ? arguments[2] : void 0;
  if (typeof v === "function") {
    return v(props);
  }
  return v !== null && v !== void 0 ? v : defaultV;
}
function wrapPromiseFn(openFn) {
  let closeFn;
  const closePromise = new Promise((resolve) => {
    closeFn = openFn(() => {
      resolve(true);
    });
  });
  const result = () => {
    closeFn === null || closeFn === void 0 ? void 0 : closeFn();
  };
  result.then = (filled, rejected) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}
function classNames() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    const value = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (!value) continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        const inner = classNames(value[i2]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(" ");
}
const isValid = (value) => {
  return value !== void 0 && value !== null && value !== "";
};
const initDefaultProps = (types, defaultProps2) => {
  const propTypes2 = _extends({}, types);
  Object.keys(defaultProps2).forEach((k) => {
    const prop = propTypes2[k];
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps2[k];
      } else if (prop.def) {
        prop.def(defaultProps2[k]);
      } else {
        propTypes2[k] = {
          type: prop,
          default: defaultProps2[k]
        };
      }
    } else {
      throw new Error(`not have ${k} prop`);
    }
  });
  return propTypes2;
};
const splitAttrs = (attrs) => {
  const allAttrs = Object.keys(attrs);
  const eventAttrs = {};
  const onEvents = {};
  const extraAttrs = {};
  for (let i = 0, l = allAttrs.length; i < l; i++) {
    const key2 = allAttrs[i];
    if (isOn(key2)) {
      eventAttrs[key2[2].toLowerCase() + key2.slice(3)] = attrs[key2];
      onEvents[key2] = attrs[key2];
    } else {
      extraAttrs[key2] = attrs[key2];
    }
  }
  return {
    onEvents,
    events: eventAttrs,
    extraAttrs
  };
};
const parseStyleText = function() {
  let cssText = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let camel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  if (typeof cssText === "object") return cssText;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};
const hasProp = (instance, prop) => {
  return instance[prop] !== void 0;
};
const skipFlattenKey = Symbol("skipFlatten");
const flattenChildren = function() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const temp = Array.isArray(children) ? children : [children];
  const res = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty2));
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey) {
        res.push(child);
      } else {
        res.push(...flattenChildren(child.children, filterEmpty2));
      }
    } else if (child && isVNode(child)) {
      if (filterEmpty2 && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty2) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};
const getSlot = function(self) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (isVNode(self)) {
    if (self.type === Fragment) {
      return name === "default" ? flattenChildren(self.children) : [];
    } else if (self.children && self.children[name]) {
      return flattenChildren(self.children[name](options));
    } else {
      return [];
    }
  } else {
    const res = self.$slots[name] && self.$slots[name](options);
    return flattenChildren(res);
  }
};
const findDOMNode = (instance) => {
  var _a2;
  let node = ((_a2 = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a2 === void 0 ? void 0 : _a2.el) || instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
const getOptionProps = (instance) => {
  const res = {};
  if (instance.$ && instance.$.vnode) {
    const props = instance.$.vnode.props || {};
    Object.keys(instance.$props).forEach((k) => {
      const v = instance.$props[k];
      const hyphenateKey = hyphenate(k);
      if (v !== void 0 || hyphenateKey in props) {
        res[k] = v;
      }
    });
  } else if (isVNode(instance) && typeof instance.type === "object") {
    const originProps = instance.props || {};
    const props = {};
    Object.keys(originProps).forEach((key2) => {
      props[camelize(key2)] = originProps[key2];
    });
    const options = instance.type.props || {};
    Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k]);
      if (v !== void 0 || k in props) {
        res[k] = v;
      }
    });
  }
  return res;
};
const getComponent = function(instance) {
  let prop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : instance;
  let execute = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  let com = void 0;
  if (instance.$) {
    const temp = instance[prop];
    if (temp !== void 0) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else {
      com = instance.$slots[prop];
      com = execute && com ? com(options) : com;
    }
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop];
    if (temp !== void 0 && instance.props !== null) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else if (instance.type === Fragment) {
      com = instance.children;
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop];
      com = execute && com ? com(options) : com;
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? void 0 : com;
  }
  return com;
};
function getEvents() {
  let ele = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let on = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  let props = {};
  if (ele.$) {
    props = _extends(_extends({}, props), ele.$attrs);
  } else {
    props = _extends(_extends({}, props), ele.props);
  }
  return splitAttrs(props)[on ? "onEvents" : "events"];
}
function getStyle$1(ele, camel) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  let style = props.style || {};
  if (typeof style === "string") {
    style = parseStyleText(style, camel);
  }
  return style;
}
function isFragment(c) {
  return c.length === 1 && c[0].type === Fragment;
}
function isEmptyElement(c) {
  return c && (c.type === Comment || c.type === Fragment && c.children.length === 0 || c.type === Text && c.children.trim() === "");
}
function filterEmpty() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const res = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if ((child === null || child === void 0 ? void 0 : child.type) === Fragment) {
      res.push(...filterEmpty(child.children));
    } else {
      res.push(child);
    }
  });
  return res.filter((c) => !isEmptyElement(c));
}
function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }
  return element && element.__v_isVNode && typeof element.type !== "symbol";
}
function getPropsSlot(slots, props) {
  let prop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "default";
  var _a2, _b;
  return (_a2 = props[prop]) !== null && _a2 !== void 0 ? _a2 : (_b = slots[prop]) === null || _b === void 0 ? void 0 : _b.call(slots);
}
const ResizeObserver$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ResizeObserver",
  props: {
    disabled: Boolean,
    onResize: Function
  },
  emits: ["resize"],
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const state = reactive({
      width: 0,
      height: 0,
      offsetHeight: 0,
      offsetWidth: 0
    });
    let currentElement = null;
    let resizeObserver = null;
    const destroyObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };
    const onResize = (entries) => {
      const {
        onResize: onResize2
      } = props;
      const target = entries[0].target;
      const {
        width,
        height
      } = target.getBoundingClientRect();
      const {
        offsetWidth,
        offsetHeight
      } = target;
      const fixedWidth = Math.floor(width);
      const fixedHeight = Math.floor(height);
      if (state.width !== fixedWidth || state.height !== fixedHeight || state.offsetWidth !== offsetWidth || state.offsetHeight !== offsetHeight) {
        const size = {
          width: fixedWidth,
          height: fixedHeight,
          offsetWidth,
          offsetHeight
        };
        _extends(state, size);
        if (onResize2) {
          Promise.resolve().then(() => {
            onResize2(_extends(_extends({}, size), {
              offsetWidth,
              offsetHeight
            }), target);
          });
        }
      }
    };
    const instance = getCurrentInstance();
    const registerObserver = () => {
      const {
        disabled
      } = props;
      if (disabled) {
        destroyObserver();
        return;
      }
      const element = findDOMNode(instance);
      const elementChanged = element !== currentElement;
      if (elementChanged) {
        destroyObserver();
        currentElement = element;
      }
      if (!resizeObserver && element) {
        resizeObserver = new index(onResize);
        resizeObserver.observe(element);
      }
    };
    onMounted(() => {
      registerObserver();
    });
    onUpdated(() => {
      registerObserver();
    });
    onUnmounted(() => {
      destroyObserver();
    });
    watch(() => props.disabled, () => {
      registerObserver();
    }, {
      flush: "post"
    });
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)[0];
    };
  }
});
let raf = (callback) => setTimeout(callback, 16);
let caf = (num) => clearTimeout(num);
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  raf = (callback) => window.requestAnimationFrame(callback);
  caf = (handle) => window.cancelAnimationFrame(handle);
}
let rafUUID = 0;
const rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
function wrapperRaf(callback) {
  let times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  rafUUID += 1;
  const id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
}
wrapperRaf.cancel = (id) => {
  const realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
const tuple$1 = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
const withInstall = (comp) => {
  const c = comp;
  c.install = function(app) {
    app.component(c.displayName || c.name, comp);
  };
  return comp;
};
function eventType() {
  return {
    type: [Function, Array]
  };
}
function objectType(defaultVal) {
  return {
    type: Object,
    default: defaultVal
  };
}
function booleanType(defaultVal) {
  return {
    type: Boolean,
    default: defaultVal
  };
}
function functionType(defaultVal) {
  return {
    type: Function,
    default: defaultVal
  };
}
function anyType(defaultVal, required) {
  const type = {
    validator: () => true,
    default: defaultVal
  };
  return type;
}
function vNodeType() {
  return {
    validator: () => true
  };
}
function arrayType(defaultVal) {
  return {
    type: Array,
    default: defaultVal
  };
}
function stringType(defaultVal) {
  return {
    type: String,
    default: defaultVal
  };
}
function someType(types, defaultVal) {
  return types ? {
    type: types,
    default: defaultVal
  } : anyType(defaultVal);
}
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {
}
function addEventListenerWrap(target, eventType2, cb, option) {
  if (target && target.addEventListener) {
    let opt = option;
    if (opt === void 0 && supportsPassive && (eventType2 === "touchstart" || eventType2 === "touchmove" || eventType2 === "wheel")) {
      opt = {
        passive: false
      };
    }
    target.addEventListener(eventType2, cb, opt);
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType2, cb);
      }
    }
  };
}
const defaultIconPrefixCls = "anticon";
const GlobalFormContextKey = Symbol("GlobalFormContextKey");
const useProvideGlobalForm = (state) => {
  provide(GlobalFormContextKey, state);
};
const configProviderProps = () => ({
  iconPrefixCls: String,
  getTargetContainer: {
    type: Function
  },
  getPopupContainer: {
    type: Function
  },
  prefixCls: String,
  getPrefixCls: {
    type: Function
  },
  renderEmpty: {
    type: Function
  },
  transformCellText: {
    type: Function
  },
  csp: objectType(),
  input: objectType(),
  autoInsertSpaceInButton: {
    type: Boolean,
    default: void 0
  },
  locale: objectType(),
  pageHeader: objectType(),
  componentSize: {
    type: String
  },
  componentDisabled: {
    type: Boolean,
    default: void 0
  },
  direction: {
    type: String,
    default: "ltr"
  },
  space: objectType(),
  virtual: {
    type: Boolean,
    default: void 0
  },
  dropdownMatchSelectWidth: {
    type: [Number, Boolean],
    default: true
  },
  form: objectType(),
  pagination: objectType(),
  theme: objectType(),
  select: objectType(),
  wave: objectType()
});
const configProviderKey = Symbol("configProvider");
const defaultConfigProvider = {
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `ant-${suffixCls}` : "ant";
  },
  iconPrefixCls: computed(() => defaultIconPrefixCls),
  getPopupContainer: computed(() => () => document.body),
  direction: computed(() => "ltr")
};
const useConfigContextInject = () => {
  return inject(configProviderKey, defaultConfigProvider);
};
const useConfigContextProvider = (props) => {
  return provide(configProviderKey, props);
};
const DisabledContextKey = Symbol("DisabledContextKey");
const useInjectDisabled = () => {
  return inject(DisabledContextKey, ref(void 0));
};
const useProviderDisabled = (disabled) => {
  const parentDisabled = useInjectDisabled();
  provide(DisabledContextKey, computed(() => {
    var _a2;
    return (_a2 = disabled.value) !== null && _a2 !== void 0 ? _a2 : parentDisabled.value;
  }));
  return disabled;
};
const enUS = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  // Pagination.jsx
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
const locale$6 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const locale$5 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const locale$4 = {
  lang: _extends({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, locale$6),
  timePickerLocale: _extends({}, locale$5)
};
const typeTemplate$1 = "${label} is not a valid ${type}";
const localeValues$1 = {
  locale: "en",
  Pagination: enUS,
  DatePicker: locale$4,
  TimePicker: locale$5,
  Calendar: locale$4,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate$1,
        method: typeTemplate$1,
        array: typeTemplate$1,
        object: typeTemplate$1,
        number: typeTemplate$1,
        date: typeTemplate$1,
        boolean: typeTemplate$1,
        integer: typeTemplate$1,
        float: typeTemplate$1,
        regexp: typeTemplate$1,
        email: typeTemplate$1,
        url: typeTemplate$1,
        hex: typeTemplate$1
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  },
  QRCode: {
    expired: "QR code expired",
    refresh: "Refresh",
    scanned: "Scanned"
  }
};
const LocaleReceiver = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LocaleReceiver",
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const localeData2 = inject("localeData", {});
    const locale2 = computed(() => {
      const {
        componentName = "global",
        defaultLocale
      } = props;
      const locale3 = defaultLocale || localeValues$1[componentName || "global"];
      const {
        antLocale
      } = localeData2;
      const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return _extends(_extends({}, typeof locale3 === "function" ? locale3() : locale3), localeFromContext || {});
    });
    const localeCode = computed(() => {
      const {
        antLocale
      } = localeData2;
      const localeCode2 = antLocale && antLocale.locale;
      if (antLocale && antLocale.exist && !localeCode2) {
        return localeValues$1.locale;
      }
      return localeCode2;
    });
    return () => {
      const children = props.children || slots.default;
      const {
        antLocale
      } = localeData2;
      return children === null || children === void 0 ? void 0 : children(locale2.value, localeCode.value, antLocale);
    };
  }
});
function useLocaleReceiver(componentName, defaultLocale, propsLocale) {
  const localeData2 = inject("localeData", {});
  const componentLocale = computed(() => {
    const {
      antLocale
    } = localeData2;
    const locale2 = unref(defaultLocale) || localeValues$1[componentName];
    const localeFromContext = antLocale ? antLocale[componentName] : {};
    return _extends(_extends(_extends({}, typeof locale2 === "function" ? locale2() : locale2), localeFromContext || {}), unref(propsLocale) || {});
  });
  return [componentLocale];
}
const SPLIT = "%";
class Entity {
  constructor(instanceId) {
    this.cache = /* @__PURE__ */ new Map();
    this.instanceId = instanceId;
  }
  get(keys) {
    return this.cache.get(Array.isArray(keys) ? keys.join(SPLIT) : keys) || null;
  }
  update(keys, valueFn) {
    const path = Array.isArray(keys) ? keys.join(SPLIT) : keys;
    const prevValue = this.cache.get(path);
    const nextValue = valueFn(prevValue);
    if (nextValue === null) {
      this.cache.delete(path);
    } else {
      this.cache.set(path, nextValue);
    }
  }
}
const ATTR_TOKEN = "data-token-hash";
const ATTR_MARK = "data-css-hash";
const CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
function createCache() {
  const cssinjsInstanceId = Math.random().toString(12).slice(2);
  if (typeof document !== "undefined" && document.head && document.body) {
    const styles = document.body.querySelectorAll(`style[${ATTR_MARK}]`) || [];
    const {
      firstChild
    } = document.head;
    Array.from(styles).forEach((style) => {
      style[CSS_IN_JS_INSTANCE] = style[CSS_IN_JS_INSTANCE] || cssinjsInstanceId;
      if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
        document.head.insertBefore(style, firstChild);
      }
    });
    const styleHash = {};
    Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style) => {
      var _a2;
      const hash = style.getAttribute(ATTR_MARK);
      if (styleHash[hash]) {
        if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
          (_a2 = style.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(style);
        }
      } else {
        styleHash[hash] = true;
      }
    });
  }
  return new Entity(cssinjsInstanceId);
}
const StyleContextKey = Symbol("StyleContextKey");
const getCache = () => {
  var _a2, _b, _c;
  const instance = getCurrentInstance();
  let cache;
  if (instance && instance.appContext) {
    const globalCache = (_c = (_b = (_a2 = instance.appContext) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b === void 0 ? void 0 : _b.globalProperties) === null || _c === void 0 ? void 0 : _c.__ANTDV_CSSINJS_CACHE__;
    if (globalCache) {
      cache = globalCache;
    } else {
      cache = createCache();
      if (instance.appContext.config.globalProperties) {
        instance.appContext.config.globalProperties.__ANTDV_CSSINJS_CACHE__ = cache;
      }
    }
  } else {
    cache = createCache();
  }
  return cache;
};
const defaultStyleContext = {
  cache: createCache(),
  defaultCache: true,
  hashPriority: "low"
};
const useStyleInject = () => {
  const cache = getCache();
  return inject(StyleContextKey, shallowRef(_extends(_extends({}, defaultStyleContext), {
    cache
  })));
};
const useStyleProvider = (props) => {
  const parentContext = useStyleInject();
  const context = shallowRef(_extends(_extends({}, defaultStyleContext), {
    cache: createCache()
  }));
  watch([() => unref(props), parentContext], () => {
    const mergedContext = _extends({}, parentContext.value);
    const propsValue = unref(props);
    Object.keys(propsValue).forEach((key2) => {
      const value = propsValue[key2];
      if (propsValue[key2] !== void 0) {
        mergedContext[key2] = value;
      }
    });
    const {
      cache
    } = propsValue;
    mergedContext.cache = mergedContext.cache || createCache();
    mergedContext.defaultCache = !cache && parentContext.value.defaultCache;
    context.value = mergedContext;
  }, {
    immediate: true
  });
  provide(StyleContextKey, context);
  return context;
};
const styleProviderProps = () => ({
  autoClear: booleanType(),
  /** @private Test only. Not work in production. */
  mock: stringType(),
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  cache: objectType(),
  /** Tell children that this context is default generated context */
  defaultCache: booleanType(),
  /** Use `:where` selector to reduce hashId css selector priority */
  hashPriority: stringType(),
  /** Tell cssinjs where to inject style in */
  container: someType(),
  /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
  ssrInline: booleanType(),
  /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
  transformers: arrayType(),
  /**
   * Linters to lint css before inject in document.
   * Styles will be linted after transforming.
   * Please note that `linters` do not support dynamic update.
   */
  linters: arrayType()
});
withInstall(defineComponent({
  name: "AStyleProvider",
  inheritAttrs: false,
  props: styleProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useStyleProvider(props);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
}));
function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
  const styleContext = useStyleInject();
  const fullPathStr = shallowRef("");
  const res = shallowRef();
  watchEffect(() => {
    fullPathStr.value = [prefix, ...keyPath.value].join("%");
  });
  const clearCache = (pathStr) => {
    styleContext.value.cache.update(pathStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      const nextCount = times - 1;
      if (nextCount === 0) {
        onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(cache, false);
        return null;
      }
      return [times - 1, cache];
    });
  };
  watch(fullPathStr, (newStr, oldStr) => {
    if (oldStr) clearCache(oldStr);
    styleContext.value.cache.update(newStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      let tmpCache = cache;
      const mergedCache = tmpCache || cacheFn();
      return [times + 1, mergedCache];
    });
    res.value = styleContext.value.cache.get(fullPathStr.value)[1];
  }, {
    immediate: true
  });
  onBeforeUnmount(() => {
    clearCache(fullPathStr.value);
  });
  return res;
}
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function contains(root, n) {
  if (!root) {
    return false;
  }
  if (root.contains) {
    return root.contains(n);
  }
  return false;
}
const APPEND_ORDER = "data-vc-order";
const MARK_KEY = `vc-util-key`;
const containerCache = /* @__PURE__ */ new Map();
function getMark() {
  let {
    mark
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer$1(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === "STYLE");
}
function injectCSS(css) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom()) {
    return null;
  }
  const {
    csp,
    prepend
  } = option;
  const styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
  if (csp === null || csp === void 0 ? void 0 : csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css;
  const container = getContainer$1(option);
  const {
    firstChild
  } = container;
  if (prepend) {
    if (prepend === "queue") {
      const existStyle = findStyles(container).filter((node) => ["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER)));
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key2) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const container = getContainer$1(option);
  return findStyles(container).find((node) => node.getAttribute(getMark(option)) === key2);
}
function removeCSS(key2) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const existNode = findExistNode(key2, option);
  if (existNode) {
    const container = getContainer$1(option);
    container.removeChild(existNode);
  }
}
function syncRealContainer(container, option) {
  const cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    const placeholderStyle = injectCSS("", option);
    const {
      parentNode
    } = placeholderStyle;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS(css, key2) {
  let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var _a2, _b, _c;
  const container = getContainer$1(option);
  syncRealContainer(container, option);
  const existNode = findExistNode(key2, option);
  if (existNode) {
    if (((_a2 = option.csp) === null || _a2 === void 0 ? void 0 : _a2.nonce) && existNode.nonce !== ((_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce)) {
      existNode.nonce = (_c = option.csp) === null || _c === void 0 ? void 0 : _c.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  const newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key2);
  return newNode;
}
function sameDerivativeOption(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
class ThemeCache {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.keys = [];
    this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(derivativeOption) {
    let updateCallTimes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let cache = {
      map: this.cache
    };
    derivativeOption.forEach((derivative2) => {
      var _a2;
      if (!cache) {
        cache = void 0;
      } else {
        cache = (_a2 = cache === null || cache === void 0 ? void 0 : cache.map) === null || _a2 === void 0 ? void 0 : _a2.get(derivative2);
      }
    });
    if ((cache === null || cache === void 0 ? void 0 : cache.value) && updateCallTimes) {
      cache.value[1] = this.cacheCallTimes++;
    }
    return cache === null || cache === void 0 ? void 0 : cache.value;
  }
  get(derivativeOption) {
    var _a2;
    return (_a2 = this.internalGet(derivativeOption, true)) === null || _a2 === void 0 ? void 0 : _a2[0];
  }
  has(derivativeOption) {
    return !!this.internalGet(derivativeOption);
  }
  set(derivativeOption, value) {
    if (!this.has(derivativeOption)) {
      if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
        const [targetKey] = this.keys.reduce((result, key2) => {
          const [, callTimes] = result;
          if (this.internalGet(key2)[1] < callTimes) {
            return [key2, this.internalGet(key2)[1]];
          }
          return result;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(targetKey);
      }
      this.keys.push(derivativeOption);
    }
    let cache = this.cache;
    derivativeOption.forEach((derivative2, index2) => {
      if (index2 === derivativeOption.length - 1) {
        cache.set(derivative2, {
          value: [value, this.cacheCallTimes++]
        });
      } else {
        const cacheValue = cache.get(derivative2);
        if (!cacheValue) {
          cache.set(derivative2, {
            map: /* @__PURE__ */ new Map()
          });
        } else if (!cacheValue.map) {
          cacheValue.map = /* @__PURE__ */ new Map();
        }
        cache = cache.get(derivative2).map;
      }
    });
  }
  deleteByPath(currentCache, derivatives) {
    var _a2;
    const cache = currentCache.get(derivatives[0]);
    if (derivatives.length === 1) {
      if (!cache.map) {
        currentCache.delete(derivatives[0]);
      } else {
        currentCache.set(derivatives[0], {
          map: cache.map
        });
      }
      return (_a2 = cache.value) === null || _a2 === void 0 ? void 0 : _a2[0];
    }
    const result = this.deleteByPath(cache.map, derivatives.slice(1));
    if ((!cache.map || cache.map.size === 0) && !cache.value) {
      currentCache.delete(derivatives[0]);
    }
    return result;
  }
  delete(derivativeOption) {
    if (this.has(derivativeOption)) {
      this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
      return this.deleteByPath(this.cache, derivativeOption);
    }
    return void 0;
  }
}
ThemeCache.MAX_CACHE_SIZE = 20;
ThemeCache.MAX_CACHE_OFFSET = 5;
let warned = {};
function warning$1(valid, message) {
}
function note(valid, message) {
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning$1, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
function noop$3() {
}
let warning = noop$3;
let uuid$2 = 0;
class Theme {
  constructor(derivatives) {
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid$2;
    if (derivatives.length === 0) {
      warning(derivatives.length > 0);
    }
    uuid$2 += 1;
  }
  getDerivativeToken(token) {
    return this.derivatives.reduce((result, derivative2) => derivative2(token, result), void 0);
  }
}
const cacheThemes = new ThemeCache();
function createTheme(derivatives) {
  const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }
  return cacheThemes.get(derivativeArr);
}
const flattenTokenCache = /* @__PURE__ */ new WeakMap();
function flattenToken(token) {
  let str = flattenTokenCache.get(token) || "";
  if (!str) {
    Object.keys(token).forEach((key2) => {
      const value = token[key2];
      str += key2;
      if (value instanceof Theme) {
        str += value.id;
      } else if (value && typeof value === "object") {
        str += flattenToken(value);
      } else {
        str += value;
      }
    });
    flattenTokenCache.set(token, str);
  }
  return str;
}
function token2key(token, salt) {
  return murmur2(`${salt}_${flattenToken(token)}`);
}
const randomSelectorKey = `random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
const checkContent = "_bAmBoO_";
function supportSelector(styleStr, handleElement, supportCheck) {
  var _a2, _b;
  if (canUseDom()) {
    updateCSS(styleStr, randomSelectorKey);
    const ele = document.createElement("div");
    ele.style.position = "fixed";
    ele.style.left = "0";
    ele.style.top = "0";
    handleElement === null || handleElement === void 0 ? void 0 : handleElement(ele);
    document.body.appendChild(ele);
    const support = supportCheck ? supportCheck(ele) : (_a2 = getComputedStyle(ele).content) === null || _a2 === void 0 ? void 0 : _a2.includes(checkContent);
    (_b = ele.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(ele);
    removeCSS(randomSelectorKey);
    return support;
  }
  return false;
}
let canLayer = void 0;
function supportLayer() {
  if (canLayer === void 0) {
    canLayer = supportSelector(`@layer ${randomSelectorKey} { .${randomSelectorKey} { content: "${checkContent}"!important; } }`, (ele) => {
      ele.className = randomSelectorKey;
    });
  }
  return canLayer;
}
const EMPTY_OVERRIDE = {};
const hashPrefix = "css";
const tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
function removeStyleTags(key2, instanceId) {
  if (typeof document !== "undefined") {
    const styles = document.querySelectorAll(`style[${ATTR_TOKEN}="${key2}"]`);
    styles.forEach((style) => {
      var _a2;
      if (style[CSS_IN_JS_INSTANCE] === instanceId) {
        (_a2 = style.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(style);
      }
    });
  }
}
const TOKEN_THRESHOLD = 0;
function cleanTokenStyle(tokenKey, instanceId) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
  const tokenKeyList = Array.from(tokenKeys.keys());
  const cleanableKeyList = tokenKeyList.filter((key2) => {
    const count = tokenKeys.get(key2) || 0;
    return count <= 0;
  });
  if (tokenKeyList.length - cleanableKeyList.length > TOKEN_THRESHOLD) {
    cleanableKeyList.forEach((key2) => {
      removeStyleTags(key2, instanceId);
      tokenKeys.delete(key2);
    });
  }
}
const getComputedToken = (originToken, overrideToken, theme, format) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  let mergedDerivativeToken = _extends(_extends({}, derivativeToken), overrideToken);
  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken);
  }
  return mergedDerivativeToken;
};
function useCacheToken(theme, tokens) {
  let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ref({});
  const style = useStyleInject();
  const mergedToken = computed(() => _extends({}, ...tokens.value));
  const tokenStr = computed(() => flattenToken(mergedToken.value));
  const overrideTokenStr = computed(() => flattenToken(option.value.override || EMPTY_OVERRIDE));
  const cachedToken = useClientCache("token", computed(() => [option.value.salt || "", theme.value.id, tokenStr.value, overrideTokenStr.value]), () => {
    const {
      salt = "",
      override = EMPTY_OVERRIDE,
      formatToken: formatToken2,
      getComputedToken: compute
    } = option.value;
    const mergedDerivativeToken = compute ? compute(mergedToken.value, override, theme.value) : getComputedToken(mergedToken.value, override, theme.value, formatToken2);
    const tokenKey = token2key(mergedDerivativeToken, salt);
    mergedDerivativeToken._tokenKey = tokenKey;
    recordCleanToken(tokenKey);
    const hashId = `${hashPrefix}-${murmur2(tokenKey)}`;
    mergedDerivativeToken._hashId = hashId;
    return [mergedDerivativeToken, hashId];
  }, (cache) => {
    var _a2;
    cleanTokenStyle(cache[0]._tokenKey, (_a2 = style.value) === null || _a2 === void 0 ? void 0 : _a2.cache.instanceId);
  });
  return cachedToken;
}
const ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
const CSS_FILE_STYLE = "_FILE_STYLE__";
let cachePathMap;
let fromCSSFile = true;
function prepare() {
  var _a2;
  if (!cachePathMap) {
    cachePathMap = {};
    if (canUseDom()) {
      const div = document.createElement("div");
      div.className = ATTR_CACHE_MAP;
      div.style.position = "fixed";
      div.style.visibility = "hidden";
      div.style.top = "-9999px";
      document.body.appendChild(div);
      let content = getComputedStyle(div).content || "";
      content = content.replace(/^"/, "").replace(/"$/, "");
      content.split(";").forEach((item) => {
        const [path, hash] = item.split(":");
        cachePathMap[path] = hash;
      });
      const inlineMapStyle = document.querySelector(`style[${ATTR_CACHE_MAP}]`);
      if (inlineMapStyle) {
        fromCSSFile = false;
        (_a2 = inlineMapStyle.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(inlineMapStyle);
      }
      document.body.removeChild(div);
    }
  }
}
function existPath(path) {
  prepare();
  return !!cachePathMap[path];
}
function getStyleAndHash(path) {
  const hash = cachePathMap[path];
  let styleStr = null;
  if (hash && canUseDom()) {
    if (fromCSSFile) {
      styleStr = CSS_FILE_STYLE;
    } else {
      const style = document.querySelector(`style[${ATTR_MARK}="${cachePathMap[path]}"]`);
      if (style) {
        styleStr = style.innerHTML;
      } else {
        delete cachePathMap[path];
      }
    }
  }
  return [styleStr, hash];
}
const isClientSide = canUseDom();
const SKIP_CHECK = "_skip_check_";
const MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr) {
  const serialized = serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value) {
  return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key2, hashId, hashPriority) {
  if (!hashId) {
    return key2;
  }
  const hashClassName = `.${hashId}`;
  const hashSelector = hashPriority === "low" ? `:where(${hashClassName})` : hashClassName;
  const keys = key2.split(",").map((k) => {
    var _a2;
    const fullPath = k.trim().split(/\s+/);
    let firstPath = fullPath[0] || "";
    const htmlElement = ((_a2 = firstPath.match(/^\w+/)) === null || _a2 === void 0 ? void 0 : _a2[0]) || "";
    firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
    return [firstPath, ...fullPath.slice(1)].join(" ");
  });
  return keys.join(",");
}
const globalEffectStyleKeys = /* @__PURE__ */ new Set();
const parseStyle = function(interpolation) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let {
    root,
    injectHash,
    parentSelectors
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: true,
    parentSelectors: []
  };
  const {
    hashId,
    layer,
    path,
    hashPriority,
    transformers = [],
    linters = []
  } = config;
  let styleStr = "";
  let effectStyle = {};
  function parseKeyframes(keyframes) {
    const animationName = keyframes.getName(hashId);
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config, {
        root: false,
        parentSelectors
      });
      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
    }
  }
  function flattenList(list) {
    let fullList = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item);
      }
    });
    return fullList;
  }
  const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
  flattenStyleList.forEach((originStyle) => {
    const style = typeof originStyle === "string" && !root ? {} : originStyle;
    if (typeof style === "string") {
      styleStr += `${style}
`;
    } else if (style._keyframe) {
      parseKeyframes(style);
    } else {
      const mergedStyle = transformers.reduce((prev, trans) => {
        var _a2;
        return ((_a2 = trans === null || trans === void 0 ? void 0 : trans.visit) === null || _a2 === void 0 ? void 0 : _a2.call(trans, prev)) || prev;
      }, style);
      Object.keys(mergedStyle).forEach((key2) => {
        var _a2;
        const value = mergedStyle[key2];
        if (typeof value === "object" && value && (key2 !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
          let subInjectHash = false;
          let mergedKey = key2.trim();
          let nextRoot = false;
          if ((root || injectHash) && hashId) {
            if (mergedKey.startsWith("@")) {
              subInjectHash = true;
            } else {
              mergedKey = injectSelectorHash(key2, hashId, hashPriority);
            }
          } else if (root && !hashId && (mergedKey === "&" || mergedKey === "")) {
            mergedKey = "";
            nextRoot = true;
          }
          const [parsedStr, childEffectStyle] = parseStyle(value, config, {
            root: nextRoot,
            injectHash: subInjectHash,
            parentSelectors: [...parentSelectors, mergedKey]
          });
          effectStyle = _extends(_extends({}, effectStyle), childEffectStyle);
          styleStr += `${mergedKey}${parsedStr}`;
        } else {
          let appendStyle = function(cssKey, cssValue) {
            const styleName = cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
            let formatValue2 = cssValue;
            if (!unitlessKeys[cssKey] && typeof formatValue2 === "number" && formatValue2 !== 0) {
              formatValue2 = `${formatValue2}px`;
            }
            if (cssKey === "animationName" && (cssValue === null || cssValue === void 0 ? void 0 : cssValue._keyframe)) {
              parseKeyframes(cssValue);
              formatValue2 = cssValue.getName(hashId);
            }
            styleStr += `${styleName}:${formatValue2};`;
          };
          const actualValue = (_a2 = value === null || value === void 0 ? void 0 : value.value) !== null && _a2 !== void 0 ? _a2 : value;
          if (typeof value === "object" && (value === null || value === void 0 ? void 0 : value[MULTI_VALUE]) && Array.isArray(actualValue)) {
            actualValue.forEach((item) => {
              appendStyle(key2, item);
            });
          } else {
            appendStyle(key2, actualValue);
          }
        }
      });
    }
  });
  if (!root) {
    styleStr = `{${styleStr}}`;
  } else if (layer && supportLayer()) {
    const layerCells = layer.split(",");
    const layerName = layerCells[layerCells.length - 1].trim();
    styleStr = `@layer ${layerName} {${styleStr}}`;
    if (layerCells.length > 1) {
      styleStr = `@layer ${layer}{%%%:%}${styleStr}`;
    }
  }
  return [styleStr, effectStyle];
};
function uniqueHash(path, styleStr) {
  return murmur2(`${path.join("%")}${styleStr}`);
}
function useStyleRegister(info, styleFn) {
  const styleContext = useStyleInject();
  const tokenKey = computed(() => info.value.token._tokenKey);
  const fullPath = computed(() => [tokenKey.value, ...info.value.path]);
  let isMergedClientSide = isClientSide;
  useClientCache(
    "style",
    fullPath,
    // Create cache if needed
    () => {
      const {
        path,
        hashId,
        layer,
        nonce,
        clientOnly,
        order = 0
      } = info.value;
      const cachePath = fullPath.value.join("|");
      if (existPath(cachePath)) {
        const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
        if (inlineCacheStyleStr) {
          return [inlineCacheStyleStr, tokenKey.value, styleHash, {}, clientOnly, order];
        }
      }
      const styleObj = styleFn();
      const {
        hashPriority,
        container,
        transformers,
        linters,
        cache
      } = styleContext.value;
      const [parsedStyle, effectStyle] = parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer,
        path: path.join("-"),
        transformers,
        linters
      });
      const styleStr = normalizeStyle(parsedStyle);
      const styleId = uniqueHash(fullPath.value, styleStr);
      if (isMergedClientSide) {
        const mergedCSSConfig = {
          mark: ATTR_MARK,
          prepend: "queue",
          attachTo: container,
          priority: order
        };
        const nonceStr = typeof nonce === "function" ? nonce() : nonce;
        if (nonceStr) {
          mergedCSSConfig.csp = {
            nonce: nonceStr
          };
        }
        const style = updateCSS(styleStr, styleId, mergedCSSConfig);
        style[CSS_IN_JS_INSTANCE] = cache.instanceId;
        style.setAttribute(ATTR_TOKEN, tokenKey.value);
        Object.keys(effectStyle).forEach((effectKey) => {
          if (!globalEffectStyleKeys.has(effectKey)) {
            globalEffectStyleKeys.add(effectKey);
            updateCSS(normalizeStyle(effectStyle[effectKey]), `_effect-${effectKey}`, {
              mark: ATTR_MARK,
              prepend: "queue",
              attachTo: container
            });
          }
        });
      }
      return [styleStr, tokenKey.value, styleId, effectStyle, clientOnly, order];
    },
    // Remove cache if no need
    (_ref, fromHMR) => {
      let [, , styleId] = _ref;
      if ((fromHMR || styleContext.value.autoClear) && isClientSide) {
        removeCSS(styleId, {
          mark: ATTR_MARK
        });
      }
    }
  );
  return (node) => {
    return node;
  };
}
class Keyframe {
  constructor(name, style) {
    this._keyframe = true;
    this.name = name;
    this.style = style;
  }
  getName() {
    let hashId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return hashId ? `${hashId}-${this.name}` : this.name;
  }
}
function noSplit(list) {
  list.notSplit = true;
  return list;
}
({
  // Border
  borderBlock: noSplit(["borderTop", "borderBottom"]),
  borderBlockStart: noSplit(["borderTop"]),
  borderBlockEnd: noSplit(["borderBottom"]),
  borderInline: noSplit(["borderLeft", "borderRight"]),
  borderInlineStart: noSplit(["borderLeft"]),
  borderInlineEnd: noSplit(["borderRight"])
});
const version = "4.2.6";
const PresetColors = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
const genControlHeight = (token) => {
  const {
    controlHeight
  } = token;
  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25
  };
};
function genSizeMapToken(token) {
  const {
    sizeUnit,
    sizeStep
  } = token;
  return {
    sizeXXL: sizeUnit * (sizeStep + 8),
    sizeXL: sizeUnit * (sizeStep + 4),
    sizeLG: sizeUnit * (sizeStep + 2),
    sizeMD: sizeUnit * (sizeStep + 1),
    sizeMS: sizeUnit * sizeStep,
    size: sizeUnit * sizeStep,
    sizeSM: sizeUnit * (sizeStep - 1),
    sizeXS: sizeUnit * (sizeStep - 2),
    sizeXXS: sizeUnit * (sizeStep - 3)
    // 4
  };
}
const defaultPresetColors = {
  blue: "#1677ff",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  pink: "#eb2f96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
};
const seedToken = _extends(_extends({}, defaultPresetColors), {
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: false
});
function genColorMapToken(seed2, _ref) {
  let {
    generateColorPalettes: generateColorPalettes2,
    generateNeutralColorPalettes: generateNeutralColorPalettes2
  } = _ref;
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorBgBase,
    colorTextBase
  } = seed2;
  const primaryColors = generateColorPalettes2(colorPrimaryBase);
  const successColors = generateColorPalettes2(colorSuccessBase);
  const warningColors = generateColorPalettes2(colorWarningBase);
  const errorColors = generateColorPalettes2(colorErrorBase);
  const infoColors = generateColorPalettes2(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes2(colorBgBase, colorTextBase);
  return _extends(_extends({}, neutralColors), {
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],
    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],
    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],
    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],
    colorBgMask: new TinyColor("#000").setAlpha(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const genRadius = (radiusBase) => {
  let radiusLG = radiusBase;
  let radiusSM = radiusBase;
  let radiusXS = radiusBase;
  let radiusOuter = radiusBase;
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  if (radiusBase > 4 && radiusBase < 8) {
    radiusOuter = 4;
  } else if (radiusBase >= 8) {
    radiusOuter = 6;
  }
  return {
    borderRadius: radiusBase > 16 ? 16 : radiusBase,
    borderRadiusXS: radiusXS,
    borderRadiusSM: radiusSM,
    borderRadiusLG: radiusLG,
    borderRadiusOuter: radiusOuter
  };
};
function genCommonMapToken(token) {
  const {
    motionUnit,
    motionBase,
    borderRadius,
    lineWidth
  } = token;
  return _extends({
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
    // line
    lineWidthBold: lineWidth + 1
  }, genRadius(borderRadius));
}
const getAlphaColor$1 = (baseColor, alpha) => new TinyColor(baseColor).setAlpha(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
  const instance = new TinyColor(baseColor);
  return instance.darken(brightness).toHexString();
};
const generateColorPalettes = (baseColor) => {
  const colors = generate(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || "#fff";
  const colorTextBase = textBaseColor || "#000";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor$1(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor$1(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor$1(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor$1(colorTextBase, 0.25),
    colorFill: getAlphaColor$1(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor$1(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor$1(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor$1(colorTextBase, 0.02),
    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor$1(colorTextBase, 0.85),
    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6)
  };
};
function getFontSizes(base) {
  const fontSizes = new Array(10).fill(null).map((_, index2) => {
    const i = index2 - 1;
    const baseSize = base * Math.pow(2.71828, i / 5);
    const intSize = index2 > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
    return Math.floor(intSize / 2) * 2;
  });
  fontSizes[1] = base;
  return fontSizes.map((size) => {
    const height = size + 8;
    return {
      size,
      lineHeight: height / size
    };
  });
}
const genFontMapToken = (fontSize) => {
  const fontSizePairs = getFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
  return {
    fontSizeSM: fontSizes[0],
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],
    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2]
  };
};
function derivative(token) {
  const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
    const colors = generate(token[colorKey]);
    return new Array(10).fill(1).reduce((prev, _, i) => {
      prev[`${colorKey}-${i + 1}`] = colors[i];
      return prev;
    }, {});
  }).reduce((prev, cur) => {
    prev = _extends(_extends({}, prev), cur);
    return prev;
  }, {});
  return _extends(_extends(_extends(_extends(_extends(_extends(_extends({}, token), colorPalettes), genColorMapToken(token, {
    generateColorPalettes,
    generateNeutralColorPalettes
  })), genFontMapToken(token.fontSize)), genSizeMapToken(token)), genControlHeight(token)), genCommonMapToken(token));
}
function isStableColor(color) {
  return color >= 0 && color <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
  const {
    r: fR,
    g: fG,
    b: fB,
    a: originAlpha
  } = new TinyColor(frontColor).toRgb();
  if (originAlpha < 1) {
    return frontColor;
  }
  const {
    r: bR,
    g: bG,
    b: bB
  } = new TinyColor(backgroundColor).toRgb();
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA);
    const g = Math.round((fG - bG * (1 - fA)) / fA);
    const b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new TinyColor({
        r,
        g,
        b,
        a: Math.round(fA * 100) / 100
      }).toRgbString();
    }
  }
  return new TinyColor({
    r: fR,
    g: fG,
    b: fB,
    a: 1
  }).toRgbString();
}
var __rest$m = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function formatToken(derivativeToken) {
  const {
    override
  } = derivativeToken, restToken = __rest$m(derivativeToken, ["override"]);
  const overrideTokens = _extends({}, override);
  Object.keys(seedToken).forEach((token) => {
    delete overrideTokens[token];
  });
  const mergedToken = _extends(_extends({}, restToken), overrideTokens);
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;
  const screenXXXL = 2e3;
  const aliasToken = _extends(_extends(_extends({}, mergedToken), {
    colorLink: mergedToken.colorInfoText,
    colorLinkHover: mergedToken.colorInfoHover,
    colorLinkActive: mergedToken.colorInfoActive,
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorTextLightSolid: mergedToken.colorWhite,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,
    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,
    colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
    colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
    // Font
    fontSizeIcon: mergedToken.fontSizeSM,
    // Control
    lineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,
    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorFill,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
    lineType: mergedToken.lineType,
    borderRadius: mergedToken.borderRadius,
    borderRadiusXS: mergedToken.borderRadiusXS,
    borderRadiusSM: mergedToken.borderRadiusSM,
    borderRadiusLG: mergedToken.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,
    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,
    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
    boxShadow: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenSM - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenMD - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenLG - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenXL - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXXL - 1,
    screenXXXL,
    screenXXXLMin: screenXXXL,
    // FIXME: component box-shadow, should be removed
    boxShadowPopoverArrow: "3px 3px 7px rgba(0, 0, 0, 0.1)",
    boxShadowCard: `
      0 1px 2px -2px ${new TinyColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new TinyColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new TinyColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
  }), overrideTokens);
  return aliasToken;
}
const roundedArrow = (width, innerRadius, outerRadius, bgColor, boxShadow) => {
  const unitWidth = width / 2;
  const ax = 0;
  const ay = unitWidth;
  const bx = outerRadius * 1 / Math.sqrt(2);
  const by = unitWidth - outerRadius * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - innerRadius * (1 / Math.sqrt(2));
  const cy = outerRadius * (Math.sqrt(2) - 1) + innerRadius * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;
  const shadowWidth = unitWidth * Math.sqrt(2) + outerRadius * (Math.sqrt(2) - 2);
  const polygonOffset = outerRadius * (Math.sqrt(2) - 1);
  return {
    pointerEvents: "none",
    width,
    height: width,
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      width: shadowWidth,
      height: shadowWidth,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${innerRadius}px 0`
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    },
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width,
      height: width / 2,
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [`polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`, `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 0 ${fx} ${fy} Z')`]
      },
      content: '""'
    }
  };
};
function genPresetColor(token, genCss) {
  return PresetColors.reduce((prev, colorKey) => {
    const lightColor = token[`${colorKey}-1`];
    const lightBorderColor = token[`${colorKey}-3`];
    const darkColor = token[`${colorKey}-6`];
    const textColor = token[`${colorKey}-7`];
    return _extends(_extends({}, prev), genCss(colorKey, {
      lightColor,
      lightBorderColor,
      darkColor,
      textColor
    }));
  }, {});
}
const textEllipsis = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
};
const resetComponent = (token) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token.lineHeight,
  listStyle: "none",
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: token.fontFamily
});
const resetIcon = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
});
const clearFix = () => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  "&::before": {
    display: "table",
    content: '""'
  },
  "&::after": {
    // https://github.com/ant-design/ant-design/issues/21864
    display: "table",
    clear: "both",
    content: '""'
  }
});
const genLinkStyle = (token) => ({
  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: "transparent",
    outline: "none",
    cursor: "pointer",
    transition: `color ${token.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    "&:hover": {
      color: token.colorLinkHover
    },
    "&:active": {
      color: token.colorLinkActive
    },
    [`&:active,
  &:hover`]: {
      textDecoration: token.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: token.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: token.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
});
const genCommonStyle = (token, componentPrefixCls) => {
  const {
    fontFamily,
    fontSize
  } = token;
  const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  return {
    [rootPrefixSelector]: {
      fontFamily,
      fontSize,
      boxSizing: "border-box",
      "&::before, &::after": {
        boxSizing: "border-box"
      },
      [rootPrefixSelector]: {
        boxSizing: "border-box",
        "&::before, &::after": {
          boxSizing: "border-box"
        }
      }
    }
  };
};
const genFocusOutline = (token) => ({
  outline: `${token.lineWidthBold}px solid ${token.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: "outline-offset 0s, outline 0s"
});
const genFocusStyle = (token) => ({
  "&:focus-visible": _extends({}, genFocusOutline(token))
});
function genComponentStyleHook(component, styleFn, getDefaultToken) {
  return (_prefixCls) => {
    const prefixCls = computed(() => _prefixCls === null || _prefixCls === void 0 ? void 0 : _prefixCls.value);
    const [theme, token, hashId] = useToken();
    const {
      getPrefixCls,
      iconPrefixCls
    } = useConfigContextInject();
    const rootPrefixCls = computed(() => getPrefixCls());
    const sharedInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: ["Shared", rootPrefixCls.value]
      };
    });
    useStyleRegister(sharedInfo, () => [{
      // Link
      "&": genLinkStyle(token.value)
    }]);
    const componentInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: [component, prefixCls.value, iconPrefixCls.value]
      };
    });
    return [useStyleRegister(componentInfo, () => {
      const {
        token: proxyToken,
        flush
      } = statisticToken(token.value);
      const defaultComponentToken = typeof getDefaultToken === "function" ? getDefaultToken(proxyToken) : getDefaultToken;
      const mergedComponentToken = _extends(_extends({}, defaultComponentToken), token.value[component]);
      const componentCls = `.${prefixCls.value}`;
      const mergedToken = merge(proxyToken, {
        componentCls,
        prefixCls: prefixCls.value,
        iconCls: `.${iconPrefixCls.value}`,
        antCls: `.${rootPrefixCls.value}`
      }, mergedComponentToken);
      const styleInterpolation = styleFn(mergedToken, {
        hashId: hashId.value,
        prefixCls: prefixCls.value,
        rootPrefixCls: rootPrefixCls.value,
        iconPrefixCls: iconPrefixCls.value,
        overrideComponentToken: token.value[component]
      });
      flush(component, mergedComponentToken);
      return [genCommonStyle(token.value, prefixCls.value), styleInterpolation];
    }), hashId];
  };
}
const enableStatistic = typeof CSSINJS_STATISTIC !== "undefined";
let recording = true;
function merge() {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }
  if (!enableStatistic) {
    return _extends({}, ...objs);
  }
  recording = false;
  const ret = {};
  objs.forEach((obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key2) => {
      Object.defineProperty(ret, key2, {
        configurable: true,
        enumerable: true,
        get: () => obj[key2]
      });
    });
  });
  recording = true;
  return ret;
}
function noop$2() {
}
function statisticToken(token) {
  let tokenKeys2;
  let proxy = token;
  let flush = noop$2;
  if (enableStatistic) {
    tokenKeys2 = /* @__PURE__ */ new Set();
    proxy = new Proxy(token, {
      get(obj, prop) {
        if (recording) {
          tokenKeys2.add(prop);
        }
        return obj[prop];
      }
    });
    flush = (componentName, componentToken) => {
      ({
        global: Array.from(tokenKeys2),
        component: componentToken
      });
    };
  }
  return {
    token: proxy,
    keys: tokenKeys2,
    flush
  };
}
const defaultTheme = createTheme(derivative);
const defaultConfig = {
  token: seedToken,
  hashed: true
};
const DesignTokenContextKey = Symbol("DesignTokenContext");
const globalDesignTokenApi = shallowRef();
const useDesignTokenProvider = (value) => {
  provide(DesignTokenContextKey, value);
  watch(value, () => {
    globalDesignTokenApi.value = unref(value);
    triggerRef(globalDesignTokenApi);
  }, {
    immediate: true,
    deep: true
  });
};
const DesignTokenProvider = defineComponent({
  props: {
    value: objectType()
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useDesignTokenProvider(computed(() => props.value));
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
function useToken() {
  const designTokenContext = inject(DesignTokenContextKey, computed(() => globalDesignTokenApi.value || defaultConfig));
  const salt = computed(() => `${version}-${designTokenContext.value.hashed || ""}`);
  const mergedTheme = computed(() => designTokenContext.value.theme || defaultTheme);
  const cacheToken = useCacheToken(mergedTheme, computed(() => [seedToken, designTokenContext.value.token]), computed(() => ({
    salt: salt.value,
    override: _extends({
      override: designTokenContext.value.token
    }, designTokenContext.value.components),
    formatToken
  })));
  return [mergedTheme, computed(() => cacheToken.value[0]), computed(() => designTokenContext.value.hashed ? cacheToken.value[1] : "")];
}
const Empty$2 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup() {
    const [, token] = useToken();
    const themeStyle = computed(() => {
      const bgColor = new TinyColor(token.value.colorBgBase);
      if (bgColor.toHsl().l < 0.5) {
        return {
          opacity: 0.65
        };
      }
      return {};
    });
    return () => createVNode("svg", {
      "style": themeStyle.value,
      "width": "184",
      "height": "152",
      "viewBox": "0 0 184 152",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("g", {
      "fill": "none",
      "fill-rule": "evenodd"
    }, [createVNode("g", {
      "transform": "translate(24 31.67)"
    }, [createVNode("ellipse", {
      "fill-opacity": ".8",
      "fill": "#F5F5F7",
      "cx": "67.797",
      "cy": "106.89",
      "rx": "67.797",
      "ry": "12.668"
    }, null), createVNode("path", {
      "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",
      "fill": "#AEB8C2"
    }, null), createVNode("path", {
      "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
      "fill": "url(#linearGradient-1)",
      "transform": "translate(13.56)"
    }, null), createVNode("path", {
      "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",
      "fill": "#F5F5F7"
    }, null), createVNode("path", {
      "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",
      "fill": "#DCE0E6"
    }, null)]), createVNode("path", {
      "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",
      "fill": "#DCE0E6"
    }, null), createVNode("g", {
      "transform": "translate(149.65 15.383)",
      "fill": "#FFF"
    }, [createVNode("ellipse", {
      "cx": "20.654",
      "cy": "3.167",
      "rx": "2.849",
      "ry": "2.815"
    }, null), createVNode("path", {
      "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
    }, null)])])]);
  }
});
Empty$2.PRESENTED_IMAGE_DEFAULT = true;
const Simple = defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup() {
    const [, token] = useToken();
    const color = computed(() => {
      const {
        colorFill,
        colorFillTertiary,
        colorFillQuaternary,
        colorBgContainer
      } = token.value;
      return {
        borderColor: new TinyColor(colorFill).onBackground(colorBgContainer).toHexString(),
        shadowColor: new TinyColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
        contentColor: new TinyColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString()
      };
    });
    return () => createVNode("svg", {
      "width": "64",
      "height": "41",
      "viewBox": "0 0 64 41",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("g", {
      "transform": "translate(0 1)",
      "fill": "none",
      "fill-rule": "evenodd"
    }, [createVNode("ellipse", {
      "fill": color.value.shadowColor,
      "cx": "32",
      "cy": "33",
      "rx": "32",
      "ry": "7"
    }, null), createVNode("g", {
      "fill-rule": "nonzero",
      "stroke": color.value.borderColor
    }, [createVNode("path", {
      "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
    }, null), createVNode("path", {
      "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
      "fill": color.value.contentColor
    }, null)])])]);
  }
});
Simple.PRESENTED_IMAGE_SIMPLE = true;
const genSharedEmptyStyle = (token) => {
  const {
    componentCls,
    margin,
    marginXS,
    marginXL,
    fontSize,
    lineHeight
  } = token;
  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: "center",
      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,
        opacity: token.opacityImage,
        img: {
          height: "100%"
        },
        svg: {
          height: "100%",
          margin: "auto"
        }
      },
      // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-footer`]: {
        marginTop: margin
      },
      "&-normal": {
        marginBlock: marginXL,
        color: token.colorTextDisabled,
        [`${componentCls}-image`]: {
          height: token.emptyImgHeightMD
        }
      },
      "&-small": {
        marginBlock: marginXS,
        color: token.colorTextDisabled,
        [`${componentCls}-image`]: {
          height: token.emptyImgHeightSM
        }
      }
    }
  };
};
const useStyle$j = genComponentStyleHook("Empty", (token) => {
  const {
    componentCls,
    controlHeightLG
  } = token;
  const emptyToken = merge(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875
  });
  return [genSharedEmptyStyle(emptyToken)];
});
var __rest$l = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const emptyProps = () => ({
  prefixCls: String,
  imageStyle: objectType(),
  image: anyType(),
  description: anyType()
});
const Empty = defineComponent({
  name: "AEmpty",
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: emptyProps(),
  setup(props, _ref) {
    let {
      slots = {},
      attrs
    } = _ref;
    const {
      direction,
      prefixCls: prefixClsRef
    } = useConfigInject("empty", props);
    const [wrapSSR, hashId] = useStyle$j(prefixClsRef);
    return () => {
      var _a2, _b;
      const prefixCls = prefixClsRef.value;
      const _c = _extends(_extends({}, props), attrs), {
        image: mergedImage = ((_a2 = slots.image) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || h(Empty$2),
        description = ((_b = slots.description) === null || _b === void 0 ? void 0 : _b.call(slots)) || void 0,
        imageStyle,
        class: className = ""
      } = _c, restProps = __rest$l(_c, ["image", "description", "imageStyle", "class"]);
      const image = typeof mergedImage === "function" ? mergedImage() : mergedImage;
      const isNormal = typeof image === "object" && "type" in image && image.type.PRESENTED_IMAGE_SIMPLE;
      return wrapSSR(createVNode(LocaleReceiver, {
        "componentName": "Empty",
        "children": (locale2) => {
          const des = typeof description !== "undefined" ? description : locale2.description;
          const alt = typeof des === "string" ? des : "empty";
          let imageNode = null;
          if (typeof image === "string") {
            imageNode = createVNode("img", {
              "alt": alt,
              "src": image
            }, null);
          } else {
            imageNode = image;
          }
          return createVNode("div", _objectSpread2({
            "class": classNames(prefixCls, className, hashId.value, {
              [`${prefixCls}-normal`]: isNormal,
              [`${prefixCls}-rtl`]: direction.value === "rtl"
            })
          }, restProps), [createVNode("div", {
            "class": `${prefixCls}-image`,
            "style": imageStyle
          }, [imageNode]), des && createVNode("p", {
            "class": `${prefixCls}-description`
          }, [des]), slots.default && createVNode("div", {
            "class": `${prefixCls}-footer`
          }, [filterEmpty(slots.default())])]);
        }
      }, null));
    };
  }
});
Empty.PRESENTED_IMAGE_DEFAULT = () => h(Empty$2);
Empty.PRESENTED_IMAGE_SIMPLE = () => h(Simple);
const Empty$1 = withInstall(Empty);
const DefaultRenderEmpty = (props) => {
  const {
    prefixCls
  } = useConfigInject("empty", props);
  const renderHtml = (componentName) => {
    switch (componentName) {
      case "Table":
      case "List":
        return createVNode(Empty$1, {
          "image": Empty$1.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return createVNode(Empty$1, {
          "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
          "class": `${prefixCls.value}-small`
        }, null);
      default:
        return createVNode(Empty$1, null, null);
    }
  };
  return renderHtml(props.componentName);
};
function renderEmpty(componentName) {
  return createVNode(DefaultRenderEmpty, {
    "componentName": componentName
  }, null);
}
const SizeContextKey = Symbol("SizeContextKey");
const useInjectSize = () => {
  return inject(SizeContextKey, ref(void 0));
};
const useProviderSize = (size) => {
  const parentSize = useInjectSize();
  provide(SizeContextKey, computed(() => size.value || parentSize.value));
  return size;
};
const useConfigInject = (name, props) => {
  const sizeContext = useInjectSize();
  const disabledContext = useInjectDisabled();
  const configProvider = inject(configProviderKey, _extends(_extends({}, defaultConfigProvider), {
    renderEmpty: (name2) => h(DefaultRenderEmpty, {
      componentName: name2
    })
  }));
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
  const direction = computed(() => {
    var _a2, _b;
    return (_a2 = props.direction) !== null && _a2 !== void 0 ? _a2 : (_b = configProvider.direction) === null || _b === void 0 ? void 0 : _b.value;
  });
  const iconPrefixCls = computed(() => {
    var _a2;
    return (_a2 = props.iconPrefixCls) !== null && _a2 !== void 0 ? _a2 : configProvider.iconPrefixCls.value;
  });
  const rootPrefixCls = computed(() => configProvider.getPrefixCls());
  const autoInsertSpaceInButton = computed(() => {
    var _a2;
    return (_a2 = configProvider.autoInsertSpaceInButton) === null || _a2 === void 0 ? void 0 : _a2.value;
  });
  const renderEmpty2 = configProvider.renderEmpty;
  const space = configProvider.space;
  const pageHeader = configProvider.pageHeader;
  const form = configProvider.form;
  const getTargetContainer = computed(() => {
    var _a2, _b;
    return (_a2 = props.getTargetContainer) !== null && _a2 !== void 0 ? _a2 : (_b = configProvider.getTargetContainer) === null || _b === void 0 ? void 0 : _b.value;
  });
  const getPopupContainer = computed(() => {
    var _a2, _b, _c;
    return (_b = (_a2 = props.getContainer) !== null && _a2 !== void 0 ? _a2 : props.getPopupContainer) !== null && _b !== void 0 ? _b : (_c = configProvider.getPopupContainer) === null || _c === void 0 ? void 0 : _c.value;
  });
  const dropdownMatchSelectWidth = computed(() => {
    var _a2, _b;
    return (_a2 = props.dropdownMatchSelectWidth) !== null && _a2 !== void 0 ? _a2 : (_b = configProvider.dropdownMatchSelectWidth) === null || _b === void 0 ? void 0 : _b.value;
  });
  const virtual = computed(() => {
    var _a2;
    return (props.virtual === void 0 ? ((_a2 = configProvider.virtual) === null || _a2 === void 0 ? void 0 : _a2.value) !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
  });
  const size = computed(() => props.size || sizeContext.value);
  const autocomplete = computed(() => {
    var _a2, _b, _c;
    return (_a2 = props.autocomplete) !== null && _a2 !== void 0 ? _a2 : (_c = (_b = configProvider.input) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.autocomplete;
  });
  const disabled = computed(() => {
    var _a2;
    return (_a2 = props.disabled) !== null && _a2 !== void 0 ? _a2 : disabledContext.value;
  });
  const csp = computed(() => {
    var _a2;
    return (_a2 = props.csp) !== null && _a2 !== void 0 ? _a2 : configProvider.csp;
  });
  const wave = computed(() => {
    var _a2, _b;
    return (_a2 = props.wave) !== null && _a2 !== void 0 ? _a2 : (_b = configProvider.wave) === null || _b === void 0 ? void 0 : _b.value;
  });
  return {
    configProvider,
    prefixCls,
    direction,
    size,
    getTargetContainer,
    getPopupContainer,
    space,
    pageHeader,
    form,
    autoInsertSpaceInButton,
    renderEmpty: renderEmpty2,
    virtual,
    dropdownMatchSelectWidth,
    rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete,
    csp,
    iconPrefixCls,
    disabled,
    select: configProvider.select,
    wave
  };
};
function omit(obj, fields) {
  const shallowCopy = _extends({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key2 = fields[i];
    delete shallowCopy[key2];
  }
  return shallowCopy;
}
const PropTypes = z({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
PropTypes.extend([{
  name: "looseBool",
  getter: true,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: true,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: true,
  type: null
}]);
const devWarning = (valid, component, message) => {
  warningOnce(valid, `[ant-design-vue: ${component}] ${message}`);
};
function returnEmptyString() {
  return "";
}
function returnDocument(element) {
  if (element) {
    return element.ownerDocument;
  }
  return window.document;
}
function noop$1() {
}
const triggerProps = () => ({
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).def([]),
  showAction: PropTypes.any.def([]),
  hideAction: PropTypes.any.def([]),
  getPopupClassNameFromAlign: PropTypes.any.def(returnEmptyString),
  onPopupVisibleChange: Function,
  afterPopupVisibleChange: PropTypes.func.def(noop$1),
  popup: PropTypes.any,
  arrow: PropTypes.bool.def(true),
  popupStyle: {
    type: Object,
    default: void 0
  },
  prefixCls: PropTypes.string.def("rc-trigger-popup"),
  popupClassName: PropTypes.string.def(""),
  popupPlacement: String,
  builtinPlacements: PropTypes.object,
  popupTransitionName: String,
  popupAnimation: PropTypes.any,
  mouseEnterDelay: PropTypes.number.def(0),
  mouseLeaveDelay: PropTypes.number.def(0.1),
  zIndex: Number,
  focusDelay: PropTypes.number.def(0),
  blurDelay: PropTypes.number.def(0.15),
  getPopupContainer: Function,
  getDocument: PropTypes.func.def(returnDocument),
  forceRender: {
    type: Boolean,
    default: void 0
  },
  destroyPopupOnHide: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  // onPopupAlign: PropTypes.func.def(noop),
  popupAlign: PropTypes.object.def(() => ({})),
  popupVisible: {
    type: Boolean,
    default: void 0
  },
  defaultPopupVisible: {
    type: Boolean,
    default: false
  },
  maskTransitionName: String,
  maskAnimation: String,
  stretch: String,
  alignPoint: {
    type: Boolean,
    default: void 0
  },
  autoDestroy: {
    type: Boolean,
    default: false
  },
  mobile: Object,
  getTriggerDOMNode: Function
});
const innerProps = {
  visible: Boolean,
  prefixCls: String,
  zIndex: Number,
  destroyPopupOnHide: Boolean,
  forceRender: Boolean,
  arrow: {
    type: Boolean,
    default: true
  },
  // Legacy Motion
  animation: [String, Object],
  transitionName: String,
  // Measure
  stretch: {
    type: String
  },
  // Align
  align: {
    type: Object
  },
  point: {
    type: Object
  },
  getRootDomNode: {
    type: Function
  },
  getClassNameFromAlign: {
    type: Function
  },
  onAlign: {
    type: Function
  },
  onMouseenter: {
    type: Function
  },
  onMouseleave: {
    type: Function
  },
  onMousedown: {
    type: Function
  },
  onTouchstart: {
    type: Function
  }
};
const mobileProps = _extends(_extends({}, innerProps), {
  mobile: {
    type: Object
  }
});
const popupProps = _extends(_extends({}, innerProps), {
  mask: Boolean,
  mobile: {
    type: Object
  },
  maskAnimation: String,
  maskTransitionName: String
});
function getMotion$1(_ref) {
  let {
    prefixCls,
    animation,
    transitionName: transitionName2
  } = _ref;
  if (animation) {
    return {
      name: `${prefixCls}-${animation}`
    };
  }
  if (transitionName2) {
    return {
      name: transitionName2
    };
  }
  return {};
}
function Mask(props) {
  const {
    prefixCls,
    visible,
    zIndex,
    mask,
    maskAnimation,
    maskTransitionName
  } = props;
  if (!mask) {
    return null;
  }
  let motion = {};
  if (maskTransitionName || maskAnimation) {
    motion = getMotion$1({
      prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation
    });
  }
  return createVNode(Transition, _objectSpread2({
    "appear": true
  }, motion), {
    default: () => [withDirectives(createVNode("div", {
      "style": {
        zIndex
      },
      "class": `${prefixCls}-mask`
    }, null), [[resolveDirective("if"), visible]])]
  });
}
Mask.displayName = "Mask";
const MobilePopupInner = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "MobilePopupInner",
  inheritAttrs: false,
  props: mobileProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const elementRef = ref();
    expose({
      forceAlign: () => {
      },
      getElement: () => elementRef.value
    });
    return () => {
      var _a2;
      const {
        zIndex,
        visible,
        prefixCls,
        mobile: {
          popupClassName,
          popupStyle,
          popupMotion = {},
          popupRender
        } = {}
      } = props;
      const mergedStyle = _extends({
        zIndex
      }, popupStyle);
      let childNode = flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
      if (childNode.length > 1) {
        childNode = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      if (popupRender) {
        childNode = popupRender(childNode);
      }
      const mergedClassName = classNames(prefixCls, popupClassName);
      return createVNode(Transition, _objectSpread2({
        "ref": elementRef
      }, popupMotion), {
        default: () => [visible ? createVNode("div", {
          "class": mergedClassName,
          "style": mergedStyle
        }, [childNode]) : null]
      });
    };
  }
});
var __awaiter = function(thisArg, _arguments, P, generator2) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator2.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator2["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator2 = generator2.apply(thisArg, _arguments || [])).next());
  });
};
const StatusQueue = ["measure", "align", null, "motion"];
const useVisibleStatus = (visible, doMeasure) => {
  const status = shallowRef(null);
  const rafRef = shallowRef();
  const destroyRef = shallowRef(false);
  function setStatus(nextStatus) {
    if (!destroyRef.value) {
      status.value = nextStatus;
    }
  }
  function cancelRaf() {
    wrapperRaf.cancel(rafRef.value);
  }
  function goNextStatus(callback) {
    cancelRaf();
    rafRef.value = wrapperRaf(() => {
      let newStatus = status.value;
      switch (status.value) {
        case "align":
          newStatus = "motion";
          break;
        case "motion":
          newStatus = "stable";
          break;
      }
      setStatus(newStatus);
      callback === null || callback === void 0 ? void 0 : callback();
    });
  }
  watch(visible, () => {
    setStatus("measure");
  }, {
    immediate: true,
    flush: "post"
  });
  onMounted(() => {
    watch(status, () => {
      switch (status.value) {
        case "measure":
          doMeasure();
          break;
      }
      if (status.value) {
        rafRef.value = wrapperRaf(() => __awaiter(void 0, void 0, void 0, function* () {
          const index2 = StatusQueue.indexOf(status.value);
          const nextStatus = StatusQueue[index2 + 1];
          if (nextStatus && index2 !== -1) {
            setStatus(nextStatus);
          }
        }));
      }
    }, {
      immediate: true,
      flush: "post"
    });
  });
  onBeforeUnmount(() => {
    destroyRef.value = true;
    cancelRaf();
  });
  return [status, goNextStatus];
};
const useStretchStyle = (stretch) => {
  const targetSize = shallowRef({
    width: 0,
    height: 0
  });
  function measureStretch(element) {
    targetSize.value = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const style = computed(() => {
    const sizeStyle = {};
    if (stretch.value) {
      const {
        width,
        height
      } = targetSize.value;
      if (stretch.value.indexOf("height") !== -1 && height) {
        sizeStyle.height = `${height}px`;
      } else if (stretch.value.indexOf("minHeight") !== -1 && height) {
        sizeStyle.minHeight = `${height}px`;
      }
      if (stretch.value.indexOf("width") !== -1 && width) {
        sizeStyle.width = `${width}px`;
      } else if (stretch.value.indexOf("minWidth") !== -1 && width) {
        sizeStyle.minWidth = `${width}px`;
      }
    }
    return sizeStyle;
  });
  return [style, measureStretch];
};
function cloneElement(vnode) {
  let nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  let mergeRef = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  let ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, nodeProps, mergeRef);
  node.props = override ? _extends(_extends({}, node.props), nodeProps) : node.props;
  warning(typeof node.props.class !== "object");
  return node;
}
const isVisible = (element) => {
  if (!element) {
    return false;
  }
  if (element.offsetParent) {
    return true;
  }
  if (element.getBBox) {
    const box = element.getBBox();
    if (box.width || box.height) {
      return true;
    }
  }
  if (element.getBoundingClientRect) {
    const box = element.getBoundingClientRect();
    if (box.width || box.height) {
      return true;
    }
  }
  return false;
};
function isSamePoint(prev, next) {
  if (prev === next) return true;
  if (!prev || !next) return false;
  if ("pageX" in next && "pageY" in next) {
    return prev.pageX === next.pageX && prev.pageY === next.pageY;
  }
  if ("clientX" in next && "clientY" in next) {
    return prev.clientX === next.clientX && prev.clientY === next.clientY;
  }
  return false;
}
function restoreFocus(activeElement, container) {
  if (activeElement !== document.activeElement && contains(container, activeElement) && typeof activeElement.focus === "function") {
    activeElement.focus();
  }
}
function monitorResize(element, callback) {
  let prevWidth = null;
  let prevHeight = null;
  function onResize(_ref) {
    let [{
      target
    }] = _ref;
    if (!document.documentElement.contains(target)) return;
    const {
      width,
      height
    } = target.getBoundingClientRect();
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      Promise.resolve().then(() => {
        callback({
          width: fixedWidth,
          height: fixedHeight
        });
      });
    }
    prevWidth = fixedWidth;
    prevHeight = fixedHeight;
  }
  const resizeObserver = new index(onResize);
  if (element) {
    resizeObserver.observe(element);
  }
  return () => {
    resizeObserver.disconnect();
  };
}
const useBuffer = (callback, buffer) => {
  let called = false;
  let timeout = null;
  function cancelTrigger() {
    clearTimeout(timeout);
  }
  function trigger(force) {
    if (!called || force === true) {
      if (callback() === false) {
        return;
      }
      called = true;
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
      }, buffer.value);
    } else {
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
        trigger();
      }, buffer.value);
    }
  }
  return [trigger, () => {
    called = false;
    cancelTrigger();
  }];
};
const alignProps = {
  align: Object,
  target: [Object, Function],
  onAlign: Function,
  monitorBufferTime: Number,
  monitorWindowResize: Boolean,
  disabled: Boolean
};
function getElement(func) {
  if (typeof func !== "function") return null;
  return func();
}
function getPoint(point) {
  if (typeof point !== "object" || !point) return null;
  return point;
}
const Align = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Align",
  props: alignProps,
  emits: ["align"],
  setup(props, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const cacheRef = ref({});
    const nodeRef = ref();
    const [forceAlign, cancelForceAlign] = useBuffer(() => {
      const {
        disabled: latestDisabled,
        target: latestTarget,
        align: latestAlign,
        onAlign: latestOnAlign
      } = props;
      if (!latestDisabled && latestTarget && nodeRef.value) {
        const source = nodeRef.value;
        let result;
        const element = getElement(latestTarget);
        const point = getPoint(latestTarget);
        cacheRef.value.element = element;
        cacheRef.value.point = point;
        cacheRef.value.align = latestAlign;
        const {
          activeElement
        } = document;
        if (element && isVisible(element)) {
          result = alignElement(source, element, latestAlign);
        } else if (point) {
          result = alignPoint(source, point, latestAlign);
        }
        restoreFocus(activeElement, source);
        if (latestOnAlign && result) {
          latestOnAlign(source, result);
        }
        return true;
      }
      return false;
    }, computed(() => props.monitorBufferTime));
    const resizeMonitor = ref({
      cancel: () => {
      }
    });
    const sourceResizeMonitor = ref({
      cancel: () => {
      }
    });
    const goAlign = () => {
      const target = props.target;
      const element = getElement(target);
      const point = getPoint(target);
      if (nodeRef.value !== sourceResizeMonitor.value.element) {
        sourceResizeMonitor.value.cancel();
        sourceResizeMonitor.value.element = nodeRef.value;
        sourceResizeMonitor.value.cancel = monitorResize(nodeRef.value, forceAlign);
      }
      if (cacheRef.value.element !== element || !isSamePoint(cacheRef.value.point, point) || !isEqual$1(cacheRef.value.align, props.align)) {
        forceAlign();
        if (resizeMonitor.value.element !== element) {
          resizeMonitor.value.cancel();
          resizeMonitor.value.element = element;
          resizeMonitor.value.cancel = monitorResize(element, forceAlign);
        }
      }
    };
    onMounted(() => {
      nextTick(() => {
        goAlign();
      });
    });
    onUpdated(() => {
      nextTick(() => {
        goAlign();
      });
    });
    watch(() => props.disabled, (disabled) => {
      if (!disabled) {
        forceAlign();
      } else {
        cancelForceAlign();
      }
    }, {
      immediate: true,
      flush: "post"
    });
    const winResizeRef = ref(null);
    watch(() => props.monitorWindowResize, (monitorWindowResize) => {
      if (monitorWindowResize) {
        if (!winResizeRef.value) {
          winResizeRef.value = addEventListenerWrap(window, "resize", forceAlign);
        }
      } else if (winResizeRef.value) {
        winResizeRef.value.remove();
        winResizeRef.value = null;
      }
    }, {
      flush: "post"
    });
    onUnmounted(() => {
      resizeMonitor.value.cancel();
      sourceResizeMonitor.value.cancel();
      if (winResizeRef.value) winResizeRef.value.remove();
      cancelForceAlign();
    });
    expose({
      forceAlign: () => forceAlign(true)
    });
    return () => {
      const child = slots === null || slots === void 0 ? void 0 : slots.default();
      if (child) {
        return cloneElement(child[0], {
          ref: nodeRef
        }, true, true);
      }
      return null;
    };
  }
});
tuple$1("bottomLeft", "bottomRight", "topLeft", "topRight");
const getTransitionProps = function(transitionName2) {
  let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const transitionProps = transitionName2 ? _extends({
    name: transitionName2,
    appear: true,
    // type: 'animation',
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    // appearActiveClass: `antdv-base-transtion`,
    // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: `${transitionName2}-enter ${transitionName2}-enter-prepare ${transitionName2}-enter-start`,
    enterActiveClass: `${transitionName2}-enter ${transitionName2}-enter-prepare`,
    enterToClass: `${transitionName2}-enter ${transitionName2}-enter-active`,
    leaveFromClass: ` ${transitionName2}-leave`,
    leaveActiveClass: `${transitionName2}-leave ${transitionName2}-leave-active`,
    leaveToClass: `${transitionName2}-leave ${transitionName2}-leave-active`
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
const getTransitionGroupProps = function(transitionName2) {
  let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const transitionProps = transitionName2 ? _extends({
    name: transitionName2,
    appear: true,
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    appearActiveClass: `${transitionName2}`,
    appearToClass: `${transitionName2}-appear ${transitionName2}-appear-active`,
    enterFromClass: `${transitionName2}-appear ${transitionName2}-enter ${transitionName2}-appear-prepare ${transitionName2}-enter-prepare`,
    enterActiveClass: `${transitionName2}`,
    enterToClass: `${transitionName2}-enter ${transitionName2}-appear ${transitionName2}-appear-active ${transitionName2}-enter-active`,
    leaveActiveClass: `${transitionName2} ${transitionName2}-leave`,
    leaveToClass: `${transitionName2}-leave-active`
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
const getTransitionName = (rootPrefixCls, motion, transitionName2) => {
  if (transitionName2 !== void 0) {
    return transitionName2;
  }
  return `${rootPrefixCls}-${motion}`;
};
const PopupInner = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PopupInner",
  inheritAttrs: false,
  props: innerProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props, _ref) {
    let {
      expose,
      attrs,
      slots
    } = _ref;
    const alignRef = shallowRef();
    const elementRef = shallowRef();
    const alignedClassName = shallowRef();
    const [stretchStyle, measureStretchStyle] = useStretchStyle(toRef(props, "stretch"));
    const doMeasure = () => {
      if (props.stretch) {
        measureStretchStyle(props.getRootDomNode());
      }
    };
    const visible = shallowRef(false);
    let timeoutId;
    watch(() => props.visible, (val) => {
      clearTimeout(timeoutId);
      if (val) {
        timeoutId = setTimeout(() => {
          visible.value = props.visible;
        });
      } else {
        visible.value = false;
      }
    }, {
      immediate: true
    });
    const [status, goNextStatus] = useVisibleStatus(visible, doMeasure);
    const prepareResolveRef = shallowRef();
    const getAlignTarget = () => {
      if (props.point) {
        return props.point;
      }
      return props.getRootDomNode;
    };
    const forceAlign = () => {
      var _a2;
      (_a2 = alignRef.value) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
    };
    const onInternalAlign = (popupDomNode, matchAlign) => {
      var _a2;
      const nextAlignedClassName = props.getClassNameFromAlign(matchAlign);
      const preAlignedClassName = alignedClassName.value;
      if (alignedClassName.value !== nextAlignedClassName) {
        alignedClassName.value = nextAlignedClassName;
      }
      if (status.value === "align") {
        if (preAlignedClassName !== nextAlignedClassName) {
          Promise.resolve().then(() => {
            forceAlign();
          });
        } else {
          goNextStatus(() => {
            var _a3;
            (_a3 = prepareResolveRef.value) === null || _a3 === void 0 ? void 0 : _a3.call(prepareResolveRef);
          });
        }
        (_a2 = props.onAlign) === null || _a2 === void 0 ? void 0 : _a2.call(props, popupDomNode, matchAlign);
      }
    };
    const motion = computed(() => {
      const m = typeof props.animation === "object" ? props.animation : getMotion$1(props);
      ["onAfterEnter", "onAfterLeave"].forEach((eventName) => {
        const originFn = m[eventName];
        m[eventName] = (node) => {
          goNextStatus();
          status.value = "stable";
          originFn === null || originFn === void 0 ? void 0 : originFn(node);
        };
      });
      return m;
    });
    const onShowPrepare = () => {
      return new Promise((resolve) => {
        prepareResolveRef.value = resolve;
      });
    };
    watch([motion, status], () => {
      if (!motion.value && status.value === "motion") {
        goNextStatus();
      }
    }, {
      immediate: true
    });
    expose({
      forceAlign,
      getElement: () => {
        return elementRef.value.$el || elementRef.value;
      }
    });
    const alignDisabled = computed(() => {
      var _a2;
      if (((_a2 = props.align) === null || _a2 === void 0 ? void 0 : _a2.points) && (status.value === "align" || status.value === "stable")) {
        return false;
      }
      return true;
    });
    return () => {
      var _a2;
      const {
        zIndex,
        align,
        prefixCls,
        destroyPopupOnHide,
        onMouseenter,
        onMouseleave,
        onTouchstart = () => {
        },
        onMousedown
      } = props;
      const statusValue = status.value;
      const mergedStyle = [_extends(_extends({}, stretchStyle.value), {
        zIndex,
        opacity: statusValue === "motion" || statusValue === "stable" || !visible.value ? null : 0,
        // pointerEvents: statusValue === 'stable' ? null : 'none',
        pointerEvents: !visible.value && statusValue !== "stable" ? "none" : null
      }), attrs.style];
      let childNode = flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots, {
        visible: props.visible
      }));
      if (childNode.length > 1) {
        childNode = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      const mergedClassName = classNames(prefixCls, attrs.class, alignedClassName.value, !props.arrow && `${prefixCls}-arrow-hidden`);
      const hasAnimate = visible.value || !props.visible;
      const transitionProps = hasAnimate ? getTransitionProps(motion.value.name, motion.value) : {};
      return createVNode(Transition, _objectSpread2(_objectSpread2({
        "ref": elementRef
      }, transitionProps), {}, {
        "onBeforeEnter": onShowPrepare
      }), {
        default: () => {
          return !destroyPopupOnHide || props.visible ? withDirectives(createVNode(Align, {
            "target": getAlignTarget(),
            "key": "popup",
            "ref": alignRef,
            "monitorWindowResize": true,
            "disabled": alignDisabled.value,
            "align": align,
            "onAlign": onInternalAlign
          }, {
            default: () => createVNode("div", {
              "class": mergedClassName,
              "onMouseenter": onMouseenter,
              "onMouseleave": onMouseleave,
              "onMousedown": withModifiers(onMousedown, ["capture"]),
              [supportsPassive ? "onTouchstartPassive" : "onTouchstart"]: withModifiers(onTouchstart, ["capture"]),
              "style": mergedStyle
            }, [childNode])
          }), [[vShow, visible.value]]) : null;
        }
      });
    };
  }
});
const Popup = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Popup",
  inheritAttrs: false,
  props: popupProps,
  setup(props, _ref) {
    let {
      attrs,
      slots,
      expose
    } = _ref;
    const innerVisible = shallowRef(false);
    const inMobile = shallowRef(false);
    const popupRef = shallowRef();
    const rootRef = shallowRef();
    watch([() => props.visible, () => props.mobile], () => {
      innerVisible.value = props.visible;
      if (props.visible && props.mobile) {
        inMobile.value = true;
      }
    }, {
      immediate: true,
      flush: "post"
    });
    expose({
      forceAlign: () => {
        var _a2;
        (_a2 = popupRef.value) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
      },
      getElement: () => {
        var _a2;
        return (_a2 = popupRef.value) === null || _a2 === void 0 ? void 0 : _a2.getElement();
      }
    });
    return () => {
      const cloneProps = _extends(_extends(_extends({}, props), attrs), {
        visible: innerVisible.value
      });
      const popupNode = inMobile.value ? createVNode(MobilePopupInner, _objectSpread2(_objectSpread2({}, cloneProps), {}, {
        "mobile": props.mobile,
        "ref": popupRef
      }), {
        default: slots.default
      }) : createVNode(PopupInner, _objectSpread2(_objectSpread2({}, cloneProps), {}, {
        "ref": popupRef
      }), {
        default: slots.default
      });
      return createVNode("div", {
        "ref": rootRef
      }, [createVNode(Mask, cloneProps, null), popupNode]);
    };
  }
});
function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  const baseAlign = builtinPlacements[placementStr] || {};
  return _extends(_extends({}, baseAlign), align);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  const {
    points
  } = align;
  const placements2 = Object.keys(builtinPlacements);
  for (let i = 0; i < placements2.length; i += 1) {
    const placement = placements2[i];
    if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
      return `${prefixCls}-placement-${placement}`;
    }
  }
  return "";
}
const BaseMixin = {
  methods: {
    setState() {
      let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : void 0;
      let newState = typeof state === "function" ? state(this.$data, this.$props) : state;
      if (this.getDerivedStateFromProps) {
        const s = this.getDerivedStateFromProps(getOptionProps(this), _extends(_extends({}, this.$data), newState));
        if (s === null) {
          return;
        } else {
          newState = _extends(_extends({}, newState), s || {});
        }
      }
      _extends(this.$data, newState);
      if (this._.isMounted) {
        this.$forceUpdate();
      }
      nextTick(() => {
        callback && callback();
      });
    },
    __emit() {
      const args = [].slice.call(arguments, 0);
      let eventName = args[0];
      eventName = `on${eventName[0].toUpperCase()}${eventName.substring(1)}`;
      const event = this.$props[eventName] || this.$attrs[eventName];
      if (args.length && event) {
        if (Array.isArray(event)) {
          for (let i = 0, l = event.length; i < l; i++) {
            event[i](...args.slice(1));
          }
        } else {
          event(...args.slice(1));
        }
      }
    }
  }
};
const PortalContextKey = Symbol("PortalContextKey");
const useProvidePortal = function(instance) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    inTriggerContext: true
  };
  provide(PortalContextKey, {
    inTriggerContext: config.inTriggerContext,
    shouldRender: computed(() => {
      const {
        sPopupVisible,
        popupRef,
        forceRender,
        autoDestroy
      } = instance || {};
      let shouldRender = false;
      if (sPopupVisible || popupRef || forceRender) {
        shouldRender = true;
      }
      if (!sPopupVisible && autoDestroy) {
        shouldRender = false;
      }
      return shouldRender;
    })
  });
};
const useInjectPortal = () => {
  useProvidePortal({}, {
    inTriggerContext: false
  });
  const portalContext = inject(PortalContextKey, {
    shouldRender: computed(() => false),
    inTriggerContext: false
  });
  return {
    shouldRender: computed(() => portalContext.shouldRender.value || portalContext.inTriggerContext === false)
  };
};
const Portal$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Portal",
  inheritAttrs: false,
  props: {
    getContainer: PropTypes.func.isRequired,
    didUpdate: Function
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let isSSR = true;
    let container;
    const {
      shouldRender
    } = useInjectPortal();
    function setContainer() {
      if (shouldRender.value) {
        container = props.getContainer();
      }
    }
    onBeforeMount(() => {
      isSSR = false;
      setContainer();
    });
    onMounted(() => {
      if (container) return;
      setContainer();
    });
    const stopWatch = watch(shouldRender, () => {
      if (shouldRender.value && !container) {
        container = props.getContainer();
      }
      if (container) {
        stopWatch();
      }
    });
    onUpdated(() => {
      nextTick(() => {
        var _a2;
        if (shouldRender.value) {
          (_a2 = props.didUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(props, props);
        }
      });
    });
    return () => {
      var _a2;
      if (!shouldRender.value) return null;
      if (isSSR) {
        return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      }
      return container ? createVNode(Teleport, {
        "to": container
      }, slots) : null;
    };
  }
});
let cached;
function getScrollBarSize(fresh) {
  if (typeof document === "undefined") {
    return 0;
  }
  if (cached === void 0) {
    const inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "200px";
    const outer = document.createElement("div");
    const outerStyle = outer.style;
    outerStyle.position = "absolute";
    outerStyle.top = "0";
    outerStyle.left = "0";
    outerStyle.pointerEvents = "none";
    outerStyle.visibility = "hidden";
    outerStyle.width = "200px";
    outerStyle.height = "150px";
    outerStyle.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    const widthContained = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let widthScroll = inner.offsetWidth;
    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }
    document.body.removeChild(outer);
    cached = widthContained - widthScroll;
  }
  return cached;
}
const UNIQUE_ID = `vc-util-locker-${Date.now()}`;
let uuid$1 = 0;
function isBodyOverflowing() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
function useScrollLocker(lock) {
  const mergedLock = computed(() => !!lock && !!lock.value);
  uuid$1 += 1;
  const id = `${UNIQUE_ID}_${uuid$1}`;
  watchEffect((onClear) => {
    if (!canUseDom()) {
      return;
    }
    if (mergedLock.value) {
      const scrollbarSize = getScrollBarSize();
      const isOverflow = isBodyOverflowing();
      updateCSS(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id);
    } else {
      removeCSS(id);
    }
    onClear(() => {
      removeCSS(id);
    });
  }, {
    flush: "post"
  });
}
let openCount = 0;
const supportDom = canUseDom();
const getParent = (getContainer2) => {
  if (!supportDom) {
    return null;
  }
  if (getContainer2) {
    if (typeof getContainer2 === "string") {
      return document.querySelectorAll(getContainer2)[0];
    }
    if (typeof getContainer2 === "function") {
      return getContainer2();
    }
    if (typeof getContainer2 === "object" && getContainer2 instanceof window.HTMLElement) {
      return getContainer2;
    }
  }
  return document.body;
};
const Portal = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PortalWrapper",
  inheritAttrs: false,
  props: {
    wrapperClassName: String,
    forceRender: {
      type: Boolean,
      default: void 0
    },
    getContainer: PropTypes.any,
    visible: {
      type: Boolean,
      default: void 0
    },
    autoLock: booleanType(),
    didUpdate: Function
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const container = shallowRef();
    const componentRef = shallowRef();
    const rafId = shallowRef();
    const triggerUpdate = shallowRef(1);
    const defaultContainer = canUseDom() && document.createElement("div");
    const removeCurrentContainer = () => {
      var _a2, _b;
      if (container.value === defaultContainer) {
        (_b = (_a2 = container.value) === null || _a2 === void 0 ? void 0 : _a2.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(container.value);
      }
      container.value = null;
    };
    let parent = null;
    const attachToParent = function() {
      let force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (force || container.value && !container.value.parentNode) {
        parent = getParent(props.getContainer);
        if (parent) {
          parent.appendChild(container.value);
          return true;
        }
        return false;
      }
      return true;
    };
    const getContainer2 = () => {
      if (!supportDom) {
        return null;
      }
      if (!container.value) {
        container.value = defaultContainer;
        attachToParent(true);
      }
      setWrapperClassName();
      return container.value;
    };
    const setWrapperClassName = () => {
      const {
        wrapperClassName
      } = props;
      if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
        container.value.className = wrapperClassName;
      }
    };
    onUpdated(() => {
      setWrapperClassName();
      attachToParent();
    });
    useScrollLocker(computed(() => {
      return props.autoLock && props.visible && canUseDom() && (container.value === document.body || container.value === defaultContainer);
    }));
    onMounted(() => {
      let init = false;
      watch([() => props.visible, () => props.getContainer], (_ref2, _ref3) => {
        let [visible, getContainer22] = _ref2;
        let [prevVisible, prevGetContainer] = _ref3;
        if (supportDom) {
          parent = getParent(props.getContainer);
          if (parent === document.body) {
            if (visible && !prevVisible) {
              openCount += 1;
            } else if (init) {
              openCount -= 1;
            }
          }
        }
        if (init) {
          const getContainerIsFunc = typeof getContainer22 === "function" && typeof prevGetContainer === "function";
          if (getContainerIsFunc ? getContainer22.toString() !== prevGetContainer.toString() : getContainer22 !== prevGetContainer) {
            removeCurrentContainer();
          }
        }
        init = true;
      }, {
        immediate: true,
        flush: "post"
      });
      nextTick(() => {
        if (!attachToParent()) {
          rafId.value = wrapperRaf(() => {
            triggerUpdate.value += 1;
          });
        }
      });
    });
    onBeforeUnmount(() => {
      const {
        visible
      } = props;
      if (supportDom && parent === document.body) {
        openCount = visible && openCount ? openCount - 1 : openCount;
      }
      removeCurrentContainer();
      wrapperRaf.cancel(rafId.value);
    });
    return () => {
      const {
        forceRender,
        visible
      } = props;
      let portal = null;
      const childProps = {
        getOpenCount: () => openCount,
        getContainer: getContainer2
      };
      if (triggerUpdate.value && (forceRender || visible || componentRef.value)) {
        portal = createVNode(Portal$1, {
          "getContainer": getContainer2,
          "ref": componentRef,
          "didUpdate": props.didUpdate
        }, {
          default: () => {
            var _a2;
            return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots, childProps);
          }
        });
      }
      return portal;
    };
  }
});
const ALL_HANDLERS = ["onClick", "onMousedown", "onTouchstart", "onMouseenter", "onMouseleave", "onFocus", "onBlur", "onContextmenu"];
const Trigger = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Trigger",
  mixins: [BaseMixin],
  inheritAttrs: false,
  props: triggerProps(),
  setup(props) {
    const align = computed(() => {
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    });
    const popupRef = shallowRef(null);
    const setPopupRef = (val) => {
      popupRef.value = val;
    };
    return {
      vcTriggerContext: inject("vcTriggerContext", {}),
      popupRef,
      setPopupRef,
      triggerRef: shallowRef(null),
      align,
      focusTime: null,
      clickOutsideHandler: null,
      contextmenuOutsideHandler1: null,
      contextmenuOutsideHandler2: null,
      touchOutsideHandler: null,
      attachId: null,
      delayTimer: null,
      hasPopupMouseDown: false,
      preClickTime: null,
      preTouchTime: null,
      mouseDownTimeout: null,
      childOriginEvents: {}
    };
  },
  data() {
    const props = this.$props;
    let popupVisible;
    if (this.popupVisible !== void 0) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }
    ALL_HANDLERS.forEach((h2) => {
      this[`fire${h2}`] = (e) => {
        this.fireEvents(h2, e);
      };
    });
    return {
      prevPopupVisible: popupVisible,
      sPopupVisible: popupVisible,
      point: null
    };
  },
  watch: {
    popupVisible(val) {
      if (val !== void 0) {
        this.prevPopupVisible = this.sPopupVisible;
        this.sPopupVisible = val;
      }
    }
  },
  created() {
    provide("vcTriggerContext", {
      onPopupMouseDown: this.onPopupMouseDown,
      onPopupMouseenter: this.onPopupMouseenter,
      onPopupMouseleave: this.onPopupMouseleave
    });
    useProvidePortal(this);
  },
  deactivated() {
    this.setPopupVisible(false);
  },
  mounted() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  beforeUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
    clearTimeout(this.mouseDownTimeout);
    wrapperRaf.cancel(this.attachId);
  },
  methods: {
    updatedCal() {
      const props = this.$props;
      const state = this.$data;
      if (state.sPopupVisible) {
        let currentDocument;
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
          currentDocument = props.getDocument(this.getRootDomNode());
          this.clickOutsideHandler = addEventListenerWrap(currentDocument, "mousedown", this.onDocumentClick);
        }
        if (!this.touchOutsideHandler) {
          currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
          this.touchOutsideHandler = addEventListenerWrap(currentDocument, "touchstart", this.onDocumentClick, supportsPassive ? {
            passive: false
          } : false);
        }
        if (!this.contextmenuOutsideHandler1 && this.isContextmenuToShow()) {
          currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
          this.contextmenuOutsideHandler1 = addEventListenerWrap(currentDocument, "scroll", this.onContextmenuClose);
        }
        if (!this.contextmenuOutsideHandler2 && this.isContextmenuToShow()) {
          this.contextmenuOutsideHandler2 = addEventListenerWrap(window, "blur", this.onContextmenuClose);
        }
      } else {
        this.clearOutsideHandler();
      }
    },
    onMouseenter(e) {
      const {
        mouseEnterDelay
      } = this.$props;
      this.fireEvents("onMouseenter", e);
      this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
    },
    onMouseMove(e) {
      this.fireEvents("onMousemove", e);
      this.setPoint(e);
    },
    onMouseleave(e) {
      this.fireEvents("onMouseleave", e);
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
    },
    onPopupMouseenter() {
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseenter) {
        vcTriggerContext.onPopupMouseenter();
      }
      this.clearDelayTimer();
    },
    onPopupMouseleave(e) {
      var _a2;
      if (e && e.relatedTarget && !e.relatedTarget.setTimeout && contains((_a2 = this.popupRef) === null || _a2 === void 0 ? void 0 : _a2.getElement(), e.relatedTarget)) {
        return;
      }
      if (this.isMouseLeaveToHide()) {
        this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
      }
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseleave) {
        vcTriggerContext.onPopupMouseleave(e);
      }
    },
    onFocus(e) {
      this.fireEvents("onFocus", e);
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.$props.focusDelay);
      }
    },
    onMousedown(e) {
      this.fireEvents("onMousedown", e);
      this.preClickTime = Date.now();
    },
    onTouchstart(e) {
      this.fireEvents("onTouchstart", e);
      this.preTouchTime = Date.now();
    },
    onBlur(e) {
      if (!contains(e.target, e.relatedTarget || document.activeElement)) {
        this.fireEvents("onBlur", e);
        this.clearDelayTimer();
        if (this.isBlurToHide()) {
          this.delaySetPopupVisible(false, this.$props.blurDelay);
        }
      }
    },
    onContextmenu(e) {
      e.preventDefault();
      this.fireEvents("onContextmenu", e);
      this.setPopupVisible(true, e);
    },
    onContextmenuClose() {
      if (this.isContextmenuToShow()) {
        this.close();
      }
    },
    onClick(event) {
      this.fireEvents("onClick", event);
      if (this.focusTime) {
        let preTime;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      if (this.isClickToShow() && (this.isClickToHide() || this.isBlurToHide()) && event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.domEvent) {
        event.domEvent.preventDefault();
      }
      const nextVisible = !this.$data.sPopupVisible;
      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(!this.$data.sPopupVisible, event);
      }
    },
    onPopupMouseDown() {
      const {
        vcTriggerContext = {}
      } = this;
      this.hasPopupMouseDown = true;
      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(() => {
        this.hasPopupMouseDown = false;
      }, 0);
      if (vcTriggerContext.onPopupMouseDown) {
        vcTriggerContext.onPopupMouseDown(...arguments);
      }
    },
    onDocumentClick(event) {
      if (this.$props.mask && !this.$props.maskClosable) {
        return;
      }
      const target = event.target;
      const root = this.getRootDomNode();
      const popupNode = this.getPopupDomNode();
      if (
        // mousedown on the target should also close popup when action is contextMenu.
        // https://github.com/ant-design/ant-design/issues/29853
        (!contains(root, target) || this.isContextMenuOnly()) && !contains(popupNode, target) && !this.hasPopupMouseDown
      ) {
        this.delaySetPopupVisible(false, 0.1);
      }
    },
    getPopupDomNode() {
      var _a2;
      return ((_a2 = this.popupRef) === null || _a2 === void 0 ? void 0 : _a2.getElement()) || null;
    },
    getRootDomNode() {
      var _a2, _b, _c, _d;
      const {
        getTriggerDOMNode
      } = this.$props;
      if (getTriggerDOMNode) {
        const domNode = ((_b = (_a2 = this.triggerRef) === null || _a2 === void 0 ? void 0 : _a2.$el) === null || _b === void 0 ? void 0 : _b.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        return findDOMNode(getTriggerDOMNode(domNode));
      }
      try {
        const domNode = ((_d = (_c = this.triggerRef) === null || _c === void 0 ? void 0 : _c.$el) === null || _d === void 0 ? void 0 : _d.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        if (domNode) {
          return domNode;
        }
      } catch (err) {
      }
      return findDOMNode(this);
    },
    handleGetPopupClassFromAlign(align) {
      const className = [];
      const props = this.$props;
      const {
        popupPlacement,
        builtinPlacements,
        prefixCls,
        alignPoint: alignPoint2,
        getPopupClassNameFromAlign
      } = props;
      if (popupPlacement && builtinPlacements) {
        className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint2));
      }
      if (getPopupClassNameFromAlign) {
        className.push(getPopupClassNameFromAlign(align));
      }
      return className.join(" ");
    },
    getPopupAlign() {
      const props = this.$props;
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getComponent() {
      const mouseProps = {};
      if (this.isMouseEnterToShow()) {
        mouseProps.onMouseenter = this.onPopupMouseenter;
      }
      if (this.isMouseLeaveToHide()) {
        mouseProps.onMouseleave = this.onPopupMouseleave;
      }
      mouseProps.onMousedown = this.onPopupMouseDown;
      mouseProps[supportsPassive ? "onTouchstartPassive" : "onTouchstart"] = this.onPopupMouseDown;
      const {
        handleGetPopupClassFromAlign,
        getRootDomNode,
        $attrs
      } = this;
      const {
        prefixCls,
        destroyPopupOnHide,
        popupClassName,
        popupAnimation,
        popupTransitionName,
        popupStyle,
        mask,
        maskAnimation,
        maskTransitionName,
        zIndex,
        stretch,
        alignPoint: alignPoint2,
        mobile,
        arrow,
        forceRender
      } = this.$props;
      const {
        sPopupVisible,
        point
      } = this.$data;
      const popupProps2 = _extends(_extends({
        prefixCls,
        arrow,
        destroyPopupOnHide,
        visible: sPopupVisible,
        point: alignPoint2 ? point : null,
        align: this.align,
        animation: popupAnimation,
        getClassNameFromAlign: handleGetPopupClassFromAlign,
        stretch,
        getRootDomNode,
        mask,
        zIndex,
        transitionName: popupTransitionName,
        maskAnimation,
        maskTransitionName,
        class: popupClassName,
        style: popupStyle,
        onAlign: $attrs.onPopupAlign || noop$1
      }, mouseProps), {
        ref: this.setPopupRef,
        mobile,
        forceRender
      });
      return createVNode(Popup, popupProps2, {
        default: this.$slots.popup || (() => getComponent(this, "popup"))
      });
    },
    attachParent(popupContainer) {
      wrapperRaf.cancel(this.attachId);
      const {
        getPopupContainer,
        getDocument
      } = this.$props;
      const domNode = this.getRootDomNode();
      let mountNode;
      if (!getPopupContainer) {
        mountNode = getDocument(this.getRootDomNode()).body;
      } else if (domNode || getPopupContainer.length === 0) {
        mountNode = getPopupContainer(domNode);
      }
      if (mountNode) {
        mountNode.appendChild(popupContainer);
      } else {
        this.attachId = wrapperRaf(() => {
          this.attachParent(popupContainer);
        });
      }
    },
    getContainer() {
      const {
        $props: props
      } = this;
      const {
        getDocument
      } = props;
      const popupContainer = getDocument(this.getRootDomNode()).createElement("div");
      popupContainer.style.position = "absolute";
      popupContainer.style.top = "0";
      popupContainer.style.left = "0";
      popupContainer.style.width = "100%";
      this.attachParent(popupContainer);
      return popupContainer;
    },
    setPopupVisible(sPopupVisible, event) {
      const {
        alignPoint: alignPoint2,
        sPopupVisible: prevPopupVisible,
        onPopupVisibleChange
      } = this;
      this.clearDelayTimer();
      if (prevPopupVisible !== sPopupVisible) {
        if (!hasProp(this, "popupVisible")) {
          this.setState({
            sPopupVisible,
            prevPopupVisible
          });
        }
        onPopupVisibleChange && onPopupVisibleChange(sPopupVisible);
      }
      if (alignPoint2 && event && sPopupVisible) {
        this.setPoint(event);
      }
    },
    setPoint(point) {
      const {
        alignPoint: alignPoint2
      } = this.$props;
      if (!alignPoint2 || !point) return;
      this.setState({
        point: {
          pageX: point.pageX,
          pageY: point.pageY
        }
      });
    },
    handlePortalUpdate() {
      if (this.prevPopupVisible !== this.sPopupVisible) {
        this.afterPopupVisibleChange(this.sPopupVisible);
      }
    },
    delaySetPopupVisible(visible, delayS, event) {
      const delay = delayS * 1e3;
      this.clearDelayTimer();
      if (delay) {
        const point = event ? {
          pageX: event.pageX,
          pageY: event.pageY
        } : null;
        this.delayTimer = setTimeout(() => {
          this.setPopupVisible(visible, point);
          this.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible, event);
      }
    },
    clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    },
    clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
      if (this.contextmenuOutsideHandler1) {
        this.contextmenuOutsideHandler1.remove();
        this.contextmenuOutsideHandler1 = null;
      }
      if (this.contextmenuOutsideHandler2) {
        this.contextmenuOutsideHandler2.remove();
        this.contextmenuOutsideHandler2 = null;
      }
      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    },
    createTwoChains(event) {
      let fn = () => {
      };
      const events = getEvents(this);
      if (this.childOriginEvents[event] && events[event]) {
        return this[`fire${event}`];
      }
      fn = this.childOriginEvents[event] || events[event] || fn;
      return fn;
    },
    isClickToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("click") !== -1 || showAction.indexOf("click") !== -1;
    },
    isContextMenuOnly() {
      const {
        action
      } = this.$props;
      return action === "contextmenu" || action.length === 1 && action[0] === "contextmenu";
    },
    isContextmenuToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("contextmenu") !== -1 || showAction.indexOf("contextmenu") !== -1;
    },
    isClickToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("click") !== -1 || hideAction.indexOf("click") !== -1;
    },
    isMouseEnterToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || showAction.indexOf("mouseenter") !== -1;
    },
    isMouseLeaveToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || hideAction.indexOf("mouseleave") !== -1;
    },
    isFocusToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || showAction.indexOf("focus") !== -1;
    },
    isBlurToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || hideAction.indexOf("blur") !== -1;
    },
    forcePopupAlign() {
      var _a2;
      if (this.$data.sPopupVisible) {
        (_a2 = this.popupRef) === null || _a2 === void 0 ? void 0 : _a2.forceAlign();
      }
    },
    fireEvents(type, e) {
      if (this.childOriginEvents[type]) {
        this.childOriginEvents[type](e);
      }
      const event = this.$props[type] || this.$attrs[type];
      if (event) {
        event(e);
      }
    },
    close() {
      this.setPopupVisible(false);
    }
  },
  render() {
    const {
      $attrs
    } = this;
    const children = filterEmpty(getSlot(this));
    const {
      alignPoint: alignPoint2,
      getPopupContainer
    } = this.$props;
    const child = children[0];
    this.childOriginEvents = getEvents(child);
    const newChildProps = {
      key: "trigger"
    };
    if (this.isContextmenuToShow()) {
      newChildProps.onContextmenu = this.onContextmenu;
    } else {
      newChildProps.onContextmenu = this.createTwoChains("onContextmenu");
    }
    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMousedown = this.onMousedown;
      newChildProps[supportsPassive ? "onTouchstartPassive" : "onTouchstart"] = this.onTouchstart;
    } else {
      newChildProps.onClick = this.createTwoChains("onClick");
      newChildProps.onMousedown = this.createTwoChains("onMousedown");
      newChildProps[supportsPassive ? "onTouchstartPassive" : "onTouchstart"] = this.createTwoChains("onTouchstart");
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseenter = this.onMouseenter;
      if (alignPoint2) {
        newChildProps.onMousemove = this.onMouseMove;
      }
    } else {
      newChildProps.onMouseenter = this.createTwoChains("onMouseenter");
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseleave = this.onMouseleave;
    } else {
      newChildProps.onMouseleave = this.createTwoChains("onMouseleave");
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains("onFocus");
      newChildProps.onBlur = (e) => {
        if (e && (!e.relatedTarget || !contains(e.target, e.relatedTarget))) {
          this.createTwoChains("onBlur")(e);
        }
      };
    }
    const childrenClassName = classNames(child && child.props && child.props.class, $attrs.class);
    if (childrenClassName) {
      newChildProps.class = childrenClassName;
    }
    const trigger = cloneElement(child, _extends(_extends({}, newChildProps), {
      ref: "triggerRef"
    }), true, true);
    const portal = createVNode(Portal, {
      "key": "portal",
      "getContainer": getPopupContainer && (() => getPopupContainer(this.getRootDomNode())),
      "didUpdate": this.handlePortalUpdate,
      "visible": this.$data.sPopupVisible
    }, {
      default: this.getComponent
    });
    return createVNode(Fragment, null, [trigger, portal]);
  }
});
const KeyCode = {
  /**
   * TAB
   */
  TAB: 9,
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  /**
   * LEFT
   */
  LEFT: 37,
  /**
   * UP
   */
  UP: 38,
  /**
   * RIGHT
   */
  RIGHT: 39,
  /**
   * DOWN
   */
  DOWN: 40
};
const OverflowContextProviderKey = Symbol("OverflowContextProviderKey");
const OverflowContextProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "OverflowContextProvider",
  inheritAttrs: false,
  props: {
    value: {
      type: Object
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provide(OverflowContextProviderKey, computed(() => props.value));
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
const useInjectOverflowContext = () => {
  return inject(OverflowContextProviderKey, computed(() => null));
};
var __rest$k = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const UNDEFINED = void 0;
const Item = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Item",
  props: {
    prefixCls: String,
    item: PropTypes.any,
    renderItem: Function,
    responsive: Boolean,
    itemKey: {
      type: [String, Number]
    },
    registerSize: Function,
    display: Boolean,
    order: Number,
    component: PropTypes.any,
    invalidate: Boolean
  },
  setup(props, _ref) {
    let {
      slots,
      expose
    } = _ref;
    const mergedHidden = computed(() => props.responsive && !props.display);
    const itemNodeRef = ref();
    expose({
      itemNodeRef
    });
    function internalRegisterSize(width) {
      props.registerSize(props.itemKey, width);
    }
    onUnmounted(() => {
      internalRegisterSize(null);
    });
    return () => {
      var _a2;
      const {
        prefixCls,
        invalidate,
        item,
        renderItem,
        responsive,
        registerSize,
        itemKey,
        display,
        order,
        component: Component = "div"
      } = props, restProps = __rest$k(props, ["prefixCls", "invalidate", "item", "renderItem", "responsive", "registerSize", "itemKey", "display", "order", "component"]);
      const children = (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      const childNode = renderItem && item !== UNDEFINED ? renderItem(item) : children;
      let overflowStyle;
      if (!invalidate) {
        overflowStyle = {
          opacity: mergedHidden.value ? 0 : 1,
          height: mergedHidden.value ? 0 : UNDEFINED,
          overflowY: mergedHidden.value ? "hidden" : UNDEFINED,
          order: responsive ? order : UNDEFINED,
          pointerEvents: mergedHidden.value ? "none" : UNDEFINED,
          position: mergedHidden.value ? "absolute" : UNDEFINED
        };
      }
      const overflowProps2 = {};
      if (mergedHidden.value) {
        overflowProps2["aria-hidden"] = true;
      }
      return createVNode(ResizeObserver$1, {
        "disabled": !responsive,
        "onResize": (_ref2) => {
          let {
            offsetWidth
          } = _ref2;
          internalRegisterSize(offsetWidth);
        }
      }, {
        default: () => createVNode(Component, _objectSpread2(_objectSpread2(_objectSpread2({
          "class": classNames(!invalidate && prefixCls),
          "style": overflowStyle
        }, overflowProps2), restProps), {}, {
          "ref": itemNodeRef
        }), {
          default: () => [childNode]
        })
      });
    };
  }
});
var __rest$j = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const RawItem = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "RawItem",
  inheritAttrs: false,
  props: {
    component: PropTypes.any,
    title: PropTypes.any,
    id: String,
    onMouseenter: {
      type: Function
    },
    onMouseleave: {
      type: Function
    },
    onClick: {
      type: Function
    },
    onKeydown: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    role: String,
    tabindex: Number
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const context = useInjectOverflowContext();
    return () => {
      var _a2;
      if (!context.value) {
        const {
          component: Component = "div"
        } = props, restProps2 = __rest$j(props, ["component"]);
        return createVNode(Component, _objectSpread2(_objectSpread2({}, restProps2), attrs), {
          default: () => [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]
        });
      }
      const _b = context.value, {
        className: contextClassName
      } = _b, restContext = __rest$j(_b, ["className"]);
      const {
        class: className
      } = attrs, restProps = __rest$j(attrs, ["class"]);
      return createVNode(OverflowContextProvider, {
        "value": null
      }, {
        default: () => [createVNode(Item, _objectSpread2(_objectSpread2(_objectSpread2({
          "class": classNames(contextClassName, className)
        }, restContext), restProps), props), slots)]
      });
    };
  }
});
var __rest$i = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const RESPONSIVE = "responsive";
const INVALIDATE = "invalidate";
function defaultRenderRest(omittedItems) {
  return `+ ${omittedItems.length} ...`;
}
const overflowProps = () => {
  return {
    id: String,
    prefixCls: String,
    data: Array,
    itemKey: [String, Number, Function],
    /** Used for `responsive`. It will limit render node to avoid perf issue */
    itemWidth: {
      type: Number,
      default: 10
    },
    renderItem: Function,
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawItem: Function,
    maxCount: [Number, String],
    renderRest: Function,
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawRest: Function,
    suffix: PropTypes.any,
    component: String,
    itemComponent: PropTypes.any,
    /** @private This API may be refactor since not well design */
    onVisibleChange: Function,
    /** When set to `full`, ssr will render full items by default and remove at client side */
    ssr: String,
    onMousedown: Function,
    role: String
  };
};
const Overflow = defineComponent({
  name: "Overflow",
  inheritAttrs: false,
  props: overflowProps(),
  emits: ["visibleChange"],
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const fullySSR = computed(() => props.ssr === "full");
    const containerWidth = shallowRef(null);
    const mergedContainerWidth = computed(() => containerWidth.value || 0);
    const itemWidths = shallowRef(/* @__PURE__ */ new Map());
    const prevRestWidth = shallowRef(0);
    const restWidth = shallowRef(0);
    const suffixWidth = shallowRef(0);
    const suffixFixedStart = shallowRef(null);
    const displayCount = shallowRef(null);
    const mergedDisplayCount = computed(() => {
      if (displayCount.value === null && fullySSR.value) {
        return Number.MAX_SAFE_INTEGER;
      }
      return displayCount.value || 0;
    });
    const restReady = shallowRef(false);
    const itemPrefixCls = computed(() => `${props.prefixCls}-item`);
    const mergedRestWidth = computed(() => Math.max(prevRestWidth.value, restWidth.value));
    const isResponsive = computed(() => !!(props.data.length && props.maxCount === RESPONSIVE));
    const invalidate = computed(() => props.maxCount === INVALIDATE);
    const showRest = computed(() => isResponsive.value || typeof props.maxCount === "number" && props.data.length > props.maxCount);
    const mergedData = computed(() => {
      let items = props.data;
      if (isResponsive.value) {
        if (containerWidth.value === null && fullySSR.value) {
          items = props.data;
        } else {
          items = props.data.slice(0, Math.min(props.data.length, mergedContainerWidth.value / props.itemWidth));
        }
      } else if (typeof props.maxCount === "number") {
        items = props.data.slice(0, props.maxCount);
      }
      return items;
    });
    const omittedItems = computed(() => {
      if (isResponsive.value) {
        return props.data.slice(mergedDisplayCount.value + 1);
      }
      return props.data.slice(mergedData.value.length);
    });
    const getKey = (item, index2) => {
      var _a2;
      if (typeof props.itemKey === "function") {
        return props.itemKey(item);
      }
      return (_a2 = props.itemKey && (item === null || item === void 0 ? void 0 : item[props.itemKey])) !== null && _a2 !== void 0 ? _a2 : index2;
    };
    const mergedRenderItem = computed(() => props.renderItem || ((item) => item));
    const updateDisplayCount = (count, notReady) => {
      displayCount.value = count;
      if (!notReady) {
        restReady.value = count < props.data.length - 1;
        emit("visibleChange", count);
      }
    };
    const onOverflowResize = (_, element) => {
      containerWidth.value = element.clientWidth;
    };
    const registerSize = (key2, width) => {
      const clone = new Map(itemWidths.value);
      if (width === null) {
        clone.delete(key2);
      } else {
        clone.set(key2, width);
      }
      itemWidths.value = clone;
    };
    const registerOverflowSize = (_, width) => {
      prevRestWidth.value = restWidth.value;
      restWidth.value = width;
    };
    const registerSuffixSize = (_, width) => {
      suffixWidth.value = width;
    };
    const getItemWidth = (index2) => {
      return itemWidths.value.get(getKey(mergedData.value[index2], index2));
    };
    watch([mergedContainerWidth, itemWidths, restWidth, suffixWidth, () => props.itemKey, mergedData], () => {
      if (mergedContainerWidth.value && mergedRestWidth.value && mergedData.value) {
        let totalWidth = suffixWidth.value;
        const len = mergedData.value.length;
        const lastIndex = len - 1;
        if (!len) {
          updateDisplayCount(0);
          suffixFixedStart.value = null;
          return;
        }
        for (let i = 0; i < len; i += 1) {
          const currentItemWidth = getItemWidth(i);
          if (currentItemWidth === void 0) {
            updateDisplayCount(i - 1, true);
            break;
          }
          totalWidth += currentItemWidth;
          if (
            // Only one means `totalWidth` is the final width
            lastIndex === 0 && totalWidth <= mergedContainerWidth.value || // Last two width will be the final width
            i === lastIndex - 1 && totalWidth + getItemWidth(lastIndex) <= mergedContainerWidth.value
          ) {
            updateDisplayCount(lastIndex);
            suffixFixedStart.value = null;
            break;
          } else if (totalWidth + mergedRestWidth.value > mergedContainerWidth.value) {
            updateDisplayCount(i - 1);
            suffixFixedStart.value = totalWidth - currentItemWidth - suffixWidth.value + restWidth.value;
            break;
          }
        }
        if (props.suffix && getItemWidth(0) + suffixWidth.value > mergedContainerWidth.value) {
          suffixFixedStart.value = null;
        }
      }
    });
    return () => {
      const displayRest = restReady.value && !!omittedItems.value.length;
      const {
        itemComponent,
        renderRawItem,
        renderRawRest,
        renderRest,
        prefixCls = "rc-overflow",
        suffix,
        component: Component = "div",
        id,
        onMousedown
      } = props;
      const {
        class: className,
        style
      } = attrs, restAttrs = __rest$i(attrs, ["class", "style"]);
      let suffixStyle = {};
      if (suffixFixedStart.value !== null && isResponsive.value) {
        suffixStyle = {
          position: "absolute",
          left: `${suffixFixedStart.value}px`,
          top: 0
        };
      }
      const itemSharedProps = {
        prefixCls: itemPrefixCls.value,
        responsive: isResponsive.value,
        component: itemComponent,
        invalidate: invalidate.value
      };
      const internalRenderItemNode = renderRawItem ? (item, index2) => {
        const key2 = getKey(item, index2);
        return createVNode(OverflowContextProvider, {
          "key": key2,
          "value": _extends(_extends({}, itemSharedProps), {
            order: index2,
            item,
            itemKey: key2,
            registerSize,
            display: index2 <= mergedDisplayCount.value
          })
        }, {
          default: () => [renderRawItem(item, index2)]
        });
      } : (item, index2) => {
        const key2 = getKey(item, index2);
        return createVNode(Item, _objectSpread2(_objectSpread2({}, itemSharedProps), {}, {
          "order": index2,
          "key": key2,
          "item": item,
          "renderItem": mergedRenderItem.value,
          "itemKey": key2,
          "registerSize": registerSize,
          "display": index2 <= mergedDisplayCount.value
        }), null);
      };
      let restNode = () => null;
      const restContextProps = {
        order: displayRest ? mergedDisplayCount.value : Number.MAX_SAFE_INTEGER,
        className: `${itemPrefixCls.value} ${itemPrefixCls.value}-rest`,
        registerSize: registerOverflowSize,
        display: displayRest
      };
      if (!renderRawRest) {
        const mergedRenderRest = renderRest || defaultRenderRest;
        restNode = () => createVNode(Item, _objectSpread2(_objectSpread2({}, itemSharedProps), restContextProps), {
          default: () => typeof mergedRenderRest === "function" ? mergedRenderRest(omittedItems.value) : mergedRenderRest
        });
      } else if (renderRawRest) {
        restNode = () => createVNode(OverflowContextProvider, {
          "value": _extends(_extends({}, itemSharedProps), restContextProps)
        }, {
          default: () => [renderRawRest(omittedItems.value)]
        });
      }
      const overflowNode = () => {
        var _a2;
        return createVNode(Component, _objectSpread2({
          "id": id,
          "class": classNames(!invalidate.value && prefixCls, className),
          "style": style,
          "onMousedown": onMousedown,
          "role": props.role
        }, restAttrs), {
          default: () => [mergedData.value.map(internalRenderItemNode), showRest.value ? restNode() : null, suffix && createVNode(Item, _objectSpread2(_objectSpread2({}, itemSharedProps), {}, {
            "order": mergedDisplayCount.value,
            "class": `${itemPrefixCls.value}-suffix`,
            "registerSize": registerSuffixSize,
            "display": true,
            "style": suffixStyle
          }), {
            default: () => suffix
          }), (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]
        });
      };
      return createVNode(ResizeObserver$1, {
        "disabled": !isResponsive.value,
        "onResize": onOverflowResize
      }, {
        default: overflowNode
      });
    };
  }
});
Overflow.Item = RawItem;
Overflow.RESPONSIVE = RESPONSIVE;
Overflow.INVALIDATE = INVALIDATE;
const isMobile = () => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  const agent = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent === null || agent === void 0 ? void 0 : agent.substring(0, 4));
};
function useMemo(getValue2, condition, shouldUpdate) {
  const cacheRef = ref(getValue2());
  watch(condition, (next, pre) => {
    if (shouldUpdate) {
      if (shouldUpdate(next, pre)) {
        cacheRef.value = getValue2();
      }
    } else {
      cacheRef.value = getValue2();
    }
  });
  return cacheRef;
}
function useMergedState(defaultStateValue, option) {
  const {
    defaultValue,
    value = ref()
  } = option || {};
  let initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  if (value.value !== void 0) {
    initValue = unref(value);
  }
  if (defaultValue !== void 0) {
    initValue = typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }
  const innerValue = ref(initValue);
  const mergedValue = ref(initValue);
  watchEffect(() => {
    let val = value.value !== void 0 ? value.value : innerValue.value;
    if (option.postState) {
      val = option.postState(val);
    }
    mergedValue.value = val;
  });
  function triggerChange(newValue) {
    const preVal = mergedValue.value;
    innerValue.value = newValue;
    if (toRaw(mergedValue.value) !== newValue && option.onChange) {
      option.onChange(newValue, preVal);
    }
  }
  watch(value, () => {
    innerValue.value = value.value;
  });
  return [mergedValue, triggerChange];
}
function useState(defaultStateValue) {
  const initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  const innerValue = ref(initValue);
  function triggerChange(newValue) {
    innerValue.value = newValue;
  }
  return [innerValue, triggerChange];
}
function createContext(defaultValue) {
  const contextKey = Symbol("contextKey");
  const useProvide = (props, newProps) => {
    const mergedProps = reactive({});
    provide(contextKey, mergedProps);
    watchEffect(() => {
      _extends(mergedProps, props, newProps || {});
    });
    return mergedProps;
  };
  const useInject = () => {
    return inject(contextKey, defaultValue) || {};
  };
  return {
    useProvide,
    useInject
  };
}
const ContextKey = Symbol("ContextProps");
const InternalContextKey = Symbol("InternalContextProps");
const defaultContext = {
  id: computed(() => void 0),
  onFieldBlur: () => {
  },
  onFieldChange: () => {
  },
  clearValidate: () => {
  }
};
const defaultInternalContext = {
  addFormItemField: () => {
  },
  removeFormItemField: () => {
  }
};
const useInjectFormItemContext = () => {
  const internalContext = inject(InternalContextKey, defaultInternalContext);
  const formItemFieldKey = Symbol("FormItemFieldKey");
  const instance = getCurrentInstance();
  internalContext.addFormItemField(formItemFieldKey, instance.type);
  onBeforeUnmount(() => {
    internalContext.removeFormItemField(formItemFieldKey);
  });
  provide(InternalContextKey, defaultInternalContext);
  provide(ContextKey, defaultContext);
  return inject(ContextKey, defaultContext);
};
const FormItemInputContext = createContext({});
function getStatusClassNames(prefixCls, status, hasFeedback) {
  return classNames({
    [`${prefixCls}-status-success`]: status === "success",
    [`${prefixCls}-status-warning`]: status === "warning",
    [`${prefixCls}-status-error`]: status === "error",
    [`${prefixCls}-status-validating`]: status === "validating",
    [`${prefixCls}-has-feedback`]: hasFeedback
  });
}
const getMergedStatus = (contextStatus, customStatus) => customStatus || contextStatus;
const genSpaceCompactStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-block": {
        display: "flex",
        width: "100%"
      },
      "&-vertical": {
        flexDirection: "column"
      }
    }
  };
};
const genSpaceStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-rtl": {
        direction: "rtl"
      },
      "&-vertical": {
        flexDirection: "column"
      },
      "&-align": {
        flexDirection: "column",
        "&-center": {
          alignItems: "center"
        },
        "&-start": {
          alignItems: "flex-start"
        },
        "&-end": {
          alignItems: "flex-end"
        },
        "&-baseline": {
          alignItems: "baseline"
        }
      },
      [`${componentCls}-item`]: {
        "&:empty": {
          display: "none"
        }
      }
    }
  };
};
const useStyle$i = genComponentStyleHook("Space", (token) => [genSpaceStyle(token), genSpaceCompactStyle(token)]);
const spaceCompactItemProps = () => ({
  compactSize: String,
  compactDirection: PropTypes.oneOf(tuple$1("horizontal", "vertical")).def("horizontal"),
  isFirstItem: booleanType(),
  isLastItem: booleanType()
});
const SpaceCompactItemContext = createContext(null);
const useCompactItemContext = (prefixCls, direction) => {
  const compactItemContext = SpaceCompactItemContext.useInject();
  const compactItemClassnames = computed(() => {
    if (!compactItemContext || isEmpty(compactItemContext)) return "";
    const {
      compactDirection,
      isFirstItem,
      isLastItem
    } = compactItemContext;
    const separator = compactDirection === "vertical" ? "-vertical-" : "-";
    return classNames({
      [`${prefixCls.value}-compact${separator}item`]: true,
      [`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === "rtl"
    });
  });
  return {
    compactSize: computed(() => compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize),
    compactDirection: computed(() => compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection),
    compactItemClassnames
  };
};
const spaceCompactProps = () => ({
  prefixCls: String,
  size: {
    type: String
  },
  direction: PropTypes.oneOf(tuple$1("horizontal", "vertical")).def("horizontal"),
  align: PropTypes.oneOf(tuple$1("start", "end", "center", "baseline")),
  block: {
    type: Boolean,
    default: void 0
  }
});
const CompactItem = defineComponent({
  name: "CompactItem",
  props: spaceCompactItemProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    SpaceCompactItemContext.useProvide(props);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
defineComponent({
  name: "ASpaceCompact",
  inheritAttrs: false,
  props: spaceCompactProps(),
  setup(props, _ref3) {
    let {
      attrs,
      slots
    } = _ref3;
    const {
      prefixCls,
      direction: directionConfig
    } = useConfigInject("space-compact", props);
    const compactItemContext = SpaceCompactItemContext.useInject();
    const [wrapSSR, hashId] = useStyle$i(prefixCls);
    const clx = computed(() => {
      return classNames(prefixCls.value, hashId.value, {
        [`${prefixCls.value}-rtl`]: directionConfig.value === "rtl",
        [`${prefixCls.value}-block`]: props.block,
        [`${prefixCls.value}-vertical`]: props.direction === "vertical"
      });
    });
    return () => {
      var _a2;
      const childNodes = flattenChildren(((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || []);
      if (childNodes.length === 0) {
        return null;
      }
      return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": [clx.value, attrs.class]
      }), [childNodes.map((child, i) => {
        var _a3;
        const key2 = child && child.key || `${prefixCls.value}-item-${i}`;
        const noCompactItemContext = !compactItemContext || isEmpty(compactItemContext);
        return createVNode(CompactItem, {
          "key": key2,
          "compactSize": (_a3 = props.size) !== null && _a3 !== void 0 ? _a3 : "middle",
          "compactDirection": props.direction,
          "isFirstItem": i === 0 && (noCompactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
          "isLastItem": i === childNodes.length - 1 && (noCompactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
        }, {
          default: () => [child]
        });
      })]));
    };
  }
});
const initMotionCommon = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotionCommonLeave = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotion = function(motionCls, inKeyframes, outKeyframes, duration) {
  let sameLevel = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return {
    [`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: _extends(_extends({}, initMotionCommon(duration)), {
      animationPlayState: "paused"
    }),
    [`${sameLevelPrefix}${motionCls}-leave`]: _extends(_extends({}, initMotionCommonLeave(duration)), {
      animationPlayState: "paused"
    }),
    [`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
      animationName: inKeyframes,
      animationPlayState: "running"
    },
    [`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes,
      animationPlayState: "running",
      pointerEvents: "none"
    }
  };
};
const moveDownIn = new Keyframe("antMoveDownIn", {
  "0%": {
    transform: "translate3d(0, 100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveDownOut = new Keyframe("antMoveDownOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(0, 100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveLeftIn = new Keyframe("antMoveLeftIn", {
  "0%": {
    transform: "translate3d(-100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveLeftOut = new Keyframe("antMoveLeftOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(-100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveRightIn = new Keyframe("antMoveRightIn", {
  "0%": {
    transform: "translate3d(100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveRightOut = new Keyframe("antMoveRightOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveUpIn = new Keyframe("antMoveUpIn", {
  "0%": {
    transform: "translate3d(0, -100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveUpOut = new Keyframe("antMoveUpOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(0, -100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveMotion = {
  "move-up": {
    inKeyframes: moveUpIn,
    outKeyframes: moveUpOut
  },
  "move-down": {
    inKeyframes: moveDownIn,
    outKeyframes: moveDownOut
  },
  "move-left": {
    inKeyframes: moveLeftIn,
    outKeyframes: moveLeftOut
  },
  "move-right": {
    inKeyframes: moveRightIn,
    outKeyframes: moveRightOut
  }
};
const initMoveMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = moveMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};
const slideUpIn = new Keyframe("antSlideUpIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
const slideUpOut = new Keyframe("antSlideUpOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
const slideDownIn = new Keyframe("antSlideDownIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  }
});
const slideDownOut = new Keyframe("antSlideDownOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  }
});
const slideLeftIn = new Keyframe("antSlideLeftIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
const slideLeftOut = new Keyframe("antSlideLeftOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
const slideRightIn = new Keyframe("antSlideRightIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  }
});
const slideRightOut = new Keyframe("antSlideRightOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  }
});
const slideMotion = {
  "slide-up": {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut
  },
  "slide-down": {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut
  },
  "slide-left": {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut
  },
  "slide-right": {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut
  }
};
const initSlideMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = slideMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
      transform: "scale(0)",
      transformOrigin: "0% 0%",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutQuint
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInQuint
    }
  }];
};
const zoomIn = new Keyframe("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomOut = new Keyframe("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
const zoomBigIn = new Keyframe("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomBigOut = new Keyframe("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
const zoomUpIn = new Keyframe("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
const zoomUpOut = new Keyframe("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
const zoomLeftIn = new Keyframe("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
const zoomLeftOut = new Keyframe("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
const zoomRightIn = new Keyframe("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
const zoomRightOut = new Keyframe("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
const zoomDownIn = new Keyframe("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
const zoomDownOut = new Keyframe("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
const zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
const initZoomMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = zoomMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      transform: "scale(0)",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc,
      "&-prepare": {
        transform: "none"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};
const genCollapseMotion = (token) => ({
  [token.componentCls]: {
    // For common/openAnimation
    [`${token.antCls}-motion-collapse-legacy`]: {
      overflow: "hidden",
      "&-active": {
        transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
      }
    },
    [`${token.antCls}-motion-collapse`]: {
      overflow: "hidden",
      transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
    }
  }
});
function compactItemBorder(token, parentCls, options) {
  const {
    focusElCls,
    focus,
    borderElCls
  } = options;
  const childCombinator = borderElCls ? "> *" : "";
  const hoverEffects = ["hover", focus ? "focus" : null, "active"].filter(Boolean).map((n) => `&:${n} ${childCombinator}`).join(",");
  return {
    [`&-item:not(${parentCls}-last-item)`]: {
      marginInlineEnd: -token.lineWidth
    },
    "&-item": _extends(_extends({
      [hoverEffects]: {
        zIndex: 2
      }
    }, focusElCls ? {
      [`&${focusElCls}`]: {
        zIndex: 2
      }
    } : {}), {
      [`&[disabled] ${childCombinator}`]: {
        zIndex: 0
      }
    })
  };
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
  const {
    borderElCls
  } = options;
  const childCombinator = borderElCls ? `> ${borderElCls}` : "";
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: {
      borderRadius: 0
    },
    [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function genCompactItemStyle(token) {
  let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    focus: true
  };
  const {
    componentCls
  } = token;
  const compactCls = `${componentCls}-compact`;
  return {
    [compactCls]: _extends(_extends({}, compactItemBorder(token, compactCls, options)), compactItemBorderRadius(componentCls, compactCls, options))
  };
}
const responsiveArray = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"];
const getResponsiveMap = (token) => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`,
  xxxl: `{min-width: ${token.screenXXXL}px}`
});
function useResponsiveObserver() {
  const [, token] = useToken();
  return computed(() => {
    const responsiveMap = getResponsiveMap(token.value);
    const subscribers = /* @__PURE__ */ new Map();
    let subUid = -1;
    let screens = {};
    return {
      matchHandlers: {},
      dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach((func) => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func) {
        if (!subscribers.size) this.register();
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken) {
        subscribers.delete(paramToken);
        if (!subscribers.size) this.unregister();
      },
      unregister() {
        Object.keys(responsiveMap).forEach((screen) => {
          const matchMediaQuery = responsiveMap[screen];
          const handler = this.matchHandlers[matchMediaQuery];
          handler === null || handler === void 0 ? void 0 : handler.mql.removeListener(handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
      },
      register() {
        Object.keys(responsiveMap).forEach((screen) => {
          const matchMediaQuery = responsiveMap[screen];
          const listener = (_ref) => {
            let {
              matches
            } = _ref;
            this.dispatch(_extends(_extends({}, screens), {
              [screen]: matches
            }));
          };
          const mql = window.matchMedia(matchMediaQuery);
          mql.addListener(listener);
          this.matchHandlers[matchMediaQuery] = {
            mql,
            listener
          };
          listener(mql);
        });
      },
      responsiveMap
    };
  });
}
function useBreakpoint() {
  const screens = shallowRef({});
  let token = null;
  const responsiveObserve = useResponsiveObserver();
  onMounted(() => {
    token = responsiveObserve.value.subscribe((supportScreens) => {
      screens.value = supportScreens;
    });
  });
  onUnmounted(() => {
    responsiveObserve.value.unsubscribe(token);
  });
  return screens;
}
function eagerComputed(fn) {
  const result = shallowRef();
  watchEffect(() => {
    result.value = fn();
  }, {
    flush: "sync"
    // needed so updates are immediate.
  });
  return result;
}
const genBaseStyle$5 = (token) => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    containerSize,
    containerSizeLG,
    containerSizeSM,
    textFontSize,
    textFontSizeLG,
    textFontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType
  } = token;
  const avatarSizeStyle = (size, fontSize, radius) => ({
    width: size,
    height: size,
    lineHeight: `${size - lineWidth * 2}px`,
    borderRadius: "50%",
    [`&${componentCls}-square`]: {
      borderRadius: radius
    },
    [`${componentCls}-string`]: {
      position: "absolute",
      left: {
        _skip_check_: true,
        value: "50%"
      },
      transformOrigin: "0 center"
    },
    [`&${componentCls}-icon`]: {
      fontSize,
      [`> ${iconCls}`]: {
        margin: 0
      }
    }
  });
  return {
    [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
      position: "relative",
      display: "inline-block",
      overflow: "hidden",
      color: avatarColor,
      whiteSpace: "nowrap",
      textAlign: "center",
      verticalAlign: "middle",
      background: avatarBg,
      border: `${lineWidth}px ${lineType} transparent`,
      [`&-image`]: {
        background: "transparent"
      },
      [`${antCls}-image-img`]: {
        display: "block"
      }
    }), avatarSizeStyle(containerSize, textFontSize, borderRadius)), {
      [`&-lg`]: _extends({}, avatarSizeStyle(containerSizeLG, textFontSizeLG, borderRadiusLG)),
      [`&-sm`]: _extends({}, avatarSizeStyle(containerSizeSM, textFontSizeSM, borderRadiusSM)),
      "> img": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })
  };
};
const genGroupStyle$1 = (token) => {
  const {
    componentCls,
    groupBorderColor,
    groupOverlapping,
    groupSpace
  } = token;
  return {
    [`${componentCls}-group`]: {
      display: "inline-flex",
      [`${componentCls}`]: {
        borderColor: groupBorderColor
      },
      [`> *:not(:first-child)`]: {
        marginInlineStart: groupOverlapping
      }
    },
    [`${componentCls}-group-popover`]: {
      [`${componentCls} + ${componentCls}`]: {
        marginInlineStart: groupSpace
      }
    }
  };
};
const useStyle$h = genComponentStyleHook("Avatar", (token) => {
  const {
    colorTextLightSolid,
    colorTextPlaceholder
  } = token;
  const avatarToken = merge(token, {
    avatarBg: colorTextPlaceholder,
    avatarColor: colorTextLightSolid
  });
  return [genBaseStyle$5(avatarToken), genGroupStyle$1(avatarToken)];
}, (token) => {
  const {
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    fontSize,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading3,
    marginXS,
    marginXXS,
    colorBorderBg
  } = token;
  return {
    containerSize: controlHeight,
    containerSizeLG: controlHeightLG,
    containerSizeSM: controlHeightSM,
    textFontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
    textFontSizeLG: fontSizeHeading3,
    textFontSizeSM: fontSize,
    groupSpace: marginXXS,
    groupOverlapping: -marginXS,
    groupBorderColor: colorBorderBg
  };
});
const AvatarContextKey = Symbol("AvatarContextKey");
const useAvatarInjectContext = () => {
  return inject(AvatarContextKey, {});
};
const useAvatarProviderContext = (context) => {
  return provide(AvatarContextKey, context);
};
const avatarProps = () => ({
  prefixCls: String,
  shape: {
    type: String,
    default: "circle"
  },
  size: {
    type: [Number, String, Object],
    default: () => "default"
  },
  src: String,
  /** Srcset of image avatar */
  srcset: String,
  icon: PropTypes.any,
  alt: String,
  gap: Number,
  draggable: {
    type: Boolean,
    default: void 0
  },
  crossOrigin: String,
  loadError: {
    type: Function
  }
});
const Avatar = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AAvatar",
  inheritAttrs: false,
  props: avatarProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const isImgExist = shallowRef(true);
    const isMounted = shallowRef(false);
    const scale = shallowRef(1);
    const avatarChildrenRef = shallowRef(null);
    const avatarNodeRef = shallowRef(null);
    const {
      prefixCls
    } = useConfigInject("avatar", props);
    const [wrapSSR, hashId] = useStyle$h(prefixCls);
    const avatarCtx = useAvatarInjectContext();
    const size = computed(() => {
      return props.size === "default" ? avatarCtx.size : props.size;
    });
    const screens = useBreakpoint();
    const responsiveSize = eagerComputed(() => {
      if (typeof props.size !== "object") {
        return void 0;
      }
      const currentBreakpoint = responsiveArray.find((screen) => screens.value[screen]);
      const currentSize = props.size[currentBreakpoint];
      return currentSize;
    });
    const responsiveSizeStyle = (hasIcon) => {
      if (responsiveSize.value) {
        return {
          width: `${responsiveSize.value}px`,
          height: `${responsiveSize.value}px`,
          lineHeight: `${responsiveSize.value}px`,
          fontSize: `${hasIcon ? responsiveSize.value / 2 : 18}px`
        };
      }
      return {};
    };
    const setScaleParam = () => {
      if (!avatarChildrenRef.value || !avatarNodeRef.value) {
        return;
      }
      const childrenWidth = avatarChildrenRef.value.offsetWidth;
      const nodeWidth = avatarNodeRef.value.offsetWidth;
      if (childrenWidth !== 0 && nodeWidth !== 0) {
        const {
          gap = 4
        } = props;
        if (gap * 2 < nodeWidth) {
          scale.value = nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1;
        }
      }
    };
    const handleImgLoadError = () => {
      const {
        loadError
      } = props;
      const errorFlag = loadError === null || loadError === void 0 ? void 0 : loadError();
      if (errorFlag !== false) {
        isImgExist.value = false;
      }
    };
    watch(() => props.src, () => {
      nextTick(() => {
        isImgExist.value = true;
        scale.value = 1;
      });
    });
    watch(() => props.gap, () => {
      nextTick(() => {
        setScaleParam();
      });
    });
    onMounted(() => {
      nextTick(() => {
        setScaleParam();
        isMounted.value = true;
      });
    });
    return () => {
      var _a2, _b;
      const {
        shape,
        src,
        alt,
        srcset,
        draggable,
        crossOrigin
      } = props;
      const mergeShape = (_a2 = avatarCtx.shape) !== null && _a2 !== void 0 ? _a2 : shape;
      const icon = getPropsSlot(slots, props, "icon");
      const pre = prefixCls.value;
      const classString = {
        [`${attrs.class}`]: !!attrs.class,
        [pre]: true,
        [`${pre}-lg`]: size.value === "large",
        [`${pre}-sm`]: size.value === "small",
        [`${pre}-${mergeShape}`]: true,
        [`${pre}-image`]: src && isImgExist.value,
        [`${pre}-icon`]: icon,
        [hashId.value]: true
      };
      const sizeStyle = typeof size.value === "number" ? {
        width: `${size.value}px`,
        height: `${size.value}px`,
        lineHeight: `${size.value}px`,
        fontSize: icon ? `${size.value / 2}px` : "18px"
      } : {};
      const children = (_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots);
      let childrenToRender;
      if (src && isImgExist.value) {
        childrenToRender = createVNode("img", {
          "draggable": draggable,
          "src": src,
          "srcset": srcset,
          "onError": handleImgLoadError,
          "alt": alt,
          "crossorigin": crossOrigin
        }, null);
      } else if (icon) {
        childrenToRender = icon;
      } else if (isMounted.value || scale.value !== 1) {
        const transformString = `scale(${scale.value}) translateX(-50%)`;
        const childrenStyle = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString
        };
        const sizeChildrenStyle = typeof size.value === "number" ? {
          lineHeight: `${size.value}px`
        } : {};
        childrenToRender = createVNode(ResizeObserver$1, {
          "onResize": setScaleParam
        }, {
          default: () => [createVNode("span", {
            "class": `${pre}-string`,
            "ref": avatarChildrenRef,
            "style": _extends(_extends({}, sizeChildrenStyle), childrenStyle)
          }, [children])]
        });
      } else {
        childrenToRender = createVNode("span", {
          "class": `${pre}-string`,
          "ref": avatarChildrenRef,
          "style": {
            opacity: 0
          }
        }, [children]);
      }
      return wrapSSR(createVNode("span", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "ref": avatarNodeRef,
        "class": classString,
        "style": [sizeStyle, responsiveSizeStyle(!!icon), attrs.style]
      }), [childrenToRender]));
    };
  }
});
const autoAdjustOverflow$2 = {
  adjustX: 1,
  adjustY: 1
};
const targetOffset$2 = [0, 0];
const placements$2 = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflow$2,
    offset: [-4, 0],
    targetOffset: targetOffset$2
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflow$2,
    offset: [4, 0],
    targetOffset: targetOffset$2
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow$2,
    offset: [0, -4],
    targetOffset: targetOffset$2
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow$2,
    offset: [0, 4],
    targetOffset: targetOffset$2
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow$2,
    offset: [0, -4],
    targetOffset: targetOffset$2
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow$2,
    offset: [-4, 0],
    targetOffset: targetOffset$2
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow$2,
    offset: [0, -4],
    targetOffset: targetOffset$2
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow$2,
    offset: [4, 0],
    targetOffset: targetOffset$2
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow$2,
    offset: [0, 4],
    targetOffset: targetOffset$2
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflow$2,
    offset: [4, 0],
    targetOffset: targetOffset$2
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow$2,
    offset: [0, 4],
    targetOffset: targetOffset$2
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflow$2,
    offset: [-4, 0],
    targetOffset: targetOffset$2
  }
};
const tooltipContentProps = {
  prefixCls: String,
  id: String,
  overlayInnerStyle: PropTypes.any
};
const Content$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TooltipContent",
  props: tooltipContentProps,
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _a2;
      return createVNode("div", {
        "class": `${props.prefixCls}-inner`,
        "id": props.id,
        "role": "tooltip",
        "style": props.overlayInnerStyle
      }, [(_a2 = slots.overlay) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
    };
  }
});
var __rest$h = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function noop() {
}
const Tooltip$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Tooltip",
  inheritAttrs: false,
  props: {
    trigger: PropTypes.any.def(["hover"]),
    defaultVisible: {
      type: Boolean,
      default: void 0
    },
    visible: {
      type: Boolean,
      default: void 0
    },
    placement: PropTypes.string.def("right"),
    transitionName: String,
    animation: PropTypes.any,
    afterVisibleChange: PropTypes.func.def(() => {
    }),
    overlayStyle: {
      type: Object,
      default: void 0
    },
    overlayClassName: String,
    prefixCls: PropTypes.string.def("rc-tooltip"),
    mouseEnterDelay: PropTypes.number.def(0.1),
    mouseLeaveDelay: PropTypes.number.def(0.1),
    getPopupContainer: Function,
    destroyTooltipOnHide: {
      type: Boolean,
      default: false
    },
    align: PropTypes.object.def(() => ({})),
    arrowContent: PropTypes.any.def(null),
    tipId: String,
    builtinPlacements: PropTypes.object,
    overlayInnerStyle: {
      type: Object,
      default: void 0
    },
    popupVisible: {
      type: Boolean,
      default: void 0
    },
    onVisibleChange: Function,
    onPopupAlign: Function,
    arrow: {
      type: Boolean,
      default: true
    }
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      expose
    } = _ref;
    const triggerDOM = shallowRef();
    const getPopupElement = () => {
      const {
        prefixCls,
        tipId,
        overlayInnerStyle
      } = props;
      return [!!props.arrow ? createVNode("div", {
        "class": `${prefixCls}-arrow`,
        "key": "arrow"
      }, [getPropsSlot(slots, props, "arrowContent")]) : null, createVNode(Content$1, {
        "key": "content",
        "prefixCls": prefixCls,
        "id": tipId,
        "overlayInnerStyle": overlayInnerStyle
      }, {
        overlay: slots.overlay
      })];
    };
    const getPopupDomNode = () => {
      return triggerDOM.value.getPopupDomNode();
    };
    expose({
      getPopupDomNode,
      triggerDOM,
      forcePopupAlign: () => {
        var _a2;
        return (_a2 = triggerDOM.value) === null || _a2 === void 0 ? void 0 : _a2.forcePopupAlign();
      }
    });
    const destroyTooltip = shallowRef(false);
    const autoDestroy = shallowRef(false);
    watchEffect(() => {
      const {
        destroyTooltipOnHide
      } = props;
      if (typeof destroyTooltipOnHide === "boolean") {
        destroyTooltip.value = destroyTooltipOnHide;
      } else if (destroyTooltipOnHide && typeof destroyTooltipOnHide === "object") {
        const {
          keepParent
        } = destroyTooltipOnHide;
        destroyTooltip.value = keepParent === true;
        autoDestroy.value = keepParent === false;
      }
    });
    return () => {
      const {
        overlayClassName,
        trigger,
        mouseEnterDelay,
        mouseLeaveDelay,
        overlayStyle,
        prefixCls,
        afterVisibleChange,
        transitionName: transitionName2,
        animation,
        placement,
        align,
        destroyTooltipOnHide,
        defaultVisible
      } = props, restProps = __rest$h(props, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible"]);
      const extraProps = _extends({}, restProps);
      if (props.visible !== void 0) {
        extraProps.popupVisible = props.visible;
      }
      const triggerProps2 = _extends(_extends(_extends({
        popupClassName: overlayClassName,
        prefixCls,
        action: trigger,
        builtinPlacements: placements$2,
        popupPlacement: placement,
        popupAlign: align,
        afterPopupVisibleChange: afterVisibleChange,
        popupTransitionName: transitionName2,
        popupAnimation: animation,
        defaultPopupVisible: defaultVisible,
        destroyPopupOnHide: destroyTooltip.value,
        autoDestroy: autoDestroy.value,
        mouseLeaveDelay,
        popupStyle: overlayStyle,
        mouseEnterDelay
      }, extraProps), attrs), {
        onPopupVisibleChange: props.onVisibleChange || noop,
        onPopupAlign: props.onPopupAlign || noop,
        ref: triggerDOM,
        arrow: !!props.arrow,
        popup: getPopupElement()
      });
      return createVNode(Trigger, triggerProps2, {
        default: slots.default
      });
    };
  }
});
const abstractTooltipProps = () => ({
  trigger: [String, Array],
  open: {
    type: Boolean,
    default: void 0
  },
  /** @deprecated Please use `open` instead. */
  visible: {
    type: Boolean,
    default: void 0
  },
  placement: String,
  color: String,
  transitionName: String,
  overlayStyle: objectType(),
  overlayInnerStyle: objectType(),
  overlayClassName: String,
  openClassName: String,
  prefixCls: String,
  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
  getPopupContainer: Function,
  /**@deprecated Please use `arrow={{ pointAtCenter: true }}` instead. */
  arrowPointAtCenter: {
    type: Boolean,
    default: void 0
  },
  arrow: {
    type: [Boolean, Object],
    default: true
  },
  autoAdjustOverflow: {
    type: [Boolean, Object],
    default: void 0
  },
  destroyTooltipOnHide: {
    type: Boolean,
    default: void 0
  },
  align: objectType(),
  builtinPlacements: objectType(),
  children: Array,
  /** @deprecated Please use `onOpenChange` instead. */
  onVisibleChange: Function,
  /** @deprecated Please use `onUpdate:open` instead. */
  "onUpdate:visible": Function,
  onOpenChange: Function,
  "onUpdate:open": Function
});
const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1
};
const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0
};
const targetOffset$1 = [0, 0];
function getOverflowOptions(autoAdjustOverflow2) {
  if (typeof autoAdjustOverflow2 === "boolean") {
    return autoAdjustOverflow2 ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return _extends(_extends({}, autoAdjustOverflowDisabled), autoAdjustOverflow2);
}
function getPlacements(config) {
  const {
    arrowWidth = 4,
    horizontalArrowShift = 16,
    verticalArrowShift = 8,
    autoAdjustOverflow: autoAdjustOverflow2,
    arrowPointAtCenter
  } = config;
  const placementMap = {
    left: {
      points: ["cr", "cl"],
      offset: [-4, 0]
    },
    right: {
      points: ["cl", "cr"],
      offset: [4, 0]
    },
    top: {
      points: ["bc", "tc"],
      offset: [0, -4]
    },
    bottom: {
      points: ["tc", "bc"],
      offset: [0, 4]
    },
    topLeft: {
      points: ["bl", "tc"],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ["tr", "cl"],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ["br", "tc"],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ["tl", "cr"],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ["tr", "bc"],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ["bl", "cr"],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ["tl", "bc"],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ["br", "cl"],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  Object.keys(placementMap).forEach((key2) => {
    placementMap[key2] = arrowPointAtCenter ? _extends(_extends({}, placementMap[key2]), {
      overflow: getOverflowOptions(autoAdjustOverflow2),
      targetOffset: targetOffset$1
    }) : _extends(_extends({}, placements$2[key2]), {
      overflow: getOverflowOptions(autoAdjustOverflow2)
    });
    placementMap[key2].ignoreShake = true;
  });
  return placementMap;
}
function firstNotUndefined() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] !== void 0) {
      return arr[i];
    }
  }
  return void 0;
}
const inverseColors = PresetColors.map((color) => `${color}-inverse`);
const PresetStatusColorTypes = ["success", "processing", "error", "default", "warning"];
function isPresetColor(color) {
  let includeInverse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (includeInverse) {
    return [...inverseColors, ...PresetColors].includes(color);
  }
  return PresetColors.includes(color);
}
function isPresetStatusColor(color) {
  return PresetStatusColorTypes.includes(color);
}
function parseColor(prefixCls, color) {
  const isInternalColor = isPresetColor(color);
  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor
  });
  const overlayStyle = {};
  const arrowStyle = {};
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    arrowStyle["--antd-arrow-background-color"] = color;
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
}
function connectArrowCls(classList) {
  let showArrowCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return classList.map((cls) => `${showArrowCls}${cls}`).join(",");
}
const MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffset(options) {
  const maxVerticalContentRadius = MAX_VERTICAL_CONTENT_RADIUS;
  const {
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  } = options;
  const arrowInnerOffset = sizePopupArrow / 2 - Math.ceil(borderRadiusOuter * (Math.sqrt(2) - 1));
  const dropdownArrowOffset = (contentRadius > 12 ? contentRadius + 2 : 12) - arrowInnerOffset;
  const dropdownArrowOffsetVertical = limitVerticalRadius ? maxVerticalContentRadius - arrowInnerOffset : dropdownArrowOffset;
  return {
    dropdownArrowOffset,
    dropdownArrowOffsetVertical
  };
}
function getArrowStyle(token, options) {
  const {
    componentCls,
    sizePopupArrow,
    marginXXS,
    borderRadiusXS,
    borderRadiusOuter,
    boxShadowPopoverArrow
  } = token;
  const {
    colorBg,
    showArrowCls,
    contentRadius = token.borderRadiusLG,
    limitVerticalRadius
  } = options;
  const {
    dropdownArrowOffsetVertical,
    dropdownArrowOffset
  } = getArrowOffset({
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  });
  const dropdownArrowDistance = sizePopupArrow / 2 + marginXXS;
  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [_extends(_extends({
        position: "absolute",
        zIndex: 1,
        display: "block"
      }, roundedArrow(sizePopupArrow, borderRadiusXS, borderRadiusOuter, colorBg, boxShadowPopoverArrow)), {
        "&:before": {
          background: colorBg
        }
      })],
      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      [[`&-placement-top ${componentCls}-arrow`, `&-placement-topLeft ${componentCls}-arrow`, `&-placement-topRight ${componentCls}-arrow`].join(",")]: {
        bottom: 0,
        transform: "translateY(100%) rotate(180deg)"
      },
      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateX(-50%) translateY(100%) rotate(180deg)"
      },
      [`&-placement-topLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      [`&-placement-topRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      // >>>>> Bottom
      [[`&-placement-bottom ${componentCls}-arrow`, `&-placement-bottomLeft ${componentCls}-arrow`, `&-placement-bottomRight ${componentCls}-arrow`].join(",")]: {
        top: 0,
        transform: `translateY(-100%)`
      },
      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: `translateX(-50%) translateY(-100%)`
      },
      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      // >>>>> Left
      [[`&-placement-left ${componentCls}-arrow`, `&-placement-leftTop ${componentCls}-arrow`, `&-placement-leftBottom ${componentCls}-arrow`].join(",")]: {
        right: {
          _skip_check_: true,
          value: 0
        },
        transform: "translateX(100%) rotate(90deg)"
      },
      [`&-placement-left ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(100%) rotate(90deg)"
      },
      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffsetVertical
      },
      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffsetVertical
      },
      // >>>>> Right
      [[`&-placement-right ${componentCls}-arrow`, `&-placement-rightTop ${componentCls}-arrow`, `&-placement-rightBottom ${componentCls}-arrow`].join(",")]: {
        left: {
          _skip_check_: true,
          value: 0
        },
        transform: "translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-right ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffsetVertical
      },
      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffsetVertical
      },
      // =========================== Offset ============================
      // Offset the popover to account for the dropdown arrow
      // >>>>> Top
      [connectArrowCls([`&-placement-topLeft`, `&-placement-top`, `&-placement-topRight`].map((cls) => cls += ":not(&-arrow-hidden)"), showArrowCls)]: {
        paddingBottom: dropdownArrowDistance
      },
      // >>>>> Bottom
      [connectArrowCls([`&-placement-bottomLeft`, `&-placement-bottom`, `&-placement-bottomRight`].map((cls) => cls += ":not(&-arrow-hidden)"), showArrowCls)]: {
        paddingTop: dropdownArrowDistance
      },
      // >>>>> Left
      [connectArrowCls([`&-placement-leftTop`, `&-placement-left`, `&-placement-leftBottom`].map((cls) => cls += ":not(&-arrow-hidden)"), showArrowCls)]: {
        paddingRight: {
          _skip_check_: true,
          value: dropdownArrowDistance
        }
      },
      // >>>>> Right
      [connectArrowCls([`&-placement-rightTop`, `&-placement-right`, `&-placement-rightBottom`].map((cls) => cls += ":not(&-arrow-hidden)"), showArrowCls)]: {
        paddingLeft: {
          _skip_check_: true,
          value: dropdownArrowDistance
        }
      }
    }
  };
}
const genTooltipStyle = (token) => {
  const {
    componentCls,
    // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    tooltipRadiusOuter
  } = token;
  return [
    {
      [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
        position: "absolute",
        zIndex: zIndexPopup,
        display: "block",
        "&": [{
          width: "max-content"
        }, {
          width: "intrinsic"
        }],
        maxWidth: tooltipMaxWidth,
        visibility: "visible",
        "&-hidden": {
          display: "none"
        },
        "--antd-arrow-background-color": tooltipBg,
        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: controlHeight,
          minHeight: controlHeight,
          padding: `${paddingSM / 2}px ${paddingXS}px`,
          color: tooltipColor,
          textAlign: "start",
          textDecoration: "none",
          wordWrap: "break-word",
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary
        },
        // Limit left and right placement radius
        [[`&-placement-left`, `&-placement-leftTop`, `&-placement-leftBottom`, `&-placement-right`, `&-placement-rightTop`, `&-placement-rightBottom`].join(",")]: {
          [`${componentCls}-inner`]: {
            borderRadius: Math.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
          }
        },
        [`${componentCls}-content`]: {
          position: "relative"
        }
      }), genPresetColor(token, (colorKey, _ref) => {
        let {
          darkColor
        } = _ref;
        return {
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-inner`]: {
              backgroundColor: darkColor
            },
            [`${componentCls}-arrow`]: {
              "--antd-arrow-background-color": darkColor
            }
          }
        };
      })), {
        // RTL
        "&-rtl": {
          direction: "rtl"
        }
      })
    },
    // Arrow Style
    getArrowStyle(merge(token, {
      borderRadiusOuter: tooltipRadiusOuter
    }), {
      colorBg: "var(--antd-arrow-background-color)",
      showArrowCls: "",
      contentRadius: tooltipBorderRadius,
      limitVerticalRadius: true
    }),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none"
      }
    }
  ];
};
const useStyle$g = (prefixCls, injectStyle) => {
  const useOriginHook = genComponentStyleHook("Tooltip", (token) => {
    if ((injectStyle === null || injectStyle === void 0 ? void 0 : injectStyle.value) === false) {
      return [];
    }
    const {
      borderRadius,
      colorTextLightSolid,
      colorBgDefault,
      borderRadiusOuter
    } = token;
    const TooltipToken = merge(token, {
      // default variables
      tooltipMaxWidth: 250,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgDefault,
      tooltipRadiusOuter: borderRadiusOuter > 4 ? 4 : borderRadiusOuter
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token, "zoom-big-fast")];
  }, (_ref2) => {
    let {
      zIndexPopupBase,
      colorBgSpotlight
    } = _ref2;
    return {
      zIndexPopup: zIndexPopupBase + 70,
      colorBgDefault: colorBgSpotlight
    };
  });
  return useOriginHook(prefixCls);
};
const splitObject = (obj, keys) => {
  const picked = {};
  const omitted = _extends({}, obj);
  keys.forEach((key2) => {
    if (obj && key2 in obj) {
      picked[key2] = obj[key2];
      delete omitted[key2];
    }
  });
  return {
    picked,
    omitted
  };
};
const tooltipProps = () => _extends(_extends({}, abstractTooltipProps()), {
  title: PropTypes.any
});
const tooltipDefaultProps = () => ({
  trigger: "hover",
  align: {},
  placement: "top",
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true
});
const ToolTip = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATooltip",
  inheritAttrs: false,
  props: initDefaultProps(tooltipProps(), {
    trigger: "hover",
    align: {},
    placement: "top",
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true
  }),
  slots: Object,
  // emits: ['update:visible', 'visibleChange'],
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs,
      expose
    } = _ref;
    const {
      prefixCls,
      getPopupContainer,
      direction,
      rootPrefixCls
    } = useConfigInject("tooltip", props);
    const mergedOpen = computed(() => {
      var _a2;
      return (_a2 = props.open) !== null && _a2 !== void 0 ? _a2 : props.visible;
    });
    const innerOpen = ref(firstNotUndefined([props.open, props.visible]));
    const tooltip = ref();
    let rafId;
    watch(mergedOpen, (val) => {
      wrapperRaf.cancel(rafId);
      rafId = wrapperRaf(() => {
        innerOpen.value = !!val;
      });
    });
    const isNoTitle = () => {
      var _a2;
      const title = (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : slots.title;
      return !title && title !== 0;
    };
    const handleVisibleChange = (val) => {
      const noTitle = isNoTitle();
      if (mergedOpen.value === void 0) {
        innerOpen.value = noTitle ? false : val;
      }
      if (!noTitle) {
        emit("update:visible", val);
        emit("visibleChange", val);
        emit("update:open", val);
        emit("openChange", val);
      }
    };
    const getPopupDomNode = () => {
      return tooltip.value.getPopupDomNode();
    };
    expose({
      getPopupDomNode,
      open: innerOpen,
      forcePopupAlign: () => {
        var _a2;
        return (_a2 = tooltip.value) === null || _a2 === void 0 ? void 0 : _a2.forcePopupAlign();
      }
    });
    const tooltipPlacements = computed(() => {
      var _a2;
      const {
        builtinPlacements,
        autoAdjustOverflow: autoAdjustOverflow2,
        arrow,
        arrowPointAtCenter
      } = props;
      let mergedArrowPointAtCenter = arrowPointAtCenter;
      if (typeof arrow === "object") {
        mergedArrowPointAtCenter = (_a2 = arrow.pointAtCenter) !== null && _a2 !== void 0 ? _a2 : arrowPointAtCenter;
      }
      return builtinPlacements || getPlacements({
        arrowPointAtCenter: mergedArrowPointAtCenter,
        autoAdjustOverflow: autoAdjustOverflow2
      });
    });
    const isTrueProps = (val) => {
      return val || val === "";
    };
    const getDisabledCompatibleChildren = (ele) => {
      const elementType = ele.type;
      if (typeof elementType === "object" && ele.props) {
        if ((elementType.__ANT_BUTTON === true || elementType === "button") && isTrueProps(ele.props.disabled) || elementType.__ANT_SWITCH === true && (isTrueProps(ele.props.disabled) || isTrueProps(ele.props.loading)) || elementType.__ANT_RADIO === true && isTrueProps(ele.props.disabled)) {
          const {
            picked,
            omitted
          } = splitObject(getStyle$1(ele), ["position", "left", "right", "top", "bottom", "float", "display", "zIndex"]);
          const spanStyle = _extends(_extends({
            display: "inline-block"
          }, picked), {
            cursor: "not-allowed",
            lineHeight: 1,
            width: ele.props && ele.props.block ? "100%" : void 0
          });
          const buttonStyle = _extends(_extends({}, omitted), {
            pointerEvents: "none"
          });
          const child = cloneElement(ele, {
            style: buttonStyle
          }, true);
          return createVNode("span", {
            "style": spanStyle,
            "class": `${prefixCls.value}-disabled-compatible-wrapper`
          }, [child]);
        }
      }
      return ele;
    };
    const getOverlay = () => {
      var _a2, _b;
      return (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots);
    };
    const onPopupAlign = (domNode, align) => {
      const placements2 = tooltipPlacements.value;
      const placement = Object.keys(placements2).find((key2) => {
        var _a2, _b;
        return placements2[key2].points[0] === ((_a2 = align.points) === null || _a2 === void 0 ? void 0 : _a2[0]) && placements2[key2].points[1] === ((_b = align.points) === null || _b === void 0 ? void 0 : _b[1]);
      });
      if (placement) {
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
          top: "50%",
          left: "50%"
        };
        if (placement.indexOf("top") >= 0 || placement.indexOf("Bottom") >= 0) {
          transformOrigin.top = `${rect.height - align.offset[1]}px`;
        } else if (placement.indexOf("Top") >= 0 || placement.indexOf("bottom") >= 0) {
          transformOrigin.top = `${-align.offset[1]}px`;
        }
        if (placement.indexOf("left") >= 0 || placement.indexOf("Right") >= 0) {
          transformOrigin.left = `${rect.width - align.offset[0]}px`;
        } else if (placement.indexOf("right") >= 0 || placement.indexOf("Left") >= 0) {
          transformOrigin.left = `${-align.offset[0]}px`;
        }
        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
      }
    };
    const colorInfo = computed(() => parseColor(prefixCls.value, props.color));
    const injectFromPopover = computed(() => attrs["data-popover-inject"]);
    const [wrapSSR, hashId] = useStyle$g(prefixCls, computed(() => !injectFromPopover.value));
    return () => {
      var _a2, _b;
      const {
        openClassName,
        overlayClassName,
        overlayStyle,
        overlayInnerStyle
      } = props;
      let children = (_b = filterEmpty((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots))) !== null && _b !== void 0 ? _b : null;
      children = children.length === 1 ? children[0] : children;
      let tempVisible = innerOpen.value;
      if (mergedOpen.value === void 0 && isNoTitle()) {
        tempVisible = false;
      }
      if (!children) {
        return null;
      }
      const child = getDisabledCompatibleChildren(isValidElement(children) && !isFragment(children) ? children : createVNode("span", null, [children]));
      const childCls = classNames({
        [openClassName || `${prefixCls.value}-open`]: true,
        [child.props && child.props.class]: child.props && child.props.class
      });
      const customOverlayClassName = classNames(overlayClassName, {
        [`${prefixCls.value}-rtl`]: direction.value === "rtl"
      }, colorInfo.value.className, hashId.value);
      const formattedOverlayInnerStyle = _extends(_extends({}, colorInfo.value.overlayStyle), overlayInnerStyle);
      const arrowContentStyle = colorInfo.value.arrowStyle;
      const vcTooltipProps = _extends(_extends(_extends({}, attrs), props), {
        prefixCls: prefixCls.value,
        arrow: !!props.arrow,
        getPopupContainer: getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value,
        builtinPlacements: tooltipPlacements.value,
        visible: tempVisible,
        ref: tooltip,
        overlayClassName: customOverlayClassName,
        overlayStyle: _extends(_extends({}, arrowContentStyle), overlayStyle),
        overlayInnerStyle: formattedOverlayInnerStyle,
        onVisibleChange: handleVisibleChange,
        onPopupAlign,
        transitionName: getTransitionName(rootPrefixCls.value, "zoom-big-fast", props.transitionName)
      });
      return wrapSSR(createVNode(Tooltip$1, vcTooltipProps, {
        default: () => [innerOpen.value ? cloneElement(child, {
          class: childCls
        }) : child],
        arrowContent: () => createVNode("span", {
          "class": `${prefixCls.value}-arrow-content`
        }, null),
        overlay: getOverlay
      }));
    };
  }
});
const Tooltip = withInstall(ToolTip);
const genBaseStyle$4 = (token) => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    width,
    fontWeightStrong,
    popoverPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG: borderRadius,
    zIndexPopup,
    marginXS,
    colorBgElevated
  } = token;
  return [
    {
      [componentCls]: _extends(_extends({}, resetComponent(token)), {
        position: "absolute",
        top: 0,
        // use `left` to fix https://github.com/ant-design/ant-design/issues/39195
        left: {
          _skip_check_: true,
          value: 0
        },
        zIndex: zIndexPopup,
        fontWeight: "normal",
        whiteSpace: "normal",
        textAlign: "start",
        cursor: "auto",
        userSelect: "text",
        "--antd-arrow-background-color": colorBgElevated,
        "&-rtl": {
          direction: "rtl"
        },
        "&-hidden": {
          display: "none"
        },
        [`${componentCls}-content`]: {
          position: "relative"
        },
        [`${componentCls}-inner`]: {
          backgroundColor: popoverBg,
          backgroundClip: "padding-box",
          borderRadius,
          boxShadow: boxShadowSecondary,
          padding: popoverPadding
        },
        [`${componentCls}-title`]: {
          minWidth: width,
          marginBottom: marginXS,
          color: colorTextHeading,
          fontWeight: fontWeightStrong
        },
        [`${componentCls}-inner-content`]: {
          color: popoverColor
        }
      })
    },
    // Arrow Style
    getArrowStyle(token, {
      colorBg: "var(--antd-arrow-background-color)"
    }),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none",
        [`${componentCls}-content`]: {
          display: "inline-block"
        }
      }
    }
  ];
};
const genColorStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: PresetColors.map((colorKey) => {
      const lightColor = token[`${colorKey}-6`];
      return {
        [`&${componentCls}-${colorKey}`]: {
          "--antd-arrow-background-color": lightColor,
          [`${componentCls}-inner`]: {
            backgroundColor: lightColor
          },
          [`${componentCls}-arrow`]: {
            background: "transparent"
          }
        }
      };
    })
  };
};
const genWireframeStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    colorSplit,
    paddingSM,
    controlHeight,
    fontSize,
    lineHeight,
    padding
  } = token;
  const titlePaddingBlockDist = controlHeight - Math.round(fontSize * lineHeight);
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;
  return {
    [componentCls]: {
      [`${componentCls}-inner`]: {
        padding: 0
      },
      [`${componentCls}-title`]: {
        margin: 0,
        padding: `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px`,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`
      },
      [`${componentCls}-inner-content`]: {
        padding: `${paddingSM}px ${popoverPaddingHorizontal}px`
      }
    }
  };
};
const useStyle$f = genComponentStyleHook("Popover", (token) => {
  const {
    colorBgElevated,
    colorText,
    wireframe
  } = token;
  const popoverToken = merge(token, {
    popoverBg: colorBgElevated,
    popoverColor: colorText,
    popoverPadding: 12
    // Fixed Value
  });
  return [genBaseStyle$4(popoverToken), genColorStyle(popoverToken), wireframe && genWireframeStyle(popoverToken), initZoomMotion(popoverToken, "zoom-big")];
}, (_ref) => {
  let {
    zIndexPopupBase
  } = _ref;
  return {
    zIndexPopup: zIndexPopupBase + 30,
    width: 177
  };
});
const popoverProps = () => _extends(_extends({}, abstractTooltipProps()), {
  content: anyType(),
  title: anyType()
});
const Popover = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "APopover",
  inheritAttrs: false,
  props: initDefaultProps(popoverProps(), _extends(_extends({}, tooltipDefaultProps()), {
    trigger: "hover",
    placement: "top",
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  })),
  setup(props, _ref) {
    let {
      expose,
      slots,
      attrs
    } = _ref;
    const tooltipRef = ref();
    warning(props.visible === void 0);
    expose({
      getPopupDomNode: () => {
        var _a2, _b;
        return (_b = (_a2 = tooltipRef.value) === null || _a2 === void 0 ? void 0 : _a2.getPopupDomNode) === null || _b === void 0 ? void 0 : _b.call(_a2);
      }
    });
    const {
      prefixCls,
      configProvider
    } = useConfigInject("popover", props);
    const [wrapSSR, hashId] = useStyle$f(prefixCls);
    const rootPrefixCls = computed(() => configProvider.getPrefixCls());
    const getOverlay = () => {
      var _a2, _b;
      const {
        title = filterEmpty((_a2 = slots.title) === null || _a2 === void 0 ? void 0 : _a2.call(slots)),
        content = filterEmpty((_b = slots.content) === null || _b === void 0 ? void 0 : _b.call(slots))
      } = props;
      const hasTitle = !!(Array.isArray(title) ? title.length : title);
      const hasContent = !!(Array.isArray(content) ? content.length : title);
      if (!hasTitle && !hasContent) return null;
      return createVNode(Fragment, null, [hasTitle && createVNode("div", {
        "class": `${prefixCls.value}-title`
      }, [title]), createVNode("div", {
        "class": `${prefixCls.value}-inner-content`
      }, [content])]);
    };
    return () => {
      const overlayCls = classNames(props.overlayClassName, hashId.value);
      return wrapSSR(createVNode(Tooltip, _objectSpread2(_objectSpread2(_objectSpread2({}, omit(props, ["title", "content"])), attrs), {}, {
        "prefixCls": prefixCls.value,
        "ref": tooltipRef,
        "overlayClassName": overlayCls,
        "transitionName": getTransitionName(rootPrefixCls.value, "zoom-big", props.transitionName),
        "data-popover-inject": true
      }), {
        title: getOverlay,
        default: slots.default
      }));
    };
  }
});
const Popover$1 = withInstall(Popover);
const groupProps = () => ({
  prefixCls: String,
  maxCount: Number,
  maxStyle: {
    type: Object,
    default: void 0
  },
  maxPopoverPlacement: {
    type: String,
    default: "top"
  },
  maxPopoverTrigger: String,
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size: {
    type: [Number, String, Object],
    default: "default"
  },
  shape: {
    type: String,
    default: "circle"
  }
});
const Group = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AAvatarGroup",
  inheritAttrs: false,
  props: groupProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("avatar", props);
    const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
    const [wrapSSR, hashId] = useStyle$h(prefixCls);
    watchEffect(() => {
      const context = {
        size: props.size,
        shape: props.shape
      };
      useAvatarProviderContext(context);
    });
    return () => {
      const {
        maxPopoverPlacement = "top",
        maxCount: maxCount2,
        maxStyle,
        maxPopoverTrigger = "hover",
        shape
      } = props;
      const cls = {
        [groupPrefixCls.value]: true,
        [`${groupPrefixCls.value}-rtl`]: direction.value === "rtl",
        [`${attrs.class}`]: !!attrs.class,
        [hashId.value]: true
      };
      const children = getPropsSlot(slots, props);
      const childrenWithProps = flattenChildren(children).map((child, index2) => cloneElement(child, {
        key: `avatar-key-${index2}`
      }));
      const numOfChildren = childrenWithProps.length;
      if (maxCount2 && maxCount2 < numOfChildren) {
        const childrenShow = childrenWithProps.slice(0, maxCount2);
        const childrenHidden = childrenWithProps.slice(maxCount2, numOfChildren);
        childrenShow.push(createVNode(Popover$1, {
          "key": "avatar-popover-key",
          "content": childrenHidden,
          "trigger": maxPopoverTrigger,
          "placement": maxPopoverPlacement,
          "overlayClassName": `${groupPrefixCls.value}-popover`
        }, {
          default: () => [createVNode(Avatar, {
            "style": maxStyle,
            "shape": shape
          }, {
            default: () => [`+${numOfChildren - maxCount2}`]
          })]
        }));
        return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
          "class": cls,
          "style": attrs.style
        }), [childrenShow]));
      }
      return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": cls,
        "style": attrs.style
      }), [childrenWithProps]));
    };
  }
});
Avatar.Group = Group;
Avatar.install = function(app) {
  app.component(Avatar.name, Avatar);
  app.component(Group.name, Group);
  return app;
};
const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
const autoAdjustOverflow$1 = {
  adjustX: 1,
  adjustY: 1
};
const targetOffset = [0, 0];
const placements$1 = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow$1,
    offset: [0, -4],
    targetOffset
  },
  topCenter: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow$1,
    offset: [0, -4],
    targetOffset
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow$1,
    offset: [0, -4],
    targetOffset
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow$1,
    offset: [0, 4],
    targetOffset
  },
  bottomCenter: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow$1,
    offset: [0, 4],
    targetOffset
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow$1,
    offset: [0, 4],
    targetOffset
  }
};
var __rest$g = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Dropdown$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  props: {
    minOverlayWidthMatchTrigger: {
      type: Boolean,
      default: void 0
    },
    arrow: {
      type: Boolean,
      default: false
    },
    prefixCls: PropTypes.string.def("rc-dropdown"),
    transitionName: String,
    overlayClassName: PropTypes.string.def(""),
    openClassName: String,
    animation: PropTypes.any,
    align: PropTypes.object,
    overlayStyle: {
      type: Object,
      default: void 0
    },
    placement: PropTypes.string.def("bottomLeft"),
    overlay: PropTypes.any,
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).def("hover"),
    alignPoint: {
      type: Boolean,
      default: void 0
    },
    showAction: PropTypes.array,
    hideAction: PropTypes.array,
    getPopupContainer: Function,
    visible: {
      type: Boolean,
      default: void 0
    },
    defaultVisible: {
      type: Boolean,
      default: false
    },
    mouseEnterDelay: PropTypes.number.def(0.15),
    mouseLeaveDelay: PropTypes.number.def(0.1)
  },
  emits: ["visibleChange", "overlayClick"],
  setup(props, _ref) {
    let {
      slots,
      emit,
      expose
    } = _ref;
    const triggerVisible = ref(!!props.visible);
    watch(() => props.visible, (val) => {
      if (val !== void 0) {
        triggerVisible.value = val;
      }
    });
    const triggerRef2 = ref();
    expose({
      triggerRef: triggerRef2
    });
    const onClick = (e) => {
      if (props.visible === void 0) {
        triggerVisible.value = false;
      }
      emit("overlayClick", e);
    };
    const onVisibleChange = (visible) => {
      if (props.visible === void 0) {
        triggerVisible.value = visible;
      }
      emit("visibleChange", visible);
    };
    const getMenuElement = () => {
      var _a2;
      const overlayElement = (_a2 = slots.overlay) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      const extraOverlayProps = {
        prefixCls: `${props.prefixCls}-menu`,
        onClick
      };
      return createVNode(Fragment, {
        "key": skipFlattenKey
      }, [props.arrow && createVNode("div", {
        "class": `${props.prefixCls}-arrow`
      }, null), cloneElement(overlayElement, extraOverlayProps, false)]);
    };
    const minOverlayWidthMatchTrigger = computed(() => {
      const {
        minOverlayWidthMatchTrigger: matchTrigger = !props.alignPoint
      } = props;
      return matchTrigger;
    });
    const renderChildren = () => {
      var _a2;
      const children = (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      return triggerVisible.value && children ? cloneElement(children[0], {
        class: props.openClassName || `${props.prefixCls}-open`
      }, false) : children;
    };
    const triggerHideAction = computed(() => {
      if (!props.hideAction && props.trigger.indexOf("contextmenu") !== -1) {
        return ["click"];
      }
      return props.hideAction;
    });
    return () => {
      const {
        prefixCls,
        arrow,
        showAction,
        overlayStyle,
        trigger,
        placement,
        align,
        getPopupContainer,
        transitionName: transitionName2,
        animation,
        overlayClassName
      } = props, otherProps = __rest$g(props, ["prefixCls", "arrow", "showAction", "overlayStyle", "trigger", "placement", "align", "getPopupContainer", "transitionName", "animation", "overlayClassName"]);
      return createVNode(Trigger, _objectSpread2(_objectSpread2({}, otherProps), {}, {
        "prefixCls": prefixCls,
        "ref": triggerRef2,
        "popupClassName": classNames(overlayClassName, {
          [`${prefixCls}-show-arrow`]: arrow
        }),
        "popupStyle": overlayStyle,
        "builtinPlacements": placements$1,
        "action": trigger,
        "showAction": showAction,
        "hideAction": triggerHideAction.value || [],
        "popupPlacement": placement,
        "popupAlign": align,
        "popupTransitionName": transitionName2,
        "popupAnimation": animation,
        "popupVisible": triggerVisible.value,
        "stretch": minOverlayWidthMatchTrigger.value ? "minWidth" : "",
        "onPopupVisibleChange": onVisibleChange,
        "getPopupContainer": getPopupContainer
      }), {
        popup: getMenuElement,
        default: renderChildren
      });
    };
  }
});
const genWaveStyle = (token) => {
  const {
    componentCls,
    colorPrimary
  } = token;
  return {
    [componentCls]: {
      position: "absolute",
      background: "transparent",
      pointerEvents: "none",
      boxSizing: "border-box",
      color: `var(--wave-color, ${colorPrimary})`,
      boxShadow: `0 0 0 0 currentcolor`,
      opacity: 0.2,
      // =================== Motion ===================
      "&.wave-motion-appear": {
        transition: [`box-shadow 0.4s ${token.motionEaseOutCirc}`, `opacity 2s ${token.motionEaseOutCirc}`].join(","),
        "&-active": {
          boxShadow: `0 0 0 6px currentcolor`,
          opacity: 0
        }
      }
    }
  };
};
const useStyle$e = genComponentStyleHook("Wave", (token) => [genWaveStyle(token)]);
function isNotGrey(color) {
  const match = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }
  return true;
}
function isValidWaveColor(color) {
  return color && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && isNotGrey(color) && !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
  color !== "transparent";
}
function getTargetWaveColor(node) {
  const {
    borderTopColor,
    borderColor,
    backgroundColor
  } = getComputedStyle(node);
  if (isValidWaveColor(borderTopColor)) {
    return borderTopColor;
  }
  if (isValidWaveColor(borderColor)) {
    return borderColor;
  }
  if (isValidWaveColor(backgroundColor)) {
    return backgroundColor;
  }
  return null;
}
function validateNum(value) {
  return Number.isNaN(value) ? 0 : value;
}
const WaveEffect = defineComponent({
  props: {
    target: objectType(),
    className: String
  },
  setup(props) {
    const divRef = shallowRef(null);
    const [color, setWaveColor] = useState(null);
    const [borderRadius, setBorderRadius] = useState([]);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [enabled, setEnabled] = useState(false);
    function syncPos() {
      const {
        target
      } = props;
      const nodeStyle = getComputedStyle(target);
      setWaveColor(getTargetWaveColor(target));
      const isStatic = nodeStyle.position === "static";
      const {
        borderLeftWidth,
        borderTopWidth
      } = nodeStyle;
      setLeft(isStatic ? target.offsetLeft : validateNum(-parseFloat(borderLeftWidth)));
      setTop(isStatic ? target.offsetTop : validateNum(-parseFloat(borderTopWidth)));
      setWidth(target.offsetWidth);
      setHeight(target.offsetHeight);
      const {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius
      } = nodeStyle;
      setBorderRadius([borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius].map((radius) => validateNum(parseFloat(radius))));
    }
    let resizeObserver;
    let rafId;
    let timeoutId;
    const clear = () => {
      clearTimeout(timeoutId);
      wrapperRaf.cancel(rafId);
      resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect();
    };
    const removeDom = () => {
      var _a2;
      const holder = (_a2 = divRef.value) === null || _a2 === void 0 ? void 0 : _a2.parentElement;
      if (holder) {
        render(null, holder);
        if (holder.parentElement) {
          holder.parentElement.removeChild(holder);
        }
      }
    };
    onMounted(() => {
      clear();
      timeoutId = setTimeout(() => {
        removeDom();
      }, 5e3);
      const {
        target
      } = props;
      if (target) {
        rafId = wrapperRaf(() => {
          syncPos();
          setEnabled(true);
        });
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(syncPos);
          resizeObserver.observe(target);
        }
      }
    });
    onBeforeUnmount(() => {
      clear();
    });
    const onTransitionend = (e) => {
      if (e.propertyName === "opacity") {
        removeDom();
      }
    };
    return () => {
      if (!enabled.value) {
        return null;
      }
      const waveStyle = {
        left: `${left.value}px`,
        top: `${top.value}px`,
        width: `${width.value}px`,
        height: `${height.value}px`,
        borderRadius: borderRadius.value.map((radius) => `${radius}px`).join(" ")
      };
      if (color) {
        waveStyle["--wave-color"] = color.value;
      }
      return createVNode(Transition, {
        "appear": true,
        "name": "wave-motion",
        "appearFromClass": "wave-motion-appear",
        "appearActiveClass": "wave-motion-appear",
        "appearToClass": "wave-motion-appear wave-motion-appear-active"
      }, {
        default: () => [createVNode("div", {
          "ref": divRef,
          "class": props.className,
          "style": waveStyle,
          "onTransitionend": onTransitionend
        }, null)]
      });
    };
  }
});
function showWaveEffect(node, className) {
  const holder = document.createElement("div");
  holder.style.position = "absolute";
  holder.style.left = `0px`;
  holder.style.top = `0px`;
  node === null || node === void 0 ? void 0 : node.insertBefore(holder, node === null || node === void 0 ? void 0 : node.firstChild);
  render(createVNode(WaveEffect, {
    "target": node,
    "className": className
  }, null), holder);
  return () => {
    render(null, holder);
    if (holder.parentElement) {
      holder.parentElement.removeChild(holder);
    }
  };
}
function useWave(className, wave) {
  const instance = getCurrentInstance();
  let stopWave;
  function showWave() {
    var _a2;
    const node = findDOMNode(instance);
    stopWave === null || stopWave === void 0 ? void 0 : stopWave();
    if (((_a2 = wave === null || wave === void 0 ? void 0 : wave.value) === null || _a2 === void 0 ? void 0 : _a2.disabled) || !node) {
      return;
    }
    stopWave = showWaveEffect(node, className.value);
  }
  onBeforeUnmount(() => {
    stopWave === null || stopWave === void 0 ? void 0 : stopWave();
  });
  return showWave;
}
const Wave = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Wave",
  props: {
    disabled: Boolean
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const instance = getCurrentInstance();
    const {
      prefixCls,
      wave
    } = useConfigInject("wave", props);
    const [, hashId] = useStyle$e(prefixCls);
    const showWave = useWave(computed(() => classNames(prefixCls.value, hashId.value)), wave);
    let onClick;
    const clear = () => {
      const node = findDOMNode(instance);
      node.removeEventListener("click", onClick, true);
    };
    onMounted(() => {
      watch(() => props.disabled, () => {
        clear();
        nextTick(() => {
          const node = findDOMNode(instance);
          node === null || node === void 0 ? void 0 : node.removeEventListener("click", onClick, true);
          if (!node || node.nodeType !== 1 || props.disabled) {
            return;
          }
          onClick = (e) => {
            if (e.target.tagName === "INPUT" || !isVisible(e.target) || // No need wave
            !node.getAttribute || node.getAttribute("disabled") || node.disabled || node.className.includes("disabled") || node.className.includes("-leave")) {
              return;
            }
            showWave();
          };
          node.addEventListener("click", onClick, true);
        });
      }, {
        immediate: true,
        flush: "post"
      });
    });
    onBeforeUnmount(() => {
      clear();
    });
    return () => {
      var _a2;
      const children = (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)[0];
      return children;
    };
  }
});
const buttonProps = () => ({
  prefixCls: String,
  type: String,
  htmlType: {
    type: String,
    default: "button"
  },
  shape: {
    type: String
  },
  size: {
    type: String
  },
  loading: {
    type: [Boolean, Object],
    default: () => false
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  ghost: {
    type: Boolean,
    default: void 0
  },
  block: {
    type: Boolean,
    default: void 0
  },
  danger: {
    type: Boolean,
    default: void 0
  },
  icon: PropTypes.any,
  href: String,
  target: String,
  title: String,
  onClick: eventType(),
  onMousedown: eventType()
});
const getCollapsedWidth = (node) => {
  if (node) {
    node.style.width = "0px";
    node.style.opacity = "0";
    node.style.transform = "scale(0)";
  }
};
const getRealWidth = (node) => {
  nextTick(() => {
    if (node) {
      node.style.width = `${node.scrollWidth}px`;
      node.style.opacity = "1";
      node.style.transform = "scale(1)";
    }
  });
};
const resetStyle = (node) => {
  if (node && node.style) {
    node.style.width = null;
    node.style.opacity = null;
    node.style.transform = null;
  }
};
const LoadingIcon = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LoadingIcon",
  props: {
    prefixCls: String,
    loading: [Boolean, Object],
    existIcon: Boolean
  },
  setup(props) {
    return () => {
      const {
        existIcon,
        prefixCls,
        loading
      } = props;
      if (existIcon) {
        return createVNode("span", {
          "class": `${prefixCls}-loading-icon`
        }, [createVNode(LoadingOutlined, null, null)]);
      }
      const visible = !!loading;
      return createVNode(Transition, {
        "name": `${prefixCls}-loading-icon-motion`,
        "onBeforeEnter": getCollapsedWidth,
        "onEnter": getRealWidth,
        "onAfterEnter": resetStyle,
        "onBeforeLeave": getRealWidth,
        "onLeave": (node) => {
          setTimeout(() => {
            getCollapsedWidth(node);
          });
        },
        "onAfterLeave": resetStyle
      }, {
        default: () => [visible ? createVNode("span", {
          "class": `${prefixCls}-loading-icon`
        }, [createVNode(LoadingOutlined, null, null)]) : null]
      });
    };
  }
});
const genButtonBorderStyle = (buttonTypeCls, borderColor) => ({
  // Border
  [`> span, > ${buttonTypeCls}`]: {
    "&:not(:last-child)": {
      [`&, & > ${buttonTypeCls}`]: {
        "&:not(:disabled)": {
          borderInlineEndColor: borderColor
        }
      }
    },
    "&:not(:first-child)": {
      [`&, & > ${buttonTypeCls}`]: {
        "&:not(:disabled)": {
          borderInlineStartColor: borderColor
        }
      }
    }
  }
});
const genGroupStyle = (token) => {
  const {
    componentCls,
    fontSize,
    lineWidth,
    colorPrimaryHover,
    colorErrorHover
  } = token;
  return {
    [`${componentCls}-group`]: [
      {
        position: "relative",
        display: "inline-flex",
        // Border
        [`> span, > ${componentCls}`]: {
          "&:not(:last-child)": {
            [`&, & > ${componentCls}`]: {
              borderStartEndRadius: 0,
              borderEndEndRadius: 0
            }
          },
          "&:not(:first-child)": {
            marginInlineStart: -lineWidth,
            [`&, & > ${componentCls}`]: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0
            }
          }
        },
        [componentCls]: {
          position: "relative",
          zIndex: 1,
          [`&:hover,
          &:focus,
          &:active`]: {
            zIndex: 2
          },
          "&[disabled]": {
            zIndex: 0
          }
        },
        [`${componentCls}-icon-only`]: {
          fontSize
        }
      },
      // Border Color
      genButtonBorderStyle(`${componentCls}-primary`, colorPrimaryHover),
      genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
    ]
  };
};
function compactItemVerticalBorder(token, parentCls) {
  return {
    // border collapse
    [`&-item:not(${parentCls}-last-item)`]: {
      marginBottom: -token.lineWidth
    },
    "&-item": {
      "&:hover,&:focus,&:active": {
        zIndex: 2
      },
      "&[disabled]": {
        zIndex: 0
      }
    }
  };
}
function compactItemBorderVerticalRadius(prefixCls, parentCls) {
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: {
      borderRadius: 0
    },
    [`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0
      }
    }
  };
}
function genCompactItemVerticalStyle(token) {
  const compactCls = `${token.componentCls}-compact-vertical`;
  return {
    [compactCls]: _extends(_extends({}, compactItemVerticalBorder(token, compactCls)), compactItemBorderVerticalRadius(token.componentCls, compactCls))
  };
}
const genSharedButtonStyle = (token) => {
  const {
    componentCls,
    iconCls
  } = token;
  return {
    [componentCls]: {
      outline: "none",
      position: "relative",
      display: "inline-block",
      fontWeight: 400,
      whiteSpace: "nowrap",
      textAlign: "center",
      backgroundImage: "none",
      backgroundColor: "transparent",
      border: `${token.lineWidth}px ${token.lineType} transparent`,
      cursor: "pointer",
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: "none",
      touchAction: "manipulation",
      lineHeight: token.lineHeight,
      color: token.colorText,
      "> span": {
        display: "inline-block"
      },
      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token.marginXS
      },
      "> a": {
        color: "currentColor"
      },
      "&:not(:disabled)": _extends({}, genFocusStyle(token)),
      // make `btn-icon-only` not too narrow
      [`&-icon-only${componentCls}-compact-item`]: {
        flex: "none"
      },
      // Special styles for Primary Button
      [`&-compact-item${componentCls}-primary`]: {
        [`&:not([disabled]) + ${componentCls}-compact-item${componentCls}-primary:not([disabled])`]: {
          position: "relative",
          "&:before": {
            position: "absolute",
            top: -token.lineWidth,
            insetInlineStart: -token.lineWidth,
            display: "inline-block",
            width: token.lineWidth,
            height: `calc(100% + ${token.lineWidth * 2}px)`,
            backgroundColor: token.colorPrimaryHover,
            content: '""'
          }
        }
      },
      // Special styles for Primary Button
      "&-compact-vertical-item": {
        [`&${componentCls}-primary`]: {
          [`&:not([disabled]) + ${componentCls}-compact-vertical-item${componentCls}-primary:not([disabled])`]: {
            position: "relative",
            "&:before": {
              position: "absolute",
              top: -token.lineWidth,
              insetInlineStart: -token.lineWidth,
              display: "inline-block",
              width: `calc(100% + ${token.lineWidth * 2}px)`,
              height: token.lineWidth,
              backgroundColor: token.colorPrimaryHover,
              content: '""'
            }
          }
        }
      }
    }
  };
};
const genHoverActiveButtonStyle = (hoverStyle, activeStyle) => ({
  "&:not(:disabled)": {
    "&:hover": hoverStyle,
    "&:active": activeStyle
  }
});
const genCircleButtonStyle = (token) => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: "50%"
});
const genRoundButtonStyle = (token) => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.controlHeight / 2,
  paddingInlineEnd: token.controlHeight / 2
});
const genDisabledStyle$1 = (token) => ({
  cursor: "not-allowed",
  borderColor: token.colorBorder,
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  boxShadow: "none"
});
const genGhostButtonStyle = (btnCls, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) => ({
  [`&${btnCls}-background-ghost`]: _extends(_extends({
    color: textColor || void 0,
    backgroundColor: "transparent",
    borderColor: borderColor || void 0,
    boxShadow: "none"
  }, genHoverActiveButtonStyle(_extends({
    backgroundColor: "transparent"
  }, hoverStyle), _extends({
    backgroundColor: "transparent"
  }, activeStyle))), {
    "&:disabled": {
      cursor: "not-allowed",
      color: textColorDisabled || void 0,
      borderColor: borderColorDisabled || void 0
    }
  })
});
const genSolidDisabledButtonStyle = (token) => ({
  "&:disabled": _extends({}, genDisabledStyle$1(token))
});
const genSolidButtonStyle = (token) => _extends({}, genSolidDisabledButtonStyle(token));
const genPureDisabledButtonStyle = (token) => ({
  "&:disabled": {
    cursor: "not-allowed",
    color: token.colorTextDisabled
  }
});
const genDefaultButtonStyle = (token) => _extends(_extends(_extends(_extends(_extends({}, genSolidButtonStyle(token)), {
  backgroundColor: token.colorBgContainer,
  borderColor: token.colorBorder,
  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`
}), genHoverActiveButtonStyle({
  color: token.colorPrimaryHover,
  borderColor: token.colorPrimaryHover
}, {
  color: token.colorPrimaryActive,
  borderColor: token.colorPrimaryActive
})), genGhostButtonStyle(token.componentCls, token.colorBgContainer, token.colorBgContainer, token.colorTextDisabled, token.colorBorder)), {
  [`&${token.componentCls}-dangerous`]: _extends(_extends(_extends({
    color: token.colorError,
    borderColor: token.colorError
  }, genHoverActiveButtonStyle({
    color: token.colorErrorHover,
    borderColor: token.colorErrorBorderHover
  }, {
    color: token.colorErrorActive,
    borderColor: token.colorErrorActive
  })), genGhostButtonStyle(token.componentCls, token.colorError, token.colorError, token.colorTextDisabled, token.colorBorder)), genSolidDisabledButtonStyle(token))
});
const genPrimaryButtonStyle = (token) => _extends(_extends(_extends(_extends(_extends({}, genSolidButtonStyle(token)), {
  color: token.colorTextLightSolid,
  backgroundColor: token.colorPrimary,
  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`
}), genHoverActiveButtonStyle({
  color: token.colorTextLightSolid,
  backgroundColor: token.colorPrimaryHover
}, {
  color: token.colorTextLightSolid,
  backgroundColor: token.colorPrimaryActive
})), genGhostButtonStyle(token.componentCls, token.colorPrimary, token.colorPrimary, token.colorTextDisabled, token.colorBorder, {
  color: token.colorPrimaryHover,
  borderColor: token.colorPrimaryHover
}, {
  color: token.colorPrimaryActive,
  borderColor: token.colorPrimaryActive
})), {
  [`&${token.componentCls}-dangerous`]: _extends(_extends(_extends({
    backgroundColor: token.colorError,
    boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`
  }, genHoverActiveButtonStyle({
    backgroundColor: token.colorErrorHover
  }, {
    backgroundColor: token.colorErrorActive
  })), genGhostButtonStyle(token.componentCls, token.colorError, token.colorError, token.colorTextDisabled, token.colorBorder, {
    color: token.colorErrorHover,
    borderColor: token.colorErrorHover
  }, {
    color: token.colorErrorActive,
    borderColor: token.colorErrorActive
  })), genSolidDisabledButtonStyle(token))
});
const genDashedButtonStyle = (token) => _extends(_extends({}, genDefaultButtonStyle(token)), {
  borderStyle: "dashed"
});
const genLinkButtonStyle = (token) => _extends(_extends(_extends({
  color: token.colorLink
}, genHoverActiveButtonStyle({
  color: token.colorLinkHover
}, {
  color: token.colorLinkActive
})), genPureDisabledButtonStyle(token)), {
  [`&${token.componentCls}-dangerous`]: _extends(_extends({
    color: token.colorError
  }, genHoverActiveButtonStyle({
    color: token.colorErrorHover
  }, {
    color: token.colorErrorActive
  })), genPureDisabledButtonStyle(token))
});
const genTextButtonStyle = (token) => _extends(_extends(_extends({}, genHoverActiveButtonStyle({
  color: token.colorText,
  backgroundColor: token.colorBgTextHover
}, {
  color: token.colorText,
  backgroundColor: token.colorBgTextActive
})), genPureDisabledButtonStyle(token)), {
  [`&${token.componentCls}-dangerous`]: _extends(_extends({
    color: token.colorError
  }, genPureDisabledButtonStyle(token)), genHoverActiveButtonStyle({
    color: token.colorErrorHover,
    backgroundColor: token.colorErrorBg
  }, {
    color: token.colorErrorHover,
    backgroundColor: token.colorErrorBg
  }))
});
const genDisabledButtonStyle = (token) => _extends(_extends({}, genDisabledStyle$1(token)), {
  [`&${token.componentCls}:hover`]: _extends({}, genDisabledStyle$1(token))
});
const genTypeButtonStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token),
    [`${componentCls}-link`]: genLinkButtonStyle(token),
    [`${componentCls}-text`]: genTextButtonStyle(token),
    [`${componentCls}-disabled`]: genDisabledButtonStyle(token)
  };
};
const genSizeButtonStyle = function(token) {
  let sizePrefixCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  const {
    componentCls,
    iconCls,
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    borderRadius,
    buttonPaddingHorizontal
  } = token;
  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth);
  const paddingHorizontal = buttonPaddingHorizontal - lineWidth;
  const iconOnlyCls = `${componentCls}-icon-only`;
  return [
    // Size
    {
      [`${componentCls}${sizePrefixCls}`]: {
        fontSize,
        height: controlHeight,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius,
        [`&${iconOnlyCls}`]: {
          width: controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
          [`&${componentCls}-round`]: {
            width: "auto"
          },
          "> span": {
            transform: "scale(1.143)"
            // 14px -> 16px
          }
        },
        // Loading
        [`&${componentCls}-loading`]: {
          opacity: token.opacityLoading,
          cursor: "default"
        },
        [`${componentCls}-loading-icon`]: {
          transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`
        },
        [`&:not(${iconOnlyCls}) ${componentCls}-loading-icon > ${iconCls}`]: {
          marginInlineEnd: token.marginXS
        }
      }
    },
    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token)
    },
    {
      [`${componentCls}${componentCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token)
    }
  ];
};
const genSizeBaseButtonStyle = (token) => genSizeButtonStyle(token);
const genSizeSmallButtonStyle = (token) => {
  const smallToken = merge(token, {
    controlHeight: token.controlHeightSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: 8,
    borderRadius: token.borderRadiusSM
  });
  return genSizeButtonStyle(smallToken, `${token.componentCls}-sm`);
};
const genSizeLargeButtonStyle = (token) => {
  const largeToken = merge(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.fontSizeLG,
    borderRadius: token.borderRadiusLG
  });
  return genSizeButtonStyle(largeToken, `${token.componentCls}-lg`);
};
const genBlockButtonStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: "100%"
      }
    }
  };
};
const useStyle$d = genComponentStyleHook("Button", (token) => {
  const {
    controlTmpOutline,
    paddingContentHorizontal
  } = token;
  const buttonToken = merge(token, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal
  });
  return [
    // Shared
    genSharedButtonStyle(buttonToken),
    // Size
    genSizeSmallButtonStyle(buttonToken),
    genSizeBaseButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),
    // Block
    genBlockButtonStyle(buttonToken),
    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(buttonToken),
    // Button Group
    genGroupStyle(buttonToken),
    // Space Compact
    genCompactItemStyle(token, {
      focus: false
    }),
    genCompactItemVerticalStyle(token)
  ];
});
const buttonGroupProps = () => ({
  prefixCls: String,
  size: {
    type: String
  }
});
const GroupSizeContext = createContext();
const ButtonGroup$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AButtonGroup",
  props: buttonGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("btn-group", props);
    const [, , hashId] = useToken();
    GroupSizeContext.useProvide(reactive({
      size: computed(() => props.size)
    }));
    const classes = computed(() => {
      const {
        size
      } = props;
      let sizeCls = "";
      switch (size) {
        case "large":
          sizeCls = "lg";
          break;
        case "small":
          sizeCls = "sm";
          break;
        case "middle":
        case void 0:
          break;
        default:
          devWarning(!size, "Button.Group", "Invalid prop `size`.");
      }
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-${sizeCls}`]: sizeCls,
        [`${prefixCls.value}-rtl`]: direction.value === "rtl",
        [hashId.value]: true
      };
    });
    return () => {
      var _a2;
      return createVNode("div", {
        "class": classes.value
      }, [flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots))]);
    };
  }
});
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isUnBorderedButtonType(type) {
  return type === "text" || type === "link";
}
const Button = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AButton",
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps(buttonProps(), {
    type: "default"
  }),
  slots: Object,
  // emits: ['click', 'mousedown'],
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit,
      expose
    } = _ref;
    const {
      prefixCls,
      autoInsertSpaceInButton,
      direction,
      size
    } = useConfigInject("btn", props);
    const [wrapSSR, hashId] = useStyle$d(prefixCls);
    const groupSizeContext = GroupSizeContext.useInject();
    const disabledContext = useInjectDisabled();
    const mergedDisabled = computed(() => {
      var _a2;
      return (_a2 = props.disabled) !== null && _a2 !== void 0 ? _a2 : disabledContext.value;
    });
    const buttonNodeRef = shallowRef(null);
    const delayTimeoutRef = shallowRef(void 0);
    let isNeedInserted = false;
    const innerLoading = shallowRef(false);
    const hasTwoCNChar = shallowRef(false);
    const autoInsertSpace = computed(() => autoInsertSpaceInButton.value !== false);
    const {
      compactSize,
      compactItemClassnames
    } = useCompactItemContext(prefixCls, direction);
    const loadingOrDelay = computed(() => typeof props.loading === "object" && props.loading.delay ? props.loading.delay || true : !!props.loading);
    watch(loadingOrDelay, (val) => {
      clearTimeout(delayTimeoutRef.value);
      if (typeof loadingOrDelay.value === "number") {
        delayTimeoutRef.value = setTimeout(() => {
          innerLoading.value = val;
        }, loadingOrDelay.value);
      } else {
        innerLoading.value = val;
      }
    }, {
      immediate: true
    });
    const classes = computed(() => {
      const {
        type,
        shape = "default",
        ghost,
        block,
        danger
      } = props;
      const pre = prefixCls.value;
      const sizeClassNameMap = {
        large: "lg",
        small: "sm",
        middle: void 0
      };
      const sizeFullname = compactSize.value || (groupSizeContext === null || groupSizeContext === void 0 ? void 0 : groupSizeContext.size) || size.value;
      const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || "" : "";
      return [compactItemClassnames.value, {
        [hashId.value]: true,
        [`${pre}`]: true,
        [`${pre}-${shape}`]: shape !== "default" && shape,
        [`${pre}-${type}`]: type,
        [`${pre}-${sizeCls}`]: sizeCls,
        [`${pre}-loading`]: innerLoading.value,
        [`${pre}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
        [`${pre}-two-chinese-chars`]: hasTwoCNChar.value && autoInsertSpace.value,
        [`${pre}-block`]: block,
        [`${pre}-dangerous`]: !!danger,
        [`${pre}-rtl`]: direction.value === "rtl"
      }];
    });
    const fixTwoCNChar = () => {
      const node = buttonNodeRef.value;
      if (!node || autoInsertSpaceInButton.value === false) {
        return;
      }
      const buttonText = node.textContent;
      if (isNeedInserted && isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar.value) {
          hasTwoCNChar.value = true;
        }
      } else if (hasTwoCNChar.value) {
        hasTwoCNChar.value = false;
      }
    };
    const handleClick = (event) => {
      if (innerLoading.value || mergedDisabled.value) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    const handleMousedown = (event) => {
      emit("mousedown", event);
    };
    const insertSpace = (child, needInserted) => {
      const SPACE = needInserted ? " " : "";
      if (child.type === Text) {
        let text = child.children.trim();
        if (isTwoCNChar(text)) {
          text = text.split("").join(SPACE);
        }
        return createVNode("span", null, [text]);
      }
      return child;
    };
    watchEffect(() => {
      devWarning(!(props.ghost && isUnBorderedButtonType(props.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
    });
    onMounted(fixTwoCNChar);
    onUpdated(fixTwoCNChar);
    onBeforeUnmount(() => {
      delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
    });
    const focus = () => {
      var _a2;
      (_a2 = buttonNodeRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus();
    };
    const blur = () => {
      var _a2;
      (_a2 = buttonNodeRef.value) === null || _a2 === void 0 ? void 0 : _a2.blur();
    };
    expose({
      focus,
      blur
    });
    return () => {
      var _a2, _b;
      const {
        icon = (_a2 = slots.icon) === null || _a2 === void 0 ? void 0 : _a2.call(slots)
      } = props;
      const children = flattenChildren((_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots));
      isNeedInserted = children.length === 1 && !icon && !isUnBorderedButtonType(props.type);
      const {
        type,
        htmlType,
        href,
        title,
        target
      } = props;
      const iconType = innerLoading.value ? "loading" : icon;
      const buttonProps2 = _extends(_extends({}, attrs), {
        title,
        disabled: mergedDisabled.value,
        class: [classes.value, attrs.class, {
          [`${prefixCls.value}-icon-only`]: children.length === 0 && !!iconType
        }],
        onClick: handleClick,
        onMousedown: handleMousedown
      });
      if (!mergedDisabled.value) {
        delete buttonProps2.disabled;
      }
      const iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
        "existIcon": !!icon,
        "prefixCls": prefixCls.value,
        "loading": !!innerLoading.value
      }, null);
      const kids = children.map((child) => insertSpace(child, isNeedInserted && autoInsertSpace.value));
      if (href !== void 0) {
        return wrapSSR(createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps2), {}, {
          "href": href,
          "target": target,
          "ref": buttonNodeRef
        }), [iconNode, kids]));
      }
      let buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps2), {}, {
        "ref": buttonNodeRef,
        "type": htmlType
      }), [iconNode, kids]);
      if (!isUnBorderedButtonType(type)) {
        const _buttonNode = /* @__PURE__ */ function() {
          return buttonNode;
        }();
        buttonNode = createVNode(Wave, {
          "ref": "wave",
          "disabled": !!innerLoading.value
        }, {
          default: () => [_buttonNode]
        });
      }
      return wrapSSR(buttonNode);
    };
  }
});
Button.Group = ButtonGroup$1;
Button.install = function(app) {
  app.component(Button.name, Button);
  app.component(ButtonGroup$1.name, ButtonGroup$1);
  return app;
};
const dropdownProps = () => ({
  arrow: someType([Boolean, Object]),
  trigger: {
    type: [Array, String]
  },
  menu: objectType(),
  overlay: PropTypes.any,
  /** @deprecated Please use `open` instead */
  visible: booleanType(),
  open: booleanType(),
  disabled: booleanType(),
  danger: booleanType(),
  autofocus: booleanType(),
  align: objectType(),
  getPopupContainer: Function,
  prefixCls: String,
  transitionName: String,
  placement: String,
  overlayClassName: String,
  overlayStyle: objectType(),
  forceRender: booleanType(),
  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
  openClassName: String,
  minOverlayWidthMatchTrigger: booleanType(),
  destroyPopupOnHide: booleanType(),
  /** @deprecated Please use `onOpenChange` instead */
  onVisibleChange: {
    type: Function
  },
  /** @deprecated Please use `onUpdate:open` instead */
  "onUpdate:visible": {
    type: Function
  },
  onOpenChange: {
    type: Function
  },
  "onUpdate:open": {
    type: Function
  }
});
const buttonTypesProps = buttonProps();
const dropdownButtonProps = () => _extends(_extends({}, dropdownProps()), {
  type: buttonTypesProps.type,
  size: String,
  htmlType: buttonTypesProps.htmlType,
  href: String,
  disabled: booleanType(),
  prefixCls: String,
  icon: PropTypes.any,
  title: String,
  loading: buttonTypesProps.loading,
  onClick: eventType()
});
const genButtonStyle = (token) => {
  const {
    componentCls,
    antCls,
    paddingXS,
    opacityLoading
  } = token;
  return {
    [`${componentCls}-button`]: {
      whiteSpace: "nowrap",
      [`&${antCls}-btn-group > ${antCls}-btn`]: {
        [`&-loading, &-loading + ${antCls}-btn`]: {
          cursor: "default",
          pointerEvents: "none",
          opacity: opacityLoading
        },
        [`&:last-child:not(:first-child):not(${antCls}-btn-icon-only)`]: {
          paddingInline: paddingXS
        }
      }
    }
  };
};
const genStatusStyle = (token) => {
  const {
    componentCls,
    menuCls,
    colorError,
    colorTextLightSolid
  } = token;
  const itemCls = `${menuCls}-item`;
  return {
    [`${componentCls}, ${componentCls}-menu-submenu`]: {
      [`${menuCls} ${itemCls}`]: {
        [`&${itemCls}-danger:not(${itemCls}-disabled)`]: {
          color: colorError,
          "&:hover": {
            color: colorTextLightSolid,
            backgroundColor: colorError
          }
        }
      }
    }
  };
};
const genBaseStyle$3 = (token) => {
  const {
    componentCls,
    menuCls,
    zIndexPopup,
    dropdownArrowDistance,
    dropdownArrowOffset,
    sizePopupArrow,
    antCls,
    iconCls,
    motionDurationMid,
    dropdownPaddingVertical,
    fontSize,
    dropdownEdgeChildPadding,
    colorTextDisabled,
    fontSizeIcon,
    controlPaddingHorizontal,
    colorBgElevated,
    boxShadowPopoverArrow
  } = token;
  return [
    {
      [componentCls]: _extends(_extends({}, resetComponent(token)), {
        position: "absolute",
        top: -9999,
        left: {
          _skip_check_: true,
          value: -9999
        },
        zIndex: zIndexPopup,
        display: "block",
        // A placeholder out of dropdown visible range to avoid close when user moving
        "&::before": {
          position: "absolute",
          insetBlock: -dropdownArrowDistance + sizePopupArrow / 2,
          // insetInlineStart: -7, // FIXME: Seems not work for hidden element
          zIndex: -9999,
          opacity: 1e-4,
          content: '""'
        },
        [`${componentCls}-wrap`]: {
          position: "relative",
          [`${antCls}-btn > ${iconCls}-down`]: {
            fontSize: fontSizeIcon
          },
          [`${iconCls}-down::before`]: {
            transition: `transform ${motionDurationMid}`
          }
        },
        [`${componentCls}-wrap-open`]: {
          [`${iconCls}-down::before`]: {
            transform: `rotate(180deg)`
          }
        },
        [`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: {
          display: "none"
        },
        // =============================================================
        // ==                          Arrow                          ==
        // =============================================================
        // Offset the popover to account for the dropdown arrow
        [`
        &-show-arrow${componentCls}-placement-topLeft,
        &-show-arrow${componentCls}-placement-top,
        &-show-arrow${componentCls}-placement-topRight
      `]: {
          paddingBottom: dropdownArrowDistance
        },
        [`
        &-show-arrow${componentCls}-placement-bottomLeft,
        &-show-arrow${componentCls}-placement-bottom,
        &-show-arrow${componentCls}-placement-bottomRight
      `]: {
          paddingTop: dropdownArrowDistance
        },
        // Note: .popover-arrow is outer, .popover-arrow:after is inner
        [`${componentCls}-arrow`]: _extends({
          position: "absolute",
          zIndex: 1,
          display: "block"
        }, roundedArrow(sizePopupArrow, token.borderRadiusXS, token.borderRadiusOuter, colorBgElevated, boxShadowPopoverArrow)),
        [`
        &-placement-top > ${componentCls}-arrow,
        &-placement-topLeft > ${componentCls}-arrow,
        &-placement-topRight > ${componentCls}-arrow
      `]: {
          bottom: dropdownArrowDistance,
          transform: "translateY(100%) rotate(180deg)"
        },
        [`&-placement-top > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: "50%"
          },
          transform: "translateX(-50%) translateY(100%) rotate(180deg)"
        },
        [`&-placement-topLeft > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: dropdownArrowOffset
          }
        },
        [`&-placement-topRight > ${componentCls}-arrow`]: {
          right: {
            _skip_check_: true,
            value: dropdownArrowOffset
          }
        },
        [`
          &-placement-bottom > ${componentCls}-arrow,
          &-placement-bottomLeft > ${componentCls}-arrow,
          &-placement-bottomRight > ${componentCls}-arrow
        `]: {
          top: dropdownArrowDistance,
          transform: `translateY(-100%)`
        },
        [`&-placement-bottom > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: "50%"
          },
          transform: `translateY(-100%) translateX(-50%)`
        },
        [`&-placement-bottomLeft > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: dropdownArrowOffset
          }
        },
        [`&-placement-bottomRight > ${componentCls}-arrow`]: {
          right: {
            _skip_check_: true,
            value: dropdownArrowOffset
          }
        },
        // =============================================================
        // ==                         Motion                          ==
        // =============================================================
        // When position is not enough for dropdown, the placement will revert.
        // We will handle this with revert motion name.
        [`&${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomRight,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomRight`]: {
          animationName: slideUpIn
        },
        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-top,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-top,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topRight`]: {
          animationName: slideDownIn
        },
        [`&${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomRight`]: {
          animationName: slideUpOut
        },
        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-top,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topRight`]: {
          animationName: slideDownOut
        }
      })
    },
    {
      // =============================================================
      // ==                          Menu                           ==
      // =============================================================
      [`${componentCls} ${menuCls}`]: {
        position: "relative",
        margin: 0
      },
      [`${menuCls}-submenu-popup`]: {
        position: "absolute",
        zIndex: zIndexPopup,
        background: "transparent",
        boxShadow: "none",
        transformOrigin: "0 0",
        "ul,li": {
          listStyle: "none"
        },
        ul: {
          marginInline: "0.3em"
        }
      },
      [`${componentCls}, ${componentCls}-menu-submenu`]: {
        [menuCls]: _extends(_extends({
          padding: dropdownEdgeChildPadding,
          listStyleType: "none",
          backgroundColor: colorBgElevated,
          backgroundClip: "padding-box",
          borderRadius: token.borderRadiusLG,
          outline: "none",
          boxShadow: token.boxShadowSecondary
        }, genFocusStyle(token)), {
          [`${menuCls}-item-group-title`]: {
            padding: `${dropdownPaddingVertical}px ${controlPaddingHorizontal}px`,
            color: token.colorTextDescription,
            transition: `all ${motionDurationMid}`
          },
          // ======================= Item Content =======================
          [`${menuCls}-item`]: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            borderRadius: token.borderRadiusSM
          },
          [`${menuCls}-item-icon`]: {
            minWidth: fontSize,
            marginInlineEnd: token.marginXS,
            fontSize: token.fontSizeSM
          },
          [`${menuCls}-title-content`]: {
            flex: "auto",
            "> a": {
              color: "inherit",
              transition: `all ${motionDurationMid}`,
              "&:hover": {
                color: "inherit"
              },
              "&::after": {
                position: "absolute",
                inset: 0,
                content: '""'
              }
            }
          },
          // =========================== Item ===========================
          [`${menuCls}-item, ${menuCls}-submenu-title`]: _extends(_extends({
            clear: "both",
            margin: 0,
            padding: `${dropdownPaddingVertical}px ${controlPaddingHorizontal}px`,
            color: token.colorText,
            fontWeight: "normal",
            fontSize,
            lineHeight: token.lineHeight,
            cursor: "pointer",
            transition: `all ${motionDurationMid}`,
            [`&:hover, &-active`]: {
              backgroundColor: token.controlItemBgHover
            }
          }, genFocusStyle(token)), {
            "&-selected": {
              color: token.colorPrimary,
              backgroundColor: token.controlItemBgActive,
              "&:hover, &-active": {
                backgroundColor: token.controlItemBgActiveHover
              }
            },
            "&-disabled": {
              color: colorTextDisabled,
              cursor: "not-allowed",
              "&:hover": {
                color: colorTextDisabled,
                backgroundColor: colorBgElevated,
                cursor: "not-allowed"
              },
              a: {
                pointerEvents: "none"
              }
            },
            "&-divider": {
              height: 1,
              margin: `${token.marginXXS}px 0`,
              overflow: "hidden",
              lineHeight: 0,
              backgroundColor: token.colorSplit
            },
            [`${componentCls}-menu-submenu-expand-icon`]: {
              position: "absolute",
              insetInlineEnd: token.paddingXS,
              [`${componentCls}-menu-submenu-arrow-icon`]: {
                marginInlineEnd: "0 !important",
                color: token.colorTextDescription,
                fontSize: fontSizeIcon,
                fontStyle: "normal"
              }
            }
          }),
          [`${menuCls}-item-group-list`]: {
            margin: `0 ${token.marginXS}px`,
            padding: 0,
            listStyle: "none"
          },
          [`${menuCls}-submenu-title`]: {
            paddingInlineEnd: controlPaddingHorizontal + token.fontSizeSM
          },
          [`${menuCls}-submenu-vertical`]: {
            position: "relative"
          },
          [`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: {
            [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
              color: colorTextDisabled,
              backgroundColor: colorBgElevated,
              cursor: "not-allowed"
            }
          },
          // https://github.com/ant-design/ant-design/issues/19264
          [`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: {
            color: token.colorPrimary
          }
        })
      }
    },
    // Follow code may reuse in other components
    [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down"), initMoveMotion(token, "move-up"), initMoveMotion(token, "move-down"), initZoomMotion(token, "zoom-big")]
  ];
};
const useStyle$c = genComponentStyleHook("Dropdown", (token, _ref) => {
  let {
    rootPrefixCls
  } = _ref;
  const {
    marginXXS,
    sizePopupArrow,
    controlHeight,
    fontSize,
    lineHeight,
    paddingXXS,
    componentCls,
    borderRadiusOuter,
    borderRadiusLG
  } = token;
  const dropdownPaddingVertical = (controlHeight - fontSize * lineHeight) / 2;
  const {
    dropdownArrowOffset
  } = getArrowOffset({
    sizePopupArrow,
    contentRadius: borderRadiusLG,
    borderRadiusOuter
  });
  const dropdownToken = merge(token, {
    menuCls: `${componentCls}-menu`,
    rootPrefixCls,
    dropdownArrowDistance: sizePopupArrow / 2 + marginXXS,
    dropdownArrowOffset,
    dropdownPaddingVertical,
    dropdownEdgeChildPadding: paddingXXS
  });
  return [genBaseStyle$3(dropdownToken), genButtonStyle(dropdownToken), genStatusStyle(dropdownToken)];
}, (token) => ({
  zIndexPopup: token.zIndexPopupBase + 50
}));
var __rest$f = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ButtonGroup = Button.Group;
const DropdownButton = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ADropdownButton",
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps(dropdownButtonProps(), {
    trigger: "hover",
    placement: "bottomRight",
    type: "default"
  }),
  // emits: ['click', 'visibleChange', 'update:visible'],s
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const handleVisibleChange = (val) => {
      emit("update:visible", val);
      emit("visibleChange", val);
      emit("update:open", val);
      emit("openChange", val);
    };
    const {
      prefixCls,
      direction,
      getPopupContainer
    } = useConfigInject("dropdown", props);
    const buttonPrefixCls = computed(() => `${prefixCls.value}-button`);
    const [wrapSSR, hashId] = useStyle$c(prefixCls);
    return () => {
      var _a2, _b;
      const _c = _extends(_extends({}, props), attrs), {
        type = "default",
        disabled,
        danger,
        loading,
        htmlType,
        class: className = "",
        overlay = (_a2 = slots.overlay) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
        trigger,
        align,
        open,
        visible,
        onVisibleChange: _onVisibleChange,
        placement = direction.value === "rtl" ? "bottomLeft" : "bottomRight",
        href,
        title,
        icon = ((_b = slots.icon) === null || _b === void 0 ? void 0 : _b.call(slots)) || createVNode(EllipsisOutlined, null, null),
        mouseEnterDelay,
        mouseLeaveDelay,
        overlayClassName,
        overlayStyle,
        destroyPopupOnHide,
        onClick,
        "onUpdate:open": _updateVisible
      } = _c, restProps = __rest$f(_c, ["type", "disabled", "danger", "loading", "htmlType", "class", "overlay", "trigger", "align", "open", "visible", "onVisibleChange", "placement", "href", "title", "icon", "mouseEnterDelay", "mouseLeaveDelay", "overlayClassName", "overlayStyle", "destroyPopupOnHide", "onClick", "onUpdate:open"]);
      const dropdownProps2 = {
        align,
        disabled,
        trigger: disabled ? [] : trigger,
        placement,
        getPopupContainer: getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value,
        onOpenChange: handleVisibleChange,
        mouseEnterDelay,
        mouseLeaveDelay,
        open: open !== null && open !== void 0 ? open : visible,
        overlayClassName,
        overlayStyle,
        destroyPopupOnHide
      };
      const leftButton = createVNode(Button, {
        "danger": danger,
        "type": type,
        "disabled": disabled,
        "loading": loading,
        "onClick": onClick,
        "htmlType": htmlType,
        "href": href,
        "title": title
      }, {
        default: slots.default
      });
      const rightButton = createVNode(Button, {
        "danger": danger,
        "type": type,
        "icon": icon
      }, null);
      return wrapSSR(createVNode(ButtonGroup, _objectSpread2(_objectSpread2({}, restProps), {}, {
        "class": classNames(buttonPrefixCls.value, className, hashId.value)
      }), {
        default: () => [slots.leftButton ? slots.leftButton({
          button: leftButton
        }) : leftButton, createVNode(Dropdown, dropdownProps2, {
          default: () => [slots.rightButton ? slots.rightButton({
            button: rightButton
          }) : rightButton],
          overlay: () => overlay
        })]
      }));
    };
  }
});
const OverrideContextKey = Symbol("OverrideContextKey");
const useInjectOverride = () => {
  return inject(OverrideContextKey, void 0);
};
const useProvideOverride = (props) => {
  var _a2, _b, _c;
  const {
    prefixCls,
    mode,
    selectable,
    validator,
    onClick,
    expandIcon
  } = useInjectOverride() || {};
  provide(OverrideContextKey, {
    prefixCls: computed(() => {
      var _a3, _b2;
      return (_b2 = (_a3 = props.prefixCls) === null || _a3 === void 0 ? void 0 : _a3.value) !== null && _b2 !== void 0 ? _b2 : prefixCls === null || prefixCls === void 0 ? void 0 : prefixCls.value;
    }),
    mode: computed(() => {
      var _a3, _b2;
      return (_b2 = (_a3 = props.mode) === null || _a3 === void 0 ? void 0 : _a3.value) !== null && _b2 !== void 0 ? _b2 : mode === null || mode === void 0 ? void 0 : mode.value;
    }),
    selectable: computed(() => {
      var _a3, _b2;
      return (_b2 = (_a3 = props.selectable) === null || _a3 === void 0 ? void 0 : _a3.value) !== null && _b2 !== void 0 ? _b2 : selectable === null || selectable === void 0 ? void 0 : selectable.value;
    }),
    validator: (_a2 = props.validator) !== null && _a2 !== void 0 ? _a2 : validator,
    onClick: (_b = props.onClick) !== null && _b !== void 0 ? _b : onClick,
    expandIcon: (_c = props.expandIcon) !== null && _c !== void 0 ? _c : expandIcon === null || expandIcon === void 0 ? void 0 : expandIcon.value
  });
};
const Dropdown = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ADropdown",
  inheritAttrs: false,
  props: initDefaultProps(dropdownProps(), {
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: "bottomLeft",
    trigger: "hover"
  }),
  // emits: ['visibleChange', 'update:visible'],
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const {
      prefixCls,
      rootPrefixCls,
      direction,
      getPopupContainer
    } = useConfigInject("dropdown", props);
    const [wrapSSR, hashId] = useStyle$c(prefixCls);
    const transitionName2 = computed(() => {
      const {
        placement: placement2 = "",
        transitionName: transitionName22
      } = props;
      if (transitionName22 !== void 0) {
        return transitionName22;
      }
      if (placement2.includes("top")) {
        return `${rootPrefixCls.value}-slide-down`;
      }
      return `${rootPrefixCls.value}-slide-up`;
    });
    useProvideOverride({
      prefixCls: computed(() => `${prefixCls.value}-menu`),
      expandIcon: computed(() => {
        return createVNode("span", {
          "class": `${prefixCls.value}-menu-submenu-arrow`
        }, [createVNode(RightOutlined, {
          "class": `${prefixCls.value}-menu-submenu-arrow-icon`
        }, null)]);
      }),
      mode: computed(() => "vertical"),
      selectable: computed(() => false),
      onClick: () => {
      },
      validator: (_ref3) => {
        let {
          mode
        } = _ref3;
      }
    });
    const renderOverlay = () => {
      var _a2, _b, _c;
      const overlay = props.overlay || ((_a2 = slots.overlay) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
      const overlayNode = Array.isArray(overlay) ? overlay[0] : overlay;
      if (!overlayNode) return null;
      const overlayProps = overlayNode.props || {};
      devWarning(!overlayProps.mode || overlayProps.mode === "vertical", "Dropdown", `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`);
      const {
        selectable = false,
        expandIcon = (_c = (_b = overlayNode.children) === null || _b === void 0 ? void 0 : _b.expandIcon) === null || _c === void 0 ? void 0 : _c.call(_b)
      } = overlayProps;
      const overlayNodeExpandIcon = typeof expandIcon !== "undefined" && isValidElement(expandIcon) ? expandIcon : createVNode("span", {
        "class": `${prefixCls.value}-menu-submenu-arrow`
      }, [createVNode(RightOutlined, {
        "class": `${prefixCls.value}-menu-submenu-arrow-icon`
      }, null)]);
      const fixedModeOverlay = isValidElement(overlayNode) ? cloneElement(overlayNode, {
        mode: "vertical",
        selectable,
        expandIcon: () => overlayNodeExpandIcon
      }) : overlayNode;
      return fixedModeOverlay;
    };
    const placement = computed(() => {
      const placement2 = props.placement;
      if (!placement2) {
        return direction.value === "rtl" ? "bottomRight" : "bottomLeft";
      }
      if (placement2.includes("Center")) {
        const newPlacement = placement2.slice(0, placement2.indexOf("Center"));
        devWarning(!placement2.includes("Center"), "Dropdown", `You are using '${placement2}' placement in Dropdown, which is deprecated. Try to use '${newPlacement}' instead.`);
        return newPlacement;
      }
      return placement2;
    });
    const mergedVisible = computed(() => {
      return typeof props.visible === "boolean" ? props.visible : props.open;
    });
    const handleVisibleChange = (val) => {
      emit("update:visible", val);
      emit("visibleChange", val);
      emit("update:open", val);
      emit("openChange", val);
    };
    return () => {
      var _a2, _b;
      const {
        arrow,
        trigger,
        disabled,
        overlayClassName
      } = props;
      const child = (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)[0];
      const dropdownTrigger = cloneElement(child, _extends({
        class: classNames((_b = child === null || child === void 0 ? void 0 : child.props) === null || _b === void 0 ? void 0 : _b.class, {
          [`${prefixCls.value}-rtl`]: direction.value === "rtl"
        }, `${prefixCls.value}-trigger`)
      }, disabled ? {
        disabled
      } : {}));
      const overlayClassNameCustomized = classNames(overlayClassName, hashId.value, {
        [`${prefixCls.value}-rtl`]: direction.value === "rtl"
      });
      const triggerActions = disabled ? [] : trigger;
      let alignPoint2;
      if (triggerActions && triggerActions.includes("contextmenu")) {
        alignPoint2 = true;
      }
      const builtinPlacements = getPlacements({
        arrowPointAtCenter: typeof arrow === "object" && arrow.pointAtCenter,
        autoAdjustOverflow: true
      });
      const dropdownProps2 = omit(_extends(_extends(_extends({}, props), attrs), {
        visible: mergedVisible.value,
        builtinPlacements,
        overlayClassName: overlayClassNameCustomized,
        arrow: !!arrow,
        alignPoint: alignPoint2,
        prefixCls: prefixCls.value,
        getPopupContainer: getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value,
        transitionName: transitionName2.value,
        trigger: triggerActions,
        onVisibleChange: handleVisibleChange,
        placement: placement.value
      }), ["overlay", "onUpdate:visible"]);
      return wrapSSR(createVNode(Dropdown$1, dropdownProps2, {
        default: () => [dropdownTrigger],
        overlay: renderOverlay
      }));
    };
  }
});
Dropdown.Button = DropdownButton;
function shallowEqual(objA, objB, compare, compareContext) {
  let ret = void 0;
  if (ret !== void 0) {
    return !!ret;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let idx = 0; idx < keysA.length; idx++) {
    const key2 = keysA[idx];
    if (!bHasOwnProperty(key2)) {
      return false;
    }
    const valueA = objA[key2];
    const valueB = objB[key2];
    ret = void 0;
    if (ret === false || ret === void 0 && valueA !== valueB) {
      return false;
    }
  }
  return true;
}
function shallowequal(value, other) {
  return shallowEqual(toRaw(value), toRaw(other));
}
const MenuContextKey = Symbol("menuContextKey");
const useProvideMenu = (props) => {
  provide(MenuContextKey, props);
};
const useInjectMenu = () => {
  return inject(MenuContextKey);
};
const ForceRenderKey = Symbol("ForceRenderKey");
const useProvideForceRender = (forceRender) => {
  provide(ForceRenderKey, forceRender);
};
const useInjectForceRender = () => {
  return inject(ForceRenderKey, false);
};
const MenuFirstLevelContextKey = Symbol("menuFirstLevelContextKey");
const useProvideFirstLevel = (firstLevel) => {
  provide(MenuFirstLevelContextKey, firstLevel);
};
const useInjectFirstLevel = () => {
  return inject(MenuFirstLevelContextKey, true);
};
const MenuContextProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "MenuContextProvider",
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: void 0
    },
    overflowDisabled: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const menuContext = useInjectMenu();
    const newContext = _extends({}, menuContext);
    if (props.mode !== void 0) {
      newContext.mode = toRef(props, "mode");
    }
    if (props.overflowDisabled !== void 0) {
      newContext.overflowDisabled = toRef(props, "overflowDisabled");
    }
    useProvideMenu(newContext);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
const SiderCollapsedKey = Symbol("siderCollapsed");
const SiderHookProviderKey = Symbol("siderHookProvider");
const OVERFLOW_KEY = "$$__vc-menu-more__key";
const KeyPathContext = Symbol("KeyPathContext");
const useInjectKeyPath = () => {
  return inject(KeyPathContext, {
    parentEventKeys: computed(() => []),
    parentKeys: computed(() => []),
    parentInfo: {}
  });
};
const useProvideKeyPath = (eventKey, key2, menuInfo) => {
  const {
    parentEventKeys,
    parentKeys
  } = useInjectKeyPath();
  const eventKeys = computed(() => [...parentEventKeys.value, eventKey]);
  const keys = computed(() => [...parentKeys.value, key2]);
  provide(KeyPathContext, {
    parentEventKeys: eventKeys,
    parentKeys: keys,
    parentInfo: menuInfo
  });
  return keys;
};
const measure = Symbol("measure");
const PathContext = defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup(_props, _ref) {
    let {
      slots
    } = _ref;
    provide(measure, true);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
const useMeasure = () => {
  return inject(measure, false);
};
function useDirectionStyle(level) {
  const {
    mode,
    rtl: rtl2,
    inlineIndent
  } = useInjectMenu();
  return computed(() => mode.value !== "inline" ? null : rtl2.value ? {
    paddingRight: `${level.value * inlineIndent.value}px`
  } : {
    paddingLeft: `${level.value * inlineIndent.value}px`
  });
}
let indexGuid$1 = 0;
const menuItemProps = () => ({
  id: String,
  role: String,
  disabled: Boolean,
  danger: Boolean,
  title: {
    type: [String, Boolean],
    default: void 0
  },
  icon: PropTypes.any,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  // Internal user prop
  originItemValue: objectType()
});
const __unplugin_components_1$1 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenuItem",
  inheritAttrs: false,
  props: menuItemProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const instance = getCurrentInstance();
    const isMeasure = useMeasure();
    const key2 = typeof instance.vnode.key === "symbol" ? String(instance.vnode.key) : instance.vnode.key;
    devWarning(typeof instance.vnode.key !== "symbol", "MenuItem", `MenuItem \`:key="${String(key2)}"\` not support Symbol type`);
    const eventKey = `menu_item_${++indexGuid$1}_$$_${key2}`;
    const {
      parentEventKeys,
      parentKeys
    } = useInjectKeyPath();
    const {
      prefixCls,
      activeKeys,
      disabled,
      changeActiveKeys,
      rtl: rtl2,
      inlineCollapsed,
      siderCollapsed,
      onItemClick,
      selectedKeys,
      registerMenuInfo,
      unRegisterMenuInfo
    } = useInjectMenu();
    const firstLevel = useInjectFirstLevel();
    const isActive = shallowRef(false);
    const keysPath = computed(() => {
      return [...parentKeys.value, key2];
    });
    const menuInfo = {
      eventKey,
      key: key2,
      parentEventKeys,
      parentKeys,
      isLeaf: true
    };
    registerMenuInfo(eventKey, menuInfo);
    onBeforeUnmount(() => {
      unRegisterMenuInfo(eventKey);
    });
    watch(activeKeys, () => {
      isActive.value = !!activeKeys.value.find((val) => val === key2);
    }, {
      immediate: true
    });
    const mergedDisabled = computed(() => disabled.value || props.disabled);
    const selected = computed(() => selectedKeys.value.includes(key2));
    const classNames2 = computed(() => {
      const itemCls = `${prefixCls.value}-item`;
      return {
        [`${itemCls}`]: true,
        [`${itemCls}-danger`]: props.danger,
        [`${itemCls}-active`]: isActive.value,
        [`${itemCls}-selected`]: selected.value,
        [`${itemCls}-disabled`]: mergedDisabled.value
      };
    });
    const getEventInfo = (e) => {
      return {
        key: key2,
        eventKey,
        keyPath: keysPath.value,
        eventKeyPath: [...parentEventKeys.value, eventKey],
        domEvent: e,
        item: _extends(_extends({}, props), attrs)
      };
    };
    const onInternalClick = (e) => {
      if (mergedDisabled.value) {
        return;
      }
      const info = getEventInfo(e);
      emit("click", e);
      onItemClick(info);
    };
    const onMouseEnter = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys(keysPath.value);
        emit("mouseenter", event);
      }
    };
    const onMouseLeave = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys([]);
        emit("mouseleave", event);
      }
    };
    const onInternalKeyDown = (e) => {
      emit("keydown", e);
      if (e.which === KeyCode.ENTER) {
        const info = getEventInfo(e);
        emit("click", e);
        onItemClick(info);
      }
    };
    const onInternalFocus = (e) => {
      changeActiveKeys(keysPath.value);
      emit("focus", e);
    };
    const renderItemChildren = (icon, children) => {
      const wrapNode = createVNode("span", {
        "class": `${prefixCls.value}-title-content`
      }, [children]);
      if (!icon || isValidElement(children) && children.type === "span") {
        if (children && inlineCollapsed.value && firstLevel && typeof children === "string") {
          return createVNode("div", {
            "class": `${prefixCls.value}-inline-collapsed-noicon`
          }, [children.charAt(0)]);
        }
      }
      return wrapNode;
    };
    const directionStyle = useDirectionStyle(computed(() => keysPath.value.length));
    return () => {
      var _a2, _b, _c, _d, _e;
      if (isMeasure) return null;
      const title = (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots);
      const children = flattenChildren((_c = slots.default) === null || _c === void 0 ? void 0 : _c.call(slots));
      const childrenLength = children.length;
      let tooltipTitle = title;
      if (typeof title === "undefined") {
        tooltipTitle = firstLevel && childrenLength ? children : "";
      } else if (title === false) {
        tooltipTitle = "";
      }
      const tooltipProps2 = {
        title: tooltipTitle
      };
      if (!siderCollapsed.value && !inlineCollapsed.value) {
        tooltipProps2.title = null;
        tooltipProps2.open = false;
      }
      const optionRoleProps = {};
      if (props.role === "option") {
        optionRoleProps["aria-selected"] = selected.value;
      }
      const icon = (_d = props.icon) !== null && _d !== void 0 ? _d : (_e = slots.icon) === null || _e === void 0 ? void 0 : _e.call(slots, props);
      return createVNode(Tooltip, _objectSpread2(_objectSpread2({}, tooltipProps2), {}, {
        "placement": rtl2.value ? "left" : "right",
        "overlayClassName": `${prefixCls.value}-inline-collapsed-tooltip`
      }), {
        default: () => [createVNode(Overflow.Item, _objectSpread2(_objectSpread2(_objectSpread2({
          "component": "li"
        }, attrs), {}, {
          "id": props.id,
          "style": _extends(_extends({}, attrs.style || {}), directionStyle.value),
          "class": [classNames2.value, {
            [`${attrs.class}`]: !!attrs.class,
            [`${prefixCls.value}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
          }],
          "role": props.role || "menuitem",
          "tabindex": props.disabled ? null : -1,
          "data-menu-id": key2,
          "aria-disabled": props.disabled
        }, optionRoleProps), {}, {
          "onMouseenter": onMouseEnter,
          "onMouseleave": onMouseLeave,
          "onClick": onInternalClick,
          "onKeydown": onInternalKeyDown,
          "onFocus": onInternalFocus,
          "title": typeof title === "string" ? title : void 0
        }), {
          default: () => [cloneElement(typeof icon === "function" ? icon(props.originItemValue) : icon, {
            class: `${prefixCls.value}-item-icon`
          }, false), renderItemChildren(icon, children)]
        })]
      });
    };
  }
});
const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
const placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};
const placementsRtl = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  rightTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  leftTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};
const popupPlacementMap = {
  horizontal: "bottomLeft",
  vertical: "rightTop",
  "vertical-left": "rightTop",
  "vertical-right": "leftTop"
};
const PopupTrigger = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PopupTrigger",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    mode: String,
    visible: Boolean,
    // popup: React.ReactNode;
    popupClassName: String,
    popupOffset: Array,
    disabled: Boolean,
    onVisibleChange: Function
  },
  slots: Object,
  emits: ["visibleChange"],
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const innerVisible = shallowRef(false);
    const {
      getPopupContainer,
      rtl: rtl2,
      subMenuOpenDelay,
      subMenuCloseDelay,
      builtinPlacements,
      triggerSubMenuAction,
      forceSubMenuRender,
      motion,
      defaultMotions,
      rootClassName
    } = useInjectMenu();
    const forceRender = useInjectForceRender();
    const placement = computed(() => rtl2.value ? _extends(_extends({}, placementsRtl), builtinPlacements.value) : _extends(_extends({}, placements), builtinPlacements.value));
    const popupPlacement = computed(() => popupPlacementMap[props.mode]);
    const visibleRef = shallowRef();
    watch(() => props.visible, (visible) => {
      wrapperRaf.cancel(visibleRef.value);
      visibleRef.value = wrapperRaf(() => {
        innerVisible.value = visible;
      });
    }, {
      immediate: true
    });
    onBeforeUnmount(() => {
      wrapperRaf.cancel(visibleRef.value);
    });
    const onVisibleChange = (visible) => {
      emit("visibleChange", visible);
    };
    const mergedMotion = computed(() => {
      var _a2, _b;
      const m = motion.value || ((_a2 = defaultMotions.value) === null || _a2 === void 0 ? void 0 : _a2[props.mode]) || ((_b = defaultMotions.value) === null || _b === void 0 ? void 0 : _b.other);
      const res = typeof m === "function" ? m() : m;
      return res ? getTransitionProps(res.name, {
        css: true
      }) : void 0;
    });
    return () => {
      const {
        prefixCls,
        popupClassName,
        mode,
        popupOffset,
        disabled
      } = props;
      return createVNode(Trigger, {
        "prefixCls": prefixCls,
        "popupClassName": classNames(`${prefixCls}-popup`, {
          [`${prefixCls}-rtl`]: rtl2.value
        }, popupClassName, rootClassName.value),
        "stretch": mode === "horizontal" ? "minWidth" : null,
        "getPopupContainer": getPopupContainer.value,
        "builtinPlacements": placement.value,
        "popupPlacement": popupPlacement.value,
        "popupVisible": innerVisible.value,
        "popupAlign": popupOffset && {
          offset: popupOffset
        },
        "action": disabled ? [] : [triggerSubMenuAction.value],
        "mouseEnterDelay": subMenuOpenDelay.value,
        "mouseLeaveDelay": subMenuCloseDelay.value,
        "onPopupVisibleChange": onVisibleChange,
        "forceRender": forceRender || forceSubMenuRender.value,
        "popupAnimation": mergedMotion.value
      }, {
        popup: slots.popup,
        default: slots.default
      });
    };
  }
});
const InternalSubMenuList = (_props, _ref) => {
  let {
    slots,
    attrs
  } = _ref;
  var _a2;
  const {
    prefixCls,
    mode
  } = useInjectMenu();
  return createVNode("ul", _objectSpread2(_objectSpread2({}, attrs), {}, {
    "class": classNames(prefixCls.value, `${prefixCls.value}-sub`, `${prefixCls.value}-${mode.value === "inline" ? "inline" : "vertical"}`),
    "data-menu-list": true
  }), [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
};
InternalSubMenuList.displayName = "SubMenuList";
const InlineSubMenuList = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "InlineSubMenuList",
  inheritAttrs: false,
  props: {
    id: String,
    open: Boolean,
    keyPath: Array
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const fixedMode = computed(() => "inline");
    const {
      motion,
      mode,
      defaultMotions
    } = useInjectMenu();
    const sameModeRef = computed(() => mode.value === fixedMode.value);
    const destroy = ref(!sameModeRef.value);
    const mergedOpen = computed(() => sameModeRef.value ? props.open : false);
    watch(mode, () => {
      if (sameModeRef.value) {
        destroy.value = false;
      }
    }, {
      flush: "post"
    });
    const mergedMotion = computed(() => {
      var _a2, _b;
      const m = motion.value || ((_a2 = defaultMotions.value) === null || _a2 === void 0 ? void 0 : _a2[fixedMode.value]) || ((_b = defaultMotions.value) === null || _b === void 0 ? void 0 : _b.other);
      const res = typeof m === "function" ? m() : m;
      return _extends(_extends({}, res), {
        appear: props.keyPath.length <= 1
      });
    });
    return () => {
      var _a2;
      if (destroy.value) {
        return null;
      }
      return createVNode(MenuContextProvider, {
        "mode": fixedMode.value
      }, {
        default: () => [createVNode(Transition, mergedMotion.value, {
          default: () => [withDirectives(createVNode(InternalSubMenuList, {
            "id": props.id
          }, {
            default: () => [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]
          }), [[vShow, mergedOpen.value]])]
        })]
      });
    };
  }
});
let indexGuid = 0;
const subMenuProps = () => ({
  icon: PropTypes.any,
  title: PropTypes.any,
  disabled: Boolean,
  level: Number,
  popupClassName: String,
  popupOffset: Array,
  internalPopupClose: Boolean,
  eventKey: String,
  expandIcon: Function,
  theme: String,
  onMouseenter: Function,
  onMouseleave: Function,
  onTitleClick: Function,
  // Internal user prop
  originItemValue: objectType()
});
const SubMenu = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ASubMenu",
  inheritAttrs: false,
  props: subMenuProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    var _a2, _b;
    useProvideFirstLevel(false);
    const isMeasure = useMeasure();
    const instance = getCurrentInstance();
    const vnodeKey = typeof instance.vnode.key === "symbol" ? String(instance.vnode.key) : instance.vnode.key;
    devWarning(typeof instance.vnode.key !== "symbol", "SubMenu", `SubMenu \`:key="${String(vnodeKey)}"\` not support Symbol type`);
    const key2 = isValid(vnodeKey) ? vnodeKey : `sub_menu_${++indexGuid}_$$_not_set_key`;
    const eventKey = (_a2 = props.eventKey) !== null && _a2 !== void 0 ? _a2 : isValid(vnodeKey) ? `sub_menu_${++indexGuid}_$$_${vnodeKey}` : key2;
    const {
      parentEventKeys,
      parentInfo,
      parentKeys
    } = useInjectKeyPath();
    const keysPath = computed(() => [...parentKeys.value, key2]);
    const childrenEventKeys = shallowRef([]);
    const menuInfo = {
      eventKey,
      key: key2,
      parentEventKeys,
      childrenEventKeys,
      parentKeys
    };
    (_b = parentInfo.childrenEventKeys) === null || _b === void 0 ? void 0 : _b.value.push(eventKey);
    onBeforeUnmount(() => {
      var _a3;
      if (parentInfo.childrenEventKeys) {
        parentInfo.childrenEventKeys.value = (_a3 = parentInfo.childrenEventKeys) === null || _a3 === void 0 ? void 0 : _a3.value.filter((k) => k != eventKey);
      }
    });
    useProvideKeyPath(eventKey, key2, menuInfo);
    const {
      prefixCls,
      activeKeys,
      disabled: contextDisabled,
      changeActiveKeys,
      mode,
      inlineCollapsed,
      openKeys,
      overflowDisabled,
      onOpenChange,
      registerMenuInfo,
      unRegisterMenuInfo,
      selectedSubMenuKeys,
      expandIcon: menuExpandIcon,
      theme
    } = useInjectMenu();
    const hasKey = vnodeKey !== void 0 && vnodeKey !== null;
    const forceRender = !isMeasure && (useInjectForceRender() || !hasKey);
    useProvideForceRender(forceRender);
    if (isMeasure && hasKey || !isMeasure && !hasKey || forceRender) {
      registerMenuInfo(eventKey, menuInfo);
      onBeforeUnmount(() => {
        unRegisterMenuInfo(eventKey);
      });
    }
    const subMenuPrefixCls = computed(() => `${prefixCls.value}-submenu`);
    const mergedDisabled = computed(() => contextDisabled.value || props.disabled);
    const elementRef = shallowRef();
    const popupRef = shallowRef();
    const originOpen = computed(() => openKeys.value.includes(key2));
    const open = computed(() => !overflowDisabled.value && originOpen.value);
    const childrenSelected = computed(() => {
      return selectedSubMenuKeys.value.includes(key2);
    });
    const isActive = shallowRef(false);
    watch(activeKeys, () => {
      isActive.value = !!activeKeys.value.find((val) => val === key2);
    }, {
      immediate: true
    });
    const onInternalTitleClick = (e) => {
      if (mergedDisabled.value) {
        return;
      }
      emit("titleClick", e, key2);
      if (mode.value === "inline") {
        onOpenChange(key2, !originOpen.value);
      }
    };
    const onMouseEnter = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys(keysPath.value);
        emit("mouseenter", event);
      }
    };
    const onMouseLeave = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys([]);
        emit("mouseleave", event);
      }
    };
    const directionStyle = useDirectionStyle(computed(() => keysPath.value.length));
    const onPopupVisibleChange = (newVisible) => {
      if (mode.value !== "inline") {
        onOpenChange(key2, newVisible);
      }
    };
    const onInternalFocus = () => {
      changeActiveKeys(keysPath.value);
    };
    const popupId = eventKey && `${eventKey}-popup`;
    const popupClassName = computed(() => classNames(prefixCls.value, `${prefixCls.value}-${props.theme || theme.value}`, props.popupClassName));
    const renderTitle = (title, icon) => {
      if (!icon) {
        return inlineCollapsed.value && !parentKeys.value.length && title && typeof title === "string" ? createVNode("div", {
          "class": `${prefixCls.value}-inline-collapsed-noicon`
        }, [title.charAt(0)]) : createVNode("span", {
          "class": `${prefixCls.value}-title-content`
        }, [title]);
      }
      const titleIsSpan = isValidElement(title) && title.type === "span";
      return createVNode(Fragment, null, [cloneElement(typeof icon === "function" ? icon(props.originItemValue) : icon, {
        class: `${prefixCls.value}-item-icon`
      }, false), titleIsSpan ? title : createVNode("span", {
        "class": `${prefixCls.value}-title-content`
      }, [title])]);
    };
    const triggerModeRef = computed(() => {
      return mode.value !== "inline" && keysPath.value.length > 1 ? "vertical" : mode.value;
    });
    const renderMode = computed(() => mode.value === "horizontal" ? "vertical" : mode.value);
    const subMenuTriggerModeRef = computed(() => triggerModeRef.value === "horizontal" ? "vertical" : triggerModeRef.value);
    const baseTitleNode = () => {
      var _a3, _b2;
      const subMenuPrefixClsValue = subMenuPrefixCls.value;
      const icon = (_a3 = props.icon) !== null && _a3 !== void 0 ? _a3 : (_b2 = slots.icon) === null || _b2 === void 0 ? void 0 : _b2.call(slots, props);
      const expandIcon = props.expandIcon || slots.expandIcon || menuExpandIcon.value;
      const title = renderTitle(getPropsSlot(slots, props, "title"), icon);
      return createVNode("div", {
        "style": directionStyle.value,
        "class": `${subMenuPrefixClsValue}-title`,
        "tabindex": mergedDisabled.value ? null : -1,
        "ref": elementRef,
        "title": typeof title === "string" ? title : null,
        "data-menu-id": key2,
        "aria-expanded": open.value,
        "aria-haspopup": true,
        "aria-controls": popupId,
        "aria-disabled": mergedDisabled.value,
        "onClick": onInternalTitleClick,
        "onFocus": onInternalFocus
      }, [title, mode.value !== "horizontal" && expandIcon ? expandIcon(_extends(_extends({}, props), {
        isOpen: open.value
      })) : createVNode("i", {
        "class": `${subMenuPrefixClsValue}-arrow`
      }, null)]);
    };
    return () => {
      var _a3;
      if (isMeasure) {
        if (!hasKey) {
          return null;
        }
        return (_a3 = slots.default) === null || _a3 === void 0 ? void 0 : _a3.call(slots);
      }
      const subMenuPrefixClsValue = subMenuPrefixCls.value;
      let titleNode = () => null;
      if (!overflowDisabled.value && mode.value !== "inline") {
        const popupOffset = mode.value === "horizontal" ? [0, 8] : [10, 0];
        titleNode = () => createVNode(PopupTrigger, {
          "mode": triggerModeRef.value,
          "prefixCls": subMenuPrefixClsValue,
          "visible": !props.internalPopupClose && open.value,
          "popupClassName": popupClassName.value,
          "popupOffset": props.popupOffset || popupOffset,
          "disabled": mergedDisabled.value,
          "onVisibleChange": onPopupVisibleChange
        }, {
          default: () => [baseTitleNode()],
          popup: () => createVNode(MenuContextProvider, {
            "mode": subMenuTriggerModeRef.value
          }, {
            default: () => [createVNode(InternalSubMenuList, {
              "id": popupId,
              "ref": popupRef
            }, {
              default: slots.default
            })]
          })
        });
      } else {
        titleNode = () => createVNode(PopupTrigger, null, {
          default: baseTitleNode
        });
      }
      return createVNode(MenuContextProvider, {
        "mode": renderMode.value
      }, {
        default: () => [createVNode(Overflow.Item, _objectSpread2(_objectSpread2({
          "component": "li"
        }, attrs), {}, {
          "role": "none",
          "class": classNames(subMenuPrefixClsValue, `${subMenuPrefixClsValue}-${mode.value}`, attrs.class, {
            [`${subMenuPrefixClsValue}-open`]: open.value,
            [`${subMenuPrefixClsValue}-active`]: isActive.value,
            [`${subMenuPrefixClsValue}-selected`]: childrenSelected.value,
            [`${subMenuPrefixClsValue}-disabled`]: mergedDisabled.value
          }),
          "onMouseenter": onMouseEnter,
          "onMouseleave": onMouseLeave,
          "data-submenu-id": key2
        }), {
          default: () => {
            return createVNode(Fragment, null, [titleNode(), !overflowDisabled.value && createVNode(InlineSubMenuList, {
              "id": popupId,
              "open": open.value,
              "keyPath": keysPath.value
            }, {
              default: slots.default
            })]);
          }
        })]
      });
    };
  }
});
function hasClass(node, className) {
  if (node.classList) {
    return node.classList.contains(className);
  }
  const originClass = node.className;
  return ` ${originClass} `.indexOf(` ${className} `) > -1;
}
function addClass(node, className) {
  if (node.classList) {
    node.classList.add(className);
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`;
    }
  }
}
function removeClass(node, className) {
  if (node.classList) {
    node.classList.remove(className);
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className;
      node.className = ` ${originClass} `.replace(` ${className} `, " ");
    }
  }
}
const collapseMotion = function() {
  let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "ant-motion-collapse";
  let appear = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  return {
    name,
    appear,
    css: true,
    onBeforeEnter: (node) => {
      node.style.height = "0px";
      node.style.opacity = "0";
      addClass(node, name);
    },
    onEnter: (node) => {
      nextTick(() => {
        node.style.height = `${node.scrollHeight}px`;
        node.style.opacity = "1";
      });
    },
    onAfterEnter: (node) => {
      if (node) {
        removeClass(node, name);
        node.style.height = null;
        node.style.opacity = null;
      }
    },
    onBeforeLeave: (node) => {
      addClass(node, name);
      node.style.height = `${node.offsetHeight}px`;
      node.style.opacity = null;
    },
    onLeave: (node) => {
      setTimeout(() => {
        node.style.height = "0px";
        node.style.opacity = "0";
      });
    },
    onAfterLeave: (node) => {
      if (node) {
        removeClass(node, name);
        if (node.style) {
          node.style.height = null;
          node.style.opacity = null;
        }
      }
    }
  };
};
const menuItemGroupProps = () => ({
  title: PropTypes.any,
  // Internal user prop
  originItemValue: objectType()
});
const ItemGroup = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenuItemGroup",
  inheritAttrs: false,
  props: menuItemGroupProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls
    } = useInjectMenu();
    const groupPrefixCls = computed(() => `${prefixCls.value}-item-group`);
    const isMeasure = useMeasure();
    return () => {
      var _a2, _b;
      if (isMeasure) return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      return createVNode("li", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "onClick": (e) => e.stopPropagation(),
        "class": groupPrefixCls.value
      }), [createVNode("div", {
        "title": typeof props.title === "string" ? props.title : void 0,
        "class": `${groupPrefixCls.value}-title`
      }, [getPropsSlot(slots, props, "title")]), createVNode("ul", {
        "class": `${groupPrefixCls.value}-list`
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)])]);
    };
  }
});
const menuDividerProps = () => ({
  prefixCls: String,
  dashed: Boolean
});
const Divider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenuDivider",
  props: menuDividerProps(),
  setup(props) {
    const {
      prefixCls
    } = useInjectMenu();
    const cls = computed(() => {
      return {
        [`${prefixCls.value}-item-divider`]: true,
        [`${prefixCls.value}-item-divider-dashed`]: !!props.dashed
      };
    });
    return () => {
      return createVNode("li", {
        "class": cls.value
      }, null);
    };
  }
});
var __rest$e = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function convertItemsToNodes(list, store, parentMenuInfo) {
  return (list || []).map((opt, index2) => {
    if (opt && typeof opt === "object") {
      const _a2 = opt, {
        label,
        children,
        key: key2,
        type
      } = _a2, restProps = __rest$e(_a2, ["label", "children", "key", "type"]);
      const mergedKey = key2 !== null && key2 !== void 0 ? key2 : `tmp-${index2}`;
      const parentKeys = parentMenuInfo ? parentMenuInfo.parentKeys.slice() : [];
      const childrenEventKeys = [];
      const menuInfo = {
        eventKey: mergedKey,
        key: mergedKey,
        parentEventKeys: ref(parentKeys),
        parentKeys: ref(parentKeys),
        childrenEventKeys: ref(childrenEventKeys),
        isLeaf: false
      };
      if (children || type === "group") {
        if (type === "group") {
          const childrenNodes2 = convertItemsToNodes(children, store, parentMenuInfo);
          return createVNode(ItemGroup, _objectSpread2(_objectSpread2({
            "key": mergedKey
          }, restProps), {}, {
            "title": label,
            "originItemValue": opt
          }), {
            default: () => [childrenNodes2]
          });
        }
        store.set(mergedKey, menuInfo);
        if (parentMenuInfo) {
          parentMenuInfo.childrenEventKeys.push(mergedKey);
        }
        const childrenNodes = convertItemsToNodes(children, store, {
          childrenEventKeys,
          parentKeys: [].concat(parentKeys, mergedKey)
        });
        return createVNode(SubMenu, _objectSpread2(_objectSpread2({
          "key": mergedKey
        }, restProps), {}, {
          "title": label,
          "originItemValue": opt
        }), {
          default: () => [childrenNodes]
        });
      }
      if (type === "divider") {
        return createVNode(Divider, _objectSpread2({
          "key": mergedKey
        }, restProps), null);
      }
      menuInfo.isLeaf = true;
      store.set(mergedKey, menuInfo);
      return createVNode(__unplugin_components_1$1, _objectSpread2(_objectSpread2({
        "key": mergedKey
      }, restProps), {}, {
        "originItemValue": opt
      }), {
        default: () => [label]
      });
    }
    return null;
  }).filter((opt) => opt);
}
function useItems(props) {
  const itemsNodes = shallowRef([]);
  const hasItmes = shallowRef(false);
  const store = shallowRef(/* @__PURE__ */ new Map());
  watch(() => props.items, () => {
    const newStore = /* @__PURE__ */ new Map();
    hasItmes.value = false;
    if (props.items) {
      hasItmes.value = true;
      itemsNodes.value = convertItemsToNodes(props.items, newStore);
    } else {
      itemsNodes.value = void 0;
    }
    store.value = newStore;
  }, {
    immediate: true,
    deep: true
  });
  return {
    itemsNodes,
    store,
    hasItmes
  };
}
const getHorizontalStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    menuHorizontalHeight,
    colorSplit,
    lineWidth,
    lineType,
    menuItemPaddingInline
  } = token;
  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: `${menuHorizontalHeight}px`,
      border: 0,
      borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      boxShadow: "none",
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        content: '"\\20"'
      },
      // ======================= Item =======================
      [`${componentCls}-item, ${componentCls}-submenu`]: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        paddingInline: menuItemPaddingInline
      },
      [`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: {
        backgroundColor: "transparent"
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`].join(",")
      },
      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: "none"
      }
    }
  };
};
const getRTLStyle = (_ref) => {
  let {
    componentCls,
    menuArrowOffset
  } = _ref;
  return {
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-submenu-rtl`]: {
      transformOrigin: "100% 0"
    },
    // Vertical Arrow
    [`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: {
      [`${componentCls}-submenu-arrow`]: {
        "&::before": {
          transform: `rotate(-45deg) translateY(-${menuArrowOffset})`
        },
        "&::after": {
          transform: `rotate(45deg) translateY(${menuArrowOffset})`
        }
      }
    }
  };
};
const accessibilityFocus = (token) => _extends({}, genFocusOutline(token));
const getThemeStyle = (token, themeSuffix) => {
  const {
    componentCls,
    colorItemText,
    colorItemTextSelected,
    colorGroupTitle,
    colorItemBg,
    colorSubItemBg,
    colorItemBgSelected,
    colorActiveBarHeight,
    colorActiveBarWidth,
    colorActiveBarBorderSize,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    menuItemPaddingInline,
    motionDurationMid,
    colorItemTextHover,
    lineType,
    colorSplit,
    // Disabled
    colorItemTextDisabled,
    // Danger
    colorDangerItemText,
    colorDangerItemTextHover,
    colorDangerItemTextSelected,
    colorDangerItemBgActive,
    colorDangerItemBgSelected,
    colorItemBgHover,
    menuSubMenuBg,
    // Horizontal
    colorItemTextSelectedHorizontal,
    colorItemBgSelectedHorizontal
  } = token;
  return {
    [`${componentCls}-${themeSuffix}`]: {
      color: colorItemText,
      background: colorItemBg,
      [`&${componentCls}-root:focus-visible`]: _extends({}, accessibilityFocus(token)),
      // ======================== Item ========================
      [`${componentCls}-item-group-title`]: {
        color: colorGroupTitle
      },
      [`${componentCls}-submenu-selected`]: {
        [`> ${componentCls}-submenu-title`]: {
          color: colorItemTextSelected
        }
      },
      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${colorItemTextDisabled} !important`
      },
      // Hover
      [`${componentCls}-item:hover, ${componentCls}-submenu-title:hover`]: {
        [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
          color: colorItemTextHover
        }
      },
      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          "&:hover": {
            backgroundColor: colorItemBgHover
          },
          "&:active": {
            backgroundColor: colorItemBgSelected
          }
        },
        [`${componentCls}-submenu-title`]: {
          "&:hover": {
            backgroundColor: colorItemBgHover
          },
          "&:active": {
            backgroundColor: colorItemBgSelected
          }
        }
      },
      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: colorDangerItemText,
        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: colorDangerItemTextHover
          }
        },
        [`&${componentCls}-item:active`]: {
          background: colorDangerItemBgActive
        }
      },
      [`${componentCls}-item a`]: {
        "&, &:hover": {
          color: "inherit"
        }
      },
      [`${componentCls}-item-selected`]: {
        color: colorItemTextSelected,
        // Danger
        [`&${componentCls}-item-danger`]: {
          color: colorDangerItemTextSelected
        },
        [`a, a:hover`]: {
          color: "inherit"
        }
      },
      [`& ${componentCls}-item-selected`]: {
        backgroundColor: colorItemBgSelected,
        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: colorDangerItemBgSelected
        }
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        [`&:not(${componentCls}-item-disabled):focus-visible`]: _extends({}, accessibilityFocus(token))
      },
      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg
      },
      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: colorItemBg
      },
      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: _extends(_extends({}, themeSuffix === "dark" ? {
        borderBottom: 0
      } : {}), {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: colorActiveBarBorderSize,
          marginTop: -colorActiveBarBorderSize,
          marginBottom: 0,
          borderRadius: 0,
          "&::after": {
            position: "absolute",
            insetInline: menuItemPaddingInline,
            bottom: 0,
            borderBottom: `${colorActiveBarHeight}px solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""'
          },
          [`&:hover, &-active, &-open`]: {
            "&::after": {
              borderBottomWidth: colorActiveBarHeight,
              borderBottomColor: colorItemTextSelectedHorizontal
            }
          },
          [`&-selected`]: {
            color: colorItemTextSelectedHorizontal,
            backgroundColor: colorItemBgSelectedHorizontal,
            "&::after": {
              borderBottomWidth: colorActiveBarHeight,
              borderBottomColor: colorItemTextSelectedHorizontal
            }
          }
        }
      }),
      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${colorActiveBarBorderSize}px ${lineType} ${colorSplit}`
        }
      },
      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: colorSubItemBg
        },
        // Item
        [`${componentCls}-item, ${componentCls}-submenu-title`]: colorActiveBarBorderSize && colorActiveBarWidth ? {
          width: `calc(100% + ${colorActiveBarBorderSize}px)`
        } : {},
        [`${componentCls}-item`]: {
          position: "relative",
          "&::after": {
            position: "absolute",
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${colorActiveBarWidth}px solid ${colorItemTextSelected}`,
            transform: "scaleY(0.0001)",
            opacity: 0,
            transition: [`transform ${motionDurationMid} ${motionEaseOut}`, `opacity ${motionDurationMid} ${motionEaseOut}`].join(","),
            content: '""'
          },
          // Danger
          [`&${componentCls}-item-danger`]: {
            "&::after": {
              borderInlineEndColor: colorDangerItemTextSelected
            }
          }
        },
        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          "&::after": {
            transform: "scaleY(1)",
            opacity: 1,
            transition: [`transform ${motionDurationMid} ${motionEaseInOut}`, `opacity ${motionDurationMid} ${motionEaseInOut}`].join(",")
          }
        }
      }
    }
  };
};
const getVerticalInlineStyle = (token) => {
  const {
    componentCls,
    menuItemHeight,
    itemMarginInline,
    padding,
    menuArrowSize,
    marginXS,
    marginXXS
  } = token;
  const paddingWithArrow = padding + menuArrowSize + marginXS;
  return {
    [`${componentCls}-item`]: {
      position: "relative"
    },
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`,
      paddingInline: padding,
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginInline: itemMarginInline,
      marginBlock: marginXXS,
      width: `calc(100% - ${itemMarginInline * 2}px)`
    },
    // disable margin collapsed
    [`${componentCls}-submenu`]: {
      paddingBottom: 0.02
    },
    [`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`
    },
    [`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: {
      paddingInlineEnd: paddingWithArrow
    }
  };
};
const getVerticalStyle = (token) => {
  const {
    componentCls,
    iconCls,
    menuItemHeight,
    colorTextLightSolid,
    dropdownWidth,
    controlHeightLG,
    motionDurationMid,
    motionEaseOut,
    paddingXL,
    fontSizeSM,
    fontSizeLG,
    motionDurationSlow,
    paddingXS,
    boxShadowSecondary
  } = token;
  const inlineItemStyle = {
    height: menuItemHeight,
    lineHeight: `${menuItemHeight}px`,
    listStylePosition: "inside",
    listStyleType: "disc"
  };
  return [
    {
      [componentCls]: {
        [`&-inline, &-vertical`]: _extends({
          [`&${componentCls}-root`]: {
            boxShadow: "none"
          }
        }, getVerticalInlineStyle(token))
      },
      [`${componentCls}-submenu-popup`]: {
        [`${componentCls}-vertical`]: _extends(_extends({}, getVerticalInlineStyle(token)), {
          boxShadow: boxShadowSecondary
        })
      }
    },
    // Vertical only
    {
      [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
        minWidth: dropdownWidth,
        maxHeight: `calc(100vh - ${controlHeightLG * 2.5}px)`,
        padding: "0",
        overflow: "hidden",
        borderInlineEnd: 0,
        // https://github.com/ant-design/ant-design/issues/22244
        // https://github.com/ant-design/ant-design/issues/26812
        "&:not([class*='-active'])": {
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    },
    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: "100%",
        // Motion enhance for first level
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu-title`]: {
            display: "flex",
            alignItems: "center",
            transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding ${motionDurationMid} ${motionEaseOut}`].join(","),
            [`> ${componentCls}-title-content`]: {
              flex: "auto",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            "> *": {
              flex: "none"
            }
          }
        },
        // >>>>> Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: "none",
          [`& > ${componentCls}-submenu > ${componentCls}-submenu-title`]: inlineItemStyle,
          [`& ${componentCls}-item-group-title`]: {
            paddingInlineStart: paddingXL
          }
        },
        // >>>>> Item
        [`${componentCls}-item`]: inlineItemStyle
      }
    },
    // Inline Collapse Only
    {
      [`${componentCls}-inline-collapsed`]: {
        width: menuItemHeight * 2,
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: {
            [`> ${componentCls}-inline-collapsed-noicon`]: {
              fontSize: fontSizeLG,
              textAlign: "center"
            }
          }
        },
        [`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - ${fontSizeSM}px)`,
          textOverflow: "clip",
          [`
            ${componentCls}-submenu-arrow,
            ${componentCls}-submenu-expand-icon
          `]: {
            opacity: 0
          },
          [`${componentCls}-item-icon, ${iconCls}`]: {
            margin: 0,
            fontSize: fontSizeLG,
            lineHeight: `${menuItemHeight}px`,
            "+ span": {
              display: "inline-block",
              opacity: 0
            }
          }
        },
        [`${componentCls}-item-icon, ${iconCls}`]: {
          display: "inline-block"
        },
        "&-tooltip": {
          pointerEvents: "none",
          [`${componentCls}-item-icon, ${iconCls}`]: {
            display: "none"
          },
          "a, a:hover": {
            color: colorTextLightSolid
          }
        },
        [`${componentCls}-item-group-title`]: _extends(_extends({}, textEllipsis), {
          paddingInline: paddingXS
        })
      }
    }
  ];
};
const genMenuItemStyle = (token) => {
  const {
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseOut,
    iconCls,
    controlHeightSM
  } = token;
  return {
    // >>>>> Item
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      position: "relative",
      display: "block",
      margin: 0,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(","),
      [`${componentCls}-item-icon, ${iconCls}`]: {
        minWidth: fontSize,
        fontSize,
        transition: [`font-size ${motionDurationMid} ${motionEaseOut}`, `margin ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow}`].join(","),
        "+ span": {
          marginInlineStart: controlHeightSM - fontSize,
          opacity: 1,
          transition: [`opacity ${motionDurationSlow} ${motionEaseInOut}`, `margin ${motionDurationSlow}`, `color ${motionDurationSlow}`].join(",")
        }
      },
      [`${componentCls}-item-icon`]: _extends({}, resetIcon()),
      [`&${componentCls}-item-only-child`]: {
        [`> ${iconCls}, > ${componentCls}-item-icon`]: {
          marginInlineEnd: 0
        }
      }
    },
    // Disabled state sets text to gray and nukes hover/tab effects
    [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
      background: "none !important",
      cursor: "not-allowed",
      "&::after": {
        borderColor: "transparent !important"
      },
      a: {
        color: "inherit !important"
      },
      [`> ${componentCls}-submenu-title`]: {
        color: "inherit !important",
        cursor: "not-allowed"
      }
    }
  };
};
const genSubMenuArrowStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionEaseInOut,
    borderRadius,
    menuArrowSize,
    menuArrowOffset
  } = token;
  return {
    [`${componentCls}-submenu`]: {
      [`&-expand-icon, &-arrow`]: {
        position: "absolute",
        top: "50%",
        insetInlineEnd: token.margin,
        width: menuArrowSize,
        color: "currentcolor",
        transform: "translateY(-50%)",
        transition: `transform ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow}`
      },
      "&-arrow": {
        // →
        "&::before, &::after": {
          position: "absolute",
          width: menuArrowSize * 0.6,
          height: menuArrowSize * 0.15,
          backgroundColor: "currentcolor",
          borderRadius,
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `transform ${motionDurationSlow} ${motionEaseInOut}`, `top ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow} ${motionEaseInOut}`].join(","),
          content: '""'
        },
        "&::before": {
          transform: `rotate(45deg) translateY(-${menuArrowOffset})`
        },
        "&::after": {
          transform: `rotate(-45deg) translateY(${menuArrowOffset})`
        }
      }
    }
  };
};
const getBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    lineHeight,
    paddingXS,
    padding,
    colorSplit,
    lineWidth,
    zIndexPopup,
    borderRadiusLG,
    radiusSubMenuItem,
    menuArrowSize,
    menuArrowOffset,
    lineType,
    menuPanelMaskInset
  } = token;
  return [
    // Misc
    {
      "": {
        [`${componentCls}`]: _extends(_extends({}, clearFix()), {
          // Hidden
          [`&-hidden`]: {
            display: "none"
          }
        })
      },
      [`${componentCls}-submenu-hidden`]: {
        display: "none"
      }
    },
    {
      [componentCls]: _extends(_extends(_extends(_extends(_extends(_extends(_extends({}, resetComponent(token)), clearFix()), {
        marginBottom: 0,
        paddingInlineStart: 0,
        // Override default ul/ol
        fontSize,
        lineHeight: 0,
        listStyle: "none",
        outline: "none",
        transition: `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        [`ul, ol`]: {
          margin: 0,
          padding: 0,
          listStyle: "none"
        },
        // Overflow ellipsis
        [`&-overflow`]: {
          display: "flex",
          [`${componentCls}-item`]: {
            flex: "none"
          }
        },
        [`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: {
          borderRadius: token.radiusItem
        },
        [`${componentCls}-item-group-title`]: {
          padding: `${paddingXS}px ${padding}px`,
          fontSize,
          lineHeight,
          transition: `all ${motionDurationSlow}`
        },
        [`&-horizontal ${componentCls}-submenu`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu, ${componentCls}-submenu-inline`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationMid} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu ${componentCls}-sub`]: {
          cursor: "initial",
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`
        },
        [`${componentCls}-item a`]: {
          "&::before": {
            position: "absolute",
            inset: 0,
            backgroundColor: "transparent",
            content: '""'
          }
        },
        // Removed a Badge related style seems it's safe
        // https://github.com/ant-design/ant-design/issues/19809
        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: "hidden",
          lineHeight: 0,
          borderColor: colorSplit,
          borderStyle: lineType,
          borderWidth: 0,
          borderTopWidth: lineWidth,
          marginBlock: lineWidth,
          padding: 0,
          "&-dashed": {
            borderStyle: "dashed"
          }
        }
      }), genMenuItemStyle(token)), {
        [`${componentCls}-item-group`]: {
          [`${componentCls}-item-group-list`]: {
            margin: 0,
            padding: 0,
            [`${componentCls}-item, ${componentCls}-submenu-title`]: {
              paddingInline: `${fontSize * 2}px ${padding}px`
            }
          }
        },
        // ======================= Sub Menu =======================
        "&-submenu": {
          "&-popup": {
            position: "absolute",
            zIndex: zIndexPopup,
            background: "transparent",
            borderRadius: borderRadiusLG,
            boxShadow: "none",
            transformOrigin: "0 0",
            // https://github.com/ant-design/ant-design/issues/13955
            "&::before": {
              position: "absolute",
              inset: `${menuPanelMaskInset}px 0 0`,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
              content: '""'
            }
          },
          // https://github.com/ant-design/ant-design/issues/13955
          "&-placement-rightTop::before": {
            top: 0,
            insetInlineStart: menuPanelMaskInset
          },
          [`> ${componentCls}`]: _extends(_extends(_extends({
            borderRadius: borderRadiusLG
          }, genMenuItemStyle(token)), genSubMenuArrowStyle(token)), {
            [`${componentCls}-item, ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
              borderRadius: radiusSubMenuItem
            },
            [`${componentCls}-submenu-title::after`]: {
              transition: `transform ${motionDurationSlow} ${motionEaseInOut}`
            }
          })
        }
      }), genSubMenuArrowStyle(token)), {
        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          "&::before": {
            transform: `rotate(-45deg) translateX(${menuArrowOffset})`
          },
          "&::after": {
            transform: `rotate(45deg) translateX(-${menuArrowOffset})`
          }
        },
        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
          // ↑
          transform: `translateY(-${menuArrowSize * 0.2}px)`,
          "&::after": {
            transform: `rotate(-45deg) translateX(-${menuArrowOffset})`
          },
          "&::before": {
            transform: `rotate(45deg) translateX(${menuArrowOffset})`
          }
        }
      })
    },
    // Integration with header element so menu items have the same height
    {
      [`${antCls}-layout-header`]: {
        [componentCls]: {
          lineHeight: "inherit"
        }
      }
    }
  ];
};
const useStyle$b = (prefixCls, injectStyle) => {
  const useOriginHook = genComponentStyleHook("Menu", (token, _ref) => {
    let {
      overrideComponentToken
    } = _ref;
    if ((injectStyle === null || injectStyle === void 0 ? void 0 : injectStyle.value) === false) {
      return [];
    }
    const {
      colorBgElevated,
      colorPrimary,
      colorError,
      colorErrorHover,
      colorTextLightSolid
    } = token;
    const {
      controlHeightLG,
      fontSize
    } = token;
    const menuArrowSize = fontSize / 7 * 5;
    const menuToken = merge(token, {
      menuItemHeight: controlHeightLG,
      menuItemPaddingInline: token.margin,
      menuArrowSize,
      menuHorizontalHeight: controlHeightLG * 1.15,
      menuArrowOffset: `${menuArrowSize * 0.25}px`,
      menuPanelMaskInset: -7,
      menuSubMenuBg: colorBgElevated
    });
    const colorTextDark = new TinyColor(colorTextLightSolid).setAlpha(0.65).toRgbString();
    const menuDarkToken = merge(menuToken, {
      colorItemText: colorTextDark,
      colorItemTextHover: colorTextLightSolid,
      colorGroupTitle: colorTextDark,
      colorItemTextSelected: colorTextLightSolid,
      colorItemBg: "#001529",
      colorSubItemBg: "#000c17",
      colorItemBgActive: "transparent",
      colorItemBgSelected: colorPrimary,
      colorActiveBarWidth: 0,
      colorActiveBarHeight: 0,
      colorActiveBarBorderSize: 0,
      // Disabled
      colorItemTextDisabled: new TinyColor(colorTextLightSolid).setAlpha(0.25).toRgbString(),
      // Danger
      colorDangerItemText: colorError,
      colorDangerItemTextHover: colorErrorHover,
      colorDangerItemTextSelected: colorTextLightSolid,
      colorDangerItemBgActive: colorError,
      colorDangerItemBgSelected: colorError,
      menuSubMenuBg: "#001529",
      // Horizontal
      colorItemTextSelectedHorizontal: colorTextLightSolid,
      colorItemBgSelectedHorizontal: colorPrimary
    }, _extends({}, overrideComponentToken));
    return [
      // Basic
      getBaseStyle(menuToken),
      // Horizontal
      getHorizontalStyle(menuToken),
      // Vertical
      getVerticalStyle(menuToken),
      // Theme
      getThemeStyle(menuToken, "light"),
      getThemeStyle(menuDarkToken, "dark"),
      // RTL
      getRTLStyle(menuToken),
      // Motion
      genCollapseMotion(menuToken),
      initSlideMotion(menuToken, "slide-up"),
      initSlideMotion(menuToken, "slide-down"),
      initZoomMotion(menuToken, "zoom-big")
    ];
  }, (token) => {
    const {
      colorPrimary,
      colorError,
      colorTextDisabled,
      colorErrorBg,
      colorText,
      colorTextDescription,
      colorBgContainer,
      colorFillAlter,
      colorFillContent,
      lineWidth,
      lineWidthBold,
      controlItemBgActive,
      colorBgTextHover
    } = token;
    return {
      dropdownWidth: 160,
      zIndexPopup: token.zIndexPopupBase + 50,
      radiusItem: token.borderRadiusLG,
      radiusSubMenuItem: token.borderRadiusSM,
      colorItemText: colorText,
      colorItemTextHover: colorText,
      colorItemTextHoverHorizontal: colorPrimary,
      colorGroupTitle: colorTextDescription,
      colorItemTextSelected: colorPrimary,
      colorItemTextSelectedHorizontal: colorPrimary,
      colorItemBg: colorBgContainer,
      colorItemBgHover: colorBgTextHover,
      colorItemBgActive: colorFillContent,
      colorSubItemBg: colorFillAlter,
      colorItemBgSelected: controlItemBgActive,
      colorItemBgSelectedHorizontal: "transparent",
      colorActiveBarWidth: 0,
      colorActiveBarHeight: lineWidthBold,
      colorActiveBarBorderSize: lineWidth,
      // Disabled
      colorItemTextDisabled: colorTextDisabled,
      // Danger
      colorDangerItemText: colorError,
      colorDangerItemTextHover: colorError,
      colorDangerItemTextSelected: colorError,
      colorDangerItemBgActive: colorErrorBg,
      colorDangerItemBgSelected: colorErrorBg,
      itemMarginInline: token.marginXXS
    };
  });
  return useOriginHook(prefixCls);
};
const menuProps = () => ({
  id: String,
  prefixCls: String,
  // donot use items, now only support inner use
  items: Array,
  disabled: Boolean,
  inlineCollapsed: Boolean,
  disabledOverflow: Boolean,
  forceSubMenuRender: Boolean,
  openKeys: Array,
  selectedKeys: Array,
  activeKey: String,
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  tabindex: {
    type: [Number, String]
  },
  motion: Object,
  role: String,
  theme: {
    type: String,
    default: "light"
  },
  mode: {
    type: String,
    default: "vertical"
  },
  inlineIndent: {
    type: Number,
    default: 24
  },
  subMenuOpenDelay: {
    type: Number,
    default: 0
  },
  subMenuCloseDelay: {
    type: Number,
    default: 0.1
  },
  builtinPlacements: {
    type: Object
  },
  triggerSubMenuAction: {
    type: String,
    default: "hover"
  },
  getPopupContainer: Function,
  expandIcon: Function,
  onOpenChange: Function,
  onSelect: Function,
  onDeselect: Function,
  onClick: [Function, Array],
  onFocus: Function,
  onBlur: Function,
  onMousedown: Function,
  "onUpdate:openKeys": Function,
  "onUpdate:selectedKeys": Function,
  "onUpdate:activeKey": Function
});
const EMPTY_LIST = [];
const Menu = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenu",
  inheritAttrs: false,
  props: menuProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const {
      direction,
      getPrefixCls
    } = useConfigInject("menu", props);
    const override = useInjectOverride();
    const prefixCls = computed(() => {
      var _a2;
      return getPrefixCls("menu", props.prefixCls || ((_a2 = override === null || override === void 0 ? void 0 : override.prefixCls) === null || _a2 === void 0 ? void 0 : _a2.value));
    });
    const [wrapSSR, hashId] = useStyle$b(prefixCls, computed(() => {
      return !override;
    }));
    const store = shallowRef(/* @__PURE__ */ new Map());
    const siderCollapsed = inject(SiderCollapsedKey, ref(void 0));
    const inlineCollapsed = computed(() => {
      if (siderCollapsed.value !== void 0) {
        return siderCollapsed.value;
      }
      return props.inlineCollapsed;
    });
    const {
      itemsNodes
    } = useItems(props);
    const isMounted = shallowRef(false);
    onMounted(() => {
      isMounted.value = true;
    });
    watchEffect(() => {
      devWarning(!(props.inlineCollapsed === true && props.mode !== "inline"), "Menu", "`inlineCollapsed` should only be used when `mode` is inline.");
      devWarning(!(siderCollapsed.value !== void 0 && props.inlineCollapsed === true), "Menu", "`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.");
    });
    const activeKeys = ref([]);
    const mergedSelectedKeys = ref([]);
    const keyMapStore = ref({});
    watch(store, () => {
      const newKeyMapStore = {};
      for (const menuInfo of store.value.values()) {
        newKeyMapStore[menuInfo.key] = menuInfo;
      }
      keyMapStore.value = newKeyMapStore;
    }, {
      flush: "post"
    });
    watchEffect(() => {
      if (props.activeKey !== void 0) {
        let keys = [];
        const menuInfo = props.activeKey ? keyMapStore.value[props.activeKey] : void 0;
        if (menuInfo && props.activeKey !== void 0) {
          keys = uniq([].concat(unref(menuInfo.parentKeys), props.activeKey));
        } else {
          keys = [];
        }
        if (!shallowequal(activeKeys.value, keys)) {
          activeKeys.value = keys;
        }
      }
    });
    watch(() => props.selectedKeys, (selectedKeys) => {
      if (selectedKeys) {
        mergedSelectedKeys.value = selectedKeys.slice();
      }
    }, {
      immediate: true,
      deep: true
    });
    const selectedSubMenuKeys = ref([]);
    watch([keyMapStore, mergedSelectedKeys], () => {
      let subMenuParentKeys = [];
      mergedSelectedKeys.value.forEach((key2) => {
        const menuInfo = keyMapStore.value[key2];
        if (menuInfo) {
          subMenuParentKeys = subMenuParentKeys.concat(unref(menuInfo.parentKeys));
        }
      });
      subMenuParentKeys = uniq(subMenuParentKeys);
      if (!shallowequal(selectedSubMenuKeys.value, subMenuParentKeys)) {
        selectedSubMenuKeys.value = subMenuParentKeys;
      }
    }, {
      immediate: true
    });
    const triggerSelection = (info) => {
      if (props.selectable) {
        const {
          key: targetKey
        } = info;
        const exist = mergedSelectedKeys.value.includes(targetKey);
        let newSelectedKeys;
        if (props.multiple) {
          if (exist) {
            newSelectedKeys = mergedSelectedKeys.value.filter((key2) => key2 !== targetKey);
          } else {
            newSelectedKeys = [...mergedSelectedKeys.value, targetKey];
          }
        } else {
          newSelectedKeys = [targetKey];
        }
        const selectInfo = _extends(_extends({}, info), {
          selectedKeys: newSelectedKeys
        });
        if (!shallowequal(newSelectedKeys, mergedSelectedKeys.value)) {
          if (props.selectedKeys === void 0) {
            mergedSelectedKeys.value = newSelectedKeys;
          }
          emit("update:selectedKeys", newSelectedKeys);
          if (exist && props.multiple) {
            emit("deselect", selectInfo);
          } else {
            emit("select", selectInfo);
          }
        }
      }
      if (mergedMode.value !== "inline" && !props.multiple && mergedOpenKeys.value.length) {
        triggerOpenKeys(EMPTY_LIST);
      }
    };
    const mergedOpenKeys = ref([]);
    watch(() => props.openKeys, function() {
      let openKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : mergedOpenKeys.value;
      if (!shallowequal(mergedOpenKeys.value, openKeys)) {
        mergedOpenKeys.value = openKeys.slice();
      }
    }, {
      immediate: true,
      deep: true
    });
    let timeout;
    const changeActiveKeys = (keys) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (props.activeKey === void 0) {
          activeKeys.value = keys;
        }
        emit("update:activeKey", keys[keys.length - 1]);
      });
    };
    const disabled = computed(() => !!props.disabled);
    const isRtl = computed(() => direction.value === "rtl");
    const mergedMode = ref("vertical");
    const mergedInlineCollapsed = shallowRef(false);
    watchEffect(() => {
      var _a2;
      if ((props.mode === "inline" || props.mode === "vertical") && inlineCollapsed.value) {
        mergedMode.value = "vertical";
        mergedInlineCollapsed.value = inlineCollapsed.value;
      } else {
        mergedMode.value = props.mode;
        mergedInlineCollapsed.value = false;
      }
      if ((_a2 = override === null || override === void 0 ? void 0 : override.mode) === null || _a2 === void 0 ? void 0 : _a2.value) {
        mergedMode.value = override.mode.value;
      }
    });
    const isInlineMode = computed(() => mergedMode.value === "inline");
    const triggerOpenKeys = (keys) => {
      mergedOpenKeys.value = keys;
      emit("update:openKeys", keys);
      emit("openChange", keys);
    };
    const inlineCacheOpenKeys = ref(mergedOpenKeys.value);
    const mountRef = shallowRef(false);
    watch(mergedOpenKeys, () => {
      if (isInlineMode.value) {
        inlineCacheOpenKeys.value = mergedOpenKeys.value;
      }
    }, {
      immediate: true
    });
    watch(isInlineMode, () => {
      if (!mountRef.value) {
        mountRef.value = true;
        return;
      }
      if (isInlineMode.value) {
        mergedOpenKeys.value = inlineCacheOpenKeys.value;
      } else {
        triggerOpenKeys(EMPTY_LIST);
      }
    }, {
      immediate: true
    });
    const className = computed(() => {
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-root`]: true,
        [`${prefixCls.value}-${mergedMode.value}`]: true,
        [`${prefixCls.value}-inline-collapsed`]: mergedInlineCollapsed.value,
        [`${prefixCls.value}-rtl`]: isRtl.value,
        [`${prefixCls.value}-${props.theme}`]: true
      };
    });
    const rootPrefixCls = computed(() => getPrefixCls());
    const defaultMotions = computed(() => ({
      horizontal: {
        name: `${rootPrefixCls.value}-slide-up`
      },
      inline: collapseMotion(`${rootPrefixCls.value}-motion-collapse`),
      other: {
        name: `${rootPrefixCls.value}-zoom-big`
      }
    }));
    useProvideFirstLevel(true);
    const getChildrenKeys = function() {
      let eventKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      const keys = [];
      const storeValue = store.value;
      eventKeys.forEach((eventKey) => {
        const {
          key: key2,
          childrenEventKeys
        } = storeValue.get(eventKey);
        keys.push(key2, ...getChildrenKeys(unref(childrenEventKeys)));
      });
      return keys;
    };
    const onInternalClick = (info) => {
      var _a2;
      emit("click", info);
      triggerSelection(info);
      (_a2 = override === null || override === void 0 ? void 0 : override.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(override);
    };
    const onInternalOpenChange = (key2, open) => {
      var _a2;
      const childrenEventKeys = ((_a2 = keyMapStore.value[key2]) === null || _a2 === void 0 ? void 0 : _a2.childrenEventKeys) || [];
      let newOpenKeys = mergedOpenKeys.value.filter((k) => k !== key2);
      if (open) {
        newOpenKeys.push(key2);
      } else if (mergedMode.value !== "inline") {
        const subPathKeys = getChildrenKeys(unref(childrenEventKeys));
        newOpenKeys = uniq(newOpenKeys.filter((k) => !subPathKeys.includes(k)));
      }
      if (!shallowequal(mergedOpenKeys, newOpenKeys)) {
        triggerOpenKeys(newOpenKeys);
      }
    };
    const registerMenuInfo = (key2, info) => {
      store.value.set(key2, info);
      store.value = new Map(store.value);
    };
    const unRegisterMenuInfo = (key2) => {
      store.value.delete(key2);
      store.value = new Map(store.value);
    };
    const lastVisibleIndex = ref(0);
    const expandIcon = computed(() => {
      var _a2;
      return props.expandIcon || slots.expandIcon || ((_a2 = override === null || override === void 0 ? void 0 : override.expandIcon) === null || _a2 === void 0 ? void 0 : _a2.value) ? (opt) => {
        let icon = props.expandIcon || slots.expandIcon;
        icon = typeof icon === "function" ? icon(opt) : icon;
        return cloneElement(icon, {
          class: `${prefixCls.value}-submenu-expand-icon`
        }, false);
      } : null;
    });
    useProvideMenu({
      prefixCls,
      activeKeys,
      openKeys: mergedOpenKeys,
      selectedKeys: mergedSelectedKeys,
      changeActiveKeys,
      disabled,
      rtl: isRtl,
      mode: mergedMode,
      inlineIndent: computed(() => props.inlineIndent),
      subMenuCloseDelay: computed(() => props.subMenuCloseDelay),
      subMenuOpenDelay: computed(() => props.subMenuOpenDelay),
      builtinPlacements: computed(() => props.builtinPlacements),
      triggerSubMenuAction: computed(() => props.triggerSubMenuAction),
      getPopupContainer: computed(() => props.getPopupContainer),
      inlineCollapsed: mergedInlineCollapsed,
      theme: computed(() => props.theme),
      siderCollapsed,
      defaultMotions: computed(() => isMounted.value ? defaultMotions.value : null),
      motion: computed(() => isMounted.value ? props.motion : null),
      overflowDisabled: shallowRef(void 0),
      onOpenChange: onInternalOpenChange,
      onItemClick: onInternalClick,
      registerMenuInfo,
      unRegisterMenuInfo,
      selectedSubMenuKeys,
      expandIcon,
      forceSubMenuRender: computed(() => props.forceSubMenuRender),
      rootClassName: hashId
    });
    const getChildrenList = () => {
      var _a2;
      return itemsNodes.value || flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots));
    };
    return () => {
      var _a2;
      const childList = getChildrenList();
      const allVisible = lastVisibleIndex.value >= childList.length - 1 || mergedMode.value !== "horizontal" || props.disabledOverflow;
      const getWrapperList = (childList2) => {
        return mergedMode.value !== "horizontal" || props.disabledOverflow ? childList2 : (
          // Need wrap for overflow dropdown that do not response for open
          childList2.map((child, index2) => (
            // Always wrap provider to avoid sub node re-mount
            createVNode(MenuContextProvider, {
              "key": child.key,
              "overflowDisabled": index2 > lastVisibleIndex.value
            }, {
              default: () => child
            })
          ))
        );
      };
      const overflowedIndicator = ((_a2 = slots.overflowedIndicator) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || createVNode(EllipsisOutlined, null, null);
      return wrapSSR(createVNode(Overflow, _objectSpread2(_objectSpread2({}, attrs), {}, {
        "onMousedown": props.onMousedown,
        "prefixCls": `${prefixCls.value}-overflow`,
        "component": "ul",
        "itemComponent": __unplugin_components_1$1,
        "class": [className.value, attrs.class, hashId.value],
        "role": "menu",
        "id": props.id,
        "data": getWrapperList(childList),
        "renderRawItem": (node) => node,
        "renderRawRest": (omitItems) => {
          const len = omitItems.length;
          const originOmitItems = len ? childList.slice(-len) : null;
          return createVNode(Fragment, null, [createVNode(SubMenu, {
            "eventKey": OVERFLOW_KEY,
            "key": OVERFLOW_KEY,
            "title": overflowedIndicator,
            "disabled": allVisible,
            "internalPopupClose": len === 0
          }, {
            default: () => originOmitItems
          }), createVNode(PathContext, null, {
            default: () => [createVNode(SubMenu, {
              "eventKey": OVERFLOW_KEY,
              "key": OVERFLOW_KEY,
              "title": overflowedIndicator,
              "disabled": allVisible,
              "internalPopupClose": len === 0
            }, {
              default: () => originOmitItems
            })]
          })]);
        },
        "maxCount": mergedMode.value !== "horizontal" || props.disabledOverflow ? Overflow.INVALIDATE : Overflow.RESPONSIVE,
        "ssr": "full",
        "data-menu-list": true,
        "onVisibleChange": (newLastIndex) => {
          lastVisibleIndex.value = newLastIndex;
        }
      }), {
        default: () => [createVNode(Teleport, {
          "to": "body"
        }, {
          default: () => [createVNode("div", {
            "style": {
              display: "none"
            },
            "aria-hidden": true
          }, [createVNode(PathContext, null, {
            default: () => [getWrapperList(getChildrenList())]
          })])]
        })]
      }));
    };
  }
});
Menu.install = function(app) {
  app.component(Menu.name, Menu);
  app.component(__unplugin_components_1$1.name, __unplugin_components_1$1);
  app.component(SubMenu.name, SubMenu);
  app.component(Divider.name, Divider);
  app.component(ItemGroup.name, ItemGroup);
  return app;
};
Menu.Item = __unplugin_components_1$1;
Menu.Divider = Divider;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(quarterOfYear);
dayjs.extend((_o, c) => {
  const proto = c.prototype;
  const oldFormat = proto.format;
  proto.format = function f(formatStr) {
    const str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});
const localeMap = {
  // ar_EG:
  // az_AZ:
  // bg_BG:
  bn_BD: "bn-bd",
  by_BY: "be",
  // ca_ES:
  // cs_CZ:
  // da_DK:
  // de_DE:
  // el_GR:
  en_GB: "en-gb",
  en_US: "en",
  // es_ES:
  // et_EE:
  // fa_IR:
  // fi_FI:
  fr_BE: "fr",
  fr_CA: "fr-ca",
  // fr_FR:
  // ga_IE:
  // gl_ES:
  // he_IL:
  // hi_IN:
  // hr_HR:
  // hu_HU:
  hy_AM: "hy-am",
  // id_ID:
  // is_IS:
  // it_IT:
  // ja_JP:
  // ka_GE:
  // kk_KZ:
  // km_KH:
  kmr_IQ: "ku",
  // kn_IN:
  // ko_KR:
  // ku_IQ: // previous ku in antd
  // lt_LT:
  // lv_LV:
  // mk_MK:
  // ml_IN:
  // mn_MN:
  // ms_MY:
  // nb_NO:
  // ne_NP:
  nl_BE: "nl-be",
  // nl_NL:
  // pl_PL:
  pt_BR: "pt-br",
  // pt_PT:
  // ro_RO:
  // ru_RU:
  // sk_SK:
  // sl_SI:
  // sr_RS:
  // sv_SE:
  // ta_IN:
  // th_TH:
  // tr_TR:
  // uk_UA:
  // ur_PK:
  // vi_VN:
  zh_CN: "zh-cn",
  zh_HK: "zh-hk",
  zh_TW: "zh-tw"
};
const parseLocale = (locale2) => {
  const mapLocale = localeMap[locale2];
  return mapLocale || locale2.split("_")[0];
};
const parseNoMatchNotice = () => {
  noteOnce(false, "Not match any format. Please help to fire a issue about this.");
};
const advancedFormatRegex = /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|k{1,2}|S/g;
function findTargetStr(val, index2, segmentation) {
  const items = [...new Set(val.split(segmentation))];
  let idx = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    idx += item.length;
    if (idx > index2) {
      return item;
    }
    idx += segmentation.length;
  }
}
const toDateWithValueFormat = (val, valueFormat) => {
  if (!val) return null;
  if (dayjs.isDayjs(val)) {
    return val;
  }
  const matchs = valueFormat.matchAll(advancedFormatRegex);
  let baseDate = dayjs(val, valueFormat);
  if (matchs === null) {
    return baseDate;
  }
  for (const match of matchs) {
    const origin = match[0];
    const index2 = match["index"];
    if (origin === "Q") {
      const segmentation = val.slice(index2 - 1, index2);
      const quarterStr = findTargetStr(val, index2, segmentation).match(/\d+/)[0];
      baseDate = baseDate.quarter(parseInt(quarterStr));
    }
    if (origin.toLowerCase() === "wo") {
      const segmentation = val.slice(index2 - 1, index2);
      const weekStr = findTargetStr(val, index2, segmentation).match(/\d+/)[0];
      baseDate = baseDate.week(parseInt(weekStr));
    }
    if (origin.toLowerCase() === "ww") {
      baseDate = baseDate.week(parseInt(val.slice(index2, index2 + origin.length)));
    }
    if (origin.toLowerCase() === "w") {
      baseDate = baseDate.week(parseInt(val.slice(index2, index2 + origin.length + 1)));
    }
  }
  return baseDate;
};
const generateConfig = {
  // get
  getNow: () => dayjs(),
  getFixedDate: (string) => dayjs(string, ["YYYY-M-DD", "YYYY-MM-DD"]),
  getEndDate: (date) => date.endOf("month"),
  getWeekDay: (date) => {
    const clone = date.locale("en");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: (date) => date.year(),
  getMonth: (date) => date.month(),
  getDate: (date) => date.date(),
  getHour: (date) => date.hour(),
  getMinute: (date) => date.minute(),
  getSecond: (date) => date.second(),
  // set
  addYear: (date, diff) => date.add(diff, "year"),
  addMonth: (date, diff) => date.add(diff, "month"),
  addDate: (date, diff) => date.add(diff, "day"),
  setYear: (date, year) => date.year(year),
  setMonth: (date, month) => date.month(month),
  setDate: (date, num) => date.date(num),
  setHour: (date, hour) => date.hour(hour),
  setMinute: (date, minute) => date.minute(minute),
  setSecond: (date, second) => date.second(second),
  // Compare
  isAfter: (date1, date2) => date1.isAfter(date2),
  isValidate: (date) => date.isValid(),
  locale: {
    getWeekFirstDay: (locale2) => dayjs().locale(parseLocale(locale2)).localeData().firstDayOfWeek(),
    getWeekFirstDate: (locale2, date) => date.locale(parseLocale(locale2)).weekday(0),
    getWeek: (locale2, date) => date.locale(parseLocale(locale2)).week(),
    getShortWeekDays: (locale2) => dayjs().locale(parseLocale(locale2)).localeData().weekdaysMin(),
    getShortMonths: (locale2) => dayjs().locale(parseLocale(locale2)).localeData().monthsShort(),
    format: (locale2, date, format) => date.locale(parseLocale(locale2)).format(format),
    parse: (locale2, text, formats) => {
      const localeStr = parseLocale(locale2);
      for (let i = 0; i < formats.length; i += 1) {
        const format = formats[i];
        const formatText = text;
        if (format.includes("wo") || format.includes("Wo")) {
          const year = formatText.split("-")[0];
          const weekStr = formatText.split("-")[1];
          const firstWeek = dayjs(year, "YYYY").startOf("year").locale(localeStr);
          for (let j = 0; j <= 52; j += 1) {
            const nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }
          parseNoMatchNotice();
          return null;
        }
        const date = dayjs(formatText, format, true).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }
      if (!text) {
        parseNoMatchNotice();
      }
      return null;
    }
  },
  toDate: (value, valueFormat) => {
    if (Array.isArray(value)) {
      return value.map((val) => toDateWithValueFormat(val, valueFormat));
    } else {
      return toDateWithValueFormat(value, valueFormat);
    }
  },
  toString: (value, valueFormat) => {
    if (Array.isArray(value)) {
      return value.map((val) => dayjs.isDayjs(val) ? val.format(valueFormat) : val);
    } else {
      return dayjs.isDayjs(value) ? value.format(valueFormat) : value;
    }
  }
};
function useMergeProps(props) {
  const attrs = useAttrs();
  return _extends(_extends({}, props), attrs);
}
const PanelContextKey = Symbol("PanelContextProps");
const useProvidePanel = (props) => {
  provide(PanelContextKey, props);
};
const useInjectPanel = () => {
  return inject(PanelContextKey, {});
};
const HIDDEN_STYLE = {
  visibility: "hidden"
};
function Header$1(_props, _ref) {
  let {
    slots
  } = _ref;
  var _a2;
  const props = useMergeProps(_props);
  const {
    prefixCls,
    prevIcon = "‹",
    nextIcon = "›",
    superPrevIcon = "«",
    superNextIcon = "»",
    onSuperPrev,
    onSuperNext,
    onPrev,
    onNext
  } = props;
  const {
    hideNextBtn,
    hidePrevBtn
  } = useInjectPanel();
  return createVNode("div", {
    "class": prefixCls
  }, [onSuperPrev && createVNode("button", {
    "type": "button",
    "onClick": onSuperPrev,
    "tabindex": -1,
    "class": `${prefixCls}-super-prev-btn`,
    "style": hidePrevBtn.value ? HIDDEN_STYLE : {}
  }, [superPrevIcon]), onPrev && createVNode("button", {
    "type": "button",
    "onClick": onPrev,
    "tabindex": -1,
    "class": `${prefixCls}-prev-btn`,
    "style": hidePrevBtn.value ? HIDDEN_STYLE : {}
  }, [prevIcon]), createVNode("div", {
    "class": `${prefixCls}-view`
  }, [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]), onNext && createVNode("button", {
    "type": "button",
    "onClick": onNext,
    "tabindex": -1,
    "class": `${prefixCls}-next-btn`,
    "style": hideNextBtn.value ? HIDDEN_STYLE : {}
  }, [nextIcon]), onSuperNext && createVNode("button", {
    "type": "button",
    "onClick": onSuperNext,
    "tabindex": -1,
    "class": `${prefixCls}-super-next-btn`,
    "style": hideNextBtn.value ? HIDDEN_STYLE : {}
  }, [superNextIcon])]);
}
Header$1.displayName = "Header";
Header$1.inheritAttrs = false;
function DecadeHeader(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    viewDate,
    onPrevDecades,
    onNextDecades
  } = props;
  const {
    hideHeader
  } = useInjectPanel();
  if (hideHeader) {
    return null;
  }
  const headerPrefixCls = `${prefixCls}-header`;
  const yearNumber = generateConfig2.getYear(viewDate);
  const startYear = Math.floor(yearNumber / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
  const endYear = startYear + DECADE_DISTANCE_COUNT - 1;
  return createVNode(Header$1, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": headerPrefixCls,
    "onSuperPrev": onPrevDecades,
    "onSuperNext": onNextDecades
  }), {
    default: () => [startYear, createTextVNode("-"), endYear]
  });
}
DecadeHeader.displayName = "DecadeHeader";
DecadeHeader.inheritAttrs = false;
function setTime(generateConfig2, date, hour, minute, second) {
  let nextTime = generateConfig2.setHour(date, hour);
  nextTime = generateConfig2.setMinute(nextTime, minute);
  nextTime = generateConfig2.setSecond(nextTime, second);
  return nextTime;
}
function setDateTime(generateConfig2, date, defaultDate) {
  if (!defaultDate) {
    return date;
  }
  let newDate = date;
  newDate = generateConfig2.setHour(newDate, generateConfig2.getHour(defaultDate));
  newDate = generateConfig2.setMinute(newDate, generateConfig2.getMinute(defaultDate));
  newDate = generateConfig2.setSecond(newDate, generateConfig2.getSecond(defaultDate));
  return newDate;
}
function getLowerBoundTime(hour, minute, second, hourStep, minuteStep, secondStep) {
  const lowerBoundHour = Math.floor(hour / hourStep) * hourStep;
  if (lowerBoundHour < hour) {
    return [lowerBoundHour, 60 - minuteStep, 60 - secondStep];
  }
  const lowerBoundMinute = Math.floor(minute / minuteStep) * minuteStep;
  if (lowerBoundMinute < minute) {
    return [lowerBoundHour, lowerBoundMinute, 60 - secondStep];
  }
  const lowerBoundSecond = Math.floor(second / secondStep) * secondStep;
  return [lowerBoundHour, lowerBoundMinute, lowerBoundSecond];
}
function getLastDay(generateConfig2, date) {
  const year = generateConfig2.getYear(date);
  const month = generateConfig2.getMonth(date) + 1;
  const endDate = generateConfig2.getEndDate(generateConfig2.getFixedDate(`${year}-${month}-01`));
  const lastDay = generateConfig2.getDate(endDate);
  const monthShow = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${monthShow}-${lastDay}`;
}
function PanelBody(_props) {
  const {
    prefixCls,
    disabledDate,
    onSelect,
    picker,
    rowNum,
    colNum,
    prefixColumn,
    rowClassName,
    baseDate,
    getCellClassName,
    getCellText,
    getCellNode,
    getCellDate,
    generateConfig: generateConfig2,
    titleCell,
    headerCells
  } = useMergeProps(_props);
  const {
    onDateMouseenter,
    onDateMouseleave,
    mode
  } = useInjectPanel();
  const cellPrefixCls = `${prefixCls}-cell`;
  const rows = [];
  for (let i = 0; i < rowNum; i += 1) {
    const row = [];
    let rowStartDate;
    for (let j = 0; j < colNum; j += 1) {
      const offset = i * colNum + j;
      const currentDate = getCellDate(baseDate, offset);
      const disabled = getCellDateDisabled({
        cellDate: currentDate,
        mode: mode.value,
        disabledDate,
        generateConfig: generateConfig2
      });
      if (j === 0) {
        rowStartDate = currentDate;
        if (prefixColumn) {
          row.push(prefixColumn(rowStartDate));
        }
      }
      const title = titleCell && titleCell(currentDate);
      row.push(createVNode("td", {
        "key": j,
        "title": title,
        "class": classNames(cellPrefixCls, _extends({
          [`${cellPrefixCls}-disabled`]: disabled,
          [`${cellPrefixCls}-start`]: getCellText(currentDate) === 1 || picker === "year" && Number(title) % 10 === 0,
          [`${cellPrefixCls}-end`]: title === getLastDay(generateConfig2, currentDate) || picker === "year" && Number(title) % 10 === 9
        }, getCellClassName(currentDate))),
        "onClick": (e) => {
          e.stopPropagation();
          if (!disabled) {
            onSelect(currentDate);
          }
        },
        "onMouseenter": () => {
          if (!disabled && onDateMouseenter) {
            onDateMouseenter(currentDate);
          }
        },
        "onMouseleave": () => {
          if (!disabled && onDateMouseleave) {
            onDateMouseleave(currentDate);
          }
        }
      }, [getCellNode ? getCellNode(currentDate) : createVNode("div", {
        "class": `${cellPrefixCls}-inner`
      }, [getCellText(currentDate)])]));
    }
    rows.push(createVNode("tr", {
      "key": i,
      "class": rowClassName && rowClassName(rowStartDate)
    }, [row]));
  }
  return createVNode("div", {
    "class": `${prefixCls}-body`
  }, [createVNode("table", {
    "class": `${prefixCls}-content`
  }, [headerCells && createVNode("thead", null, [createVNode("tr", null, [headerCells])]), createVNode("tbody", null, [rows])])]);
}
PanelBody.displayName = "PanelBody";
PanelBody.inheritAttrs = false;
const DECADE_COL_COUNT = 3;
const DECADE_ROW_COUNT = 4;
function DecadeBody(_props) {
  const props = useMergeProps(_props);
  const DECADE_UNIT_DIFF_DES = DECADE_UNIT_DIFF - 1;
  const {
    prefixCls,
    viewDate,
    generateConfig: generateConfig2
  } = props;
  const cellPrefixCls = `${prefixCls}-cell`;
  const yearNumber = generateConfig2.getYear(viewDate);
  const decadeYearNumber = Math.floor(yearNumber / DECADE_UNIT_DIFF) * DECADE_UNIT_DIFF;
  const startDecadeYear = Math.floor(yearNumber / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
  const endDecadeYear = startDecadeYear + DECADE_DISTANCE_COUNT - 1;
  const baseDecadeYear = generateConfig2.setYear(viewDate, startDecadeYear - Math.ceil((DECADE_COL_COUNT * DECADE_ROW_COUNT * DECADE_UNIT_DIFF - DECADE_DISTANCE_COUNT) / 2));
  const getCellClassName = (date) => {
    const startDecadeNumber = generateConfig2.getYear(date);
    const endDecadeNumber = startDecadeNumber + DECADE_UNIT_DIFF_DES;
    return {
      [`${cellPrefixCls}-in-view`]: startDecadeYear <= startDecadeNumber && endDecadeNumber <= endDecadeYear,
      [`${cellPrefixCls}-selected`]: startDecadeNumber === decadeYearNumber
    };
  };
  return createVNode(PanelBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "rowNum": DECADE_ROW_COUNT,
    "colNum": DECADE_COL_COUNT,
    "baseDate": baseDecadeYear,
    "getCellText": (date) => {
      const startDecadeNumber = generateConfig2.getYear(date);
      return `${startDecadeNumber}-${startDecadeNumber + DECADE_UNIT_DIFF_DES}`;
    },
    "getCellClassName": getCellClassName,
    "getCellDate": (date, offset) => generateConfig2.addYear(date, offset * DECADE_UNIT_DIFF)
  }), null);
}
DecadeBody.displayName = "DecadeBody";
DecadeBody.inheritAttrs = false;
const scrollIds = /* @__PURE__ */ new Map();
function waitElementReady(element, callback) {
  let id;
  function tryOrNextFrame() {
    if (isVisible(element)) {
      callback();
    } else {
      id = wrapperRaf(() => {
        tryOrNextFrame();
      });
    }
  }
  tryOrNextFrame();
  return () => {
    wrapperRaf.cancel(id);
  };
}
function scrollTo(element, to, duration) {
  if (scrollIds.get(element)) {
    wrapperRaf.cancel(scrollIds.get(element));
  }
  if (duration <= 0) {
    scrollIds.set(element, wrapperRaf(() => {
      element.scrollTop = to;
    }));
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  scrollIds.set(element, wrapperRaf(() => {
    element.scrollTop += perTick;
    if (element.scrollTop !== to) {
      scrollTo(element, to, duration - 10);
    }
  }));
}
function createKeydownHandler(event, _ref) {
  let {
    onLeftRight,
    onCtrlLeftRight,
    onUpDown,
    onPageUpDown,
    onEnter
  } = _ref;
  const {
    which,
    ctrlKey,
    metaKey
  } = event;
  switch (which) {
    case KeyCode.LEFT:
      if (ctrlKey || metaKey) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(-1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(-1);
        return true;
      }
      break;
    case KeyCode.RIGHT:
      if (ctrlKey || metaKey) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(1);
        return true;
      }
      break;
    case KeyCode.UP:
      if (onUpDown) {
        onUpDown(-1);
        return true;
      }
      break;
    case KeyCode.DOWN:
      if (onUpDown) {
        onUpDown(1);
        return true;
      }
      break;
    case KeyCode.PAGE_UP:
      if (onPageUpDown) {
        onPageUpDown(-1);
        return true;
      }
      break;
    case KeyCode.PAGE_DOWN:
      if (onPageUpDown) {
        onPageUpDown(1);
        return true;
      }
      break;
    case KeyCode.ENTER:
      if (onEnter) {
        onEnter();
        return true;
      }
      break;
  }
  return false;
}
function getDefaultFormat(format, picker, showTime, use12Hours) {
  let mergedFormat = format;
  if (!mergedFormat) {
    switch (picker) {
      case "time":
        mergedFormat = use12Hours ? "hh:mm:ss a" : "HH:mm:ss";
        break;
      case "week":
        mergedFormat = "gggg-wo";
        break;
      case "month":
        mergedFormat = "YYYY-MM";
        break;
      case "quarter":
        mergedFormat = "YYYY-[Q]Q";
        break;
      case "year":
        mergedFormat = "YYYY";
        break;
      default:
        mergedFormat = showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
    }
  }
  return mergedFormat;
}
function getInputSize(picker, format, generateConfig2) {
  const defaultSize = picker === "time" ? 8 : 10;
  const length = typeof format === "function" ? format(generateConfig2.getNow()).length : format.length;
  return Math.max(defaultSize, length) + 2;
}
let globalClickFunc = null;
const clickCallbacks = /* @__PURE__ */ new Set();
function addGlobalMousedownEvent(callback) {
  if (!globalClickFunc && typeof window !== "undefined" && window.addEventListener) {
    globalClickFunc = (e) => {
      [...clickCallbacks].forEach((queueFunc) => {
        queueFunc(e);
      });
    };
    window.addEventListener("mousedown", globalClickFunc);
  }
  clickCallbacks.add(callback);
  return () => {
    clickCallbacks.delete(callback);
    if (clickCallbacks.size === 0) {
      window.removeEventListener("mousedown", globalClickFunc);
      globalClickFunc = null;
    }
  };
}
function getTargetFromEvent(e) {
  var _a2;
  const target = e.target;
  if (e.composed && target.shadowRoot) {
    return ((_a2 = e.composedPath) === null || _a2 === void 0 ? void 0 : _a2.call(e)[0]) || target;
  }
  return target;
}
const getYearNextMode = (next) => {
  if (next === "month" || next === "date") {
    return "year";
  }
  return next;
};
const getMonthNextMode = (next) => {
  if (next === "date") {
    return "month";
  }
  return next;
};
const getQuarterNextMode = (next) => {
  if (next === "month" || next === "date") {
    return "quarter";
  }
  return next;
};
const getWeekNextMode = (next) => {
  if (next === "date") {
    return "week";
  }
  return next;
};
const PickerModeMap = {
  year: getYearNextMode,
  month: getMonthNextMode,
  quarter: getQuarterNextMode,
  week: getWeekNextMode,
  time: null,
  date: null
};
function elementsContains(elements, target) {
  return elements.some((ele) => ele && ele.contains(target));
}
const DECADE_UNIT_DIFF = 10;
const DECADE_DISTANCE_COUNT = DECADE_UNIT_DIFF * 10;
function DecadePanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    onViewDateChange,
    generateConfig: generateConfig2,
    viewDate,
    operationRef,
    onSelect,
    onPanelChange
  } = props;
  const panelPrefixCls = `${prefixCls}-decade-panel`;
  operationRef.value = {
    onKeydown: (event) => createKeydownHandler(event, {
      onLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(viewDate, diff * DECADE_UNIT_DIFF), "key");
      },
      onCtrlLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(viewDate, diff * DECADE_DISTANCE_COUNT), "key");
      },
      onUpDown: (diff) => {
        onSelect(generateConfig2.addYear(viewDate, diff * DECADE_UNIT_DIFF * DECADE_COL_COUNT), "key");
      },
      onEnter: () => {
        onPanelChange("year", viewDate);
      }
    })
  };
  const onDecadesChange = (diff) => {
    const newDate = generateConfig2.addYear(viewDate, diff * DECADE_DISTANCE_COUNT);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  const onInternalSelect = (date) => {
    onSelect(date, "mouse");
    onPanelChange("year", date);
  };
  return createVNode("div", {
    "class": panelPrefixCls
  }, [createVNode(DecadeHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onPrevDecades": () => {
      onDecadesChange(-1);
    },
    "onNextDecades": () => {
      onDecadesChange(1);
    }
  }), null), createVNode(DecadeBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onSelect": onInternalSelect
  }), null)]);
}
DecadePanel.displayName = "DecadePanel";
DecadePanel.inheritAttrs = false;
const WEEK_DAY_COUNT = 7;
function isNullEqual(value1, value2) {
  if (!value1 && !value2) {
    return true;
  }
  if (!value1 || !value2) {
    return false;
  }
  return void 0;
}
function isSameDecade(generateConfig2, decade1, decade2) {
  const equal = isNullEqual(decade1, decade2);
  if (typeof equal === "boolean") {
    return equal;
  }
  const num1 = Math.floor(generateConfig2.getYear(decade1) / 10);
  const num2 = Math.floor(generateConfig2.getYear(decade2) / 10);
  return num1 === num2;
}
function isSameYear(generateConfig2, year1, year2) {
  const equal = isNullEqual(year1, year2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return generateConfig2.getYear(year1) === generateConfig2.getYear(year2);
}
function getQuarter(generateConfig2, date) {
  const quota = Math.floor(generateConfig2.getMonth(date) / 3);
  return quota + 1;
}
function isSameQuarter(generateConfig2, quarter1, quarter2) {
  const equal = isNullEqual(quarter1, quarter2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return isSameYear(generateConfig2, quarter1, quarter2) && getQuarter(generateConfig2, quarter1) === getQuarter(generateConfig2, quarter2);
}
function isSameMonth(generateConfig2, month1, month2) {
  const equal = isNullEqual(month1, month2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return isSameYear(generateConfig2, month1, month2) && generateConfig2.getMonth(month1) === generateConfig2.getMonth(month2);
}
function isSameDate(generateConfig2, date1, date2) {
  const equal = isNullEqual(date1, date2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return generateConfig2.getYear(date1) === generateConfig2.getYear(date2) && generateConfig2.getMonth(date1) === generateConfig2.getMonth(date2) && generateConfig2.getDate(date1) === generateConfig2.getDate(date2);
}
function isSameTime(generateConfig2, time1, time2) {
  const equal = isNullEqual(time1, time2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return generateConfig2.getHour(time1) === generateConfig2.getHour(time2) && generateConfig2.getMinute(time1) === generateConfig2.getMinute(time2) && generateConfig2.getSecond(time1) === generateConfig2.getSecond(time2);
}
function isSameWeek(generateConfig2, locale2, date1, date2) {
  const equal = isNullEqual(date1, date2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return generateConfig2.locale.getWeek(locale2, date1) === generateConfig2.locale.getWeek(locale2, date2);
}
function isEqual(generateConfig2, value1, value2) {
  return isSameDate(generateConfig2, value1, value2) && isSameTime(generateConfig2, value1, value2);
}
function isInRange(generateConfig2, startDate, endDate, current) {
  if (!startDate || !endDate || !current) {
    return false;
  }
  return !isSameDate(generateConfig2, startDate, current) && !isSameDate(generateConfig2, endDate, current) && generateConfig2.isAfter(current, startDate) && generateConfig2.isAfter(endDate, current);
}
function getWeekStartDate(locale2, generateConfig2, value) {
  const weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2);
  const monthStartDate = generateConfig2.setDate(value, 1);
  const startDateWeekDay = generateConfig2.getWeekDay(monthStartDate);
  let alignStartDate = generateConfig2.addDate(monthStartDate, weekFirstDay - startDateWeekDay);
  if (generateConfig2.getMonth(alignStartDate) === generateConfig2.getMonth(value) && generateConfig2.getDate(alignStartDate) > 1) {
    alignStartDate = generateConfig2.addDate(alignStartDate, -7);
  }
  return alignStartDate;
}
function getClosingViewDate(viewDate, picker, generateConfig2) {
  let offset = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  switch (picker) {
    case "year":
      return generateConfig2.addYear(viewDate, offset * 10);
    case "quarter":
    case "month":
      return generateConfig2.addYear(viewDate, offset);
    default:
      return generateConfig2.addMonth(viewDate, offset);
  }
}
function formatValue(value, _ref) {
  let {
    generateConfig: generateConfig2,
    locale: locale2,
    format
  } = _ref;
  return typeof format === "function" ? format(value) : generateConfig2.locale.format(locale2.locale, value, format);
}
function parseValue(value, _ref2) {
  let {
    generateConfig: generateConfig2,
    locale: locale2,
    formatList
  } = _ref2;
  if (!value || typeof formatList[0] === "function") {
    return null;
  }
  return generateConfig2.locale.parse(locale2.locale, value, formatList);
}
function getCellDateDisabled(_ref3) {
  let {
    cellDate,
    mode,
    disabledDate,
    generateConfig: generateConfig2
  } = _ref3;
  if (!disabledDate) return false;
  const getDisabledFromRange = (currentMode, start, end) => {
    let current = start;
    while (current <= end) {
      let date;
      switch (currentMode) {
        case "date": {
          date = generateConfig2.setDate(cellDate, current);
          if (!disabledDate(date)) {
            return false;
          }
          break;
        }
        case "month": {
          date = generateConfig2.setMonth(cellDate, current);
          if (!getCellDateDisabled({
            cellDate: date,
            mode: "month",
            generateConfig: generateConfig2,
            disabledDate
          })) {
            return false;
          }
          break;
        }
        case "year": {
          date = generateConfig2.setYear(cellDate, current);
          if (!getCellDateDisabled({
            cellDate: date,
            mode: "year",
            generateConfig: generateConfig2,
            disabledDate
          })) {
            return false;
          }
          break;
        }
      }
      current += 1;
    }
    return true;
  };
  switch (mode) {
    case "date":
    case "week": {
      return disabledDate(cellDate);
    }
    case "month": {
      const startDate = 1;
      const endDate = generateConfig2.getDate(generateConfig2.getEndDate(cellDate));
      return getDisabledFromRange("date", startDate, endDate);
    }
    case "quarter": {
      const startMonth = Math.floor(generateConfig2.getMonth(cellDate) / 3) * 3;
      const endMonth = startMonth + 2;
      return getDisabledFromRange("month", startMonth, endMonth);
    }
    case "year": {
      return getDisabledFromRange("month", 0, 11);
    }
    case "decade": {
      const year = generateConfig2.getYear(cellDate);
      const startYear = Math.floor(year / DECADE_UNIT_DIFF) * DECADE_UNIT_DIFF;
      const endYear = startYear + DECADE_UNIT_DIFF - 1;
      return getDisabledFromRange("year", startYear, endYear);
    }
  }
}
function TimeHeader(_props) {
  const props = useMergeProps(_props);
  const {
    hideHeader
  } = useInjectPanel();
  if (hideHeader.value) {
    return null;
  }
  const {
    prefixCls,
    generateConfig: generateConfig2,
    locale: locale2,
    value,
    format
  } = props;
  const headerPrefixCls = `${prefixCls}-header`;
  return createVNode(Header$1, {
    "prefixCls": headerPrefixCls
  }, {
    default: () => [value ? formatValue(value, {
      locale: locale2,
      format,
      generateConfig: generateConfig2
    }) : " "]
  });
}
TimeHeader.displayName = "TimeHeader";
TimeHeader.inheritAttrs = false;
const TimeUnitColumn = defineComponent({
  name: "TimeUnitColumn",
  props: ["prefixCls", "units", "onSelect", "value", "active", "hideDisabledOptions"],
  setup(props) {
    const {
      open
    } = useInjectPanel();
    const ulRef = shallowRef(null);
    const liRefs = ref(/* @__PURE__ */ new Map());
    const scrollRef = ref();
    watch(() => props.value, () => {
      const li = liRefs.value.get(props.value);
      if (li && open.value !== false) {
        scrollTo(ulRef.value, li.offsetTop, 120);
      }
    });
    onBeforeUnmount(() => {
      var _a2;
      (_a2 = scrollRef.value) === null || _a2 === void 0 ? void 0 : _a2.call(scrollRef);
    });
    watch(open, () => {
      var _a2;
      (_a2 = scrollRef.value) === null || _a2 === void 0 ? void 0 : _a2.call(scrollRef);
      nextTick(() => {
        if (open.value) {
          const li = liRefs.value.get(props.value);
          if (li) {
            scrollRef.value = waitElementReady(li, () => {
              scrollTo(ulRef.value, li.offsetTop, 0);
            });
          }
        }
      });
    }, {
      immediate: true,
      flush: "post"
    });
    return () => {
      const {
        prefixCls,
        units,
        onSelect,
        value,
        active,
        hideDisabledOptions
      } = props;
      const cellPrefixCls = `${prefixCls}-cell`;
      return createVNode("ul", {
        "class": classNames(`${prefixCls}-column`, {
          [`${prefixCls}-column-active`]: active
        }),
        "ref": ulRef,
        "style": {
          position: "relative"
        }
      }, [units.map((unit) => {
        if (hideDisabledOptions && unit.disabled) {
          return null;
        }
        return createVNode("li", {
          "key": unit.value,
          "ref": (element) => {
            liRefs.value.set(unit.value, element);
          },
          "class": classNames(cellPrefixCls, {
            [`${cellPrefixCls}-disabled`]: unit.disabled,
            [`${cellPrefixCls}-selected`]: value === unit.value
          }),
          "onClick": () => {
            if (unit.disabled) {
              return;
            }
            onSelect(unit.value);
          }
        }, [createVNode("div", {
          "class": `${cellPrefixCls}-inner`
        }, [unit.label])]);
      })]);
    };
  }
});
function leftPad(str, length) {
  let fill = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  let current = String(str);
  while (current.length < length) {
    current = `${fill}${str}`;
  }
  return current;
}
const tuple = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
function toArray$2(val) {
  if (val === null || val === void 0) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
}
function getDataOrAriaProps(props) {
  const retProps = {};
  Object.keys(props).forEach((key2) => {
    if ((key2.startsWith("data-") || key2.startsWith("aria-") || key2 === "role" || key2 === "name") && !key2.startsWith("data-__")) {
      retProps[key2] = props[key2];
    }
  });
  return retProps;
}
function getValue(values, index2) {
  return values ? values[index2] : null;
}
function updateValues(values, value, index2) {
  const newValues = [getValue(values, 0), getValue(values, 1)];
  newValues[index2] = typeof value === "function" ? value(newValues[index2]) : value;
  if (!newValues[0] && !newValues[1]) {
    return null;
  }
  return newValues;
}
function generateUnits(start, end, step, disabledUnits) {
  const units = [];
  for (let i = start; i <= end; i += step) {
    units.push({
      label: leftPad(i, 2),
      value: i,
      disabled: (disabledUnits || []).includes(i)
    });
  }
  return units;
}
const TimeBody = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TimeBody",
  inheritAttrs: false,
  props: ["generateConfig", "prefixCls", "operationRef", "activeColumnIndex", "value", "showHour", "showMinute", "showSecond", "use12Hours", "hourStep", "minuteStep", "secondStep", "disabledHours", "disabledMinutes", "disabledSeconds", "disabledTime", "hideDisabledOptions", "onSelect"],
  setup(props) {
    const originHour = computed(() => props.value ? props.generateConfig.getHour(props.value) : -1);
    const isPM = computed(() => {
      if (props.use12Hours) {
        return originHour.value >= 12;
      } else {
        return false;
      }
    });
    const hour = computed(() => {
      if (props.use12Hours) {
        return originHour.value % 12;
      } else {
        return originHour.value;
      }
    });
    const minute = computed(() => props.value ? props.generateConfig.getMinute(props.value) : -1);
    const second = computed(() => props.value ? props.generateConfig.getSecond(props.value) : -1);
    const now2 = ref(props.generateConfig.getNow());
    const mergedDisabledHours = ref();
    const mergedDisabledMinutes = ref();
    const mergedDisabledSeconds = ref();
    onBeforeUpdate(() => {
      now2.value = props.generateConfig.getNow();
    });
    watchEffect(() => {
      if (props.disabledTime) {
        const disabledConfig = props.disabledTime(now2);
        [mergedDisabledHours.value, mergedDisabledMinutes.value, mergedDisabledSeconds.value] = [disabledConfig.disabledHours, disabledConfig.disabledMinutes, disabledConfig.disabledSeconds];
      } else {
        [mergedDisabledHours.value, mergedDisabledMinutes.value, mergedDisabledSeconds.value] = [props.disabledHours, props.disabledMinutes, props.disabledSeconds];
      }
    });
    const setTime$1 = (isNewPM, newHour, newMinute, newSecond) => {
      let newDate = props.value || props.generateConfig.getNow();
      const mergedHour = Math.max(0, newHour);
      const mergedMinute = Math.max(0, newMinute);
      const mergedSecond = Math.max(0, newSecond);
      newDate = setTime(props.generateConfig, newDate, !props.use12Hours || !isNewPM ? mergedHour : mergedHour + 12, mergedMinute, mergedSecond);
      return newDate;
    };
    const rawHours = computed(() => {
      var _a2;
      return generateUnits(0, 23, (_a2 = props.hourStep) !== null && _a2 !== void 0 ? _a2 : 1, mergedDisabledHours.value && mergedDisabledHours.value());
    });
    const AMPMDisabled = computed(() => {
      if (!props.use12Hours) {
        return [false, false];
      }
      const AMPMDisabled2 = [true, true];
      rawHours.value.forEach((_ref) => {
        let {
          disabled,
          value: hourValue
        } = _ref;
        if (disabled) return;
        if (hourValue >= 12) {
          AMPMDisabled2[1] = false;
        } else {
          AMPMDisabled2[0] = false;
        }
      });
      return AMPMDisabled2;
    });
    const hours = computed(() => {
      if (!props.use12Hours) return rawHours.value;
      return rawHours.value.filter(isPM.value ? (hourMeta) => hourMeta.value >= 12 : (hourMeta) => hourMeta.value < 12).map((hourMeta) => {
        const hourValue = hourMeta.value % 12;
        const hourLabel = hourValue === 0 ? "12" : leftPad(hourValue, 2);
        return _extends(_extends({}, hourMeta), {
          label: hourLabel,
          value: hourValue
        });
      });
    });
    const minutes = computed(() => {
      var _a2;
      return generateUnits(0, 59, (_a2 = props.minuteStep) !== null && _a2 !== void 0 ? _a2 : 1, mergedDisabledMinutes.value && mergedDisabledMinutes.value(originHour.value));
    });
    const seconds = computed(() => {
      var _a2;
      return generateUnits(0, 59, (_a2 = props.secondStep) !== null && _a2 !== void 0 ? _a2 : 1, mergedDisabledSeconds.value && mergedDisabledSeconds.value(originHour.value, minute.value));
    });
    return () => {
      const {
        prefixCls,
        operationRef,
        activeColumnIndex,
        showHour,
        showMinute,
        showSecond,
        use12Hours,
        hideDisabledOptions,
        onSelect
      } = props;
      const columns = [];
      const contentPrefixCls = `${prefixCls}-content`;
      const columnPrefixCls = `${prefixCls}-time-panel`;
      operationRef.value = {
        onUpDown: (diff) => {
          const column = columns[activeColumnIndex];
          if (column) {
            const valueIndex = column.units.findIndex((unit) => unit.value === column.value);
            const unitLen = column.units.length;
            for (let i = 1; i < unitLen; i += 1) {
              const nextUnit = column.units[(valueIndex + diff * i + unitLen) % unitLen];
              if (nextUnit.disabled !== true) {
                column.onSelect(nextUnit.value);
                break;
              }
            }
          }
        }
      };
      function addColumnNode(condition, node, columnValue, units, onColumnSelect) {
        if (condition !== false) {
          columns.push({
            node: cloneElement(node, {
              prefixCls: columnPrefixCls,
              value: columnValue,
              active: activeColumnIndex === columns.length,
              onSelect: onColumnSelect,
              units,
              hideDisabledOptions
            }),
            onSelect: onColumnSelect,
            value: columnValue,
            units
          });
        }
      }
      addColumnNode(showHour, createVNode(TimeUnitColumn, {
        "key": "hour"
      }, null), hour.value, hours.value, (num) => {
        onSelect(setTime$1(isPM.value, num, minute.value, second.value), "mouse");
      });
      addColumnNode(showMinute, createVNode(TimeUnitColumn, {
        "key": "minute"
      }, null), minute.value, minutes.value, (num) => {
        onSelect(setTime$1(isPM.value, hour.value, num, second.value), "mouse");
      });
      addColumnNode(showSecond, createVNode(TimeUnitColumn, {
        "key": "second"
      }, null), second.value, seconds.value, (num) => {
        onSelect(setTime$1(isPM.value, hour.value, minute.value, num), "mouse");
      });
      let PMIndex = -1;
      if (typeof isPM.value === "boolean") {
        PMIndex = isPM.value ? 1 : 0;
      }
      addColumnNode(use12Hours === true, createVNode(TimeUnitColumn, {
        "key": "12hours"
      }, null), PMIndex, [{
        label: "AM",
        value: 0,
        disabled: AMPMDisabled.value[0]
      }, {
        label: "PM",
        value: 1,
        disabled: AMPMDisabled.value[1]
      }], (num) => {
        onSelect(setTime$1(!!num, hour.value, minute.value, second.value), "mouse");
      });
      return createVNode("div", {
        "class": contentPrefixCls
      }, [columns.map((_ref2) => {
        let {
          node
        } = _ref2;
        return node;
      })]);
    };
  }
});
const countBoolean = (boolList) => boolList.filter((bool) => bool !== false).length;
function TimePanel(_props) {
  const props = useMergeProps(_props);
  const {
    generateConfig: generateConfig2,
    format = "HH:mm:ss",
    prefixCls,
    active,
    operationRef,
    showHour,
    showMinute,
    showSecond,
    use12Hours = false,
    onSelect,
    value
  } = props;
  const panelPrefixCls = `${prefixCls}-time-panel`;
  const bodyOperationRef = ref();
  const activeColumnIndex = ref(-1);
  const columnsCount = countBoolean([showHour, showMinute, showSecond, use12Hours]);
  operationRef.value = {
    onKeydown: (event) => createKeydownHandler(event, {
      onLeftRight: (diff) => {
        activeColumnIndex.value = (activeColumnIndex.value + diff + columnsCount) % columnsCount;
      },
      onUpDown: (diff) => {
        if (activeColumnIndex.value === -1) {
          activeColumnIndex.value = 0;
        } else if (bodyOperationRef.value) {
          bodyOperationRef.value.onUpDown(diff);
        }
      },
      onEnter: () => {
        onSelect(value || generateConfig2.getNow(), "key");
        activeColumnIndex.value = -1;
      }
    }),
    onBlur: () => {
      activeColumnIndex.value = -1;
    }
  };
  return createVNode("div", {
    "class": classNames(panelPrefixCls, {
      [`${panelPrefixCls}-active`]: active
    })
  }, [createVNode(TimeHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    "format": format,
    "prefixCls": prefixCls
  }), null), createVNode(TimeBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "activeColumnIndex": activeColumnIndex.value,
    "operationRef": bodyOperationRef
  }), null)]);
}
TimePanel.displayName = "TimePanel";
TimePanel.inheritAttrs = false;
function useCellClassName(_ref) {
  let {
    cellPrefixCls,
    generateConfig: generateConfig2,
    rangedValue,
    hoverRangedValue,
    isInView,
    isSameCell,
    offsetCell,
    today,
    value
  } = _ref;
  function getClassName(currentDate) {
    const prevDate = offsetCell(currentDate, -1);
    const nextDate = offsetCell(currentDate, 1);
    const rangeStart = getValue(rangedValue, 0);
    const rangeEnd = getValue(rangedValue, 1);
    const hoverStart = getValue(hoverRangedValue, 0);
    const hoverEnd = getValue(hoverRangedValue, 1);
    const isRangeHovered = isInRange(generateConfig2, hoverStart, hoverEnd, currentDate);
    function isRangeStart(date) {
      return isSameCell(rangeStart, date);
    }
    function isRangeEnd(date) {
      return isSameCell(rangeEnd, date);
    }
    const isHoverStart = isSameCell(hoverStart, currentDate);
    const isHoverEnd = isSameCell(hoverEnd, currentDate);
    const isHoverEdgeStart = (isRangeHovered || isHoverEnd) && (!isInView(prevDate) || isRangeEnd(prevDate));
    const isHoverEdgeEnd = (isRangeHovered || isHoverStart) && (!isInView(nextDate) || isRangeStart(nextDate));
    return {
      // In view
      [`${cellPrefixCls}-in-view`]: isInView(currentDate),
      // Range
      [`${cellPrefixCls}-in-range`]: isInRange(generateConfig2, rangeStart, rangeEnd, currentDate),
      [`${cellPrefixCls}-range-start`]: isRangeStart(currentDate),
      [`${cellPrefixCls}-range-end`]: isRangeEnd(currentDate),
      [`${cellPrefixCls}-range-start-single`]: isRangeStart(currentDate) && !rangeEnd,
      [`${cellPrefixCls}-range-end-single`]: isRangeEnd(currentDate) && !rangeStart,
      [`${cellPrefixCls}-range-start-near-hover`]: isRangeStart(currentDate) && (isSameCell(prevDate, hoverStart) || isInRange(generateConfig2, hoverStart, hoverEnd, prevDate)),
      [`${cellPrefixCls}-range-end-near-hover`]: isRangeEnd(currentDate) && (isSameCell(nextDate, hoverEnd) || isInRange(generateConfig2, hoverStart, hoverEnd, nextDate)),
      // Range Hover
      [`${cellPrefixCls}-range-hover`]: isRangeHovered,
      [`${cellPrefixCls}-range-hover-start`]: isHoverStart,
      [`${cellPrefixCls}-range-hover-end`]: isHoverEnd,
      // Range Edge
      [`${cellPrefixCls}-range-hover-edge-start`]: isHoverEdgeStart,
      [`${cellPrefixCls}-range-hover-edge-end`]: isHoverEdgeEnd,
      [`${cellPrefixCls}-range-hover-edge-start-near-range`]: isHoverEdgeStart && isSameCell(prevDate, rangeEnd),
      [`${cellPrefixCls}-range-hover-edge-end-near-range`]: isHoverEdgeEnd && isSameCell(nextDate, rangeStart),
      // Others
      [`${cellPrefixCls}-today`]: isSameCell(today, currentDate),
      [`${cellPrefixCls}-selected`]: isSameCell(value, currentDate)
    };
  }
  return getClassName;
}
const RangeContextKey = Symbol("RangeContextProps");
const useProvideRange = (props) => {
  provide(RangeContextKey, props);
};
const useInjectRange = () => {
  return inject(RangeContextKey, {
    rangedValue: ref(),
    hoverRangedValue: ref(),
    inRange: ref(),
    panelPosition: ref()
  });
};
const RangeContextProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PanelContextProvider",
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const value = {
      rangedValue: ref(props.value.rangedValue),
      hoverRangedValue: ref(props.value.hoverRangedValue),
      inRange: ref(props.value.inRange),
      panelPosition: ref(props.value.panelPosition)
    };
    useProvideRange(value);
    watch(() => props.value, () => {
      Object.keys(props.value).forEach((key2) => {
        if (value[key2]) {
          value[key2].value = props.value[key2];
        }
      });
    });
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
function DateBody(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    prefixColumn,
    locale: locale2,
    rowCount,
    viewDate,
    value,
    dateRender
  } = props;
  const {
    rangedValue,
    hoverRangedValue
  } = useInjectRange();
  const baseDate = getWeekStartDate(locale2.locale, generateConfig2, viewDate);
  const cellPrefixCls = `${prefixCls}-cell`;
  const weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2.locale);
  const today = generateConfig2.getNow();
  const headerCells = [];
  const weekDaysLocale = locale2.shortWeekDays || (generateConfig2.locale.getShortWeekDays ? generateConfig2.locale.getShortWeekDays(locale2.locale) : []);
  if (prefixColumn) {
    headerCells.push(createVNode("th", {
      "key": "empty",
      "aria-label": "empty cell"
    }, null));
  }
  for (let i = 0; i < WEEK_DAY_COUNT; i += 1) {
    headerCells.push(createVNode("th", {
      "key": i
    }, [weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]]));
  }
  const getCellClassName = useCellClassName({
    cellPrefixCls,
    today,
    value,
    generateConfig: generateConfig2,
    rangedValue: prefixColumn ? null : rangedValue.value,
    hoverRangedValue: prefixColumn ? null : hoverRangedValue.value,
    isSameCell: (current, target) => isSameDate(generateConfig2, current, target),
    isInView: (date) => isSameMonth(generateConfig2, date, viewDate),
    offsetCell: (date, offset) => generateConfig2.addDate(date, offset)
  });
  const getCellNode = dateRender ? (date) => dateRender({
    current: date,
    today
  }) : void 0;
  return createVNode(PanelBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "rowNum": rowCount,
    "colNum": WEEK_DAY_COUNT,
    "baseDate": baseDate,
    "getCellNode": getCellNode,
    "getCellText": generateConfig2.getDate,
    "getCellClassName": getCellClassName,
    "getCellDate": generateConfig2.addDate,
    "titleCell": (date) => formatValue(date, {
      locale: locale2,
      format: "YYYY-MM-DD",
      generateConfig: generateConfig2
    }),
    "headerCells": headerCells
  }), null);
}
DateBody.displayName = "DateBody";
DateBody.inheritAttrs = false;
DateBody.props = [
  "prefixCls",
  "generateConfig",
  "value?",
  "viewDate",
  "locale",
  "rowCount",
  "onSelect",
  "dateRender?",
  "disabledDate?",
  // Used for week panel
  "prefixColumn?",
  "rowClassName?"
];
function DateHeader(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    locale: locale2,
    viewDate,
    onNextMonth,
    onPrevMonth,
    onNextYear,
    onPrevYear,
    onYearClick,
    onMonthClick
  } = props;
  const {
    hideHeader
  } = useInjectPanel();
  if (hideHeader.value) {
    return null;
  }
  const headerPrefixCls = `${prefixCls}-header`;
  const monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  const month = generateConfig2.getMonth(viewDate);
  const yearNode = createVNode("button", {
    "type": "button",
    "key": "year",
    "onClick": onYearClick,
    "tabindex": -1,
    "class": `${prefixCls}-year-btn`
  }, [formatValue(viewDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  })]);
  const monthNode = createVNode("button", {
    "type": "button",
    "key": "month",
    "onClick": onMonthClick,
    "tabindex": -1,
    "class": `${prefixCls}-month-btn`
  }, [locale2.monthFormat ? formatValue(viewDate, {
    locale: locale2,
    format: locale2.monthFormat,
    generateConfig: generateConfig2
  }) : monthsLocale[month]]);
  const monthYearNodes = locale2.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
  return createVNode(Header$1, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": headerPrefixCls,
    "onSuperPrev": onPrevYear,
    "onPrev": onPrevMonth,
    "onNext": onNextMonth,
    "onSuperNext": onNextYear
  }), {
    default: () => [monthYearNodes]
  });
}
DateHeader.displayName = "DateHeader";
DateHeader.inheritAttrs = false;
const DATE_ROW_COUNT = 6;
function DatePanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    panelName = "date",
    keyboardConfig,
    active,
    operationRef,
    generateConfig: generateConfig2,
    value,
    viewDate,
    onViewDateChange,
    onPanelChange,
    onSelect
  } = props;
  const panelPrefixCls = `${prefixCls}-${panelName}-panel`;
  operationRef.value = {
    onKeydown: (event) => createKeydownHandler(event, _extends({
      onLeftRight: (diff) => {
        onSelect(generateConfig2.addDate(value || viewDate, diff), "key");
      },
      onCtrlLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff), "key");
      },
      onUpDown: (diff) => {
        onSelect(generateConfig2.addDate(value || viewDate, diff * WEEK_DAY_COUNT), "key");
      },
      onPageUpDown: (diff) => {
        onSelect(generateConfig2.addMonth(value || viewDate, diff), "key");
      }
    }, keyboardConfig))
  };
  const onYearChange = (diff) => {
    const newDate = generateConfig2.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  const onMonthChange = (diff) => {
    const newDate = generateConfig2.addMonth(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  return createVNode("div", {
    "class": classNames(panelPrefixCls, {
      [`${panelPrefixCls}-active`]: active
    })
  }, [createVNode(DateHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "value": value,
    "viewDate": viewDate,
    "onPrevYear": () => {
      onYearChange(-1);
    },
    "onNextYear": () => {
      onYearChange(1);
    },
    "onPrevMonth": () => {
      onMonthChange(-1);
    },
    "onNextMonth": () => {
      onMonthChange(1);
    },
    "onMonthClick": () => {
      onPanelChange("month", viewDate);
    },
    "onYearClick": () => {
      onPanelChange("year", viewDate);
    }
  }), null), createVNode(DateBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "onSelect": (date) => onSelect(date, "mouse"),
    "prefixCls": prefixCls,
    "value": value,
    "viewDate": viewDate,
    "rowCount": DATE_ROW_COUNT
  }), null)]);
}
DatePanel.displayName = "DatePanel";
DatePanel.inheritAttrs = false;
const ACTIVE_PANEL = tuple("date", "time");
function DatetimePanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    operationRef,
    generateConfig: generateConfig2,
    value,
    defaultValue,
    disabledTime,
    showTime,
    onSelect
  } = props;
  const panelPrefixCls = `${prefixCls}-datetime-panel`;
  const activePanel = ref(null);
  const dateOperationRef = ref({});
  const timeOperationRef = ref({});
  const timeProps = typeof showTime === "object" ? _extends({}, showTime) : {};
  function getNextActive(offset) {
    const activeIndex = ACTIVE_PANEL.indexOf(activePanel.value) + offset;
    const nextActivePanel = ACTIVE_PANEL[activeIndex] || null;
    return nextActivePanel;
  }
  const onBlur = (e) => {
    if (timeOperationRef.value.onBlur) {
      timeOperationRef.value.onBlur(e);
    }
    activePanel.value = null;
  };
  operationRef.value = {
    onKeydown: (event) => {
      if (event.which === KeyCode.TAB) {
        const nextActivePanel = getNextActive(event.shiftKey ? -1 : 1);
        activePanel.value = nextActivePanel;
        if (nextActivePanel) {
          event.preventDefault();
        }
        return true;
      }
      if (activePanel.value) {
        const ref2 = activePanel.value === "date" ? dateOperationRef : timeOperationRef;
        if (ref2.value && ref2.value.onKeydown) {
          ref2.value.onKeydown(event);
        }
        return true;
      }
      if ([KeyCode.LEFT, KeyCode.RIGHT, KeyCode.UP, KeyCode.DOWN].includes(event.which)) {
        activePanel.value = "date";
        return true;
      }
      return false;
    },
    onBlur,
    onClose: onBlur
  };
  const onInternalSelect = (date, source) => {
    let selectedDate = date;
    if (source === "date" && !value && timeProps.defaultValue) {
      selectedDate = generateConfig2.setHour(selectedDate, generateConfig2.getHour(timeProps.defaultValue));
      selectedDate = generateConfig2.setMinute(selectedDate, generateConfig2.getMinute(timeProps.defaultValue));
      selectedDate = generateConfig2.setSecond(selectedDate, generateConfig2.getSecond(timeProps.defaultValue));
    } else if (source === "time" && !value && defaultValue) {
      selectedDate = generateConfig2.setYear(selectedDate, generateConfig2.getYear(defaultValue));
      selectedDate = generateConfig2.setMonth(selectedDate, generateConfig2.getMonth(defaultValue));
      selectedDate = generateConfig2.setDate(selectedDate, generateConfig2.getDate(defaultValue));
    }
    if (onSelect) {
      onSelect(selectedDate, "mouse");
    }
  };
  const disabledTimes = disabledTime ? disabledTime(value || null) : {};
  return createVNode("div", {
    "class": classNames(panelPrefixCls, {
      [`${panelPrefixCls}-active`]: activePanel.value
    })
  }, [createVNode(DatePanel, _objectSpread2(_objectSpread2({}, props), {}, {
    "operationRef": dateOperationRef,
    "active": activePanel.value === "date",
    "onSelect": (date) => {
      onInternalSelect(setDateTime(generateConfig2, date, !value && typeof showTime === "object" ? showTime.defaultValue : null), "date");
    }
  }), null), createVNode(TimePanel, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, props), {}, {
    "format": void 0
  }, timeProps), disabledTimes), {}, {
    "disabledTime": null,
    "defaultValue": void 0,
    "operationRef": timeOperationRef,
    "active": activePanel.value === "time",
    "onSelect": (date) => {
      onInternalSelect(date, "time");
    }
  }), null)]);
}
DatetimePanel.displayName = "DatetimePanel";
DatetimePanel.inheritAttrs = false;
function WeekPanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    locale: locale2,
    value
  } = props;
  const cellPrefixCls = `${prefixCls}-cell`;
  const prefixColumn = (date) => createVNode("td", {
    "key": "week",
    "class": classNames(cellPrefixCls, `${cellPrefixCls}-week`)
  }, [generateConfig2.locale.getWeek(locale2.locale, date)]);
  const rowPrefixCls = `${prefixCls}-week-panel-row`;
  const rowClassName = (date) => classNames(rowPrefixCls, {
    [`${rowPrefixCls}-selected`]: isSameWeek(generateConfig2, locale2.locale, value, date)
  });
  return createVNode(DatePanel, _objectSpread2(_objectSpread2({}, props), {}, {
    "panelName": "week",
    "prefixColumn": prefixColumn,
    "rowClassName": rowClassName,
    "keyboardConfig": {
      onLeftRight: null
    }
  }), null);
}
WeekPanel.displayName = "WeekPanel";
WeekPanel.inheritAttrs = false;
function MonthHeader(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    locale: locale2,
    viewDate,
    onNextYear,
    onPrevYear,
    onYearClick
  } = props;
  const {
    hideHeader
  } = useInjectPanel();
  if (hideHeader.value) {
    return null;
  }
  const headerPrefixCls = `${prefixCls}-header`;
  return createVNode(Header$1, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": headerPrefixCls,
    "onSuperPrev": onPrevYear,
    "onSuperNext": onNextYear
  }), {
    default: () => [createVNode("button", {
      "type": "button",
      "onClick": onYearClick,
      "class": `${prefixCls}-year-btn`
    }, [formatValue(viewDate, {
      locale: locale2,
      format: locale2.yearFormat,
      generateConfig: generateConfig2
    })])]
  });
}
MonthHeader.displayName = "MonthHeader";
MonthHeader.inheritAttrs = false;
const MONTH_COL_COUNT = 3;
const MONTH_ROW_COUNT = 4;
function MonthBody(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    locale: locale2,
    value,
    viewDate,
    generateConfig: generateConfig2,
    monthCellRender
  } = props;
  const {
    rangedValue,
    hoverRangedValue
  } = useInjectRange();
  const cellPrefixCls = `${prefixCls}-cell`;
  const getCellClassName = useCellClassName({
    cellPrefixCls,
    value,
    generateConfig: generateConfig2,
    rangedValue: rangedValue.value,
    hoverRangedValue: hoverRangedValue.value,
    isSameCell: (current, target) => isSameMonth(generateConfig2, current, target),
    isInView: () => true,
    offsetCell: (date, offset) => generateConfig2.addMonth(date, offset)
  });
  const monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  const baseMonth = generateConfig2.setMonth(viewDate, 0);
  const getCellNode = monthCellRender ? (date) => monthCellRender({
    current: date,
    locale: locale2
  }) : void 0;
  return createVNode(PanelBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "rowNum": MONTH_ROW_COUNT,
    "colNum": MONTH_COL_COUNT,
    "baseDate": baseMonth,
    "getCellNode": getCellNode,
    "getCellText": (date) => locale2.monthFormat ? formatValue(date, {
      locale: locale2,
      format: locale2.monthFormat,
      generateConfig: generateConfig2
    }) : monthsLocale[generateConfig2.getMonth(date)],
    "getCellClassName": getCellClassName,
    "getCellDate": generateConfig2.addMonth,
    "titleCell": (date) => formatValue(date, {
      locale: locale2,
      format: "YYYY-MM",
      generateConfig: generateConfig2
    })
  }), null);
}
MonthBody.displayName = "MonthBody";
MonthBody.inheritAttrs = false;
function MonthPanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig: generateConfig2,
    value,
    viewDate,
    onPanelChange,
    onSelect
  } = props;
  const panelPrefixCls = `${prefixCls}-month-panel`;
  operationRef.value = {
    onKeydown: (event) => createKeydownHandler(event, {
      onLeftRight: (diff) => {
        onSelect(generateConfig2.addMonth(value || viewDate, diff), "key");
      },
      onCtrlLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff), "key");
      },
      onUpDown: (diff) => {
        onSelect(generateConfig2.addMonth(value || viewDate, diff * MONTH_COL_COUNT), "key");
      },
      onEnter: () => {
        onPanelChange("date", value || viewDate);
      }
    })
  };
  const onYearChange = (diff) => {
    const newDate = generateConfig2.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  return createVNode("div", {
    "class": panelPrefixCls
  }, [createVNode(MonthHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onPrevYear": () => {
      onYearChange(-1);
    },
    "onNextYear": () => {
      onYearChange(1);
    },
    "onYearClick": () => {
      onPanelChange("year", viewDate);
    }
  }), null), createVNode(MonthBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onSelect": (date) => {
      onSelect(date, "mouse");
      onPanelChange("date", date);
    }
  }), null)]);
}
MonthPanel.displayName = "MonthPanel";
MonthPanel.inheritAttrs = false;
function QuarterHeader(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    locale: locale2,
    viewDate,
    onNextYear,
    onPrevYear,
    onYearClick
  } = props;
  const {
    hideHeader
  } = useInjectPanel();
  if (hideHeader.value) {
    return null;
  }
  const headerPrefixCls = `${prefixCls}-header`;
  return createVNode(Header$1, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": headerPrefixCls,
    "onSuperPrev": onPrevYear,
    "onSuperNext": onNextYear
  }), {
    default: () => [createVNode("button", {
      "type": "button",
      "onClick": onYearClick,
      "class": `${prefixCls}-year-btn`
    }, [formatValue(viewDate, {
      locale: locale2,
      format: locale2.yearFormat,
      generateConfig: generateConfig2
    })])]
  });
}
QuarterHeader.displayName = "QuarterHeader";
QuarterHeader.inheritAttrs = false;
const QUARTER_COL_COUNT = 4;
const QUARTER_ROW_COUNT = 1;
function QuarterBody(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    locale: locale2,
    value,
    viewDate,
    generateConfig: generateConfig2
  } = props;
  const {
    rangedValue,
    hoverRangedValue
  } = useInjectRange();
  const cellPrefixCls = `${prefixCls}-cell`;
  const getCellClassName = useCellClassName({
    cellPrefixCls,
    value,
    generateConfig: generateConfig2,
    rangedValue: rangedValue.value,
    hoverRangedValue: hoverRangedValue.value,
    isSameCell: (current, target) => isSameQuarter(generateConfig2, current, target),
    isInView: () => true,
    offsetCell: (date, offset) => generateConfig2.addMonth(date, offset * 3)
  });
  const baseQuarter = generateConfig2.setDate(generateConfig2.setMonth(viewDate, 0), 1);
  return createVNode(PanelBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "rowNum": QUARTER_ROW_COUNT,
    "colNum": QUARTER_COL_COUNT,
    "baseDate": baseQuarter,
    "getCellText": (date) => formatValue(date, {
      locale: locale2,
      format: locale2.quarterFormat || "[Q]Q",
      generateConfig: generateConfig2
    }),
    "getCellClassName": getCellClassName,
    "getCellDate": (date, offset) => generateConfig2.addMonth(date, offset * 3),
    "titleCell": (date) => formatValue(date, {
      locale: locale2,
      format: "YYYY-[Q]Q",
      generateConfig: generateConfig2
    })
  }), null);
}
QuarterBody.displayName = "QuarterBody";
QuarterBody.inheritAttrs = false;
function QuarterPanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig: generateConfig2,
    value,
    viewDate,
    onPanelChange,
    onSelect
  } = props;
  const panelPrefixCls = `${prefixCls}-quarter-panel`;
  operationRef.value = {
    onKeydown: (event) => createKeydownHandler(event, {
      onLeftRight: (diff) => {
        onSelect(generateConfig2.addMonth(value || viewDate, diff * 3), "key");
      },
      onCtrlLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff), "key");
      },
      onUpDown: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff), "key");
      }
    })
  };
  const onYearChange = (diff) => {
    const newDate = generateConfig2.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  return createVNode("div", {
    "class": panelPrefixCls
  }, [createVNode(QuarterHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onPrevYear": () => {
      onYearChange(-1);
    },
    "onNextYear": () => {
      onYearChange(1);
    },
    "onYearClick": () => {
      onPanelChange("year", viewDate);
    }
  }), null), createVNode(QuarterBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onSelect": (date) => {
      onSelect(date, "mouse");
    }
  }), null)]);
}
QuarterPanel.displayName = "QuarterPanel";
QuarterPanel.inheritAttrs = false;
function YearHeader(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    generateConfig: generateConfig2,
    viewDate,
    onPrevDecade,
    onNextDecade,
    onDecadeClick
  } = props;
  const {
    hideHeader
  } = useInjectPanel();
  if (hideHeader.value) {
    return null;
  }
  const headerPrefixCls = `${prefixCls}-header`;
  const yearNumber = generateConfig2.getYear(viewDate);
  const startYear = Math.floor(yearNumber / YEAR_DECADE_COUNT) * YEAR_DECADE_COUNT;
  const endYear = startYear + YEAR_DECADE_COUNT - 1;
  return createVNode(Header$1, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": headerPrefixCls,
    "onSuperPrev": onPrevDecade,
    "onSuperNext": onNextDecade
  }), {
    default: () => [createVNode("button", {
      "type": "button",
      "onClick": onDecadeClick,
      "class": `${prefixCls}-decade-btn`
    }, [startYear, createTextVNode("-"), endYear])]
  });
}
YearHeader.displayName = "YearHeader";
YearHeader.inheritAttrs = false;
const YEAR_COL_COUNT = 3;
const YEAR_ROW_COUNT = 4;
function YearBody(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    value,
    viewDate,
    locale: locale2,
    generateConfig: generateConfig2
  } = props;
  const {
    rangedValue,
    hoverRangedValue
  } = useInjectRange();
  const yearPrefixCls = `${prefixCls}-cell`;
  const yearNumber = generateConfig2.getYear(viewDate);
  const startYear = Math.floor(yearNumber / YEAR_DECADE_COUNT) * YEAR_DECADE_COUNT;
  const endYear = startYear + YEAR_DECADE_COUNT - 1;
  const baseYear = generateConfig2.setYear(viewDate, startYear - Math.ceil((YEAR_COL_COUNT * YEAR_ROW_COUNT - YEAR_DECADE_COUNT) / 2));
  const isInView = (date) => {
    const currentYearNumber = generateConfig2.getYear(date);
    return startYear <= currentYearNumber && currentYearNumber <= endYear;
  };
  const getCellClassName = useCellClassName({
    cellPrefixCls: yearPrefixCls,
    value,
    generateConfig: generateConfig2,
    rangedValue: rangedValue.value,
    hoverRangedValue: hoverRangedValue.value,
    isSameCell: (current, target) => isSameYear(generateConfig2, current, target),
    isInView,
    offsetCell: (date, offset) => generateConfig2.addYear(date, offset)
  });
  return createVNode(PanelBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "rowNum": YEAR_ROW_COUNT,
    "colNum": YEAR_COL_COUNT,
    "baseDate": baseYear,
    "getCellText": generateConfig2.getYear,
    "getCellClassName": getCellClassName,
    "getCellDate": generateConfig2.addYear,
    "titleCell": (date) => formatValue(date, {
      locale: locale2,
      format: "YYYY",
      generateConfig: generateConfig2
    })
  }), null);
}
YearBody.displayName = "YearBody";
YearBody.inheritAttrs = false;
const YEAR_DECADE_COUNT = 10;
function YearPanel(_props) {
  const props = useMergeProps(_props);
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig: generateConfig2,
    value,
    viewDate,
    sourceMode,
    onSelect,
    onPanelChange
  } = props;
  const panelPrefixCls = `${prefixCls}-year-panel`;
  operationRef.value = {
    onKeydown: (event) => createKeydownHandler(event, {
      onLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff), "key");
      },
      onCtrlLeftRight: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff * YEAR_DECADE_COUNT), "key");
      },
      onUpDown: (diff) => {
        onSelect(generateConfig2.addYear(value || viewDate, diff * YEAR_COL_COUNT), "key");
      },
      onEnter: () => {
        onPanelChange(sourceMode === "date" ? "date" : "month", value || viewDate);
      }
    })
  };
  const onDecadeChange = (diff) => {
    const newDate = generateConfig2.addYear(viewDate, diff * 10);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  return createVNode("div", {
    "class": panelPrefixCls
  }, [createVNode(YearHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onPrevDecade": () => {
      onDecadeChange(-1);
    },
    "onNextDecade": () => {
      onDecadeChange(1);
    },
    "onDecadeClick": () => {
      onPanelChange("decade", viewDate);
    }
  }), null), createVNode(YearBody, _objectSpread2(_objectSpread2({}, props), {}, {
    "prefixCls": prefixCls,
    "onSelect": (date) => {
      onPanelChange(sourceMode === "date" ? "date" : "month", date);
      onSelect(date, "mouse");
    }
  }), null)]);
}
YearPanel.displayName = "YearPanel";
YearPanel.inheritAttrs = false;
function getExtraFooter(prefixCls, mode, renderExtraFooter) {
  if (!renderExtraFooter) {
    return null;
  }
  return createVNode("div", {
    "class": `${prefixCls}-footer-extra`
  }, [renderExtraFooter(mode)]);
}
function getRanges(_ref) {
  let {
    prefixCls,
    components = {},
    needConfirmButton,
    onNow,
    onOk,
    okDisabled,
    showNow,
    locale: locale2
  } = _ref;
  let presetNode;
  let okNode;
  if (needConfirmButton) {
    const Button2 = components.button || "button";
    if (onNow && showNow !== false) {
      presetNode = createVNode("li", {
        "class": `${prefixCls}-now`
      }, [createVNode("a", {
        "class": `${prefixCls}-now-btn`,
        "onClick": onNow
      }, [locale2.now])]);
    }
    okNode = needConfirmButton && createVNode("li", {
      "class": `${prefixCls}-ok`
    }, [createVNode(Button2, {
      "disabled": okDisabled,
      "onClick": (e) => {
        e.stopPropagation();
        onOk && onOk();
      }
    }, {
      default: () => [locale2.ok]
    })]);
  }
  if (!presetNode && !okNode) {
    return null;
  }
  return createVNode("ul", {
    "class": `${prefixCls}-ranges`
  }, [presetNode, okNode]);
}
function PickerPanel() {
  return defineComponent({
    name: "PickerPanel",
    inheritAttrs: false,
    props: {
      prefixCls: String,
      locale: Object,
      generateConfig: Object,
      value: Object,
      defaultValue: Object,
      pickerValue: Object,
      defaultPickerValue: Object,
      disabledDate: Function,
      mode: String,
      picker: {
        type: String,
        default: "date"
      },
      tabindex: {
        type: [Number, String],
        default: 0
      },
      showNow: {
        type: Boolean,
        default: void 0
      },
      showTime: [Boolean, Object],
      showToday: Boolean,
      renderExtraFooter: Function,
      dateRender: Function,
      hideHeader: {
        type: Boolean,
        default: void 0
      },
      onSelect: Function,
      onChange: Function,
      onPanelChange: Function,
      onMousedown: Function,
      onPickerValueChange: Function,
      onOk: Function,
      components: Object,
      direction: String,
      hourStep: {
        type: Number,
        default: 1
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      secondStep: {
        type: Number,
        default: 1
      }
    },
    setup(props, _ref) {
      let {
        attrs
      } = _ref;
      const needConfirmButton = computed(() => props.picker === "date" && !!props.showTime || props.picker === "time");
      const isHourStepValid = computed(() => 24 % props.hourStep === 0);
      const isMinuteStepValid = computed(() => 60 % props.minuteStep === 0);
      const isSecondStepValid = computed(() => 60 % props.secondStep === 0);
      const panelContext = useInjectPanel();
      const {
        operationRef,
        onSelect: onContextSelect,
        hideRanges,
        defaultOpenValue
      } = panelContext;
      const {
        inRange,
        panelPosition,
        rangedValue,
        hoverRangedValue
      } = useInjectRange();
      const panelRef = ref({});
      const [mergedValue, setInnerValue] = useMergedState(null, {
        value: toRef(props, "value"),
        defaultValue: props.defaultValue,
        postState: (val) => {
          if (!val && (defaultOpenValue === null || defaultOpenValue === void 0 ? void 0 : defaultOpenValue.value) && props.picker === "time") {
            return defaultOpenValue.value;
          }
          return val;
        }
      });
      const [viewDate, setInnerViewDate] = useMergedState(null, {
        value: toRef(props, "pickerValue"),
        defaultValue: props.defaultPickerValue || mergedValue.value,
        postState: (date) => {
          const {
            generateConfig: generateConfig2,
            showTime,
            defaultValue
          } = props;
          const now2 = generateConfig2.getNow();
          if (!date) return now2;
          if (!mergedValue.value && props.showTime) {
            if (typeof showTime === "object") {
              return setDateTime(generateConfig2, Array.isArray(date) ? date[0] : date, showTime.defaultValue || now2);
            }
            if (defaultValue) {
              return setDateTime(generateConfig2, Array.isArray(date) ? date[0] : date, defaultValue);
            }
            return setDateTime(generateConfig2, Array.isArray(date) ? date[0] : date, now2);
          }
          return date;
        }
      });
      const setViewDate = (date) => {
        setInnerViewDate(date);
        if (props.onPickerValueChange) {
          props.onPickerValueChange(date);
        }
      };
      const getInternalNextMode = (nextMode) => {
        const getNextMode = PickerModeMap[props.picker];
        if (getNextMode) {
          return getNextMode(nextMode);
        }
        return nextMode;
      };
      const [mergedMode, setInnerMode] = useMergedState(() => {
        if (props.picker === "time") {
          return "time";
        }
        return getInternalNextMode("date");
      }, {
        value: toRef(props, "mode")
      });
      watch(() => props.picker, () => {
        setInnerMode(props.picker);
      });
      const sourceMode = ref(mergedMode.value);
      const setSourceMode = (val) => {
        sourceMode.value = val;
      };
      const onInternalPanelChange = (newMode, viewValue) => {
        const {
          onPanelChange,
          generateConfig: generateConfig2
        } = props;
        const nextMode = getInternalNextMode(newMode || mergedMode.value);
        setSourceMode(mergedMode.value);
        setInnerMode(nextMode);
        if (onPanelChange && (mergedMode.value !== nextMode || isEqual(generateConfig2, viewDate.value, viewDate.value))) {
          onPanelChange(viewValue, nextMode);
        }
      };
      const triggerSelect = function(date, type) {
        let forceTriggerSelect = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        const {
          picker,
          generateConfig: generateConfig2,
          onSelect,
          onChange,
          disabledDate
        } = props;
        if (mergedMode.value === picker || forceTriggerSelect) {
          setInnerValue(date);
          if (onSelect) {
            onSelect(date);
          }
          if (onContextSelect) {
            onContextSelect(date, type);
          }
          if (onChange && !isEqual(generateConfig2, date, mergedValue.value) && !(disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date))) {
            onChange(date);
          }
        }
      };
      const onInternalKeydown = (e) => {
        if (panelRef.value && panelRef.value.onKeydown) {
          if ([KeyCode.LEFT, KeyCode.RIGHT, KeyCode.UP, KeyCode.DOWN, KeyCode.PAGE_UP, KeyCode.PAGE_DOWN, KeyCode.ENTER].includes(e.which)) {
            e.preventDefault();
          }
          return panelRef.value.onKeydown(e);
        }
        {
          return false;
        }
      };
      const onInternalBlur = (e) => {
        if (panelRef.value && panelRef.value.onBlur) {
          panelRef.value.onBlur(e);
        }
      };
      const onNow = () => {
        const {
          generateConfig: generateConfig2,
          hourStep,
          minuteStep,
          secondStep
        } = props;
        const now2 = generateConfig2.getNow();
        const lowerBoundTime = getLowerBoundTime(generateConfig2.getHour(now2), generateConfig2.getMinute(now2), generateConfig2.getSecond(now2), isHourStepValid.value ? hourStep : 1, isMinuteStepValid.value ? minuteStep : 1, isSecondStepValid.value ? secondStep : 1);
        const adjustedNow = setTime(
          generateConfig2,
          now2,
          lowerBoundTime[0],
          // hour
          lowerBoundTime[1],
          // minute
          lowerBoundTime[2]
        );
        triggerSelect(adjustedNow, "submit");
      };
      const classString = computed(() => {
        const {
          prefixCls,
          direction
        } = props;
        return classNames(`${prefixCls}-panel`, {
          [`${prefixCls}-panel-has-range`]: rangedValue && rangedValue.value && rangedValue.value[0] && rangedValue.value[1],
          [`${prefixCls}-panel-has-range-hover`]: hoverRangedValue && hoverRangedValue.value && hoverRangedValue.value[0] && hoverRangedValue.value[1],
          [`${prefixCls}-panel-rtl`]: direction === "rtl"
        });
      });
      useProvidePanel(_extends(_extends({}, panelContext), {
        mode: mergedMode,
        hideHeader: computed(() => {
          var _a2;
          return props.hideHeader !== void 0 ? props.hideHeader : (_a2 = panelContext.hideHeader) === null || _a2 === void 0 ? void 0 : _a2.value;
        }),
        hidePrevBtn: computed(() => inRange.value && panelPosition.value === "right"),
        hideNextBtn: computed(() => inRange.value && panelPosition.value === "left")
      }));
      watch(() => props.value, () => {
        if (props.value) {
          setInnerViewDate(props.value);
        }
      });
      return () => {
        const {
          prefixCls = "ant-picker",
          locale: locale2,
          generateConfig: generateConfig2,
          disabledDate,
          picker = "date",
          tabindex = 0,
          showNow,
          showTime,
          showToday,
          renderExtraFooter,
          onMousedown,
          onOk,
          components
        } = props;
        if (operationRef && panelPosition.value !== "right") {
          operationRef.value = {
            onKeydown: onInternalKeydown,
            onClose: () => {
              if (panelRef.value && panelRef.value.onClose) {
                panelRef.value.onClose();
              }
            }
          };
        }
        let panelNode;
        const pickerProps = _extends(_extends(_extends({}, attrs), props), {
          operationRef: panelRef,
          prefixCls,
          viewDate: viewDate.value,
          value: mergedValue.value,
          onViewDateChange: setViewDate,
          sourceMode: sourceMode.value,
          onPanelChange: onInternalPanelChange,
          disabledDate
        });
        delete pickerProps.onChange;
        delete pickerProps.onSelect;
        switch (mergedMode.value) {
          case "decade":
            panelNode = createVNode(DecadePanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
              "onSelect": (date, type) => {
                setViewDate(date);
                triggerSelect(date, type);
              }
            }), null);
            break;
          case "year":
            panelNode = createVNode(YearPanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
              "onSelect": (date, type) => {
                setViewDate(date);
                triggerSelect(date, type);
              }
            }), null);
            break;
          case "month":
            panelNode = createVNode(MonthPanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
              "onSelect": (date, type) => {
                setViewDate(date);
                triggerSelect(date, type);
              }
            }), null);
            break;
          case "quarter":
            panelNode = createVNode(QuarterPanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
              "onSelect": (date, type) => {
                setViewDate(date);
                triggerSelect(date, type);
              }
            }), null);
            break;
          case "week":
            panelNode = createVNode(WeekPanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
              "onSelect": (date, type) => {
                setViewDate(date);
                triggerSelect(date, type);
              }
            }), null);
            break;
          case "time":
            delete pickerProps.showTime;
            panelNode = createVNode(TimePanel, _objectSpread2(_objectSpread2(_objectSpread2({}, pickerProps), typeof showTime === "object" ? showTime : null), {}, {
              "onSelect": (date, type) => {
                setViewDate(date);
                triggerSelect(date, type);
              }
            }), null);
            break;
          default:
            if (showTime) {
              panelNode = createVNode(DatetimePanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
                "onSelect": (date, type) => {
                  setViewDate(date);
                  triggerSelect(date, type);
                }
              }), null);
            } else {
              panelNode = createVNode(DatePanel, _objectSpread2(_objectSpread2({}, pickerProps), {}, {
                "onSelect": (date, type) => {
                  setViewDate(date);
                  triggerSelect(date, type);
                }
              }), null);
            }
        }
        let extraFooter;
        let rangesNode;
        if (!(hideRanges === null || hideRanges === void 0 ? void 0 : hideRanges.value)) {
          extraFooter = getExtraFooter(prefixCls, mergedMode.value, renderExtraFooter);
          rangesNode = getRanges({
            prefixCls,
            components,
            needConfirmButton: needConfirmButton.value,
            okDisabled: !mergedValue.value || disabledDate && disabledDate(mergedValue.value),
            locale: locale2,
            showNow,
            onNow: needConfirmButton.value && onNow,
            onOk: () => {
              if (mergedValue.value) {
                triggerSelect(mergedValue.value, "submit", true);
                if (onOk) {
                  onOk(mergedValue.value);
                }
              }
            }
          });
        }
        let todayNode;
        if (showToday && mergedMode.value === "date" && picker === "date" && !showTime) {
          const now2 = generateConfig2.getNow();
          const todayCls = `${prefixCls}-today-btn`;
          const disabled = disabledDate && disabledDate(now2);
          todayNode = createVNode("a", {
            "class": classNames(todayCls, disabled && `${todayCls}-disabled`),
            "aria-disabled": disabled,
            "onClick": () => {
              if (!disabled) {
                triggerSelect(now2, "mouse", true);
              }
            }
          }, [locale2.today]);
        }
        return createVNode("div", {
          "tabindex": tabindex,
          "class": classNames(classString.value, attrs.class),
          "style": attrs.style,
          "onKeydown": onInternalKeydown,
          "onBlur": onInternalBlur,
          "onMousedown": onMousedown
        }, [panelNode, extraFooter || rangesNode || todayNode ? createVNode("div", {
          "class": `${prefixCls}-footer`
        }, [extraFooter, rangesNode, todayNode]) : null]);
      };
    }
  });
}
const InterPickerPanel = PickerPanel();
const PickerPanel$1 = (props) => createVNode(InterPickerPanel, props);
const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ["tl", "bl"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ["tr", "br"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ["bl", "tl"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ["br", "tr"],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};
function PickerTrigger(props, _ref) {
  let {
    slots
  } = _ref;
  const {
    prefixCls,
    popupStyle,
    visible,
    dropdownClassName,
    dropdownAlign,
    transitionName: transitionName2,
    getPopupContainer,
    range,
    popupPlacement,
    direction
  } = useMergeProps(props);
  const dropdownPrefixCls = `${prefixCls}-dropdown`;
  const getPopupPlacement = () => {
    if (popupPlacement !== void 0) {
      return popupPlacement;
    }
    return direction === "rtl" ? "bottomRight" : "bottomLeft";
  };
  return createVNode(Trigger, {
    "showAction": [],
    "hideAction": [],
    "popupPlacement": getPopupPlacement(),
    "builtinPlacements": BUILT_IN_PLACEMENTS,
    "prefixCls": dropdownPrefixCls,
    "popupTransitionName": transitionName2,
    "popupAlign": dropdownAlign,
    "popupVisible": visible,
    "popupClassName": classNames(dropdownClassName, {
      [`${dropdownPrefixCls}-range`]: range,
      [`${dropdownPrefixCls}-rtl`]: direction === "rtl"
    }),
    "popupStyle": popupStyle,
    "getPopupContainer": getPopupContainer
  }, {
    default: slots.default,
    popup: slots.popupElement
  });
}
const PresetPanel = defineComponent({
  name: "PresetPanel",
  props: {
    prefixCls: String,
    presets: {
      type: Array,
      default: () => []
    },
    onClick: Function,
    onHover: Function
  },
  setup(props) {
    return () => {
      if (!props.presets.length) {
        return null;
      }
      return createVNode("div", {
        "class": `${props.prefixCls}-presets`
      }, [createVNode("ul", null, [props.presets.map((_ref, index2) => {
        let {
          label,
          value
        } = _ref;
        return createVNode("li", {
          "key": index2,
          "onClick": (e) => {
            e.stopPropagation();
            props.onClick(value);
          },
          "onMouseenter": () => {
            var _a2;
            (_a2 = props.onHover) === null || _a2 === void 0 ? void 0 : _a2.call(props, value);
          },
          "onMouseleave": () => {
            var _a2;
            (_a2 = props.onHover) === null || _a2 === void 0 ? void 0 : _a2.call(props, null);
          }
        }, [label]);
      })])]);
    };
  }
});
function usePickerInput(_ref) {
  let {
    open,
    value,
    isClickOutside,
    triggerOpen,
    forwardKeydown,
    onKeydown,
    blurToCancel,
    onSubmit,
    onCancel,
    onFocus,
    onBlur
  } = _ref;
  const typing = shallowRef(false);
  const focused = shallowRef(false);
  const preventBlurRef = shallowRef(false);
  const valueChangedRef = shallowRef(false);
  const preventDefaultRef = shallowRef(false);
  const inputProps = computed(() => ({
    onMousedown: () => {
      typing.value = true;
      triggerOpen(true);
    },
    onKeydown: (e) => {
      const preventDefault = () => {
        preventDefaultRef.value = true;
      };
      onKeydown(e, preventDefault);
      if (preventDefaultRef.value) return;
      switch (e.which) {
        case KeyCode.ENTER: {
          if (!open.value) {
            triggerOpen(true);
          } else if (onSubmit() !== false) {
            typing.value = true;
          }
          e.preventDefault();
          return;
        }
        case KeyCode.TAB: {
          if (typing.value && open.value && !e.shiftKey) {
            typing.value = false;
            e.preventDefault();
          } else if (!typing.value && open.value) {
            if (!forwardKeydown(e) && e.shiftKey) {
              typing.value = true;
              e.preventDefault();
            }
          }
          return;
        }
        case KeyCode.ESC: {
          typing.value = true;
          onCancel();
          return;
        }
      }
      if (!open.value && ![KeyCode.SHIFT].includes(e.which)) {
        triggerOpen(true);
      } else if (!typing.value) {
        forwardKeydown(e);
      }
    },
    onFocus: (e) => {
      typing.value = true;
      focused.value = true;
      if (onFocus) {
        onFocus(e);
      }
    },
    onBlur: (e) => {
      if (preventBlurRef.value || !isClickOutside(document.activeElement)) {
        preventBlurRef.value = false;
        return;
      }
      if (blurToCancel.value) {
        setTimeout(() => {
          let {
            activeElement
          } = document;
          while (activeElement && activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
          if (isClickOutside(activeElement)) {
            onCancel();
          }
        }, 0);
      } else if (open.value) {
        triggerOpen(false);
        if (valueChangedRef.value) {
          onSubmit();
        }
      }
      focused.value = false;
      if (onBlur) {
        onBlur(e);
      }
    }
  }));
  watch(open, () => {
    valueChangedRef.value = false;
  });
  watch(value, () => {
    valueChangedRef.value = true;
  });
  const globalMousedownEvent = shallowRef();
  onMounted(() => {
    globalMousedownEvent.value = addGlobalMousedownEvent((e) => {
      const target = getTargetFromEvent(e);
      if (open.value) {
        const clickedOutside = isClickOutside(target);
        if (!clickedOutside) {
          preventBlurRef.value = true;
          wrapperRaf(() => {
            preventBlurRef.value = false;
          });
        } else if (!focused.value || clickedOutside) {
          triggerOpen(false);
        }
      }
    });
  });
  onBeforeUnmount(() => {
    globalMousedownEvent.value && globalMousedownEvent.value();
  });
  return [inputProps, {
    focused,
    typing
  }];
}
function useTextValueMapping(_ref) {
  let {
    valueTexts,
    onTextChange
  } = _ref;
  const text = ref("");
  function triggerTextChange(value) {
    text.value = value;
    onTextChange(value);
  }
  function resetText() {
    text.value = valueTexts.value[0];
  }
  watch(() => [...valueTexts.value], function(cur) {
    let pre = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    if (cur.join("||") !== pre.join("||") && valueTexts.value.every((valText) => valText !== text.value)) {
      resetText();
    }
  }, {
    immediate: true
  });
  return [text, triggerTextChange, resetText];
}
function useValueTexts(value, _ref) {
  let {
    formatList,
    generateConfig: generateConfig2,
    locale: locale2
  } = _ref;
  const texts = useMemo(() => {
    if (!value.value) {
      return [[""], ""];
    }
    let firstValueText2 = "";
    const fullValueTexts2 = [];
    for (let i = 0; i < formatList.value.length; i += 1) {
      const format = formatList.value[i];
      const formatStr = formatValue(value.value, {
        generateConfig: generateConfig2.value,
        locale: locale2.value,
        format
      });
      fullValueTexts2.push(formatStr);
      if (i === 0) {
        firstValueText2 = formatStr;
      }
    }
    return [fullValueTexts2, firstValueText2];
  }, [value, formatList], (next, prev) => prev[0] !== next[0] || !shallowequal(prev[1], next[1]));
  const fullValueTexts = computed(() => texts.value[0]);
  const firstValueText = computed(() => texts.value[1]);
  return [fullValueTexts, firstValueText];
}
function useHoverValue(valueText, _ref) {
  let {
    formatList,
    generateConfig: generateConfig2,
    locale: locale2
  } = _ref;
  const innerValue = ref(null);
  let rafId;
  function setValue(val) {
    let immediately = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    wrapperRaf.cancel(rafId);
    if (immediately) {
      innerValue.value = val;
      return;
    }
    rafId = wrapperRaf(() => {
      innerValue.value = val;
    });
  }
  const [, firstText] = useValueTexts(innerValue, {
    formatList,
    generateConfig: generateConfig2,
    locale: locale2
  });
  function onEnter(date) {
    setValue(date);
  }
  function onLeave() {
    let immediately = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    setValue(null, immediately);
  }
  watch(valueText, () => {
    onLeave(true);
  });
  onBeforeUnmount(() => {
    wrapperRaf.cancel(rafId);
  });
  return [firstText, onEnter, onLeave];
}
function usePresets(presets, legacyRanges) {
  return computed(() => {
    if (presets === null || presets === void 0 ? void 0 : presets.value) {
      return presets.value;
    }
    if (legacyRanges === null || legacyRanges === void 0 ? void 0 : legacyRanges.value) {
      warningOnce(false, "`ranges` is deprecated. Please use `presets` instead.");
      const rangeLabels = Object.keys(legacyRanges.value);
      return rangeLabels.map((label) => {
        const range = legacyRanges.value[label];
        const newValues = typeof range === "function" ? range() : range;
        return {
          label,
          value: newValues
        };
      });
    }
    return [];
  });
}
function Picker() {
  return defineComponent({
    name: "Picker",
    inheritAttrs: false,
    props: ["prefixCls", "id", "tabindex", "dropdownClassName", "dropdownAlign", "popupStyle", "transitionName", "generateConfig", "locale", "inputReadOnly", "allowClear", "autofocus", "showTime", "showNow", "showHour", "showMinute", "showSecond", "picker", "format", "use12Hours", "value", "defaultValue", "open", "defaultOpen", "defaultOpenValue", "suffixIcon", "presets", "clearIcon", "disabled", "disabledDate", "placeholder", "getPopupContainer", "panelRender", "inputRender", "onChange", "onOpenChange", "onPanelChange", "onFocus", "onBlur", "onMousedown", "onMouseup", "onMouseenter", "onMouseleave", "onContextmenu", "onClick", "onKeydown", "onSelect", "direction", "autocomplete", "showToday", "renderExtraFooter", "dateRender", "minuteStep", "hourStep", "secondStep", "hideDisabledOptions"],
    setup(props, _ref) {
      let {
        attrs,
        expose
      } = _ref;
      const inputRef = ref(null);
      const presets = computed(() => props.presets);
      const presetList = usePresets(presets);
      const picker = computed(() => {
        var _a2;
        return (_a2 = props.picker) !== null && _a2 !== void 0 ? _a2 : "date";
      });
      const needConfirmButton = computed(() => picker.value === "date" && !!props.showTime || picker.value === "time");
      const formatList = computed(() => toArray$2(getDefaultFormat(props.format, picker.value, props.showTime, props.use12Hours)));
      const panelDivRef = ref(null);
      const inputDivRef = ref(null);
      const containerRef = ref(null);
      const [mergedValue, setInnerValue] = useMergedState(null, {
        value: toRef(props, "value"),
        defaultValue: props.defaultValue
      });
      const selectedValue = ref(mergedValue.value);
      const setSelectedValue = (val) => {
        selectedValue.value = val;
      };
      const operationRef = ref(null);
      const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
        value: toRef(props, "open"),
        defaultValue: props.defaultOpen,
        postState: (postOpen) => props.disabled ? false : postOpen,
        onChange: (newOpen) => {
          if (props.onOpenChange) {
            props.onOpenChange(newOpen);
          }
          if (!newOpen && operationRef.value && operationRef.value.onClose) {
            operationRef.value.onClose();
          }
        }
      });
      const [valueTexts, firstValueText] = useValueTexts(selectedValue, {
        formatList,
        generateConfig: toRef(props, "generateConfig"),
        locale: toRef(props, "locale")
      });
      const [text, triggerTextChange, resetText] = useTextValueMapping({
        valueTexts,
        onTextChange: (newText) => {
          const inputDate = parseValue(newText, {
            locale: props.locale,
            formatList: formatList.value,
            generateConfig: props.generateConfig
          });
          if (inputDate && (!props.disabledDate || !props.disabledDate(inputDate))) {
            setSelectedValue(inputDate);
          }
        }
      });
      const triggerChange = (newValue) => {
        const {
          onChange,
          generateConfig: generateConfig2,
          locale: locale2
        } = props;
        setSelectedValue(newValue);
        setInnerValue(newValue);
        if (onChange && !isEqual(generateConfig2, mergedValue.value, newValue)) {
          onChange(newValue, newValue ? formatValue(newValue, {
            generateConfig: generateConfig2,
            locale: locale2,
            format: formatList.value[0]
          }) : "");
        }
      };
      const triggerOpen = (newOpen) => {
        if (props.disabled && newOpen) {
          return;
        }
        triggerInnerOpen(newOpen);
      };
      const forwardKeydown = (e) => {
        if (mergedOpen.value && operationRef.value && operationRef.value.onKeydown) {
          return operationRef.value.onKeydown(e);
        }
        {
          return false;
        }
      };
      const onInternalMouseup = function() {
        if (props.onMouseup) {
          props.onMouseup(...arguments);
        }
        if (inputRef.value) {
          inputRef.value.focus();
          triggerOpen(true);
        }
      };
      const [inputProps, {
        focused,
        typing
      }] = usePickerInput({
        blurToCancel: needConfirmButton,
        open: mergedOpen,
        value: text,
        triggerOpen,
        forwardKeydown,
        isClickOutside: (target) => !elementsContains([panelDivRef.value, inputDivRef.value, containerRef.value], target),
        onSubmit: () => {
          if (
            // When user typing disabledDate with keyboard and enter, this value will be empty
            !selectedValue.value || // Normal disabled check
            props.disabledDate && props.disabledDate(selectedValue.value)
          ) {
            return false;
          }
          triggerChange(selectedValue.value);
          triggerOpen(false);
          resetText();
          return true;
        },
        onCancel: () => {
          triggerOpen(false);
          setSelectedValue(mergedValue.value);
          resetText();
        },
        onKeydown: (e, preventDefault) => {
          var _a2;
          (_a2 = props.onKeydown) === null || _a2 === void 0 ? void 0 : _a2.call(props, e, preventDefault);
        },
        onFocus: (e) => {
          var _a2;
          (_a2 = props.onFocus) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
        },
        onBlur: (e) => {
          var _a2;
          (_a2 = props.onBlur) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
        }
      });
      watch([mergedOpen, valueTexts], () => {
        if (!mergedOpen.value) {
          setSelectedValue(mergedValue.value);
          if (!valueTexts.value.length || valueTexts.value[0] === "") {
            triggerTextChange("");
          } else if (firstValueText.value !== text.value) {
            resetText();
          }
        }
      });
      watch(picker, () => {
        if (!mergedOpen.value) {
          resetText();
        }
      });
      watch(mergedValue, () => {
        setSelectedValue(mergedValue.value);
      });
      const [hoverValue, onEnter, onLeave] = useHoverValue(text, {
        formatList,
        generateConfig: toRef(props, "generateConfig"),
        locale: toRef(props, "locale")
      });
      const onContextSelect = (date, type) => {
        if (type === "submit" || type !== "key" && !needConfirmButton.value) {
          triggerChange(date);
          triggerOpen(false);
        }
      };
      useProvidePanel({
        operationRef,
        hideHeader: computed(() => picker.value === "time"),
        onSelect: onContextSelect,
        open: mergedOpen,
        defaultOpenValue: toRef(props, "defaultOpenValue"),
        onDateMouseenter: onEnter,
        onDateMouseleave: onLeave
      });
      expose({
        focus: () => {
          if (inputRef.value) {
            inputRef.value.focus();
          }
        },
        blur: () => {
          if (inputRef.value) {
            inputRef.value.blur();
          }
        }
      });
      return () => {
        const {
          prefixCls = "rc-picker",
          id,
          tabindex,
          dropdownClassName,
          dropdownAlign,
          popupStyle,
          transitionName: transitionName2,
          generateConfig: generateConfig2,
          locale: locale2,
          inputReadOnly,
          allowClear,
          autofocus,
          picker: picker2 = "date",
          defaultOpenValue,
          suffixIcon,
          clearIcon,
          disabled,
          placeholder,
          getPopupContainer,
          panelRender,
          onMousedown,
          onMouseenter,
          onMouseleave,
          onContextmenu,
          onClick,
          onSelect,
          direction,
          autocomplete = "off"
        } = props;
        const panelProps = _extends(_extends(_extends({}, props), attrs), {
          class: classNames({
            [`${prefixCls}-panel-focused`]: !typing.value
          }),
          style: void 0,
          pickerValue: void 0,
          onPickerValueChange: void 0,
          onChange: null
        });
        let panelNode = createVNode("div", {
          "class": `${prefixCls}-panel-layout`
        }, [createVNode(PresetPanel, {
          "prefixCls": prefixCls,
          "presets": presetList.value,
          "onClick": (nextValue) => {
            triggerChange(nextValue);
            triggerOpen(false);
          }
        }, null), createVNode(PickerPanel$1, _objectSpread2(_objectSpread2({}, panelProps), {}, {
          "generateConfig": generateConfig2,
          "value": selectedValue.value,
          "locale": locale2,
          "tabindex": -1,
          "onSelect": (date) => {
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(date);
            setSelectedValue(date);
          },
          "direction": direction,
          "onPanelChange": (viewDate, mode) => {
            const {
              onPanelChange
            } = props;
            onLeave(true);
            onPanelChange === null || onPanelChange === void 0 ? void 0 : onPanelChange(viewDate, mode);
          }
        }), null)]);
        if (panelRender) {
          panelNode = panelRender(panelNode);
        }
        const panel = createVNode("div", {
          "class": `${prefixCls}-panel-container`,
          "ref": panelDivRef,
          "onMousedown": (e) => {
            e.preventDefault();
          }
        }, [panelNode]);
        let suffixNode;
        if (suffixIcon) {
          suffixNode = createVNode("span", {
            "class": `${prefixCls}-suffix`
          }, [suffixIcon]);
        }
        let clearNode;
        if (allowClear && mergedValue.value && !disabled) {
          clearNode = createVNode("span", {
            "onMousedown": (e) => {
              e.preventDefault();
              e.stopPropagation();
            },
            "onMouseup": (e) => {
              e.preventDefault();
              e.stopPropagation();
              triggerChange(null);
              triggerOpen(false);
            },
            "class": `${prefixCls}-clear`,
            "role": "button"
          }, [clearIcon || createVNode("span", {
            "class": `${prefixCls}-clear-btn`
          }, null)]);
        }
        const mergedInputProps = _extends(_extends(_extends(_extends({
          id,
          tabindex,
          disabled,
          readonly: inputReadOnly || typeof formatList.value[0] === "function" || !typing.value,
          value: hoverValue.value || text.value,
          onInput: (e) => {
            triggerTextChange(e.target.value);
          },
          autofocus,
          placeholder,
          ref: inputRef,
          title: text.value
        }, inputProps.value), {
          size: getInputSize(picker2, formatList.value[0], generateConfig2)
        }), getDataOrAriaProps(props)), {
          autocomplete
        });
        const inputNode = props.inputRender ? props.inputRender(mergedInputProps) : createVNode("input", mergedInputProps, null);
        const popupPlacement = direction === "rtl" ? "bottomRight" : "bottomLeft";
        return createVNode("div", {
          "ref": containerRef,
          "class": classNames(prefixCls, attrs.class, {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-focused`]: focused.value,
            [`${prefixCls}-rtl`]: direction === "rtl"
          }),
          "style": attrs.style,
          "onMousedown": onMousedown,
          "onMouseup": onInternalMouseup,
          "onMouseenter": onMouseenter,
          "onMouseleave": onMouseleave,
          "onContextmenu": onContextmenu,
          "onClick": onClick
        }, [createVNode("div", {
          "class": classNames(`${prefixCls}-input`, {
            [`${prefixCls}-input-placeholder`]: !!hoverValue.value
          }),
          "ref": inputDivRef
        }, [inputNode, suffixNode, clearNode]), createVNode(PickerTrigger, {
          "visible": mergedOpen.value,
          "popupStyle": popupStyle,
          "prefixCls": prefixCls,
          "dropdownClassName": dropdownClassName,
          "dropdownAlign": dropdownAlign,
          "getPopupContainer": getPopupContainer,
          "transitionName": transitionName2,
          "popupPlacement": popupPlacement,
          "direction": direction
        }, {
          default: () => [createVNode("div", {
            "style": {
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }
          }, null)],
          popupElement: () => panel
        })]);
      };
    }
  });
}
const Picker$1 = Picker();
function useRangeDisabled(_ref, openRecordsRef) {
  let {
    picker,
    locale: locale2,
    selectedValue,
    disabledDate,
    disabled,
    generateConfig: generateConfig2
  } = _ref;
  const startDate = computed(() => getValue(selectedValue.value, 0));
  const endDate = computed(() => getValue(selectedValue.value, 1));
  function weekFirstDate(date) {
    return generateConfig2.value.locale.getWeekFirstDate(locale2.value.locale, date);
  }
  function monthNumber(date) {
    const year = generateConfig2.value.getYear(date);
    const month = generateConfig2.value.getMonth(date);
    return year * 100 + month;
  }
  function quarterNumber(date) {
    const year = generateConfig2.value.getYear(date);
    const quarter = getQuarter(generateConfig2.value, date);
    return year * 10 + quarter;
  }
  const disabledStartDate = (date) => {
    var _a2;
    if (disabledDate && ((_a2 = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate.value) === null || _a2 === void 0 ? void 0 : _a2.call(disabledDate, date))) {
      return true;
    }
    if (disabled[1] && endDate) {
      return !isSameDate(generateConfig2.value, date, endDate.value) && generateConfig2.value.isAfter(date, endDate.value);
    }
    if (openRecordsRef.value[1] && endDate.value) {
      switch (picker.value) {
        case "quarter":
          return quarterNumber(date) > quarterNumber(endDate.value);
        case "month":
          return monthNumber(date) > monthNumber(endDate.value);
        case "week":
          return weekFirstDate(date) > weekFirstDate(endDate.value);
        default:
          return !isSameDate(generateConfig2.value, date, endDate.value) && generateConfig2.value.isAfter(date, endDate.value);
      }
    }
    return false;
  };
  const disabledEndDate = (date) => {
    var _a2;
    if ((_a2 = disabledDate.value) === null || _a2 === void 0 ? void 0 : _a2.call(disabledDate, date)) {
      return true;
    }
    if (disabled[0] && startDate) {
      return !isSameDate(generateConfig2.value, date, endDate.value) && generateConfig2.value.isAfter(startDate.value, date);
    }
    if (openRecordsRef.value[0] && startDate.value) {
      switch (picker.value) {
        case "quarter":
          return quarterNumber(date) < quarterNumber(startDate.value);
        case "month":
          return monthNumber(date) < monthNumber(startDate.value);
        case "week":
          return weekFirstDate(date) < weekFirstDate(startDate.value);
        default:
          return !isSameDate(generateConfig2.value, date, startDate.value) && generateConfig2.value.isAfter(startDate.value, date);
      }
    }
    return false;
  };
  return [disabledStartDate, disabledEndDate];
}
function getStartEndDistance(startDate, endDate, picker, generateConfig2) {
  const startNext = getClosingViewDate(startDate, picker, generateConfig2, 1);
  function getDistance(compareFunc) {
    if (compareFunc(startDate, endDate)) {
      return "same";
    }
    if (compareFunc(startNext, endDate)) {
      return "closing";
    }
    return "far";
  }
  switch (picker) {
    case "year":
      return getDistance((start, end) => isSameDecade(generateConfig2, start, end));
    case "quarter":
    case "month":
      return getDistance((start, end) => isSameYear(generateConfig2, start, end));
    default:
      return getDistance((start, end) => isSameMonth(generateConfig2, start, end));
  }
}
function getRangeViewDate(values, index2, picker, generateConfig2) {
  const startDate = getValue(values, 0);
  const endDate = getValue(values, 1);
  if (index2 === 0) {
    return startDate;
  }
  if (startDate && endDate) {
    const distance = getStartEndDistance(startDate, endDate, picker, generateConfig2);
    switch (distance) {
      case "same":
        return startDate;
      case "closing":
        return startDate;
      default:
        return getClosingViewDate(endDate, picker, generateConfig2, -1);
    }
  }
  return startDate;
}
function useRangeViewDates(_ref) {
  let {
    values,
    picker,
    defaultDates,
    generateConfig: generateConfig2
  } = _ref;
  const defaultViewDates = ref([getValue(defaultDates, 0), getValue(defaultDates, 1)]);
  const viewDates = ref(null);
  const startDate = computed(() => getValue(values.value, 0));
  const endDate = computed(() => getValue(values.value, 1));
  const getViewDate = (index2) => {
    if (defaultViewDates.value[index2]) {
      return defaultViewDates.value[index2];
    }
    return getValue(viewDates.value, index2) || getRangeViewDate(values.value, index2, picker.value, generateConfig2.value) || startDate.value || endDate.value || generateConfig2.value.getNow();
  };
  const startViewDate = ref(null);
  const endViewDate = ref(null);
  watchEffect(() => {
    startViewDate.value = getViewDate(0);
    endViewDate.value = getViewDate(1);
  });
  function setViewDate(viewDate, index2) {
    if (viewDate) {
      let newViewDates = updateValues(viewDates.value, viewDate, index2);
      defaultViewDates.value = updateValues(defaultViewDates.value, null, index2) || [null, null];
      const anotherIndex = (index2 + 1) % 2;
      if (!getValue(values.value, anotherIndex)) {
        newViewDates = updateValues(newViewDates, viewDate, anotherIndex);
      }
      viewDates.value = newViewDates;
    } else if (startDate.value || endDate.value) {
      viewDates.value = null;
    }
  }
  return [startViewDate, endViewDate, setViewDate];
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function unrefElement(elRef) {
  var _a2;
  const plain = resolveUnref(elRef);
  return (_a2 = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _a2 !== void 0 ? _a2 : plain;
}
function tryOnMounted(fn) {
  let sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance()) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}
function useSupported(callback) {
  let sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const isSupported = shallowRef();
  const update = () => isSupported.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported;
}
var _a;
const isClient = typeof window !== "undefined";
isClient && ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
const defaultWindow = isClient ? window : void 0;
var __rest$d = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function useResizeObserver(target, callback) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    window: window2 = defaultWindow
  } = options, observerOptions = __rest$d(options, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup2 = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup2();
    if (isSupported.value && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, {
    immediate: true,
    flush: "post"
  });
  const stop = () => {
    cleanup2();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useElementSize(target) {
  let initialSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    width: 0,
    height: 0
  };
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    box = "content-box"
  } = options;
  const width = shallowRef(initialSize.width);
  const height = shallowRef(initialSize.height);
  useResizeObserver(target, (_ref) => {
    let [entry] = _ref;
    const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
    if (boxSize) {
      width.value = boxSize.reduce((acc, _ref2) => {
        let {
          inlineSize
        } = _ref2;
        return acc + inlineSize;
      }, 0);
      height.value = boxSize.reduce((acc, _ref3) => {
        let {
          blockSize
        } = _ref3;
        return acc + blockSize;
      }, 0);
    } else {
      width.value = entry.contentRect.width;
      height.value = entry.contentRect.height;
    }
  }, options);
  watch(() => unrefElement(target), (ele) => {
    width.value = ele ? initialSize.width : 0;
    height.value = ele ? initialSize.height : 0;
  });
  return {
    width,
    height
  };
}
function reorderValues(values, generateConfig2) {
  if (values && values[0] && values[1] && generateConfig2.isAfter(values[0], values[1])) {
    return [values[1], values[0]];
  }
  return values;
}
function canValueTrigger(value, index2, disabled, allowEmpty) {
  if (value) {
    return true;
  }
  if (allowEmpty && allowEmpty[index2]) {
    return true;
  }
  if (disabled[(index2 + 1) % 2]) {
    return true;
  }
  return false;
}
function RangerPicker() {
  return defineComponent({
    name: "RangerPicker",
    inheritAttrs: false,
    props: ["prefixCls", "id", "popupStyle", "dropdownClassName", "transitionName", "dropdownAlign", "getPopupContainer", "generateConfig", "locale", "placeholder", "autofocus", "disabled", "format", "picker", "showTime", "showNow", "showHour", "showMinute", "showSecond", "use12Hours", "separator", "value", "defaultValue", "defaultPickerValue", "open", "defaultOpen", "disabledDate", "disabledTime", "dateRender", "panelRender", "ranges", "allowEmpty", "allowClear", "suffixIcon", "clearIcon", "pickerRef", "inputReadOnly", "mode", "renderExtraFooter", "onChange", "onOpenChange", "onPanelChange", "onCalendarChange", "onFocus", "onBlur", "onMousedown", "onMouseup", "onMouseenter", "onMouseleave", "onClick", "onOk", "onKeydown", "components", "order", "direction", "activePickerIndex", "autocomplete", "minuteStep", "hourStep", "secondStep", "hideDisabledOptions", "disabledMinutes", "presets", "prevIcon", "nextIcon", "superPrevIcon", "superNextIcon"],
    setup(props, _ref) {
      let {
        attrs,
        expose
      } = _ref;
      const needConfirmButton = computed(() => props.picker === "date" && !!props.showTime || props.picker === "time");
      const presets = computed(() => props.presets);
      const ranges = computed(() => props.ranges);
      const presetList = usePresets(presets, ranges);
      const openRecordsRef = ref({});
      const containerRef = ref(null);
      const panelDivRef = ref(null);
      const startInputDivRef = ref(null);
      const endInputDivRef = ref(null);
      const separatorRef = ref(null);
      const startInputRef = ref(null);
      const endInputRef = ref(null);
      const arrowRef = ref(null);
      const formatList = computed(() => toArray$2(getDefaultFormat(props.format, props.picker, props.showTime, props.use12Hours)));
      const [mergedActivePickerIndex, setMergedActivePickerIndex] = useMergedState(0, {
        value: toRef(props, "activePickerIndex")
      });
      const operationRef = ref(null);
      const mergedDisabled = computed(() => {
        const {
          disabled
        } = props;
        if (Array.isArray(disabled)) {
          return disabled;
        }
        return [disabled || false, disabled || false];
      });
      const [mergedValue, setInnerValue] = useMergedState(null, {
        value: toRef(props, "value"),
        defaultValue: props.defaultValue,
        postState: (values) => props.picker === "time" && !props.order ? values : reorderValues(values, props.generateConfig)
      });
      const [startViewDate, endViewDate, setViewDate] = useRangeViewDates({
        values: mergedValue,
        picker: toRef(props, "picker"),
        defaultDates: props.defaultPickerValue,
        generateConfig: toRef(props, "generateConfig")
      });
      const [selectedValue, setSelectedValue] = useMergedState(mergedValue.value, {
        postState: (values) => {
          let postValues = values;
          if (mergedDisabled.value[0] && mergedDisabled.value[1]) {
            return postValues;
          }
          for (let i = 0; i < 2; i += 1) {
            if (mergedDisabled.value[i] && !getValue(postValues, i) && !getValue(props.allowEmpty, i)) {
              postValues = updateValues(postValues, props.generateConfig.getNow(), i);
            }
          }
          return postValues;
        }
      });
      const [mergedModes, setInnerModes] = useMergedState([props.picker, props.picker], {
        value: toRef(props, "mode")
      });
      watch(() => props.picker, () => {
        setInnerModes([props.picker, props.picker]);
      });
      const triggerModesChange = (modes, values) => {
        var _a2;
        setInnerModes(modes);
        (_a2 = props.onPanelChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, values, modes);
      };
      const [disabledStartDate, disabledEndDate] = useRangeDisabled({
        picker: toRef(props, "picker"),
        selectedValue,
        locale: toRef(props, "locale"),
        disabled: mergedDisabled,
        disabledDate: toRef(props, "disabledDate"),
        generateConfig: toRef(props, "generateConfig")
      }, openRecordsRef);
      const [mergedOpen, triggerInnerOpen] = useMergedState(false, {
        value: toRef(props, "open"),
        defaultValue: props.defaultOpen,
        postState: (postOpen) => mergedDisabled.value[mergedActivePickerIndex.value] ? false : postOpen,
        onChange: (newOpen) => {
          var _a2;
          (_a2 = props.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, newOpen);
          if (!newOpen && operationRef.value && operationRef.value.onClose) {
            operationRef.value.onClose();
          }
        }
      });
      const startOpen = computed(() => mergedOpen.value && mergedActivePickerIndex.value === 0);
      const endOpen = computed(() => mergedOpen.value && mergedActivePickerIndex.value === 1);
      const panelLeft = ref(0);
      const arrowLeft = ref(0);
      const popupMinWidth = ref(0);
      const {
        width: containerWidth
      } = useElementSize(containerRef);
      watch([mergedOpen, containerWidth], () => {
        if (!mergedOpen.value && containerRef.value) {
          popupMinWidth.value = containerWidth.value;
        }
      });
      const {
        width: panelDivWidth
      } = useElementSize(panelDivRef);
      const {
        width: arrowWidth
      } = useElementSize(arrowRef);
      const {
        width: startInputDivWidth
      } = useElementSize(startInputDivRef);
      const {
        width: separatorWidth
      } = useElementSize(separatorRef);
      watch([mergedActivePickerIndex, mergedOpen, panelDivWidth, arrowWidth, startInputDivWidth, separatorWidth, () => props.direction], () => {
        arrowLeft.value = 0;
        if (mergedActivePickerIndex.value) {
          if (startInputDivRef.value && separatorRef.value) {
            arrowLeft.value = startInputDivWidth.value + separatorWidth.value;
            if (panelDivWidth.value && arrowWidth.value && arrowLeft.value > panelDivWidth.value - arrowWidth.value - (props.direction === "rtl" || arrowRef.value.offsetLeft > arrowLeft.value ? 0 : arrowRef.value.offsetLeft)) {
              panelLeft.value = arrowLeft.value;
            }
          }
        } else if (mergedActivePickerIndex.value === 0) {
          panelLeft.value = 0;
        }
      }, {
        immediate: true
      });
      const triggerRef2 = ref();
      function triggerOpen(newOpen, index2) {
        if (newOpen) {
          clearTimeout(triggerRef2.value);
          openRecordsRef.value[index2] = true;
          setMergedActivePickerIndex(index2);
          triggerInnerOpen(newOpen);
          if (!mergedOpen.value) {
            setViewDate(null, index2);
          }
        } else if (mergedActivePickerIndex.value === index2) {
          triggerInnerOpen(newOpen);
          const openRecords = openRecordsRef.value;
          triggerRef2.value = setTimeout(() => {
            if (openRecords === openRecordsRef.value) {
              openRecordsRef.value = {};
            }
          });
        }
      }
      function triggerOpenAndFocus(index2) {
        triggerOpen(true, index2);
        setTimeout(() => {
          const inputRef = [startInputRef, endInputRef][index2];
          if (inputRef.value) {
            inputRef.value.focus();
          }
        }, 0);
      }
      function triggerChange(newValue, sourceIndex) {
        let values = newValue;
        let startValue = getValue(values, 0);
        let endValue = getValue(values, 1);
        const {
          generateConfig: generateConfig2,
          locale: locale2,
          picker,
          order,
          onCalendarChange,
          allowEmpty,
          onChange,
          showTime
        } = props;
        if (startValue && endValue && generateConfig2.isAfter(startValue, endValue)) {
          if (
            // WeekPicker only compare week
            picker === "week" && !isSameWeek(generateConfig2, locale2.locale, startValue, endValue) || // QuotaPicker only compare week
            picker === "quarter" && !isSameQuarter(generateConfig2, startValue, endValue) || // Other non-TimePicker compare date
            picker !== "week" && picker !== "quarter" && picker !== "time" && !(showTime ? isEqual(generateConfig2, startValue, endValue) : isSameDate(generateConfig2, startValue, endValue))
          ) {
            if (sourceIndex === 0) {
              values = [startValue, null];
              endValue = null;
            } else {
              startValue = null;
              values = [null, endValue];
            }
            openRecordsRef.value = {
              [sourceIndex]: true
            };
          } else if (picker !== "time" || order !== false) {
            values = reorderValues(values, generateConfig2);
          }
        }
        setSelectedValue(values);
        const startStr2 = values && values[0] ? formatValue(values[0], {
          generateConfig: generateConfig2,
          locale: locale2,
          format: formatList.value[0]
        }) : "";
        const endStr2 = values && values[1] ? formatValue(values[1], {
          generateConfig: generateConfig2,
          locale: locale2,
          format: formatList.value[0]
        }) : "";
        if (onCalendarChange) {
          const info = {
            range: sourceIndex === 0 ? "start" : "end"
          };
          onCalendarChange(values, [startStr2, endStr2], info);
        }
        const canStartValueTrigger = canValueTrigger(startValue, 0, mergedDisabled.value, allowEmpty);
        const canEndValueTrigger = canValueTrigger(endValue, 1, mergedDisabled.value, allowEmpty);
        const canTrigger = values === null || canStartValueTrigger && canEndValueTrigger;
        if (canTrigger) {
          setInnerValue(values);
          if (onChange && (!isEqual(generateConfig2, getValue(mergedValue.value, 0), startValue) || !isEqual(generateConfig2, getValue(mergedValue.value, 1), endValue))) {
            onChange(values, [startStr2, endStr2]);
          }
        }
        let nextOpenIndex = null;
        if (sourceIndex === 0 && !mergedDisabled.value[1]) {
          nextOpenIndex = 1;
        } else if (sourceIndex === 1 && !mergedDisabled.value[0]) {
          nextOpenIndex = 0;
        }
        if (nextOpenIndex !== null && nextOpenIndex !== mergedActivePickerIndex.value && (!openRecordsRef.value[nextOpenIndex] || !getValue(values, nextOpenIndex)) && getValue(values, sourceIndex)) {
          triggerOpenAndFocus(nextOpenIndex);
        } else {
          triggerOpen(false, sourceIndex);
        }
      }
      const forwardKeydown = (e) => {
        if (mergedOpen && operationRef.value && operationRef.value.onKeydown) {
          return operationRef.value.onKeydown(e);
        }
        {
          return false;
        }
      };
      const sharedTextHooksProps = {
        formatList,
        generateConfig: toRef(props, "generateConfig"),
        locale: toRef(props, "locale")
      };
      const [startValueTexts, firstStartValueText] = useValueTexts(computed(() => getValue(selectedValue.value, 0)), sharedTextHooksProps);
      const [endValueTexts, firstEndValueText] = useValueTexts(computed(() => getValue(selectedValue.value, 1)), sharedTextHooksProps);
      const onTextChange = (newText, index2) => {
        const inputDate = parseValue(newText, {
          locale: props.locale,
          formatList: formatList.value,
          generateConfig: props.generateConfig
        });
        const disabledFunc = index2 === 0 ? disabledStartDate : disabledEndDate;
        if (inputDate && !disabledFunc(inputDate)) {
          setSelectedValue(updateValues(selectedValue.value, inputDate, index2));
          setViewDate(inputDate, index2);
        }
      };
      const [startText, triggerStartTextChange, resetStartText] = useTextValueMapping({
        valueTexts: startValueTexts,
        onTextChange: (newText) => onTextChange(newText, 0)
      });
      const [endText, triggerEndTextChange, resetEndText] = useTextValueMapping({
        valueTexts: endValueTexts,
        onTextChange: (newText) => onTextChange(newText, 1)
      });
      const [rangeHoverValue, setRangeHoverValue] = useState(null);
      const [hoverRangedValue, setHoverRangedValue] = useState(null);
      const [startHoverValue, onStartEnter, onStartLeave] = useHoverValue(startText, sharedTextHooksProps);
      const [endHoverValue, onEndEnter, onEndLeave] = useHoverValue(endText, sharedTextHooksProps);
      const onDateMouseenter = (date) => {
        setHoverRangedValue(updateValues(selectedValue.value, date, mergedActivePickerIndex.value));
        if (mergedActivePickerIndex.value === 0) {
          onStartEnter(date);
        } else {
          onEndEnter(date);
        }
      };
      const onDateMouseleave = () => {
        setHoverRangedValue(updateValues(selectedValue.value, null, mergedActivePickerIndex.value));
        if (mergedActivePickerIndex.value === 0) {
          onStartLeave();
        } else {
          onEndLeave();
        }
      };
      const getSharedInputHookProps = (index2, resetText) => ({
        forwardKeydown,
        onBlur: (e) => {
          var _a2;
          (_a2 = props.onBlur) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
        },
        isClickOutside: (target) => !elementsContains([panelDivRef.value, startInputDivRef.value, endInputDivRef.value, containerRef.value], target),
        onFocus: (e) => {
          var _a2;
          setMergedActivePickerIndex(index2);
          (_a2 = props.onFocus) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
        },
        triggerOpen: (newOpen) => {
          triggerOpen(newOpen, index2);
        },
        onSubmit: () => {
          if (
            // When user typing disabledDate with keyboard and enter, this value will be empty
            !selectedValue.value || // Normal disabled check
            props.disabledDate && props.disabledDate(selectedValue.value[index2])
          ) {
            return false;
          }
          triggerChange(selectedValue.value, index2);
          resetText();
        },
        onCancel: () => {
          triggerOpen(false, index2);
          setSelectedValue(mergedValue.value);
          resetText();
        }
      });
      const [startInputProps, {
        focused: startFocused,
        typing: startTyping
      }] = usePickerInput(_extends(_extends({}, getSharedInputHookProps(0, resetStartText)), {
        blurToCancel: needConfirmButton,
        open: startOpen,
        value: startText,
        onKeydown: (e, preventDefault) => {
          var _a2;
          (_a2 = props.onKeydown) === null || _a2 === void 0 ? void 0 : _a2.call(props, e, preventDefault);
        }
      }));
      const [endInputProps, {
        focused: endFocused,
        typing: endTyping
      }] = usePickerInput(_extends(_extends({}, getSharedInputHookProps(1, resetEndText)), {
        blurToCancel: needConfirmButton,
        open: endOpen,
        value: endText,
        onKeydown: (e, preventDefault) => {
          var _a2;
          (_a2 = props.onKeydown) === null || _a2 === void 0 ? void 0 : _a2.call(props, e, preventDefault);
        }
      }));
      const onPickerClick = (e) => {
        var _a2;
        (_a2 = props.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
        if (!mergedOpen.value && !startInputRef.value.contains(e.target) && !endInputRef.value.contains(e.target)) {
          if (!mergedDisabled.value[0]) {
            triggerOpenAndFocus(0);
          } else if (!mergedDisabled.value[1]) {
            triggerOpenAndFocus(1);
          }
        }
      };
      const onPickerMousedown = (e) => {
        var _a2;
        (_a2 = props.onMousedown) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
        if (mergedOpen.value && (startFocused.value || endFocused.value) && !startInputRef.value.contains(e.target) && !endInputRef.value.contains(e.target)) {
          e.preventDefault();
        }
      };
      const startStr = computed(() => {
        var _a2;
        return ((_a2 = mergedValue.value) === null || _a2 === void 0 ? void 0 : _a2[0]) ? formatValue(mergedValue.value[0], {
          locale: props.locale,
          format: "YYYYMMDDHHmmss",
          generateConfig: props.generateConfig
        }) : "";
      });
      const endStr = computed(() => {
        var _a2;
        return ((_a2 = mergedValue.value) === null || _a2 === void 0 ? void 0 : _a2[1]) ? formatValue(mergedValue.value[1], {
          locale: props.locale,
          format: "YYYYMMDDHHmmss",
          generateConfig: props.generateConfig
        }) : "";
      });
      watch([mergedOpen, startValueTexts, endValueTexts], () => {
        if (!mergedOpen.value) {
          setSelectedValue(mergedValue.value);
          if (!startValueTexts.value.length || startValueTexts.value[0] === "") {
            triggerStartTextChange("");
          } else if (firstStartValueText.value !== startText.value) {
            resetStartText();
          }
          if (!endValueTexts.value.length || endValueTexts.value[0] === "") {
            triggerEndTextChange("");
          } else if (firstEndValueText.value !== endText.value) {
            resetEndText();
          }
        }
      });
      watch([startStr, endStr], () => {
        setSelectedValue(mergedValue.value);
      });
      expose({
        focus: () => {
          if (startInputRef.value) {
            startInputRef.value.focus();
          }
        },
        blur: () => {
          if (startInputRef.value) {
            startInputRef.value.blur();
          }
          if (endInputRef.value) {
            endInputRef.value.blur();
          }
        }
      });
      const panelHoverRangedValue = computed(() => {
        if (mergedOpen.value && hoverRangedValue.value && hoverRangedValue.value[0] && hoverRangedValue.value[1] && props.generateConfig.isAfter(hoverRangedValue.value[1], hoverRangedValue.value[0])) {
          return hoverRangedValue.value;
        } else {
          return null;
        }
      });
      function renderPanel() {
        let panelPosition = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        let panelProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          generateConfig: generateConfig2,
          showTime,
          dateRender,
          direction,
          disabledTime,
          prefixCls,
          locale: locale2
        } = props;
        let panelShowTime = showTime;
        if (showTime && typeof showTime === "object" && showTime.defaultValue) {
          const timeDefaultValues = showTime.defaultValue;
          panelShowTime = _extends(_extends({}, showTime), {
            defaultValue: getValue(timeDefaultValues, mergedActivePickerIndex.value) || void 0
          });
        }
        let panelDateRender = null;
        if (dateRender) {
          panelDateRender = (_ref2) => {
            let {
              current: date,
              today
            } = _ref2;
            return dateRender({
              current: date,
              today,
              info: {
                range: mergedActivePickerIndex.value ? "end" : "start"
              }
            });
          };
        }
        return createVNode(RangeContextProvider, {
          "value": {
            inRange: true,
            panelPosition,
            rangedValue: rangeHoverValue.value || selectedValue.value,
            hoverRangedValue: panelHoverRangedValue.value
          }
        }, {
          default: () => [createVNode(PickerPanel$1, _objectSpread2(_objectSpread2(_objectSpread2({}, props), panelProps), {}, {
            "dateRender": panelDateRender,
            "showTime": panelShowTime,
            "mode": mergedModes.value[mergedActivePickerIndex.value],
            "generateConfig": generateConfig2,
            "style": void 0,
            "direction": direction,
            "disabledDate": mergedActivePickerIndex.value === 0 ? disabledStartDate : disabledEndDate,
            "disabledTime": (date) => {
              if (disabledTime) {
                return disabledTime(date, mergedActivePickerIndex.value === 0 ? "start" : "end");
              }
              return false;
            },
            "class": classNames({
              [`${prefixCls}-panel-focused`]: mergedActivePickerIndex.value === 0 ? !startTyping.value : !endTyping.value
            }),
            "value": getValue(selectedValue.value, mergedActivePickerIndex.value),
            "locale": locale2,
            "tabIndex": -1,
            "onPanelChange": (date, newMode) => {
              if (mergedActivePickerIndex.value === 0) {
                onStartLeave(true);
              }
              if (mergedActivePickerIndex.value === 1) {
                onEndLeave(true);
              }
              triggerModesChange(updateValues(mergedModes.value, newMode, mergedActivePickerIndex.value), updateValues(selectedValue.value, date, mergedActivePickerIndex.value));
              let viewDate = date;
              if (panelPosition === "right" && mergedModes.value[mergedActivePickerIndex.value] === newMode) {
                viewDate = getClosingViewDate(viewDate, newMode, generateConfig2, -1);
              }
              setViewDate(viewDate, mergedActivePickerIndex.value);
            },
            "onOk": null,
            "onSelect": void 0,
            "onChange": void 0,
            "defaultValue": mergedActivePickerIndex.value === 0 ? getValue(selectedValue.value, 1) : getValue(selectedValue.value, 0)
          }), null)]
        });
      }
      const onContextSelect = (date, type) => {
        const values = updateValues(selectedValue.value, date, mergedActivePickerIndex.value);
        if (type === "submit" || type !== "key" && !needConfirmButton.value) {
          triggerChange(values, mergedActivePickerIndex.value);
          if (mergedActivePickerIndex.value === 0) {
            onStartLeave();
          } else {
            onEndLeave();
          }
        } else {
          setSelectedValue(values);
        }
      };
      useProvidePanel({
        operationRef,
        hideHeader: computed(() => props.picker === "time"),
        onDateMouseenter,
        onDateMouseleave,
        hideRanges: computed(() => true),
        onSelect: onContextSelect,
        open: mergedOpen
      });
      return () => {
        const {
          prefixCls = "rc-picker",
          id,
          popupStyle,
          dropdownClassName,
          transitionName: transitionName2,
          dropdownAlign,
          getPopupContainer,
          generateConfig: generateConfig2,
          locale: locale2,
          placeholder,
          autofocus,
          picker = "date",
          showTime,
          separator = "~",
          disabledDate,
          panelRender,
          allowClear,
          suffixIcon,
          clearIcon,
          inputReadOnly,
          renderExtraFooter,
          onMouseenter,
          onMouseleave,
          onMouseup,
          onOk,
          components,
          direction,
          autocomplete = "off"
        } = props;
        const arrowPositionStyle = direction === "rtl" ? {
          right: `${arrowLeft.value}px`
        } : {
          left: `${arrowLeft.value}px`
        };
        function renderPanels() {
          let panels;
          const extraNode = getExtraFooter(prefixCls, mergedModes.value[mergedActivePickerIndex.value], renderExtraFooter);
          const rangesNode = getRanges({
            prefixCls,
            components,
            needConfirmButton: needConfirmButton.value,
            okDisabled: !getValue(selectedValue.value, mergedActivePickerIndex.value) || disabledDate && disabledDate(selectedValue.value[mergedActivePickerIndex.value]),
            locale: locale2,
            onOk: () => {
              if (getValue(selectedValue.value, mergedActivePickerIndex.value)) {
                triggerChange(selectedValue.value, mergedActivePickerIndex.value);
                if (onOk) {
                  onOk(selectedValue.value);
                }
              }
            }
          });
          if (picker !== "time" && !showTime) {
            const viewDate = mergedActivePickerIndex.value === 0 ? startViewDate.value : endViewDate.value;
            const nextViewDate = getClosingViewDate(viewDate, picker, generateConfig2);
            const currentMode = mergedModes.value[mergedActivePickerIndex.value];
            const showDoublePanel = currentMode === picker;
            const leftPanel = renderPanel(showDoublePanel ? "left" : false, {
              pickerValue: viewDate,
              onPickerValueChange: (newViewDate) => {
                setViewDate(newViewDate, mergedActivePickerIndex.value);
              }
            });
            const rightPanel = renderPanel("right", {
              pickerValue: nextViewDate,
              onPickerValueChange: (newViewDate) => {
                setViewDate(getClosingViewDate(newViewDate, picker, generateConfig2, -1), mergedActivePickerIndex.value);
              }
            });
            if (direction === "rtl") {
              panels = createVNode(Fragment, null, [rightPanel, showDoublePanel && leftPanel]);
            } else {
              panels = createVNode(Fragment, null, [leftPanel, showDoublePanel && rightPanel]);
            }
          } else {
            panels = renderPanel();
          }
          let mergedNodes = createVNode("div", {
            "class": `${prefixCls}-panel-layout`
          }, [createVNode(PresetPanel, {
            "prefixCls": prefixCls,
            "presets": presetList.value,
            "onClick": (nextValue) => {
              triggerChange(nextValue, null);
              triggerOpen(false, mergedActivePickerIndex.value);
            },
            "onHover": (hoverValue) => {
              setRangeHoverValue(hoverValue);
            }
          }, null), createVNode("div", null, [createVNode("div", {
            "class": `${prefixCls}-panels`
          }, [panels]), (extraNode || rangesNode) && createVNode("div", {
            "class": `${prefixCls}-footer`
          }, [extraNode, rangesNode])])]);
          if (panelRender) {
            mergedNodes = panelRender(mergedNodes);
          }
          return createVNode("div", {
            "class": `${prefixCls}-panel-container`,
            "style": {
              marginLeft: `${panelLeft.value}px`
            },
            "ref": panelDivRef,
            "onMousedown": (e) => {
              e.preventDefault();
            }
          }, [mergedNodes]);
        }
        const rangePanel = createVNode("div", {
          "class": classNames(`${prefixCls}-range-wrapper`, `${prefixCls}-${picker}-range-wrapper`),
          "style": {
            minWidth: `${popupMinWidth.value}px`
          }
        }, [createVNode("div", {
          "ref": arrowRef,
          "class": `${prefixCls}-range-arrow`,
          "style": arrowPositionStyle
        }, null), renderPanels()]);
        let suffixNode;
        if (suffixIcon) {
          suffixNode = createVNode("span", {
            "class": `${prefixCls}-suffix`
          }, [suffixIcon]);
        }
        let clearNode;
        if (allowClear && (getValue(mergedValue.value, 0) && !mergedDisabled.value[0] || getValue(mergedValue.value, 1) && !mergedDisabled.value[1])) {
          clearNode = createVNode("span", {
            "onMousedown": (e) => {
              e.preventDefault();
              e.stopPropagation();
            },
            "onMouseup": (e) => {
              e.preventDefault();
              e.stopPropagation();
              let values = mergedValue.value;
              if (!mergedDisabled.value[0]) {
                values = updateValues(values, null, 0);
              }
              if (!mergedDisabled.value[1]) {
                values = updateValues(values, null, 1);
              }
              triggerChange(values, null);
              triggerOpen(false, mergedActivePickerIndex.value);
            },
            "class": `${prefixCls}-clear`
          }, [clearIcon || createVNode("span", {
            "class": `${prefixCls}-clear-btn`
          }, null)]);
        }
        const inputSharedProps = {
          size: getInputSize(picker, formatList.value[0], generateConfig2)
        };
        let activeBarLeft = 0;
        let activeBarWidth = 0;
        if (startInputDivRef.value && endInputDivRef.value && separatorRef.value) {
          if (mergedActivePickerIndex.value === 0) {
            activeBarWidth = startInputDivRef.value.offsetWidth;
          } else {
            activeBarLeft = arrowLeft.value;
            activeBarWidth = endInputDivRef.value.offsetWidth;
          }
        }
        const activeBarPositionStyle = direction === "rtl" ? {
          right: `${activeBarLeft}px`
        } : {
          left: `${activeBarLeft}px`
        };
        return createVNode("div", _objectSpread2({
          "ref": containerRef,
          "class": classNames(prefixCls, `${prefixCls}-range`, attrs.class, {
            [`${prefixCls}-disabled`]: mergedDisabled.value[0] && mergedDisabled.value[1],
            [`${prefixCls}-focused`]: mergedActivePickerIndex.value === 0 ? startFocused.value : endFocused.value,
            [`${prefixCls}-rtl`]: direction === "rtl"
          }),
          "style": attrs.style,
          "onClick": onPickerClick,
          "onMouseenter": onMouseenter,
          "onMouseleave": onMouseleave,
          "onMousedown": onPickerMousedown,
          "onMouseup": onMouseup
        }, getDataOrAriaProps(props)), [createVNode("div", {
          "class": classNames(`${prefixCls}-input`, {
            [`${prefixCls}-input-active`]: mergedActivePickerIndex.value === 0,
            [`${prefixCls}-input-placeholder`]: !!startHoverValue.value
          }),
          "ref": startInputDivRef
        }, [createVNode("input", _objectSpread2(_objectSpread2(_objectSpread2({
          "id": id,
          "disabled": mergedDisabled.value[0],
          "readonly": inputReadOnly || typeof formatList.value[0] === "function" || !startTyping.value,
          "value": startHoverValue.value || startText.value,
          "onInput": (e) => {
            triggerStartTextChange(e.target.value);
          },
          "autofocus": autofocus,
          "placeholder": getValue(placeholder, 0) || "",
          "ref": startInputRef
        }, startInputProps.value), inputSharedProps), {}, {
          "autocomplete": autocomplete
        }), null)]), createVNode("div", {
          "class": `${prefixCls}-range-separator`,
          "ref": separatorRef
        }, [separator]), createVNode("div", {
          "class": classNames(`${prefixCls}-input`, {
            [`${prefixCls}-input-active`]: mergedActivePickerIndex.value === 1,
            [`${prefixCls}-input-placeholder`]: !!endHoverValue.value
          }),
          "ref": endInputDivRef
        }, [createVNode("input", _objectSpread2(_objectSpread2(_objectSpread2({
          "disabled": mergedDisabled.value[1],
          "readonly": inputReadOnly || typeof formatList.value[0] === "function" || !endTyping.value,
          "value": endHoverValue.value || endText.value,
          "onInput": (e) => {
            triggerEndTextChange(e.target.value);
          },
          "placeholder": getValue(placeholder, 1) || "",
          "ref": endInputRef
        }, endInputProps.value), inputSharedProps), {}, {
          "autocomplete": autocomplete
        }), null)]), createVNode("div", {
          "class": `${prefixCls}-active-bar`,
          "style": _extends(_extends({}, activeBarPositionStyle), {
            width: `${activeBarWidth}px`,
            position: "absolute"
          })
        }, null), suffixNode, clearNode, createVNode(PickerTrigger, {
          "visible": mergedOpen.value,
          "popupStyle": popupStyle,
          "prefixCls": prefixCls,
          "dropdownClassName": dropdownClassName,
          "dropdownAlign": dropdownAlign,
          "getPopupContainer": getPopupContainer,
          "transitionName": transitionName2,
          "range": true,
          "direction": direction
        }, {
          default: () => [createVNode("div", {
            "style": {
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }
          }, null)],
          popupElement: () => rangePanel
        })]);
      };
    }
  });
}
const InterRangerPicker = RangerPicker();
var __rest$c = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const checkboxProps = {
  prefixCls: String,
  name: String,
  id: String,
  type: String,
  defaultChecked: {
    type: [Boolean, Number],
    default: void 0
  },
  checked: {
    type: [Boolean, Number],
    default: void 0
  },
  disabled: Boolean,
  tabindex: {
    type: [Number, String]
  },
  readonly: Boolean,
  autofocus: Boolean,
  value: PropTypes.any,
  required: Boolean
};
const VcCheckbox = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Checkbox",
  inheritAttrs: false,
  props: initDefaultProps(checkboxProps, {
    prefixCls: "rc-checkbox",
    type: "checkbox",
    defaultChecked: false
  }),
  emits: ["click", "change"],
  setup(props, _ref) {
    let {
      attrs,
      emit,
      expose
    } = _ref;
    const checked = ref(props.checked === void 0 ? props.defaultChecked : props.checked);
    const inputRef = ref();
    watch(() => props.checked, () => {
      checked.value = props.checked;
    });
    expose({
      focus() {
        var _a2;
        (_a2 = inputRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus();
      },
      blur() {
        var _a2;
        (_a2 = inputRef.value) === null || _a2 === void 0 ? void 0 : _a2.blur();
      }
    });
    const eventShiftKey = ref();
    const handleChange = (e) => {
      if (props.disabled) {
        return;
      }
      if (props.checked === void 0) {
        checked.value = e.target.checked;
      }
      e.shiftKey = eventShiftKey.value;
      const eventObj = {
        target: _extends(_extends({}, props), {
          checked: e.target.checked
        }),
        stopPropagation() {
          e.stopPropagation();
        },
        preventDefault() {
          e.preventDefault();
        },
        nativeEvent: e
      };
      if (props.checked !== void 0) {
        inputRef.value.checked = !!props.checked;
      }
      emit("change", eventObj);
      eventShiftKey.value = false;
    };
    const onClick = (e) => {
      emit("click", e);
      eventShiftKey.value = e.shiftKey;
    };
    return () => {
      const {
        prefixCls,
        name,
        id,
        type,
        disabled,
        readonly,
        tabindex,
        autofocus,
        value,
        required
      } = props, others = __rest$c(props, ["prefixCls", "name", "id", "type", "disabled", "readonly", "tabindex", "autofocus", "value", "required"]);
      const {
        class: className,
        onFocus,
        onBlur,
        onKeydown,
        onKeypress,
        onKeyup
      } = attrs;
      const othersAndAttrs = _extends(_extends({}, others), attrs);
      const globalProps = Object.keys(othersAndAttrs).reduce((prev, key2) => {
        if (key2.startsWith("data-") || key2.startsWith("aria-") || key2 === "role") {
          prev[key2] = othersAndAttrs[key2];
        }
        return prev;
      }, {});
      const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: checked.value,
        [`${prefixCls}-disabled`]: disabled
      });
      const inputProps = _extends(_extends({
        name,
        id,
        type,
        readonly,
        disabled,
        tabindex,
        class: `${prefixCls}-input`,
        checked: !!checked.value,
        autofocus,
        value
      }, globalProps), {
        onChange: handleChange,
        onClick,
        onFocus,
        onBlur,
        onKeydown,
        onKeypress,
        onKeyup,
        required
      });
      return createVNode("span", {
        "class": classString
      }, [createVNode("input", _objectSpread2({
        "ref": inputRef
      }, inputProps), null), createVNode("span", {
        "class": `${prefixCls}-inner`
      }, null)]);
    };
  }
});
const radioGroupContextKey = Symbol("radioGroupContextKey");
const useProvideRadioGroupContext = (props) => {
  provide(radioGroupContextKey, props);
};
const useInjectRadioGroupContext = () => {
  return inject(radioGroupContextKey, void 0);
};
const radioOptionTypeContextKey = Symbol("radioOptionTypeContextKey");
const useProvideRadioOptionTypeContext = (props) => {
  provide(radioOptionTypeContextKey, props);
};
const useInjectRadioOptionTypeContext = () => {
  return inject(radioOptionTypeContextKey, void 0);
};
const antRadioEffect = new Keyframe("antRadioEffect", {
  "0%": {
    transform: "scale(1)",
    opacity: 0.5
  },
  "100%": {
    transform: "scale(1.6)",
    opacity: 0
  }
});
const getGroupRadioStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: _extends(_extends({}, resetComponent(token)), {
      display: "inline-block",
      fontSize: 0,
      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1
      },
      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: "none"
      }
    })
  };
};
const getRadioBasicStyle = (token) => {
  const {
    componentCls,
    radioWrapperMarginRight,
    radioCheckedColor,
    radioSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseInOutCirc,
    radioButtonBg,
    colorBorder,
    lineWidth,
    radioDotSize,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    radioDotDisabledColor,
    lineType,
    radioDotDisabledSize,
    wireframe,
    colorWhite
  } = token;
  const radioInnerPrefixCls = `${componentCls}-inner`;
  return {
    [`${componentCls}-wrapper`]: _extends(_extends({}, resetComponent(token)), {
      position: "relative",
      display: "inline-flex",
      alignItems: "baseline",
      marginInlineStart: 0,
      marginInlineEnd: radioWrapperMarginRight,
      cursor: "pointer",
      // RTL
      [`&${componentCls}-wrapper-rtl`]: {
        direction: "rtl"
      },
      "&-disabled": {
        cursor: "not-allowed",
        color: token.colorTextDisabled
      },
      "&::after": {
        display: "inline-block",
        width: 0,
        overflow: "hidden",
        content: '"\\a0"'
      },
      // hashId 在 wrapper 上，只能铺平
      [`${componentCls}-checked::after`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: "100%",
        height: "100%",
        border: `${lineWidth}px ${lineType} ${radioCheckedColor}`,
        borderRadius: "50%",
        visibility: "hidden",
        animationName: antRadioEffect,
        animationDuration: motionDurationSlow,
        animationTimingFunction: motionEaseInOut,
        animationFillMode: "both",
        content: '""'
      },
      [componentCls]: _extends(_extends({}, resetComponent(token)), {
        position: "relative",
        display: "inline-block",
        outline: "none",
        cursor: "pointer",
        alignSelf: "center"
      }),
      [`${componentCls}-wrapper:hover &,
        &:hover ${radioInnerPrefixCls}`]: {
        borderColor: radioCheckedColor
      },
      [`${componentCls}-input:focus-visible + ${radioInnerPrefixCls}`]: _extends({}, genFocusOutline(token)),
      [`${componentCls}:hover::after, ${componentCls}-wrapper:hover &::after`]: {
        visibility: "visible"
      },
      [`${componentCls}-inner`]: {
        "&::after": {
          boxSizing: "border-box",
          position: "absolute",
          insetBlockStart: "50%",
          insetInlineStart: "50%",
          display: "block",
          width: radioSize,
          height: radioSize,
          marginBlockStart: radioSize / -2,
          marginInlineStart: radioSize / -2,
          backgroundColor: wireframe ? radioCheckedColor : colorWhite,
          borderBlockStart: 0,
          borderInlineStart: 0,
          borderRadius: radioSize,
          transform: "scale(0)",
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
          content: '""'
        },
        boxSizing: "border-box",
        position: "relative",
        insetBlockStart: 0,
        insetInlineStart: 0,
        display: "block",
        width: radioSize,
        height: radioSize,
        backgroundColor: radioButtonBg,
        borderColor: colorBorder,
        borderStyle: "solid",
        borderWidth: lineWidth,
        borderRadius: "50%",
        transition: `all ${motionDurationMid}`
      },
      [`${componentCls}-input`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineEnd: 0,
        insetBlockEnd: 0,
        insetInlineStart: 0,
        zIndex: 1,
        cursor: "pointer",
        opacity: 0
      },
      // 选中状态
      [`${componentCls}-checked`]: {
        [radioInnerPrefixCls]: {
          borderColor: radioCheckedColor,
          backgroundColor: wireframe ? radioButtonBg : radioCheckedColor,
          "&::after": {
            transform: `scale(${radioDotSize / radioSize})`,
            opacity: 1,
            transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`
          }
        }
      },
      [`${componentCls}-disabled`]: {
        cursor: "not-allowed",
        [radioInnerPrefixCls]: {
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: "not-allowed",
          "&::after": {
            backgroundColor: radioDotDisabledColor
          }
        },
        [`${componentCls}-input`]: {
          cursor: "not-allowed"
        },
        [`${componentCls}-disabled + span`]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        },
        [`&${componentCls}-checked`]: {
          [radioInnerPrefixCls]: {
            "&::after": {
              transform: `scale(${radioDotDisabledSize / radioSize})`
            }
          }
        }
      },
      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS
      }
    })
  };
};
const getRadioButtonStyle = (token) => {
  const {
    radioButtonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationSlow,
    motionDurationMid,
    radioButtonPaddingHorizontal,
    fontSize,
    radioButtonBg,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    paddingXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusLG,
    radioCheckedColor,
    radioButtonCheckedBg,
    radioButtonHoverColor,
    radioButtonActiveColor,
    radioSolidCheckedColor,
    colorTextDisabled,
    colorBgContainerDisabled,
    radioDisabledButtonCheckedColor,
    radioDisabledButtonCheckedBg
  } = token;
  return {
    [`${componentCls}-button-wrapper`]: {
      position: "relative",
      display: "inline-block",
      height: controlHeight,
      margin: 0,
      paddingInline: radioButtonPaddingHorizontal,
      paddingBlock: 0,
      color: radioButtonColor,
      fontSize,
      lineHeight: `${controlHeight - lineWidth * 2}px`,
      background: radioButtonBg,
      border: `${lineWidth}px ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: lineWidth + 0.02,
      borderInlineStartWidth: 0,
      borderInlineEndWidth: lineWidth,
      cursor: "pointer",
      transition: [`color ${motionDurationMid}`, `background ${motionDurationMid}`, `border-color ${motionDurationMid}`, `box-shadow ${motionDurationMid}`].join(","),
      a: {
        color: radioButtonColor
      },
      [`> ${componentCls}-button`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: -1,
        width: "100%",
        height: "100%"
      },
      "&:not(:first-child)": {
        "&::before": {
          position: "absolute",
          insetBlockStart: -lineWidth,
          insetInlineStart: -lineWidth,
          display: "block",
          boxSizing: "content-box",
          width: 1,
          height: "100%",
          paddingBlock: lineWidth,
          paddingInline: 0,
          backgroundColor: colorBorder,
          transition: `background-color ${motionDurationSlow}`,
          content: '""'
        }
      },
      "&:first-child": {
        borderInlineStart: `${lineWidth}px ${lineType} ${colorBorder}`,
        borderStartStartRadius: borderRadius,
        borderEndStartRadius: borderRadius
      },
      "&:last-child": {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius
      },
      "&:first-child:last-child": {
        borderRadius
      },
      [`${componentCls}-group-large &`]: {
        height: controlHeightLG,
        fontSize: fontSizeLG,
        lineHeight: `${controlHeightLG - lineWidth * 2}px`,
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        }
      },
      [`${componentCls}-group-small &`]: {
        height: controlHeightSM,
        paddingInline: paddingXS - lineWidth,
        paddingBlock: 0,
        lineHeight: `${controlHeightSM - lineWidth * 2}px`,
        "&:first-child": {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM
        }
      },
      "&:hover": {
        position: "relative",
        color: radioCheckedColor
      },
      "&:has(:focus-visible)": _extends({}, genFocusOutline(token)),
      [`${componentCls}-inner, input[type='checkbox'], input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: "none"
      },
      [`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        zIndex: 1,
        color: radioCheckedColor,
        background: radioButtonCheckedBg,
        borderColor: radioCheckedColor,
        "&::before": {
          backgroundColor: radioCheckedColor
        },
        "&:first-child": {
          borderColor: radioCheckedColor
        },
        "&:hover": {
          color: radioButtonHoverColor,
          borderColor: radioButtonHoverColor,
          "&::before": {
            backgroundColor: radioButtonHoverColor
          }
        },
        "&:active": {
          color: radioButtonActiveColor,
          borderColor: radioButtonActiveColor,
          "&::before": {
            backgroundColor: radioButtonActiveColor
          }
        }
      },
      [`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        color: radioSolidCheckedColor,
        background: radioCheckedColor,
        borderColor: radioCheckedColor,
        "&:hover": {
          color: radioSolidCheckedColor,
          background: radioButtonHoverColor,
          borderColor: radioButtonHoverColor
        },
        "&:active": {
          color: radioSolidCheckedColor,
          background: radioButtonActiveColor,
          borderColor: radioButtonActiveColor
        }
      },
      "&-disabled": {
        color: colorTextDisabled,
        backgroundColor: colorBgContainerDisabled,
        borderColor: colorBorder,
        cursor: "not-allowed",
        "&:first-child, &:hover": {
          color: colorTextDisabled,
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder
        }
      },
      [`&-disabled${componentCls}-button-wrapper-checked`]: {
        color: radioDisabledButtonCheckedColor,
        backgroundColor: radioDisabledButtonCheckedBg,
        borderColor: colorBorder,
        boxShadow: "none"
      }
    }
  };
};
const useStyle$a = genComponentStyleHook("Radio", (token) => {
  const {
    padding,
    lineWidth,
    controlItemBgActiveDisabled,
    colorTextDisabled,
    colorBgContainer,
    fontSizeLG,
    controlOutline,
    colorPrimaryHover,
    colorPrimaryActive,
    colorText,
    colorPrimary,
    marginXS,
    controlOutlineWidth,
    colorTextLightSolid,
    wireframe
  } = token;
  const radioFocusShadow = `0 0 0 ${controlOutlineWidth}px ${controlOutline}`;
  const radioButtonFocusShadow = radioFocusShadow;
  const radioSize = fontSizeLG;
  const dotPadding = 4;
  const radioDotDisabledSize = radioSize - dotPadding * 2;
  const radioDotSize = wireframe ? radioDotDisabledSize : radioSize - (dotPadding + lineWidth) * 2;
  const radioCheckedColor = colorPrimary;
  const radioButtonColor = colorText;
  const radioButtonHoverColor = colorPrimaryHover;
  const radioButtonActiveColor = colorPrimaryActive;
  const radioButtonPaddingHorizontal = padding - lineWidth;
  const radioDisabledButtonCheckedColor = colorTextDisabled;
  const radioWrapperMarginRight = marginXS;
  const radioToken = merge(token, {
    radioFocusShadow,
    radioButtonFocusShadow,
    radioSize,
    radioDotSize,
    radioDotDisabledSize,
    radioCheckedColor,
    radioDotDisabledColor: colorTextDisabled,
    radioSolidCheckedColor: colorTextLightSolid,
    radioButtonBg: colorBgContainer,
    radioButtonCheckedBg: colorBgContainer,
    radioButtonColor,
    radioButtonHoverColor,
    radioButtonActiveColor,
    radioButtonPaddingHorizontal,
    radioDisabledButtonCheckedBg: controlItemBgActiveDisabled,
    radioDisabledButtonCheckedColor,
    radioWrapperMarginRight
  });
  return [getGroupRadioStyle(radioToken), getRadioBasicStyle(radioToken), getRadioButtonStyle(radioToken)];
});
var __rest$b = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const radioProps = () => ({
  prefixCls: String,
  checked: booleanType(),
  disabled: booleanType(),
  isGroup: booleanType(),
  value: PropTypes.any,
  name: String,
  id: String,
  autofocus: booleanType(),
  onChange: functionType(),
  onFocus: functionType(),
  onBlur: functionType(),
  onClick: functionType(),
  "onUpdate:checked": functionType(),
  "onUpdate:value": functionType()
});
const Radio = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ARadio",
  inheritAttrs: false,
  props: radioProps(),
  setup(props, _ref) {
    let {
      emit,
      expose,
      slots,
      attrs
    } = _ref;
    const formItemContext = useInjectFormItemContext();
    const formItemInputContext = FormItemInputContext.useInject();
    const radioOptionTypeContext = useInjectRadioOptionTypeContext();
    const radioGroupContext = useInjectRadioGroupContext();
    const disabledContext = useInjectDisabled();
    const mergedDisabled = computed(() => {
      var _a2;
      return (_a2 = disabled.value) !== null && _a2 !== void 0 ? _a2 : disabledContext.value;
    });
    const vcCheckbox = ref();
    const {
      prefixCls: radioPrefixCls,
      direction,
      disabled
    } = useConfigInject("radio", props);
    const prefixCls = computed(() => (radioGroupContext === null || radioGroupContext === void 0 ? void 0 : radioGroupContext.optionType.value) === "button" || radioOptionTypeContext === "button" ? `${radioPrefixCls.value}-button` : radioPrefixCls.value);
    const contextDisabled = useInjectDisabled();
    const [wrapSSR, hashId] = useStyle$a(radioPrefixCls);
    const focus = () => {
      vcCheckbox.value.focus();
    };
    const blur = () => {
      vcCheckbox.value.blur();
    };
    expose({
      focus,
      blur
    });
    const handleChange = (event) => {
      const targetChecked = event.target.checked;
      emit("update:checked", targetChecked);
      emit("update:value", targetChecked);
      emit("change", event);
      formItemContext.onFieldChange();
    };
    const onChange = (e) => {
      emit("change", e);
      if (radioGroupContext && radioGroupContext.onChange) {
        radioGroupContext.onChange(e);
      }
    };
    return () => {
      var _a2;
      const radioGroup = radioGroupContext;
      const {
        prefixCls: customizePrefixCls,
        id = formItemContext.id.value
      } = props, restProps = __rest$b(props, ["prefixCls", "id"]);
      const rProps = _extends(_extends({
        prefixCls: prefixCls.value,
        id
      }, omit(restProps, ["onUpdate:checked", "onUpdate:value"])), {
        disabled: (_a2 = disabled.value) !== null && _a2 !== void 0 ? _a2 : contextDisabled.value
      });
      if (radioGroup) {
        rProps.name = radioGroup.name.value;
        rProps.onChange = onChange;
        rProps.checked = props.value === radioGroup.value.value;
        rProps.disabled = mergedDisabled.value || radioGroup.disabled.value;
      } else {
        rProps.onChange = handleChange;
      }
      const wrapperClassString = classNames({
        [`${prefixCls.value}-wrapper`]: true,
        [`${prefixCls.value}-wrapper-checked`]: rProps.checked,
        [`${prefixCls.value}-wrapper-disabled`]: rProps.disabled,
        [`${prefixCls.value}-wrapper-rtl`]: direction.value === "rtl",
        [`${prefixCls.value}-wrapper-in-form-item`]: formItemInputContext.isFormItemInput
      }, attrs.class, hashId.value);
      return wrapSSR(createVNode("label", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": wrapperClassString
      }), [createVNode(VcCheckbox, _objectSpread2(_objectSpread2({}, rProps), {}, {
        "type": "radio",
        "ref": vcCheckbox
      }), null), slots.default && createVNode("span", null, [slots.default()])]));
    };
  }
});
const radioGroupProps = () => ({
  prefixCls: String,
  value: PropTypes.any,
  size: stringType(),
  options: arrayType(),
  disabled: booleanType(),
  name: String,
  buttonStyle: stringType("outline"),
  id: String,
  optionType: stringType("default"),
  onChange: functionType(),
  "onUpdate:value": functionType()
});
const __unplugin_components_3 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ARadioGroup",
  inheritAttrs: false,
  props: radioGroupProps(),
  // emits: ['update:value', 'change'],
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const formItemContext = useInjectFormItemContext();
    const {
      prefixCls,
      direction,
      size
    } = useConfigInject("radio", props);
    const [wrapSSR, hashId] = useStyle$a(prefixCls);
    const stateValue = ref(props.value);
    const updatingValue = ref(false);
    watch(() => props.value, (val) => {
      stateValue.value = val;
      updatingValue.value = false;
    });
    const onRadioChange = (ev) => {
      const lastValue = stateValue.value;
      const {
        value
      } = ev.target;
      if (!("value" in props)) {
        stateValue.value = value;
      }
      if (!updatingValue.value && value !== lastValue) {
        updatingValue.value = true;
        emit("update:value", value);
        emit("change", ev);
        formItemContext.onFieldChange();
      }
      nextTick(() => {
        updatingValue.value = false;
      });
    };
    useProvideRadioGroupContext({
      onChange: onRadioChange,
      value: stateValue,
      disabled: computed(() => props.disabled),
      name: computed(() => props.name),
      optionType: computed(() => props.optionType)
    });
    return () => {
      var _a2;
      const {
        options,
        buttonStyle,
        id = formItemContext.id.value
      } = props;
      const groupPrefixCls = `${prefixCls.value}-group`;
      const classString = classNames(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
        [`${groupPrefixCls}-${size.value}`]: size.value,
        [`${groupPrefixCls}-rtl`]: direction.value === "rtl"
      }, attrs.class, hashId.value);
      let children = null;
      if (options && options.length > 0) {
        children = options.map((option) => {
          if (typeof option === "string" || typeof option === "number") {
            return createVNode(Radio, {
              "key": option,
              "prefixCls": prefixCls.value,
              "disabled": props.disabled,
              "value": option,
              "checked": stateValue.value === option
            }, {
              default: () => [option]
            });
          }
          const {
            value,
            disabled,
            label
          } = option;
          return createVNode(Radio, {
            "key": `radio-group-value-options-${value}`,
            "prefixCls": prefixCls.value,
            "disabled": disabled || props.disabled,
            "value": value,
            "checked": stateValue.value === value
          }, {
            default: () => [label]
          });
        });
      } else {
        children = (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      }
      return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": classString,
        "id": id
      }), [children]));
    };
  }
});
const __unplugin_components_2 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ARadioButton",
  inheritAttrs: false,
  props: radioProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls
    } = useConfigInject("radio", props);
    useProvideRadioOptionTypeContext("button");
    return () => {
      var _a2;
      return createVNode(Radio, _objectSpread2(_objectSpread2(_objectSpread2({}, attrs), props), {}, {
        "prefixCls": prefixCls.value
      }), {
        default: () => [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]
      });
    };
  }
});
Radio.Group = __unplugin_components_3;
Radio.Button = __unplugin_components_2;
Radio.install = function(app) {
  app.component(Radio.name, Radio);
  app.component(Radio.Group.name, Radio.Group);
  app.component(Radio.Button.name, Radio.Button);
  return app;
};
const genPlaceholderStyle = (color) => ({
  // Firefox
  "&::-moz-placeholder": {
    opacity: 1
  },
  "&::placeholder": {
    color,
    userSelect: "none"
    // https://github.com/ant-design/ant-design/pull/32639
  },
  "&:placeholder-shown": {
    textOverflow: "ellipsis"
  }
});
const genHoverStyle = (token) => ({
  borderColor: token.inputBorderHoverColor,
  borderInlineEndWidth: token.lineWidth
});
const genActiveStyle = (token) => ({
  borderColor: token.inputBorderHoverColor,
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  borderInlineEndWidth: token.lineWidth,
  outline: 0
});
const genDisabledStyle = (token) => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "&:hover": _extends({}, genHoverStyle(merge(token, {
    inputBorderHoverColor: token.colorBorder
  })))
});
const genInputLargeStyle = (token) => {
  const {
    inputPaddingVerticalLG,
    fontSizeLG,
    lineHeightLG,
    borderRadiusLG,
    inputPaddingHorizontalLG
  } = token;
  return {
    padding: `${inputPaddingVerticalLG}px ${inputPaddingHorizontalLG}px`,
    fontSize: fontSizeLG,
    lineHeight: lineHeightLG,
    borderRadius: borderRadiusLG
  };
};
const genInputSmallStyle = (token) => ({
  padding: `${token.inputPaddingVerticalSM}px ${token.controlPaddingHorizontalSM - 1}px`,
  borderRadius: token.borderRadiusSM
});
const genBasicInputStyle = (token) => _extends(_extends({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${token.inputPaddingVertical}px ${token.inputPaddingHorizontal}px`,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.colorBgContainer,
  backgroundImage: "none",
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: token.colorBorder,
  borderRadius: token.borderRadius,
  transition: `all ${token.motionDurationMid}`
}, genPlaceholderStyle(token.colorTextPlaceholder)), {
  "&:hover": _extends({}, genHoverStyle(token)),
  "&:focus, &-focused": _extends({}, genActiveStyle(token)),
  "&-disabled, &[disabled]": _extends({}, genDisabledStyle(token)),
  "&-borderless": {
    "&, &:hover, &:focus, &-focused, &-disabled, &[disabled]": {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none"
    }
  },
  // Reset height for `textarea`s
  "textarea&": {
    maxWidth: "100%",
    height: "auto",
    minHeight: token.controlHeight,
    lineHeight: token.lineHeight,
    verticalAlign: "bottom",
    transition: `all ${token.motionDurationSlow}, height 0s`,
    resize: "vertical"
  },
  // Size
  "&-lg": _extends({}, genInputLargeStyle(token)),
  "&-sm": _extends({}, genInputSmallStyle(token)),
  // RTL
  "&-rtl": {
    direction: "rtl"
  },
  "&-textarea-rtl": {
    direction: "rtl"
  }
});
function initInputToken(token) {
  return merge(token, {
    inputAffixPadding: token.paddingXXS,
    inputPaddingVertical: Math.max(Math.round((token.controlHeight - token.fontSize * token.lineHeight) / 2 * 10) / 10 - token.lineWidth, 3),
    inputPaddingVerticalLG: Math.ceil((token.controlHeightLG - token.fontSizeLG * token.lineHeightLG) / 2 * 10) / 10 - token.lineWidth,
    inputPaddingVerticalSM: Math.max(Math.round((token.controlHeightSM - token.fontSize * token.lineHeight) / 2 * 10) / 10 - token.lineWidth, 0),
    inputPaddingHorizontal: token.paddingSM - token.lineWidth,
    inputPaddingHorizontalSM: token.paddingXS - token.lineWidth,
    inputPaddingHorizontalLG: token.controlPaddingHorizontal - token.lineWidth,
    inputBorderHoverColor: token.colorPrimaryHover,
    inputBorderActiveColor: token.colorPrimaryHover
  });
}
const genPikerPadding = (token, inputHeight, fontSize, paddingHorizontal) => {
  const {
    lineHeight
  } = token;
  const fontHeight = Math.floor(fontSize * lineHeight) + 2;
  const paddingTop = Math.max((inputHeight - fontHeight) / 2, 0);
  const paddingBottom = Math.max(inputHeight - fontHeight - paddingTop, 0);
  return {
    padding: `${paddingTop}px ${paddingHorizontal}px ${paddingBottom}px`
  };
};
const genPickerCellInnerStyle = (token) => {
  const {
    componentCls,
    pickerCellCls,
    pickerCellInnerCls,
    pickerPanelCellHeight,
    motionDurationSlow,
    borderRadiusSM,
    motionDurationMid,
    controlItemBgHover,
    lineWidth,
    lineType,
    colorPrimary,
    controlItemBgActive,
    colorTextLightSolid,
    controlHeightSM,
    pickerDateHoverRangeBorderColor,
    pickerCellBorderGap,
    pickerBasicCellHoverWithRangeColor,
    pickerPanelCellWidth,
    colorTextDisabled,
    colorBgContainerDisabled
  } = token;
  return {
    "&::before": {
      position: "absolute",
      top: "50%",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: pickerPanelCellHeight,
      transform: "translateY(-50%)",
      transition: `all ${motionDurationSlow}`,
      content: '""'
    },
    // >>> Default
    [pickerCellInnerCls]: {
      position: "relative",
      zIndex: 2,
      display: "inline-block",
      minWidth: pickerPanelCellHeight,
      height: pickerPanelCellHeight,
      lineHeight: `${pickerPanelCellHeight}px`,
      borderRadius: borderRadiusSM,
      transition: `background ${motionDurationMid}, border ${motionDurationMid}`
    },
    // >>> Hover
    [`&:hover:not(${pickerCellCls}-in-view),
    &:hover:not(${pickerCellCls}-selected):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end):not(${pickerCellCls}-range-hover-start):not(${pickerCellCls}-range-hover-end)`]: {
      [pickerCellInnerCls]: {
        background: controlItemBgHover
      }
    },
    // >>> Today
    [`&-in-view${pickerCellCls}-today ${pickerCellInnerCls}`]: {
      "&::before": {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 1,
        border: `${lineWidth}px ${lineType} ${colorPrimary}`,
        borderRadius: borderRadiusSM,
        content: '""'
      }
    },
    // >>> In Range
    [`&-in-view${pickerCellCls}-in-range`]: {
      position: "relative",
      "&::before": {
        background: controlItemBgActive
      }
    },
    // >>> Selected
    [`&-in-view${pickerCellCls}-selected ${pickerCellInnerCls},
      &-in-view${pickerCellCls}-range-start ${pickerCellInnerCls},
      &-in-view${pickerCellCls}-range-end ${pickerCellInnerCls}`]: {
      color: colorTextLightSolid,
      background: colorPrimary
    },
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-start-single),
      &-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-end-single)`]: {
      "&::before": {
        background: controlItemBgActive
      }
    },
    [`&-in-view${pickerCellCls}-range-start::before`]: {
      insetInlineStart: "50%"
    },
    [`&-in-view${pickerCellCls}-range-end::before`]: {
      insetInlineEnd: "50%"
    },
    // >>> Range Hover
    [`&-in-view${pickerCellCls}-range-hover-start:not(${pickerCellCls}-in-range):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end),
      &-in-view${pickerCellCls}-range-hover-end:not(${pickerCellCls}-in-range):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end),
      &-in-view${pickerCellCls}-range-hover-start${pickerCellCls}-range-start-single,
      &-in-view${pickerCellCls}-range-hover-start${pickerCellCls}-range-start${pickerCellCls}-range-end${pickerCellCls}-range-end-near-hover,
      &-in-view${pickerCellCls}-range-hover-end${pickerCellCls}-range-start${pickerCellCls}-range-end${pickerCellCls}-range-start-near-hover,
      &-in-view${pickerCellCls}-range-hover-end${pickerCellCls}-range-end-single,
      &-in-view${pickerCellCls}-range-hover:not(${pickerCellCls}-in-range)`]: {
      "&::after": {
        position: "absolute",
        top: "50%",
        zIndex: 0,
        height: controlHeightSM,
        borderTop: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
        borderBottom: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
        transform: "translateY(-50%)",
        transition: `all ${motionDurationSlow}`,
        content: '""'
      }
    },
    // Add space for stash
    [`&-range-hover-start::after,
      &-range-hover-end::after,
      &-range-hover::after`]: {
      insetInlineEnd: 0,
      insetInlineStart: pickerCellBorderGap
    },
    // Hover with in range
    [`&-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover::before,
      &-in-view${pickerCellCls}-range-start${pickerCellCls}-range-hover::before,
      &-in-view${pickerCellCls}-range-end${pickerCellCls}-range-hover::before,
      &-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-start-single)${pickerCellCls}-range-hover-start::before,
      &-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-end-single)${pickerCellCls}-range-hover-end::before,
      ${componentCls}-panel
      > :not(${componentCls}-date-panel)
      &-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover-start::before,
      ${componentCls}-panel
      > :not(${componentCls}-date-panel)
      &-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover-end::before`]: {
      background: pickerBasicCellHoverWithRangeColor
    },
    // range start border-radius
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-start-single):not(${pickerCellCls}-range-end) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: borderRadiusSM,
      borderEndStartRadius: borderRadiusSM,
      borderStartEndRadius: 0,
      borderEndEndRadius: 0
    },
    // range end border-radius
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-end-single):not(${pickerCellCls}-range-start) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      borderStartEndRadius: borderRadiusSM,
      borderEndEndRadius: borderRadiusSM
    },
    [`&-range-hover${pickerCellCls}-range-end::after`]: {
      insetInlineStart: "50%"
    },
    // Edge start
    [`tr > &-in-view${pickerCellCls}-range-hover:first-child::after,
      tr > &-in-view${pickerCellCls}-range-hover-end:first-child::after,
      &-in-view${pickerCellCls}-start${pickerCellCls}-range-hover-edge-start${pickerCellCls}-range-hover-edge-start-near-range::after,
      &-in-view${pickerCellCls}-range-hover-edge-start:not(${pickerCellCls}-range-hover-edge-start-near-range)::after,
      &-in-view${pickerCellCls}-range-hover-start::after`]: {
      insetInlineStart: (pickerPanelCellWidth - pickerPanelCellHeight) / 2,
      borderInlineStart: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
      borderStartStartRadius: lineWidth,
      borderEndStartRadius: lineWidth
    },
    // Edge end
    [`tr > &-in-view${pickerCellCls}-range-hover:last-child::after,
      tr > &-in-view${pickerCellCls}-range-hover-start:last-child::after,
      &-in-view${pickerCellCls}-end${pickerCellCls}-range-hover-edge-end${pickerCellCls}-range-hover-edge-end-near-range::after,
      &-in-view${pickerCellCls}-range-hover-edge-end:not(${pickerCellCls}-range-hover-edge-end-near-range)::after,
      &-in-view${pickerCellCls}-range-hover-end::after`]: {
      insetInlineEnd: (pickerPanelCellWidth - pickerPanelCellHeight) / 2,
      borderInlineEnd: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
      borderStartEndRadius: lineWidth,
      borderEndEndRadius: lineWidth
    },
    // >>> Disabled
    "&-disabled": {
      color: colorTextDisabled,
      pointerEvents: "none",
      [pickerCellInnerCls]: {
        background: "transparent"
      },
      "&::before": {
        background: colorBgContainerDisabled
      }
    },
    [`&-disabled${pickerCellCls}-today ${pickerCellInnerCls}::before`]: {
      borderColor: colorTextDisabled
    }
  };
};
const genPanelStyle = (token) => {
  const {
    componentCls,
    pickerCellInnerCls,
    pickerYearMonthCellWidth,
    pickerControlIconSize,
    pickerPanelCellWidth,
    paddingSM,
    paddingXS,
    paddingXXS,
    colorBgContainer,
    lineWidth,
    lineType,
    borderRadiusLG,
    colorPrimary,
    colorTextHeading,
    colorSplit,
    pickerControlIconBorderWidth,
    colorIcon,
    pickerTextHeight,
    motionDurationMid,
    colorIconHover,
    fontWeightStrong,
    pickerPanelCellHeight,
    pickerCellPaddingVertical,
    colorTextDisabled,
    colorText,
    fontSize,
    pickerBasicCellHoverWithRangeColor,
    motionDurationSlow,
    pickerPanelWithoutTimeCellHeight,
    pickerQuarterPanelContentHeight,
    colorLink,
    colorLinkActive,
    colorLinkHover,
    pickerDateHoverRangeBorderColor,
    borderRadiusSM,
    colorTextLightSolid,
    borderRadius,
    controlItemBgHover,
    pickerTimePanelColumnHeight,
    pickerTimePanelColumnWidth,
    pickerTimePanelCellHeight,
    controlItemBgActive,
    marginXXS
  } = token;
  const pickerPanelWidth = pickerPanelCellWidth * 7 + paddingSM * 2 + 4;
  const hoverCellFixedDistance = (pickerPanelWidth - paddingXS * 2) / 3 - pickerYearMonthCellWidth - paddingSM;
  return {
    [componentCls]: {
      "&-panel": {
        display: "inline-flex",
        flexDirection: "column",
        textAlign: "center",
        background: colorBgContainer,
        border: `${lineWidth}px ${lineType} ${colorSplit}`,
        borderRadius: borderRadiusLG,
        outline: "none",
        "&-focused": {
          borderColor: colorPrimary
        },
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: {
            transform: "rotate(45deg)"
          },
          [`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: {
            transform: "rotate(-135deg)"
          }
        }
      },
      // ========================================================
      // =                     Shared Panel                     =
      // ========================================================
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel,
        &-week-panel,
        &-date-panel,
        &-time-panel`]: {
        display: "flex",
        flexDirection: "column",
        width: pickerPanelWidth
      },
      // ======================= Header =======================
      "&-header": {
        display: "flex",
        padding: `0 ${paddingXS}px`,
        color: colorTextHeading,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
        "> *": {
          flex: "none"
        },
        button: {
          padding: 0,
          color: colorIcon,
          lineHeight: `${pickerTextHeight}px`,
          background: "transparent",
          border: 0,
          cursor: "pointer",
          transition: `color ${motionDurationMid}`
        },
        "> button": {
          minWidth: "1.6em",
          fontSize,
          "&:hover": {
            color: colorIconHover
          }
        },
        "&-view": {
          flex: "auto",
          fontWeight: fontWeightStrong,
          lineHeight: `${pickerTextHeight}px`,
          button: {
            color: "inherit",
            fontWeight: "inherit",
            verticalAlign: "top",
            "&:not(:first-child)": {
              marginInlineStart: paddingXS
            },
            "&:hover": {
              color: colorPrimary
            }
          }
        }
      },
      // Arrow button
      [`&-prev-icon,
        &-next-icon,
        &-super-prev-icon,
        &-super-next-icon`]: {
        position: "relative",
        display: "inline-block",
        width: pickerControlIconSize,
        height: pickerControlIconSize,
        "&::before": {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          display: "inline-block",
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: `0 solid currentcolor`,
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderBlockEndWidth: 0,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          borderInlineEndWidth: 0,
          content: '""'
        }
      },
      [`&-super-prev-icon,
        &-super-next-icon`]: {
        "&::after": {
          position: "absolute",
          top: Math.ceil(pickerControlIconSize / 2),
          insetInlineStart: Math.ceil(pickerControlIconSize / 2),
          display: "inline-block",
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: "0 solid currentcolor",
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderBlockEndWidth: 0,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          borderInlineEndWidth: 0,
          content: '""'
        }
      },
      [`&-prev-icon,
        &-super-prev-icon`]: {
        transform: "rotate(-45deg)"
      },
      [`&-next-icon,
        &-super-next-icon`]: {
        transform: "rotate(135deg)"
      },
      // ======================== Body ========================
      "&-content": {
        width: "100%",
        tableLayout: "fixed",
        borderCollapse: "collapse",
        "th, td": {
          position: "relative",
          minWidth: pickerPanelCellHeight,
          fontWeight: "normal"
        },
        th: {
          height: pickerPanelCellHeight + pickerCellPaddingVertical * 2,
          color: colorText,
          verticalAlign: "middle"
        }
      },
      "&-cell": _extends({
        padding: `${pickerCellPaddingVertical}px 0`,
        color: colorTextDisabled,
        cursor: "pointer",
        // In view
        "&-in-view": {
          color: colorText
        }
      }, genPickerCellInnerStyle(token)),
      // DatePanel only
      [`&-date-panel ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-start ${pickerCellInnerCls},
        &-date-panel ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-end ${pickerCellInnerCls}`]: {
        "&::after": {
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: -1,
          background: pickerBasicCellHoverWithRangeColor,
          transition: `all ${motionDurationSlow}`,
          content: '""'
        }
      },
      [`&-date-panel
        ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-start
        ${pickerCellInnerCls}::after`]: {
        insetInlineEnd: -(pickerPanelCellWidth - pickerPanelCellHeight) / 2,
        insetInlineStart: 0
      },
      [`&-date-panel ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-end ${pickerCellInnerCls}::after`]: {
        insetInlineEnd: 0,
        insetInlineStart: -(pickerPanelCellWidth - pickerPanelCellHeight) / 2
      },
      // Hover with range start & end
      [`&-range-hover${componentCls}-range-start::after`]: {
        insetInlineEnd: "50%"
      },
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-content`]: {
          height: pickerPanelWithoutTimeCellHeight * 4
        },
        [pickerCellInnerCls]: {
          padding: `0 ${paddingXS}px`
        }
      },
      "&-quarter-panel": {
        [`${componentCls}-content`]: {
          height: pickerQuarterPanelContentHeight
        }
      },
      // ======================== Footer ========================
      [`&-panel ${componentCls}-footer`]: {
        borderTop: `${lineWidth}px ${lineType} ${colorSplit}`
      },
      "&-footer": {
        width: "min-content",
        minWidth: "100%",
        lineHeight: `${pickerTextHeight - 2 * lineWidth}px`,
        textAlign: "center",
        "&-extra": {
          padding: `0 ${paddingSM}`,
          lineHeight: `${pickerTextHeight - 2 * lineWidth}px`,
          textAlign: "start",
          "&:not(:last-child)": {
            borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`
          }
        }
      },
      "&-now": {
        textAlign: "start"
      },
      "&-today-btn": {
        color: colorLink,
        "&:hover": {
          color: colorLinkHover
        },
        "&:active": {
          color: colorLinkActive
        },
        [`&${componentCls}-today-btn-disabled`]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        }
      },
      // ========================================================
      // =                       Special                        =
      // ========================================================
      // ===================== Decade Panel =====================
      "&-decade-panel": {
        [pickerCellInnerCls]: {
          padding: `0 ${paddingXS / 2}px`
        },
        [`${componentCls}-cell::before`]: {
          display: "none"
        }
      },
      // ============= Year & Quarter & Month Panel =============
      [`&-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-body`]: {
          padding: `0 ${paddingXS}px`
        },
        [pickerCellInnerCls]: {
          width: pickerYearMonthCellWidth
        },
        [`${componentCls}-cell-range-hover-start::after`]: {
          insetInlineStart: hoverCellFixedDistance,
          borderInlineStart: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
          borderStartStartRadius: borderRadiusSM,
          borderBottomStartRadius: borderRadiusSM,
          borderStartEndRadius: 0,
          borderBottomEndRadius: 0,
          [`${componentCls}-panel-rtl &`]: {
            insetInlineEnd: hoverCellFixedDistance,
            borderInlineEnd: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
            borderStartStartRadius: 0,
            borderBottomStartRadius: 0,
            borderStartEndRadius: borderRadiusSM,
            borderBottomEndRadius: borderRadiusSM
          }
        },
        [`${componentCls}-cell-range-hover-end::after`]: {
          insetInlineEnd: hoverCellFixedDistance,
          borderInlineEnd: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
          borderStartEndRadius: borderRadius,
          borderEndEndRadius: borderRadius,
          [`${componentCls}-panel-rtl &`]: {
            insetInlineStart: hoverCellFixedDistance,
            borderInlineStart: `${lineWidth}px dashed ${pickerDateHoverRangeBorderColor}`,
            borderStartStartRadius: borderRadius,
            borderEndStartRadius: borderRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        }
      },
      // ====================== Week Panel ======================
      "&-week-panel": {
        [`${componentCls}-body`]: {
          padding: `${paddingXS}px ${paddingSM}px`
        },
        // Clear cell style
        [`${componentCls}-cell`]: {
          [`&:hover ${pickerCellInnerCls},
            &-selected ${pickerCellInnerCls},
            ${pickerCellInnerCls}`]: {
            background: "transparent !important"
          }
        },
        "&-row": {
          td: {
            transition: `background ${motionDurationMid}`,
            "&:first-child": {
              borderStartStartRadius: borderRadiusSM,
              borderEndStartRadius: borderRadiusSM
            },
            "&:last-child": {
              borderStartEndRadius: borderRadiusSM,
              borderEndEndRadius: borderRadiusSM
            }
          },
          "&:hover td": {
            background: controlItemBgHover
          },
          [`&-selected td,
            &-selected:hover td`]: {
            background: colorPrimary,
            [`&${componentCls}-cell-week`]: {
              color: new TinyColor(colorTextLightSolid).setAlpha(0.5).toHexString()
            },
            [`&${componentCls}-cell-today ${pickerCellInnerCls}::before`]: {
              borderColor: colorTextLightSolid
            },
            [pickerCellInnerCls]: {
              color: colorTextLightSolid
            }
          }
        }
      },
      // ====================== Date Panel ======================
      "&-date-panel": {
        [`${componentCls}-body`]: {
          padding: `${paddingXS}px ${paddingSM}px`
        },
        [`${componentCls}-content`]: {
          width: pickerPanelCellWidth * 7,
          th: {
            width: pickerPanelCellWidth
          }
        }
      },
      // ==================== Datetime Panel ====================
      "&-datetime-panel": {
        display: "flex",
        [`${componentCls}-time-panel`]: {
          borderInlineStart: `${lineWidth}px ${lineType} ${colorSplit}`
        },
        [`${componentCls}-date-panel,
          ${componentCls}-time-panel`]: {
          transition: `opacity ${motionDurationSlow}`
        },
        // Keyboard
        "&-active": {
          [`${componentCls}-date-panel,
            ${componentCls}-time-panel`]: {
            opacity: 0.3,
            "&-active": {
              opacity: 1
            }
          }
        }
      },
      // ====================== Time Panel ======================
      "&-time-panel": {
        width: "auto",
        minWidth: "auto",
        direction: "ltr",
        [`${componentCls}-content`]: {
          display: "flex",
          flex: "auto",
          height: pickerTimePanelColumnHeight
        },
        "&-column": {
          flex: "1 0 auto",
          width: pickerTimePanelColumnWidth,
          margin: `${paddingXXS}px 0`,
          padding: 0,
          overflowY: "hidden",
          textAlign: "start",
          listStyle: "none",
          transition: `background ${motionDurationMid}`,
          overflowX: "hidden",
          "&::after": {
            display: "block",
            height: pickerTimePanelColumnHeight - pickerTimePanelCellHeight,
            content: '""'
          },
          "&:not(:first-child)": {
            borderInlineStart: `${lineWidth}px ${lineType} ${colorSplit}`
          },
          "&-active": {
            background: new TinyColor(controlItemBgActive).setAlpha(0.2).toHexString()
          },
          "&:hover": {
            overflowY: "auto"
          },
          "> li": {
            margin: 0,
            padding: 0,
            [`&${componentCls}-time-panel-cell`]: {
              marginInline: marginXXS,
              [`${componentCls}-time-panel-cell-inner`]: {
                display: "block",
                width: pickerTimePanelColumnWidth - 2 * marginXXS,
                height: pickerTimePanelCellHeight,
                margin: 0,
                paddingBlock: 0,
                paddingInlineEnd: 0,
                paddingInlineStart: (pickerTimePanelColumnWidth - pickerTimePanelCellHeight) / 2,
                color: colorText,
                lineHeight: `${pickerTimePanelCellHeight}px`,
                borderRadius: borderRadiusSM,
                cursor: "pointer",
                transition: `background ${motionDurationMid}`,
                "&:hover": {
                  background: controlItemBgHover
                }
              },
              "&-selected": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  background: controlItemBgActive
                }
              },
              "&-disabled": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  color: colorTextDisabled,
                  background: "transparent",
                  cursor: "not-allowed"
                }
              }
            }
          }
        }
      },
      // https://github.com/ant-design/ant-design/issues/39227
      [`&-datetime-panel ${componentCls}-time-panel-column:after`]: {
        height: pickerTimePanelColumnHeight - pickerTimePanelCellHeight + paddingXXS * 2
      }
    }
  };
};
const genPickerStatusStyle = (token) => {
  const {
    componentCls,
    colorBgContainer,
    colorError,
    colorErrorOutline,
    colorWarning,
    colorWarningOutline
  } = token;
  return {
    [componentCls]: {
      [`&-status-error${componentCls}`]: {
        "&, &:not([disabled]):hover": {
          backgroundColor: colorBgContainer,
          borderColor: colorError
        },
        "&-focused, &:focus": _extends({}, genActiveStyle(merge(token, {
          inputBorderActiveColor: colorError,
          inputBorderHoverColor: colorError,
          controlOutline: colorErrorOutline
        }))),
        [`${componentCls}-active-bar`]: {
          background: colorError
        }
      },
      [`&-status-warning${componentCls}`]: {
        "&, &:not([disabled]):hover": {
          backgroundColor: colorBgContainer,
          borderColor: colorWarning
        },
        "&-focused, &:focus": _extends({}, genActiveStyle(merge(token, {
          inputBorderActiveColor: colorWarning,
          inputBorderHoverColor: colorWarning,
          controlOutline: colorWarningOutline
        }))),
        [`${componentCls}-active-bar`]: {
          background: colorWarning
        }
      }
    }
  };
};
const genPickerStyle = (token) => {
  const {
    componentCls,
    antCls,
    boxShadowPopoverArrow,
    controlHeight,
    fontSize,
    inputPaddingHorizontal,
    colorBgContainer,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    motionDurationMid,
    colorBgContainerDisabled,
    colorTextDisabled,
    colorTextPlaceholder,
    controlHeightLG,
    fontSizeLG,
    controlHeightSM,
    inputPaddingHorizontalSM,
    paddingXS,
    marginXS,
    colorTextDescription,
    lineWidthBold,
    lineHeight,
    colorPrimary,
    motionDurationSlow,
    zIndexPopup,
    paddingXXS,
    paddingSM,
    pickerTextHeight,
    controlItemBgActive,
    colorPrimaryBorder,
    sizePopupArrow,
    borderRadiusXS,
    borderRadiusOuter,
    colorBgElevated,
    borderRadiusLG,
    boxShadowSecondary,
    borderRadiusSM,
    colorSplit,
    controlItemBgHover,
    presetsWidth,
    presetsMaxWidth
  } = token;
  return [
    {
      [componentCls]: _extends(_extends(_extends({}, resetComponent(token)), genPikerPadding(token, controlHeight, fontSize, inputPaddingHorizontal)), {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        background: colorBgContainer,
        lineHeight: 1,
        border: `${lineWidth}px ${lineType} ${colorBorder}`,
        borderRadius,
        transition: `border ${motionDurationMid}, box-shadow ${motionDurationMid}`,
        "&:hover, &-focused": _extends({}, genHoverStyle(token)),
        "&-focused": _extends({}, genActiveStyle(token)),
        [`&${componentCls}-disabled`]: {
          background: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: "not-allowed",
          [`${componentCls}-suffix`]: {
            color: colorTextDisabled
          }
        },
        [`&${componentCls}-borderless`]: {
          backgroundColor: "transparent !important",
          borderColor: "transparent !important",
          boxShadow: "none !important"
        },
        // ======================== Input =========================
        [`${componentCls}-input`]: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: "100%",
          "> input": _extends(_extends({}, genBasicInputStyle(token)), {
            flex: "auto",
            // Fix Firefox flex not correct:
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            minWidth: 1,
            height: "auto",
            padding: 0,
            background: "transparent",
            border: 0,
            "&:focus": {
              boxShadow: "none"
            },
            "&[disabled]": {
              background: "transparent"
            }
          }),
          "&:hover": {
            [`${componentCls}-clear`]: {
              opacity: 1
            }
          },
          "&-placeholder": {
            "> input": {
              color: colorTextPlaceholder
            }
          }
        },
        // Size
        "&-large": _extends(_extends({}, genPikerPadding(token, controlHeightLG, fontSizeLG, inputPaddingHorizontal)), {
          [`${componentCls}-input > input`]: {
            fontSize: fontSizeLG
          }
        }),
        "&-small": _extends({}, genPikerPadding(token, controlHeightSM, fontSize, inputPaddingHorizontalSM)),
        [`${componentCls}-suffix`]: {
          display: "flex",
          flex: "none",
          alignSelf: "center",
          marginInlineStart: paddingXS / 2,
          color: colorTextDisabled,
          lineHeight: 1,
          pointerEvents: "none",
          "> *": {
            verticalAlign: "top",
            "&:not(:last-child)": {
              marginInlineEnd: marginXS
            }
          }
        },
        [`${componentCls}-clear`]: {
          position: "absolute",
          top: "50%",
          insetInlineEnd: 0,
          color: colorTextDisabled,
          lineHeight: 1,
          background: colorBgContainer,
          transform: "translateY(-50%)",
          cursor: "pointer",
          opacity: 0,
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,
          "> *": {
            verticalAlign: "top"
          },
          "&:hover": {
            color: colorTextDescription
          }
        },
        [`${componentCls}-separator`]: {
          position: "relative",
          display: "inline-block",
          width: "1em",
          height: fontSizeLG,
          color: colorTextDisabled,
          fontSize: fontSizeLG,
          verticalAlign: "top",
          cursor: "default",
          [`${componentCls}-focused &`]: {
            color: colorTextDescription
          },
          [`${componentCls}-range-separator &`]: {
            [`${componentCls}-disabled &`]: {
              cursor: "not-allowed"
            }
          }
        },
        // ======================== Range =========================
        "&-range": {
          position: "relative",
          display: "inline-flex",
          // Clear
          [`${componentCls}-clear`]: {
            insetInlineEnd: inputPaddingHorizontal
          },
          "&:hover": {
            [`${componentCls}-clear`]: {
              opacity: 1
            }
          },
          // Active bar
          [`${componentCls}-active-bar`]: {
            bottom: -lineWidth,
            height: lineWidthBold,
            marginInlineStart: inputPaddingHorizontal,
            background: colorPrimary,
            opacity: 0,
            transition: `all ${motionDurationSlow} ease-out`,
            pointerEvents: "none"
          },
          [`&${componentCls}-focused`]: {
            [`${componentCls}-active-bar`]: {
              opacity: 1
            }
          },
          [`${componentCls}-range-separator`]: {
            alignItems: "center",
            padding: `0 ${paddingXS}px`,
            lineHeight: 1
          },
          [`&${componentCls}-small`]: {
            [`${componentCls}-clear`]: {
              insetInlineEnd: inputPaddingHorizontalSM
            },
            [`${componentCls}-active-bar`]: {
              marginInlineStart: inputPaddingHorizontalSM
            }
          }
        },
        // ======================= Dropdown =======================
        "&-dropdown": _extends(_extends(_extends({}, resetComponent(token)), genPanelStyle(token)), {
          position: "absolute",
          // Fix incorrect position of picker popup
          // https://github.com/ant-design/ant-design/issues/35590
          top: -9999,
          left: {
            _skip_check_: true,
            value: -9999
          },
          zIndex: zIndexPopup,
          [`&${componentCls}-dropdown-hidden`]: {
            display: "none"
          },
          [`&${componentCls}-dropdown-placement-bottomLeft`]: {
            [`${componentCls}-range-arrow`]: {
              top: 0,
              display: "block",
              transform: "translateY(-100%)"
            }
          },
          [`&${componentCls}-dropdown-placement-topLeft`]: {
            [`${componentCls}-range-arrow`]: {
              bottom: 0,
              display: "block",
              transform: "translateY(100%) rotate(180deg)"
            }
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownIn
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpIn
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownOut
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpOut
          },
          // Time picker with additional style
          [`${componentCls}-panel > ${componentCls}-time-panel`]: {
            paddingTop: paddingXXS
          },
          // ======================== Ranges ========================
          [`${componentCls}-ranges`]: {
            marginBottom: 0,
            padding: `${paddingXXS}px ${paddingSM}px`,
            overflow: "hidden",
            lineHeight: `${pickerTextHeight - 2 * lineWidth - paddingXS / 2}px`,
            textAlign: "start",
            listStyle: "none",
            display: "flex",
            justifyContent: "space-between",
            "> li": {
              display: "inline-block"
            },
            // https://github.com/ant-design/ant-design/issues/23687
            [`${componentCls}-preset > ${antCls}-tag-blue`]: {
              color: colorPrimary,
              background: controlItemBgActive,
              borderColor: colorPrimaryBorder,
              cursor: "pointer"
            },
            [`${componentCls}-ok`]: {
              marginInlineStart: "auto"
            }
          },
          [`${componentCls}-range-wrapper`]: {
            display: "flex",
            position: "relative"
          },
          [`${componentCls}-range-arrow`]: _extends({
            position: "absolute",
            zIndex: 1,
            display: "none",
            marginInlineStart: inputPaddingHorizontal * 1.5,
            transition: `left ${motionDurationSlow} ease-out`
          }, roundedArrow(sizePopupArrow, borderRadiusXS, borderRadiusOuter, colorBgElevated, boxShadowPopoverArrow)),
          [`${componentCls}-panel-container`]: {
            overflow: "hidden",
            verticalAlign: "top",
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            transition: `margin ${motionDurationSlow}`,
            // ======================== Layout ========================
            [`${componentCls}-panel-layout`]: {
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "stretch"
            },
            // ======================== Preset ========================
            [`${componentCls}-presets`]: {
              display: "flex",
              flexDirection: "column",
              minWidth: presetsWidth,
              maxWidth: presetsMaxWidth,
              ul: {
                height: 0,
                flex: "auto",
                listStyle: "none",
                overflow: "auto",
                margin: 0,
                padding: paddingXS,
                borderInlineEnd: `${lineWidth}px ${lineType} ${colorSplit}`,
                li: _extends(_extends({}, textEllipsis), {
                  borderRadius: borderRadiusSM,
                  paddingInline: paddingXS,
                  paddingBlock: (controlHeightSM - Math.round(fontSize * lineHeight)) / 2,
                  cursor: "pointer",
                  transition: `all ${motionDurationSlow}`,
                  "+ li": {
                    marginTop: marginXS
                  },
                  "&:hover": {
                    background: controlItemBgHover
                  }
                })
              }
            },
            // ======================== Panels ========================
            [`${componentCls}-panels`]: {
              display: "inline-flex",
              flexWrap: "nowrap",
              direction: "ltr",
              [`${componentCls}-panel`]: {
                borderWidth: `0 0 ${lineWidth}px`
              },
              "&:last-child": {
                [`${componentCls}-panel`]: {
                  borderWidth: 0
                }
              }
            },
            [`${componentCls}-panel`]: {
              verticalAlign: "top",
              background: "transparent",
              borderRadius: 0,
              borderWidth: 0,
              [`${componentCls}-content,
            table`]: {
                textAlign: "center"
              },
              "&-focused": {
                borderColor: colorBorder
              }
            }
          }
        }),
        "&-dropdown-range": {
          padding: `${sizePopupArrow * 2 / 3}px 0`,
          "&-hidden": {
            display: "none"
          }
        },
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-separator`]: {
            transform: "rotate(180deg)"
          },
          [`${componentCls}-footer`]: {
            "&-extra": {
              direction: "rtl"
            }
          }
        }
      })
    },
    // Follow code may reuse in other components
    initSlideMotion(token, "slide-up"),
    initSlideMotion(token, "slide-down"),
    initMoveMotion(token, "move-up"),
    initMoveMotion(token, "move-down")
  ];
};
const initPickerPanelToken = (token) => {
  const pickerTimePanelCellHeight = 28;
  const {
    componentCls,
    controlHeightLG,
    controlHeightSM,
    colorPrimary,
    paddingXXS
  } = token;
  return {
    pickerCellCls: `${componentCls}-cell`,
    pickerCellInnerCls: `${componentCls}-cell-inner`,
    pickerTextHeight: controlHeightLG,
    pickerPanelCellWidth: controlHeightSM * 1.5,
    pickerPanelCellHeight: controlHeightSM,
    pickerDateHoverRangeBorderColor: new TinyColor(colorPrimary).lighten(20).toHexString(),
    pickerBasicCellHoverWithRangeColor: new TinyColor(colorPrimary).lighten(35).toHexString(),
    pickerPanelWithoutTimeCellHeight: controlHeightLG * 1.65,
    pickerYearMonthCellWidth: controlHeightLG * 1.5,
    pickerTimePanelColumnHeight: pickerTimePanelCellHeight * 8,
    pickerTimePanelColumnWidth: controlHeightLG * 1.4,
    pickerTimePanelCellHeight,
    pickerQuarterPanelContentHeight: controlHeightLG * 1.4,
    pickerCellPaddingVertical: paddingXXS,
    pickerCellBorderGap: 2,
    pickerControlIconSize: 7,
    pickerControlIconBorderWidth: 1.5
  };
};
const useStyle$9 = genComponentStyleHook("DatePicker", (token) => {
  const pickerToken = merge(initInputToken(token), initPickerPanelToken(token));
  return [
    genPickerStyle(pickerToken),
    genPickerStatusStyle(pickerToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      focusElCls: `${token.componentCls}-focused`
    })
  ];
}, (token) => ({
  presetsWidth: 120,
  presetsMaxWidth: 200,
  zIndexPopup: token.zIndexPopupBase + 50
}));
function useRaf(callback) {
  const rafRef = shallowRef();
  const removedRef = shallowRef(false);
  function trigger() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!removedRef.value) {
      wrapperRaf.cancel(rafRef.value);
      rafRef.value = wrapperRaf(() => {
        callback(...args);
      });
    }
  }
  onBeforeUnmount(() => {
    removedRef.value = true;
    wrapperRaf.cancel(rafRef.value);
  });
  return trigger;
}
function useRafState(defaultState) {
  const batchRef = shallowRef([]);
  const state = shallowRef(typeof defaultState === "function" ? defaultState() : defaultState);
  const flushUpdate = useRaf(() => {
    let value = state.value;
    batchRef.value.forEach((callback) => {
      value = callback(value);
    });
    batchRef.value = [];
    state.value = value;
  });
  function updater(callback) {
    batchRef.value.push(callback);
    flushUpdate();
  }
  return [state, updater];
}
const TabNode = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TabNode",
  props: {
    id: {
      type: String
    },
    prefixCls: {
      type: String
    },
    tab: {
      type: Object
    },
    active: {
      type: Boolean
    },
    closable: {
      type: Boolean
    },
    editable: {
      type: Object
    },
    onClick: {
      type: Function
    },
    onResize: {
      type: Function
    },
    renderWrapper: {
      type: Function
    },
    removeAriaLabel: {
      type: String
    },
    // onRemove: { type: Function as PropType<() => void> },
    onFocus: {
      type: Function
    }
  },
  emits: ["click", "resize", "remove", "focus"],
  setup(props, _ref) {
    let {
      expose,
      attrs
    } = _ref;
    const domRef = ref();
    function onInternalClick(e) {
      var _a2;
      if ((_a2 = props.tab) === null || _a2 === void 0 ? void 0 : _a2.disabled) {
        return;
      }
      props.onClick(e);
    }
    expose({
      domRef
    });
    function onRemoveTab(event) {
      var _a2;
      event.preventDefault();
      event.stopPropagation();
      props.editable.onEdit("remove", {
        key: (_a2 = props.tab) === null || _a2 === void 0 ? void 0 : _a2.key,
        event
      });
    }
    const removable = computed(() => {
      var _a2;
      return props.editable && props.closable !== false && !((_a2 = props.tab) === null || _a2 === void 0 ? void 0 : _a2.disabled);
    });
    return () => {
      var _a2;
      const {
        prefixCls,
        id,
        active,
        tab: {
          key: key2,
          tab,
          disabled,
          closeIcon
        },
        renderWrapper,
        removeAriaLabel,
        editable,
        onFocus
      } = props;
      const tabPrefix = `${prefixCls}-tab`;
      const node = createVNode("div", {
        "key": key2,
        "ref": domRef,
        "class": classNames(tabPrefix, {
          [`${tabPrefix}-with-remove`]: removable.value,
          [`${tabPrefix}-active`]: active,
          [`${tabPrefix}-disabled`]: disabled
        }),
        "style": attrs.style,
        "onClick": onInternalClick
      }, [createVNode("div", {
        "role": "tab",
        "aria-selected": active,
        "id": id && `${id}-tab-${key2}`,
        "class": `${tabPrefix}-btn`,
        "aria-controls": id && `${id}-panel-${key2}`,
        "aria-disabled": disabled,
        "tabindex": disabled ? null : 0,
        "onClick": (e) => {
          e.stopPropagation();
          onInternalClick(e);
        },
        "onKeydown": (e) => {
          if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
            e.preventDefault();
            onInternalClick(e);
          }
        },
        "onFocus": onFocus
      }, [typeof tab === "function" ? tab() : tab]), removable.value && createVNode("button", {
        "type": "button",
        "aria-label": removeAriaLabel || "remove",
        "tabindex": 0,
        "class": `${tabPrefix}-remove`,
        "onClick": (e) => {
          e.stopPropagation();
          onRemoveTab(e);
        }
      }, [(closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon()) || ((_a2 = editable.removeIcon) === null || _a2 === void 0 ? void 0 : _a2.call(editable)) || "×"])]);
      return renderWrapper ? renderWrapper(node) : node;
    };
  }
});
const DEFAULT_SIZE$1 = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
};
function useOffsets(tabs, tabSizes) {
  const offsetMap = ref(/* @__PURE__ */ new Map());
  watchEffect(() => {
    var _a2, _b;
    const map = /* @__PURE__ */ new Map();
    const tabsValue = tabs.value;
    const lastOffset = tabSizes.value.get((_a2 = tabsValue[0]) === null || _a2 === void 0 ? void 0 : _a2.key) || DEFAULT_SIZE$1;
    const rightOffset = lastOffset.left + lastOffset.width;
    for (let i = 0; i < tabsValue.length; i += 1) {
      const {
        key: key2
      } = tabsValue[i];
      let data = tabSizes.value.get(key2);
      if (!data) {
        data = tabSizes.value.get((_b = tabsValue[i - 1]) === null || _b === void 0 ? void 0 : _b.key) || DEFAULT_SIZE$1;
      }
      const entity = map.get(key2) || _extends({}, data);
      entity.right = rightOffset - entity.left - entity.width;
      map.set(key2, entity);
    }
    offsetMap.value = new Map(map);
  });
  return offsetMap;
}
const AddButton = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AddButton",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    editable: {
      type: Object
    },
    locale: {
      type: Object,
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      expose,
      attrs
    } = _ref;
    const domRef = ref();
    expose({
      domRef
    });
    return () => {
      const {
        prefixCls,
        editable,
        locale: locale2
      } = props;
      if (!editable || editable.showAdd === false) {
        return null;
      }
      return createVNode("button", {
        "ref": domRef,
        "type": "button",
        "class": `${prefixCls}-nav-add`,
        "style": attrs.style,
        "aria-label": (locale2 === null || locale2 === void 0 ? void 0 : locale2.addAriaLabel) || "Add tab",
        "onClick": (event) => {
          editable.onEdit("add", {
            event
          });
        }
      }, [editable.addIcon ? editable.addIcon() : "+"]);
    };
  }
});
const operationNodeProps = {
  prefixCls: {
    type: String
  },
  id: {
    type: String
  },
  tabs: {
    type: Object
  },
  rtl: {
    type: Boolean
  },
  tabBarGutter: {
    type: Number
  },
  activeKey: {
    type: [String, Number]
  },
  mobile: {
    type: Boolean
  },
  moreIcon: PropTypes.any,
  moreTransitionName: {
    type: String
  },
  editable: {
    type: Object
  },
  locale: {
    type: Object,
    default: void 0
  },
  removeAriaLabel: String,
  onTabClick: {
    type: Function
  },
  popupClassName: String,
  getPopupContainer: functionType()
};
const OperationNode = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "OperationNode",
  inheritAttrs: false,
  props: operationNodeProps,
  emits: ["tabClick"],
  slots: Object,
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const [open, setOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const selectOffset = (offset) => {
      const enabledTabs = props.tabs.filter((tab) => !tab.disabled);
      let selectedIndex = enabledTabs.findIndex((tab) => tab.key === selectedKey.value) || 0;
      const len = enabledTabs.length;
      for (let i = 0; i < len; i += 1) {
        selectedIndex = (selectedIndex + offset + len) % len;
        const tab = enabledTabs[selectedIndex];
        if (!tab.disabled) {
          setSelectedKey(tab.key);
          return;
        }
      }
    };
    const onKeyDown = (e) => {
      const {
        which
      } = e;
      if (!open.value) {
        if ([KeyCode.DOWN, KeyCode.SPACE, KeyCode.ENTER].includes(which)) {
          setOpen(true);
          e.preventDefault();
        }
        return;
      }
      switch (which) {
        case KeyCode.UP:
          selectOffset(-1);
          e.preventDefault();
          break;
        case KeyCode.DOWN:
          selectOffset(1);
          e.preventDefault();
          break;
        case KeyCode.ESC:
          setOpen(false);
          break;
        case KeyCode.SPACE:
        case KeyCode.ENTER:
          if (selectedKey.value !== null) props.onTabClick(selectedKey.value, e);
          break;
      }
    };
    const popupId = computed(() => `${props.id}-more-popup`);
    const selectedItemId = computed(() => selectedKey.value !== null ? `${popupId.value}-${selectedKey.value}` : null);
    const onRemoveTab = (event, key2) => {
      event.preventDefault();
      event.stopPropagation();
      props.editable.onEdit("remove", {
        key: key2,
        event
      });
    };
    onMounted(() => {
      watch(selectedKey, () => {
        const ele = document.getElementById(selectedItemId.value);
        if (ele && ele.scrollIntoView) {
          ele.scrollIntoView(false);
        }
      }, {
        flush: "post",
        immediate: true
      });
    });
    watch(open, () => {
      if (!open.value) {
        setSelectedKey(null);
      }
    });
    useProvideOverride({});
    return () => {
      var _a2;
      const {
        prefixCls,
        id,
        tabs,
        locale: locale2,
        mobile,
        moreIcon = ((_a2 = slots.moreIcon) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || createVNode(EllipsisOutlined, null, null),
        moreTransitionName,
        editable,
        tabBarGutter,
        rtl: rtl2,
        onTabClick,
        popupClassName
      } = props;
      if (!tabs.length) return null;
      const dropdownPrefix = `${prefixCls}-dropdown`;
      const dropdownAriaLabel = locale2 === null || locale2 === void 0 ? void 0 : locale2.dropdownAriaLabel;
      const moreStyle = {
        [rtl2 ? "marginRight" : "marginLeft"]: tabBarGutter
      };
      if (!tabs.length) {
        moreStyle.visibility = "hidden";
        moreStyle.order = 1;
      }
      const overlayClassName = classNames({
        [`${dropdownPrefix}-rtl`]: rtl2,
        [`${popupClassName}`]: true
      });
      const moreNode = mobile ? null : createVNode(Dropdown$1, {
        "prefixCls": dropdownPrefix,
        "trigger": ["hover"],
        "visible": open.value,
        "transitionName": moreTransitionName,
        "onVisibleChange": setOpen,
        "overlayClassName": overlayClassName,
        "mouseEnterDelay": 0.1,
        "mouseLeaveDelay": 0.1,
        "getPopupContainer": props.getPopupContainer
      }, {
        overlay: () => createVNode(Menu, {
          "onClick": (_ref2) => {
            let {
              key: key2,
              domEvent
            } = _ref2;
            onTabClick(key2, domEvent);
            setOpen(false);
          },
          "id": popupId.value,
          "tabindex": -1,
          "role": "listbox",
          "aria-activedescendant": selectedItemId.value,
          "selectedKeys": [selectedKey.value],
          "aria-label": dropdownAriaLabel !== void 0 ? dropdownAriaLabel : "expanded dropdown"
        }, {
          default: () => [tabs.map((tab) => {
            var _a3, _b;
            const removable = editable && tab.closable !== false && !tab.disabled;
            return createVNode(__unplugin_components_1$1, {
              "key": tab.key,
              "id": `${popupId.value}-${tab.key}`,
              "role": "option",
              "aria-controls": id && `${id}-panel-${tab.key}`,
              "disabled": tab.disabled
            }, {
              default: () => [createVNode("span", null, [typeof tab.tab === "function" ? tab.tab() : tab.tab]), removable && createVNode("button", {
                "type": "button",
                "aria-label": props.removeAriaLabel || "remove",
                "tabindex": 0,
                "class": `${dropdownPrefix}-menu-item-remove`,
                "onClick": (e) => {
                  e.stopPropagation();
                  onRemoveTab(e, tab.key);
                }
              }, [((_a3 = tab.closeIcon) === null || _a3 === void 0 ? void 0 : _a3.call(tab)) || ((_b = editable.removeIcon) === null || _b === void 0 ? void 0 : _b.call(editable)) || "×"])]
            });
          })]
        }),
        default: () => createVNode("button", {
          "type": "button",
          "class": `${prefixCls}-nav-more`,
          "style": moreStyle,
          "tabindex": -1,
          "aria-hidden": "true",
          "aria-haspopup": "listbox",
          "aria-controls": popupId.value,
          "id": `${id}-more`,
          "aria-expanded": open.value,
          "onKeydown": onKeyDown
        }, [moreIcon])
      });
      return createVNode("div", {
        "class": classNames(`${prefixCls}-nav-operations`, attrs.class),
        "style": attrs.style
      }, [moreNode, createVNode(AddButton, {
        "prefixCls": prefixCls,
        "locale": locale2,
        "editable": editable
      }, null)]);
    };
  }
});
const TabsContextKey = Symbol("tabsContextKey");
const useProvideTabs = (props) => {
  provide(TabsContextKey, props);
};
const useInjectTabs = () => {
  return inject(TabsContextKey, {
    tabs: ref([]),
    prefixCls: ref()
  });
};
const MIN_SWIPE_DISTANCE = 0.1;
const STOP_SWIPE_DISTANCE = 0.01;
const REFRESH_INTERVAL$1 = 20;
const SPEED_OFF_MULTIPLE = Math.pow(0.995, REFRESH_INTERVAL$1);
function useTouchMove(domRef, onOffset) {
  const [touchPosition, setTouchPosition] = useState();
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [lastTimeDiff, setLastTimeDiff] = useState(0);
  const [lastOffset, setLastOffset] = useState();
  const motionInterval = ref();
  function onTouchStart(e) {
    const {
      screenX,
      screenY
    } = e.touches[0];
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    clearInterval(motionInterval.value);
  }
  function onTouchMove(e) {
    if (!touchPosition.value) return;
    e.preventDefault();
    const {
      screenX,
      screenY
    } = e.touches[0];
    const offsetX = screenX - touchPosition.value.x;
    const offsetY = screenY - touchPosition.value.y;
    onOffset(offsetX, offsetY);
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    const now2 = Date.now();
    setLastTimeDiff(now2 - lastTimestamp.value);
    setLastTimestamp(now2);
    setLastOffset({
      x: offsetX,
      y: offsetY
    });
  }
  function onTouchEnd() {
    if (!touchPosition.value) return;
    const lastOffsetValue = lastOffset.value;
    setTouchPosition(null);
    setLastOffset(null);
    if (lastOffsetValue) {
      const distanceX = lastOffsetValue.x / lastTimeDiff.value;
      const distanceY = lastOffsetValue.y / lastTimeDiff.value;
      const absX = Math.abs(distanceX);
      const absY = Math.abs(distanceY);
      if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) return;
      let currentX = distanceX;
      let currentY = distanceY;
      motionInterval.value = setInterval(() => {
        if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
          clearInterval(motionInterval.value);
          return;
        }
        currentX *= SPEED_OFF_MULTIPLE;
        currentY *= SPEED_OFF_MULTIPLE;
        onOffset(currentX * REFRESH_INTERVAL$1, currentY * REFRESH_INTERVAL$1);
      }, REFRESH_INTERVAL$1);
    }
  }
  const lastWheelDirectionRef = ref();
  function onWheel(e) {
    const {
      deltaX,
      deltaY
    } = e;
    let mixed = 0;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX === absY) {
      mixed = lastWheelDirectionRef.value === "x" ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      lastWheelDirectionRef.value = "x";
    } else {
      mixed = deltaY;
      lastWheelDirectionRef.value = "y";
    }
    if (onOffset(-mixed, -mixed)) {
      e.preventDefault();
    }
  }
  const touchEventsRef = ref({
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onWheel
  });
  function onProxyTouchStart(e) {
    touchEventsRef.value.onTouchStart(e);
  }
  function onProxyTouchMove(e) {
    touchEventsRef.value.onTouchMove(e);
  }
  function onProxyTouchEnd(e) {
    touchEventsRef.value.onTouchEnd(e);
  }
  function onProxyWheel(e) {
    touchEventsRef.value.onWheel(e);
  }
  onMounted(() => {
    var _a2, _b;
    document.addEventListener("touchmove", onProxyTouchMove, {
      passive: false
    });
    document.addEventListener("touchend", onProxyTouchEnd, {
      passive: false
    });
    (_a2 = domRef.value) === null || _a2 === void 0 ? void 0 : _a2.addEventListener("touchstart", onProxyTouchStart, {
      passive: false
    });
    (_b = domRef.value) === null || _b === void 0 ? void 0 : _b.addEventListener("wheel", onProxyWheel, {
      passive: false
    });
  });
  onBeforeUnmount(() => {
    document.removeEventListener("touchmove", onProxyTouchMove);
    document.removeEventListener("touchend", onProxyTouchEnd);
  });
}
function useSyncState(defaultState, onChange) {
  const stateRef = ref(defaultState);
  function setState(updater) {
    const newValue = typeof updater === "function" ? updater(stateRef.value) : updater;
    if (newValue !== stateRef.value) {
      onChange(newValue, stateRef.value);
    }
    stateRef.value = newValue;
  }
  return [stateRef, setState];
}
const useRefs = () => {
  const refs = ref(/* @__PURE__ */ new Map());
  const setRef = (key2) => (el) => {
    refs.value.set(key2, el);
  };
  onBeforeUpdate(() => {
    refs.value = /* @__PURE__ */ new Map();
  });
  return [setRef, refs];
};
const DEFAULT_SIZE = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0
};
const tabNavListProps = () => {
  return {
    id: {
      type: String
    },
    tabPosition: {
      type: String
    },
    activeKey: {
      type: [String, Number]
    },
    rtl: {
      type: Boolean
    },
    animated: objectType(),
    editable: objectType(),
    moreIcon: PropTypes.any,
    moreTransitionName: {
      type: String
    },
    mobile: {
      type: Boolean
    },
    tabBarGutter: {
      type: Number
    },
    renderTabBar: {
      type: Function
    },
    locale: objectType(),
    popupClassName: String,
    getPopupContainer: functionType(),
    onTabClick: {
      type: Function
    },
    onTabScroll: {
      type: Function
    }
  };
};
const getTabSize = (tab, containerRect) => {
  const {
    offsetWidth,
    offsetHeight,
    offsetTop,
    offsetLeft
  } = tab;
  const {
    width,
    height,
    x,
    y
  } = tab.getBoundingClientRect();
  if (Math.abs(width - offsetWidth) < 1) {
    return [width, height, x - containerRect.x, y - containerRect.y];
  }
  return [offsetWidth, offsetHeight, offsetLeft, offsetTop];
};
const TabNavList = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TabNavList",
  inheritAttrs: false,
  props: tabNavListProps(),
  slots: Object,
  emits: ["tabClick", "tabScroll"],
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      tabs,
      prefixCls
    } = useInjectTabs();
    const tabsWrapperRef = shallowRef();
    const tabListRef = shallowRef();
    const operationsRef = shallowRef();
    const innerAddButtonRef = shallowRef();
    const [setRef, btnRefs] = useRefs();
    const tabPositionTopOrBottom = computed(() => props.tabPosition === "top" || props.tabPosition === "bottom");
    const [transformLeft, setTransformLeft] = useSyncState(0, (next, prev) => {
      if (tabPositionTopOrBottom.value && props.onTabScroll) {
        props.onTabScroll({
          direction: next > prev ? "left" : "right"
        });
      }
    });
    const [transformTop, setTransformTop] = useSyncState(0, (next, prev) => {
      if (!tabPositionTopOrBottom.value && props.onTabScroll) {
        props.onTabScroll({
          direction: next > prev ? "top" : "bottom"
        });
      }
    });
    const [wrapperScrollWidth, setWrapperScrollWidth] = useState(0);
    const [wrapperScrollHeight, setWrapperScrollHeight] = useState(0);
    const [wrapperWidth, setWrapperWidth] = useState(null);
    const [wrapperHeight, setWrapperHeight] = useState(null);
    const [addWidth, setAddWidth] = useState(0);
    const [addHeight, setAddHeight] = useState(0);
    const [tabSizes, setTabSizes] = useRafState(/* @__PURE__ */ new Map());
    const tabOffsets = useOffsets(tabs, tabSizes);
    const operationsHiddenClassName = computed(() => `${prefixCls.value}-nav-operations-hidden`);
    const transformMin = shallowRef(0);
    const transformMax = shallowRef(0);
    watchEffect(() => {
      if (!tabPositionTopOrBottom.value) {
        transformMin.value = Math.min(0, wrapperHeight.value - wrapperScrollHeight.value);
        transformMax.value = 0;
      } else if (props.rtl) {
        transformMin.value = 0;
        transformMax.value = Math.max(0, wrapperScrollWidth.value - wrapperWidth.value);
      } else {
        transformMin.value = Math.min(0, wrapperWidth.value - wrapperScrollWidth.value);
        transformMax.value = 0;
      }
    });
    const alignInRange = (value) => {
      if (value < transformMin.value) {
        return transformMin.value;
      }
      if (value > transformMax.value) {
        return transformMax.value;
      }
      return value;
    };
    const touchMovingRef = shallowRef();
    const [lockAnimation, setLockAnimation] = useState();
    const doLockAnimation = () => {
      setLockAnimation(Date.now());
    };
    const clearTouchMoving = () => {
      clearTimeout(touchMovingRef.value);
    };
    const doMove = (setState, offset) => {
      setState((value) => {
        const newValue = alignInRange(value + offset);
        return newValue;
      });
    };
    useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
      if (tabPositionTopOrBottom.value) {
        if (wrapperWidth.value >= wrapperScrollWidth.value) {
          return false;
        }
        doMove(setTransformLeft, offsetX);
      } else {
        if (wrapperHeight.value >= wrapperScrollHeight.value) {
          return false;
        }
        doMove(setTransformTop, offsetY);
      }
      clearTouchMoving();
      doLockAnimation();
      return true;
    });
    watch(lockAnimation, () => {
      clearTouchMoving();
      if (lockAnimation.value) {
        touchMovingRef.value = setTimeout(() => {
          setLockAnimation(0);
        }, 100);
      }
    });
    const scrollToTab = function() {
      let key2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activeKey;
      const tabOffset = tabOffsets.value.get(key2) || {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0
      };
      if (tabPositionTopOrBottom.value) {
        let newTransform = transformLeft.value;
        if (props.rtl) {
          if (tabOffset.right < transformLeft.value) {
            newTransform = tabOffset.right;
          } else if (tabOffset.right + tabOffset.width > transformLeft.value + wrapperWidth.value) {
            newTransform = tabOffset.right + tabOffset.width - wrapperWidth.value;
          }
        } else if (tabOffset.left < -transformLeft.value) {
          newTransform = -tabOffset.left;
        } else if (tabOffset.left + tabOffset.width > -transformLeft.value + wrapperWidth.value) {
          newTransform = -(tabOffset.left + tabOffset.width - wrapperWidth.value);
        }
        setTransformTop(0);
        setTransformLeft(alignInRange(newTransform));
      } else {
        let newTransform = transformTop.value;
        if (tabOffset.top < -transformTop.value) {
          newTransform = -tabOffset.top;
        } else if (tabOffset.top + tabOffset.height > -transformTop.value + wrapperHeight.value) {
          newTransform = -(tabOffset.top + tabOffset.height - wrapperHeight.value);
        }
        setTransformLeft(0);
        setTransformTop(alignInRange(newTransform));
      }
    };
    const visibleStart = shallowRef(0);
    const visibleEnd = shallowRef(0);
    watchEffect(() => {
      let unit;
      let position;
      let transformSize;
      let basicSize;
      let tabContentSize;
      let addSize;
      const tabOffsetsValue = tabOffsets.value;
      if (["top", "bottom"].includes(props.tabPosition)) {
        unit = "width";
        basicSize = wrapperWidth.value;
        tabContentSize = wrapperScrollWidth.value;
        addSize = addWidth.value;
        position = props.rtl ? "right" : "left";
        transformSize = Math.abs(transformLeft.value);
      } else {
        unit = "height";
        basicSize = wrapperHeight.value;
        tabContentSize = wrapperScrollWidth.value;
        addSize = addHeight.value;
        position = "top";
        transformSize = -transformTop.value;
      }
      let mergedBasicSize = basicSize;
      if (tabContentSize + addSize > basicSize && tabContentSize < basicSize) {
        mergedBasicSize = basicSize - addSize;
      }
      const tabsVal = tabs.value;
      if (!tabsVal.length) {
        return [visibleStart.value, visibleEnd.value] = [0, 0];
      }
      const len = tabsVal.length;
      let endIndex = len;
      for (let i = 0; i < len; i += 1) {
        const offset = tabOffsetsValue.get(tabsVal[i].key) || DEFAULT_SIZE;
        if (offset[position] + offset[unit] > transformSize + mergedBasicSize) {
          endIndex = i - 1;
          break;
        }
      }
      let startIndex = 0;
      for (let i = len - 1; i >= 0; i -= 1) {
        const offset = tabOffsetsValue.get(tabsVal[i].key) || DEFAULT_SIZE;
        if (offset[position] < transformSize) {
          startIndex = i + 1;
          break;
        }
      }
      return [visibleStart.value, visibleEnd.value] = [startIndex, endIndex];
    });
    const updateTabSizes = () => {
      setTabSizes(() => {
        var _a2;
        const newSizes = /* @__PURE__ */ new Map();
        const listRect = (_a2 = tabListRef.value) === null || _a2 === void 0 ? void 0 : _a2.getBoundingClientRect();
        tabs.value.forEach((_ref2) => {
          let {
            key: key2
          } = _ref2;
          const btnRef = btnRefs.value.get(key2);
          const btnNode = (btnRef === null || btnRef === void 0 ? void 0 : btnRef.$el) || btnRef;
          if (btnNode) {
            const [width, height, left, top] = getTabSize(btnNode, listRect);
            newSizes.set(key2, {
              width,
              height,
              left,
              top
            });
          }
        });
        return newSizes;
      });
    };
    watch(() => tabs.value.map((tab) => tab.key).join("%%"), () => {
      updateTabSizes();
    }, {
      flush: "post"
    });
    const onListHolderResize = () => {
      var _a2, _b, _c, _d, _e;
      const offsetWidth = ((_a2 = tabsWrapperRef.value) === null || _a2 === void 0 ? void 0 : _a2.offsetWidth) || 0;
      const offsetHeight = ((_b = tabsWrapperRef.value) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
      const addDom = ((_c = innerAddButtonRef.value) === null || _c === void 0 ? void 0 : _c.$el) || {};
      const newAddWidth = addDom.offsetWidth || 0;
      const newAddHeight = addDom.offsetHeight || 0;
      setWrapperWidth(offsetWidth);
      setWrapperHeight(offsetHeight);
      setAddWidth(newAddWidth);
      setAddHeight(newAddHeight);
      const newWrapperScrollWidth = (((_d = tabListRef.value) === null || _d === void 0 ? void 0 : _d.offsetWidth) || 0) - newAddWidth;
      const newWrapperScrollHeight = (((_e = tabListRef.value) === null || _e === void 0 ? void 0 : _e.offsetHeight) || 0) - newAddHeight;
      setWrapperScrollWidth(newWrapperScrollWidth);
      setWrapperScrollHeight(newWrapperScrollHeight);
      updateTabSizes();
    };
    const hiddenTabs = computed(() => [...tabs.value.slice(0, visibleStart.value), ...tabs.value.slice(visibleEnd.value + 1)]);
    const [inkStyle, setInkStyle] = useState();
    const activeTabOffset = computed(() => tabOffsets.value.get(props.activeKey));
    const inkBarRafRef = shallowRef();
    const cleanInkBarRaf = () => {
      wrapperRaf.cancel(inkBarRafRef.value);
    };
    watch([activeTabOffset, tabPositionTopOrBottom, () => props.rtl], () => {
      const newInkStyle = {};
      if (activeTabOffset.value) {
        if (tabPositionTopOrBottom.value) {
          if (props.rtl) {
            newInkStyle.right = toPx(activeTabOffset.value.right);
          } else {
            newInkStyle.left = toPx(activeTabOffset.value.left);
          }
          newInkStyle.width = toPx(activeTabOffset.value.width);
        } else {
          newInkStyle.top = toPx(activeTabOffset.value.top);
          newInkStyle.height = toPx(activeTabOffset.value.height);
        }
      }
      cleanInkBarRaf();
      inkBarRafRef.value = wrapperRaf(() => {
        setInkStyle(newInkStyle);
      });
    });
    watch([() => props.activeKey, activeTabOffset, tabOffsets, tabPositionTopOrBottom], () => {
      scrollToTab();
    }, {
      flush: "post"
    });
    watch([() => props.rtl, () => props.tabBarGutter, () => props.activeKey, () => tabs.value], () => {
      onListHolderResize();
    }, {
      flush: "post"
    });
    const ExtraContent = (_ref3) => {
      let {
        position,
        prefixCls: prefixCls2,
        extra
      } = _ref3;
      if (!extra) return null;
      const content = extra === null || extra === void 0 ? void 0 : extra({
        position
      });
      return content ? createVNode("div", {
        "class": `${prefixCls2}-extra-content`
      }, [content]) : null;
    };
    onBeforeUnmount(() => {
      clearTouchMoving();
      cleanInkBarRaf();
    });
    return () => {
      const {
        id,
        animated,
        activeKey,
        rtl: rtl2,
        editable,
        locale: locale2,
        tabPosition,
        tabBarGutter,
        onTabClick
      } = props;
      const {
        class: className,
        style
      } = attrs;
      const pre = prefixCls.value;
      const hasDropdown = !!hiddenTabs.value.length;
      const wrapPrefix = `${pre}-nav-wrap`;
      let pingLeft;
      let pingRight;
      let pingTop;
      let pingBottom;
      if (tabPositionTopOrBottom.value) {
        if (rtl2) {
          pingRight = transformLeft.value > 0;
          pingLeft = transformLeft.value + wrapperWidth.value < wrapperScrollWidth.value;
        } else {
          pingLeft = transformLeft.value < 0;
          pingRight = -transformLeft.value + wrapperWidth.value < wrapperScrollWidth.value;
        }
      } else {
        pingTop = transformTop.value < 0;
        pingBottom = -transformTop.value + wrapperHeight.value < wrapperScrollHeight.value;
      }
      const tabNodeStyle = {};
      if (tabPosition === "top" || tabPosition === "bottom") {
        tabNodeStyle[rtl2 ? "marginRight" : "marginLeft"] = typeof tabBarGutter === "number" ? `${tabBarGutter}px` : tabBarGutter;
      } else {
        tabNodeStyle.marginTop = typeof tabBarGutter === "number" ? `${tabBarGutter}px` : tabBarGutter;
      }
      const tabNodes = tabs.value.map((tab, i) => {
        const {
          key: key2
        } = tab;
        return createVNode(TabNode, {
          "id": id,
          "prefixCls": pre,
          "key": key2,
          "tab": tab,
          "style": i === 0 ? void 0 : tabNodeStyle,
          "closable": tab.closable,
          "editable": editable,
          "active": key2 === activeKey,
          "removeAriaLabel": locale2 === null || locale2 === void 0 ? void 0 : locale2.removeAriaLabel,
          "ref": setRef(key2),
          "onClick": (e) => {
            onTabClick(key2, e);
          },
          "onFocus": () => {
            scrollToTab(key2);
            doLockAnimation();
            if (!tabsWrapperRef.value) {
              return;
            }
            if (!rtl2) {
              tabsWrapperRef.value.scrollLeft = 0;
            }
            tabsWrapperRef.value.scrollTop = 0;
          }
        }, slots);
      });
      return createVNode("div", {
        "role": "tablist",
        "class": classNames(`${pre}-nav`, className),
        "style": style,
        "onKeydown": () => {
          doLockAnimation();
        }
      }, [createVNode(ExtraContent, {
        "position": "left",
        "prefixCls": pre,
        "extra": slots.leftExtra
      }, null), createVNode(ResizeObserver$1, {
        "onResize": onListHolderResize
      }, {
        default: () => [createVNode("div", {
          "class": classNames(wrapPrefix, {
            [`${wrapPrefix}-ping-left`]: pingLeft,
            [`${wrapPrefix}-ping-right`]: pingRight,
            [`${wrapPrefix}-ping-top`]: pingTop,
            [`${wrapPrefix}-ping-bottom`]: pingBottom
          }),
          "ref": tabsWrapperRef
        }, [createVNode(ResizeObserver$1, {
          "onResize": onListHolderResize
        }, {
          default: () => [createVNode("div", {
            "ref": tabListRef,
            "class": `${pre}-nav-list`,
            "style": {
              transform: `translate(${transformLeft.value}px, ${transformTop.value}px)`,
              transition: lockAnimation.value ? "none" : void 0
            }
          }, [tabNodes, createVNode(AddButton, {
            "ref": innerAddButtonRef,
            "prefixCls": pre,
            "locale": locale2,
            "editable": editable,
            "style": _extends(_extends({}, tabNodes.length === 0 ? void 0 : tabNodeStyle), {
              visibility: hasDropdown ? "hidden" : null
            })
          }, null), createVNode("div", {
            "class": classNames(`${pre}-ink-bar`, {
              [`${pre}-ink-bar-animated`]: animated.inkBar
            }),
            "style": inkStyle.value
          }, null)])]
        })])]
      }), createVNode(OperationNode, _objectSpread2(_objectSpread2({}, props), {}, {
        "removeAriaLabel": locale2 === null || locale2 === void 0 ? void 0 : locale2.removeAriaLabel,
        "ref": operationsRef,
        "prefixCls": pre,
        "tabs": hiddenTabs.value,
        "class": !hasDropdown && operationsHiddenClassName.value
      }), pick(slots, ["moreIcon"])), createVNode(ExtraContent, {
        "position": "right",
        "prefixCls": pre,
        "extra": slots.rightExtra
      }, null), createVNode(ExtraContent, {
        "position": "right",
        "prefixCls": pre,
        "extra": slots.tabBarExtraContent
      }, null)]);
    };
  }
});
const TabPanelList = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TabPanelList",
  inheritAttrs: false,
  props: {
    activeKey: {
      type: [String, Number]
    },
    id: {
      type: String
    },
    rtl: {
      type: Boolean
    },
    animated: {
      type: Object,
      default: void 0
    },
    tabPosition: {
      type: String
    },
    destroyInactiveTabPane: {
      type: Boolean
    }
  },
  setup(props) {
    const {
      tabs,
      prefixCls
    } = useInjectTabs();
    return () => {
      const {
        id,
        activeKey,
        animated,
        tabPosition,
        rtl: rtl2,
        destroyInactiveTabPane
      } = props;
      const tabPaneAnimated = animated.tabPane;
      const pre = prefixCls.value;
      const activeIndex = tabs.value.findIndex((tab) => tab.key === activeKey);
      return createVNode("div", {
        "class": `${pre}-content-holder`
      }, [createVNode("div", {
        "class": [`${pre}-content`, `${pre}-content-${tabPosition}`, {
          [`${pre}-content-animated`]: tabPaneAnimated
        }],
        "style": activeIndex && tabPaneAnimated ? {
          [rtl2 ? "marginRight" : "marginLeft"]: `-${activeIndex}00%`
        } : null
      }, [tabs.value.map((tab) => {
        return cloneElement(tab.node, {
          key: tab.key,
          prefixCls: pre,
          tabKey: tab.key,
          id,
          animated: tabPaneAnimated,
          active: tab.key === activeKey,
          destroyInactiveTabPane
        });
      })])]);
    };
  }
});
const genMotionStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  return [
    {
      [componentCls]: {
        [`${componentCls}-switch`]: {
          "&-appear, &-enter": {
            transition: "none",
            "&-start": {
              opacity: 0
            },
            "&-active": {
              opacity: 1,
              transition: `opacity ${motionDurationSlow}`
            }
          },
          "&-leave": {
            position: "absolute",
            transition: "none",
            inset: 0,
            "&-start": {
              opacity: 1
            },
            "&-active": {
              opacity: 0,
              transition: `opacity ${motionDurationSlow}`
            }
          }
        }
      }
    },
    // Follow code may reuse in other components
    [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down")]
  ];
};
const genCardStyle = (token) => {
  const {
    componentCls,
    tabsCardHorizontalPadding,
    tabsCardHeadBackground,
    tabsCardGutter,
    colorSplit
  } = token;
  return {
    [`${componentCls}-card`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: 0,
          padding: tabsCardHorizontalPadding,
          background: tabsCardHeadBackground,
          border: `${token.lineWidth}px ${token.lineType} ${colorSplit}`,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`
        },
        [`${componentCls}-tab-active`]: {
          color: token.colorPrimary,
          background: token.colorBgContainer
        },
        [`${componentCls}-ink-bar`]: {
          visibility: "hidden"
        }
      },
      // ========================== Top & Bottom ==========================
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginLeft: {
              _skip_check_: true,
              value: `${tabsCardGutter}px`
            }
          }
        }
      },
      [`&${componentCls}-top`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`
          },
          [`${componentCls}-tab-active`]: {
            borderBottomColor: token.colorBgContainer
          }
        }
      },
      [`&${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`
          },
          [`${componentCls}-tab-active`]: {
            borderTopColor: token.colorBgContainer
          }
        }
      },
      // ========================== Left & Right ==========================
      [`&${componentCls}-left, &${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginTop: `${tabsCardGutter}px`
          }
        }
      },
      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${token.borderRadiusLG}px 0 0 ${token.borderRadiusLG}px`
            }
          },
          [`${componentCls}-tab-active`]: {
            borderRightColor: {
              _skip_check_: true,
              value: token.colorBgContainer
            }
          }
        }
      },
      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0`
            }
          },
          [`${componentCls}-tab-active`]: {
            borderLeftColor: {
              _skip_check_: true,
              value: token.colorBgContainer
            }
          }
        }
      }
    }
  };
};
const genDropdownStyle = (token) => {
  const {
    componentCls,
    tabsHoverColor,
    dropdownEdgeChildVerticalPadding
  } = token;
  return {
    [`${componentCls}-dropdown`]: _extends(_extends({}, resetComponent(token)), {
      position: "absolute",
      top: -9999,
      left: {
        _skip_check_: true,
        value: -9999
      },
      zIndex: token.zIndexPopup,
      display: "block",
      "&-hidden": {
        display: "none"
      },
      [`${componentCls}-dropdown-menu`]: {
        maxHeight: token.tabsDropdownHeight,
        margin: 0,
        padding: `${dropdownEdgeChildVerticalPadding}px 0`,
        overflowX: "hidden",
        overflowY: "auto",
        textAlign: {
          _skip_check_: true,
          value: "left"
        },
        listStyleType: "none",
        backgroundColor: token.colorBgContainer,
        backgroundClip: "padding-box",
        borderRadius: token.borderRadiusLG,
        outline: "none",
        boxShadow: token.boxShadowSecondary,
        "&-item": _extends(_extends({}, textEllipsis), {
          display: "flex",
          alignItems: "center",
          minWidth: token.tabsDropdownWidth,
          margin: 0,
          padding: `${token.paddingXXS}px ${token.paddingSM}px`,
          color: token.colorText,
          fontWeight: "normal",
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          cursor: "pointer",
          transition: `all ${token.motionDurationSlow}`,
          "> span": {
            flex: 1,
            whiteSpace: "nowrap"
          },
          "&-remove": {
            flex: "none",
            marginLeft: {
              _skip_check_: true,
              value: token.marginSM
            },
            color: token.colorTextDescription,
            fontSize: token.fontSizeSM,
            background: "transparent",
            border: 0,
            cursor: "pointer",
            "&:hover": {
              color: tabsHoverColor
            }
          },
          "&:hover": {
            background: token.controlItemBgHover
          },
          "&-disabled": {
            "&, &:hover": {
              color: token.colorTextDisabled,
              background: "transparent",
              cursor: "not-allowed"
            }
          }
        })
      }
    })
  };
};
const genPositionStyle = (token) => {
  const {
    componentCls,
    margin,
    colorSplit
  } = token;
  return {
    // ========================== Top & Bottom ==========================
    [`${componentCls}-top, ${componentCls}-bottom`]: {
      flexDirection: "column",
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        margin: `0 0 ${margin}px 0`,
        "&::before": {
          position: "absolute",
          right: {
            _skip_check_: true,
            value: 0
          },
          left: {
            _skip_check_: true,
            value: 0
          },
          borderBottom: `${token.lineWidth}px ${token.lineType} ${colorSplit}`,
          content: "''"
        },
        [`${componentCls}-ink-bar`]: {
          height: token.lineWidthBold,
          "&-animated": {
            transition: `width ${token.motionDurationSlow}, left ${token.motionDurationSlow},
            right ${token.motionDurationSlow}`
          }
        },
        [`${componentCls}-nav-wrap`]: {
          "&::before, &::after": {
            top: 0,
            bottom: 0,
            width: token.controlHeight
          },
          "&::before": {
            left: {
              _skip_check_: true,
              value: 0
            },
            boxShadow: token.boxShadowTabsOverflowLeft
          },
          "&::after": {
            right: {
              _skip_check_: true,
              value: 0
            },
            boxShadow: token.boxShadowTabsOverflowRight
          },
          [`&${componentCls}-nav-wrap-ping-left::before`]: {
            opacity: 1
          },
          [`&${componentCls}-nav-wrap-ping-right::after`]: {
            opacity: 1
          }
        }
      }
    },
    [`${componentCls}-top`]: {
      [`> ${componentCls}-nav,
        > div > ${componentCls}-nav`]: {
        "&::before": {
          bottom: 0
        },
        [`${componentCls}-ink-bar`]: {
          bottom: 0
        }
      }
    },
    [`${componentCls}-bottom`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        marginTop: `${margin}px`,
        marginBottom: 0,
        "&::before": {
          top: 0
        },
        [`${componentCls}-ink-bar`]: {
          top: 0
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0
      }
    },
    // ========================== Left & Right ==========================
    [`${componentCls}-left, ${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        flexDirection: "column",
        minWidth: token.controlHeight * 1.25,
        // >>>>>>>>>>> Tab
        [`${componentCls}-tab`]: {
          padding: `${token.paddingXS}px ${token.paddingLG}px`,
          textAlign: "center"
        },
        [`${componentCls}-tab + ${componentCls}-tab`]: {
          margin: `${token.margin}px 0 0 0`
        },
        // >>>>>>>>>>> Nav
        [`${componentCls}-nav-wrap`]: {
          flexDirection: "column",
          "&::before, &::after": {
            right: {
              _skip_check_: true,
              value: 0
            },
            left: {
              _skip_check_: true,
              value: 0
            },
            height: token.controlHeight
          },
          "&::before": {
            top: 0,
            boxShadow: token.boxShadowTabsOverflowTop
          },
          "&::after": {
            bottom: 0,
            boxShadow: token.boxShadowTabsOverflowBottom
          },
          [`&${componentCls}-nav-wrap-ping-top::before`]: {
            opacity: 1
          },
          [`&${componentCls}-nav-wrap-ping-bottom::after`]: {
            opacity: 1
          }
        },
        // >>>>>>>>>>> Ink Bar
        [`${componentCls}-ink-bar`]: {
          width: token.lineWidthBold,
          "&-animated": {
            transition: `height ${token.motionDurationSlow}, top ${token.motionDurationSlow}`
          }
        },
        [`${componentCls}-nav-list, ${componentCls}-nav-operations`]: {
          flex: "1 0 auto",
          flexDirection: "column"
        }
      }
    },
    [`${componentCls}-left`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-ink-bar`]: {
          right: {
            _skip_check_: true,
            value: 0
          }
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        marginLeft: {
          _skip_check_: true,
          value: `-${token.lineWidth}px`
        },
        borderLeft: {
          _skip_check_: true,
          value: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`
        },
        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingLeft: {
            _skip_check_: true,
            value: token.paddingLG
          }
        }
      }
    },
    [`${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        [`${componentCls}-ink-bar`]: {
          left: {
            _skip_check_: true,
            value: 0
          }
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0,
        marginRight: {
          _skip_check_: true,
          value: -token.lineWidth
        },
        borderRight: {
          _skip_check_: true,
          value: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`
        },
        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingRight: {
            _skip_check_: true,
            value: token.paddingLG
          }
        }
      }
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    padding
  } = token;
  return {
    [componentCls]: {
      "&-small": {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXS}px 0`,
            fontSize: token.fontSize
          }
        }
      },
      "&-large": {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${padding}px 0`,
            fontSize: token.fontSizeLG
          }
        }
      }
    },
    [`${componentCls}-card`]: {
      [`&${componentCls}-small`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXXS * 1.5}px ${padding}px`
          }
        },
        [`&${componentCls}-bottom`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: `0 0 ${token.borderRadius}px ${token.borderRadius}px`
          }
        },
        [`&${componentCls}-top`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`
          }
        },
        [`&${componentCls}-right`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${token.borderRadius}px ${token.borderRadius}px 0`
            }
          }
        },
        [`&${componentCls}-left`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${token.borderRadius}px 0 0 ${token.borderRadius}px`
            }
          }
        }
      },
      [`&${componentCls}-large`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXS}px ${padding}px ${token.paddingXXS * 1.5}px`
          }
        }
      }
    }
  };
};
const genTabStyle = (token) => {
  const {
    componentCls,
    tabsActiveColor,
    tabsHoverColor,
    iconCls,
    tabsHorizontalGutter
  } = token;
  const tabCls = `${componentCls}-tab`;
  return {
    [tabCls]: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      padding: `${token.paddingSM}px 0`,
      fontSize: `${token.fontSize}px`,
      background: "transparent",
      border: 0,
      outline: "none",
      cursor: "pointer",
      "&-btn, &-remove": _extends({
        "&:focus:not(:focus-visible), &:active": {
          color: tabsActiveColor
        }
      }, genFocusStyle(token)),
      "&-btn": {
        outline: "none",
        transition: "all 0.3s"
      },
      "&-remove": {
        flex: "none",
        marginRight: {
          _skip_check_: true,
          value: -token.marginXXS
        },
        marginLeft: {
          _skip_check_: true,
          value: token.marginXS
        },
        color: token.colorTextDescription,
        fontSize: token.fontSizeSM,
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        transition: `all ${token.motionDurationSlow}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      },
      "&:hover": {
        color: tabsHoverColor
      },
      [`&${tabCls}-active ${tabCls}-btn`]: {
        color: token.colorPrimary,
        textShadow: token.tabsActiveTextShadow
      },
      [`&${tabCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed"
      },
      [`&${tabCls}-disabled ${tabCls}-btn, &${tabCls}-disabled ${componentCls}-remove`]: {
        "&:focus, &:active": {
          color: token.colorTextDisabled
        }
      },
      [`& ${tabCls}-remove ${iconCls}`]: {
        margin: 0
      },
      [iconCls]: {
        marginRight: {
          _skip_check_: true,
          value: token.marginSM
        }
      }
    },
    [`${tabCls} + ${tabCls}`]: {
      margin: {
        _skip_check_: true,
        value: `0 0 0 ${tabsHorizontalGutter}px`
      }
    }
  };
};
const genRtlStyle = (token) => {
  const {
    componentCls,
    tabsHorizontalGutter,
    iconCls,
    tabsCardGutter
  } = token;
  const rtlCls = `${componentCls}-rtl`;
  return {
    [rtlCls]: {
      direction: "rtl",
      [`${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: {
            _skip_check_: true,
            value: `0 0 0 ${tabsHorizontalGutter}px`
          },
          [`${componentCls}-tab:last-of-type`]: {
            marginLeft: {
              _skip_check_: true,
              value: 0
            }
          },
          [iconCls]: {
            marginRight: {
              _skip_check_: true,
              value: 0
            },
            marginLeft: {
              _skip_check_: true,
              value: `${token.marginSM}px`
            }
          },
          [`${componentCls}-tab-remove`]: {
            marginRight: {
              _skip_check_: true,
              value: `${token.marginXS}px`
            },
            marginLeft: {
              _skip_check_: true,
              value: `-${token.marginXXS}px`
            },
            [iconCls]: {
              margin: 0
            }
          }
        }
      },
      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav`]: {
          order: 1
        },
        [`> ${componentCls}-content-holder`]: {
          order: 0
        }
      },
      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav`]: {
          order: 0
        },
        [`> ${componentCls}-content-holder`]: {
          order: 1
        }
      },
      // ====================== Card ======================
      [`&${componentCls}-card${componentCls}-top, &${componentCls}-card${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginRight: {
              _skip_check_: true,
              value: `${tabsCardGutter}px`
            },
            marginLeft: {
              _skip_check_: true,
              value: 0
            }
          }
        }
      }
    },
    [`${componentCls}-dropdown-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-menu-item`]: {
      [`${componentCls}-dropdown-rtl`]: {
        textAlign: {
          _skip_check_: true,
          value: "right"
        }
      }
    }
  };
};
const genTabsStyle = (token) => {
  const {
    componentCls,
    tabsCardHorizontalPadding,
    tabsCardHeight,
    tabsCardGutter,
    tabsHoverColor,
    tabsActiveColor,
    colorSplit
  } = token;
  return {
    [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
      display: "flex",
      // ========================== Navigation ==========================
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        position: "relative",
        display: "flex",
        flex: "none",
        alignItems: "center",
        [`${componentCls}-nav-wrap`]: {
          position: "relative",
          display: "flex",
          flex: "auto",
          alignSelf: "stretch",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transform: "translate(0)",
          // >>>>> Ping shadow
          "&::before, &::after": {
            position: "absolute",
            zIndex: 1,
            opacity: 0,
            transition: `opacity ${token.motionDurationSlow}`,
            content: "''",
            pointerEvents: "none"
          }
        },
        [`${componentCls}-nav-list`]: {
          position: "relative",
          display: "flex",
          transition: `opacity ${token.motionDurationSlow}`
        },
        // >>>>>>>> Operations
        [`${componentCls}-nav-operations`]: {
          display: "flex",
          alignSelf: "stretch"
        },
        [`${componentCls}-nav-operations-hidden`]: {
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none"
        },
        [`${componentCls}-nav-more`]: {
          position: "relative",
          padding: tabsCardHorizontalPadding,
          background: "transparent",
          border: 0,
          "&::after": {
            position: "absolute",
            right: {
              _skip_check_: true,
              value: 0
            },
            bottom: 0,
            left: {
              _skip_check_: true,
              value: 0
            },
            height: token.controlHeightLG / 8,
            transform: "translateY(100%)",
            content: "''"
          }
        },
        [`${componentCls}-nav-add`]: _extends({
          minWidth: `${tabsCardHeight}px`,
          marginLeft: {
            _skip_check_: true,
            value: `${tabsCardGutter}px`
          },
          padding: `0 ${token.paddingXS}px`,
          background: "transparent",
          border: `${token.lineWidth}px ${token.lineType} ${colorSplit}`,
          borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
          outline: "none",
          cursor: "pointer",
          color: token.colorText,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
          "&:hover": {
            color: tabsHoverColor
          },
          "&:active, &:focus:not(:focus-visible)": {
            color: tabsActiveColor
          }
        }, genFocusStyle(token))
      },
      [`${componentCls}-extra-content`]: {
        flex: "none"
      },
      // ============================ InkBar ============================
      [`${componentCls}-ink-bar`]: {
        position: "absolute",
        background: token.colorPrimary,
        pointerEvents: "none"
      }
    }), genTabStyle(token)), {
      // =========================== TabPanes ===========================
      [`${componentCls}-content`]: {
        position: "relative",
        display: "flex",
        width: "100%",
        ["&-animated"]: {
          transition: "margin 0.3s"
        }
      },
      [`${componentCls}-content-holder`]: {
        flex: "auto",
        minWidth: 0,
        minHeight: 0
      },
      [`${componentCls}-tabpane`]: {
        outline: "none",
        flex: "none",
        width: "100%"
      }
    }),
    [`${componentCls}-centered`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-nav-wrap`]: {
          [`&:not([class*='${componentCls}-nav-wrap-ping'])`]: {
            justifyContent: "center"
          }
        }
      }
    }
  };
};
const useStyle$8 = genComponentStyleHook("Tabs", (token) => {
  const tabsCardHeight = token.controlHeightLG;
  const tabsToken = merge(token, {
    tabsHoverColor: token.colorPrimaryHover,
    tabsActiveColor: token.colorPrimaryActive,
    tabsCardHorizontalPadding: `${(tabsCardHeight - Math.round(token.fontSize * token.lineHeight)) / 2 - token.lineWidth}px ${token.padding}px`,
    tabsCardHeight,
    tabsCardGutter: token.marginXXS / 2,
    tabsHorizontalGutter: 32,
    tabsCardHeadBackground: token.colorFillAlter,
    dropdownEdgeChildVerticalPadding: token.paddingXXS,
    tabsActiveTextShadow: "0 0 0.25px currentcolor",
    tabsDropdownHeight: 200,
    tabsDropdownWidth: 120
  });
  return [genSizeStyle(tabsToken), genRtlStyle(tabsToken), genPositionStyle(tabsToken), genDropdownStyle(tabsToken), genCardStyle(tabsToken), genTabsStyle(tabsToken), genMotionStyle(tabsToken)];
}, (token) => ({
  zIndexPopup: token.zIndexPopupBase + 50
}));
let uuid = 0;
const tabsProps = () => {
  return {
    prefixCls: {
      type: String
    },
    id: {
      type: String
    },
    popupClassName: String,
    getPopupContainer: functionType(),
    activeKey: {
      type: [String, Number]
    },
    defaultActiveKey: {
      type: [String, Number]
    },
    direction: stringType(),
    animated: someType([Boolean, Object]),
    renderTabBar: functionType(),
    tabBarGutter: {
      type: Number
    },
    tabBarStyle: objectType(),
    tabPosition: stringType(),
    destroyInactiveTabPane: booleanType(),
    hideAdd: Boolean,
    type: stringType(),
    size: stringType(),
    centered: Boolean,
    onEdit: functionType(),
    onChange: functionType(),
    onTabClick: functionType(),
    onTabScroll: functionType(),
    "onUpdate:activeKey": functionType(),
    // Accessibility
    locale: objectType(),
    onPrevClick: functionType(),
    onNextClick: functionType(),
    tabBarExtraContent: PropTypes.any
  };
};
function parseTabList(children) {
  return children.map((node) => {
    if (isValidElement(node)) {
      const props = _extends({}, node.props || {});
      for (const [k, v] of Object.entries(props)) {
        delete props[k];
        props[camelize(k)] = v;
      }
      const slots = node.children || {};
      const key2 = node.key !== void 0 ? node.key : void 0;
      const {
        tab = slots.tab,
        disabled,
        forceRender,
        closable,
        animated,
        active,
        destroyInactiveTabPane
      } = props;
      return _extends(_extends({
        key: key2
      }, props), {
        node,
        closeIcon: slots.closeIcon,
        tab,
        disabled: disabled === "" || disabled,
        forceRender: forceRender === "" || forceRender,
        closable: closable === "" || closable,
        animated: animated === "" || animated,
        active: active === "" || active,
        destroyInactiveTabPane: destroyInactiveTabPane === "" || destroyInactiveTabPane
      });
    }
    return null;
  }).filter((tab) => tab);
}
const InternalTabs = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "InternalTabs",
  inheritAttrs: false,
  props: _extends(_extends({}, initDefaultProps(tabsProps(), {
    tabPosition: "top",
    animated: {
      inkBar: true,
      tabPane: false
    }
  })), {
    tabs: arrayType()
  }),
  slots: Object,
  // emits: ['tabClick', 'tabScroll', 'change', 'update:activeKey'],
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    devWarning(!(props.onPrevClick !== void 0) && !(props.onNextClick !== void 0), "Tabs", "`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead.");
    devWarning(!(props.tabBarExtraContent !== void 0), "Tabs", "`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead.");
    devWarning(!(slots.tabBarExtraContent !== void 0), "Tabs", "`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.");
    const {
      prefixCls,
      direction,
      size,
      rootPrefixCls,
      getPopupContainer
    } = useConfigInject("tabs", props);
    const [wrapSSR, hashId] = useStyle$8(prefixCls);
    const rtl2 = computed(() => direction.value === "rtl");
    const mergedAnimated = computed(() => {
      const {
        animated,
        tabPosition
      } = props;
      if (animated === false || ["left", "right"].includes(tabPosition)) {
        return {
          inkBar: false,
          tabPane: false
        };
      } else if (animated === true) {
        return {
          inkBar: true,
          tabPane: true
        };
      } else {
        return _extends({
          inkBar: true,
          tabPane: false
        }, typeof animated === "object" ? animated : {});
      }
    });
    const [mobile, setMobile] = useState(false);
    onMounted(() => {
      setMobile(isMobile());
    });
    const [mergedActiveKey, setMergedActiveKey] = useMergedState(() => {
      var _a2;
      return (_a2 = props.tabs[0]) === null || _a2 === void 0 ? void 0 : _a2.key;
    }, {
      value: computed(() => props.activeKey),
      defaultValue: props.defaultActiveKey
    });
    const [activeIndex, setActiveIndex] = useState(() => props.tabs.findIndex((tab) => tab.key === mergedActiveKey.value));
    watchEffect(() => {
      var _a2;
      let newActiveIndex = props.tabs.findIndex((tab) => tab.key === mergedActiveKey.value);
      if (newActiveIndex === -1) {
        newActiveIndex = Math.max(0, Math.min(activeIndex.value, props.tabs.length - 1));
        setMergedActiveKey((_a2 = props.tabs[newActiveIndex]) === null || _a2 === void 0 ? void 0 : _a2.key);
      }
      setActiveIndex(newActiveIndex);
    });
    const [mergedId, setMergedId] = useMergedState(null, {
      value: computed(() => props.id)
    });
    const mergedTabPosition = computed(() => {
      if (mobile.value && !["left", "right"].includes(props.tabPosition)) {
        return "top";
      } else {
        return props.tabPosition;
      }
    });
    onMounted(() => {
      if (!props.id) {
        setMergedId(`rc-tabs-${uuid}`);
        uuid += 1;
      }
    });
    const onInternalTabClick = (key2, e) => {
      var _a2, _b;
      (_a2 = props.onTabClick) === null || _a2 === void 0 ? void 0 : _a2.call(props, key2, e);
      const isActiveChanged = key2 !== mergedActiveKey.value;
      setMergedActiveKey(key2);
      if (isActiveChanged) {
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, key2);
      }
    };
    useProvideTabs({
      tabs: computed(() => props.tabs),
      prefixCls
    });
    return () => {
      const {
        id,
        type,
        tabBarGutter,
        tabBarStyle,
        locale: locale2,
        destroyInactiveTabPane,
        renderTabBar = slots.renderTabBar,
        onTabScroll,
        hideAdd,
        centered
      } = props;
      const sharedProps = {
        id: mergedId.value,
        activeKey: mergedActiveKey.value,
        animated: mergedAnimated.value,
        tabPosition: mergedTabPosition.value,
        rtl: rtl2.value,
        mobile: mobile.value
      };
      let editable;
      if (type === "editable-card") {
        editable = {
          onEdit: (editType, _ref2) => {
            let {
              key: key2,
              event
            } = _ref2;
            var _a2;
            (_a2 = props.onEdit) === null || _a2 === void 0 ? void 0 : _a2.call(props, editType === "add" ? event : key2, editType);
          },
          removeIcon: () => createVNode(CloseOutlined, null, null),
          addIcon: slots.addIcon ? slots.addIcon : () => createVNode(PlusOutlined, null, null),
          showAdd: hideAdd !== true
        };
      }
      let tabNavBar;
      const tabNavBarProps = _extends(_extends({}, sharedProps), {
        moreTransitionName: `${rootPrefixCls.value}-slide-up`,
        editable,
        locale: locale2,
        tabBarGutter,
        onTabClick: onInternalTabClick,
        onTabScroll,
        style: tabBarStyle,
        getPopupContainer: getPopupContainer.value,
        popupClassName: classNames(props.popupClassName, hashId.value)
      });
      if (renderTabBar) {
        tabNavBar = renderTabBar(_extends(_extends({}, tabNavBarProps), {
          DefaultTabBar: TabNavList
        }));
      } else {
        tabNavBar = createVNode(TabNavList, tabNavBarProps, pick(slots, ["moreIcon", "leftExtra", "rightExtra", "tabBarExtraContent"]));
      }
      const pre = prefixCls.value;
      return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "id": id,
        "class": classNames(pre, `${pre}-${mergedTabPosition.value}`, {
          [hashId.value]: true,
          [`${pre}-${size.value}`]: size.value,
          [`${pre}-card`]: ["card", "editable-card"].includes(type),
          [`${pre}-editable-card`]: type === "editable-card",
          [`${pre}-centered`]: centered,
          [`${pre}-mobile`]: mobile.value,
          [`${pre}-editable`]: type === "editable-card",
          [`${pre}-rtl`]: rtl2.value
        }, attrs.class)
      }), [tabNavBar, createVNode(TabPanelList, _objectSpread2(_objectSpread2({
        "destroyInactiveTabPane": destroyInactiveTabPane
      }, sharedProps), {}, {
        "animated": mergedAnimated.value
      }), null)]));
    };
  }
});
const Tabs = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATabs",
  inheritAttrs: false,
  props: initDefaultProps(tabsProps(), {
    tabPosition: "top",
    animated: {
      inkBar: true,
      tabPane: false
    }
  }),
  slots: Object,
  // emits: ['tabClick', 'tabScroll', 'change', 'update:activeKey'],
  setup(props, _ref3) {
    let {
      attrs,
      slots,
      emit
    } = _ref3;
    const handleChange = (key2) => {
      emit("update:activeKey", key2);
      emit("change", key2);
    };
    return () => {
      var _a2;
      const tabs = parseTabList(flattenChildren((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)));
      return createVNode(InternalTabs, _objectSpread2(_objectSpread2(_objectSpread2({}, omit(props, ["onUpdate:activeKey"])), attrs), {}, {
        "onChange": handleChange,
        "tabs": tabs
      }), slots);
    };
  }
});
const tabPaneProps = () => ({
  tab: PropTypes.any,
  disabled: {
    type: Boolean
  },
  forceRender: {
    type: Boolean
  },
  closable: {
    type: Boolean
  },
  animated: {
    type: Boolean
  },
  active: {
    type: Boolean
  },
  destroyInactiveTabPane: {
    type: Boolean
  },
  // Pass by TabPaneList
  prefixCls: {
    type: String
  },
  tabKey: {
    type: [String, Number]
  },
  id: {
    type: String
  }
  // closeIcon: PropTypes.any,
});
const __unplugin_components_5 = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATabPane",
  inheritAttrs: false,
  __ANT_TAB_PANE: true,
  props: tabPaneProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const visited = ref(props.forceRender);
    watch([() => props.active, () => props.destroyInactiveTabPane], () => {
      if (props.active) {
        visited.value = true;
      } else if (props.destroyInactiveTabPane) {
        visited.value = false;
      }
    }, {
      immediate: true
    });
    const mergedStyle = computed(() => {
      if (!props.active) {
        if (props.animated) {
          return {
            visibility: "hidden",
            height: 0,
            overflowY: "hidden"
          };
        } else {
          return {
            display: "none"
          };
        }
      }
      return {};
    });
    return () => {
      var _a2;
      const {
        prefixCls,
        forceRender,
        id,
        active,
        tabKey
      } = props;
      return createVNode("div", {
        "id": id && `${id}-panel-${tabKey}`,
        "role": "tabpanel",
        "tabindex": active ? 0 : -1,
        "aria-labelledby": id && `${id}-tab-${tabKey}`,
        "aria-hidden": !active,
        "style": [mergedStyle.value, attrs.style],
        "class": [`${prefixCls}-tabpane`, active && `${prefixCls}-tabpane-active`, attrs.class]
      }, [(active || visited.value || forceRender) && ((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots))]);
    };
  }
});
Tabs.TabPane = __unplugin_components_5;
Tabs.install = function(app) {
  app.component(Tabs.name, Tabs);
  app.component(__unplugin_components_5.name, __unplugin_components_5);
  return app;
};
const skeletonTitleProps = () => ({
  prefixCls: String,
  width: {
    type: [Number, String]
  }
});
const SkeletonTitle = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "SkeletonTitle",
  props: skeletonTitleProps(),
  setup(props) {
    return () => {
      const {
        prefixCls,
        width
      } = props;
      const zWidth = typeof width === "number" ? `${width}px` : width;
      return createVNode("h3", {
        "class": prefixCls,
        "style": {
          width: zWidth
        }
      }, null);
    };
  }
});
const skeletonParagraphProps = () => ({
  prefixCls: String,
  width: {
    type: [Number, String, Array]
  },
  rows: Number
});
const SkeletonParagraph = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "SkeletonParagraph",
  props: skeletonParagraphProps(),
  setup(props) {
    const getWidth = (index2) => {
      const {
        width,
        rows = 2
      } = props;
      if (Array.isArray(width)) {
        return width[index2];
      }
      if (rows - 1 === index2) {
        return width;
      }
      return void 0;
    };
    return () => {
      const {
        prefixCls,
        rows
      } = props;
      const rowList = [...Array(rows)].map((_, index2) => {
        const width = getWidth(index2);
        return createVNode("li", {
          "key": index2,
          "style": {
            width: typeof width === "number" ? `${width}px` : width
          }
        }, null);
      });
      return createVNode("ul", {
        "class": prefixCls
      }, [rowList]);
    };
  }
});
const Element$1 = (props) => {
  const {
    prefixCls,
    size,
    shape
  } = props;
  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === "large",
    [`${prefixCls}-sm`]: size === "small"
  });
  const shapeCls = classNames({
    [`${prefixCls}-circle`]: shape === "circle",
    [`${prefixCls}-square`]: shape === "square",
    [`${prefixCls}-round`]: shape === "round"
  });
  const sizeStyle = typeof size === "number" ? {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`
  } : {};
  return createVNode("span", {
    "class": classNames(prefixCls, sizeCls, shapeCls),
    "style": sizeStyle
  }, null);
};
Element$1.displayName = "SkeletonElement";
const skeletonClsLoading = new Keyframe(`ant-skeleton-loading`, {
  "0%": {
    transform: "translateX(-37.5%)"
  },
  "100%": {
    transform: "translateX(37.5%)"
  }
});
const genSkeletonElementCommonSize = (size) => ({
  height: size,
  lineHeight: `${size}px`
});
const genSkeletonElementAvatarSize = (size) => _extends({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonColor = (token) => ({
  position: "relative",
  // fix https://github.com/ant-design/ant-design/issues/36444
  // https://monshin.github.io/202109/css/safari-border-radius-overflow-hidden/
  /* stylelint-disable-next-line property-no-vendor-prefix,value-no-vendor-prefix */
  zIndex: 0,
  overflow: "hidden",
  background: "transparent",
  "&::after": {
    position: "absolute",
    top: 0,
    insetInlineEnd: "-150%",
    bottom: 0,
    insetInlineStart: "-150%",
    background: token.skeletonLoadingBackground,
    animationName: skeletonClsLoading,
    animationDuration: token.skeletonLoadingMotionDuration,
    animationTimingFunction: "ease",
    animationIterationCount: "infinite",
    content: '""'
  }
});
const genSkeletonElementInputSize = (size) => _extends({
  width: size * 5,
  minWidth: size * 5
}, genSkeletonElementCommonSize(size));
const genSkeletonElementAvatar = (token) => {
  const {
    skeletonAvatarCls,
    color,
    controlHeight,
    controlHeightLG,
    controlHeightSM
  } = token;
  return {
    [`${skeletonAvatarCls}`]: _extends({
      display: "inline-block",
      verticalAlign: "top",
      background: color
    }, genSkeletonElementAvatarSize(controlHeight)),
    [`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: {
      borderRadius: "50%"
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: _extends({}, genSkeletonElementAvatarSize(controlHeightLG)),
    [`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: _extends({}, genSkeletonElementAvatarSize(controlHeightSM))
  };
};
const genSkeletonElementInput = (token) => {
  const {
    controlHeight,
    borderRadiusSM,
    skeletonInputCls,
    controlHeightLG,
    controlHeightSM,
    color
  } = token;
  return {
    [`${skeletonInputCls}`]: _extends({
      display: "inline-block",
      verticalAlign: "top",
      background: color,
      borderRadius: borderRadiusSM
    }, genSkeletonElementInputSize(controlHeight)),
    [`${skeletonInputCls}-lg`]: _extends({}, genSkeletonElementInputSize(controlHeightLG)),
    [`${skeletonInputCls}-sm`]: _extends({}, genSkeletonElementInputSize(controlHeightSM))
  };
};
const genSkeletonElementImageSize = (size) => _extends({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonElementImage = (token) => {
  const {
    skeletonImageCls,
    imageSizeBase,
    color,
    borderRadiusSM
  } = token;
  return {
    [`${skeletonImageCls}`]: _extends(_extends({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "top",
      background: color,
      borderRadius: borderRadiusSM
    }, genSkeletonElementImageSize(imageSizeBase * 2)), {
      [`${skeletonImageCls}-path`]: {
        fill: "#bfbfbf"
      },
      [`${skeletonImageCls}-svg`]: _extends(_extends({}, genSkeletonElementImageSize(imageSizeBase)), {
        maxWidth: imageSizeBase * 4,
        maxHeight: imageSizeBase * 4
      }),
      [`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: {
        borderRadius: "50%"
      }
    }),
    [`${skeletonImageCls}${skeletonImageCls}-circle`]: {
      borderRadius: "50%"
    }
  };
};
const genSkeletonElementButtonShape = (token, size, buttonCls) => {
  const {
    skeletonButtonCls
  } = token;
  return {
    [`${buttonCls}${skeletonButtonCls}-circle`]: {
      width: size,
      minWidth: size,
      borderRadius: "50%"
    },
    [`${buttonCls}${skeletonButtonCls}-round`]: {
      borderRadius: size
    }
  };
};
const genSkeletonElementButtonSize = (size) => _extends({
  width: size * 2,
  minWidth: size * 2
}, genSkeletonElementCommonSize(size));
const genSkeletonElementButton = (token) => {
  const {
    borderRadiusSM,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    color
  } = token;
  return _extends(_extends(_extends(_extends(_extends({
    [`${skeletonButtonCls}`]: _extends({
      display: "inline-block",
      verticalAlign: "top",
      background: color,
      borderRadius: borderRadiusSM,
      width: controlHeight * 2,
      minWidth: controlHeight * 2
    }, genSkeletonElementButtonSize(controlHeight))
  }, genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls)), {
    [`${skeletonButtonCls}-lg`]: _extends({}, genSkeletonElementButtonSize(controlHeightLG))
  }), genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`)), {
    [`${skeletonButtonCls}-sm`]: _extends({}, genSkeletonElementButtonSize(controlHeightSM))
  }), genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`));
};
const genBaseStyle$2 = (token) => {
  const {
    componentCls,
    skeletonAvatarCls,
    skeletonTitleCls,
    skeletonParagraphCls,
    skeletonButtonCls,
    skeletonInputCls,
    skeletonImageCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    color,
    padding,
    marginSM,
    borderRadius,
    skeletonTitleHeight,
    skeletonBlockRadius,
    skeletonParagraphLineHeight,
    controlHeightXS,
    skeletonParagraphMarginTop
  } = token;
  return {
    [`${componentCls}`]: {
      display: "table",
      width: "100%",
      [`${componentCls}-header`]: {
        display: "table-cell",
        paddingInlineEnd: padding,
        verticalAlign: "top",
        // Avatar
        [`${skeletonAvatarCls}`]: _extends({
          display: "inline-block",
          verticalAlign: "top",
          background: color
        }, genSkeletonElementAvatarSize(controlHeight)),
        [`${skeletonAvatarCls}-circle`]: {
          borderRadius: "50%"
        },
        [`${skeletonAvatarCls}-lg`]: _extends({}, genSkeletonElementAvatarSize(controlHeightLG)),
        [`${skeletonAvatarCls}-sm`]: _extends({}, genSkeletonElementAvatarSize(controlHeightSM))
      },
      [`${componentCls}-content`]: {
        display: "table-cell",
        width: "100%",
        verticalAlign: "top",
        // Title
        [`${skeletonTitleCls}`]: {
          width: "100%",
          height: skeletonTitleHeight,
          background: color,
          borderRadius: skeletonBlockRadius,
          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: controlHeightSM
          }
        },
        // paragraph
        [`${skeletonParagraphCls}`]: {
          padding: 0,
          "> li": {
            width: "100%",
            height: skeletonParagraphLineHeight,
            listStyle: "none",
            background: color,
            borderRadius: skeletonBlockRadius,
            "+ li": {
              marginBlockStart: controlHeightXS
            }
          }
        },
        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: "61%"
        }
      },
      [`&-round ${componentCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          borderRadius
        }
      }
    },
    [`${componentCls}-with-avatar ${componentCls}-content`]: {
      // Title
      [`${skeletonTitleCls}`]: {
        marginBlockStart: marginSM,
        [`+ ${skeletonParagraphCls}`]: {
          marginBlockStart: skeletonParagraphMarginTop
        }
      }
    },
    // Skeleton element
    [`${componentCls}${componentCls}-element`]: _extends(_extends(_extends(_extends({
      display: "inline-block",
      width: "auto"
    }, genSkeletonElementButton(token)), genSkeletonElementAvatar(token)), genSkeletonElementInput(token)), genSkeletonElementImage(token)),
    // Skeleton Block Button, Input
    [`${componentCls}${componentCls}-block`]: {
      width: "100%",
      [`${skeletonButtonCls}`]: {
        width: "100%"
      },
      [`${skeletonInputCls}`]: {
        width: "100%"
      }
    },
    // With active animation
    [`${componentCls}${componentCls}-active`]: {
      [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonImageCls}
      `]: _extends({}, genSkeletonColor(token))
    }
  };
};
const useStyle$7 = genComponentStyleHook("Skeleton", (token) => {
  const {
    componentCls
  } = token;
  const skeletonToken = merge(token, {
    skeletonAvatarCls: `${componentCls}-avatar`,
    skeletonTitleCls: `${componentCls}-title`,
    skeletonParagraphCls: `${componentCls}-paragraph`,
    skeletonButtonCls: `${componentCls}-button`,
    skeletonInputCls: `${componentCls}-input`,
    skeletonImageCls: `${componentCls}-image`,
    imageSizeBase: token.controlHeight * 1.5,
    skeletonTitleHeight: token.controlHeight / 2,
    skeletonBlockRadius: token.borderRadiusSM,
    skeletonParagraphLineHeight: token.controlHeight / 2,
    skeletonParagraphMarginTop: token.marginLG + token.marginXXS,
    borderRadius: 100,
    skeletonLoadingBackground: `linear-gradient(90deg, ${token.color} 25%, ${token.colorGradientEnd} 37%, ${token.color} 63%)`,
    skeletonLoadingMotionDuration: "1.4s"
  });
  return [genBaseStyle$2(skeletonToken)];
}, (token) => {
  const {
    colorFillContent,
    colorFill
  } = token;
  return {
    color: colorFillContent,
    colorGradientEnd: colorFill
  };
});
const skeletonProps = () => ({
  active: {
    type: Boolean,
    default: void 0
  },
  loading: {
    type: Boolean,
    default: void 0
  },
  prefixCls: String,
  avatar: {
    type: [Boolean, Object],
    default: void 0
  },
  title: {
    type: [Boolean, Object],
    default: void 0
  },
  paragraph: {
    type: [Boolean, Object],
    default: void 0
  },
  round: {
    type: Boolean,
    default: void 0
  }
});
function getComponentProps(prop) {
  if (prop && typeof prop === "object") {
    return prop;
  }
  return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    return {
      size: "large",
      shape: "square"
    };
  }
  return {
    size: "large",
    shape: "circle"
  };
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return {
      width: "38%"
    };
  }
  if (hasAvatar && hasParagraph) {
    return {
      width: "50%"
    };
  }
  return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
  const basicProps2 = {};
  if (!hasAvatar || !hasTitle) {
    basicProps2.width = "61%";
  }
  if (!hasAvatar && hasTitle) {
    basicProps2.rows = 3;
  } else {
    basicProps2.rows = 2;
  }
  return basicProps2;
}
const Skeleton = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ASkeleton",
  props: initDefaultProps(skeletonProps(), {
    avatar: false,
    title: true,
    paragraph: true
  }),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("skeleton", props);
    const [wrapSSR, hashId] = useStyle$7(prefixCls);
    return () => {
      var _a2;
      const {
        loading,
        avatar,
        title,
        paragraph,
        active,
        round
      } = props;
      const pre = prefixCls.value;
      if (loading || props.loading === void 0) {
        const hasAvatar = !!avatar || avatar === "";
        const hasTitle = !!title || title === "";
        const hasParagraph = !!paragraph || paragraph === "";
        let avatarNode;
        if (hasAvatar) {
          const avatarProps2 = _extends(_extends({
            prefixCls: `${pre}-avatar`
          }, getAvatarBasicProps(hasTitle, hasParagraph)), getComponentProps(avatar));
          avatarNode = createVNode("div", {
            "class": `${pre}-header`
          }, [createVNode(Element$1, avatarProps2, null)]);
        }
        let contentNode;
        if (hasTitle || hasParagraph) {
          let $title;
          if (hasTitle) {
            const titleProps = _extends(_extends({
              prefixCls: `${pre}-title`
            }, getTitleBasicProps(hasAvatar, hasParagraph)), getComponentProps(title));
            $title = createVNode(SkeletonTitle, titleProps, null);
          }
          let paragraphNode;
          if (hasParagraph) {
            const paragraphProps = _extends(_extends({
              prefixCls: `${pre}-paragraph`
            }, getParagraphBasicProps(hasAvatar, hasTitle)), getComponentProps(paragraph));
            paragraphNode = createVNode(SkeletonParagraph, paragraphProps, null);
          }
          contentNode = createVNode("div", {
            "class": `${pre}-content`
          }, [$title, paragraphNode]);
        }
        const cls = classNames(pre, {
          [`${pre}-with-avatar`]: hasAvatar,
          [`${pre}-active`]: active,
          [`${pre}-rtl`]: direction.value === "rtl",
          [`${pre}-round`]: round,
          [hashId.value]: true
        });
        return wrapSSR(createVNode("div", {
          "class": cls
        }, [avatarNode, contentNode]));
      }
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
let runtimeLocale = _extends({}, localeValues$1.Modal);
function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = _extends(_extends({}, runtimeLocale), newLocale);
  } else {
    runtimeLocale = _extends({}, localeValues$1.Modal);
  }
}
const ANT_MARK = "internalMark";
const LocaleProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ALocaleProvider",
  props: {
    locale: {
      type: Object
    },
    ANT_MARK__: String
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    warning(props.ANT_MARK__ === ANT_MARK);
    const state = reactive({
      antLocale: _extends(_extends({}, props.locale), {
        exist: true
      }),
      ANT_MARK__: ANT_MARK
    });
    provide("localeData", state);
    watch(() => props.locale, (locale2) => {
      changeConfirmLocale(locale2 && locale2.Modal);
      state.antLocale = _extends(_extends({}, locale2), {
        exist: true
      });
    }, {
      immediate: true
    });
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
LocaleProvider.install = function(app) {
  app.component(LocaleProvider.name, LocaleProvider);
  return app;
};
const locale$3 = withInstall(LocaleProvider);
const Notice = defineComponent({
  name: "Notice",
  inheritAttrs: false,
  props: ["prefixCls", "duration", "updateMark", "noticeKey", "closeIcon", "closable", "props", "onClick", "onClose", "holder", "visible"],
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    let closeTimer;
    let isUnMounted = false;
    const duration = computed(() => props.duration === void 0 ? 4.5 : props.duration);
    const startCloseTimer = () => {
      if (duration.value && !isUnMounted) {
        closeTimer = setTimeout(() => {
          close();
        }, duration.value * 1e3);
      }
    };
    const clearCloseTimer = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };
    const close = (e) => {
      if (e) {
        e.stopPropagation();
      }
      clearCloseTimer();
      const {
        onClose,
        noticeKey
      } = props;
      if (onClose) {
        onClose(noticeKey);
      }
    };
    const restartCloseTimer = () => {
      clearCloseTimer();
      startCloseTimer();
    };
    onMounted(() => {
      startCloseTimer();
    });
    onUnmounted(() => {
      isUnMounted = true;
      clearCloseTimer();
    });
    watch([duration, () => props.updateMark, () => props.visible], (_ref2, _ref3) => {
      let [preDuration, preUpdateMark, preVisible] = _ref2;
      let [newDuration, newUpdateMark, newVisible] = _ref3;
      if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
        restartCloseTimer();
      }
    }, {
      flush: "post"
    });
    return () => {
      var _a2, _b;
      const {
        prefixCls,
        closable,
        closeIcon = (_a2 = slots.closeIcon) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
        onClick,
        holder
      } = props;
      const {
        class: className,
        style
      } = attrs;
      const componentClass = `${prefixCls}-notice`;
      const dataOrAriaAttributeProps = Object.keys(attrs).reduce((acc, key2) => {
        if (key2.startsWith("data-") || key2.startsWith("aria-") || key2 === "role") {
          acc[key2] = attrs[key2];
        }
        return acc;
      }, {});
      const node = createVNode("div", _objectSpread2({
        "class": classNames(componentClass, className, {
          [`${componentClass}-closable`]: closable
        }),
        "style": style,
        "onMouseenter": clearCloseTimer,
        "onMouseleave": startCloseTimer,
        "onClick": onClick
      }, dataOrAriaAttributeProps), [createVNode("div", {
        "class": `${componentClass}-content`
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), closable ? createVNode("a", {
        "tabindex": 0,
        "onClick": close,
        "class": `${componentClass}-close`
      }, [closeIcon || createVNode("span", {
        "class": `${componentClass}-close-x`
      }, null)]) : null]);
      if (holder) {
        return createVNode(Teleport, {
          "to": holder
        }, {
          default: () => node
        });
      }
      return node;
    };
  }
});
var __rest$a = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let seed$1 = 0;
const now$1 = Date.now();
function getUuid$1() {
  const id = seed$1;
  seed$1 += 1;
  return `rcNotification_${now$1}_${id}`;
}
const Notification$1 = defineComponent({
  name: "Notification",
  inheritAttrs: false,
  props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon", "hashId"],
  setup(props, _ref) {
    let {
      attrs,
      expose,
      slots
    } = _ref;
    const hookRefs = /* @__PURE__ */ new Map();
    const notices = ref([]);
    const transitionProps = computed(() => {
      const {
        prefixCls,
        animation = "fade"
      } = props;
      let name = props.transitionName;
      if (!name && animation) {
        name = `${prefixCls}-${animation}`;
      }
      return getTransitionGroupProps(name);
    });
    const add = (originNotice, holderCallback) => {
      const key2 = originNotice.key || getUuid$1();
      const notice2 = _extends(_extends({}, originNotice), {
        key: key2
      });
      const {
        maxCount: maxCount2
      } = props;
      const noticeIndex = notices.value.map((v) => v.notice.key).indexOf(key2);
      const updatedNotices = notices.value.concat();
      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, {
          notice: notice2,
          holderCallback
        });
      } else {
        if (maxCount2 && notices.value.length >= maxCount2) {
          notice2.key = updatedNotices[0].notice.key;
          notice2.updateMark = getUuid$1();
          notice2.userPassKey = key2;
          updatedNotices.shift();
        }
        updatedNotices.push({
          notice: notice2,
          holderCallback
        });
      }
      notices.value = updatedNotices;
    };
    const remove = (removeKey) => {
      notices.value = toRaw(notices.value).filter((_ref2) => {
        let {
          notice: {
            key: key2,
            userPassKey
          }
        } = _ref2;
        const mergedKey = userPassKey || key2;
        return mergedKey !== removeKey;
      });
    };
    expose({
      add,
      remove,
      notices
    });
    return () => {
      var _a2;
      const {
        prefixCls,
        closeIcon = (_a2 = slots.closeIcon) === null || _a2 === void 0 ? void 0 : _a2.call(slots, {
          prefixCls
        })
      } = props;
      const noticeNodes = notices.value.map((_ref3, index2) => {
        let {
          notice: notice2,
          holderCallback
        } = _ref3;
        const updateMark = index2 === notices.value.length - 1 ? notice2.updateMark : void 0;
        const {
          key: key2,
          userPassKey
        } = notice2;
        const {
          content
        } = notice2;
        const noticeProps = _extends(_extends(_extends({
          prefixCls,
          closeIcon: typeof closeIcon === "function" ? closeIcon({
            prefixCls
          }) : closeIcon
        }, notice2), notice2.props), {
          key: key2,
          noticeKey: userPassKey || key2,
          updateMark,
          onClose: (noticeKey) => {
            var _a3;
            remove(noticeKey);
            (_a3 = notice2.onClose) === null || _a3 === void 0 ? void 0 : _a3.call(notice2);
          },
          onClick: notice2.onClick
        });
        if (holderCallback) {
          return createVNode("div", {
            "key": key2,
            "class": `${prefixCls}-hook-holder`,
            "ref": (div) => {
              if (typeof key2 === "undefined") {
                return;
              }
              if (div) {
                hookRefs.set(key2, div);
                holderCallback(div, noticeProps);
              } else {
                hookRefs.delete(key2);
              }
            }
          }, null);
        }
        return createVNode(Notice, _objectSpread2(_objectSpread2({}, noticeProps), {}, {
          "class": classNames(noticeProps.class, props.hashId)
        }), {
          default: () => [typeof content === "function" ? content({
            prefixCls
          }) : content]
        });
      });
      const className = {
        [prefixCls]: 1,
        [attrs.class]: !!attrs.class,
        [props.hashId]: true
      };
      return createVNode("div", {
        "class": className,
        "style": attrs.style || {
          top: "65px",
          left: "50%"
        }
      }, [createVNode(TransitionGroup, _objectSpread2({
        "tag": "div"
      }, transitionProps.value), {
        default: () => [noticeNodes]
      })]);
    };
  }
});
Notification$1.newInstance = function newNotificationInstance(properties, callback) {
  const _a2 = properties || {}, {
    name = "notification",
    getContainer: getContainer2,
    appContext,
    prefixCls: customizePrefixCls,
    rootPrefixCls: customRootPrefixCls,
    transitionName: customTransitionName,
    hasTransitionName: hasTransitionName2,
    useStyle: useStyle2
  } = _a2, props = __rest$a(_a2, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName", "useStyle"]);
  const div = document.createElement("div");
  if (getContainer2) {
    const root = getContainer2();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  const Wrapper = defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "NotificationWrapper",
    setup(_props, _ref4) {
      let {
        attrs
      } = _ref4;
      const notiRef = shallowRef();
      const prefixCls = computed(() => globalConfigForApi.getPrefixCls(name, customizePrefixCls));
      const [, hashId] = useStyle2(prefixCls);
      onMounted(() => {
        callback({
          notice(noticeProps) {
            var _a3;
            (_a3 = notiRef.value) === null || _a3 === void 0 ? void 0 : _a3.add(noticeProps);
          },
          removeNotice(key2) {
            var _a3;
            (_a3 = notiRef.value) === null || _a3 === void 0 ? void 0 : _a3.remove(key2);
          },
          destroy() {
            render(null, div);
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          },
          component: notiRef
        });
      });
      return () => {
        const global = globalConfigForApi;
        const rootPrefixCls = global.getRootPrefixCls(customRootPrefixCls, prefixCls.value);
        const transitionName2 = hasTransitionName2 ? customTransitionName : `${prefixCls.value}-${customTransitionName}`;
        return createVNode(ConfigProvider, _objectSpread2(_objectSpread2({}, global), {}, {
          "prefixCls": rootPrefixCls
        }), {
          default: () => [createVNode(Notification$1, _objectSpread2(_objectSpread2({
            "ref": notiRef
          }, attrs), {}, {
            "prefixCls": prefixCls.value,
            "transitionName": transitionName2,
            "hashId": hashId.value
          }), null)]
        });
      };
    }
  });
  const vm = createVNode(Wrapper, props);
  vm.appContext = appContext || vm.appContext;
  render(vm, div);
};
let seed = 0;
const now = Date.now();
function getUuid() {
  const id = seed;
  seed += 1;
  return `rcNotification_${now}_${id}`;
}
const Notification = defineComponent({
  name: "HookNotification",
  inheritAttrs: false,
  props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon", "hashId", "remove", "notices", "getStyles", "getClassName", "onAllRemoved", "getContainer"],
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const hookRefs = /* @__PURE__ */ new Map();
    const notices = computed(() => props.notices);
    const transitionProps = computed(() => {
      let name = props.transitionName;
      if (!name && props.animation) {
        switch (typeof props.animation) {
          case "string":
            name = props.animation;
            break;
          case "function":
            name = props.animation().name;
            break;
          case "object":
            name = props.animation.name;
            break;
          default:
            name = `${props.prefixCls}-fade`;
            break;
        }
      }
      return getTransitionGroupProps(name);
    });
    const remove = (key2) => props.remove(key2);
    const placements2 = ref({});
    watch(notices, () => {
      const nextPlacements = {};
      Object.keys(placements2.value).forEach((placement) => {
        nextPlacements[placement] = [];
      });
      props.notices.forEach((config) => {
        const {
          placement = "topRight"
        } = config.notice;
        if (placement) {
          nextPlacements[placement] = nextPlacements[placement] || [];
          nextPlacements[placement].push(config);
        }
      });
      placements2.value = nextPlacements;
    });
    const placementList = computed(() => Object.keys(placements2.value));
    return () => {
      var _a2;
      const {
        prefixCls,
        closeIcon = (_a2 = slots.closeIcon) === null || _a2 === void 0 ? void 0 : _a2.call(slots, {
          prefixCls
        })
      } = props;
      const noticeNodes = placementList.value.map((placement) => {
        var _a3, _b;
        const noticesForPlacement = placements2.value[placement];
        const classes = (_a3 = props.getClassName) === null || _a3 === void 0 ? void 0 : _a3.call(props, placement);
        const styles = (_b = props.getStyles) === null || _b === void 0 ? void 0 : _b.call(props, placement);
        const noticeNodesForPlacement = noticesForPlacement.map((_ref2, index2) => {
          let {
            notice: notice2,
            holderCallback
          } = _ref2;
          const updateMark = index2 === notices.value.length - 1 ? notice2.updateMark : void 0;
          const {
            key: key2,
            userPassKey
          } = notice2;
          const {
            content
          } = notice2;
          const noticeProps = _extends(_extends(_extends({
            prefixCls,
            closeIcon: typeof closeIcon === "function" ? closeIcon({
              prefixCls
            }) : closeIcon
          }, notice2), notice2.props), {
            key: key2,
            noticeKey: userPassKey || key2,
            updateMark,
            onClose: (noticeKey) => {
              var _a4;
              remove(noticeKey);
              (_a4 = notice2.onClose) === null || _a4 === void 0 ? void 0 : _a4.call(notice2);
            },
            onClick: notice2.onClick
          });
          if (holderCallback) {
            return createVNode("div", {
              "key": key2,
              "class": `${prefixCls}-hook-holder`,
              "ref": (div) => {
                if (typeof key2 === "undefined") {
                  return;
                }
                if (div) {
                  hookRefs.set(key2, div);
                  holderCallback(div, noticeProps);
                } else {
                  hookRefs.delete(key2);
                }
              }
            }, null);
          }
          return createVNode(Notice, _objectSpread2(_objectSpread2({}, noticeProps), {}, {
            "class": classNames(noticeProps.class, props.hashId)
          }), {
            default: () => [typeof content === "function" ? content({
              prefixCls
            }) : content]
          });
        });
        const className = {
          [prefixCls]: 1,
          [`${prefixCls}-${placement}`]: 1,
          [attrs.class]: !!attrs.class,
          [props.hashId]: true,
          [classes]: !!classes
        };
        function onAfterLeave() {
          var _a4;
          if (noticesForPlacement.length > 0) {
            return;
          }
          Reflect.deleteProperty(placements2.value, placement);
          (_a4 = props.onAllRemoved) === null || _a4 === void 0 ? void 0 : _a4.call(props);
        }
        return createVNode("div", {
          "key": placement,
          "class": className,
          "style": attrs.style || styles || {
            top: "65px",
            left: "50%"
          }
        }, [createVNode(TransitionGroup, _objectSpread2(_objectSpread2({
          "tag": "div"
        }, transitionProps.value), {}, {
          "onAfterLeave": onAfterLeave
        }), {
          default: () => [noticeNodesForPlacement]
        })]);
      });
      return createVNode(Portal$1, {
        "getContainer": props.getContainer
      }, {
        default: () => [noticeNodes]
      });
    };
  }
});
var __rest$9 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const defaultGetContainer$1 = () => document.body;
let uniqueKey = 0;
function mergeConfig() {
  const clone = {};
  for (var _len = arguments.length, objList = new Array(_len), _key = 0; _key < _len; _key++) {
    objList[_key] = arguments[_key];
  }
  objList.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key2) => {
        const val = obj[key2];
        if (val !== void 0) {
          clone[key2] = val;
        }
      });
    }
  });
  return clone;
}
function useNotification$1() {
  let rootConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    getContainer: getContainer2 = defaultGetContainer$1,
    motion,
    prefixCls,
    maxCount: maxCount2,
    getClassName,
    getStyles,
    onAllRemoved
  } = rootConfig, shareConfig = __rest$9(rootConfig, ["getContainer", "motion", "prefixCls", "maxCount", "getClassName", "getStyles", "onAllRemoved"]);
  const notices = shallowRef([]);
  const notificationsRef = shallowRef();
  const add = (originNotice, holderCallback) => {
    const key2 = originNotice.key || getUuid();
    const notice2 = _extends(_extends({}, originNotice), {
      key: key2
    });
    const noticeIndex = notices.value.map((v) => v.notice.key).indexOf(key2);
    const updatedNotices = notices.value.concat();
    if (noticeIndex !== -1) {
      updatedNotices.splice(noticeIndex, 1, {
        notice: notice2,
        holderCallback
      });
    } else {
      if (maxCount2 && notices.value.length >= maxCount2) {
        notice2.key = updatedNotices[0].notice.key;
        notice2.updateMark = getUuid();
        notice2.userPassKey = key2;
        updatedNotices.shift();
      }
      updatedNotices.push({
        notice: notice2,
        holderCallback
      });
    }
    notices.value = updatedNotices;
  };
  const removeNotice = (removeKey) => {
    notices.value = notices.value.filter((_ref) => {
      let {
        notice: {
          key: key2,
          userPassKey
        }
      } = _ref;
      const mergedKey = userPassKey || key2;
      return mergedKey !== removeKey;
    });
  };
  const destroy = () => {
    notices.value = [];
  };
  const contextHolder = () => createVNode(Notification, {
    "ref": notificationsRef,
    "prefixCls": prefixCls,
    "maxCount": maxCount2,
    "notices": notices.value,
    "remove": removeNotice,
    "getClassName": getClassName,
    "getStyles": getStyles,
    "animation": motion,
    "hashId": rootConfig.hashId,
    "onAllRemoved": onAllRemoved,
    "getContainer": getContainer2
  }, null);
  const taskQueue = shallowRef([]);
  const api2 = {
    open: (config) => {
      const mergedConfig = mergeConfig(shareConfig, config);
      if (mergedConfig.key === null || mergedConfig.key === void 0) {
        mergedConfig.key = `vc-notification-${uniqueKey}`;
        uniqueKey += 1;
      }
      taskQueue.value = [...taskQueue.value, {
        type: "open",
        config: mergedConfig
      }];
    },
    close: (key2) => {
      taskQueue.value = [...taskQueue.value, {
        type: "close",
        key: key2
      }];
    },
    destroy: () => {
      taskQueue.value = [...taskQueue.value, {
        type: "destroy"
      }];
    }
  };
  watch(taskQueue, () => {
    if (taskQueue.value.length) {
      taskQueue.value.forEach((task) => {
        switch (task.type) {
          case "open":
            add(task.config);
            break;
          case "close":
            removeNotice(task.key);
            break;
          case "destroy":
            destroy();
            break;
        }
      });
      taskQueue.value = [];
    }
  });
  return [api2, contextHolder];
}
const genMessageStyle = (token) => {
  const {
    componentCls,
    iconCls,
    boxShadowSecondary,
    colorBgElevated,
    colorSuccess,
    colorError,
    colorWarning,
    colorInfo,
    fontSizeLG,
    motionEaseInOutCirc,
    motionDurationSlow,
    marginXS,
    paddingXS,
    borderRadiusLG,
    zIndexPopup,
    // Custom token
    messageNoticeContentPadding
  } = token;
  const messageMoveIn = new Keyframe("MessageMoveIn", {
    "0%": {
      padding: 0,
      transform: "translateY(-100%)",
      opacity: 0
    },
    "100%": {
      padding: paddingXS,
      transform: "translateY(0)",
      opacity: 1
    }
  });
  const messageMoveOut = new Keyframe("MessageMoveOut", {
    "0%": {
      maxHeight: token.height,
      padding: paddingXS,
      opacity: 1
    },
    "100%": {
      maxHeight: 0,
      padding: 0,
      opacity: 0
    }
  });
  return [
    // ============================ Holder ============================
    {
      [componentCls]: _extends(_extends({}, resetComponent(token)), {
        position: "fixed",
        top: marginXS,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        pointerEvents: "none",
        zIndex: zIndexPopup,
        [`${componentCls}-move-up`]: {
          animationFillMode: "forwards"
        },
        [`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
          animationName: messageMoveIn,
          animationDuration: motionDurationSlow,
          animationPlayState: "paused",
          animationTimingFunction: motionEaseInOutCirc
        },
        [`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: {
          animationPlayState: "running"
        },
        [`${componentCls}-move-up-leave`]: {
          animationName: messageMoveOut,
          animationDuration: motionDurationSlow,
          animationPlayState: "paused",
          animationTimingFunction: motionEaseInOutCirc
        },
        [`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: {
          animationPlayState: "running"
        },
        "&-rtl": {
          direction: "rtl",
          span: {
            direction: "rtl"
          }
        }
      })
    },
    // ============================ Notice ============================
    {
      [`${componentCls}-notice`]: {
        padding: paddingXS,
        textAlign: "center",
        [iconCls]: {
          verticalAlign: "text-bottom",
          marginInlineEnd: marginXS,
          fontSize: fontSizeLG
        },
        [`${componentCls}-notice-content`]: {
          display: "inline-block",
          padding: messageNoticeContentPadding,
          background: colorBgElevated,
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
          pointerEvents: "all"
        },
        [`${componentCls}-success ${iconCls}`]: {
          color: colorSuccess
        },
        [`${componentCls}-error ${iconCls}`]: {
          color: colorError
        },
        [`${componentCls}-warning ${iconCls}`]: {
          color: colorWarning
        },
        [`
        ${componentCls}-info ${iconCls},
        ${componentCls}-loading ${iconCls}`]: {
          color: colorInfo
        }
      }
    },
    // ============================= Pure =============================
    {
      [`${componentCls}-notice-pure-panel`]: {
        padding: 0,
        textAlign: "start"
      }
    }
  ];
};
const useStyle$6 = genComponentStyleHook("Message", (token) => {
  const combinedToken = merge(token, {
    messageNoticeContentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${token.paddingSM}px`
  });
  return [genMessageStyle(combinedToken)];
}, (token) => ({
  height: 150,
  zIndexPopup: token.zIndexPopupBase + 10
}));
const TypeIcon = {
  info: createVNode(InfoCircleFilled, null, null),
  success: createVNode(CheckCircleFilled, null, null),
  error: createVNode(CloseCircleFilled, null, null),
  warning: createVNode(ExclamationCircleFilled, null, null),
  loading: createVNode(LoadingOutlined, null, null)
};
const PureContent$1 = defineComponent({
  name: "PureContent",
  inheritAttrs: false,
  props: ["prefixCls", "type", "icon"],
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _a2;
      return createVNode("div", {
        "class": classNames(`${props.prefixCls}-custom-content`, `${props.prefixCls}-${props.type}`)
      }, [props.icon || TypeIcon[props.type], createVNode("span", null, [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)])]);
    };
  }
});
var __rest$8 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DEFAULT_OFFSET$1 = 8;
const DEFAULT_DURATION$1 = 3;
const Holder$1 = defineComponent({
  name: "Holder",
  inheritAttrs: false,
  props: ["top", "prefixCls", "getContainer", "maxCount", "duration", "rtl", "transitionName", "onAllRemoved", "animation", "staticGetContainer"],
  setup(props, _ref) {
    let {
      expose
    } = _ref;
    var _a2, _b;
    const {
      getPrefixCls,
      getPopupContainer
    } = useConfigInject("message", props);
    const prefixCls = computed(() => getPrefixCls("message", props.prefixCls));
    const [, hashId] = useStyle$6(prefixCls);
    const getStyles = () => {
      var _a3;
      const top = (_a3 = props.top) !== null && _a3 !== void 0 ? _a3 : DEFAULT_OFFSET$1;
      return {
        left: "50%",
        transform: "translateX(-50%)",
        top: typeof top === "number" ? `${top}px` : top
      };
    };
    const getClassName = () => classNames(hashId.value, props.rtl ? `${prefixCls.value}-rtl` : "");
    const getNotificationMotion = () => {
      var _a3;
      return getMotion$1({
        prefixCls: prefixCls.value,
        animation: (_a3 = props.animation) !== null && _a3 !== void 0 ? _a3 : `move-up`,
        transitionName: props.transitionName
      });
    };
    const mergedCloseIcon = createVNode("span", {
      "class": `${prefixCls.value}-close-x`
    }, [createVNode(CloseOutlined, {
      "class": `${prefixCls.value}-close-icon`
    }, null)]);
    const [api2, holder] = useNotification$1({
      //@ts-ignore
      getStyles,
      prefixCls: prefixCls.value,
      getClassName,
      motion: getNotificationMotion,
      closable: false,
      closeIcon: mergedCloseIcon,
      duration: (_a2 = props.duration) !== null && _a2 !== void 0 ? _a2 : DEFAULT_DURATION$1,
      getContainer: (_b = props.staticGetContainer) !== null && _b !== void 0 ? _b : getPopupContainer.value,
      maxCount: props.maxCount,
      onAllRemoved: props.onAllRemoved
    });
    expose(_extends(_extends({}, api2), {
      prefixCls,
      hashId
    }));
    return holder;
  }
});
let keyIndex = 0;
function useInternalMessage(messageConfig) {
  const holderRef = shallowRef(null);
  const holderKey = Symbol("messageHolderKey");
  const close = (key2) => {
    var _a2;
    (_a2 = holderRef.value) === null || _a2 === void 0 ? void 0 : _a2.close(key2);
  };
  const open = (config) => {
    if (!holderRef.value) {
      const fakeResult = () => {
      };
      fakeResult.then = () => {
      };
      return fakeResult;
    }
    const {
      open: originOpen,
      prefixCls,
      hashId
    } = holderRef.value;
    const noticePrefixCls = `${prefixCls}-notice`;
    const {
      content,
      icon,
      type,
      key: key2,
      class: className,
      onClose
    } = config, restConfig = __rest$8(config, ["content", "icon", "type", "key", "class", "onClose"]);
    let mergedKey = key2;
    if (mergedKey === void 0 || mergedKey === null) {
      keyIndex += 1;
      mergedKey = `antd-message-${keyIndex}`;
    }
    return wrapPromiseFn((resolve) => {
      originOpen(_extends(_extends({}, restConfig), {
        key: mergedKey,
        content: () => createVNode(PureContent$1, {
          "prefixCls": prefixCls,
          "type": type,
          "icon": typeof icon === "function" ? icon() : icon
        }, {
          default: () => [typeof content === "function" ? content() : content]
        }),
        placement: "top",
        // @ts-ignore
        class: classNames(type && `${noticePrefixCls}-${type}`, hashId, className),
        onClose: () => {
          onClose === null || onClose === void 0 ? void 0 : onClose();
          resolve();
        }
      }));
      return () => {
        close(mergedKey);
      };
    });
  };
  const destroy = (key2) => {
    var _a2;
    if (key2 !== void 0) {
      close(key2);
    } else {
      (_a2 = holderRef.value) === null || _a2 === void 0 ? void 0 : _a2.destroy();
    }
  };
  const wrapAPI = {
    open,
    destroy
  };
  const keys = ["info", "success", "warning", "error", "loading"];
  keys.forEach((type) => {
    const typeOpen = (jointContent, duration, onClose) => {
      let config;
      if (jointContent && typeof jointContent === "object" && "content" in jointContent) {
        config = jointContent;
      } else {
        config = {
          content: jointContent
        };
      }
      let mergedDuration;
      let mergedOnClose;
      if (typeof duration === "function") {
        mergedOnClose = duration;
      } else {
        mergedDuration = duration;
        mergedOnClose = onClose;
      }
      const mergedConfig = _extends(_extends({
        onClose: mergedOnClose,
        duration: mergedDuration
      }, config), {
        type
      });
      return open(mergedConfig);
    };
    wrapAPI[type] = typeOpen;
  });
  return [wrapAPI, () => createVNode(Holder$1, _objectSpread2(_objectSpread2({
    "key": holderKey
  }, messageConfig), {}, {
    "ref": holderRef
  }), null)];
}
function useMessage(messageConfig) {
  return useInternalMessage(messageConfig);
}
let defaultDuration$1 = 3;
let defaultTop$1;
let messageInstance;
let key = 1;
let localPrefixCls = "";
let transitionName = "move-up";
let hasTransitionName = false;
let getContainer = () => document.body;
let maxCount$1;
let rtl$1 = false;
function getKeyThenIncreaseKey() {
  return key++;
}
function setMessageConfig(options) {
  if (options.top !== void 0) {
    defaultTop$1 = options.top;
    messageInstance = null;
  }
  if (options.duration !== void 0) {
    defaultDuration$1 = options.duration;
  }
  if (options.prefixCls !== void 0) {
    localPrefixCls = options.prefixCls;
  }
  if (options.getContainer !== void 0) {
    getContainer = options.getContainer;
    messageInstance = null;
  }
  if (options.transitionName !== void 0) {
    transitionName = options.transitionName;
    messageInstance = null;
    hasTransitionName = true;
  }
  if (options.maxCount !== void 0) {
    maxCount$1 = options.maxCount;
    messageInstance = null;
  }
  if (options.rtl !== void 0) {
    rtl$1 = options.rtl;
  }
}
function getMessageInstance(args, callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification$1.newInstance({
    appContext: args.appContext,
    prefixCls: args.prefixCls || localPrefixCls,
    rootPrefixCls: args.rootPrefixCls,
    transitionName,
    hasTransitionName,
    style: {
      top: defaultTop$1
    },
    getContainer: getContainer || args.getPopupContainer,
    maxCount: maxCount$1,
    name: "message",
    useStyle: useStyle$6
  }, (instance) => {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }
    messageInstance = instance;
    callback(instance);
  });
}
const typeToIcon$2 = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined
};
const typeList = Object.keys(typeToIcon$2);
function notice$1(args) {
  const duration = args.duration !== void 0 ? args.duration : defaultDuration$1;
  const target = args.key || getKeyThenIncreaseKey();
  const closePromise = new Promise((resolve) => {
    const callback = () => {
      if (typeof args.onClose === "function") {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance(args, (instance) => {
      instance.notice({
        key: target,
        duration,
        style: args.style || {},
        class: args.class,
        content: (_ref) => {
          let {
            prefixCls
          } = _ref;
          const Icon = typeToIcon$2[args.type];
          const iconNode = Icon ? createVNode(Icon, null, null) : "";
          const messageClass = classNames(`${prefixCls}-custom-content`, {
            [`${prefixCls}-${args.type}`]: args.type,
            [`${prefixCls}-rtl`]: rtl$1 === true
          });
          return createVNode("div", {
            "class": messageClass
          }, [typeof args.icon === "function" ? args.icon() : args.icon || iconNode, createVNode("span", null, [typeof args.content === "function" ? args.content() : args.content])]);
        },
        onClose: callback,
        onClick: args.onClick
      });
    });
  });
  const result = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (filled, rejected) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}
function isArgsProps(content) {
  return Object.prototype.toString.call(content) === "[object Object]" && !!content.content;
}
const api$1 = {
  open: notice$1,
  config: setMessageConfig,
  destroy(messageKey) {
    if (messageInstance) {
      if (messageKey) {
        const {
          removeNotice
        } = messageInstance;
        removeNotice(messageKey);
      } else {
        const {
          destroy
        } = messageInstance;
        destroy();
        messageInstance = null;
      }
    }
  }
};
function attachTypeApi(originalApi, type) {
  originalApi[type] = (content, duration, onClose) => {
    if (isArgsProps(content)) {
      return originalApi.open(_extends(_extends({}, content), {
        type
      }));
    }
    if (typeof duration === "function") {
      onClose = duration;
      duration = void 0;
    }
    return originalApi.open({
      content,
      duration,
      type,
      onClose
    });
  };
}
typeList.forEach((type) => attachTypeApi(api$1, type));
api$1.warn = api$1.warning;
api$1.useMessage = useMessage;
const genNotificationPlacementStyle = (token) => {
  const {
    componentCls,
    width,
    notificationMarginEdge
  } = token;
  const notificationTopFadeIn = new Keyframe("antNotificationTopFadeIn", {
    "0%": {
      marginTop: "-100%",
      opacity: 0
    },
    "100%": {
      marginTop: 0,
      opacity: 1
    }
  });
  const notificationBottomFadeIn = new Keyframe("antNotificationBottomFadeIn", {
    "0%": {
      marginBottom: "-100%",
      opacity: 0
    },
    "100%": {
      marginBottom: 0,
      opacity: 1
    }
  });
  const notificationLeftFadeIn = new Keyframe("antNotificationLeftFadeIn", {
    "0%": {
      right: {
        _skip_check_: true,
        value: width
      },
      opacity: 0
    },
    "100%": {
      right: {
        _skip_check_: true,
        value: 0
      },
      opacity: 1
    }
  });
  return {
    [`&${componentCls}-top, &${componentCls}-bottom`]: {
      marginInline: 0
    },
    [`&${componentCls}-top`]: {
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationTopFadeIn
      }
    },
    [`&${componentCls}-bottom`]: {
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationBottomFadeIn
      }
    },
    [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
      marginInlineEnd: 0,
      marginInlineStart: notificationMarginEdge,
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationLeftFadeIn
      }
    }
  };
};
const genNotificationStyle = (token) => {
  const {
    iconCls,
    componentCls,
    // .ant-notification
    boxShadowSecondary,
    fontSizeLG,
    notificationMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut,
    fontSize,
    lineHeight,
    width,
    notificationIconSize
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const notificationFadeIn = new Keyframe("antNotificationFadeIn", {
    "0%": {
      left: {
        _skip_check_: true,
        value: width
      },
      opacity: 0
    },
    "100%": {
      left: {
        _skip_check_: true,
        value: 0
      },
      opacity: 1
    }
  });
  const notificationFadeOut = new Keyframe("antNotificationFadeOut", {
    "0%": {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom,
      opacity: 1
    },
    "100%": {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0
    }
  });
  return [
    // ============================ Holder ============================
    {
      [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
        position: "fixed",
        zIndex: token.zIndexPopup,
        marginInlineEnd: notificationMarginEdge,
        [`${componentCls}-hook-holder`]: {
          position: "relative"
        },
        [`&${componentCls}-top, &${componentCls}-bottom`]: {
          [`${componentCls}-notice`]: {
            marginInline: "auto auto"
          }
        },
        [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
          [`${componentCls}-notice`]: {
            marginInlineEnd: "auto",
            marginInlineStart: 0
          }
        },
        //  animation
        [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
          animationDuration: token.motionDurationMid,
          animationTimingFunction: motionEaseInOut,
          animationFillMode: "both",
          opacity: 0,
          animationPlayState: "paused"
        },
        [`${componentCls}-fade-leave`]: {
          animationTimingFunction: motionEaseInOut,
          animationFillMode: "both",
          animationDuration: motionDurationMid,
          animationPlayState: "paused"
        },
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: notificationFadeIn,
          animationPlayState: "running"
        },
        [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
          animationName: notificationFadeOut,
          animationPlayState: "running"
        }
      }), genNotificationPlacementStyle(token)), {
        // RTL
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-notice-btn`]: {
            float: "left"
          }
        }
      })
    },
    // ============================ Notice ============================
    {
      [noticeCls]: {
        position: "relative",
        width,
        maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
        marginBottom: notificationMarginBottom,
        marginInlineStart: "auto",
        padding: notificationPadding,
        overflow: "hidden",
        lineHeight,
        wordWrap: "break-word",
        background: notificationBg,
        borderRadius: borderRadiusLG,
        boxShadow: boxShadowSecondary,
        [`${componentCls}-close-icon`]: {
          fontSize,
          cursor: "pointer"
        },
        [`${noticeCls}-message`]: {
          marginBottom: token.marginXS,
          color: colorTextHeading,
          fontSize: fontSizeLG,
          lineHeight: token.lineHeightLG
        },
        [`${noticeCls}-description`]: {
          fontSize
        },
        [`&${noticeCls}-closable ${noticeCls}-message`]: {
          paddingInlineEnd: token.paddingLG
        },
        [`${noticeCls}-with-icon ${noticeCls}-message`]: {
          marginBottom: token.marginXS,
          marginInlineStart: token.marginSM + notificationIconSize,
          fontSize: fontSizeLG
        },
        [`${noticeCls}-with-icon ${noticeCls}-description`]: {
          marginInlineStart: token.marginSM + notificationIconSize,
          fontSize
        },
        // Icon & color style in different selector level
        // https://github.com/ant-design/ant-design/issues/16503
        // https://github.com/ant-design/ant-design/issues/15512
        [`${noticeCls}-icon`]: {
          position: "absolute",
          fontSize: notificationIconSize,
          lineHeight: 0,
          // icon-font
          [`&-success${iconCls}`]: {
            color: colorSuccess
          },
          [`&-info${iconCls}`]: {
            color: colorInfo
          },
          [`&-warning${iconCls}`]: {
            color: colorWarning
          },
          [`&-error${iconCls}`]: {
            color: colorError
          }
        },
        [`${noticeCls}-close`]: {
          position: "absolute",
          top: token.notificationPaddingVertical,
          insetInlineEnd: token.notificationPaddingHorizontal,
          color: token.colorIcon,
          outline: "none",
          width: token.notificationCloseButtonSize,
          height: token.notificationCloseButtonSize,
          borderRadius: token.borderRadiusSM,
          transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            color: token.colorIconHover,
            backgroundColor: token.wireframe ? "transparent" : token.colorFillContent
          }
        },
        [`${noticeCls}-btn`]: {
          float: "right",
          marginTop: token.marginSM
        }
      }
    },
    // ============================= Pure =============================
    {
      [`${noticeCls}-pure-panel`]: {
        margin: 0
      }
    }
  ];
};
const useStyle$5 = genComponentStyleHook("Notification", (token) => {
  const notificationPaddingVertical = token.paddingMD;
  const notificationPaddingHorizontal = token.paddingLG;
  const notificationToken = merge(token, {
    // default.less variables
    notificationBg: token.colorBgElevated,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    // index.less variables
    notificationPadding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`,
    notificationMarginBottom: token.margin,
    notificationMarginEdge: token.marginLG,
    animationMaxHeight: 150,
    notificationIconSize: token.fontSizeLG * token.lineHeightLG,
    notificationCloseButtonSize: token.controlHeightLG * 0.55
  });
  return [genNotificationStyle(notificationToken)];
}, (token) => ({
  zIndexPopup: token.zIndexPopupBase + 50,
  width: 384
}));
function getCloseIcon(prefixCls, closeIcon) {
  return closeIcon || createVNode("span", {
    "class": `${prefixCls}-close-x`
  }, [createVNode(CloseOutlined, {
    "class": `${prefixCls}-close-icon`
  }, null)]);
}
({
  info: createVNode(InfoCircleFilled, null, null),
  success: createVNode(CheckCircleFilled, null, null),
  error: createVNode(CloseCircleFilled, null, null),
  warning: createVNode(ExclamationCircleFilled, null, null),
  loading: createVNode(LoadingOutlined, null, null)
});
const typeToIcon$1 = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled
};
function PureContent(_ref) {
  let {
    prefixCls,
    icon,
    type,
    message,
    description,
    btn
  } = _ref;
  let iconNode = null;
  if (icon) {
    iconNode = createVNode("span", {
      "class": `${prefixCls}-icon`
    }, [renderHelper(icon)]);
  } else if (type) {
    const Icon = typeToIcon$1[type];
    iconNode = createVNode(Icon, {
      "class": `${prefixCls}-icon ${prefixCls}-icon-${type}`
    }, null);
  }
  return createVNode("div", {
    "class": classNames({
      [`${prefixCls}-with-icon`]: iconNode
    }),
    "role": "alert"
  }, [iconNode, createVNode("div", {
    "class": `${prefixCls}-message`
  }, [message]), createVNode("div", {
    "class": `${prefixCls}-description`
  }, [description]), btn && createVNode("div", {
    "class": `${prefixCls}-btn`
  }, [btn])]);
}
function getPlacementStyle(placement, top, bottom) {
  let style;
  top = typeof top === "number" ? `${top}px` : top;
  bottom = typeof bottom === "number" ? `${bottom}px` : bottom;
  switch (placement) {
    case "top":
      style = {
        left: "50%",
        transform: "translateX(-50%)",
        right: "auto",
        top,
        bottom: "auto"
      };
      break;
    case "topLeft":
      style = {
        left: 0,
        top,
        bottom: "auto"
      };
      break;
    case "topRight":
      style = {
        right: 0,
        top,
        bottom: "auto"
      };
      break;
    case "bottom":
      style = {
        left: "50%",
        transform: "translateX(-50%)",
        right: "auto",
        top: "auto",
        bottom
      };
      break;
    case "bottomLeft":
      style = {
        left: 0,
        top: "auto",
        bottom
      };
      break;
    default:
      style = {
        right: 0,
        top: "auto",
        bottom
      };
      break;
  }
  return style;
}
function getMotion(prefixCls) {
  return {
    name: `${prefixCls}-fade`
  };
}
var __rest$7 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;
const Holder = defineComponent({
  name: "Holder",
  inheritAttrs: false,
  props: ["prefixCls", "class", "type", "icon", "content", "onAllRemoved"],
  setup(props, _ref) {
    let {
      expose
    } = _ref;
    const {
      getPrefixCls,
      getPopupContainer
    } = useConfigInject("notification", props);
    const prefixCls = computed(() => props.prefixCls || getPrefixCls("notification"));
    const getStyles = (placement) => {
      var _a2, _b;
      return getPlacementStyle(placement, (_a2 = props.top) !== null && _a2 !== void 0 ? _a2 : DEFAULT_OFFSET, (_b = props.bottom) !== null && _b !== void 0 ? _b : DEFAULT_OFFSET);
    };
    const [, hashId] = useStyle$5(prefixCls);
    const getClassName = () => classNames(hashId.value, {
      [`${prefixCls.value}-rtl`]: props.rtl
    });
    const getNotificationMotion = () => getMotion(prefixCls.value);
    const [api2, holder] = useNotification$1({
      prefixCls: prefixCls.value,
      getStyles,
      getClassName,
      motion: getNotificationMotion,
      closable: true,
      closeIcon: getCloseIcon(prefixCls.value),
      duration: DEFAULT_DURATION,
      getContainer: () => {
        var _a2, _b;
        return ((_a2 = props.getPopupContainer) === null || _a2 === void 0 ? void 0 : _a2.call(props)) || ((_b = getPopupContainer.value) === null || _b === void 0 ? void 0 : _b.call(getPopupContainer)) || document.body;
      },
      maxCount: props.maxCount,
      hashId: hashId.value,
      onAllRemoved: props.onAllRemoved
    });
    expose(_extends(_extends({}, api2), {
      prefixCls: prefixCls.value,
      hashId
    }));
    return holder;
  }
});
function useInternalNotification(notificationConfig) {
  const holderRef = shallowRef(null);
  const holderKey = Symbol("notificationHolderKey");
  const open = (config) => {
    if (!holderRef.value) {
      return;
    }
    const {
      open: originOpen,
      prefixCls,
      hashId
    } = holderRef.value;
    const noticePrefixCls = `${prefixCls}-notice`;
    const {
      message,
      description,
      icon,
      type,
      btn,
      class: className
    } = config, restConfig = __rest$7(config, ["message", "description", "icon", "type", "btn", "class"]);
    return originOpen(_extends(_extends({
      placement: "topRight"
    }, restConfig), {
      content: () => createVNode(PureContent, {
        "prefixCls": noticePrefixCls,
        "icon": typeof icon === "function" ? icon() : icon,
        "type": type,
        "message": typeof message === "function" ? message() : message,
        "description": typeof description === "function" ? description() : description,
        "btn": typeof btn === "function" ? btn() : btn
      }, null),
      // @ts-ignore
      class: classNames(type && `${noticePrefixCls}-${type}`, hashId, className)
    }));
  };
  const destroy = (key2) => {
    var _a2, _b;
    if (key2 !== void 0) {
      (_a2 = holderRef.value) === null || _a2 === void 0 ? void 0 : _a2.close(key2);
    } else {
      (_b = holderRef.value) === null || _b === void 0 ? void 0 : _b.destroy();
    }
  };
  const wrapAPI = {
    open,
    destroy
  };
  const keys = ["success", "info", "warning", "error"];
  keys.forEach((type) => {
    wrapAPI[type] = (config) => open(_extends(_extends({}, config), {
      type
    }));
  });
  return [wrapAPI, () => createVNode(Holder, _objectSpread2(_objectSpread2({
    "key": holderKey
  }, notificationConfig), {}, {
    "ref": holderRef
  }), null)];
}
function useNotification(notificationConfig) {
  return useInternalNotification(notificationConfig);
}
const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = "24px";
let defaultBottom = "24px";
let defaultPrefixCls$1 = "";
let defaultPlacement = "topRight";
let defaultGetContainer = () => document.body;
let defaultCloseIcon = null;
let rtl = false;
let maxCount;
function setNotificationConfig(options) {
  const {
    duration,
    placement,
    bottom,
    top,
    getContainer: getContainer2,
    closeIcon,
    prefixCls
  } = options;
  if (prefixCls !== void 0) {
    defaultPrefixCls$1 = prefixCls;
  }
  if (duration !== void 0) {
    defaultDuration = duration;
  }
  if (placement !== void 0) {
    defaultPlacement = placement;
  }
  if (bottom !== void 0) {
    defaultBottom = typeof bottom === "number" ? `${bottom}px` : bottom;
  }
  if (top !== void 0) {
    defaultTop = typeof top === "number" ? `${top}px` : top;
  }
  if (getContainer2 !== void 0) {
    defaultGetContainer = getContainer2;
  }
  if (closeIcon !== void 0) {
    defaultCloseIcon = closeIcon;
  }
  if (options.rtl !== void 0) {
    rtl = options.rtl;
  }
  if (options.maxCount !== void 0) {
    maxCount = options.maxCount;
  }
}
function getNotificationInstance(_ref, callback) {
  let {
    prefixCls: customizePrefixCls,
    placement = defaultPlacement,
    getContainer: getContainer2 = defaultGetContainer,
    top,
    bottom,
    closeIcon = defaultCloseIcon,
    appContext
  } = _ref;
  const {
    getPrefixCls
  } = globalConfig();
  const prefixCls = getPrefixCls("notification", customizePrefixCls || defaultPrefixCls$1);
  const cacheKey = `${prefixCls}-${placement}-${rtl}`;
  const cacheInstance = notificationInstance[cacheKey];
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then((instance) => {
      callback(instance);
    });
    return;
  }
  const notificationClass = classNames(`${prefixCls}-${placement}`, {
    [`${prefixCls}-rtl`]: rtl === true
  });
  Notification$1.newInstance({
    name: "notification",
    prefixCls: customizePrefixCls || defaultPrefixCls$1,
    useStyle: useStyle$5,
    class: notificationClass,
    style: getPlacementStyle(placement, top !== null && top !== void 0 ? top : defaultTop, bottom !== null && bottom !== void 0 ? bottom : defaultBottom),
    appContext,
    getContainer: getContainer2,
    closeIcon: (_ref2) => {
      let {
        prefixCls: prefixCls2
      } = _ref2;
      const closeIconToRender = createVNode("span", {
        "class": `${prefixCls2}-close-x`
      }, [renderHelper(closeIcon, {}, createVNode(CloseOutlined, {
        "class": `${prefixCls2}-close-icon`
      }, null))]);
      return closeIconToRender;
    },
    maxCount,
    hasTransitionName: true
  }, (notification) => {
    notificationInstance[cacheKey] = notification;
    callback(notification);
  });
}
const typeToIcon = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined
};
function notice(args) {
  const {
    icon,
    type,
    description,
    message,
    btn
  } = args;
  const duration = args.duration === void 0 ? defaultDuration : args.duration;
  getNotificationInstance(args, (notification) => {
    notification.notice({
      content: (_ref3) => {
        let {
          prefixCls: outerPrefixCls
        } = _ref3;
        const prefixCls = `${outerPrefixCls}-notice`;
        let iconNode = null;
        if (icon) {
          iconNode = () => createVNode("span", {
            "class": `${prefixCls}-icon`
          }, [renderHelper(icon)]);
        } else if (type) {
          const Icon = typeToIcon[type];
          iconNode = () => createVNode(Icon, {
            "class": `${prefixCls}-icon ${prefixCls}-icon-${type}`
          }, null);
        }
        return createVNode("div", {
          "class": iconNode ? `${prefixCls}-with-icon` : ""
        }, [iconNode && iconNode(), createVNode("div", {
          "class": `${prefixCls}-message`
        }, [!description && iconNode ? createVNode("span", {
          "class": `${prefixCls}-message-single-line-auto-margin`
        }, null) : null, renderHelper(message)]), createVNode("div", {
          "class": `${prefixCls}-description`
        }, [renderHelper(description)]), btn ? createVNode("span", {
          "class": `${prefixCls}-btn`
        }, [renderHelper(btn)]) : null]);
      },
      duration,
      closable: true,
      onClose: args.onClose,
      onClick: args.onClick,
      key: args.key,
      style: args.style || {},
      class: args.class
    });
  });
}
const api = {
  open: notice,
  close(key2) {
    Object.keys(notificationInstance).forEach((cacheKey) => Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
      instance.removeNotice(key2);
    }));
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach((cacheKey) => {
      Promise.resolve(notificationInstance[cacheKey]).then((instance) => {
        instance.destroy();
      });
      delete notificationInstance[cacheKey];
    });
  }
};
const iconTypes = ["success", "info", "warning", "error"];
iconTypes.forEach((type) => {
  api[type] = (args) => api.open(_extends(_extends({}, args), {
    type
  }));
});
api.warn = api.warning;
api.useNotification = useNotification;
const dynamicStyleMark = `-ant-${Date.now()}-${Math.random()}`;
function getStyle(globalPrefixCls, theme) {
  const variables = {};
  const formatColor = (color, updater) => {
    let clone = color.clone();
    clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
    return clone.toRgbString();
  };
  const fillColor = (colorVal, type) => {
    const baseColor = new TinyColor(colorVal);
    const colorPalettes = generate(baseColor.toRgbString());
    variables[`${type}-color`] = formatColor(baseColor);
    variables[`${type}-color-disabled`] = colorPalettes[1];
    variables[`${type}-color-hover`] = colorPalettes[4];
    variables[`${type}-color-active`] = colorPalettes[6];
    variables[`${type}-color-outline`] = baseColor.clone().setAlpha(0.2).toRgbString();
    variables[`${type}-color-deprecated-bg`] = colorPalettes[0];
    variables[`${type}-color-deprecated-border`] = colorPalettes[2];
  };
  if (theme.primaryColor) {
    fillColor(theme.primaryColor, "primary");
    const primaryColor = new TinyColor(theme.primaryColor);
    const primaryColors = generate(primaryColor.toRgbString());
    primaryColors.forEach((color, index2) => {
      variables[`primary-${index2 + 1}`] = color;
    });
    variables["primary-color-deprecated-l-35"] = formatColor(primaryColor, (c) => c.lighten(35));
    variables["primary-color-deprecated-l-20"] = formatColor(primaryColor, (c) => c.lighten(20));
    variables["primary-color-deprecated-t-20"] = formatColor(primaryColor, (c) => c.tint(20));
    variables["primary-color-deprecated-t-50"] = formatColor(primaryColor, (c) => c.tint(50));
    variables["primary-color-deprecated-f-12"] = formatColor(primaryColor, (c) => c.setAlpha(c.getAlpha() * 0.12));
    const primaryActiveColor = new TinyColor(primaryColors[0]);
    variables["primary-color-active-deprecated-f-30"] = formatColor(primaryActiveColor, (c) => c.setAlpha(c.getAlpha() * 0.3));
    variables["primary-color-active-deprecated-d-02"] = formatColor(primaryActiveColor, (c) => c.darken(2));
  }
  if (theme.successColor) {
    fillColor(theme.successColor, "success");
  }
  if (theme.warningColor) {
    fillColor(theme.warningColor, "warning");
  }
  if (theme.errorColor) {
    fillColor(theme.errorColor, "error");
  }
  if (theme.infoColor) {
    fillColor(theme.infoColor, "info");
  }
  const cssList = Object.keys(variables).map((key2) => `--${globalPrefixCls}-${key2}: ${variables[key2]};`);
  return `
  :root {
    ${cssList.join("\n")}
  }
  `.trim();
}
function registerTheme(globalPrefixCls, theme) {
  const style = getStyle(globalPrefixCls, theme);
  if (canUseDom()) {
    updateCSS(style, `${dynamicStyleMark}-dynamic-theme`);
  }
}
const useStyle$4 = (iconPrefixCls) => {
  const [theme, token] = useToken();
  return useStyleRegister(computed(() => ({
    theme: theme.value,
    token: token.value,
    hashId: "",
    path: ["ant-design-icons", iconPrefixCls.value]
  })), () => [{
    [`.${iconPrefixCls.value}`]: _extends(_extends({}, resetIcon()), {
      [`.${iconPrefixCls.value} .${iconPrefixCls.value}-icon`]: {
        display: "block"
      }
    })
  }]);
};
function useTheme(theme, parentTheme) {
  const themeConfig = computed(() => (theme === null || theme === void 0 ? void 0 : theme.value) || {});
  const parentThemeConfig = computed(() => themeConfig.value.inherit === false || !(parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.value) ? defaultConfig : parentTheme.value);
  const mergedTheme = computed(() => {
    if (!(theme === null || theme === void 0 ? void 0 : theme.value)) {
      return parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.value;
    }
    const mergedComponents = _extends({}, parentThemeConfig.value.components);
    Object.keys(theme.value.components || {}).forEach((componentName) => {
      mergedComponents[componentName] = _extends(_extends({}, mergedComponents[componentName]), theme.value.components[componentName]);
    });
    return _extends(_extends(_extends({}, parentThemeConfig.value), themeConfig.value), {
      token: _extends(_extends({}, parentThemeConfig.value.token), themeConfig.value.token),
      components: mergedComponents
    });
  });
  return mergedTheme;
}
var __rest$6 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const defaultPrefixCls = "ant";
function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || defaultPrefixCls;
}
function getGlobalIconPrefixCls() {
  return globalConfigForApi.iconPrefixCls || defaultIconPrefixCls;
}
const globalConfigBySet = reactive({});
const globalConfigForApi = reactive({});
watchEffect(() => {
  _extends(globalConfigForApi, globalConfigBySet);
  globalConfigForApi.prefixCls = getGlobalPrefixCls();
  globalConfigForApi.iconPrefixCls = getGlobalIconPrefixCls();
  globalConfigForApi.getPrefixCls = (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${globalConfigForApi.prefixCls}-${suffixCls}` : globalConfigForApi.prefixCls;
  };
  globalConfigForApi.getRootPrefixCls = () => {
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }
    return getGlobalPrefixCls();
  };
});
let stopWatchEffect;
const setGlobalConfig = (params) => {
  if (stopWatchEffect) {
    stopWatchEffect();
  }
  stopWatchEffect = watchEffect(() => {
    _extends(globalConfigBySet, reactive(params));
    _extends(globalConfigForApi, reactive(params));
  });
  if (params.theme) {
    registerTheme(getGlobalPrefixCls(), params.theme);
  }
};
const globalConfig = () => ({
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: () => {
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }
    return getGlobalPrefixCls();
  }
});
const ConfigProvider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AConfigProvider",
  inheritAttrs: false,
  props: configProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const parentContext = useConfigContextInject();
    const getPrefixCls = (suffixCls, customizePrefixCls) => {
      const {
        prefixCls = "ant"
      } = props;
      if (customizePrefixCls) return customizePrefixCls;
      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };
    const iconPrefixCls = computed(() => props.iconPrefixCls || parentContext.iconPrefixCls.value || defaultIconPrefixCls);
    const shouldWrapSSR = computed(() => iconPrefixCls.value !== parentContext.iconPrefixCls.value);
    const csp = computed(() => {
      var _a2;
      return props.csp || ((_a2 = parentContext.csp) === null || _a2 === void 0 ? void 0 : _a2.value);
    });
    const wrapSSR = useStyle$4(iconPrefixCls);
    const mergedTheme = useTheme(computed(() => props.theme), computed(() => {
      var _a2;
      return (_a2 = parentContext.theme) === null || _a2 === void 0 ? void 0 : _a2.value;
    }));
    const renderEmptyComponent = (name) => {
      const renderEmpty$1 = props.renderEmpty || slots.renderEmpty || parentContext.renderEmpty || renderEmpty;
      return renderEmpty$1(name);
    };
    const autoInsertSpaceInButton = computed(() => {
      var _a2, _b;
      return (_a2 = props.autoInsertSpaceInButton) !== null && _a2 !== void 0 ? _a2 : (_b = parentContext.autoInsertSpaceInButton) === null || _b === void 0 ? void 0 : _b.value;
    });
    const locale2 = computed(() => {
      var _a2;
      return props.locale || ((_a2 = parentContext.locale) === null || _a2 === void 0 ? void 0 : _a2.value);
    });
    watch(locale2, () => {
      globalConfigBySet.locale = locale2.value;
    }, {
      immediate: true
    });
    const direction = computed(() => {
      var _a2;
      return props.direction || ((_a2 = parentContext.direction) === null || _a2 === void 0 ? void 0 : _a2.value);
    });
    const space = computed(() => {
      var _a2, _b;
      return (_a2 = props.space) !== null && _a2 !== void 0 ? _a2 : (_b = parentContext.space) === null || _b === void 0 ? void 0 : _b.value;
    });
    const virtual = computed(() => {
      var _a2, _b;
      return (_a2 = props.virtual) !== null && _a2 !== void 0 ? _a2 : (_b = parentContext.virtual) === null || _b === void 0 ? void 0 : _b.value;
    });
    const dropdownMatchSelectWidth = computed(() => {
      var _a2, _b;
      return (_a2 = props.dropdownMatchSelectWidth) !== null && _a2 !== void 0 ? _a2 : (_b = parentContext.dropdownMatchSelectWidth) === null || _b === void 0 ? void 0 : _b.value;
    });
    const getTargetContainer = computed(() => {
      var _a2;
      return props.getTargetContainer !== void 0 ? props.getTargetContainer : (_a2 = parentContext.getTargetContainer) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const getPopupContainer = computed(() => {
      var _a2;
      return props.getPopupContainer !== void 0 ? props.getPopupContainer : (_a2 = parentContext.getPopupContainer) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const pageHeader = computed(() => {
      var _a2;
      return props.pageHeader !== void 0 ? props.pageHeader : (_a2 = parentContext.pageHeader) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const input = computed(() => {
      var _a2;
      return props.input !== void 0 ? props.input : (_a2 = parentContext.input) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const pagination = computed(() => {
      var _a2;
      return props.pagination !== void 0 ? props.pagination : (_a2 = parentContext.pagination) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const form = computed(() => {
      var _a2;
      return props.form !== void 0 ? props.form : (_a2 = parentContext.form) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const select = computed(() => {
      var _a2;
      return props.select !== void 0 ? props.select : (_a2 = parentContext.select) === null || _a2 === void 0 ? void 0 : _a2.value;
    });
    const componentSize = computed(() => props.componentSize);
    const componentDisabled = computed(() => props.componentDisabled);
    const wave = computed(() => {
      var _a2, _b;
      return (_a2 = props.wave) !== null && _a2 !== void 0 ? _a2 : (_b = parentContext.wave) === null || _b === void 0 ? void 0 : _b.value;
    });
    const configProvider = {
      csp,
      autoInsertSpaceInButton,
      locale: locale2,
      direction,
      space,
      virtual,
      dropdownMatchSelectWidth,
      getPrefixCls,
      iconPrefixCls,
      theme: computed(() => {
        var _a2, _b;
        return (_a2 = mergedTheme.value) !== null && _a2 !== void 0 ? _a2 : (_b = parentContext.theme) === null || _b === void 0 ? void 0 : _b.value;
      }),
      renderEmpty: renderEmptyComponent,
      getTargetContainer,
      getPopupContainer,
      pageHeader,
      input,
      pagination,
      form,
      select,
      componentSize,
      componentDisabled,
      transformCellText: computed(() => props.transformCellText),
      wave
    };
    const memoTheme = computed(() => {
      const _a2 = mergedTheme.value || {}, {
        algorithm,
        token
      } = _a2, rest = __rest$6(_a2, ["algorithm", "token"]);
      const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : void 0;
      return _extends(_extends({}, rest), {
        theme: themeObj,
        token: _extends(_extends({}, seedToken), token)
      });
    });
    const validateMessagesRef = computed(() => {
      var _a2, _b;
      let validateMessages = {};
      if (locale2.value) {
        validateMessages = ((_a2 = locale2.value.Form) === null || _a2 === void 0 ? void 0 : _a2.defaultValidateMessages) || ((_b = localeValues$1.Form) === null || _b === void 0 ? void 0 : _b.defaultValidateMessages) || {};
      }
      if (props.form && props.form.validateMessages) {
        validateMessages = _extends(_extends({}, validateMessages), props.form.validateMessages);
      }
      return validateMessages;
    });
    useConfigContextProvider(configProvider);
    useProvideGlobalForm({
      validateMessages: validateMessagesRef
    });
    useProviderSize(componentSize);
    useProviderDisabled(componentDisabled);
    const renderProvider = (legacyLocale) => {
      var _a2, _b;
      let childNode = shouldWrapSSR.value ? wrapSSR((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) : (_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots);
      if (props.theme) {
        const _childNode = /* @__PURE__ */ function() {
          return childNode;
        }();
        childNode = createVNode(DesignTokenProvider, {
          "value": memoTheme.value
        }, {
          default: () => [_childNode]
        });
      }
      return createVNode(locale$3, {
        "locale": locale2.value || legacyLocale,
        "ANT_MARK__": ANT_MARK
      }, {
        default: () => [childNode]
      });
    };
    watchEffect(() => {
      if (direction.value) {
        api$1.config({
          rtl: direction.value === "rtl"
        });
        api.config({
          rtl: direction.value === "rtl"
        });
      }
    });
    return () => createVNode(LocaleReceiver, {
      "children": (_, __, legacyLocale) => renderProvider(legacyLocale)
    }, null);
  }
});
ConfigProvider.config = setGlobalConfig;
ConfigProvider.install = function(app) {
  app.component(ConfigProvider.name, ConfigProvider);
};
const PickerButton = (props, _ref) => {
  let {
    attrs,
    slots
  } = _ref;
  return createVNode(Button, _objectSpread2(_objectSpread2({
    "size": "small",
    "type": "primary"
  }, props), attrs), slots);
};
const genTagStatusStyle = (token, status, cssVariableType) => {
  const capitalizedCssVariableType = capitalize(cssVariableType);
  return {
    [`${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`color${capitalizedCssVariableType}Bg`],
      borderColor: token[`color${capitalizedCssVariableType}Border`],
      [`&${token.componentCls}-borderless`]: {
        borderColor: "transparent"
      }
    }
  };
};
const genPresetStyle = (token) => genPresetColor(token, (colorKey, _ref) => {
  let {
    textColor,
    lightBorderColor,
    lightColor,
    darkColor
  } = _ref;
  return {
    [`${token.componentCls}-${colorKey}`]: {
      color: textColor,
      background: lightColor,
      borderColor: lightBorderColor,
      // Inverse color
      "&-inverse": {
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor
      },
      [`&${token.componentCls}-borderless`]: {
        borderColor: "transparent"
      }
    }
  };
});
const genBaseStyle$1 = (token) => {
  const {
    paddingXXS,
    lineWidth,
    tagPaddingHorizontal,
    componentCls
  } = token;
  const paddingInline = tagPaddingHorizontal - lineWidth;
  const iconMarginInline = paddingXXS - lineWidth;
  return {
    // Result
    [componentCls]: _extends(_extends({}, resetComponent(token)), {
      display: "inline-block",
      height: "auto",
      marginInlineEnd: token.marginXS,
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: `${token.tagLineHeight}px`,
      whiteSpace: "nowrap",
      background: token.tagDefaultBg,
      border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusSM,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,
      textAlign: "start",
      // RTL
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      "&, a, a:hover": {
        color: token.tagDefaultColor
      },
      [`${componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        color: token.colorTextDescription,
        fontSize: token.tagIconSize,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      },
      [`&${componentCls}-has-color`]: {
        borderColor: "transparent",
        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid
        }
      },
      [`&-checkable`]: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        cursor: "pointer",
        [`&:not(${componentCls}-checkable-checked):hover`]: {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary
        },
        "&:active, &-checked": {
          color: token.colorTextLightSolid
        },
        "&-checked": {
          backgroundColor: token.colorPrimary,
          "&:hover": {
            backgroundColor: token.colorPrimaryHover
          }
        },
        "&:active": {
          backgroundColor: token.colorPrimaryActive
        }
      },
      [`&-hidden`]: {
        display: "none"
      },
      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline
      }
    }),
    [`${componentCls}-borderless`]: {
      borderColor: "transparent",
      background: token.tagBorderlessBg
    }
  };
};
const useStyle$3 = genComponentStyleHook("Tag", (token) => {
  const {
    fontSize,
    lineHeight,
    lineWidth,
    fontSizeIcon
  } = token;
  const tagHeight = Math.round(fontSize * lineHeight);
  const tagFontSize = token.fontSizeSM;
  const tagLineHeight = tagHeight - lineWidth * 2;
  const tagDefaultBg = token.colorFillAlter;
  const tagDefaultColor = token.colorText;
  const tagToken = merge(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
    tagIconSize: fontSizeIcon - 2 * lineWidth,
    tagPaddingHorizontal: 8,
    tagBorderlessBg: token.colorFillTertiary
  });
  return [genBaseStyle$1(tagToken), genPresetStyle(tagToken), genTagStatusStyle(tagToken, "success", "Success"), genTagStatusStyle(tagToken, "processing", "Info"), genTagStatusStyle(tagToken, "error", "Error"), genTagStatusStyle(tagToken, "warning", "Warning")];
});
const checkableTagProps = () => ({
  prefixCls: String,
  checked: {
    type: Boolean,
    default: void 0
  },
  onChange: {
    type: Function
  },
  onClick: {
    type: Function
  },
  "onUpdate:checked": Function
});
const CheckableTag = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ACheckableTag",
  inheritAttrs: false,
  props: checkableTagProps(),
  // emits: ['update:checked', 'change', 'click'],
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const {
      prefixCls
    } = useConfigInject("tag", props);
    const [wrapSSR, hashId] = useStyle$3(prefixCls);
    const handleClick = (e) => {
      const {
        checked
      } = props;
      emit("update:checked", !checked);
      emit("change", !checked);
      emit("click", e);
    };
    const cls = computed(() => classNames(prefixCls.value, hashId.value, {
      [`${prefixCls.value}-checkable`]: true,
      [`${prefixCls.value}-checkable-checked`]: props.checked
    }));
    return () => {
      var _a2;
      return wrapSSR(createVNode("span", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": [cls.value, attrs.class],
        "onClick": handleClick
      }), [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]));
    };
  }
});
const tagProps = () => ({
  prefixCls: String,
  color: {
    type: String
  },
  closable: {
    type: Boolean,
    default: false
  },
  closeIcon: PropTypes.any,
  /** @deprecated `visible` will be removed in next major version. */
  visible: {
    type: Boolean,
    default: void 0
  },
  onClose: {
    type: Function
  },
  onClick: eventType(),
  "onUpdate:visible": Function,
  icon: PropTypes.any,
  bordered: {
    type: Boolean,
    default: true
  }
});
const Tag = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATag",
  inheritAttrs: false,
  props: tagProps(),
  // emits: ['update:visible', 'close'],
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("tag", props);
    const [wrapSSR, hashId] = useStyle$3(prefixCls);
    const visible = shallowRef(true);
    watchEffect(() => {
      if (props.visible !== void 0) {
        visible.value = props.visible;
      }
    });
    const handleCloseClick = (e) => {
      e.stopPropagation();
      emit("update:visible", false);
      emit("close", e);
      if (e.defaultPrevented) {
        return;
      }
      if (props.visible === void 0) {
        visible.value = false;
      }
    };
    const isInternalColor = computed(() => isPresetColor(props.color) || isPresetStatusColor(props.color));
    const tagClassName = computed(() => classNames(prefixCls.value, hashId.value, {
      [`${prefixCls.value}-${props.color}`]: isInternalColor.value,
      [`${prefixCls.value}-has-color`]: props.color && !isInternalColor.value,
      [`${prefixCls.value}-hidden`]: !visible.value,
      [`${prefixCls.value}-rtl`]: direction.value === "rtl",
      [`${prefixCls.value}-borderless`]: !props.bordered
    }));
    const handleClick = (e) => {
      emit("click", e);
    };
    return () => {
      var _a2, _b, _c;
      const {
        icon = (_a2 = slots.icon) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
        color,
        closeIcon = (_b = slots.closeIcon) === null || _b === void 0 ? void 0 : _b.call(slots),
        closable = false
      } = props;
      const renderCloseIcon = () => {
        if (closable) {
          return closeIcon ? createVNode("span", {
            "class": `${prefixCls.value}-close-icon`,
            "onClick": handleCloseClick
          }, [closeIcon]) : createVNode(CloseOutlined, {
            "class": `${prefixCls.value}-close-icon`,
            "onClick": handleCloseClick
          }, null);
        }
        return null;
      };
      const tagStyle = {
        backgroundColor: color && !isInternalColor.value ? color : void 0
      };
      const iconNode = icon || null;
      const children = (_c = slots.default) === null || _c === void 0 ? void 0 : _c.call(slots);
      const kids = iconNode ? createVNode(Fragment, null, [iconNode, createVNode("span", null, [children])]) : children;
      const isNeedWave = props.onClick !== void 0;
      const tagNode = createVNode("span", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "onClick": handleClick,
        "class": [tagClassName.value, attrs.class],
        "style": [tagStyle, attrs.style]
      }), [kids, renderCloseIcon()]);
      return wrapSSR(isNeedWave ? createVNode(Wave, null, {
        default: () => [tagNode]
      }) : tagNode);
    };
  }
});
Tag.CheckableTag = CheckableTag;
Tag.install = function(app) {
  app.component(Tag.name, Tag);
  app.component(CheckableTag.name, CheckableTag);
  return app;
};
function PickerTag(props, _ref) {
  let {
    slots,
    attrs
  } = _ref;
  return createVNode(Tag, _objectSpread2(_objectSpread2({
    "color": "blue"
  }, props), attrs), slots);
}
function getPlaceholder(locale2, picker, customizePlaceholder) {
  if (customizePlaceholder !== void 0) {
    return customizePlaceholder;
  }
  if (picker === "year" && locale2.lang.yearPlaceholder) {
    return locale2.lang.yearPlaceholder;
  }
  if (picker === "quarter" && locale2.lang.quarterPlaceholder) {
    return locale2.lang.quarterPlaceholder;
  }
  if (picker === "month" && locale2.lang.monthPlaceholder) {
    return locale2.lang.monthPlaceholder;
  }
  if (picker === "week" && locale2.lang.weekPlaceholder) {
    return locale2.lang.weekPlaceholder;
  }
  if (picker === "time" && locale2.timePickerLocale.placeholder) {
    return locale2.timePickerLocale.placeholder;
  }
  return locale2.lang.placeholder;
}
function getRangePlaceholder(locale2, picker, customizePlaceholder) {
  if (customizePlaceholder !== void 0) {
    return customizePlaceholder;
  }
  if (picker === "year" && locale2.lang.yearPlaceholder) {
    return locale2.lang.rangeYearPlaceholder;
  }
  if (picker === "month" && locale2.lang.monthPlaceholder) {
    return locale2.lang.rangeMonthPlaceholder;
  }
  if (picker === "week" && locale2.lang.weekPlaceholder) {
    return locale2.lang.rangeWeekPlaceholder;
  }
  if (picker === "time" && locale2.timePickerLocale.placeholder) {
    return locale2.timePickerLocale.rangePlaceholder;
  }
  return locale2.lang.rangePlaceholder;
}
function transPlacement2DropdownAlign(direction, placement) {
  const overflow = {
    adjustX: 1,
    adjustY: 1
  };
  switch (placement) {
    case "bottomLeft": {
      return {
        points: ["tl", "bl"],
        offset: [0, 4],
        overflow
      };
    }
    case "bottomRight": {
      return {
        points: ["tr", "br"],
        offset: [0, 4],
        overflow
      };
    }
    case "topLeft": {
      return {
        points: ["bl", "tl"],
        offset: [0, -4],
        overflow
      };
    }
    case "topRight": {
      return {
        points: ["br", "tr"],
        offset: [0, -4],
        overflow
      };
    }
    default: {
      return {
        points: direction === "rtl" ? ["tr", "br"] : ["tl", "bl"],
        offset: [0, 4],
        overflow
      };
    }
  }
}
function commonProps() {
  return {
    id: String,
    /**
     * @deprecated `dropdownClassName` is deprecated which will be removed in next major
     *   version.Please use `popupClassName` instead.
     */
    dropdownClassName: String,
    popupClassName: String,
    popupStyle: objectType(),
    transitionName: String,
    placeholder: String,
    allowClear: booleanType(),
    autofocus: booleanType(),
    disabled: booleanType(),
    tabindex: Number,
    open: booleanType(),
    defaultOpen: booleanType(),
    /** Make input readOnly to avoid popup keyboard in mobile */
    inputReadOnly: booleanType(),
    format: someType([String, Function, Array]),
    // Value
    // format:  string | CustomFormat<DateType> | (string | CustomFormat<DateType>)[];
    // Render
    // suffixIcon?: VueNode;
    // clearIcon?: VueNode;
    // prevIcon?: VueNode;
    // nextIcon?: VueNode;
    // superPrevIcon?: VueNode;
    // superNextIcon?: VueNode;
    getPopupContainer: functionType(),
    panelRender: functionType(),
    // // Events
    onChange: functionType(),
    "onUpdate:value": functionType(),
    onOk: functionType(),
    onOpenChange: functionType(),
    "onUpdate:open": functionType(),
    onFocus: functionType(),
    onBlur: functionType(),
    onMousedown: functionType(),
    onMouseup: functionType(),
    onMouseenter: functionType(),
    onMouseleave: functionType(),
    onClick: functionType(),
    onContextmenu: functionType(),
    onKeydown: functionType(),
    // WAI-ARIA
    role: String,
    name: String,
    autocomplete: String,
    direction: stringType(),
    showToday: booleanType(),
    showTime: someType([Boolean, Object]),
    locale: objectType(),
    size: stringType(),
    bordered: booleanType(),
    dateRender: functionType(),
    disabledDate: functionType(),
    mode: stringType(),
    picker: stringType(),
    valueFormat: String,
    placement: stringType(),
    status: stringType(),
    /** @deprecated Please use `disabledTime` instead. */
    disabledHours: functionType(),
    /** @deprecated Please use `disabledTime` instead. */
    disabledMinutes: functionType(),
    /** @deprecated Please use `disabledTime` instead. */
    disabledSeconds: functionType()
  };
}
function datePickerProps() {
  return {
    defaultPickerValue: someType([Object, String]),
    defaultValue: someType([Object, String]),
    value: someType([Object, String]),
    presets: arrayType(),
    disabledTime: functionType(),
    renderExtraFooter: functionType(),
    showNow: booleanType(),
    monthCellRender: functionType(),
    // deprecated  Please use `monthCellRender"` instead.',
    monthCellContentRender: functionType()
  };
}
function rangePickerProps() {
  return {
    allowEmpty: arrayType(),
    dateRender: functionType(),
    defaultPickerValue: arrayType(),
    defaultValue: arrayType(),
    value: arrayType(),
    presets: arrayType(),
    disabledTime: functionType(),
    disabled: someType([Boolean, Array]),
    renderExtraFooter: functionType(),
    separator: {
      type: String
    },
    showTime: someType([Boolean, Object]),
    ranges: objectType(),
    placeholder: arrayType(),
    mode: arrayType(),
    onChange: functionType(),
    "onUpdate:value": functionType(),
    onCalendarChange: functionType(),
    onPanelChange: functionType(),
    onOk: functionType()
  };
}
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function generateSinglePicker(generateConfig2, extraProps) {
  function getPicker(picker, displayName) {
    const comProps = _extends(_extends(_extends({}, commonProps()), datePickerProps()), extraProps);
    return defineComponent({
      compatConfig: {
        MODE: 3
      },
      name: displayName,
      inheritAttrs: false,
      props: comProps,
      slots: Object,
      setup(_props, _ref) {
        let {
          slots,
          expose,
          attrs,
          emit
        } = _ref;
        const props = _props;
        const formItemContext = useInjectFormItemContext();
        const formItemInputContext = FormItemInputContext.useInject();
        const {
          prefixCls,
          direction,
          getPopupContainer,
          size,
          rootPrefixCls,
          disabled
        } = useConfigInject("picker", props);
        const {
          compactSize,
          compactItemClassnames
        } = useCompactItemContext(prefixCls, direction);
        const mergedSize = computed(() => compactSize.value || size.value);
        const [wrapSSR, hashId] = useStyle$9(prefixCls);
        const pickerRef = ref();
        expose({
          focus: () => {
            var _a2;
            (_a2 = pickerRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus();
          },
          blur: () => {
            var _a2;
            (_a2 = pickerRef.value) === null || _a2 === void 0 ? void 0 : _a2.blur();
          }
        });
        const maybeToString = (date) => {
          return props.valueFormat ? generateConfig2.toString(date, props.valueFormat) : date;
        };
        const onChange = (date, dateString) => {
          const value2 = maybeToString(date);
          emit("update:value", value2);
          emit("change", value2, dateString);
          formItemContext.onFieldChange();
        };
        const onOpenChange = (open) => {
          emit("update:open", open);
          emit("openChange", open);
        };
        const onFocus = (e) => {
          emit("focus", e);
        };
        const onBlur = (e) => {
          emit("blur", e);
          formItemContext.onFieldBlur();
        };
        const onPanelChange = (date, mode) => {
          const value2 = maybeToString(date);
          emit("panelChange", value2, mode);
        };
        const onOk = (date) => {
          const value2 = maybeToString(date);
          emit("ok", value2);
        };
        const [contextLocale] = useLocaleReceiver("DatePicker", locale$4);
        const value = computed(() => {
          if (props.value) {
            return props.valueFormat ? generateConfig2.toDate(props.value, props.valueFormat) : props.value;
          }
          return props.value === "" ? void 0 : props.value;
        });
        const defaultValue = computed(() => {
          if (props.defaultValue) {
            return props.valueFormat ? generateConfig2.toDate(props.defaultValue, props.valueFormat) : props.defaultValue;
          }
          return props.defaultValue === "" ? void 0 : props.defaultValue;
        });
        const defaultPickerValue = computed(() => {
          if (props.defaultPickerValue) {
            return props.valueFormat ? generateConfig2.toDate(props.defaultPickerValue, props.valueFormat) : props.defaultPickerValue;
          }
          return props.defaultPickerValue === "" ? void 0 : props.defaultPickerValue;
        });
        return () => {
          var _a2, _b, _c, _d, _e, _f;
          const locale2 = _extends(_extends({}, contextLocale.value), props.locale);
          const p = _extends(_extends({}, props), attrs);
          const {
            bordered = true,
            placeholder,
            suffixIcon = (_a2 = slots.suffixIcon) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
            showToday = true,
            transitionName: transitionName2,
            allowClear = true,
            dateRender = slots.dateRender,
            renderExtraFooter = slots.renderExtraFooter,
            monthCellRender = slots.monthCellRender || props.monthCellContentRender || slots.monthCellContentRender,
            clearIcon = (_b = slots.clearIcon) === null || _b === void 0 ? void 0 : _b.call(slots),
            id = formItemContext.id.value
          } = p, restProps = __rest$5(p, ["bordered", "placeholder", "suffixIcon", "showToday", "transitionName", "allowClear", "dateRender", "renderExtraFooter", "monthCellRender", "clearIcon", "id"]);
          const showTime = p.showTime === "" ? true : p.showTime;
          const {
            format
          } = p;
          let additionalOverrideProps = {};
          if (picker) {
            additionalOverrideProps.picker = picker;
          }
          const mergedPicker = picker || p.picker || "date";
          additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
            format,
            picker: mergedPicker
          }, typeof showTime === "object" ? showTime : {})) : {}), mergedPicker === "time" ? getTimeProps(_extends(_extends({
            format
          }, restProps), {
            picker: mergedPicker
          })) : {});
          const pre = prefixCls.value;
          const suffixNode = createVNode(Fragment, null, [suffixIcon || (picker === "time" ? createVNode(ClockCircleOutlined, null, null) : createVNode(CalendarOutlined, null, null)), formItemInputContext.hasFeedback && formItemInputContext.feedbackIcon]);
          return wrapSSR(createVNode(Picker$1, _objectSpread2(_objectSpread2(_objectSpread2({
            "monthCellRender": monthCellRender,
            "dateRender": dateRender,
            "renderExtraFooter": renderExtraFooter,
            "ref": pickerRef,
            "placeholder": getPlaceholder(locale2, mergedPicker, placeholder),
            "suffixIcon": suffixNode,
            "dropdownAlign": transPlacement2DropdownAlign(direction.value, props.placement),
            "clearIcon": clearIcon || createVNode(CloseCircleFilled, null, null),
            "allowClear": allowClear,
            "transitionName": transitionName2 || `${rootPrefixCls.value}-slide-up`
          }, restProps), additionalOverrideProps), {}, {
            "id": id,
            "picker": mergedPicker,
            "value": value.value,
            "defaultValue": defaultValue.value,
            "defaultPickerValue": defaultPickerValue.value,
            "showToday": showToday,
            "locale": locale2.lang,
            "class": classNames({
              [`${pre}-${mergedSize.value}`]: mergedSize.value,
              [`${pre}-borderless`]: !bordered
            }, getStatusClassNames(pre, getMergedStatus(formItemInputContext.status, props.status), formItemInputContext.hasFeedback), attrs.class, hashId.value, compactItemClassnames.value),
            "disabled": disabled.value,
            "prefixCls": pre,
            "getPopupContainer": attrs.getCalendarContainer || getPopupContainer.value,
            "generateConfig": generateConfig2,
            "prevIcon": ((_c = slots.prevIcon) === null || _c === void 0 ? void 0 : _c.call(slots)) || createVNode("span", {
              "class": `${pre}-prev-icon`
            }, null),
            "nextIcon": ((_d = slots.nextIcon) === null || _d === void 0 ? void 0 : _d.call(slots)) || createVNode("span", {
              "class": `${pre}-next-icon`
            }, null),
            "superPrevIcon": ((_e = slots.superPrevIcon) === null || _e === void 0 ? void 0 : _e.call(slots)) || createVNode("span", {
              "class": `${pre}-super-prev-icon`
            }, null),
            "superNextIcon": ((_f = slots.superNextIcon) === null || _f === void 0 ? void 0 : _f.call(slots)) || createVNode("span", {
              "class": `${pre}-super-next-icon`
            }, null),
            "components": Components,
            "direction": direction.value,
            "dropdownClassName": classNames(hashId.value, props.popupClassName, props.dropdownClassName),
            "onChange": onChange,
            "onOpenChange": onOpenChange,
            "onFocus": onFocus,
            "onBlur": onBlur,
            "onPanelChange": onPanelChange,
            "onOk": onOk
          }), null));
        };
      }
    });
  }
  const DatePicker2 = getPicker(void 0, "ADatePicker");
  const WeekPicker2 = getPicker("week", "AWeekPicker");
  const MonthPicker2 = getPicker("month", "AMonthPicker");
  const YearPicker2 = getPicker("year", "AYearPicker");
  const TimePicker2 = getPicker("time", "TimePicker");
  const QuarterPicker2 = getPicker("quarter", "AQuarterPicker");
  return {
    DatePicker: DatePicker2,
    WeekPicker: WeekPicker2,
    MonthPicker: MonthPicker2,
    YearPicker: YearPicker2,
    TimePicker: TimePicker2,
    QuarterPicker: QuarterPicker2
  };
}
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function generateRangePicker(generateConfig2, extraProps) {
  const RangePicker2 = defineComponent({
    compatConfig: {
      MODE: 3
    },
    name: "ARangePicker",
    inheritAttrs: false,
    props: _extends(_extends(_extends({}, commonProps()), rangePickerProps()), extraProps),
    slots: Object,
    setup(_props, _ref) {
      let {
        expose,
        slots,
        attrs,
        emit
      } = _ref;
      const props = _props;
      const formItemContext = useInjectFormItemContext();
      const formItemInputContext = FormItemInputContext.useInject();
      const {
        prefixCls,
        direction,
        getPopupContainer,
        size,
        rootPrefixCls,
        disabled
      } = useConfigInject("picker", props);
      const {
        compactSize,
        compactItemClassnames
      } = useCompactItemContext(prefixCls, direction);
      const mergedSize = computed(() => compactSize.value || size.value);
      const [wrapSSR, hashId] = useStyle$9(prefixCls);
      const pickerRef = ref();
      expose({
        focus: () => {
          var _a2;
          (_a2 = pickerRef.value) === null || _a2 === void 0 ? void 0 : _a2.focus();
        },
        blur: () => {
          var _a2;
          (_a2 = pickerRef.value) === null || _a2 === void 0 ? void 0 : _a2.blur();
        }
      });
      const maybeToStrings = (dates) => {
        return props.valueFormat ? generateConfig2.toString(dates, props.valueFormat) : dates;
      };
      const onChange = (dates, dateStrings) => {
        const values = maybeToStrings(dates);
        emit("update:value", values);
        emit("change", values, dateStrings);
        formItemContext.onFieldChange();
      };
      const onOpenChange = (open) => {
        emit("update:open", open);
        emit("openChange", open);
      };
      const onFocus = (e) => {
        emit("focus", e);
      };
      const onBlur = (e) => {
        emit("blur", e);
        formItemContext.onFieldBlur();
      };
      const onPanelChange = (dates, modes) => {
        const values = maybeToStrings(dates);
        emit("panelChange", values, modes);
      };
      const onOk = (dates) => {
        const value2 = maybeToStrings(dates);
        emit("ok", value2);
      };
      const onCalendarChange = (dates, dateStrings, info) => {
        const values = maybeToStrings(dates);
        emit("calendarChange", values, dateStrings, info);
      };
      const [contextLocale] = useLocaleReceiver("DatePicker", locale$4);
      const value = computed(() => {
        if (props.value) {
          return props.valueFormat ? generateConfig2.toDate(props.value, props.valueFormat) : props.value;
        }
        return props.value;
      });
      const defaultValue = computed(() => {
        if (props.defaultValue) {
          return props.valueFormat ? generateConfig2.toDate(props.defaultValue, props.valueFormat) : props.defaultValue;
        }
        return props.defaultValue;
      });
      const defaultPickerValue = computed(() => {
        if (props.defaultPickerValue) {
          return props.valueFormat ? generateConfig2.toDate(props.defaultPickerValue, props.valueFormat) : props.defaultPickerValue;
        }
        return props.defaultPickerValue;
      });
      return () => {
        var _a2, _b, _c, _d, _e, _f, _g;
        const locale2 = _extends(_extends({}, contextLocale.value), props.locale);
        const p = _extends(_extends({}, props), attrs);
        const {
          prefixCls: customizePrefixCls,
          bordered = true,
          placeholder,
          suffixIcon = (_a2 = slots.suffixIcon) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
          picker = "date",
          transitionName: transitionName2,
          allowClear = true,
          dateRender = slots.dateRender,
          renderExtraFooter = slots.renderExtraFooter,
          separator = (_b = slots.separator) === null || _b === void 0 ? void 0 : _b.call(slots),
          clearIcon = (_c = slots.clearIcon) === null || _c === void 0 ? void 0 : _c.call(slots),
          id = formItemContext.id.value
        } = p, restProps = __rest$4(p, ["prefixCls", "bordered", "placeholder", "suffixIcon", "picker", "transitionName", "allowClear", "dateRender", "renderExtraFooter", "separator", "clearIcon", "id"]);
        delete restProps["onUpdate:value"];
        delete restProps["onUpdate:open"];
        const {
          format,
          showTime
        } = p;
        let additionalOverrideProps = {};
        additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
          format,
          picker
        }, showTime)) : {}), picker === "time" ? getTimeProps(_extends(_extends({
          format
        }, omit(restProps, ["disabledTime"])), {
          picker
        })) : {});
        const pre = prefixCls.value;
        const suffixNode = createVNode(Fragment, null, [suffixIcon || (picker === "time" ? createVNode(ClockCircleOutlined, null, null) : createVNode(CalendarOutlined, null, null)), formItemInputContext.hasFeedback && formItemInputContext.feedbackIcon]);
        return wrapSSR(createVNode(InterRangerPicker, _objectSpread2(_objectSpread2(_objectSpread2({
          "dateRender": dateRender,
          "renderExtraFooter": renderExtraFooter,
          "separator": separator || createVNode("span", {
            "aria-label": "to",
            "class": `${pre}-separator`
          }, [createVNode(SwapRightOutlined, null, null)]),
          "ref": pickerRef,
          "dropdownAlign": transPlacement2DropdownAlign(direction.value, props.placement),
          "placeholder": getRangePlaceholder(locale2, picker, placeholder),
          "suffixIcon": suffixNode,
          "clearIcon": clearIcon || createVNode(CloseCircleFilled, null, null),
          "allowClear": allowClear,
          "transitionName": transitionName2 || `${rootPrefixCls.value}-slide-up`
        }, restProps), additionalOverrideProps), {}, {
          "disabled": disabled.value,
          "id": id,
          "value": value.value,
          "defaultValue": defaultValue.value,
          "defaultPickerValue": defaultPickerValue.value,
          "picker": picker,
          "class": classNames({
            [`${pre}-${mergedSize.value}`]: mergedSize.value,
            [`${pre}-borderless`]: !bordered
          }, getStatusClassNames(pre, getMergedStatus(formItemInputContext.status, props.status), formItemInputContext.hasFeedback), attrs.class, hashId.value, compactItemClassnames.value),
          "locale": locale2.lang,
          "prefixCls": pre,
          "getPopupContainer": attrs.getCalendarContainer || getPopupContainer.value,
          "generateConfig": generateConfig2,
          "prevIcon": ((_d = slots.prevIcon) === null || _d === void 0 ? void 0 : _d.call(slots)) || createVNode("span", {
            "class": `${pre}-prev-icon`
          }, null),
          "nextIcon": ((_e = slots.nextIcon) === null || _e === void 0 ? void 0 : _e.call(slots)) || createVNode("span", {
            "class": `${pre}-next-icon`
          }, null),
          "superPrevIcon": ((_f = slots.superPrevIcon) === null || _f === void 0 ? void 0 : _f.call(slots)) || createVNode("span", {
            "class": `${pre}-super-prev-icon`
          }, null),
          "superNextIcon": ((_g = slots.superNextIcon) === null || _g === void 0 ? void 0 : _g.call(slots)) || createVNode("span", {
            "class": `${pre}-super-next-icon`
          }, null),
          "components": Components,
          "direction": direction.value,
          "dropdownClassName": classNames(hashId.value, props.popupClassName, props.dropdownClassName),
          "onChange": onChange,
          "onOpenChange": onOpenChange,
          "onFocus": onFocus,
          "onBlur": onBlur,
          "onPanelChange": onPanelChange,
          "onOk": onOk,
          "onCalendarChange": onCalendarChange
        }), null));
      };
    }
  });
  return RangePicker2;
}
const Components = {
  button: PickerButton,
  rangeItem: PickerTag
};
function toArray$1(list) {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}
function getTimeProps(props) {
  const {
    format,
    picker,
    showHour,
    showMinute,
    showSecond,
    use12Hours
  } = props;
  const firstFormat = toArray$1(format)[0];
  const showTimeObj = _extends({}, props);
  if (firstFormat && typeof firstFormat === "string") {
    if (!firstFormat.includes("s") && showSecond === void 0) {
      showTimeObj.showSecond = false;
    }
    if (!firstFormat.includes("m") && showMinute === void 0) {
      showTimeObj.showMinute = false;
    }
    if (!firstFormat.includes("H") && !firstFormat.includes("h") && showHour === void 0) {
      showTimeObj.showHour = false;
    }
    if ((firstFormat.includes("a") || firstFormat.includes("A")) && use12Hours === void 0) {
      showTimeObj.use12Hours = true;
    }
  }
  if (picker === "time") {
    return showTimeObj;
  }
  if (typeof firstFormat === "function") {
    delete showTimeObj.format;
  }
  return {
    showTime: showTimeObj
  };
}
function generatePicker(generateConfig2, extraProps) {
  const {
    DatePicker: DatePicker2,
    WeekPicker: WeekPicker2,
    MonthPicker: MonthPicker2,
    YearPicker: YearPicker2,
    TimePicker: TimePicker2,
    QuarterPicker: QuarterPicker2
  } = generateSinglePicker(generateConfig2, extraProps);
  const RangePicker2 = generateRangePicker(generateConfig2, extraProps);
  return {
    DatePicker: DatePicker2,
    WeekPicker: WeekPicker2,
    MonthPicker: MonthPicker2,
    YearPicker: YearPicker2,
    TimePicker: TimePicker2,
    QuarterPicker: QuarterPicker2,
    RangePicker: RangePicker2
  };
}
const {
  DatePicker,
  WeekPicker,
  MonthPicker,
  YearPicker,
  TimePicker,
  QuarterPicker,
  RangePicker
} = generatePicker(generateConfig);
_extends(DatePicker, {
  WeekPicker,
  MonthPicker,
  YearPicker,
  RangePicker,
  TimePicker,
  QuarterPicker,
  install: (app) => {
    app.component(DatePicker.name, DatePicker);
    app.component(RangePicker.name, RangePicker);
    app.component(MonthPicker.name, MonthPicker);
    app.component(WeekPicker.name, WeekPicker);
    app.component(QuarterPicker.name, QuarterPicker);
    return app;
  }
});
Dropdown.Button = DropdownButton;
Dropdown.install = function(app) {
  app.component(Dropdown.name, Dropdown);
  app.component(DropdownButton.name, DropdownButton);
  return app;
};
const genLayoutLightStyle = (token) => {
  const {
    componentCls,
    colorBgContainer,
    colorBgBody,
    colorText
  } = token;
  return {
    [`${componentCls}-sider-light`]: {
      background: colorBgContainer,
      [`${componentCls}-sider-trigger`]: {
        color: colorText,
        background: colorBgContainer
      },
      [`${componentCls}-sider-zero-width-trigger`]: {
        color: colorText,
        background: colorBgContainer,
        border: `1px solid ${colorBgBody}`,
        borderInlineStart: 0
      }
    }
  };
};
const genLayoutStyle = (token) => {
  const {
    antCls,
    // .ant
    componentCls,
    // .ant-layout
    colorText,
    colorTextLightSolid,
    colorBgHeader,
    colorBgBody,
    colorBgTrigger,
    layoutHeaderHeight,
    layoutHeaderPaddingInline,
    layoutHeaderColor,
    layoutFooterPadding,
    layoutTriggerHeight,
    layoutZeroTriggerSize,
    motionDurationMid,
    motionDurationSlow,
    fontSize,
    borderRadius
  } = token;
  return {
    [componentCls]: _extends(_extends({
      display: "flex",
      flex: "auto",
      flexDirection: "column",
      color: colorText,
      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: colorBgBody,
      "&, *": {
        boxSizing: "border-box"
      },
      [`&${componentCls}-has-sider`]: {
        flexDirection: "row",
        [`> ${componentCls}, > ${componentCls}-content`]: {
          // https://segmentfault.com/a/1190000019498300
          width: 0
        }
      },
      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: "0 0 auto"
      },
      [`${componentCls}-header`]: {
        height: layoutHeaderHeight,
        paddingInline: layoutHeaderPaddingInline,
        color: layoutHeaderColor,
        lineHeight: `${layoutHeaderHeight}px`,
        background: colorBgHeader,
        // Other components/menu/style/index.less line:686
        // Integration with header element so menu items have the same height
        [`${antCls}-menu`]: {
          lineHeight: "inherit"
        }
      },
      [`${componentCls}-footer`]: {
        padding: layoutFooterPadding,
        color: colorText,
        fontSize,
        background: colorBgBody
      },
      [`${componentCls}-content`]: {
        flex: "auto",
        // fix firefox can't set height smaller than content on flex item
        minHeight: 0
      },
      [`${componentCls}-sider`]: {
        position: "relative",
        // fix firefox can't set width smaller than content on flex item
        minWidth: 0,
        background: colorBgHeader,
        transition: `all ${motionDurationMid}, background 0s`,
        "&-children": {
          height: "100%",
          // Hack for fixing margin collapse bug
          // https://github.com/ant-design/ant-design/issues/7967
          // solution from https://stackoverflow.com/a/33132624/3040605
          marginTop: -0.1,
          paddingTop: 0.1,
          [`${antCls}-menu${antCls}-menu-inline-collapsed`]: {
            width: "auto"
          }
        },
        "&-has-trigger": {
          paddingBottom: layoutTriggerHeight
        },
        "&-right": {
          order: 1
        },
        "&-trigger": {
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          height: layoutTriggerHeight,
          color: colorTextLightSolid,
          lineHeight: `${layoutTriggerHeight}px`,
          textAlign: "center",
          background: colorBgTrigger,
          cursor: "pointer",
          transition: `all ${motionDurationMid}`
        },
        "&-zero-width": {
          "> *": {
            overflow: "hidden"
          },
          "&-trigger": {
            position: "absolute",
            top: layoutHeaderHeight,
            insetInlineEnd: -layoutZeroTriggerSize,
            zIndex: 1,
            width: layoutZeroTriggerSize,
            height: layoutZeroTriggerSize,
            color: colorTextLightSolid,
            fontSize: token.fontSizeXL,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colorBgHeader,
            borderStartStartRadius: 0,
            borderStartEndRadius: borderRadius,
            borderEndEndRadius: borderRadius,
            borderEndStartRadius: 0,
            cursor: "pointer",
            transition: `background ${motionDurationSlow} ease`,
            "&::after": {
              position: "absolute",
              inset: 0,
              background: "transparent",
              transition: `all ${motionDurationSlow}`,
              content: '""'
            },
            "&:hover::after": {
              // FIXME: Hardcode, but seems no need to create a token for this
              background: `rgba(255, 255, 255, 0.2)`
            },
            "&-right": {
              insetInlineStart: -layoutZeroTriggerSize,
              borderStartStartRadius: borderRadius,
              borderStartEndRadius: 0,
              borderEndEndRadius: 0,
              borderEndStartRadius: borderRadius
            }
          }
        }
      }
    }, genLayoutLightStyle(token)), {
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    })
  };
};
const useStyle$2 = genComponentStyleHook("Layout", (token) => {
  const {
    colorText,
    controlHeightSM,
    controlHeight,
    controlHeightLG,
    marginXXS
  } = token;
  const layoutHeaderPaddingInline = controlHeightLG * 1.25;
  const layoutToken = merge(token, {
    // Layout
    layoutHeaderHeight: controlHeight * 2,
    layoutHeaderPaddingInline,
    layoutHeaderColor: colorText,
    layoutFooterPadding: `${controlHeightSM}px ${layoutHeaderPaddingInline}px`,
    layoutTriggerHeight: controlHeightLG + marginXXS * 2,
    layoutZeroTriggerSize: controlHeightLG
  });
  return [genLayoutStyle(layoutToken)];
}, (token) => {
  const {
    colorBgLayout
  } = token;
  return {
    colorBgHeader: "#001529",
    colorBgBody: colorBgLayout,
    colorBgTrigger: "#002140"
  };
});
const basicProps = () => ({
  prefixCls: String,
  hasSider: {
    type: Boolean,
    default: void 0
  },
  tagName: String
});
function generator(_ref) {
  let {
    suffixCls,
    tagName,
    name
  } = _ref;
  return (BasicComponent) => {
    const Adapter = defineComponent({
      compatConfig: {
        MODE: 3
      },
      name,
      props: basicProps(),
      setup(props, _ref2) {
        let {
          slots
        } = _ref2;
        const {
          prefixCls
        } = useConfigInject(suffixCls, props);
        return () => {
          const basicComponentProps = _extends(_extends({}, props), {
            prefixCls: prefixCls.value,
            tagName
          });
          return createVNode(BasicComponent, basicComponentProps, slots);
        };
      }
    });
    return Adapter;
  };
}
const Basic = defineComponent({
  compatConfig: {
    MODE: 3
  },
  props: basicProps(),
  setup(props, _ref3) {
    let {
      slots
    } = _ref3;
    return () => createVNode(props.tagName, {
      class: props.prefixCls
    }, slots);
  }
});
const BasicLayout = defineComponent({
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: basicProps(),
  setup(props, _ref4) {
    let {
      slots,
      attrs
    } = _ref4;
    const {
      prefixCls,
      direction
    } = useConfigInject("", props);
    const [wrapSSR, hashId] = useStyle$2(prefixCls);
    const siders = ref([]);
    const siderHookProvider = {
      addSider: (id) => {
        siders.value = [...siders.value, id];
      },
      removeSider: (id) => {
        siders.value = siders.value.filter((currentId) => currentId !== id);
      }
    };
    provide(SiderHookProviderKey, siderHookProvider);
    const divCls = computed(() => {
      const {
        prefixCls: prefixCls2,
        hasSider
      } = props;
      return {
        [hashId.value]: true,
        [`${prefixCls2}`]: true,
        [`${prefixCls2}-has-sider`]: typeof hasSider === "boolean" ? hasSider : siders.value.length > 0,
        [`${prefixCls2}-rtl`]: direction.value === "rtl"
      };
    });
    return () => {
      const {
        tagName
      } = props;
      return wrapSSR(createVNode(tagName, _extends(_extends({}, attrs), {
        class: [divCls.value, attrs.class]
      }), slots));
    };
  }
});
const Layout$1 = generator({
  suffixCls: "layout",
  tagName: "section",
  name: "ALayout"
})(BasicLayout);
const Header = generator({
  suffixCls: "layout-header",
  tagName: "header",
  name: "ALayoutHeader"
})(Basic);
const Footer = generator({
  suffixCls: "layout-footer",
  tagName: "footer",
  name: "ALayoutFooter"
})(Basic);
const Content = generator({
  suffixCls: "layout-content",
  tagName: "main",
  name: "ALayoutContent"
})(Basic);
const dimensionMaxMap = {
  xs: "479.98px",
  sm: "575.98px",
  md: "767.98px",
  lg: "991.98px",
  xl: "1199.98px",
  xxl: "1599.98px",
  xxxl: "1999.98px"
};
const siderProps = () => ({
  prefixCls: String,
  collapsible: {
    type: Boolean,
    default: void 0
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  defaultCollapsed: {
    type: Boolean,
    default: void 0
  },
  reverseArrow: {
    type: Boolean,
    default: void 0
  },
  zeroWidthTriggerStyle: {
    type: Object,
    default: void 0
  },
  trigger: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  breakpoint: PropTypes.oneOf(tuple$1("xs", "sm", "md", "lg", "xl", "xxl", "xxxl")),
  theme: PropTypes.oneOf(tuple$1("light", "dark")).def("dark"),
  onBreakpoint: Function,
  onCollapse: Function
});
const generateId = /* @__PURE__ */ (() => {
  let i = 0;
  return function() {
    let prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    i += 1;
    return `${prefix}${i}`;
  };
})();
const Sider = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ALayoutSider",
  inheritAttrs: false,
  props: initDefaultProps(siderProps(), {
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80
  }),
  emits: ["breakpoint", "update:collapsed", "collapse"],
  setup(props, _ref) {
    let {
      emit,
      attrs,
      slots
    } = _ref;
    const {
      prefixCls
    } = useConfigInject("layout-sider", props);
    const siderHook = inject(SiderHookProviderKey, void 0);
    const collapsed = shallowRef(!!(props.collapsed !== void 0 ? props.collapsed : props.defaultCollapsed));
    const below = shallowRef(false);
    watch(() => props.collapsed, () => {
      collapsed.value = !!props.collapsed;
    });
    provide(SiderCollapsedKey, collapsed);
    const handleSetCollapsed = (value, type) => {
      if (props.collapsed === void 0) {
        collapsed.value = value;
      }
      emit("update:collapsed", value);
      emit("collapse", value, type);
    };
    const responsiveHandlerRef = shallowRef((mql2) => {
      below.value = mql2.matches;
      emit("breakpoint", mql2.matches);
      if (collapsed.value !== mql2.matches) {
        handleSetCollapsed(mql2.matches, "responsive");
      }
    });
    let mql;
    function responsiveHandler(mql2) {
      return responsiveHandlerRef.value(mql2);
    }
    const uniqueId = generateId("ant-sider-");
    siderHook && siderHook.addSider(uniqueId);
    onMounted(() => {
      watch(() => props.breakpoint, () => {
        try {
          mql === null || mql === void 0 ? void 0 : mql.removeEventListener("change", responsiveHandler);
        } catch (error) {
          mql === null || mql === void 0 ? void 0 : mql.removeListener(responsiveHandler);
        }
        if (typeof window !== "undefined") {
          const {
            matchMedia
          } = window;
          if (matchMedia && props.breakpoint && props.breakpoint in dimensionMaxMap) {
            mql = matchMedia(`(max-width: ${dimensionMaxMap[props.breakpoint]})`);
            try {
              mql.addEventListener("change", responsiveHandler);
            } catch (error) {
              mql.addListener(responsiveHandler);
            }
            responsiveHandler(mql);
          }
        }
      }, {
        immediate: true
      });
    });
    onBeforeUnmount(() => {
      try {
        mql === null || mql === void 0 ? void 0 : mql.removeEventListener("change", responsiveHandler);
      } catch (error) {
        mql === null || mql === void 0 ? void 0 : mql.removeListener(responsiveHandler);
      }
      siderHook && siderHook.removeSider(uniqueId);
    });
    const toggle = () => {
      handleSetCollapsed(!collapsed.value, "clickTrigger");
    };
    return () => {
      var _a2, _b;
      const pre = prefixCls.value;
      const {
        collapsedWidth,
        width,
        reverseArrow,
        zeroWidthTriggerStyle,
        trigger = (_a2 = slots.trigger) === null || _a2 === void 0 ? void 0 : _a2.call(slots),
        collapsible,
        theme
      } = props;
      const rawWidth = collapsed.value ? collapsedWidth : width;
      const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
      const zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? createVNode("span", {
        "onClick": toggle,
        "class": classNames(`${pre}-zero-width-trigger`, `${pre}-zero-width-trigger-${reverseArrow ? "right" : "left"}`),
        "style": zeroWidthTriggerStyle
      }, [trigger || createVNode(BarsOutlined, null, null)]) : null;
      const iconObj = {
        expanded: reverseArrow ? createVNode(RightOutlined, null, null) : createVNode(LeftOutlined, null, null),
        collapsed: reverseArrow ? createVNode(LeftOutlined, null, null) : createVNode(RightOutlined, null, null)
      };
      const status = collapsed.value ? "collapsed" : "expanded";
      const defaultTrigger = iconObj[status];
      const triggerDom = trigger !== null ? zeroWidthTrigger || createVNode("div", {
        "class": `${pre}-trigger`,
        "onClick": toggle,
        "style": {
          width: siderWidth
        }
      }, [trigger || defaultTrigger]) : null;
      const divStyle = [attrs.style, {
        flex: `0 0 ${siderWidth}`,
        maxWidth: siderWidth,
        minWidth: siderWidth,
        width: siderWidth
      }];
      const siderCls = classNames(pre, `${pre}-${theme}`, {
        [`${pre}-collapsed`]: !!collapsed.value,
        [`${pre}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
        [`${pre}-below`]: !!below.value,
        [`${pre}-zero-width`]: parseFloat(siderWidth) === 0
      }, attrs.class);
      return createVNode("aside", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": siderCls,
        "style": divStyle
      }), [createVNode("div", {
        "class": `${pre}-children`
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), collapsible || below.value && zeroWidthTrigger ? triggerDom : null]);
    };
  }
});
const Layout = _extends(Layout$1, {
  Header,
  Footer,
  Content,
  Sider,
  install: (app) => {
    app.component(Layout$1.name, Layout$1);
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
    app.component(Sider.name, Sider);
    app.component(Content.name, Content);
    return app;
  }
});
const Pagination = {
  // Options.jsx
  items_per_page: "条/页",
  jump_to: "跳至",
  jump_to_confirm: "确定",
  page: "页",
  // Pagination.jsx
  prev_page: "上一页",
  next_page: "下一页",
  prev_5: "向前 5 页",
  next_5: "向后 5 页",
  prev_3: "向前 3 页",
  next_3: "向后 3 页"
};
const StatisticNumber = (props) => {
  const {
    value,
    formatter,
    precision,
    decimalSeparator,
    groupSeparator = "",
    prefixCls
  } = props;
  let valueNode;
  if (typeof formatter === "function") {
    valueNode = formatter({
      value
    });
  } else {
    const val = String(value);
    const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);
    if (!cells) {
      valueNode = val;
    } else {
      const negative = cells[1];
      let int = cells[2] || "0";
      let decimal = cells[4] || "";
      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
      if (typeof precision === "number") {
        decimal = decimal.padEnd(precision, "0").slice(0, precision > 0 ? precision : 0);
      }
      if (decimal) {
        decimal = `${decimalSeparator}${decimal}`;
      }
      valueNode = [createVNode("span", {
        "key": "int",
        "class": `${prefixCls}-content-value-int`
      }, [negative, int]), decimal && createVNode("span", {
        "key": "decimal",
        "class": `${prefixCls}-content-value-decimal`
      }, [decimal])];
    }
  }
  return createVNode("span", {
    "class": `${prefixCls}-content-value`
  }, [valueNode]);
};
StatisticNumber.displayName = "StatisticNumber";
const genStatisticStyle = (token) => {
  const {
    componentCls,
    marginXXS,
    padding,
    colorTextDescription,
    statisticTitleFontSize,
    colorTextHeading,
    statisticContentFontSize,
    statisticFontFamily
  } = token;
  return {
    [`${componentCls}`]: _extends(_extends({}, resetComponent(token)), {
      [`${componentCls}-title`]: {
        marginBottom: marginXXS,
        color: colorTextDescription,
        fontSize: statisticTitleFontSize
      },
      [`${componentCls}-skeleton`]: {
        paddingTop: padding
      },
      [`${componentCls}-content`]: {
        color: colorTextHeading,
        fontSize: statisticContentFontSize,
        fontFamily: statisticFontFamily,
        [`${componentCls}-content-value`]: {
          display: "inline-block",
          direction: "ltr"
        },
        [`${componentCls}-content-prefix, ${componentCls}-content-suffix`]: {
          display: "inline-block"
        },
        [`${componentCls}-content-prefix`]: {
          marginInlineEnd: marginXXS
        },
        [`${componentCls}-content-suffix`]: {
          marginInlineStart: marginXXS
        }
      }
    })
  };
};
const useStyle$1 = genComponentStyleHook("Statistic", (token) => {
  const {
    fontSizeHeading3,
    fontSize,
    fontFamily
  } = token;
  const statisticToken2 = merge(token, {
    statisticTitleFontSize: fontSize,
    statisticContentFontSize: fontSizeHeading3,
    statisticFontFamily: fontFamily
  });
  return [genStatisticStyle(statisticToken2)];
});
const statisticProps = () => ({
  prefixCls: String,
  decimalSeparator: String,
  groupSeparator: String,
  format: String,
  value: someType([Number, String, Object]),
  valueStyle: {
    type: Object,
    default: void 0
  },
  valueRender: functionType(),
  formatter: anyType(),
  precision: Number,
  prefix: vNodeType(),
  suffix: vNodeType(),
  title: vNodeType(),
  loading: booleanType()
});
const Statistic = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AStatistic",
  inheritAttrs: false,
  props: initDefaultProps(statisticProps(), {
    decimalSeparator: ".",
    groupSeparator: ",",
    loading: false
  }),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("statistic", props);
    const [wrapSSR, hashId] = useStyle$1(prefixCls);
    return () => {
      var _a2, _b, _c, _d, _e, _f, _g;
      const {
        value = 0,
        valueStyle,
        valueRender
      } = props;
      const pre = prefixCls.value;
      const title = (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots);
      const prefix = (_c = props.prefix) !== null && _c !== void 0 ? _c : (_d = slots.prefix) === null || _d === void 0 ? void 0 : _d.call(slots);
      const suffix = (_e = props.suffix) !== null && _e !== void 0 ? _e : (_f = slots.suffix) === null || _f === void 0 ? void 0 : _f.call(slots);
      const formatter = (_g = props.formatter) !== null && _g !== void 0 ? _g : slots.formatter;
      let valueNode = createVNode(StatisticNumber, _objectSpread2({
        "data-for-update": Date.now()
      }, _extends(_extends({}, props), {
        prefixCls: pre,
        value,
        formatter
      })), null);
      if (valueRender) {
        valueNode = valueRender(valueNode);
      }
      return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": [pre, {
          [`${pre}-rtl`]: direction.value === "rtl"
        }, attrs.class, hashId.value]
      }), [title && createVNode("div", {
        "class": `${pre}-title`
      }, [title]), createVNode(Skeleton, {
        "paragraph": false,
        "loading": props.loading
      }, {
        default: () => [createVNode("div", {
          "style": valueStyle,
          "class": `${pre}-content`
        }, [prefix && createVNode("span", {
          "class": `${pre}-content-prefix`
        }, [prefix]), valueNode, suffix && createVNode("span", {
          "class": `${pre}-content-suffix`
        }, [suffix])])]
      })]));
    };
  }
});
const timeUnits = [
  ["Y", 1e3 * 60 * 60 * 24 * 365],
  ["M", 1e3 * 60 * 60 * 24 * 30],
  ["D", 1e3 * 60 * 60 * 24],
  ["H", 1e3 * 60 * 60],
  ["m", 1e3 * 60],
  ["s", 1e3],
  ["S", 1]
  // million seconds
];
function formatTimeStr(duration, format) {
  let leftDuration = duration;
  const escapeRegex = /\[[^\]]*]/g;
  const keepList = (format.match(escapeRegex) || []).map((str) => str.slice(1, -1));
  const templateText = format.replace(escapeRegex, "[]");
  const replacedText = timeUnits.reduce((current, _ref) => {
    let [name, unit] = _ref;
    if (current.includes(name)) {
      const value = Math.floor(leftDuration / unit);
      leftDuration -= value * unit;
      return current.replace(new RegExp(`${name}+`, "g"), (match) => {
        const len = match.length;
        return value.toString().padStart(len, "0");
      });
    }
    return current;
  }, templateText);
  let index2 = 0;
  return replacedText.replace(escapeRegex, () => {
    const match = keepList[index2];
    index2 += 1;
    return match;
  });
}
function formatCountdown(value, config) {
  const {
    format = ""
  } = config;
  const target = new Date(value).getTime();
  const current = Date.now();
  const diff = Math.max(target - current, 0);
  return formatTimeStr(diff, format);
}
const REFRESH_INTERVAL = 1e3 / 30;
function getTime(value) {
  return new Date(value).getTime();
}
const countdownProps = () => {
  return _extends(_extends({}, statisticProps()), {
    value: someType([Number, String, Object]),
    format: String,
    onFinish: Function,
    onChange: Function
  });
};
const Countdown = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AStatisticCountdown",
  props: initDefaultProps(countdownProps(), {
    format: "HH:mm:ss"
  }),
  // emits: ['finish', 'change'],
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const countdownId = ref();
    const statistic = ref();
    const syncTimer = () => {
      const {
        value
      } = props;
      const timestamp = getTime(value);
      if (timestamp >= Date.now()) {
        startTimer();
      } else {
        stopTimer();
      }
    };
    const startTimer = () => {
      if (countdownId.value) return;
      const timestamp = getTime(props.value);
      countdownId.value = setInterval(() => {
        statistic.value.$forceUpdate();
        if (timestamp > Date.now()) {
          emit("change", timestamp - Date.now());
        }
        syncTimer();
      }, REFRESH_INTERVAL);
    };
    const stopTimer = () => {
      const {
        value
      } = props;
      if (countdownId.value) {
        clearInterval(countdownId.value);
        countdownId.value = void 0;
        const timestamp = getTime(value);
        if (timestamp < Date.now()) {
          emit("finish");
        }
      }
    };
    const formatCountdown$1 = (_ref2) => {
      let {
        value,
        config
      } = _ref2;
      const {
        format
      } = props;
      return formatCountdown(value, _extends(_extends({}, config), {
        format
      }));
    };
    const valueRenderHtml = (node) => node;
    onMounted(() => {
      syncTimer();
    });
    onUpdated(() => {
      syncTimer();
    });
    onBeforeUnmount(() => {
      stopTimer();
    });
    return () => {
      const value = props.value;
      return createVNode(Statistic, _objectSpread2({
        "ref": statistic
      }, _extends(_extends({}, omit(props, ["onFinish", "onChange"])), {
        value,
        valueRender: valueRenderHtml,
        formatter: formatCountdown$1
      })), slots);
    };
  }
});
Statistic.Countdown = Countdown;
Statistic.install = function(app) {
  app.component(Statistic.name, Statistic);
  app.component(Statistic.Countdown.name, Statistic.Countdown);
  return app;
};
Statistic.Countdown;
const progressStatuses = ["normal", "exception", "active", "success"];
const progressProps = () => ({
  prefixCls: String,
  type: stringType(),
  percent: Number,
  format: functionType(),
  status: stringType(),
  showInfo: booleanType(),
  strokeWidth: Number,
  strokeLinecap: stringType(),
  strokeColor: anyType(),
  trailColor: String,
  /** @deprecated Use `size` instead */
  width: Number,
  success: objectType(),
  gapDegree: Number,
  gapPosition: stringType(),
  size: someType([String, Number, Array]),
  steps: Number,
  /** @deprecated Use `success` instead */
  successPercent: Number,
  title: String,
  progressStatus: stringType()
});
function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}
function getSuccessPercent(_ref) {
  let {
    success,
    successPercent
  } = _ref;
  let percent = successPercent;
  if (success && "progress" in success) {
    devWarning(false, "Progress", "`success.progress` is deprecated. Please use `success.percent` instead.");
    percent = success.progress;
  }
  if (success && "percent" in success) {
    percent = success.percent;
  }
  return percent;
}
function getPercentage(_ref2) {
  let {
    percent,
    success,
    successPercent
  } = _ref2;
  const realSuccessPercent = validProgress(getSuccessPercent({
    success,
    successPercent
  }));
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
}
function getStrokeColor(_ref3) {
  let {
    success = {},
    strokeColor
  } = _ref3;
  const {
    strokeColor: successColor
  } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null];
}
const getSize = (size, type, extra) => {
  var _a2, _b, _c, _d;
  let width = -1;
  let height = -1;
  if (type === "step") {
    const steps = extra.steps;
    const strokeWidth = extra.strokeWidth;
    if (typeof size === "string" || typeof size === "undefined") {
      width = size === "small" ? 2 : 14;
      height = strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : 8;
    } else if (typeof size === "number") {
      [width, height] = [size, size];
    } else {
      [width = 14, height = 8] = size;
    }
    width *= steps;
  } else if (type === "line") {
    const strokeWidth = extra === null || extra === void 0 ? void 0 : extra.strokeWidth;
    if (typeof size === "string" || typeof size === "undefined") {
      height = strokeWidth || (size === "small" ? 6 : 8);
    } else if (typeof size === "number") {
      [width, height] = [size, size];
    } else {
      [width = -1, height = 8] = size;
    }
  } else if (type === "circle" || type === "dashboard") {
    if (typeof size === "string" || typeof size === "undefined") {
      [width, height] = size === "small" ? [60, 60] : [120, 120];
    } else if (typeof size === "number") {
      [width, height] = [size, size];
    } else {
      width = (_b = (_a2 = size[0]) !== null && _a2 !== void 0 ? _a2 : size[1]) !== null && _b !== void 0 ? _b : 120;
      height = (_d = (_c = size[0]) !== null && _c !== void 0 ? _c : size[1]) !== null && _d !== void 0 ? _d : 120;
    }
  }
  return {
    width,
    height
  };
};
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const lineProps = () => _extends(_extends({}, progressProps()), {
  strokeColor: anyType(),
  direction: stringType()
});
const sortGradient = (gradients) => {
  let tempArr = [];
  Object.keys(gradients).forEach((key2) => {
    const formattedKey = parseFloat(key2.replace(/%/g, ""));
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key2]
      });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map((_ref) => {
    let {
      key: key2,
      value
    } = _ref;
    return `${value} ${key2}%`;
  }).join(", ");
};
const handleGradient = (strokeColor, directionConfig) => {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction = directionConfig === "rtl" ? "to left" : "to right"
  } = strokeColor, rest = __rest$3(strokeColor, ["from", "to", "direction"]);
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest);
    return {
      backgroundImage: `linear-gradient(${direction}, ${sortedGradients})`
    };
  }
  return {
    backgroundImage: `linear-gradient(${direction}, ${from}, ${to})`
  };
};
const Line = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ProgressLine",
  inheritAttrs: false,
  props: lineProps(),
  setup(props, _ref2) {
    let {
      slots,
      attrs
    } = _ref2;
    const backgroundProps = computed(() => {
      const {
        strokeColor,
        direction
      } = props;
      return strokeColor && typeof strokeColor !== "string" ? handleGradient(strokeColor, direction) : {
        backgroundColor: strokeColor
      };
    });
    const borderRadius = computed(() => props.strokeLinecap === "square" || props.strokeLinecap === "butt" ? 0 : void 0);
    const trailStyle = computed(() => props.trailColor ? {
      backgroundColor: props.trailColor
    } : void 0);
    const mergedSize = computed(() => {
      var _a2;
      return (_a2 = props.size) !== null && _a2 !== void 0 ? _a2 : [-1, props.strokeWidth || (props.size === "small" ? 6 : 8)];
    });
    const sizeRef = computed(() => getSize(mergedSize.value, "line", {
      strokeWidth: props.strokeWidth
    }));
    const percentStyle = computed(() => {
      const {
        percent
      } = props;
      return _extends({
        width: `${validProgress(percent)}%`,
        height: `${sizeRef.value.height}px`,
        borderRadius: borderRadius.value
      }, backgroundProps.value);
    });
    const successPercent = computed(() => {
      return getSuccessPercent(props);
    });
    const successPercentStyle = computed(() => {
      const {
        success
      } = props;
      return {
        width: `${validProgress(successPercent.value)}%`,
        height: `${sizeRef.value.height}px`,
        borderRadius: borderRadius.value,
        backgroundColor: success === null || success === void 0 ? void 0 : success.strokeColor
      };
    });
    const outerStyle = {
      width: sizeRef.value.width < 0 ? "100%" : sizeRef.value.width,
      height: `${sizeRef.value.height}px`
    };
    return () => {
      var _a2;
      return createVNode(Fragment, null, [createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": [`${props.prefixCls}-outer`, attrs.class],
        "style": [attrs.style, outerStyle]
      }), [createVNode("div", {
        "class": `${props.prefixCls}-inner`,
        "style": trailStyle.value
      }, [createVNode("div", {
        "class": `${props.prefixCls}-bg`,
        "style": percentStyle.value
      }, null), successPercent.value !== void 0 ? createVNode("div", {
        "class": `${props.prefixCls}-success-bg`,
        "style": successPercentStyle.value
      }, null) : null])]), (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
    };
  }
});
const defaultProps = {
  percent: 0,
  prefixCls: "vc-progress",
  strokeColor: "#2db7f5",
  strokeLinecap: "round",
  strokeWidth: 1,
  trailColor: "#D9D9D9",
  trailWidth: 1
};
const useTransitionDuration = (paths) => {
  const prevTimeStamp = ref(null);
  onUpdated(() => {
    const now2 = Date.now();
    let updated = false;
    paths.value.forEach((val) => {
      const path = (val === null || val === void 0 ? void 0 : val.$el) || val;
      if (!path) {
        return;
      }
      updated = true;
      const pathStyle = path.style;
      pathStyle.transitionDuration = ".3s, .3s, .3s, .06s";
      if (prevTimeStamp.value && now2 - prevTimeStamp.value < 100) {
        pathStyle.transitionDuration = "0s, 0s";
      }
    });
    if (updated) {
      prevTimeStamp.value = Date.now();
    }
  });
  return paths;
};
const propTypes = {
  gapDegree: Number,
  gapPosition: {
    type: String
  },
  percent: {
    type: [Array, Number]
  },
  prefixCls: String,
  strokeColor: {
    type: [Object, String, Array]
  },
  strokeLinecap: {
    type: String
  },
  strokeWidth: Number,
  trailColor: String,
  trailWidth: Number,
  transition: String
};
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ProgressLine",
  props: initDefaultProps(propTypes, defaultProps),
  setup(props) {
    const percentList = computed(() => {
      const {
        percent
      } = props;
      return Array.isArray(percent) ? percent : [percent];
    });
    const percentListProps = computed(() => {
      const {
        prefixCls,
        strokeLinecap,
        strokeWidth,
        transition
      } = props;
      let stackPtg = 0;
      return percentList.value.map((ptg, index2) => {
        let dashPercent = 1;
        switch (strokeLinecap) {
          case "round":
            dashPercent = 1 - strokeWidth / 100;
            break;
          case "square":
            dashPercent = 1 - strokeWidth / 2 / 100;
            break;
          default:
            dashPercent = 1;
            break;
        }
        const pathStyle = {
          strokeDasharray: `${ptg * dashPercent}px, 100px`,
          strokeDashoffset: `-${stackPtg}px`,
          transition: transition || "stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear"
        };
        const color = strokeColorList.value[index2] || strokeColorList.value[strokeColorList.value.length - 1];
        stackPtg += ptg;
        const pathProps = {
          key: index2,
          d: pathString.value,
          "stroke-linecap": strokeLinecap,
          stroke: color,
          "stroke-width": strokeWidth,
          "fill-opacity": "0",
          class: `${prefixCls}-line-path`,
          style: pathStyle
        };
        return pathProps;
      });
    });
    const strokeColorList = computed(() => {
      const {
        strokeColor
      } = props;
      return Array.isArray(strokeColor) ? strokeColor : [strokeColor];
    });
    const [setRef, paths] = useRefs();
    useTransitionDuration(paths);
    const center = computed(() => props.strokeWidth / 2);
    const right = computed(() => 100 - props.strokeWidth / 2);
    const pathString = computed(() => `M ${props.strokeLinecap === "round" ? center.value : 0},${center.value}
    L ${props.strokeLinecap === "round" ? right.value : 100},${center.value}`);
    const viewBoxString = computed(() => `0 0 100 ${props.strokeWidth}`);
    const pathFirst = computed(() => ({
      d: pathString.value,
      "stroke-linecap": props.strokeLinecap,
      stroke: props.trailColor,
      "stroke-width": props.trailWidth || props.strokeWidth,
      "fill-opacity": "0",
      class: `${props.prefixCls}-line-trail`
    }));
    return () => {
      const {
        percent,
        prefixCls,
        strokeColor,
        strokeLinecap,
        strokeWidth,
        trailColor,
        trailWidth,
        transition
      } = props, restProps = __rest$2(props, ["percent", "prefixCls", "strokeColor", "strokeLinecap", "strokeWidth", "trailColor", "trailWidth", "transition"]);
      delete restProps.gapPosition;
      return createVNode("svg", _objectSpread2({
        "class": `${prefixCls}-line`,
        "viewBox": viewBoxString.value,
        "preserveAspectRatio": "none"
      }, restProps), [createVNode("path", pathFirst.value, null), percentListProps.value.map((pathProps, index2) => {
        return createVNode("path", _objectSpread2({
          "ref": setRef(index2)
        }, pathProps), null);
      })]);
    };
  }
});
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let gradientSeed = 0;
function stripPercentToNumber(percent) {
  return +percent.replace("%", "");
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function getPathStyles(offset, percent, strokeColor, strokeWidth) {
  let gapDegree = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  let gapPosition = arguments.length > 5 ? arguments[5] : void 0;
  const radius = 50 - strokeWidth / 2;
  let beginPositionX = 0;
  let beginPositionY = -radius;
  let endPositionX = 0;
  let endPositionY = -2 * radius;
  switch (gapPosition) {
    case "left":
      beginPositionX = -radius;
      beginPositionY = 0;
      endPositionX = 2 * radius;
      endPositionY = 0;
      break;
    case "right":
      beginPositionX = radius;
      beginPositionY = 0;
      endPositionX = -2 * radius;
      endPositionY = 0;
      break;
    case "bottom":
      beginPositionY = radius;
      endPositionY = 2 * radius;
      break;
  }
  const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
   a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
   a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
  const len = Math.PI * 2 * radius;
  const pathStyle = {
    stroke: strokeColor,
    strokeDasharray: `${percent / 100 * (len - gapDegree)}px ${len}px`,
    strokeDashoffset: `-${gapDegree / 2 + offset / 100 * (len - gapDegree)}px`,
    transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s"
    // eslint-disable-line
  };
  return {
    pathString,
    pathStyle
  };
}
const VCCircle = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "VCCircle",
  props: initDefaultProps(propTypes, defaultProps),
  setup(props) {
    gradientSeed += 1;
    const gradientId = ref(gradientSeed);
    const percentList = computed(() => toArray(props.percent));
    const strokeColorList = computed(() => toArray(props.strokeColor));
    const [setRef, paths] = useRefs();
    useTransitionDuration(paths);
    const getStokeList = () => {
      const {
        prefixCls,
        strokeWidth,
        strokeLinecap,
        gapDegree,
        gapPosition
      } = props;
      let stackPtg = 0;
      return percentList.value.map((ptg, index2) => {
        const color = strokeColorList.value[index2] || strokeColorList.value[strokeColorList.value.length - 1];
        const stroke = Object.prototype.toString.call(color) === "[object Object]" ? `url(#${prefixCls}-gradient-${gradientId.value})` : "";
        const {
          pathString,
          pathStyle
        } = getPathStyles(stackPtg, ptg, color, strokeWidth, gapDegree, gapPosition);
        stackPtg += ptg;
        const pathProps = {
          key: index2,
          d: pathString,
          stroke,
          "stroke-linecap": strokeLinecap,
          "stroke-width": strokeWidth,
          opacity: ptg === 0 ? 0 : 1,
          "fill-opacity": "0",
          class: `${prefixCls}-circle-path`,
          style: pathStyle
        };
        return createVNode("path", _objectSpread2({
          "ref": setRef(index2)
        }, pathProps), null);
      });
    };
    return () => {
      const {
        prefixCls,
        strokeWidth,
        trailWidth,
        gapDegree,
        gapPosition,
        trailColor,
        strokeLinecap,
        strokeColor
      } = props, restProps = __rest$1(props, ["prefixCls", "strokeWidth", "trailWidth", "gapDegree", "gapPosition", "trailColor", "strokeLinecap", "strokeColor"]);
      const {
        pathString,
        pathStyle
      } = getPathStyles(0, 100, trailColor, strokeWidth, gapDegree, gapPosition);
      delete restProps.percent;
      const gradient = strokeColorList.value.find((color) => Object.prototype.toString.call(color) === "[object Object]");
      const pathFirst = {
        d: pathString,
        stroke: trailColor,
        "stroke-linecap": strokeLinecap,
        "stroke-width": trailWidth || strokeWidth,
        "fill-opacity": "0",
        class: `${prefixCls}-circle-trail`,
        style: pathStyle
      };
      return createVNode("svg", _objectSpread2({
        "class": `${prefixCls}-circle`,
        "viewBox": "0 0 100 100"
      }, restProps), [gradient && createVNode("defs", null, [createVNode("linearGradient", {
        "id": `${prefixCls}-gradient-${gradientId.value}`,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Object.keys(gradient).sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b)).map((key2, index2) => createVNode("stop", {
        "key": index2,
        "offset": key2,
        "stop-color": gradient[key2]
      }, null))])]), createVNode("path", pathFirst, null), getStokeList().reverse()]);
    };
  }
});
const circleProps = () => _extends(_extends({}, progressProps()), {
  strokeColor: anyType()
});
const CIRCLE_MIN_STROKE_WIDTH = 3;
const getMinPercent = (width) => CIRCLE_MIN_STROKE_WIDTH / width * 100;
const Circle = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ProgressCircle",
  inheritAttrs: false,
  props: initDefaultProps(circleProps(), {
    trailColor: null
  }),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const originWidth = computed(() => {
      var _a2;
      return (_a2 = props.width) !== null && _a2 !== void 0 ? _a2 : 120;
    });
    const mergedSize = computed(() => {
      var _a2;
      return (_a2 = props.size) !== null && _a2 !== void 0 ? _a2 : [originWidth.value, originWidth.value];
    });
    const sizeRef = computed(() => getSize(mergedSize.value, "circle"));
    const gapDeg = computed(() => {
      if (props.gapDegree || props.gapDegree === 0) {
        return props.gapDegree;
      }
      if (props.type === "dashboard") {
        return 75;
      }
      return void 0;
    });
    const circleStyle = computed(() => {
      return {
        width: `${sizeRef.value.width}px`,
        height: `${sizeRef.value.height}px`,
        fontSize: `${sizeRef.value.width * 0.15 + 6}px`
      };
    });
    const circleWidth = computed(() => {
      var _a2;
      return (_a2 = props.strokeWidth) !== null && _a2 !== void 0 ? _a2 : Math.max(getMinPercent(sizeRef.value.width), 6);
    });
    const gapPos = computed(() => props.gapPosition || props.type === "dashboard" && "bottom" || void 0);
    const percent = computed(() => getPercentage(props));
    const isGradient = computed(() => Object.prototype.toString.call(props.strokeColor) === "[object Object]");
    const strokeColor = computed(() => getStrokeColor({
      success: props.success,
      strokeColor: props.strokeColor
    }));
    const wrapperClassName = computed(() => ({
      [`${props.prefixCls}-inner`]: true,
      [`${props.prefixCls}-circle-gradient`]: isGradient.value
    }));
    return () => {
      var _a2;
      const circleContent = createVNode(VCCircle, {
        "percent": percent.value,
        "strokeWidth": circleWidth.value,
        "trailWidth": circleWidth.value,
        "strokeColor": strokeColor.value,
        "strokeLinecap": props.strokeLinecap,
        "trailColor": props.trailColor,
        "prefixCls": props.prefixCls,
        "gapDegree": gapDeg.value,
        "gapPosition": gapPos.value
      }, null);
      return createVNode("div", _objectSpread2(_objectSpread2({}, attrs), {}, {
        "class": [wrapperClassName.value, attrs.class],
        "style": [attrs.style, circleStyle.value]
      }), [sizeRef.value.width <= 20 ? createVNode(Tooltip, null, {
        default: () => [createVNode("span", null, [circleContent])],
        title: slots.default
      }) : createVNode(Fragment, null, [circleContent, (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)])]);
    };
  }
});
const stepsProps = () => _extends(_extends({}, progressProps()), {
  steps: Number,
  strokeColor: someType(),
  trailColor: String
});
const Steps = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Steps",
  props: stepsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const current = computed(() => Math.round(props.steps * ((props.percent || 0) / 100)));
    const mergedSize = computed(() => {
      var _a2;
      return (_a2 = props.size) !== null && _a2 !== void 0 ? _a2 : [props.size === "small" ? 2 : 14, props.strokeWidth || 8];
    });
    const sizeRef = computed(() => getSize(mergedSize.value, "step", {
      steps: props.steps,
      strokeWidth: props.strokeWidth || 8
    }));
    const styledSteps = computed(() => {
      const {
        steps,
        strokeColor,
        trailColor,
        prefixCls
      } = props;
      const temp = [];
      for (let i = 0; i < steps; i += 1) {
        const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
        const cls = {
          [`${prefixCls}-steps-item`]: true,
          [`${prefixCls}-steps-item-active`]: i <= current.value - 1
        };
        temp.push(createVNode("div", {
          "key": i,
          "class": cls,
          "style": {
            backgroundColor: i <= current.value - 1 ? color : trailColor,
            width: `${sizeRef.value.width / steps}px`,
            height: `${sizeRef.value.height}px`
          }
        }, null));
      }
      return temp;
    });
    return () => {
      var _a2;
      return createVNode("div", {
        "class": `${props.prefixCls}-steps-outer`
      }, [styledSteps.value, (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
    };
  }
});
const antProgressActive = new Keyframe("antProgressActive", {
  "0%": {
    transform: "translateX(-100%) scaleX(0)",
    opacity: 0.1
  },
  "20%": {
    transform: "translateX(-100%) scaleX(0)",
    opacity: 0.5
  },
  to: {
    transform: "translateX(0) scaleX(1)",
    opacity: 0
  }
});
const genBaseStyle = (token) => {
  const {
    componentCls: progressCls,
    iconCls: iconPrefixCls
  } = token;
  return {
    [progressCls]: _extends(_extends({}, resetComponent(token)), {
      display: "inline-block",
      "&-rtl": {
        direction: "rtl"
      },
      "&-line": {
        position: "relative",
        width: "100%",
        fontSize: token.fontSize,
        marginInlineEnd: token.marginXS,
        marginBottom: token.marginXS
      },
      [`${progressCls}-outer`]: {
        display: "inline-block",
        width: "100%"
      },
      [`&${progressCls}-show-info`]: {
        [`${progressCls}-outer`]: {
          marginInlineEnd: `calc(-2em - ${token.marginXS}px)`,
          paddingInlineEnd: `calc(2em + ${token.paddingXS}px)`
        }
      },
      [`${progressCls}-inner`]: {
        position: "relative",
        display: "inline-block",
        width: "100%",
        overflow: "hidden",
        verticalAlign: "middle",
        backgroundColor: token.progressRemainingColor,
        borderRadius: token.progressLineRadius
      },
      [`${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorInfo
        }
      },
      [`${progressCls}-success-bg, ${progressCls}-bg`]: {
        position: "relative",
        backgroundColor: token.colorInfo,
        borderRadius: token.progressLineRadius,
        transition: `all ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`
      },
      [`${progressCls}-success-bg`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        backgroundColor: token.colorSuccess
      },
      [`${progressCls}-text`]: {
        display: "inline-block",
        width: "2em",
        marginInlineStart: token.marginXS,
        color: token.progressInfoTextColor,
        lineHeight: 1,
        whiteSpace: "nowrap",
        textAlign: "start",
        verticalAlign: "middle",
        wordBreak: "normal",
        [iconPrefixCls]: {
          fontSize: token.fontSize
        }
      },
      [`&${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          position: "absolute",
          inset: 0,
          backgroundColor: token.colorBgContainer,
          borderRadius: token.progressLineRadius,
          opacity: 0,
          animationName: antProgressActive,
          animationDuration: token.progressActiveMotionDuration,
          animationTimingFunction: token.motionEaseOutQuint,
          animationIterationCount: "infinite",
          content: '""'
        }
      },
      [`&${progressCls}-status-exception`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorError
        },
        [`${progressCls}-text`]: {
          color: token.colorError
        }
      },
      [`&${progressCls}-status-exception ${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorError
        }
      },
      [`&${progressCls}-status-success`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorSuccess
        },
        [`${progressCls}-text`]: {
          color: token.colorSuccess
        }
      },
      [`&${progressCls}-status-success ${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorSuccess
        }
      }
    })
  };
};
const genCircleStyle = (token) => {
  const {
    componentCls: progressCls,
    iconCls: iconPrefixCls
  } = token;
  return {
    [progressCls]: {
      [`${progressCls}-circle-trail`]: {
        stroke: token.progressRemainingColor
      },
      [`&${progressCls}-circle ${progressCls}-inner`]: {
        position: "relative",
        lineHeight: 1,
        backgroundColor: "transparent"
      },
      [`&${progressCls}-circle ${progressCls}-text`]: {
        position: "absolute",
        insetBlockStart: "50%",
        insetInlineStart: 0,
        width: "100%",
        margin: 0,
        padding: 0,
        color: token.colorText,
        lineHeight: 1,
        whiteSpace: "normal",
        textAlign: "center",
        transform: "translateY(-50%)",
        [iconPrefixCls]: {
          fontSize: `${token.fontSize / token.fontSizeSM}em`
        }
      },
      [`${progressCls}-circle&-status-exception`]: {
        [`${progressCls}-text`]: {
          color: token.colorError
        }
      },
      [`${progressCls}-circle&-status-success`]: {
        [`${progressCls}-text`]: {
          color: token.colorSuccess
        }
      }
    },
    [`${progressCls}-inline-circle`]: {
      lineHeight: 1,
      [`${progressCls}-inner`]: {
        verticalAlign: "bottom"
      }
    }
  };
};
const genStepStyle = (token) => {
  const {
    componentCls: progressCls
  } = token;
  return {
    [progressCls]: {
      [`${progressCls}-steps`]: {
        display: "inline-block",
        "&-outer": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        },
        "&-item": {
          flexShrink: 0,
          minWidth: token.progressStepMinWidth,
          marginInlineEnd: token.progressStepMarginInlineEnd,
          backgroundColor: token.progressRemainingColor,
          transition: `all ${token.motionDurationSlow}`,
          "&-active": {
            backgroundColor: token.colorInfo
          }
        }
      }
    }
  };
};
const genSmallLine = (token) => {
  const {
    componentCls: progressCls,
    iconCls: iconPrefixCls
  } = token;
  return {
    [progressCls]: {
      [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-text ${iconPrefixCls}`]: {
        fontSize: token.fontSizeSM
      }
    }
  };
};
const useStyle = genComponentStyleHook("Progress", (token) => {
  const progressStepMarginInlineEnd = token.marginXXS / 2;
  const progressToken = merge(token, {
    progressLineRadius: 100,
    progressInfoTextColor: token.colorText,
    progressDefaultColor: token.colorInfo,
    progressRemainingColor: token.colorFillSecondary,
    progressStepMarginInlineEnd,
    progressStepMinWidth: progressStepMarginInlineEnd,
    progressActiveMotionDuration: "2.4s"
  });
  return [genBaseStyle(progressToken), genCircleStyle(progressToken), genStepStyle(progressToken), genSmallLine(progressToken)];
});
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Progress = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AProgress",
  inheritAttrs: false,
  props: initDefaultProps(progressProps(), {
    type: "line",
    percent: 0,
    showInfo: true,
    // null for different theme definition
    trailColor: null,
    size: "default",
    strokeLinecap: "round"
  }),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("progress", props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const strokeColorNotArray = computed(() => Array.isArray(props.strokeColor) ? props.strokeColor[0] : props.strokeColor);
    const percentNumber = computed(() => {
      const {
        percent = 0
      } = props;
      const successPercent = getSuccessPercent(props);
      return parseInt(successPercent !== void 0 ? successPercent.toString() : percent.toString(), 10);
    });
    const progressStatus = computed(() => {
      const {
        status
      } = props;
      if (!progressStatuses.includes(status) && percentNumber.value >= 100) {
        return "success";
      }
      return status || "normal";
    });
    const classString = computed(() => {
      const {
        type,
        showInfo,
        size
      } = props;
      const pre = prefixCls.value;
      return {
        [pre]: true,
        [`${pre}-inline-circle`]: type === "circle" && getSize(size, "circle").width <= 20,
        [`${pre}-${type === "dashboard" && "circle" || type}`]: true,
        [`${pre}-status-${progressStatus.value}`]: true,
        [`${pre}-show-info`]: showInfo,
        [`${pre}-${size}`]: size,
        [`${pre}-rtl`]: direction.value === "rtl",
        [hashId.value]: true
      };
    });
    const strokeColorNotGradient = computed(() => typeof props.strokeColor === "string" || Array.isArray(props.strokeColor) ? props.strokeColor : void 0);
    const renderProcessInfo = () => {
      const {
        showInfo,
        format,
        type,
        percent,
        title
      } = props;
      const successPercent = getSuccessPercent(props);
      if (!showInfo) return null;
      let text;
      const textFormatter = format || (slots === null || slots === void 0 ? void 0 : slots.format) || ((val) => `${val}%`);
      const isLineType = type === "line";
      if (format || (slots === null || slots === void 0 ? void 0 : slots.format) || progressStatus.value !== "exception" && progressStatus.value !== "success") {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      } else if (progressStatus.value === "exception") {
        text = isLineType ? createVNode(CloseCircleFilled, null, null) : createVNode(CloseOutlined, null, null);
      } else if (progressStatus.value === "success") {
        text = isLineType ? createVNode(CheckCircleFilled, null, null) : createVNode(CheckOutlined, null, null);
      }
      return createVNode("span", {
        "class": `${prefixCls.value}-text`,
        "title": title === void 0 && typeof text === "string" ? text : void 0
      }, [text]);
    };
    return () => {
      const {
        type,
        steps,
        title
      } = props;
      const {
        class: cls
      } = attrs, restAttrs = __rest(attrs, ["class"]);
      const progressInfo = renderProcessInfo();
      let progress;
      if (type === "line") {
        progress = steps ? createVNode(Steps, _objectSpread2(_objectSpread2({}, props), {}, {
          "strokeColor": strokeColorNotGradient.value,
          "prefixCls": prefixCls.value,
          "steps": steps
        }), {
          default: () => [progressInfo]
        }) : createVNode(Line, _objectSpread2(_objectSpread2({}, props), {}, {
          "strokeColor": strokeColorNotArray.value,
          "prefixCls": prefixCls.value,
          "direction": direction.value
        }), {
          default: () => [progressInfo]
        });
      } else if (type === "circle" || type === "dashboard") {
        progress = createVNode(Circle, _objectSpread2(_objectSpread2({}, props), {}, {
          "prefixCls": prefixCls.value,
          "strokeColor": strokeColorNotArray.value,
          "progressStatus": progressStatus.value
        }), {
          default: () => [progressInfo]
        });
      }
      return wrapSSR(createVNode("div", _objectSpread2(_objectSpread2({
        "role": "progressbar"
      }, restAttrs), {}, {
        "class": [classString.value, cls],
        "title": title
      }), [progress]));
    };
  }
});
const __unplugin_components_1 = withInstall(Progress);
const locale$2 = {
  locale: "zh_CN",
  today: "今天",
  now: "此刻",
  backToToday: "返回今天",
  ok: "确定",
  timeSelect: "选择时间",
  dateSelect: "选择日期",
  weekSelect: "选择周",
  clear: "清除",
  month: "月",
  year: "年",
  previousMonth: "上个月 (翻页上键)",
  nextMonth: "下个月 (翻页下键)",
  monthSelect: "选择月份",
  yearSelect: "选择年份",
  decadeSelect: "选择年代",
  yearFormat: "YYYY年",
  dayFormat: "D日",
  dateFormat: "YYYY年M月D日",
  dateTimeFormat: "YYYY年M月D日 HH时mm分ss秒",
  previousYear: "上一年 (Control键加左方向键)",
  nextYear: "下一年 (Control键加右方向键)",
  previousDecade: "上一年代",
  nextDecade: "下一年代",
  previousCentury: "上一世纪",
  nextCentury: "下一世纪"
};
const locale$1 = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};
const locale = {
  lang: _extends({
    placeholder: "请选择日期",
    yearPlaceholder: "请选择年份",
    quarterPlaceholder: "请选择季度",
    monthPlaceholder: "请选择月份",
    weekPlaceholder: "请选择周",
    rangePlaceholder: ["开始日期", "结束日期"],
    rangeYearPlaceholder: ["开始年份", "结束年份"],
    rangeMonthPlaceholder: ["开始月份", "结束月份"],
    rangeQuarterPlaceholder: ["开始季度", "结束季度"],
    rangeWeekPlaceholder: ["开始周", "结束周"]
  }, locale$2),
  timePickerLocale: _extends({}, locale$1)
};
locale.lang.ok = "确定";
const typeTemplate = "${label}不是一个有效的${type}";
const localeValues = {
  locale: "zh-cn",
  Pagination,
  DatePicker: locale,
  TimePicker: locale$1,
  Calendar: locale,
  // locales for all components
  global: {
    placeholder: "请选择"
  },
  Table: {
    filterTitle: "筛选",
    filterConfirm: "确定",
    filterReset: "重置",
    filterEmptyText: "无筛选项",
    filterCheckall: "全选",
    filterSearchPlaceholder: "在筛选项中搜索",
    selectAll: "全选当页",
    selectInvert: "反选当页",
    selectNone: "清空所有",
    selectionAll: "全选所有",
    sortTitle: "排序",
    expand: "展开行",
    collapse: "关闭行",
    triggerDesc: "点击降序",
    triggerAsc: "点击升序",
    cancelSort: "取消排序"
  },
  Tour: {
    Next: "下一步",
    Previous: "上一步",
    Finish: "结束导览"
  },
  Modal: {
    okText: "确定",
    cancelText: "取消",
    justOkText: "知道了"
  },
  Popconfirm: {
    cancelText: "取消",
    okText: "确定"
  },
  Transfer: {
    searchPlaceholder: "请输入搜索内容",
    itemUnit: "项",
    itemsUnit: "项",
    remove: "删除",
    selectCurrent: "全选当页",
    removeCurrent: "删除当页",
    selectAll: "全选所有",
    removeAll: "删除全部",
    selectInvert: "反选当页"
  },
  Upload: {
    uploading: "文件上传中",
    removeFile: "删除文件",
    uploadError: "上传错误",
    previewFile: "预览文件",
    downloadFile: "下载文件"
  },
  Empty: {
    description: "暂无数据"
  },
  Icon: {
    icon: "图标"
  },
  Text: {
    edit: "编辑",
    copy: "复制",
    copied: "复制成功",
    expand: "展开"
  },
  PageHeader: {
    back: "返回"
  },
  Form: {
    optional: "（可选）",
    defaultValidateMessages: {
      default: "字段验证错误${label}",
      required: "请输入${label}",
      enum: "${label}必须是其中一个[${enum}]",
      whitespace: "${label}不能为空字符",
      date: {
        format: "${label}日期格式无效",
        parse: "${label}不能转换为日期",
        invalid: "${label}是一个无效日期"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label}须为${len}个字符",
        min: "${label}最少${min}个字符",
        max: "${label}最多${max}个字符",
        range: "${label}须在${min}-${max}字符之间"
      },
      number: {
        len: "${label}必须等于${len}",
        min: "${label}最小值为${min}",
        max: "${label}最大值为${max}",
        range: "${label}须在${min}-${max}之间"
      },
      array: {
        len: "须为${len}个${label}",
        min: "最少${min}个${label}",
        max: "最多${max}个${label}",
        range: "${label}数量须在${min}-${max}之间"
      },
      pattern: {
        mismatch: "${label}与模式不匹配${pattern}"
      }
    }
  },
  Image: {
    preview: "预览"
  },
  QRCode: {
    expired: "二维码已过期",
    refresh: "点击刷新",
    scanned: "已扫描"
  }
};
export {
  Avatar as A,
  Button as B,
  ConfigProvider as C,
  Dropdown as D,
  Layout as L,
  Menu as M,
  RangePicker as R,
  Statistic as S,
  Tabs as T,
  __unplugin_components_1 as _,
  localeValues as a,
  __unplugin_components_1$1 as b,
  __unplugin_components_5 as c,
  __unplugin_components_3 as d,
  __unplugin_components_2 as e,
  localeValues$1 as l
};
//# sourceMappingURL=ant-design-vue-CxifP5iN.js.map
