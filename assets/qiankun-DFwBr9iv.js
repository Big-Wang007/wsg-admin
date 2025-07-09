import { e as _asyncToGenerator, f as _regeneratorRuntime, i as _inherits, j as _createSuper, k as _createClass, l as _classCallCheck, m as _wrapNativeSuper, d as _defineProperty, b as _typeof, n as _toConsumableArray, c as _slicedToArray, a as _objectSpread2, o as _objectWithoutProperties } from "./@babel-BH5WFgda.js";
import { _ as _mergeWith2, a as _concat, b as _cloneDeep, c as _memoize, d as _once, e as _isFunction, f as _snakeCase, g as _without, h as _noop, i as _forEach } from "./lodash-KqrOsjaQ.js";
import { T as Tt, O as Ot, l, b as bt, B as Bt } from "./single-spa-BhgqiMF-.js";
import { _ as _execScripts, i as importEntry } from "./import-html-entry-DDVcqYXZ.js";
function getAddOn$1(global) {
  return {
    beforeLoad: function beforeLoad() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              global.__POWERED_BY_QIANKUN__ = true;
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    beforeMount: function beforeMount() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              global.__POWERED_BY_QIANKUN__ = true;
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    beforeUnmount: function beforeUnmount() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              delete global.__POWERED_BY_QIANKUN__;
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  };
}
var rawPublicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
function getAddOn(global) {
  var publicPath = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "/";
  var hasMountedOnce = false;
  return {
    beforeLoad: function beforeLoad() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              global.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = publicPath;
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    beforeMount: function beforeMount() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (hasMountedOnce) {
                global.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = publicPath;
              }
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    beforeUnmount: function beforeUnmount() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (rawPublicPath === void 0) {
                delete global.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
              } else {
                global.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = rawPublicPath;
              }
              hasMountedOnce = true;
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  };
}
function getAddOns(global, publicPath) {
  return _mergeWith2({}, getAddOn$1(global), getAddOn(global, publicPath), function(v1, v2) {
    return _concat(v1 !== null && v1 !== void 0 ? v1 : [], v2 !== null && v2 !== void 0 ? v2 : []);
  });
}
var QiankunError = /* @__PURE__ */ function(_Error) {
  _inherits(QiankunError2, _Error);
  var _super = _createSuper(QiankunError2);
  function QiankunError2(message) {
    _classCallCheck(this, QiankunError2);
    return _super.call(this, "[qiankun]: ".concat(message));
  }
  return _createClass(QiankunError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var globalState = {};
var deps = {};
function emitGlobal(state, prevState) {
  Object.keys(deps).forEach(function(id) {
    if (deps[id] instanceof Function) {
      deps[id](_cloneDeep(state), _cloneDeep(prevState));
    }
  });
}
function initGlobalState() {
  var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (state === globalState) {
    console.warn("[qiankun] state has not changed！");
  } else {
    var prevGlobalState = _cloneDeep(globalState);
    globalState = _cloneDeep(state);
    emitGlobal(globalState, prevGlobalState);
  }
  return getMicroAppStateActions("global-".concat(+/* @__PURE__ */ new Date()), true);
}
function getMicroAppStateActions(id, isMaster) {
  return {
    /**
     * onGlobalStateChange 全局依赖监听
     *
     * 收集 setState 时所需要触发的依赖
     *
     * 限制条件：每个子应用只有一个激活状态的全局监听，新监听覆盖旧监听，若只是监听部分属性，请使用 onGlobalStateChange
     *
     * 这么设计是为了减少全局监听滥用导致的内存爆炸
     *
     * 依赖数据结构为：
     * {
     *   {id}: callback
     * }
     *
     * @param callback
     * @param fireImmediately
     */
    onGlobalStateChange: function onGlobalStateChange(callback, fireImmediately) {
      if (!(callback instanceof Function)) {
        console.error("[qiankun] callback must be function!");
        return;
      }
      if (deps[id]) {
        console.warn("[qiankun] '".concat(id, "' global listener already exists before this, new listener will overwrite it."));
      }
      deps[id] = callback;
      if (fireImmediately) {
        var cloneState = _cloneDeep(globalState);
        callback(cloneState, cloneState);
      }
    },
    /**
     * setGlobalState 更新 store 数据
     *
     * 1. 对输入 state 的第一层属性做校验，只有初始化时声明过的第一层（bucket）属性才会被更改
     * 2. 修改 store 并触发全局监听
     *
     * @param state
     */
    setGlobalState: function setGlobalState() {
      var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (state === globalState) {
        console.warn("[qiankun] state has not changed！");
        return false;
      }
      var changeKeys = [];
      var prevGlobalState = _cloneDeep(globalState);
      globalState = _cloneDeep(Object.keys(state).reduce(function(_globalState, changeKey) {
        if (isMaster || _globalState.hasOwnProperty(changeKey)) {
          changeKeys.push(changeKey);
          return Object.assign(_globalState, _defineProperty({}, changeKey, state[changeKey]));
        }
        console.warn("[qiankun] '".concat(changeKey, "' not declared when init state！"));
        return _globalState;
      }, globalState));
      if (changeKeys.length === 0) {
        console.warn("[qiankun] state has not changed！");
        return false;
      }
      emitGlobal(globalState, prevGlobalState);
      return true;
    },
    // 注销该应用下的依赖
    offGlobalStateChange: function offGlobalStateChange() {
      delete deps[id];
      return true;
    }
  };
}
var SandBoxType;
(function(SandBoxType2) {
  SandBoxType2["Proxy"] = "Proxy";
  SandBoxType2["Snapshot"] = "Snapshot";
  SandBoxType2["LegacyProxy"] = "LegacyProxy";
})(SandBoxType || (SandBoxType = {}));
var version = "2.10.16";
function toArray(array) {
  return Array.isArray(array) ? array : [array];
}
var nextTick = typeof window.__zone_symbol__setTimeout === "function" ? window.__zone_symbol__setTimeout : function(cb) {
  return Promise.resolve().then(cb);
};
var globalTaskPending = false;
function nextTask(cb) {
  if (!globalTaskPending) {
    globalTaskPending = true;
    nextTick(function() {
      cb();
      globalTaskPending = false;
    });
  }
}
var fnRegexCheckCacheMap = /* @__PURE__ */ new WeakMap();
function isConstructable(fn) {
  var hasPrototypeMethods = fn.prototype && fn.prototype.constructor === fn && Object.getOwnPropertyNames(fn.prototype).length > 1;
  if (hasPrototypeMethods) return true;
  if (fnRegexCheckCacheMap.has(fn)) {
    return fnRegexCheckCacheMap.get(fn);
  }
  var constructable = hasPrototypeMethods;
  if (!constructable) {
    var fnString = fn.toString();
    var constructableFunctionRegex = /^function\b\s[A-Z].*/;
    var classRegex = /^class\b/;
    constructable = constructableFunctionRegex.test(fnString) || classRegex.test(fnString);
  }
  fnRegexCheckCacheMap.set(fn, constructable);
  return constructable;
}
var callableFnCacheMap = /* @__PURE__ */ new WeakMap();
function isCallable(fn) {
  if (callableFnCacheMap.has(fn)) {
    return true;
  }
  var callable = typeof fn === "function" && fn instanceof Function;
  if (callable) {
    callableFnCacheMap.set(fn, callable);
  }
  return callable;
}
var frozenPropertyCacheMap = /* @__PURE__ */ new WeakMap();
function isPropertyFrozen(target, p) {
  if (!target || !p) {
    return false;
  }
  var targetPropertiesFromCache = frozenPropertyCacheMap.get(target) || {};
  if (targetPropertiesFromCache[p]) {
    return targetPropertiesFromCache[p];
  }
  var propertyDescriptor = Object.getOwnPropertyDescriptor(target, p);
  var frozen = Boolean(propertyDescriptor && propertyDescriptor.configurable === false && (propertyDescriptor.writable === false || propertyDescriptor.get && !propertyDescriptor.set));
  targetPropertiesFromCache[p] = frozen;
  frozenPropertyCacheMap.set(target, targetPropertiesFromCache);
  return frozen;
}
var boundedMap = /* @__PURE__ */ new WeakMap();
function isBoundedFunction(fn) {
  if (boundedMap.has(fn)) {
    return boundedMap.get(fn);
  }
  var bounded = fn.name.indexOf("bound ") === 0 && !fn.hasOwnProperty("prototype");
  boundedMap.set(fn, bounded);
  return bounded;
}
var isConstDestructAssignmentSupported = _memoize(function() {
  try {
    new Function("const { a } = { a: 1 }")();
    return true;
  } catch (e) {
    return false;
  }
});
var qiankunHeadTagName = "qiankun-head";
function getDefaultTplWrapper(name, sandboxOpts) {
  return function(tpl) {
    var tplWithSimulatedHead;
    if (tpl.indexOf("<head>") !== -1) {
      tplWithSimulatedHead = tpl.replace("<head>", "<".concat(qiankunHeadTagName, ">")).replace("</head>", "</".concat(qiankunHeadTagName, ">"));
    } else {
      tplWithSimulatedHead = "<".concat(qiankunHeadTagName, "></").concat(qiankunHeadTagName, ">").concat(tpl);
    }
    return '<div id="'.concat(getWrapperId(name), '" data-name="').concat(name, '" data-version="').concat(version, '" data-sandbox-cfg=').concat(JSON.stringify(sandboxOpts), ">").concat(tplWithSimulatedHead, "</div>");
  };
}
function getWrapperId(name) {
  return "__qiankun_microapp_wrapper_for_".concat(_snakeCase(name), "__");
}
var nativeGlobal = new Function("return this")();
var nativeDocument = new Function("return document")();
var getGlobalAppInstanceMap = _once(function() {
  if (!nativeGlobal.hasOwnProperty("__app_instance_name_map__")) {
    Object.defineProperty(nativeGlobal, "__app_instance_name_map__", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: {}
    });
  }
  return nativeGlobal.__app_instance_name_map__;
});
var genAppInstanceIdByName = function genAppInstanceIdByName2(appName) {
  var globalAppInstanceMap = getGlobalAppInstanceMap();
  if (!(appName in globalAppInstanceMap)) {
    nativeGlobal.__app_instance_name_map__[appName] = 0;
    return appName;
  }
  globalAppInstanceMap[appName]++;
  return "".concat(appName, "_").concat(globalAppInstanceMap[appName]);
};
function validateExportLifecycle(exports) {
  var _ref = exports !== null && exports !== void 0 ? exports : {}, bootstrap = _ref.bootstrap, mount = _ref.mount, unmount = _ref.unmount;
  return _isFunction(bootstrap) && _isFunction(mount) && _isFunction(unmount);
}
var Deferred = /* @__PURE__ */ _createClass(function Deferred2() {
  var _this = this;
  _classCallCheck(this, Deferred2);
  this.promise = void 0;
  this.resolve = void 0;
  this.reject = void 0;
  this.promise = new Promise(function(resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  });
});
function isEnableScopedCSS(sandbox) {
  if (_typeof(sandbox) !== "object") {
    return false;
  }
  if (sandbox.strictStyleIsolation) {
    return false;
  }
  return !!sandbox.experimentalStyleIsolation;
}
function getContainer(container) {
  return typeof container === "string" ? document.querySelector(container) : container;
}
var currentRunningApp = null;
function getCurrentRunningApp() {
  return currentRunningApp;
}
function setCurrentRunningApp(appInstance) {
  currentRunningApp = appInstance;
}
function clearCurrentRunningApp() {
  currentRunningApp = null;
}
var functionBoundedValueMap = /* @__PURE__ */ new WeakMap();
function rebindTarget2Fn(target, fn) {
  if (isCallable(fn) && !isBoundedFunction(fn) && !isConstructable(fn)) {
    var cachedBoundFunction = functionBoundedValueMap.get(fn);
    if (cachedBoundFunction) {
      return cachedBoundFunction;
    }
    var boundValue = Function.prototype.bind.call(fn, target);
    Object.getOwnPropertyNames(fn).forEach(function(key) {
      if (!boundValue.hasOwnProperty(key)) {
        Object.defineProperty(boundValue, key, Object.getOwnPropertyDescriptor(fn, key));
      }
    });
    if (fn.hasOwnProperty("prototype") && !boundValue.hasOwnProperty("prototype")) {
      Object.defineProperty(boundValue, "prototype", {
        value: fn.prototype,
        enumerable: false,
        writable: true
      });
    }
    if (typeof fn.toString === "function") {
      var valueHasInstanceToString = fn.hasOwnProperty("toString") && !boundValue.hasOwnProperty("toString");
      var boundValueHasPrototypeToString = boundValue.toString === Function.prototype.toString;
      if (valueHasInstanceToString || boundValueHasPrototypeToString) {
        var originToStringDescriptor = Object.getOwnPropertyDescriptor(valueHasInstanceToString ? fn : Function.prototype, "toString");
        Object.defineProperty(boundValue, "toString", Object.assign({}, originToStringDescriptor, (originToStringDescriptor === null || originToStringDescriptor === void 0 ? void 0 : originToStringDescriptor.get) ? null : {
          value: function value() {
            return fn.toString();
          }
        }));
      }
    }
    functionBoundedValueMap.set(fn, boundValue);
    return boundValue;
  }
  return fn;
}
function isPropConfigurable(target, prop) {
  var descriptor = Object.getOwnPropertyDescriptor(target, prop);
  return descriptor ? descriptor.configurable : true;
}
var LegacySandbox = /* @__PURE__ */ function() {
  function LegacySandbox2(name) {
    var _this = this;
    var globalContext = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
    _classCallCheck(this, LegacySandbox2);
    this.addedPropsMapInSandbox = /* @__PURE__ */ new Map();
    this.modifiedPropsOriginalValueMapInSandbox = /* @__PURE__ */ new Map();
    this.currentUpdatedPropsValueMap = /* @__PURE__ */ new Map();
    this.name = void 0;
    this.proxy = void 0;
    this.globalContext = void 0;
    this.type = void 0;
    this.sandboxRunning = true;
    this.latestSetProp = null;
    this.name = name;
    this.globalContext = globalContext;
    this.type = SandBoxType.LegacyProxy;
    var addedPropsMapInSandbox = this.addedPropsMapInSandbox, modifiedPropsOriginalValueMapInSandbox = this.modifiedPropsOriginalValueMapInSandbox, currentUpdatedPropsValueMap = this.currentUpdatedPropsValueMap;
    var rawWindow = globalContext;
    var fakeWindow = /* @__PURE__ */ Object.create(null);
    var setTrap = function setTrap2(p, value, originalValue) {
      var sync2Window = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      if (_this.sandboxRunning) {
        if (!rawWindow.hasOwnProperty(p)) {
          addedPropsMapInSandbox.set(p, value);
        } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
          modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
        }
        currentUpdatedPropsValueMap.set(p, value);
        if (sync2Window) {
          rawWindow[p] = value;
        }
        _this.latestSetProp = p;
        return true;
      }
      return true;
    };
    var proxy = new Proxy(fakeWindow, {
      set: function set(_, p, value) {
        var originalValue = rawWindow[p];
        return setTrap(p, value, originalValue, true);
      },
      get: function get(_, p) {
        if (p === "top" || p === "parent" || p === "window" || p === "self") {
          return proxy;
        }
        var value = rawWindow[p];
        return rebindTarget2Fn(rawWindow, value);
      },
      // trap in operator
      // see https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/constants.js#L12
      has: function has(_, p) {
        return p in rawWindow;
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(_, p) {
        var descriptor = Object.getOwnPropertyDescriptor(rawWindow, p);
        if (descriptor && !descriptor.configurable) {
          descriptor.configurable = true;
        }
        return descriptor;
      },
      defineProperty: function defineProperty(_, p, attributes) {
        var originalValue = rawWindow[p];
        var done = Reflect.defineProperty(rawWindow, p, attributes);
        var value = rawWindow[p];
        setTrap(p, value, originalValue, false);
        return done;
      }
    });
    this.proxy = proxy;
  }
  _createClass(LegacySandbox2, [{
    key: "setWindowProp",
    value: function setWindowProp(prop, value, toDelete) {
      if (value === void 0 && toDelete) {
        delete this.globalContext[prop];
      } else if (isPropConfigurable(this.globalContext, prop) && _typeof(prop) !== "symbol") {
        Object.defineProperty(this.globalContext, prop, {
          writable: true,
          configurable: true
        });
        this.globalContext[prop] = value;
      }
    }
  }, {
    key: "active",
    value: function active() {
      var _this2 = this;
      if (!this.sandboxRunning) {
        this.currentUpdatedPropsValueMap.forEach(function(v, p) {
          return _this2.setWindowProp(p, v);
        });
      }
      this.sandboxRunning = true;
    }
  }, {
    key: "inactive",
    value: function inactive() {
      var _this3 = this;
      this.modifiedPropsOriginalValueMapInSandbox.forEach(function(v, p) {
        return _this3.setWindowProp(p, v);
      });
      this.addedPropsMapInSandbox.forEach(function(_, p) {
        return _this3.setWindowProp(p, void 0, true);
      });
      this.sandboxRunning = false;
    }
  }, {
    key: "patchDocument",
    value: function patchDocument2() {
    }
  }]);
  return LegacySandbox2;
}();
var RuleType;
(function(RuleType2) {
  RuleType2[RuleType2["STYLE"] = 1] = "STYLE";
  RuleType2[RuleType2["MEDIA"] = 4] = "MEDIA";
  RuleType2[RuleType2["SUPPORTS"] = 12] = "SUPPORTS";
  RuleType2[RuleType2["IMPORT"] = 3] = "IMPORT";
  RuleType2[RuleType2["FONT_FACE"] = 5] = "FONT_FACE";
  RuleType2[RuleType2["PAGE"] = 6] = "PAGE";
  RuleType2[RuleType2["KEYFRAMES"] = 7] = "KEYFRAMES";
  RuleType2[RuleType2["KEYFRAME"] = 8] = "KEYFRAME";
})(RuleType || (RuleType = {}));
var arrayify = function arrayify2(list) {
  return [].slice.call(list, 0);
};
var rawDocumentBodyAppend = HTMLBodyElement.prototype.appendChild;
var ScopedCSS = /* @__PURE__ */ function() {
  function ScopedCSS2() {
    _classCallCheck(this, ScopedCSS2);
    this.sheet = void 0;
    this.swapNode = void 0;
    var styleNode = document.createElement("style");
    rawDocumentBodyAppend.call(document.body, styleNode);
    this.swapNode = styleNode;
    this.sheet = styleNode.sheet;
    this.sheet.disabled = true;
  }
  _createClass(ScopedCSS2, [{
    key: "process",
    value: function process3(styleNode) {
      var _this = this;
      var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      if (ScopedCSS2.ModifiedTag in styleNode) {
        return;
      }
      if (styleNode.textContent !== "") {
        var _sheet$cssRules;
        var textNode = document.createTextNode(styleNode.textContent || "");
        this.swapNode.appendChild(textNode);
        var sheet = this.swapNode.sheet;
        var rules = arrayify((_sheet$cssRules = sheet === null || sheet === void 0 ? void 0 : sheet.cssRules) !== null && _sheet$cssRules !== void 0 ? _sheet$cssRules : []);
        var css = this.rewrite(rules, prefix);
        styleNode.textContent = css;
        this.swapNode.removeChild(textNode);
        styleNode[ScopedCSS2.ModifiedTag] = true;
        return;
      }
      var mutator = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i += 1) {
          var mutation = mutations[i];
          if (ScopedCSS2.ModifiedTag in styleNode) {
            return;
          }
          if (mutation.type === "childList") {
            var _sheet$cssRules2;
            var _sheet = styleNode.sheet;
            var _rules = arrayify((_sheet$cssRules2 = _sheet === null || _sheet === void 0 ? void 0 : _sheet.cssRules) !== null && _sheet$cssRules2 !== void 0 ? _sheet$cssRules2 : []);
            var _css = _this.rewrite(_rules, prefix);
            styleNode.textContent = _css;
            styleNode[ScopedCSS2.ModifiedTag] = true;
          }
        }
      });
      mutator.observe(styleNode, {
        childList: true
      });
    }
  }, {
    key: "rewrite",
    value: function rewrite(rules) {
      var _this2 = this;
      var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var css = "";
      rules.forEach(function(rule) {
        switch (rule.type) {
          case RuleType.STYLE:
            css += _this2.ruleStyle(rule, prefix);
            break;
          case RuleType.MEDIA:
            css += _this2.ruleMedia(rule, prefix);
            break;
          case RuleType.SUPPORTS:
            css += _this2.ruleSupport(rule, prefix);
            break;
          default:
            if (typeof rule.cssText === "string") {
              css += "".concat(rule.cssText);
            }
            break;
        }
      });
      return css;
    }
    // handle case:
    // .app-main {}
    // html, body {}
    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "ruleStyle",
    value: function ruleStyle(rule, prefix) {
      var rootSelectorRE = /((?:[^\w\-.#]|^)(body|html|:root))/gm;
      var rootCombinationRE = /(html[^\w{[]+)/gm;
      var selector = rule.selectorText.trim();
      var cssText = "";
      if (typeof rule.cssText === "string") {
        cssText = rule.cssText;
      }
      if (selector === "html" || selector === "body" || selector === ":root") {
        return cssText.replace(rootSelectorRE, prefix);
      }
      if (rootCombinationRE.test(rule.selectorText)) {
        var siblingSelectorRE = /(html[^\w{]+)(\+|~)/gm;
        if (!siblingSelectorRE.test(rule.selectorText)) {
          cssText = cssText.replace(rootCombinationRE, "");
        }
      }
      cssText = cssText.replace(/^[\s\S]+{/, function(selectors) {
        return selectors.replace(/(^|,\n?)([^,]+)/g, function(item, p, s) {
          if (rootSelectorRE.test(item)) {
            return item.replace(rootSelectorRE, function(m) {
              var whitePrevChars = [",", "("];
              if (m && whitePrevChars.includes(m[0])) {
                return "".concat(m[0]).concat(prefix);
              }
              return prefix;
            });
          }
          return "".concat(p).concat(prefix, " ").concat(s.replace(/^ */, ""));
        });
      });
      return cssText;
    }
    // handle case:
    // @media screen and (max-width: 300px) {}
  }, {
    key: "ruleMedia",
    value: function ruleMedia(rule, prefix) {
      var css = this.rewrite(arrayify(rule.cssRules), prefix);
      return "@media ".concat(rule.conditionText || rule.media.mediaText, " {").concat(css, "}");
    }
    // handle case:
    // @supports (display: grid) {}
  }, {
    key: "ruleSupport",
    value: function ruleSupport(rule, prefix) {
      var css = this.rewrite(arrayify(rule.cssRules), prefix);
      return "@supports ".concat(rule.conditionText || rule.cssText.split("{")[0], " {").concat(css, "}");
    }
  }]);
  return ScopedCSS2;
}();
ScopedCSS.ModifiedTag = "Symbol(style-modified-qiankun)";
var processor;
var QiankunCSSRewriteAttr = "data-qiankun";
var process = function process2(appWrapper, stylesheetElement, appName) {
  if (!processor) {
    processor = new ScopedCSS();
  }
  if (stylesheetElement.tagName === "LINK") {
    console.warn("Feature: sandbox.experimentalStyleIsolation is not support for link element yet.");
  }
  var mountDOM = appWrapper;
  if (!mountDOM) {
    return;
  }
  var tag = (mountDOM.tagName || "").toLowerCase();
  if (tag && stylesheetElement.tagName === "STYLE") {
    var prefix = "".concat(tag, "[").concat(QiankunCSSRewriteAttr, '="').concat(appName, '"]');
    processor.process(stylesheetElement, prefix);
  }
};
var globalsInES2015 = window.Proxy ? ["Array", "ArrayBuffer", "Boolean", "constructor", "DataView", "Date", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Error", "escape", "eval", "EvalError", "Float32Array", "Float64Array", "Function", "hasOwnProperty", "Infinity", "Int16Array", "Int32Array", "Int8Array", "isFinite", "isNaN", "isPrototypeOf", "JSON", "Map", "Math", "NaN", "Number", "Object", "parseFloat", "parseInt", "Promise", "propertyIsEnumerable", "Proxy", "RangeError", "ReferenceError", "Reflect", "RegExp", "Set", "String", "Symbol", "SyntaxError", "toLocaleString", "toString", "TypeError", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "undefined", "unescape", "URIError", "valueOf", "WeakMap", "WeakSet"].filter(function(p) {
  return (
    /* just keep the available properties in current window context */
    p in window
  );
}) : [];
var globalsInBrowser = ["AbortController", "AbortSignal", "addEventListener", "alert", "AnalyserNode", "Animation", "AnimationEffectReadOnly", "AnimationEffectTiming", "AnimationEffectTimingReadOnly", "AnimationEvent", "AnimationPlaybackEvent", "AnimationTimeline", "applicationCache", "ApplicationCache", "ApplicationCacheErrorEvent", "atob", "Attr", "Audio", "AudioBuffer", "AudioBufferSourceNode", "AudioContext", "AudioDestinationNode", "AudioListener", "AudioNode", "AudioParam", "AudioProcessingEvent", "AudioScheduledSourceNode", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioWorkletProcessor", "BarProp", "BaseAudioContext", "BatteryManager", "BeforeUnloadEvent", "BiquadFilterNode", "Blob", "BlobEvent", "blur", "BroadcastChannel", "btoa", "BudgetService", "ByteLengthQueuingStrategy", "Cache", "caches", "CacheStorage", "cancelAnimationFrame", "cancelIdleCallback", "CanvasCaptureMediaStreamTrack", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "ChannelMergerNode", "ChannelSplitterNode", "CharacterData", "clearInterval", "clearTimeout", "clientInformation", "ClipboardEvent", "ClipboardItem", "close", "closed", "CloseEvent", "Comment", "CompositionEvent", "CompressionStream", "confirm", "console", "ConstantSourceNode", "ConvolverNode", "CountQueuingStrategy", "createImageBitmap", "Credential", "CredentialsContainer", "crypto", "Crypto", "CryptoKey", "CSS", "CSSConditionRule", "CSSFontFaceRule", "CSSGroupingRule", "CSSImportRule", "CSSKeyframeRule", "CSSKeyframesRule", "CSSMatrixComponent", "CSSMediaRule", "CSSNamespaceRule", "CSSPageRule", "CSSPerspective", "CSSRotate", "CSSRule", "CSSRuleList", "CSSScale", "CSSSkew", "CSSSkewX", "CSSSkewY", "CSSStyleDeclaration", "CSSStyleRule", "CSSStyleSheet", "CSSSupportsRule", "CSSTransformValue", "CSSTranslate", "CustomElementRegistry", "customElements", "CustomEvent", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DecompressionStream", "defaultstatus", "defaultStatus", "DelayNode", "DeviceMotionEvent", "DeviceOrientationEvent", "devicePixelRatio", "dispatchEvent", "document", "Document", "DocumentFragment", "DocumentType", "DOMError", "DOMException", "DOMImplementation", "DOMMatrix", "DOMMatrixReadOnly", "DOMParser", "DOMPoint", "DOMPointReadOnly", "DOMQuad", "DOMRect", "DOMRectList", "DOMRectReadOnly", "DOMStringList", "DOMStringMap", "DOMTokenList", "DragEvent", "DynamicsCompressorNode", "Element", "ErrorEvent", "event", "Event", "EventSource", "EventTarget", "external", "fetch", "File", "FileList", "FileReader", "find", "focus", "FocusEvent", "FontFace", "FontFaceSetLoadEvent", "FormData", "FormDataEvent", "frameElement", "frames", "GainNode", "Gamepad", "GamepadButton", "GamepadEvent", "getComputedStyle", "getSelection", "HashChangeEvent", "Headers", "history", "History", "HTMLAllCollection", "HTMLAnchorElement", "HTMLAreaElement", "HTMLAudioElement", "HTMLBaseElement", "HTMLBodyElement", "HTMLBRElement", "HTMLButtonElement", "HTMLCanvasElement", "HTMLCollection", "HTMLContentElement", "HTMLDataElement", "HTMLDataListElement", "HTMLDetailsElement", "HTMLDialogElement", "HTMLDirectoryElement", "HTMLDivElement", "HTMLDListElement", "HTMLDocument", "HTMLElement", "HTMLEmbedElement", "HTMLFieldSetElement", "HTMLFontElement", "HTMLFormControlsCollection", "HTMLFormElement", "HTMLFrameElement", "HTMLFrameSetElement", "HTMLHeadElement", "HTMLHeadingElement", "HTMLHRElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement", "HTMLInputElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLLIElement", "HTMLLinkElement", "HTMLMapElement", "HTMLMarqueeElement", "HTMLMediaElement", "HTMLMenuElement", "HTMLMetaElement", "HTMLMeterElement", "HTMLModElement", "HTMLObjectElement", "HTMLOListElement", "HTMLOptGroupElement", "HTMLOptionElement", "HTMLOptionsCollection", "HTMLOutputElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLPictureElement", "HTMLPreElement", "HTMLProgressElement", "HTMLQuoteElement", "HTMLScriptElement", "HTMLSelectElement", "HTMLShadowElement", "HTMLSlotElement", "HTMLSourceElement", "HTMLSpanElement", "HTMLStyleElement", "HTMLTableCaptionElement", "HTMLTableCellElement", "HTMLTableColElement", "HTMLTableElement", "HTMLTableRowElement", "HTMLTableSectionElement", "HTMLTemplateElement", "HTMLTextAreaElement", "HTMLTimeElement", "HTMLTitleElement", "HTMLTrackElement", "HTMLUListElement", "HTMLUnknownElement", "HTMLVideoElement", "IDBCursor", "IDBCursorWithValue", "IDBDatabase", "IDBFactory", "IDBIndex", "IDBKeyRange", "IDBObjectStore", "IDBOpenDBRequest", "IDBRequest", "IDBTransaction", "IDBVersionChangeEvent", "IdleDeadline", "IIRFilterNode", "Image", "ImageBitmap", "ImageBitmapRenderingContext", "ImageCapture", "ImageData", "indexedDB", "innerHeight", "innerWidth", "InputEvent", "IntersectionObserver", "IntersectionObserverEntry", "Intl", "isSecureContext", "KeyboardEvent", "KeyframeEffect", "KeyframeEffectReadOnly", "length", "localStorage", "location", "Location", "locationbar", "matchMedia", "MediaDeviceInfo", "MediaDevices", "MediaElementAudioSourceNode", "MediaEncryptedEvent", "MediaError", "MediaKeyMessageEvent", "MediaKeySession", "MediaKeyStatusMap", "MediaKeySystemAccess", "MediaList", "MediaMetadata", "MediaQueryList", "MediaQueryListEvent", "MediaRecorder", "MediaSettingsRange", "MediaSource", "MediaStream", "MediaStreamAudioDestinationNode", "MediaStreamAudioSourceNode", "MediaStreamConstraints", "MediaStreamEvent", "MediaStreamTrack", "MediaStreamTrackEvent", "menubar", "MessageChannel", "MessageEvent", "MessagePort", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent", "MIDIOutput", "MIDIOutputMap", "MIDIPort", "MimeType", "MimeTypeArray", "MouseEvent", "moveBy", "moveTo", "MutationEvent", "MutationObserver", "MutationRecord", "name", "NamedNodeMap", "NavigationPreloadManager", "navigator", "Navigator", "NavigatorUAData", "NetworkInformation", "Node", "NodeFilter", "NodeIterator", "NodeList", "Notification", "OfflineAudioCompletionEvent", "OfflineAudioContext", "offscreenBuffering", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "onabort", "onafterprint", "onanimationend", "onanimationiteration", "onanimationstart", "onappinstalled", "onauxclick", "onbeforeinstallprompt", "onbeforeprint", "onbeforeunload", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondevicemotion", "ondeviceorientation", "ondeviceorientationabsolute", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "ongotpointercapture", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onlanguagechange", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onlostpointercapture", "onmessage", "onmessageerror", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpagehide", "onpageshow", "onpause", "onplay", "onplaying", "onpointercancel", "onpointerdown", "onpointerenter", "onpointerleave", "onpointermove", "onpointerout", "onpointerover", "onpointerup", "onpopstate", "onprogress", "onratechange", "onrejectionhandled", "onreset", "onresize", "onscroll", "onsearch", "onseeked", "onseeking", "onselect", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "ontransitionend", "onunhandledrejection", "onunload", "onvolumechange", "onwaiting", "onwheel", "open", "openDatabase", "opener", "Option", "origin", "OscillatorNode", "outerHeight", "outerWidth", "OverconstrainedError", "PageTransitionEvent", "pageXOffset", "pageYOffset", "PannerNode", "parent", "Path2D", "PaymentAddress", "PaymentRequest", "PaymentRequestUpdateEvent", "PaymentResponse", "performance", "Performance", "PerformanceEntry", "PerformanceLongTaskTiming", "PerformanceMark", "PerformanceMeasure", "PerformanceNavigation", "PerformanceNavigationTiming", "PerformanceObserver", "PerformanceObserverEntryList", "PerformancePaintTiming", "PerformanceResourceTiming", "PerformanceTiming", "PeriodicWave", "Permissions", "PermissionStatus", "personalbar", "PhotoCapabilities", "Plugin", "PluginArray", "PointerEvent", "PopStateEvent", "postMessage", "Presentation", "PresentationAvailability", "PresentationConnection", "PresentationConnectionAvailableEvent", "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver", "PresentationRequest", "print", "ProcessingInstruction", "ProgressEvent", "PromiseRejectionEvent", "prompt", "PushManager", "PushSubscription", "PushSubscriptionOptions", "queueMicrotask", "RadioNodeList", "Range", "ReadableByteStreamController", "ReadableStream", "ReadableStreamBYOBReader", "ReadableStreamBYOBRequest", "ReadableStreamDefaultController", "ReadableStreamDefaultReader", "registerProcessor", "RemotePlayback", "removeEventListener", "reportError", "Request", "requestAnimationFrame", "requestIdleCallback", "resizeBy", "ResizeObserver", "ResizeObserverEntry", "resizeTo", "Response", "RTCCertificate", "RTCDataChannel", "RTCDataChannelEvent", "RTCDtlsTransport", "RTCIceCandidate", "RTCIceGatherer", "RTCIceTransport", "RTCPeerConnection", "RTCPeerConnectionIceEvent", "RTCRtpContributingSource", "RTCRtpReceiver", "RTCRtpSender", "RTCSctpTransport", "RTCSessionDescription", "RTCStatsReport", "RTCTrackEvent", "screen", "Screen", "screenLeft", "ScreenOrientation", "screenTop", "screenX", "screenY", "ScriptProcessorNode", "scroll", "scrollbars", "scrollBy", "scrollTo", "scrollX", "scrollY", "SecurityPolicyViolationEvent", "Selection", "self", "ServiceWorker", "ServiceWorkerContainer", "ServiceWorkerRegistration", "sessionStorage", "setInterval", "setTimeout", "ShadowRoot", "SharedWorker", "SourceBuffer", "SourceBufferList", "speechSynthesis", "SpeechSynthesisEvent", "SpeechSynthesisUtterance", "StaticRange", "status", "statusbar", "StereoPannerNode", "stop", "Storage", "StorageEvent", "StorageManager", "structuredClone", "styleMedia", "StyleSheet", "StyleSheetList", "SubmitEvent", "SubtleCrypto", "SVGAElement", "SVGAngle", "SVGAnimatedAngle", "SVGAnimatedBoolean", "SVGAnimatedEnumeration", "SVGAnimatedInteger", "SVGAnimatedLength", "SVGAnimatedLengthList", "SVGAnimatedNumber", "SVGAnimatedNumberList", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedRect", "SVGAnimatedString", "SVGAnimatedTransformList", "SVGAnimateElement", "SVGAnimateMotionElement", "SVGAnimateTransformElement", "SVGAnimationElement", "SVGCircleElement", "SVGClipPathElement", "SVGComponentTransferFunctionElement", "SVGDefsElement", "SVGDescElement", "SVGDiscardElement", "SVGElement", "SVGEllipseElement", "SVGFEBlendElement", "SVGFEColorMatrixElement", "SVGFEComponentTransferElement", "SVGFECompositeElement", "SVGFEConvolveMatrixElement", "SVGFEDiffuseLightingElement", "SVGFEDisplacementMapElement", "SVGFEDistantLightElement", "SVGFEDropShadowElement", "SVGFEFloodElement", "SVGFEFuncAElement", "SVGFEFuncBElement", "SVGFEFuncGElement", "SVGFEFuncRElement", "SVGFEGaussianBlurElement", "SVGFEImageElement", "SVGFEMergeElement", "SVGFEMergeNodeElement", "SVGFEMorphologyElement", "SVGFEOffsetElement", "SVGFEPointLightElement", "SVGFESpecularLightingElement", "SVGFESpotLightElement", "SVGFETileElement", "SVGFETurbulenceElement", "SVGFilterElement", "SVGForeignObjectElement", "SVGGElement", "SVGGeometryElement", "SVGGradientElement", "SVGGraphicsElement", "SVGImageElement", "SVGLength", "SVGLengthList", "SVGLinearGradientElement", "SVGLineElement", "SVGMarkerElement", "SVGMaskElement", "SVGMatrix", "SVGMetadataElement", "SVGMPathElement", "SVGNumber", "SVGNumberList", "SVGPathElement", "SVGPatternElement", "SVGPoint", "SVGPointList", "SVGPolygonElement", "SVGPolylineElement", "SVGPreserveAspectRatio", "SVGRadialGradientElement", "SVGRect", "SVGRectElement", "SVGScriptElement", "SVGSetElement", "SVGStopElement", "SVGStringList", "SVGStyleElement", "SVGSVGElement", "SVGSwitchElement", "SVGSymbolElement", "SVGTextContentElement", "SVGTextElement", "SVGTextPathElement", "SVGTextPositioningElement", "SVGTitleElement", "SVGTransform", "SVGTransformList", "SVGTSpanElement", "SVGUnitTypes", "SVGUseElement", "SVGViewElement", "TaskAttributionTiming", "Text", "TextDecoder", "TextDecoderStream", "TextEncoder", "TextEncoderStream", "TextEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "ToggleEvent", "toolbar", "top", "Touch", "TouchEvent", "TouchList", "TrackEvent", "TransformStream", "TransformStreamDefaultController", "TransitionEvent", "TreeWalker", "UIEvent", "URL", "URLSearchParams", "ValidityState", "visualViewport", "VisualViewport", "VTTCue", "WaveShaperNode", "WebAssembly", "WebGL2RenderingContext", "WebGLActiveInfo", "WebGLBuffer", "WebGLContextEvent", "WebGLFramebuffer", "WebGLProgram", "WebGLQuery", "WebGLRenderbuffer", "WebGLRenderingContext", "WebGLSampler", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLSync", "WebGLTexture", "WebGLTransformFeedback", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebSocket", "WheelEvent", "window", "Window", "Worker", "WritableStream", "WritableStreamDefaultController", "WritableStreamDefaultWriter", "XMLDocument", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload", "XMLSerializer", "XPathEvaluator", "XPathExpression", "XPathResult", "XSLTProcessor"];
function uniq(array) {
  return array.filter(function filter(element) {
    return element in this ? false : this[element] = true;
  }, /* @__PURE__ */ Object.create(null));
}
function array2TruthyObject(array) {
  return array.reduce(
    function(acc, key) {
      acc[key] = true;
      return acc;
    },
    // Notes that babel will transpile spread operator to Object.assign({}, ...args), which will keep the prototype of Object in merged object,
    // while this result used as Symbol.unscopables, it will make properties in Object.prototype always be escaped from proxy sandbox as unscopables check will look up prototype chain as well,
    // such as hasOwnProperty, toString, valueOf, etc.
    // so we should use Object.create(null) to create a pure object without prototype chain here.
    /* @__PURE__ */ Object.create(null)
  );
}
var cachedGlobalsInBrowser = array2TruthyObject(globalsInBrowser.concat([]));
function isNativeGlobalProp(prop) {
  return prop in cachedGlobalsInBrowser;
}
var rawObjectDefineProperty = Object.defineProperty;
var variableWhiteListInDev = window.__QIANKUN_DEVELOPMENT__ ? [
  // for react hot reload
  // see https://github.com/facebook/create-react-app/blob/66bf7dfc43350249e2f09d138a20840dae8a0a4a/packages/react-error-overlay/src/index.js#L180
  "__REACT_ERROR_OVERLAY_GLOBAL_HOOK__",
  // for react development event issue, see https://github.com/umijs/qiankun/issues/2375
  "event"
] : [];
var globalVariableWhiteList = [
  // FIXME System.js used a indirect call with eval, which would make it scope escape to global
  // To make System.js works well, we write it back to global window temporary
  // see https://github.com/systemjs/systemjs/blob/457f5b7e8af6bd120a279540477552a07d5de086/src/evaluate.js#L106
  "System",
  // see https://github.com/systemjs/systemjs/blob/457f5b7e8af6bd120a279540477552a07d5de086/src/instantiate.js#L357
  "__cjsWrapper"
].concat(variableWhiteListInDev);
var inTest = false;
var accessingSpiedGlobals = ["document", "top", "parent", "eval"];
var overwrittenGlobals = ["window", "self", "globalThis", "hasOwnProperty"].concat([]);
var cachedGlobals = Array.from(new Set(_without.apply(void 0, [globalsInES2015.concat(overwrittenGlobals).concat("requestAnimationFrame")].concat(accessingSpiedGlobals))));
var cachedGlobalObjects = array2TruthyObject(cachedGlobals);
var unscopables = array2TruthyObject(_without.apply(void 0, [cachedGlobals].concat(_toConsumableArray(accessingSpiedGlobals.concat(overwrittenGlobals)))));
var useNativeWindowForBindingsProps = /* @__PURE__ */ new Map([["fetch", true], ["mockDomAPIInBlackList", false]]);
function createFakeWindow(globalContext, speedy) {
  var propertiesWithGetter = /* @__PURE__ */ new Map();
  var fakeWindow = {};
  Object.getOwnPropertyNames(globalContext).filter(function(p) {
    var descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
    return !(descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable);
  }).forEach(function(p) {
    var descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
    if (descriptor) {
      var hasGetter = Object.prototype.hasOwnProperty.call(descriptor, "get");
      if (p === "top" || p === "parent" || p === "self" || p === "window" || // window.document is overwriting in speedy mode
      p === "document" && speedy || inTest) {
        descriptor.configurable = true;
        if (!hasGetter) {
          descriptor.writable = true;
        }
      }
      if (hasGetter) propertiesWithGetter.set(p, true);
      rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
    }
  });
  return {
    fakeWindow,
    propertiesWithGetter
  };
}
var activeSandboxCount = 0;
var ProxySandbox = /* @__PURE__ */ function() {
  function ProxySandbox2(name) {
    var _this = this;
    var globalContext = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
    var opts = arguments.length > 2 ? arguments[2] : void 0;
    _classCallCheck(this, ProxySandbox2);
    this.updatedValueSet = /* @__PURE__ */ new Set();
    this.document = document;
    this.name = void 0;
    this.type = void 0;
    this.proxy = void 0;
    this.sandboxRunning = true;
    this.latestSetProp = null;
    this.globalWhitelistPrevDescriptor = {};
    this.globalContext = void 0;
    this.name = name;
    this.globalContext = globalContext;
    this.type = SandBoxType.Proxy;
    var updatedValueSet = this.updatedValueSet;
    var _ref = opts || {}, speedy = _ref.speedy;
    var _createFakeWindow = createFakeWindow(globalContext, !!speedy), fakeWindow = _createFakeWindow.fakeWindow, propertiesWithGetter = _createFakeWindow.propertiesWithGetter;
    var descriptorTargetMap = /* @__PURE__ */ new Map();
    var proxy = new Proxy(fakeWindow, {
      set: function set(target, p, value) {
        if (_this.sandboxRunning) {
          _this.registerRunningApp(name, proxy);
          if (typeof p === "string" && globalVariableWhiteList.indexOf(p) !== -1) {
            _this.globalWhitelistPrevDescriptor[p] = Object.getOwnPropertyDescriptor(globalContext, p);
            globalContext[p] = value;
          } else {
            if (!target.hasOwnProperty(p) && globalContext.hasOwnProperty(p)) {
              var descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
              var writable = descriptor.writable, configurable = descriptor.configurable, enumerable = descriptor.enumerable, set2 = descriptor.set;
              if (writable || set2) {
                Object.defineProperty(target, p, {
                  configurable,
                  enumerable,
                  writable: true,
                  value
                });
              }
            } else {
              target[p] = value;
            }
          }
          updatedValueSet.add(p);
          _this.latestSetProp = p;
          return true;
        }
        return true;
      },
      get: function get(target, p) {
        _this.registerRunningApp(name, proxy);
        if (p === Symbol.unscopables) return unscopables;
        if (p === "window" || p === "self") {
          return proxy;
        }
        if (p === "globalThis" || inTest) {
          return proxy;
        }
        if (p === "top" || p === "parent" || inTest) {
          if (globalContext === globalContext.parent) {
            return proxy;
          }
          return globalContext[p];
        }
        if (p === "hasOwnProperty") {
          return hasOwnProperty;
        }
        if (p === "document") {
          return _this.document;
        }
        if (p === "eval") {
          return eval;
        }
        if (p === "string" && globalVariableWhiteList.indexOf(p) !== -1) {
          return globalContext[p];
        }
        var actualTarget = propertiesWithGetter.has(p) ? globalContext : p in target ? target : globalContext;
        var value = actualTarget[p];
        if (isPropertyFrozen(actualTarget, p)) {
          return value;
        }
        if (!isNativeGlobalProp(p) && !useNativeWindowForBindingsProps.has(p)) {
          return value;
        }
        var boundTarget = useNativeWindowForBindingsProps.get(p) ? nativeGlobal : globalContext;
        return rebindTarget2Fn(boundTarget, value);
      },
      // trap in operator
      // see https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/constants.js#L12
      has: function has(target, p) {
        return p in cachedGlobalObjects || p in target || p in globalContext;
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, p) {
        if (target.hasOwnProperty(p)) {
          var descriptor = Object.getOwnPropertyDescriptor(target, p);
          descriptorTargetMap.set(p, "target");
          return descriptor;
        }
        if (globalContext.hasOwnProperty(p)) {
          var _descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
          descriptorTargetMap.set(p, "globalContext");
          if (_descriptor && !_descriptor.configurable) {
            _descriptor.configurable = true;
          }
          return _descriptor;
        }
        return void 0;
      },
      // trap to support iterator with sandbox
      ownKeys: function ownKeys(target) {
        return uniq(Reflect.ownKeys(globalContext).concat(Reflect.ownKeys(target)));
      },
      defineProperty: function defineProperty(target, p, attributes) {
        var from = descriptorTargetMap.get(p);
        switch (from) {
          case "globalContext":
            return Reflect.defineProperty(globalContext, p, attributes);
          default:
            return Reflect.defineProperty(target, p, attributes);
        }
      },
      deleteProperty: function deleteProperty(target, p) {
        _this.registerRunningApp(name, proxy);
        if (target.hasOwnProperty(p)) {
          delete target[p];
          updatedValueSet.delete(p);
          return true;
        }
        return true;
      },
      // makes sure `window instanceof Window` returns truthy in micro app
      getPrototypeOf: function getPrototypeOf() {
        return Reflect.getPrototypeOf(globalContext);
      }
    });
    this.proxy = proxy;
    activeSandboxCount++;
    function hasOwnProperty(key) {
      if (this !== proxy && this !== null && _typeof(this) === "object") {
        return Object.prototype.hasOwnProperty.call(this, key);
      }
      return fakeWindow.hasOwnProperty(key) || globalContext.hasOwnProperty(key);
    }
  }
  _createClass(ProxySandbox2, [{
    key: "active",
    value: function active() {
      if (!this.sandboxRunning) activeSandboxCount++;
      this.sandboxRunning = true;
    }
  }, {
    key: "inactive",
    value: function inactive() {
      var _this2 = this;
      if (--activeSandboxCount === 0) {
        Object.keys(this.globalWhitelistPrevDescriptor).forEach(function(p) {
          var descriptor = _this2.globalWhitelistPrevDescriptor[p];
          if (descriptor) {
            Object.defineProperty(_this2.globalContext, p, descriptor);
          } else {
            delete _this2.globalContext[p];
          }
        });
      }
      this.sandboxRunning = false;
    }
  }, {
    key: "patchDocument",
    value: function patchDocument2(doc) {
      this.document = doc;
    }
  }, {
    key: "registerRunningApp",
    value: function registerRunningApp(name, proxy) {
      if (this.sandboxRunning) {
        var currentRunningApp2 = getCurrentRunningApp();
        if (!currentRunningApp2 || currentRunningApp2.name !== name) {
          setCurrentRunningApp({
            name,
            window: proxy
          });
        }
        nextTask(clearCurrentRunningApp);
      }
    }
  }]);
  return ProxySandbox2;
}();
var SCRIPT_TAG_NAME = "SCRIPT";
var LINK_TAG_NAME = "LINK";
var STYLE_TAG_NAME = "STYLE";
var styleElementTargetSymbol = Symbol("target");
var styleElementRefNodeNo = Symbol("refNodeNo");
var overwrittenSymbol = Symbol("qiankun-overwritten");
var getAppWrapperHeadElement = function getAppWrapperHeadElement2(appWrapper) {
  return appWrapper.querySelector(qiankunHeadTagName);
};
function isExecutableScriptType(script) {
  return !script.type || ["text/javascript", "module", "application/javascript", "text/ecmascript", "application/ecmascript"].indexOf(script.type) !== -1;
}
function isHijackingTag(tagName) {
  return (tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase()) === LINK_TAG_NAME || (tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase()) === STYLE_TAG_NAME || (tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase()) === SCRIPT_TAG_NAME;
}
function isStyledComponentsLike(element) {
  var _element$sheet, _getStyledElementCSSR;
  return !element.textContent && (((_element$sheet = element.sheet) === null || _element$sheet === void 0 ? void 0 : _element$sheet.cssRules.length) || ((_getStyledElementCSSR = getStyledElementCSSRules(element)) === null || _getStyledElementCSSR === void 0 ? void 0 : _getStyledElementCSSR.length));
}
var appsCounterMap = /* @__PURE__ */ new Map();
function calcAppCount(appName, calcType, status) {
  var appCount = appsCounterMap.get(appName) || {
    bootstrappingPatchCount: 0,
    mountingPatchCount: 0
  };
  switch (calcType) {
    case "increase":
      appCount["".concat(status, "PatchCount")] += 1;
      break;
    case "decrease":
      if (appCount["".concat(status, "PatchCount")] > 0) {
        appCount["".concat(status, "PatchCount")] -= 1;
      }
      break;
  }
  appsCounterMap.set(appName, appCount);
}
function isAllAppsUnmounted() {
  return Array.from(appsCounterMap.entries()).every(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), _ref2$ = _ref2[1], bpc = _ref2$.bootstrappingPatchCount, mpc = _ref2$.mountingPatchCount;
    return bpc === 0 && mpc === 0;
  });
}
function patchCustomEvent(e, elementGetter) {
  Object.defineProperties(e, {
    srcElement: {
      get: elementGetter
    },
    target: {
      get: elementGetter
    }
  });
  return e;
}
function manualInvokeElementOnLoad(element) {
  var loadEvent = new CustomEvent("load");
  var patchedEvent = patchCustomEvent(loadEvent, function() {
    return element;
  });
  if (_isFunction(element.onload)) {
    element.onload(patchedEvent);
  } else {
    element.dispatchEvent(patchedEvent);
  }
}
function manualInvokeElementOnError(element) {
  var errorEvent = new CustomEvent("error");
  var patchedEvent = patchCustomEvent(errorEvent, function() {
    return element;
  });
  if (_isFunction(element.onerror)) {
    element.onerror(patchedEvent);
  } else {
    element.dispatchEvent(patchedEvent);
  }
}
function convertLinkAsStyle(element, postProcess) {
  var fetchFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fetch;
  var styleElement = document.createElement("style");
  var href = element.href;
  styleElement.dataset.qiankunHref = href;
  fetchFn(href).then(function(res) {
    return res.text();
  }).then(function(styleContext) {
    styleElement.appendChild(document.createTextNode(styleContext));
    postProcess(styleElement);
    manualInvokeElementOnLoad(element);
  }).catch(function() {
    return manualInvokeElementOnError(element);
  });
  return styleElement;
}
var defineNonEnumerableProperty = function defineNonEnumerableProperty2(target, key, value) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value
  });
};
var styledComponentCSSRulesMap = /* @__PURE__ */ new WeakMap();
var dynamicScriptAttachedCommentMap = /* @__PURE__ */ new WeakMap();
var dynamicLinkAttachedInlineStyleMap = /* @__PURE__ */ new WeakMap();
function recordStyledComponentsCSSRules(styleElements) {
  styleElements.forEach(function(styleElement) {
    if (styleElement instanceof HTMLStyleElement && isStyledComponentsLike(styleElement)) {
      if (styleElement.sheet) {
        styledComponentCSSRulesMap.set(styleElement, styleElement.sheet.cssRules);
      }
    }
  });
}
function getStyledElementCSSRules(styledElement) {
  return styledComponentCSSRulesMap.get(styledElement);
}
function getOverwrittenAppendChildOrInsertBefore(opts) {
  function appendChildOrInsertBefore(newChild) {
    var refChild = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var element = newChild;
    var rawDOMAppendOrInsertBefore = opts.rawDOMAppendOrInsertBefore, isInvokedByMicroApp = opts.isInvokedByMicroApp, containerConfigGetter = opts.containerConfigGetter, _opts$target = opts.target, target = _opts$target === void 0 ? "body" : _opts$target;
    if (!isHijackingTag(element.tagName) || !isInvokedByMicroApp(element)) {
      return rawDOMAppendOrInsertBefore.call(this, element, refChild);
    }
    if (element.tagName) {
      var containerConfig = containerConfigGetter(element);
      var appName = containerConfig.appName, appWrapperGetter = containerConfig.appWrapperGetter, proxy = containerConfig.proxy, strictGlobal = containerConfig.strictGlobal, speedySandbox = containerConfig.speedySandbox, dynamicStyleSheetElements = containerConfig.dynamicStyleSheetElements, scopedCSS = containerConfig.scopedCSS, excludeAssetFilter = containerConfig.excludeAssetFilter;
      switch (element.tagName) {
        case LINK_TAG_NAME:
        case STYLE_TAG_NAME: {
          var stylesheetElement = newChild;
          var _stylesheetElement = stylesheetElement, href = _stylesheetElement.href;
          if (excludeAssetFilter && href && excludeAssetFilter(href)) {
            return rawDOMAppendOrInsertBefore.call(this, element, refChild);
          }
          defineNonEnumerableProperty(stylesheetElement, styleElementTargetSymbol, target);
          var appWrapper = appWrapperGetter();
          if (scopedCSS) {
            var _element$tagName;
            var linkElementUsingStylesheet = ((_element$tagName = element.tagName) === null || _element$tagName === void 0 ? void 0 : _element$tagName.toUpperCase()) === LINK_TAG_NAME && element.rel === "stylesheet" && element.href;
            if (linkElementUsingStylesheet) {
              var _frameworkConfigurati;
              var _fetch = typeof frameworkConfiguration.fetch === "function" ? frameworkConfiguration.fetch : (_frameworkConfigurati = frameworkConfiguration.fetch) === null || _frameworkConfigurati === void 0 ? void 0 : _frameworkConfigurati.fn;
              stylesheetElement = convertLinkAsStyle(element, function(styleElement) {
                return process(appWrapper, styleElement, appName);
              }, _fetch);
              dynamicLinkAttachedInlineStyleMap.set(element, stylesheetElement);
            } else {
              process(appWrapper, stylesheetElement, appName);
            }
          }
          var mountDOM = target === "head" ? getAppWrapperHeadElement(appWrapper) : appWrapper;
          var referenceNode = mountDOM.contains(refChild) ? refChild : null;
          var refNo;
          if (referenceNode) {
            refNo = Array.from(mountDOM.childNodes).indexOf(referenceNode);
          }
          var result = rawDOMAppendOrInsertBefore.call(mountDOM, stylesheetElement, referenceNode);
          if (typeof refNo === "number" && refNo !== -1) {
            defineNonEnumerableProperty(stylesheetElement, styleElementRefNodeNo, refNo);
          }
          dynamicStyleSheetElements.push(stylesheetElement);
          return result;
        }
        case SCRIPT_TAG_NAME: {
          var _element = element, src = _element.src, text = _element.text;
          if (excludeAssetFilter && src && excludeAssetFilter(src) || !isExecutableScriptType(element)) {
            return rawDOMAppendOrInsertBefore.call(this, element, refChild);
          }
          var _appWrapper = appWrapperGetter();
          var _mountDOM = target === "head" ? getAppWrapperHeadElement(_appWrapper) : _appWrapper;
          var _fetch2 = frameworkConfiguration.fetch;
          var _referenceNode = _mountDOM.contains(refChild) ? refChild : null;
          var scopedGlobalVariables = speedySandbox ? cachedGlobals : [];
          if (src) {
            var isRedfinedCurrentScript = false;
            _execScripts(null, [src], proxy, {
              fetch: _fetch2,
              strictGlobal,
              scopedGlobalVariables,
              beforeExec: function beforeExec() {
                var isCurrentScriptConfigurable = function isCurrentScriptConfigurable2() {
                  var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
                  return !descriptor || descriptor.configurable;
                };
                if (isCurrentScriptConfigurable()) {
                  Object.defineProperty(document, "currentScript", {
                    get: function get() {
                      return element;
                    },
                    configurable: true
                  });
                  isRedfinedCurrentScript = true;
                }
              },
              success: function success() {
                manualInvokeElementOnLoad(element);
                if (isRedfinedCurrentScript) {
                  delete document.currentScript;
                }
                element = null;
              },
              error: function error() {
                manualInvokeElementOnError(element);
                if (isRedfinedCurrentScript) {
                  delete document.currentScript;
                }
                element = null;
              }
            });
            var dynamicScriptCommentElement = document.createComment("dynamic script ".concat(src, " replaced by qiankun"));
            dynamicScriptAttachedCommentMap.set(element, dynamicScriptCommentElement);
            return rawDOMAppendOrInsertBefore.call(_mountDOM, dynamicScriptCommentElement, _referenceNode);
          }
          _execScripts(null, ["<script>".concat(text, "<\/script>")], proxy, {
            strictGlobal,
            scopedGlobalVariables
          });
          var dynamicInlineScriptCommentElement = document.createComment("dynamic inline script replaced by qiankun");
          dynamicScriptAttachedCommentMap.set(element, dynamicInlineScriptCommentElement);
          return rawDOMAppendOrInsertBefore.call(_mountDOM, dynamicInlineScriptCommentElement, _referenceNode);
        }
      }
    }
    return rawDOMAppendOrInsertBefore.call(this, element, refChild);
  }
  appendChildOrInsertBefore[overwrittenSymbol] = true;
  return appendChildOrInsertBefore;
}
function getNewRemoveChild(rawRemoveChild2, containerConfigGetter, target, isInvokedByMicroApp) {
  function removeChild(child) {
    var tagName = child.tagName;
    if (!isHijackingTag(tagName) || !isInvokedByMicroApp(child)) return rawRemoveChild2.call(this, child);
    try {
      var attachedElement;
      var _containerConfigGette = containerConfigGetter(child), appWrapperGetter = _containerConfigGette.appWrapperGetter, dynamicStyleSheetElements = _containerConfigGette.dynamicStyleSheetElements;
      switch (tagName) {
        case STYLE_TAG_NAME:
        case LINK_TAG_NAME: {
          attachedElement = dynamicLinkAttachedInlineStyleMap.get(child) || child;
          var dynamicElementIndex = dynamicStyleSheetElements.indexOf(attachedElement);
          if (dynamicElementIndex !== -1) {
            dynamicStyleSheetElements.splice(dynamicElementIndex, 1);
          }
          break;
        }
        case SCRIPT_TAG_NAME: {
          attachedElement = dynamicScriptAttachedCommentMap.get(child) || child;
          break;
        }
        default: {
          attachedElement = child;
        }
      }
      var appWrapper = appWrapperGetter();
      var container = target === "head" ? getAppWrapperHeadElement(appWrapper) : appWrapper;
      if (container.contains(attachedElement)) {
        return rawRemoveChild2.call(attachedElement.parentNode, attachedElement);
      }
    } catch (e) {
      console.warn(e);
    }
    return rawRemoveChild2.call(this, child);
  }
  removeChild[overwrittenSymbol] = true;
  return removeChild;
}
function patchHTMLDynamicAppendPrototypeFunctions(isInvokedByMicroApp, containerConfigGetter) {
  var rawHeadAppendChild2 = HTMLHeadElement.prototype.appendChild;
  var rawBodyAppendChild = HTMLBodyElement.prototype.appendChild;
  var rawHeadInsertBefore2 = HTMLHeadElement.prototype.insertBefore;
  if (rawHeadAppendChild2[overwrittenSymbol] !== true && rawBodyAppendChild[overwrittenSymbol] !== true && rawHeadInsertBefore2[overwrittenSymbol] !== true) {
    HTMLHeadElement.prototype.appendChild = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawHeadAppendChild2,
      containerConfigGetter,
      isInvokedByMicroApp,
      target: "head"
    });
    HTMLBodyElement.prototype.appendChild = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawBodyAppendChild,
      containerConfigGetter,
      isInvokedByMicroApp,
      target: "body"
    });
    HTMLHeadElement.prototype.insertBefore = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawHeadInsertBefore2,
      containerConfigGetter,
      isInvokedByMicroApp,
      target: "head"
    });
  }
  var rawHeadRemoveChild = HTMLHeadElement.prototype.removeChild;
  var rawBodyRemoveChild = HTMLBodyElement.prototype.removeChild;
  if (rawHeadRemoveChild[overwrittenSymbol] !== true && rawBodyRemoveChild[overwrittenSymbol] !== true) {
    HTMLHeadElement.prototype.removeChild = getNewRemoveChild(rawHeadRemoveChild, containerConfigGetter, "head", isInvokedByMicroApp);
    HTMLBodyElement.prototype.removeChild = getNewRemoveChild(rawBodyRemoveChild, containerConfigGetter, "body", isInvokedByMicroApp);
  }
  return function unpatch() {
    HTMLHeadElement.prototype.appendChild = rawHeadAppendChild2;
    HTMLHeadElement.prototype.removeChild = rawHeadRemoveChild;
    HTMLBodyElement.prototype.appendChild = rawBodyAppendChild;
    HTMLBodyElement.prototype.removeChild = rawBodyRemoveChild;
    HTMLHeadElement.prototype.insertBefore = rawHeadInsertBefore2;
  };
}
function rebuildCSSRules(styleSheetElements, reAppendElement) {
  styleSheetElements.forEach(function(stylesheetElement) {
    var appendSuccess = reAppendElement(stylesheetElement);
    if (appendSuccess) {
      if (stylesheetElement instanceof HTMLStyleElement && isStyledComponentsLike(stylesheetElement)) {
        var cssRules = getStyledElementCSSRules(stylesheetElement);
        if (cssRules) {
          for (var i = 0; i < cssRules.length; i++) {
            var cssRule = cssRules[i];
            var cssStyleSheetElement = stylesheetElement.sheet;
            cssStyleSheetElement.insertRule(cssRule.cssText, cssStyleSheetElement.cssRules.length);
          }
        }
      }
    }
  });
}
function patchLooseSandbox(appName, appWrapperGetter, sandbox) {
  var mounting = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var scopedCSS = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var excludeAssetFilter = arguments.length > 5 ? arguments[5] : void 0;
  var proxy = sandbox.proxy;
  var dynamicStyleSheetElements = [];
  var unpatchDynamicAppendPrototypeFunctions = patchHTMLDynamicAppendPrototypeFunctions(
    /*
      check if the currently specified application is active
      While we switch page from qiankun app to a normal react routing page, the normal one may load stylesheet dynamically while page rendering,
      but the url change listener must wait until the current call stack is flushed.
      This scenario may cause we record the stylesheet from react routing page dynamic injection,
      and remove them after the url change triggered and qiankun app is unmounting
      see https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js#L222-L230
     */
    function() {
      return Tt(window.location).some(function(name) {
        return name === appName;
      });
    },
    function() {
      return {
        appName,
        appWrapperGetter,
        proxy,
        strictGlobal: false,
        speedySandbox: false,
        scopedCSS,
        dynamicStyleSheetElements,
        excludeAssetFilter
      };
    }
  );
  if (!mounting) calcAppCount(appName, "increase", "bootstrapping");
  if (mounting) calcAppCount(appName, "increase", "mounting");
  return function free() {
    if (!mounting) calcAppCount(appName, "decrease", "bootstrapping");
    if (mounting) calcAppCount(appName, "decrease", "mounting");
    if (isAllAppsUnmounted()) unpatchDynamicAppendPrototypeFunctions();
    recordStyledComponentsCSSRules(dynamicStyleSheetElements);
    return function rebuild() {
      rebuildCSSRules(dynamicStyleSheetElements, function(stylesheetElement) {
        var appWrapper = appWrapperGetter();
        if (!appWrapper.contains(stylesheetElement)) {
          document.head.appendChild.call(appWrapper, stylesheetElement);
          return true;
        }
        return false;
      });
      if (mounting) {
        dynamicStyleSheetElements = [];
      }
    };
  };
}
Object.defineProperty(nativeGlobal, "__proxyAttachContainerConfigMap__", {
  enumerable: false,
  writable: true
});
Object.defineProperty(nativeGlobal, "__currentLockingSandbox__", {
  enumerable: false,
  writable: true,
  configurable: true
});
var rawHeadAppendChild = HTMLHeadElement.prototype.appendChild;
var rawHeadInsertBefore = HTMLHeadElement.prototype.insertBefore;
nativeGlobal.__proxyAttachContainerConfigMap__ = nativeGlobal.__proxyAttachContainerConfigMap__ || /* @__PURE__ */ new WeakMap();
var proxyAttachContainerConfigMap = nativeGlobal.__proxyAttachContainerConfigMap__;
var elementAttachContainerConfigMap = /* @__PURE__ */ new WeakMap();
var docCreatePatchedMap = /* @__PURE__ */ new WeakMap();
var patchMap = /* @__PURE__ */ new WeakMap();
function patchDocument(cfg) {
  var sandbox = cfg.sandbox, speedy = cfg.speedy;
  var attachElementToProxy = function attachElementToProxy2(element, proxy) {
    var proxyContainerConfig = proxyAttachContainerConfigMap.get(proxy);
    if (proxyContainerConfig) {
      elementAttachContainerConfigMap.set(element, proxyContainerConfig);
    }
  };
  if (speedy) {
    var modifications = {};
    var proxyDocument = new Proxy(document, {
      /**
       * Read and write must be paired, otherwise the write operation will leak to the global
       */
      set: function set(target, p, value) {
        switch (p) {
          case "createElement": {
            modifications.createElement = value;
            break;
          }
          case "querySelector": {
            modifications.querySelector = value;
            break;
          }
          default:
            target[p] = value;
            break;
        }
        return true;
      },
      get: function get(target, p, receiver) {
        switch (p) {
          case "createElement": {
            var targetCreateElement = modifications.createElement || target.createElement;
            return function createElement2() {
              if (!nativeGlobal.__currentLockingSandbox__) {
                nativeGlobal.__currentLockingSandbox__ = sandbox.name;
              }
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              var element = targetCreateElement.call.apply(targetCreateElement, [target].concat(args));
              if (nativeGlobal.__currentLockingSandbox__ === sandbox.name) {
                attachElementToProxy(element, sandbox.proxy);
                delete nativeGlobal.__currentLockingSandbox__;
              }
              return element;
            };
          }
          case "querySelector": {
            var targetQuerySelector = modifications.querySelector || target.querySelector;
            return function querySelector() {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              var selector = args[0];
              switch (selector) {
                case "head": {
                  var containerConfig = proxyAttachContainerConfigMap.get(sandbox.proxy);
                  if (containerConfig) {
                    var qiankunHead = getAppWrapperHeadElement(containerConfig.appWrapperGetter());
                    qiankunHead.appendChild = HTMLHeadElement.prototype.appendChild;
                    qiankunHead.insertBefore = HTMLHeadElement.prototype.insertBefore;
                    qiankunHead.removeChild = HTMLHeadElement.prototype.removeChild;
                    return qiankunHead;
                  }
                  break;
                }
              }
              return targetQuerySelector.call.apply(targetQuerySelector, [target].concat(args));
            };
          }
        }
        var value = target[p];
        if (isCallable(value) && !isBoundedFunction(value)) {
          return function proxyFunction() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            return value.call.apply(value, [target].concat(_toConsumableArray(args.map(function(arg) {
              return arg === receiver ? target : arg;
            }))));
          };
        }
        return value;
      }
    });
    sandbox.patchDocument(proxyDocument);
    var nativeMutationObserverObserveFn = MutationObserver.prototype.observe;
    if (!patchMap.has(nativeMutationObserverObserveFn)) {
      var observe = function observe2(target, options) {
        var realTarget = target instanceof Document ? nativeDocument : target;
        return nativeMutationObserverObserveFn.call(this, realTarget, options);
      };
      MutationObserver.prototype.observe = observe;
      patchMap.set(nativeMutationObserverObserveFn, observe);
    }
    var prevCompareDocumentPosition = Node.prototype.compareDocumentPosition;
    if (!patchMap.has(prevCompareDocumentPosition)) {
      Node.prototype.compareDocumentPosition = function compareDocumentPosition(node) {
        var realNode = node instanceof Document ? nativeDocument : node;
        return prevCompareDocumentPosition.call(this, realNode);
      };
      patchMap.set(prevCompareDocumentPosition, Node.prototype.compareDocumentPosition);
    }
    var parentNodeDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode");
    if (parentNodeDescriptor && !patchMap.has(parentNodeDescriptor)) {
      var parentNodeGetter = parentNodeDescriptor.get, configurable = parentNodeDescriptor.configurable;
      if (parentNodeGetter && configurable) {
        var patchedParentNodeDescriptor = _objectSpread2(_objectSpread2({}, parentNodeDescriptor), {}, {
          get: function get() {
            var parentNode = parentNodeGetter.call(this);
            if (parentNode instanceof Document) {
              var _getCurrentRunningApp;
              var proxy = (_getCurrentRunningApp = getCurrentRunningApp()) === null || _getCurrentRunningApp === void 0 ? void 0 : _getCurrentRunningApp.window;
              if (proxy) {
                return proxy.document;
              }
            }
            return parentNode;
          }
        });
        Object.defineProperty(Node.prototype, "parentNode", patchedParentNodeDescriptor);
        patchMap.set(parentNodeDescriptor, patchedParentNodeDescriptor);
      }
    }
    return function() {
      MutationObserver.prototype.observe = nativeMutationObserverObserveFn;
      patchMap.delete(nativeMutationObserverObserveFn);
      Node.prototype.compareDocumentPosition = prevCompareDocumentPosition;
      patchMap.delete(prevCompareDocumentPosition);
      if (parentNodeDescriptor) {
        Object.defineProperty(Node.prototype, "parentNode", parentNodeDescriptor);
        patchMap.delete(parentNodeDescriptor);
      }
    };
  }
  var docCreateElementFnBeforeOverwrite = docCreatePatchedMap.get(document.createElement);
  if (!docCreateElementFnBeforeOverwrite) {
    var rawDocumentCreateElement = document.createElement;
    Document.prototype.createElement = function createElement2(tagName, options) {
      var element = rawDocumentCreateElement.call(this, tagName, options);
      if (isHijackingTag(tagName)) {
        var _ref = getCurrentRunningApp() || {}, currentRunningSandboxProxy = _ref.window;
        if (currentRunningSandboxProxy) {
          attachElementToProxy(element, currentRunningSandboxProxy);
        }
      }
      return element;
    };
    if (document.hasOwnProperty("createElement")) {
      document.createElement = Document.prototype.createElement;
    }
    docCreatePatchedMap.set(Document.prototype.createElement, rawDocumentCreateElement);
  }
  return function unpatch() {
    if (docCreateElementFnBeforeOverwrite) {
      Document.prototype.createElement = docCreateElementFnBeforeOverwrite;
      document.createElement = docCreateElementFnBeforeOverwrite;
    }
  };
}
function patchStrictSandbox(appName, appWrapperGetter, sandbox) {
  var mounting = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var scopedCSS = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var excludeAssetFilter = arguments.length > 5 ? arguments[5] : void 0;
  var speedySandbox = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false;
  var proxy = sandbox.proxy;
  var containerConfig = proxyAttachContainerConfigMap.get(proxy);
  if (!containerConfig) {
    containerConfig = {
      appName,
      proxy,
      appWrapperGetter,
      dynamicStyleSheetElements: [],
      strictGlobal: true,
      speedySandbox,
      excludeAssetFilter,
      scopedCSS
    };
    proxyAttachContainerConfigMap.set(proxy, containerConfig);
  }
  var _containerConfig = containerConfig, dynamicStyleSheetElements = _containerConfig.dynamicStyleSheetElements;
  var unpatchDynamicAppendPrototypeFunctions = patchHTMLDynamicAppendPrototypeFunctions(function(element) {
    return elementAttachContainerConfigMap.has(element);
  }, function(element) {
    return elementAttachContainerConfigMap.get(element);
  });
  var unpatchDocument = patchDocument({
    sandbox,
    speedy: speedySandbox
  });
  if (!mounting) calcAppCount(appName, "increase", "bootstrapping");
  if (mounting) calcAppCount(appName, "increase", "mounting");
  return function free() {
    if (!mounting) calcAppCount(appName, "decrease", "bootstrapping");
    if (mounting) calcAppCount(appName, "decrease", "mounting");
    if (isAllAppsUnmounted()) {
      unpatchDynamicAppendPrototypeFunctions();
      unpatchDocument();
    }
    recordStyledComponentsCSSRules(dynamicStyleSheetElements);
    return function rebuild() {
      rebuildCSSRules(dynamicStyleSheetElements, function(stylesheetElement) {
        var appWrapper = appWrapperGetter();
        if (!appWrapper.contains(stylesheetElement)) {
          var mountDom = stylesheetElement[styleElementTargetSymbol] === "head" ? getAppWrapperHeadElement(appWrapper) : appWrapper;
          var refNo = stylesheetElement[styleElementRefNodeNo];
          if (typeof refNo === "number" && refNo !== -1) {
            var refNode = mountDom.childNodes[refNo] || null;
            rawHeadInsertBefore.call(mountDom, stylesheetElement, refNode);
            return true;
          } else {
            rawHeadAppendChild.call(mountDom, stylesheetElement);
            return true;
          }
        }
        return false;
      });
    };
  };
}
function patch$2() {
  var rawHistoryListen = function rawHistoryListen2(_) {
    return _noop;
  };
  var historyListeners = [];
  var historyUnListens = [];
  if (window.g_history && _isFunction(window.g_history.listen)) {
    rawHistoryListen = window.g_history.listen.bind(window.g_history);
    window.g_history.listen = function(listener) {
      historyListeners.push(listener);
      var unListen = rawHistoryListen(listener);
      historyUnListens.push(unListen);
      return function() {
        unListen();
        historyUnListens.splice(historyUnListens.indexOf(unListen), 1);
        historyListeners.splice(historyListeners.indexOf(listener), 1);
      };
    };
  }
  return function free() {
    var rebuild = _noop;
    if (historyListeners.length) {
      rebuild = function rebuild2() {
        historyListeners.forEach(function(listener) {
          return window.g_history.listen(listener);
        });
      };
    }
    historyUnListens.forEach(function(unListen) {
      return unListen();
    });
    if (window.g_history && _isFunction(window.g_history.listen)) {
      window.g_history.listen = rawHistoryListen;
    }
    return rebuild;
  };
}
var rawWindowInterval = window.setInterval;
var rawWindowClearInterval = window.clearInterval;
function patch$1(global) {
  var intervals = [];
  global.clearInterval = function(intervalId) {
    intervals = intervals.filter(function(id) {
      return id !== intervalId;
    });
    return rawWindowClearInterval.call(window, intervalId);
  };
  global.setInterval = function(handler, timeout) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    var intervalId = rawWindowInterval.apply(void 0, [handler, timeout].concat(args));
    intervals = [].concat(_toConsumableArray(intervals), [intervalId]);
    return intervalId;
  };
  return function free() {
    intervals.forEach(function(id) {
      return global.clearInterval(id);
    });
    global.setInterval = rawWindowInterval;
    global.clearInterval = rawWindowClearInterval;
    return _noop;
  };
}
var rawAddEventListener = window.addEventListener;
var rawRemoveEventListener = window.removeEventListener;
function patch(global) {
  var listenerMap = /* @__PURE__ */ new Map();
  global.addEventListener = function(type, listener, options) {
    var listeners = listenerMap.get(type) || [];
    listenerMap.set(type, [].concat(_toConsumableArray(listeners), [listener]));
    return rawAddEventListener.call(window, type, listener, options);
  };
  global.removeEventListener = function(type, listener, options) {
    var storedTypeListeners = listenerMap.get(type);
    if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listener) !== -1) {
      storedTypeListeners.splice(storedTypeListeners.indexOf(listener), 1);
    }
    return rawRemoveEventListener.call(window, type, listener, options);
  };
  return function free() {
    listenerMap.forEach(function(listeners, type) {
      return _toConsumableArray(listeners).forEach(function(listener) {
        return global.removeEventListener(type, listener);
      });
    });
    global.addEventListener = rawAddEventListener;
    global.removeEventListener = rawRemoveEventListener;
    return _noop;
  };
}
function patchAtMounting(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox) {
  var _patchersInSandbox$sa;
  var basePatchers = [function() {
    return patch$1(sandbox.proxy);
  }, function() {
    return patch(sandbox.proxy);
  }, function() {
    return patch$2();
  }];
  var patchersInSandbox = _defineProperty(_defineProperty(_defineProperty({}, SandBoxType.LegacyProxy, [].concat(basePatchers, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, true, scopedCSS, excludeAssetFilter);
  }])), SandBoxType.Proxy, [].concat(basePatchers, [function() {
    return patchStrictSandbox(appName, elementGetter, sandbox, true, scopedCSS, excludeAssetFilter, speedySandBox);
  }])), SandBoxType.Snapshot, [].concat(basePatchers, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, true, scopedCSS, excludeAssetFilter);
  }]));
  return (_patchersInSandbox$sa = patchersInSandbox[sandbox.type]) === null || _patchersInSandbox$sa === void 0 ? void 0 : _patchersInSandbox$sa.map(function(patch2) {
    return patch2();
  });
}
function patchAtBootstrapping(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox) {
  var _patchersInSandbox$sa2;
  var patchersInSandbox = _defineProperty(_defineProperty(_defineProperty({}, SandBoxType.LegacyProxy, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, false, scopedCSS, excludeAssetFilter);
  }]), SandBoxType.Proxy, [function() {
    return patchStrictSandbox(appName, elementGetter, sandbox, false, scopedCSS, excludeAssetFilter, speedySandBox);
  }]), SandBoxType.Snapshot, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, false, scopedCSS, excludeAssetFilter);
  }]);
  return (_patchersInSandbox$sa2 = patchersInSandbox[sandbox.type]) === null || _patchersInSandbox$sa2 === void 0 ? void 0 : _patchersInSandbox$sa2.map(function(patch2) {
    return patch2();
  });
}
function iter(obj, callbackFn) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) || prop === "clearInterval") {
      callbackFn(prop);
    }
  }
}
var SnapshotSandbox = /* @__PURE__ */ function() {
  function SnapshotSandbox2(name) {
    _classCallCheck(this, SnapshotSandbox2);
    this.proxy = void 0;
    this.name = void 0;
    this.type = void 0;
    this.sandboxRunning = true;
    this.windowSnapshot = void 0;
    this.modifyPropsMap = {};
    this.name = name;
    this.proxy = window;
    this.type = SandBoxType.Snapshot;
  }
  _createClass(SnapshotSandbox2, [{
    key: "active",
    value: function active() {
      var _this = this;
      this.windowSnapshot = {};
      iter(window, function(prop) {
        _this.windowSnapshot[prop] = window[prop];
      });
      Object.keys(this.modifyPropsMap).forEach(function(p) {
        window[p] = _this.modifyPropsMap[p];
      });
      this.sandboxRunning = true;
    }
  }, {
    key: "inactive",
    value: function inactive() {
      var _this2 = this;
      this.modifyPropsMap = {};
      iter(window, function(prop) {
        if (window[prop] !== _this2.windowSnapshot[prop]) {
          _this2.modifyPropsMap[prop] = window[prop];
          window[prop] = _this2.windowSnapshot[prop];
        }
      });
      this.sandboxRunning = false;
    }
  }, {
    key: "patchDocument",
    value: function patchDocument2() {
    }
  }]);
  return SnapshotSandbox2;
}();
function createSandboxContainer(appName, elementGetter, scopedCSS, useLooseSandbox, excludeAssetFilter, globalContext, speedySandBox) {
  var sandbox;
  if (window.Proxy) {
    sandbox = useLooseSandbox ? new LegacySandbox(appName, globalContext) : new ProxySandbox(appName, globalContext, {
      speedy: !!speedySandBox
    });
  } else {
    sandbox = new SnapshotSandbox(appName);
  }
  var bootstrappingFreers = patchAtBootstrapping(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox);
  var mountingFreers = [];
  var sideEffectsRebuilders = [];
  return {
    instance: sandbox,
    /**
     * 沙箱被 mount
     * 可能是从 bootstrap 状态进入的 mount
     * 也可能是从 unmount 之后再次唤醒进入 mount
     */
    mount: function mount() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee() {
        var sideEffectsRebuildersAtBootstrapping, sideEffectsRebuildersAtMounting;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              sandbox.active();
              sideEffectsRebuildersAtBootstrapping = sideEffectsRebuilders.slice(0, bootstrappingFreers.length);
              sideEffectsRebuildersAtMounting = sideEffectsRebuilders.slice(bootstrappingFreers.length);
              if (sideEffectsRebuildersAtBootstrapping.length) {
                sideEffectsRebuildersAtBootstrapping.forEach(function(rebuild) {
                  return rebuild();
                });
              }
              mountingFreers = patchAtMounting(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox);
              if (sideEffectsRebuildersAtMounting.length) {
                sideEffectsRebuildersAtMounting.forEach(function(rebuild) {
                  return rebuild();
                });
              }
              sideEffectsRebuilders = [];
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    /**
     * 恢复 global 状态，使其能回到应用加载之前的状态
     */
    unmount: function unmount() {
      return _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              sideEffectsRebuilders = [].concat(_toConsumableArray(bootstrappingFreers), _toConsumableArray(mountingFreers)).map(function(free) {
                return free();
              });
              sandbox.inactive();
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  };
}
var _excluded$1 = ["singular", "sandbox", "excludeAssetFilter", "globalContext"];
function assertElementExist(element, msg) {
  if (!element) {
    if (msg) {
      throw new QiankunError(msg);
    }
    throw new QiankunError("element not existed!");
  }
}
function execHooksChain(hooks, app) {
  var global = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window;
  if (hooks.length) {
    return hooks.reduce(function(chain, hook) {
      return chain.then(function() {
        return hook(app, global);
      });
    }, Promise.resolve());
  }
  return Promise.resolve();
}
function validateSingularMode(_x, _x2) {
  return _validateSingularMode.apply(this, arguments);
}
function _validateSingularMode() {
  _validateSingularMode = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee(validate, app) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", typeof validate === "function" ? validate(app) : !!validate);
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _validateSingularMode.apply(this, arguments);
}
var supportShadowDOM = !!document.head.attachShadow || !!document.head.createShadowRoot;
function createElement(appContent, strictStyleIsolation, scopedCSS, appInstanceId) {
  var containerElement = document.createElement("div");
  containerElement.innerHTML = appContent;
  var appElement = containerElement.firstChild;
  if (strictStyleIsolation) {
    if (!supportShadowDOM) {
      console.warn("[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!");
    } else {
      var innerHTML = appElement.innerHTML;
      appElement.innerHTML = "";
      var shadow;
      if (appElement.attachShadow) {
        shadow = appElement.attachShadow({
          mode: "open"
        });
      } else {
        shadow = appElement.createShadowRoot();
      }
      shadow.innerHTML = innerHTML;
    }
  }
  if (scopedCSS) {
    var attr = appElement.getAttribute(QiankunCSSRewriteAttr);
    if (!attr) {
      appElement.setAttribute(QiankunCSSRewriteAttr, appInstanceId);
    }
    var styleNodes = appElement.querySelectorAll("style") || [];
    _forEach(styleNodes, function(stylesheetElement) {
      process(appElement, stylesheetElement, appInstanceId);
    });
  }
  return appElement;
}
function getAppWrapperGetter(appInstanceId, useLegacyRender, strictStyleIsolation, scopedCSS, elementGetter) {
  return function() {
    if (useLegacyRender) {
      if (strictStyleIsolation) throw new QiankunError("strictStyleIsolation can not be used with legacy render!");
      if (scopedCSS) throw new QiankunError("experimentalStyleIsolation can not be used with legacy render!");
      var appWrapper = document.getElementById(getWrapperId(appInstanceId));
      assertElementExist(appWrapper, "Wrapper element for ".concat(appInstanceId, " is not existed!"));
      return appWrapper;
    }
    var element = elementGetter();
    assertElementExist(element, "Wrapper element for ".concat(appInstanceId, " is not existed!"));
    if (strictStyleIsolation && supportShadowDOM) {
      return element.shadowRoot;
    }
    return element;
  };
}
var rawAppendChild = HTMLElement.prototype.appendChild;
var rawRemoveChild = HTMLElement.prototype.removeChild;
function getRender(appInstanceId, appContent, legacyRender) {
  var render = function render2(_ref, phase) {
    var element = _ref.element, loading = _ref.loading, container = _ref.container;
    if (legacyRender) {
      return legacyRender({
        loading,
        appContent: element ? appContent : ""
      });
    }
    var containerElement = getContainer(container);
    if (phase !== "unmounted") {
      var errorMsg = function() {
        switch (phase) {
          case "loading":
          case "mounting":
            return "Target container with ".concat(container, " not existed while ").concat(appInstanceId, " ").concat(phase, "!");
          case "mounted":
            return "Target container with ".concat(container, " not existed after ").concat(appInstanceId, " ").concat(phase, "!");
          default:
            return "Target container with ".concat(container, " not existed while ").concat(appInstanceId, " rendering!");
        }
      }();
      assertElementExist(containerElement, errorMsg);
    }
    if (containerElement && !containerElement.contains(element)) {
      while (containerElement.firstChild) {
        rawRemoveChild.call(containerElement, containerElement.firstChild);
      }
      if (element) {
        rawAppendChild.call(containerElement, element);
      }
    }
    return void 0;
  };
  return render;
}
function getLifecyclesFromExports(scriptExports, appName, global, globalLatestSetProp) {
  if (validateExportLifecycle(scriptExports)) {
    return scriptExports;
  }
  if (globalLatestSetProp) {
    var lifecycles = global[globalLatestSetProp];
    if (validateExportLifecycle(lifecycles)) {
      return lifecycles;
    }
  }
  var globalVariableExports = global[appName];
  if (validateExportLifecycle(globalVariableExports)) {
    return globalVariableExports;
  }
  throw new QiankunError("You need to export lifecycle functions in ".concat(appName, " entry"));
}
var prevAppUnmountedDeferred;
function loadApp(_x3) {
  return _loadApp.apply(this, arguments);
}
function _loadApp() {
  _loadApp = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee17(app) {
    var _sandboxContainer, _sandboxContainer$ins;
    var configuration, lifeCycles, entry, appName, appInstanceId, _configuration$singul, singular, _configuration$sandbo, sandbox, excludeAssetFilter, _configuration$global, globalContext, importEntryOpts, _yield$importEntry, template, execScripts, assetPublicPath, getExternalScripts, appContent, strictStyleIsolation, scopedCSS, initialAppWrapperElement, initialContainer, legacyRender, render, initialAppWrapperGetter, global, mountSandbox, unmountSandbox, useLooseSandbox, speedySandbox, sandboxContainer, _mergeWith, _mergeWith$beforeUnmo, beforeUnmount, _mergeWith$afterUnmou, afterUnmount, _mergeWith$afterMount, afterMount, _mergeWith$beforeMoun, beforeMount, _mergeWith$beforeLoad, beforeLoad, scriptExports, _getLifecyclesFromExp, bootstrap, mount, unmount, update, _getMicroAppStateActi, onGlobalStateChange, setGlobalState, offGlobalStateChange, syncAppWrapperElement2Sandbox, parcelConfigGetter, _args17 = arguments;
    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          configuration = _args17.length > 1 && _args17[1] !== void 0 ? _args17[1] : {};
          lifeCycles = _args17.length > 2 ? _args17[2] : void 0;
          entry = app.entry, appName = app.name;
          appInstanceId = genAppInstanceIdByName(appName);
          _configuration$singul = configuration.singular, singular = _configuration$singul === void 0 ? false : _configuration$singul, _configuration$sandbo = configuration.sandbox, sandbox = _configuration$sandbo === void 0 ? true : _configuration$sandbo, excludeAssetFilter = configuration.excludeAssetFilter, _configuration$global = configuration.globalContext, globalContext = _configuration$global === void 0 ? window : _configuration$global, importEntryOpts = _objectWithoutProperties(configuration, _excluded$1);
          _context17.next = 9;
          return importEntry(entry, importEntryOpts);
        case 9:
          _yield$importEntry = _context17.sent;
          template = _yield$importEntry.template;
          execScripts = _yield$importEntry.execScripts;
          assetPublicPath = _yield$importEntry.assetPublicPath;
          getExternalScripts = _yield$importEntry.getExternalScripts;
          _context17.next = 16;
          return getExternalScripts();
        case 16:
          _context17.next = 18;
          return validateSingularMode(singular, app);
        case 18:
          if (!_context17.sent) {
            _context17.next = 21;
            break;
          }
          _context17.next = 21;
          return prevAppUnmountedDeferred && prevAppUnmountedDeferred.promise;
        case 21:
          appContent = getDefaultTplWrapper(appInstanceId, sandbox)(template);
          strictStyleIsolation = _typeof(sandbox) === "object" && !!sandbox.strictStyleIsolation;
          scopedCSS = isEnableScopedCSS(sandbox);
          initialAppWrapperElement = createElement(appContent, strictStyleIsolation, scopedCSS, appInstanceId);
          initialContainer = "container" in app ? app.container : void 0;
          legacyRender = "render" in app ? app.render : void 0;
          render = getRender(appInstanceId, appContent, legacyRender);
          render({
            element: initialAppWrapperElement,
            loading: true,
            container: initialContainer
          }, "loading");
          initialAppWrapperGetter = getAppWrapperGetter(appInstanceId, !!legacyRender, strictStyleIsolation, scopedCSS, function() {
            return initialAppWrapperElement;
          });
          global = globalContext;
          mountSandbox = function mountSandbox2() {
            return Promise.resolve();
          };
          unmountSandbox = function unmountSandbox2() {
            return Promise.resolve();
          };
          useLooseSandbox = _typeof(sandbox) === "object" && !!sandbox.loose;
          speedySandbox = _typeof(sandbox) === "object" ? sandbox.speedy !== false : true;
          if (sandbox) {
            sandboxContainer = createSandboxContainer(
              appInstanceId,
              // FIXME should use a strict sandbox logic while remount, see https://github.com/umijs/qiankun/issues/518
              initialAppWrapperGetter,
              scopedCSS,
              useLooseSandbox,
              excludeAssetFilter,
              global,
              speedySandbox
            );
            global = sandboxContainer.instance.proxy;
            mountSandbox = sandboxContainer.mount;
            unmountSandbox = sandboxContainer.unmount;
          }
          _mergeWith = _mergeWith2({}, getAddOns(global, assetPublicPath), lifeCycles, function(v1, v2) {
            return _concat(v1 !== null && v1 !== void 0 ? v1 : [], v2 !== null && v2 !== void 0 ? v2 : []);
          }), _mergeWith$beforeUnmo = _mergeWith.beforeUnmount, beforeUnmount = _mergeWith$beforeUnmo === void 0 ? [] : _mergeWith$beforeUnmo, _mergeWith$afterUnmou = _mergeWith.afterUnmount, afterUnmount = _mergeWith$afterUnmou === void 0 ? [] : _mergeWith$afterUnmou, _mergeWith$afterMount = _mergeWith.afterMount, afterMount = _mergeWith$afterMount === void 0 ? [] : _mergeWith$afterMount, _mergeWith$beforeMoun = _mergeWith.beforeMount, beforeMount = _mergeWith$beforeMoun === void 0 ? [] : _mergeWith$beforeMoun, _mergeWith$beforeLoad = _mergeWith.beforeLoad, beforeLoad = _mergeWith$beforeLoad === void 0 ? [] : _mergeWith$beforeLoad;
          _context17.next = 40;
          return execHooksChain(toArray(beforeLoad), app, global);
        case 40:
          _context17.next = 42;
          return execScripts(global, sandbox && !useLooseSandbox, {
            scopedGlobalVariables: speedySandbox ? cachedGlobals : []
          });
        case 42:
          scriptExports = _context17.sent;
          _getLifecyclesFromExp = getLifecyclesFromExports(scriptExports, appName, global, (_sandboxContainer = sandboxContainer) === null || _sandboxContainer === void 0 ? void 0 : (_sandboxContainer$ins = _sandboxContainer.instance) === null || _sandboxContainer$ins === void 0 ? void 0 : _sandboxContainer$ins.latestSetProp), bootstrap = _getLifecyclesFromExp.bootstrap, mount = _getLifecyclesFromExp.mount, unmount = _getLifecyclesFromExp.unmount, update = _getLifecyclesFromExp.update;
          _getMicroAppStateActi = getMicroAppStateActions(appInstanceId), onGlobalStateChange = _getMicroAppStateActi.onGlobalStateChange, setGlobalState = _getMicroAppStateActi.setGlobalState, offGlobalStateChange = _getMicroAppStateActi.offGlobalStateChange;
          syncAppWrapperElement2Sandbox = function syncAppWrapperElement2Sandbox2(element) {
            return initialAppWrapperElement = element;
          };
          parcelConfigGetter = function parcelConfigGetter2() {
            var remountContainer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialContainer;
            var appWrapperElement;
            var appWrapperGetter;
            var parcelConfig = {
              name: appInstanceId,
              bootstrap,
              mount: [
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2() {
                  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                })),
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee3() {
                  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return validateSingularMode(singular, app);
                      case 2:
                        _context3.t0 = _context3.sent;
                        if (!_context3.t0) {
                          _context3.next = 5;
                          break;
                        }
                        _context3.t0 = prevAppUnmountedDeferred;
                      case 5:
                        if (!_context3.t0) {
                          _context3.next = 7;
                          break;
                        }
                        return _context3.abrupt("return", prevAppUnmountedDeferred.promise);
                      case 7:
                        return _context3.abrupt("return", void 0);
                      case 8:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                })),
                // initial wrapper element before app mount/remount
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee4() {
                  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        appWrapperElement = initialAppWrapperElement;
                        appWrapperGetter = getAppWrapperGetter(appInstanceId, !!legacyRender, strictStyleIsolation, scopedCSS, function() {
                          return appWrapperElement;
                        });
                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                })),
                // 添加 mount hook, 确保每次应用加载前容器 dom 结构已经设置完毕
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee5() {
                  var useNewContainer;
                  return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        useNewContainer = remountContainer !== initialContainer;
                        if (useNewContainer || !appWrapperElement) {
                          appWrapperElement = createElement(appContent, strictStyleIsolation, scopedCSS, appInstanceId);
                          syncAppWrapperElement2Sandbox(appWrapperElement);
                        }
                        render({
                          element: appWrapperElement,
                          loading: true,
                          container: remountContainer
                        }, "mounting");
                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                })),
                mountSandbox,
                // exec the chain after rendering to keep the behavior with beforeLoad
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee6() {
                  return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        return _context6.abrupt("return", execHooksChain(toArray(beforeMount), app, global));
                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                })),
                /* @__PURE__ */ function() {
                  var _ref7 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee7(props) {
                    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) switch (_context7.prev = _context7.next) {
                        case 0:
                          return _context7.abrupt("return", mount(_objectSpread2(_objectSpread2({}, props), {}, {
                            container: appWrapperGetter(),
                            setGlobalState,
                            onGlobalStateChange
                          })));
                        case 1:
                        case "end":
                          return _context7.stop();
                      }
                    }, _callee7);
                  }));
                  return function(_x4) {
                    return _ref7.apply(this, arguments);
                  };
                }(),
                // finish loading after app mounted
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee8() {
                  return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        return _context8.abrupt("return", render({
                          element: appWrapperElement,
                          loading: false,
                          container: remountContainer
                        }, "mounted"));
                      case 1:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                })),
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee9() {
                  return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        return _context9.abrupt("return", execHooksChain(toArray(afterMount), app, global));
                      case 1:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                })),
                // initialize the unmount defer after app mounted and resolve the defer after it unmounted
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee10() {
                  return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return validateSingularMode(singular, app);
                      case 2:
                        if (!_context10.sent) {
                          _context10.next = 4;
                          break;
                        }
                        prevAppUnmountedDeferred = new Deferred();
                      case 4:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                })),
                /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee11() {
                  return _regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                      case 1:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11);
                }))
              ],
              unmount: [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee12() {
                return _regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) switch (_context12.prev = _context12.next) {
                    case 0:
                      return _context12.abrupt("return", execHooksChain(toArray(beforeUnmount), app, global));
                    case 1:
                    case "end":
                      return _context12.stop();
                  }
                }, _callee12);
              })), /* @__PURE__ */ function() {
                var _ref13 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee13(props) {
                  return _regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        return _context13.abrupt("return", unmount(_objectSpread2(_objectSpread2({}, props), {}, {
                          container: appWrapperGetter()
                        })));
                      case 1:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13);
                }));
                return function(_x5) {
                  return _ref13.apply(this, arguments);
                };
              }(), unmountSandbox, /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee14() {
                return _regeneratorRuntime.wrap(function _callee14$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      return _context14.abrupt("return", execHooksChain(toArray(afterUnmount), app, global));
                    case 1:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee14);
              })), /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee15() {
                return _regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      render({
                        element: null,
                        loading: false,
                        container: remountContainer
                      }, "unmounted");
                      offGlobalStateChange(appInstanceId);
                      appWrapperElement = null;
                      syncAppWrapperElement2Sandbox(appWrapperElement);
                    case 4:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15);
              })), /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee16() {
                return _regeneratorRuntime.wrap(function _callee16$(_context16) {
                  while (1) switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.next = 2;
                      return validateSingularMode(singular, app);
                    case 2:
                      _context16.t0 = _context16.sent;
                      if (!_context16.t0) {
                        _context16.next = 5;
                        break;
                      }
                      _context16.t0 = prevAppUnmountedDeferred;
                    case 5:
                      if (!_context16.t0) {
                        _context16.next = 7;
                        break;
                      }
                      prevAppUnmountedDeferred.resolve();
                    case 7:
                    case "end":
                      return _context16.stop();
                  }
                }, _callee16);
              }))]
            };
            if (typeof update === "function") {
              parcelConfig.update = update;
            }
            return parcelConfig;
          };
          return _context17.abrupt("return", parcelConfigGetter);
        case 48:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _loadApp.apply(this, arguments);
}
function idleCall(cb, start2) {
  cb({
    didTimeout: false,
    timeRemaining: function timeRemaining() {
      return Math.max(0, 50 - (Date.now() - start2));
    }
  });
}
var requestIdleCallback;
if (typeof window.requestIdleCallback !== "undefined") {
  requestIdleCallback = window.requestIdleCallback;
} else if (typeof window.MessageChannel !== "undefined") {
  var channel = new MessageChannel();
  var port = channel.port2;
  var tasks = [];
  channel.port1.onmessage = function(_ref) {
    var data = _ref.data;
    var task = tasks.shift();
    if (!task) {
      return;
    }
    idleCall(task, data.start);
  };
  requestIdleCallback = function requestIdleCallback2(cb) {
    tasks.push(cb);
    port.postMessage({
      start: Date.now()
    });
  };
} else {
  requestIdleCallback = function requestIdleCallback2(cb) {
    return setTimeout(idleCall, 0, cb, Date.now());
  };
}
var isSlowNetwork = navigator.connection ? navigator.connection.saveData || navigator.connection.type !== "wifi" && navigator.connection.type !== "ethernet" && /([23])g/.test(navigator.connection.effectiveType) : false;
function prefetch(entry, opts) {
  if (!navigator.onLine || isSlowNetwork) {
    return;
  }
  requestIdleCallback(/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee() {
    var _yield$importEntry, getExternalScripts, getExternalStyleSheets;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return importEntry(entry, opts);
        case 2:
          _yield$importEntry = _context.sent;
          getExternalScripts = _yield$importEntry.getExternalScripts;
          getExternalStyleSheets = _yield$importEntry.getExternalStyleSheets;
          requestIdleCallback(getExternalStyleSheets);
          requestIdleCallback(getExternalScripts);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
}
function prefetchAfterFirstMounted(apps, opts) {
  window.addEventListener("single-spa:first-mount", function listener() {
    var notLoadedApps = apps.filter(function(app) {
      return Ot(app.name) === l;
    });
    notLoadedApps.forEach(function(_ref3) {
      var entry = _ref3.entry;
      return prefetch(entry, opts);
    });
    window.removeEventListener("single-spa:first-mount", listener);
  });
}
function prefetchImmediately(apps, opts) {
  apps.forEach(function(_ref4) {
    var entry = _ref4.entry;
    return prefetch(entry, opts);
  });
}
function doPrefetchStrategy(apps, prefetchStrategy, importEntryOpts) {
  var appsName2Apps = function appsName2Apps2(names) {
    return apps.filter(function(app) {
      return names.includes(app.name);
    });
  };
  if (Array.isArray(prefetchStrategy)) {
    prefetchAfterFirstMounted(appsName2Apps(prefetchStrategy), importEntryOpts);
  } else if (_isFunction(prefetchStrategy)) {
    _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2() {
      var _yield$prefetchStrate, _yield$prefetchStrate2, criticalAppNames, _yield$prefetchStrate3, minorAppsName;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return prefetchStrategy(apps);
          case 2:
            _yield$prefetchStrate = _context2.sent;
            _yield$prefetchStrate2 = _yield$prefetchStrate.criticalAppNames;
            criticalAppNames = _yield$prefetchStrate2 === void 0 ? [] : _yield$prefetchStrate2;
            _yield$prefetchStrate3 = _yield$prefetchStrate.minorAppsName;
            minorAppsName = _yield$prefetchStrate3 === void 0 ? [] : _yield$prefetchStrate3;
            prefetchImmediately(appsName2Apps(criticalAppNames), importEntryOpts);
            prefetchAfterFirstMounted(appsName2Apps(minorAppsName), importEntryOpts);
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  } else {
    switch (prefetchStrategy) {
      case true:
        prefetchAfterFirstMounted(apps, importEntryOpts);
        break;
      case "all":
        prefetchImmediately(apps, importEntryOpts);
        break;
    }
  }
}
var _excluded = ["name", "activeRule", "loader", "props"], _excluded2 = ["mount"], _excluded3 = ["prefetch", "urlRerouteOnly"];
var microApps = [];
var frameworkConfiguration = {};
var defaultUrlRerouteOnly = true;
var frameworkStartedDefer = new Deferred();
var autoDowngradeForLowVersionBrowser = function autoDowngradeForLowVersionBrowser2(configuration) {
  var _configuration$sandbo = configuration.sandbox, sandbox = _configuration$sandbo === void 0 ? true : _configuration$sandbo, singular = configuration.singular;
  if (sandbox) {
    if (!window.Proxy) {
      console.warn("[qiankun] Missing window.Proxy, proxySandbox will degenerate into snapshotSandbox");
      if (singular === false) {
        console.warn("[qiankun] Setting singular as false may cause unexpected behavior while your browser not support window.Proxy");
      }
      return _objectSpread2(_objectSpread2({}, configuration), {}, {
        sandbox: _typeof(sandbox) === "object" ? _objectSpread2(_objectSpread2({}, sandbox), {}, {
          loose: true
        }) : {
          loose: true
        }
      });
    }
    if (!isConstDestructAssignmentSupported() && (sandbox === true || _typeof(sandbox) === "object" && sandbox.speedy !== false)) {
      console.warn("[qiankun] Speedy mode will turn off as const destruct assignment not supported in current browser!");
      return _objectSpread2(_objectSpread2({}, configuration), {}, {
        sandbox: _typeof(sandbox) === "object" ? _objectSpread2(_objectSpread2({}, sandbox), {}, {
          speedy: false
        }) : {
          speedy: false
        }
      });
    }
  }
  return configuration;
};
function registerMicroApps(apps, lifeCycles) {
  var unregisteredApps = apps.filter(function(app) {
    return !microApps.some(function(registeredApp) {
      return registeredApp.name === app.name;
    });
  });
  microApps = [].concat(_toConsumableArray(microApps), _toConsumableArray(unregisteredApps));
  unregisteredApps.forEach(function(app) {
    var name = app.name, activeRule = app.activeRule, _app$loader = app.loader, loader = _app$loader === void 0 ? _noop : _app$loader, props = app.props, appConfig = _objectWithoutProperties(app, _excluded);
    bt({
      name,
      app: function() {
        var _app = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee3() {
          var _yield$loadApp, mount, otherMicroAppConfigs;
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                loader(true);
                _context3.next = 3;
                return frameworkStartedDefer.promise;
              case 3:
                _context3.next = 5;
                return loadApp(_objectSpread2({
                  name,
                  props
                }, appConfig), frameworkConfiguration, lifeCycles);
              case 5:
                _context3.t0 = _context3.sent;
                _yield$loadApp = (0, _context3.t0)();
                mount = _yield$loadApp.mount;
                otherMicroAppConfigs = _objectWithoutProperties(_yield$loadApp, _excluded2);
                return _context3.abrupt("return", _objectSpread2({
                  mount: [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee() {
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", loader(true));
                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }))].concat(_toConsumableArray(toArray(mount)), [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2() {
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", loader(false));
                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  }))])
                }, otherMicroAppConfigs));
              case 10:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        function app2() {
          return _app.apply(this, arguments);
        }
        return app2;
      }(),
      activeWhen: activeRule,
      customProps: props
    });
  });
}
function start() {
  var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  frameworkConfiguration = _objectSpread2({
    prefetch: true,
    singular: true,
    sandbox: true
  }, opts);
  var _frameworkConfigurati2 = frameworkConfiguration, prefetch2 = _frameworkConfigurati2.prefetch, _frameworkConfigurati3 = _frameworkConfigurati2.urlRerouteOnly, urlRerouteOnly = _frameworkConfigurati3 === void 0 ? defaultUrlRerouteOnly : _frameworkConfigurati3, importEntryOpts = _objectWithoutProperties(_frameworkConfigurati2, _excluded3);
  if (prefetch2) {
    doPrefetchStrategy(microApps, prefetch2, importEntryOpts);
  }
  frameworkConfiguration = autoDowngradeForLowVersionBrowser(frameworkConfiguration);
  Bt({
    urlRerouteOnly
  });
  frameworkStartedDefer.resolve();
}
export {
  initGlobalState as i,
  registerMicroApps as r,
  start as s
};
//# sourceMappingURL=qiankun-DFwBr9iv.js.map
