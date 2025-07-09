function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
var regeneratorRuntime$1 = { exports: {} };
var OverloadYield = { exports: {} };
var hasRequiredOverloadYield;
function requireOverloadYield() {
  if (hasRequiredOverloadYield) return OverloadYield.exports;
  hasRequiredOverloadYield = 1;
  (function(module) {
    function _OverloadYield(e, d) {
      this.v = e, this.k = d;
    }
    module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(OverloadYield);
  return OverloadYield.exports;
}
var regenerator$1 = { exports: {} };
var regeneratorDefine = { exports: {} };
var hasRequiredRegeneratorDefine;
function requireRegeneratorDefine() {
  if (hasRequiredRegeneratorDefine) return regeneratorDefine.exports;
  hasRequiredRegeneratorDefine = 1;
  (function(module) {
    function _regeneratorDefine(e, r, n, t) {
      var i = Object.defineProperty;
      try {
        i({}, "", {});
      } catch (e2) {
        i = 0;
      }
      module.exports = _regeneratorDefine = function regeneratorDefine2(e2, r2, n2, t2) {
        if (r2) i ? i(e2, r2, {
          value: n2,
          enumerable: !t2,
          configurable: !t2,
          writable: !t2
        }) : e2[r2] = n2;
        else {
          var o = function o2(r3, n3) {
            _regeneratorDefine(e2, r3, function(e3) {
              return this._invoke(r3, n3, e3);
            });
          };
          o("next", 0), o("throw", 1), o("return", 2);
        }
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
    }
    module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorDefine);
  return regeneratorDefine.exports;
}
var hasRequiredRegenerator$1;
function requireRegenerator$1() {
  if (hasRequiredRegenerator$1) return regenerator$1.exports;
  hasRequiredRegenerator$1 = 1;
  (function(module) {
    var regeneratorDefine2 = requireRegeneratorDefine();
    function _regenerator() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
      var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
      function i(r2, n2, o2, i2) {
        var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
        return regeneratorDefine2(u2, "_invoke", function(r3, n3, o3) {
          var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function d2(t2, r4) {
              return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
            }
          };
          function d(r4, n4) {
            for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
              var o4, i4 = p[t], d2 = G.p, l = i4[2];
              r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
            }
            if (o4 || r4 > 1) return a;
            throw y = true, n4;
          }
          return function(o4, p2, l) {
            if (f2 > 1) throw TypeError("Generator is already running");
            for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
              i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
              try {
                if (f2 = 2, i3) {
                  if (c3 || (o4 = "next"), t = i3[o4]) {
                    if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                    if (!t.done) return t;
                    u3 = t.value, c3 < 2 && (c3 = 0);
                  } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                  i3 = e;
                } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
              } catch (t2) {
                i3 = e, c3 = 1, u3 = t2;
              } finally {
                f2 = 1;
              }
            }
            return {
              value: t,
              done: y
            };
          };
        }(r2, o2, i2), true), u2;
      }
      var a = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      t = Object.getPrototypeOf;
      var c = [][n] ? t(t([][n]())) : (regeneratorDefine2(t = {}, n, function() {
        return this;
      }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
      function f(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine2(u), regeneratorDefine2(u, o, "Generator"), regeneratorDefine2(u, n, function() {
        return this;
      }), regeneratorDefine2(u, "toString", function() {
        return "[object Generator]";
      }), (module.exports = _regenerator = function _regenerator2() {
        return {
          w: i,
          m: f
        };
      }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
    }
    module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regenerator$1);
  return regenerator$1.exports;
}
var regeneratorAsync = { exports: {} };
var regeneratorAsyncGen = { exports: {} };
var regeneratorAsyncIterator = { exports: {} };
var hasRequiredRegeneratorAsyncIterator;
function requireRegeneratorAsyncIterator() {
  if (hasRequiredRegeneratorAsyncIterator) return regeneratorAsyncIterator.exports;
  hasRequiredRegeneratorAsyncIterator = 1;
  (function(module) {
    var OverloadYield2 = requireOverloadYield();
    var regeneratorDefine2 = requireRegeneratorDefine();
    function AsyncIterator(t, e) {
      function n(r2, o, i, f) {
        try {
          var c = t[r2](o), u = c.value;
          return u instanceof OverloadYield2 ? e.resolve(u.v).then(function(t2) {
            n("next", t2, i, f);
          }, function(t2) {
            n("throw", t2, i, f);
          }) : e.resolve(u).then(function(t2) {
            c.value = t2, i(c);
          }, function(t2) {
            return n("throw", t2, i, f);
          });
        } catch (t2) {
          f(t2);
        }
      }
      var r;
      this.next || (regeneratorDefine2(AsyncIterator.prototype), regeneratorDefine2(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
      })), regeneratorDefine2(this, "_invoke", function(t2, o, i) {
        function f() {
          return new e(function(e2, r2) {
            n(t2, i, e2, r2);
          });
        }
        return r = r ? r.then(f, f) : f();
      }, true);
    }
    module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorAsyncIterator);
  return regeneratorAsyncIterator.exports;
}
var hasRequiredRegeneratorAsyncGen;
function requireRegeneratorAsyncGen() {
  if (hasRequiredRegeneratorAsyncGen) return regeneratorAsyncGen.exports;
  hasRequiredRegeneratorAsyncGen = 1;
  (function(module) {
    var regenerator2 = requireRegenerator$1();
    var regeneratorAsyncIterator2 = requireRegeneratorAsyncIterator();
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new regeneratorAsyncIterator2(regenerator2().w(r, e, t, o), n || Promise);
    }
    module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorAsyncGen);
  return regeneratorAsyncGen.exports;
}
var hasRequiredRegeneratorAsync;
function requireRegeneratorAsync() {
  if (hasRequiredRegeneratorAsync) return regeneratorAsync.exports;
  hasRequiredRegeneratorAsync = 1;
  (function(module) {
    var regeneratorAsyncGen2 = requireRegeneratorAsyncGen();
    function _regeneratorAsync(n, e, r, t, o) {
      var a = regeneratorAsyncGen2(n, e, r, t, o);
      return a.next().then(function(n2) {
        return n2.done ? n2.value : a.next();
      });
    }
    module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorAsync);
  return regeneratorAsync.exports;
}
var regeneratorKeys = { exports: {} };
var hasRequiredRegeneratorKeys;
function requireRegeneratorKeys() {
  if (hasRequiredRegeneratorKeys) return regeneratorKeys.exports;
  hasRequiredRegeneratorKeys = 1;
  (function(module) {
    function _regeneratorKeys(e) {
      var n = Object(e), r = [];
      for (var t in n) r.unshift(t);
      return function e2() {
        for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
        return e2.done = true, e2;
      };
    }
    module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorKeys);
  return regeneratorKeys.exports;
}
var regeneratorValues = { exports: {} };
var _typeof = { exports: {} };
var hasRequired_typeof;
function require_typeof() {
  if (hasRequired_typeof) return _typeof.exports;
  hasRequired_typeof = 1;
  (function(module) {
    function _typeof2(o) {
      "@babel/helpers - typeof";
      return module.exports = _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof2(o);
    }
    module.exports = _typeof2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(_typeof);
  return _typeof.exports;
}
var hasRequiredRegeneratorValues;
function requireRegeneratorValues() {
  if (hasRequiredRegeneratorValues) return regeneratorValues.exports;
  hasRequiredRegeneratorValues = 1;
  (function(module) {
    var _typeof2 = require_typeof()["default"];
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return {
          next: function next() {
            return e && r >= e.length && (e = void 0), {
              value: e && e[r++],
              done: !e
            };
          }
        };
      }
      throw new TypeError(_typeof2(e) + " is not iterable");
    }
    module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorValues);
  return regeneratorValues.exports;
}
var hasRequiredRegeneratorRuntime;
function requireRegeneratorRuntime() {
  if (hasRequiredRegeneratorRuntime) return regeneratorRuntime$1.exports;
  hasRequiredRegeneratorRuntime = 1;
  (function(module) {
    var OverloadYield2 = requireOverloadYield();
    var regenerator2 = requireRegenerator$1();
    var regeneratorAsync2 = requireRegeneratorAsync();
    var regeneratorAsyncGen2 = requireRegeneratorAsyncGen();
    var regeneratorAsyncIterator2 = requireRegeneratorAsyncIterator();
    var regeneratorKeys2 = requireRegeneratorKeys();
    var regeneratorValues2 = requireRegeneratorValues();
    function _regeneratorRuntime2() {
      var r = regenerator2(), e = r.m(_regeneratorRuntime2), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r2) {
        var e2 = "function" == typeof r2 && r2.constructor;
        return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
      }
      var o = {
        "throw": 1,
        "return": 2,
        "break": 3,
        "continue": 3
      };
      function a(r2) {
        var e2, t2;
        return function(n2) {
          e2 || (e2 = {
            stop: function stop() {
              return t2(n2.a, 2);
            },
            "catch": function _catch() {
              return n2.v;
            },
            abrupt: function abrupt(r3, e3) {
              return t2(n2.a, o[r3], e3);
            },
            delegateYield: function delegateYield(r3, o2, a2) {
              return e2.resultName = o2, t2(n2.d, regeneratorValues2(r3), a2);
            },
            finish: function finish(r3) {
              return t2(n2.f, r3);
            }
          }, t2 = function t3(r3, _t, o2) {
            n2.p = e2.prev, n2.n = e2.next;
            try {
              return r3(_t, o2);
            } finally {
              e2.next = n2.n;
            }
          }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
          try {
            return r2.call(this, e2);
          } finally {
            n2.p = e2.prev, n2.n = e2.next;
          }
        };
      }
      return (module.exports = _regeneratorRuntime2 = function _regeneratorRuntime3() {
        return {
          wrap: function wrap(e2, t2, n2, o2) {
            return r.w(a(e2), t2, n2, o2 && o2.reverse());
          },
          isGeneratorFunction: n,
          mark: r.m,
          awrap: function awrap(r2, e2) {
            return new OverloadYield2(r2, e2);
          },
          AsyncIterator: regeneratorAsyncIterator2,
          async: function async(r2, e2, t2, o2, u) {
            return (n(e2) ? regeneratorAsyncGen2 : regeneratorAsync2)(a(r2), e2, t2, o2, u);
          },
          keys: regeneratorKeys2,
          values: regeneratorValues2
        };
      }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
    }
    module.exports = _regeneratorRuntime2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  })(regeneratorRuntime$1);
  return regeneratorRuntime$1.exports;
}
var regenerator;
var hasRequiredRegenerator;
function requireRegenerator() {
  if (hasRequiredRegenerator) return regenerator;
  hasRequiredRegenerator = 1;
  var runtime = requireRegeneratorRuntime()();
  regenerator = runtime;
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  return regenerator;
}
var regeneratorExports = requireRegenerator();
const _regeneratorRuntime = /* @__PURE__ */ getDefaultExportFromCjs(regeneratorExports);
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof$1(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _createSuper(t) {
  var r = _isNativeReflectConstruct();
  return function() {
    var e, o = _getPrototypeOf(t);
    if (r) {
      var s = _getPrototypeOf(this).constructor;
      e = Reflect.construct(o, arguments, s);
    } else e = o.apply(this, arguments);
    return _possibleConstructorReturn(this, e);
  };
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
    if (null === t2 || !_isNativeFunction(t2)) return t2;
    if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t2)) return r.get(t2);
      r.set(t2, Wrapper);
    }
    function Wrapper() {
      return _construct(t2, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), _setPrototypeOf(Wrapper, t2);
  }, _wrapNativeSuper(t);
}
export {
  _extends as _,
  _objectSpread2 as a,
  _typeof$1 as b,
  _slicedToArray as c,
  _defineProperty as d,
  _asyncToGenerator as e,
  _regeneratorRuntime as f,
  getDefaultExportFromCjs as g,
  commonjsGlobal as h,
  _inherits as i,
  _createSuper as j,
  _createClass as k,
  _classCallCheck as l,
  _wrapNativeSuper as m,
  _toConsumableArray as n,
  _objectWithoutProperties as o
};
//# sourceMappingURL=@babel-BH5WFgda.js.map
