import { b as _typeof, c as _slicedToArray, d as _defineProperty, e as _asyncToGenerator, f as _regeneratorRuntime } from "./@babel-BH5WFgda.js";
function allSettledButCanBreak(promises, shouldBreakWhileError) {
  return Promise.all(promises.map(function(promise, i) {
    return promise.then(function(value) {
      return {
        status: "fulfilled",
        value
      };
    })["catch"](function(reason) {
      if (shouldBreakWhileError !== null && shouldBreakWhileError !== void 0 && shouldBreakWhileError(i)) {
        throw reason;
      }
      return {
        status: "rejected",
        reason
      };
    });
  }));
}
var isIE11 = typeof navigator !== "undefined" && navigator.userAgent.indexOf("Trident") !== -1;
function shouldSkipProperty(global, p) {
  if (!global.hasOwnProperty(p) || !isNaN(p) && p < global.length) return true;
  if (isIE11) {
    try {
      return global[p] && typeof window !== "undefined" && global[p].parent === window;
    } catch (err) {
      return true;
    }
  } else {
    return false;
  }
}
var firstGlobalProp, secondGlobalProp, lastGlobalProp;
function getGlobalProp(global) {
  var cnt = 0;
  var lastProp;
  var hasIframe = false;
  for (var p in global) {
    if (shouldSkipProperty(global, p)) continue;
    for (var i = 0; i < window.frames.length && !hasIframe; i++) {
      var frame = window.frames[i];
      if (frame === global[p]) {
        hasIframe = true;
        break;
      }
    }
    if (!hasIframe && (cnt === 0 && p !== firstGlobalProp || cnt === 1 && p !== secondGlobalProp)) return p;
    cnt++;
    lastProp = p;
  }
  if (lastProp !== lastGlobalProp) return lastProp;
}
function noteGlobalProps(global) {
  firstGlobalProp = secondGlobalProp = void 0;
  for (var p in global) {
    if (shouldSkipProperty(global, p)) continue;
    if (!firstGlobalProp) firstGlobalProp = p;
    else if (!secondGlobalProp) secondGlobalProp = p;
    lastGlobalProp = p;
  }
  return lastGlobalProp;
}
function getInlineCode(match) {
  var start = match.indexOf(">") + 1;
  var end = match.lastIndexOf("<");
  return match.substring(start, end);
}
function defaultGetPublicPath(entry) {
  if (_typeof(entry) === "object") {
    return "/";
  }
  try {
    var _URL = new URL(entry, location.href), origin = _URL.origin, pathname = _URL.pathname;
    var paths = pathname.split("/");
    paths.pop();
    return "".concat(origin).concat(paths.join("/"), "/");
  } catch (e) {
    console.warn(e);
    return "";
  }
}
function isModuleScriptSupported() {
  var s = document.createElement("script");
  return "noModule" in s;
}
var requestIdleCallback = window.requestIdleCallback || function requestIdleCallback2(cb) {
  var start = Date.now();
  return setTimeout(function() {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};
function readResAsString(response, autoDetectCharset) {
  if (!autoDetectCharset) {
    return response.text();
  }
  if (!response.headers) {
    return response.text();
  }
  var contentType = response.headers.get("Content-Type");
  if (!contentType) {
    return response.text();
  }
  var charset = "utf-8";
  var parts = contentType.split(";");
  if (parts.length === 2) {
    var _parts$1$split = parts[1].split("="), _parts$1$split2 = _slicedToArray(_parts$1$split, 2), value = _parts$1$split2[1];
    var encoding = value && value.trim();
    if (encoding) {
      charset = encoding;
    }
  }
  if (charset.toUpperCase() === "UTF-8") {
    return response.text();
  }
  return response.blob().then(function(file) {
    return new Promise(function(resolve, reject) {
      var reader = new window.FileReader();
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file, charset);
    });
  });
}
var evalCache = {};
function evalCode(scriptSrc, code) {
  var key = scriptSrc;
  if (!evalCache[key]) {
    var functionWrappedCode = "(function(){".concat(code, "})");
    evalCache[key] = (0, eval)(functionWrappedCode);
  }
  var evalFunc = evalCache[key];
  evalFunc.call(window);
}
function parseUrl(url) {
  var parser = new DOMParser();
  var html = '<script src="'.concat(url, '"><\/script>');
  var doc = parser.parseFromString(html, "text/html");
  return doc.scripts[0].src;
}
var ALL_SCRIPT_REGEX = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi;
var SCRIPT_TAG_REGEX = /<(script)\s+((?!type=('|")text\/ng\x2Dtemplate\3)[\s\S])*?>[\s\S]*?<\/\1>/i;
var SCRIPT_SRC_REGEX = /.*\ssrc=('|")?([^>'"\s]+)/;
var SCRIPT_TYPE_REGEX = /.*\stype=('|")?([^>'"\s]+)/;
var SCRIPT_ENTRY_REGEX = /.*\sentry\s*.*/;
var SCRIPT_ASYNC_REGEX = /.*\sasync\s*.*/;
var SCRIPT_CROSSORIGIN_REGEX = /.*\scrossorigin=('|")?use-credentials\1/;
var SCRIPT_NO_MODULE_REGEX = /.*\snomodule\s*.*/;
var SCRIPT_MODULE_REGEX = /.*\stype=('|")?module('|")?\s*.*/;
var LINK_TAG_REGEX = /<(link)\s+[\s\S]*?>/ig;
var LINK_PRELOAD_OR_PREFETCH_REGEX = /\srel=('|")?(preload|prefetch)\1/;
var LINK_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
var LINK_AS_FONT = /.*\sas=('|")?font\1.*/;
var STYLE_TAG_REGEX = /<style[^>]*>[\s\S]*?<\/style>/gi;
var STYLE_TYPE_REGEX = /\s+rel=('|")?stylesheet\1.*/;
var STYLE_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
var HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;
var LINK_IGNORE_REGEX = /<link(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
var STYLE_IGNORE_REGEX = /<style(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
var SCRIPT_IGNORE_REGEX = /<script(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
function hasProtocol(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}
function getEntirePath(path, baseURI) {
  return new URL(path, baseURI).toString();
}
function isValidJavaScriptType(type) {
  var handleTypes = ["text/javascript", "module", "application/javascript", "text/ecmascript", "application/ecmascript"];
  return !type || handleTypes.indexOf(type) !== -1;
}
var genLinkReplaceSymbol = function genLinkReplaceSymbol2(linkHref) {
  var preloadOrPrefetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  return "<!-- ".concat(preloadOrPrefetch ? "prefetch/preload" : "", " link ").concat(linkHref, " replaced by import-html-entry -->");
};
var genScriptReplaceSymbol = function genScriptReplaceSymbol2(scriptSrc) {
  var async = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var crossOrigin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  return "<!-- ".concat(crossOrigin ? "cors" : "", " ").concat(async ? "async" : "", " script ").concat(scriptSrc, " replaced by import-html-entry -->");
};
var inlineScriptReplaceSymbol = "<!-- inline scripts replaced by import-html-entry -->";
var genIgnoreAssetReplaceSymbol = function genIgnoreAssetReplaceSymbol2(url) {
  return "<!-- ignore asset ".concat(url || "file", " replaced by import-html-entry -->");
};
var genModuleScriptReplaceSymbol = function genModuleScriptReplaceSymbol2(scriptSrc, moduleSupport) {
  return "<!-- ".concat(moduleSupport ? "nomodule" : "module", " script ").concat(scriptSrc, " ignored by import-html-entry -->");
};
function processTpl(tpl, baseURI, postProcessTemplate) {
  var scripts = [];
  var styles = [];
  var entry = null;
  var moduleSupport = isModuleScriptSupported();
  var template = tpl.replace(HTML_COMMENT_REGEX, "").replace(LINK_TAG_REGEX, function(match) {
    var styleType = !!match.match(STYLE_TYPE_REGEX);
    if (styleType) {
      var styleHref = match.match(STYLE_HREF_REGEX);
      var styleIgnore = match.match(LINK_IGNORE_REGEX);
      if (styleHref) {
        var href = styleHref && styleHref[2];
        var newHref = href;
        if (href && !hasProtocol(href)) {
          newHref = getEntirePath(href, baseURI);
        }
        if (styleIgnore) {
          return genIgnoreAssetReplaceSymbol(newHref);
        }
        newHref = parseUrl(newHref);
        styles.push(newHref);
        return genLinkReplaceSymbol(newHref);
      }
    }
    var preloadOrPrefetchType = match.match(LINK_PRELOAD_OR_PREFETCH_REGEX) && match.match(LINK_HREF_REGEX) && !match.match(LINK_AS_FONT);
    if (preloadOrPrefetchType) {
      var _match$match = match.match(LINK_HREF_REGEX), _match$match2 = _slicedToArray(_match$match, 3), linkHref = _match$match2[2];
      return genLinkReplaceSymbol(linkHref, true);
    }
    return match;
  }).replace(STYLE_TAG_REGEX, function(match) {
    if (STYLE_IGNORE_REGEX.test(match)) {
      return genIgnoreAssetReplaceSymbol("style file");
    }
    return match;
  }).replace(ALL_SCRIPT_REGEX, function(match, scriptTag) {
    var scriptIgnore = scriptTag.match(SCRIPT_IGNORE_REGEX);
    var moduleScriptIgnore = moduleSupport && !!scriptTag.match(SCRIPT_NO_MODULE_REGEX) || !moduleSupport && !!scriptTag.match(SCRIPT_MODULE_REGEX);
    var matchedScriptTypeMatch = scriptTag.match(SCRIPT_TYPE_REGEX);
    var matchedScriptType = matchedScriptTypeMatch && matchedScriptTypeMatch[2];
    if (!isValidJavaScriptType(matchedScriptType)) {
      return match;
    }
    if (SCRIPT_TAG_REGEX.test(match) && scriptTag.match(SCRIPT_SRC_REGEX)) {
      var matchedScriptEntry = scriptTag.match(SCRIPT_ENTRY_REGEX);
      var matchedScriptSrcMatch = scriptTag.match(SCRIPT_SRC_REGEX);
      var matchedScriptSrc = matchedScriptSrcMatch && matchedScriptSrcMatch[2];
      if (entry && matchedScriptEntry) {
        throw new SyntaxError("You should not set multiply entry script!");
      }
      if (matchedScriptSrc) {
        if (!hasProtocol(matchedScriptSrc)) {
          matchedScriptSrc = getEntirePath(matchedScriptSrc, baseURI);
        }
        matchedScriptSrc = parseUrl(matchedScriptSrc);
      }
      entry = entry || matchedScriptEntry && matchedScriptSrc;
      if (scriptIgnore) {
        return genIgnoreAssetReplaceSymbol(matchedScriptSrc || "js file");
      }
      if (moduleScriptIgnore) {
        return genModuleScriptReplaceSymbol(matchedScriptSrc || "js file", moduleSupport);
      }
      if (matchedScriptSrc) {
        var asyncScript = !!scriptTag.match(SCRIPT_ASYNC_REGEX);
        var crossOriginScript = !!scriptTag.match(SCRIPT_CROSSORIGIN_REGEX);
        scripts.push(asyncScript || crossOriginScript ? {
          async: asyncScript,
          src: matchedScriptSrc,
          crossOrigin: crossOriginScript
        } : matchedScriptSrc);
        return genScriptReplaceSymbol(matchedScriptSrc, asyncScript, crossOriginScript);
      }
      return match;
    } else {
      if (scriptIgnore) {
        return genIgnoreAssetReplaceSymbol("js file");
      }
      if (moduleScriptIgnore) {
        return genModuleScriptReplaceSymbol("js file", moduleSupport);
      }
      var code = getInlineCode(match);
      var isPureCommentBlock = code.split(/[\r\n]+/).every(function(line) {
        return !line.trim() || line.trim().startsWith("//");
      });
      if (!isPureCommentBlock) {
        scripts.push(match);
      }
      return inlineScriptReplaceSymbol;
    }
  });
  scripts = scripts.filter(function(script) {
    return !!script;
  });
  var tplResult = {
    template,
    scripts,
    styles,
    // set the last script as entry if have not set
    entry: entry || scripts[scripts.length - 1]
  };
  if (typeof postProcessTemplate === "function") {
    tplResult = postProcessTemplate(tplResult);
  }
  return tplResult;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var styleCache = {};
var scriptCache = {};
var embedHTMLCache = {};
if (!window.fetch) {
  throw new Error('[import-html-entry] Here is no "fetch" on the window env, you need to polyfill it');
}
var defaultFetch = window.fetch.bind(window);
function defaultGetTemplate(tpl) {
  return tpl;
}
function getEmbedHTML(template, styles) {
  var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var _opts$fetch = opts.fetch, fetch = _opts$fetch === void 0 ? defaultFetch : _opts$fetch;
  var embedHTML = template;
  return _getExternalStyleSheets(styles, fetch).then(function(styleSheets) {
    embedHTML = styleSheets.reduce(function(html, styleSheet) {
      var styleSrc = styleSheet.src;
      var styleSheetContent = styleSheet.value;
      html = html.replace(genLinkReplaceSymbol(styleSrc), isInlineCode(styleSrc) ? "".concat(styleSrc) : "<style>/* ".concat(styleSrc, " */").concat(styleSheetContent, "</style>"));
      return html;
    }, embedHTML);
    return embedHTML;
  });
}
var isInlineCode = function isInlineCode2(code) {
  return code.startsWith("<");
};
function getExecutableScript(scriptSrc, scriptText) {
  var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var proxy = opts.proxy, strictGlobal = opts.strictGlobal, _opts$scopedGlobalVar = opts.scopedGlobalVariables, scopedGlobalVariables = _opts$scopedGlobalVar === void 0 ? [] : _opts$scopedGlobalVar;
  var sourceUrl = isInlineCode(scriptSrc) ? "" : "//# sourceURL=".concat(scriptSrc, "\n");
  var scopedGlobalVariableDefinition = scopedGlobalVariables.length ? "const {".concat(scopedGlobalVariables.join(","), "}=this;") : "";
  var globalWindow = (0, eval)("window");
  globalWindow.proxy = proxy;
  return strictGlobal ? scopedGlobalVariableDefinition ? ";(function(){with(this){".concat(scopedGlobalVariableDefinition).concat(scriptText, "\n").concat(sourceUrl, "}}).bind(window.proxy)();") : ";(function(window, self, globalThis){with(window){;".concat(scriptText, "\n").concat(sourceUrl, "}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);") : ";(function(window, self, globalThis){;".concat(scriptText, "\n").concat(sourceUrl, "}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);");
}
function _getExternalStyleSheets(styles) {
  var fetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultFetch;
  return allSettledButCanBreak(styles.map(/* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee(styleLink) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!isInlineCode(styleLink)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", getInlineCode(styleLink));
          case 4:
            return _context.abrupt("return", styleCache[styleLink] || (styleCache[styleLink] = fetch(styleLink).then(function(response) {
              if (response.status >= 400) {
                throw new Error("".concat(styleLink, " load failed with status ").concat(response.status));
              }
              return response.text();
            })["catch"](function(e) {
              try {
                if (e.message.indexOf(styleLink) === -1) {
                  e.message = "".concat(styleLink, " ").concat(e.message);
                }
              } catch (_) {
              }
              throw e;
            })));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function(_x) {
      return _ref.apply(this, arguments);
    };
  }())).then(function(results) {
    return results.map(function(result, i) {
      if (result.status === "fulfilled") {
        result.value = {
          src: styles[i],
          value: result.value
        };
      }
      return result;
    }).filter(function(result) {
      if (result.status === "rejected") {
        Promise.reject(result.reason);
      }
      return result.status === "fulfilled";
    }).map(function(result) {
      return result.value;
    });
  });
}
function _getExternalScripts(scripts) {
  var fetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultFetch;
  var entry = arguments.length > 2 ? arguments[2] : void 0;
  var fetchScript = function fetchScript2(scriptUrl, opts) {
    return scriptCache[scriptUrl] || (scriptCache[scriptUrl] = fetch(scriptUrl, opts).then(function(response) {
      if (response.status >= 400) {
        throw new Error("".concat(scriptUrl, " load failed with status ").concat(response.status));
      }
      return response.text();
    })["catch"](function(e) {
      try {
        if (e.message.indexOf(scriptUrl) === -1) {
          e.message = "".concat(scriptUrl, " ").concat(e.message);
        }
      } catch (_) {
      }
      throw e;
    }));
  };
  var shouldBreakWhileError = function shouldBreakWhileError2(i) {
    return scripts[i] === entry;
  };
  return allSettledButCanBreak(scripts.map(/* @__PURE__ */ function() {
    var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime.mark(function _callee2(script) {
      var src, async, crossOrigin, fetchOpts;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(typeof script === "string")) {
              _context2.next = 8;
              break;
            }
            if (!isInlineCode(script)) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return", getInlineCode(script));
          case 5:
            return _context2.abrupt("return", fetchScript(script));
          case 6:
            _context2.next = 13;
            break;
          case 8:
            src = script.src, async = script.async, crossOrigin = script.crossOrigin;
            fetchOpts = crossOrigin ? {
              credentials: "include"
            } : {};
            if (!async) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", {
              src,
              async: true,
              content: new Promise(function(resolve, reject) {
                return requestIdleCallback(function() {
                  return fetchScript(src, fetchOpts).then(resolve, reject);
                });
              })
            });
          case 12:
            return _context2.abrupt("return", fetchScript(src, fetchOpts));
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function(_x2) {
      return _ref2.apply(this, arguments);
    };
  }()), shouldBreakWhileError).then(function(results) {
    return results.map(function(result, i) {
      if (result.status === "fulfilled") {
        result.value = {
          src: scripts[i],
          value: result.value
        };
      }
      return result;
    }).filter(function(result) {
      if (result.status === "rejected") {
        Promise.reject(result.reason);
      }
      return result.status === "fulfilled";
    }).map(function(result) {
      return result.value;
    });
  });
}
function throwNonBlockingError(error, msg) {
  setTimeout(function() {
    console.error(msg);
    throw error;
  });
}
function _execScripts(entry, scripts) {
  var proxy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window;
  var opts = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var _opts$fetch2 = opts.fetch, fetch = _opts$fetch2 === void 0 ? defaultFetch : _opts$fetch2, _opts$strictGlobal = opts.strictGlobal, strictGlobal = _opts$strictGlobal === void 0 ? false : _opts$strictGlobal, success = opts.success, _opts$error = opts.error, error = _opts$error === void 0 ? function() {
  } : _opts$error, _opts$beforeExec = opts.beforeExec, beforeExec = _opts$beforeExec === void 0 ? function() {
  } : _opts$beforeExec, _opts$afterExec = opts.afterExec, afterExec = _opts$afterExec === void 0 ? function() {
  } : _opts$afterExec, _opts$scopedGlobalVar2 = opts.scopedGlobalVariables, scopedGlobalVariables = _opts$scopedGlobalVar2 === void 0 ? [] : _opts$scopedGlobalVar2;
  return _getExternalScripts(scripts, fetch, entry).then(function(scriptsText) {
    var geval = function geval2(scriptSrc, inlineScript) {
      var rawCode = beforeExec(inlineScript, scriptSrc) || inlineScript;
      var code = getExecutableScript(scriptSrc, rawCode, {
        proxy,
        strictGlobal,
        scopedGlobalVariables
      });
      evalCode(scriptSrc, code);
      afterExec(inlineScript, scriptSrc);
    };
    function exec(scriptSrc, inlineScript, resolve) {
      if (scriptSrc === entry) {
        noteGlobalProps(strictGlobal ? proxy : window);
        try {
          geval(scriptSrc, inlineScript);
          var exports = proxy[getGlobalProp(strictGlobal ? proxy : window)] || {};
          resolve(exports);
        } catch (e) {
          console.error("[import-html-entry]: error occurs while executing entry script ".concat(scriptSrc));
          throw e;
        }
      } else {
        if (typeof inlineScript === "string") {
          try {
            if (scriptSrc !== null && scriptSrc !== void 0 && scriptSrc.src) {
              geval(scriptSrc.src, inlineScript);
            } else {
              geval(scriptSrc, inlineScript);
            }
          } catch (e) {
            throwNonBlockingError(e, "[import-html-entry]: error occurs while executing normal script ".concat(scriptSrc));
          }
        } else {
          inlineScript.async && (inlineScript === null || inlineScript === void 0 ? void 0 : inlineScript.content.then(function(downloadedScriptText) {
            return geval(inlineScript.src, downloadedScriptText);
          })["catch"](function(e) {
            throwNonBlockingError(e, "[import-html-entry]: error occurs while executing async script ".concat(inlineScript.src));
          }));
        }
      }
    }
    function schedule(i, resolvePromise) {
      if (i < scriptsText.length) {
        var script = scriptsText[i];
        var scriptSrc = script.src;
        var inlineScript = script.value;
        exec(scriptSrc, inlineScript, resolvePromise);
        if (!entry && i === scriptsText.length - 1) {
          resolvePromise();
        } else {
          schedule(i + 1, resolvePromise);
        }
      }
    }
    return new Promise(function(resolve) {
      return schedule(0, success || resolve);
    });
  })["catch"](function(e) {
    error();
    throw e;
  });
}
function importHTML(url) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var fetch = defaultFetch;
  var autoDecodeResponse = false;
  var getPublicPath = defaultGetPublicPath;
  var getTemplate = defaultGetTemplate;
  var postProcessTemplate = opts.postProcessTemplate;
  if (typeof opts === "function") {
    fetch = opts;
  } else {
    if (opts.fetch) {
      if (typeof opts.fetch === "function") {
        fetch = opts.fetch;
      } else {
        fetch = opts.fetch.fn || defaultFetch;
        autoDecodeResponse = !!opts.fetch.autoDecodeResponse;
      }
    }
    getPublicPath = opts.getPublicPath || opts.getDomain || defaultGetPublicPath;
    getTemplate = opts.getTemplate || defaultGetTemplate;
  }
  return embedHTMLCache[url] || (embedHTMLCache[url] = fetch(url).then(function(response) {
    return readResAsString(response, autoDecodeResponse);
  }).then(function(html) {
    var assetPublicPath = getPublicPath(url);
    var _processTpl = processTpl(getTemplate(html), assetPublicPath, postProcessTemplate), template = _processTpl.template, scripts = _processTpl.scripts, entry = _processTpl.entry, styles = _processTpl.styles;
    return getEmbedHTML(template, styles, {
      fetch
    }).then(function(embedHTML) {
      return {
        template: embedHTML,
        assetPublicPath,
        getExternalScripts: function getExternalScripts() {
          return _getExternalScripts(scripts, fetch);
        },
        getExternalStyleSheets: function getExternalStyleSheets() {
          return _getExternalStyleSheets(styles, fetch);
        },
        execScripts: function execScripts(proxy, strictGlobal) {
          var opts2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          if (!scripts.length) {
            return Promise.resolve();
          }
          return _execScripts(entry, scripts, proxy, _objectSpread({
            fetch,
            strictGlobal
          }, opts2));
        }
      };
    });
  }));
}
function importEntry(entry) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _opts$fetch3 = opts.fetch, fetch = _opts$fetch3 === void 0 ? defaultFetch : _opts$fetch3, _opts$getTemplate = opts.getTemplate, getTemplate = _opts$getTemplate === void 0 ? defaultGetTemplate : _opts$getTemplate, postProcessTemplate = opts.postProcessTemplate;
  var getPublicPath = opts.getPublicPath || opts.getDomain || defaultGetPublicPath;
  if (!entry) {
    throw new SyntaxError("entry should not be empty!");
  }
  if (typeof entry === "string") {
    return importHTML(entry, {
      fetch,
      getPublicPath,
      getTemplate,
      postProcessTemplate
    });
  }
  if (Array.isArray(entry.scripts) || Array.isArray(entry.styles)) {
    var _entry$scripts = entry.scripts, scripts = _entry$scripts === void 0 ? [] : _entry$scripts, _entry$styles = entry.styles, styles = _entry$styles === void 0 ? [] : _entry$styles, _entry$html = entry.html, html = _entry$html === void 0 ? "" : _entry$html;
    var getHTMLWithStylePlaceholder = function getHTMLWithStylePlaceholder2(tpl) {
      return styles.reduceRight(function(html2, styleSrc) {
        return "".concat(genLinkReplaceSymbol(styleSrc)).concat(html2);
      }, tpl);
    };
    var getHTMLWithScriptPlaceholder = function getHTMLWithScriptPlaceholder2(tpl) {
      return scripts.reduce(function(html2, scriptSrc) {
        return "".concat(html2).concat(genScriptReplaceSymbol(scriptSrc));
      }, tpl);
    };
    return getEmbedHTML(getTemplate(getHTMLWithScriptPlaceholder(getHTMLWithStylePlaceholder(html))), styles, {
      fetch
    }).then(function(embedHTML) {
      return {
        template: embedHTML,
        assetPublicPath: getPublicPath(entry),
        getExternalScripts: function getExternalScripts() {
          return _getExternalScripts(scripts, fetch);
        },
        getExternalStyleSheets: function getExternalStyleSheets() {
          return _getExternalStyleSheets(styles, fetch);
        },
        execScripts: function execScripts(proxy, strictGlobal) {
          var opts2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          if (!scripts.length) {
            return Promise.resolve();
          }
          return _execScripts(scripts[scripts.length - 1], scripts, proxy, _objectSpread({
            fetch,
            strictGlobal
          }, opts2));
        }
      };
    });
  } else {
    throw new SyntaxError("entry scripts or styles should be array!");
  }
}
export {
  _execScripts as _,
  importEntry as i
};
//# sourceMappingURL=import-html-entry-DDVcqYXZ.js.map
