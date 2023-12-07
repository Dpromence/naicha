(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__66D5590",
    appName: "naicha",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.8.12",
    uniRuntimeVersion: "3.8.12",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__66D5590",
      appName: "naicha",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"naicha","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"naicha","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"naicha","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"naicha","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"naicha","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!********************************************!*\
  !*** D:/我的/myapp/naicha/naicha/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */
/*!**********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/uni.promisify.adaptor.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
uni.addInterceptor({
  returnValue: function returnValue(res) {
    if (!(!!res && (_typeof(res) === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon1-2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 46 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon1-1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 47 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon2-2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 48 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon2-1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 49 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon3-1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABECAYAAAB+pTAYAAAAAXNSR0IArs4c6QAABtNJREFUeF7tm2ts21QUx//Hzbp2gDaoENtAgADBxnMf0EBCIOADr0+AoLyGEAzqtI1TO9sYAw0M0gTjUTtx2salpUjABEUCvjH4wEMICTQkJgGFwZCAPWCIim6sW7s6PihdH27WNl6S2kHcfKrse8659//zudf3HpcgfqEqQKFGF8EhAIT8EAgAAkDICoQcXmSAABCyAiGHFxkgAISsQMjhRQYIACErEHL4isyAnp6emv2Dw1cT4wwX9Pc8GvksFov1h6zVnISvKADMTEmrMwHCEwBOnhgx4wgRXuUsNqmq/NucKBGS04oCYFj2qwQ8MJMWPAqCX5G4alM8/sjukDQra9iKAZBM2w3MsP2NjoeZqYsd99lEonGPP5vKbFURADZ3d580f9D5GYRTPTK9zXCTklvFLvGDRKOZMS9PxiEQOnkEz2ma/HtlSjx7ryoCgJnKPA2iJz1z/lY1Lt8CgMevGe3t58CRNhKwCkSRKcNiPgyizBHJef7R5uY//ksgQgdgmi+fhip3J4ATx4TLuiMjlyUSse+mE7K1res8yXU3AnwfgKq8NocY3O4M8Qvr1jX++V8AEToAI2WnidA8KRb3qEr0oULimWb7BSxJG4no7nwQzBgEoS1bjRfWyvJfhXyFeT9UAKmUfa4L9IFQPSbCUFZyzl/T3LzLryiG0bacIpHc9HXnsRnBBwmwBsl56fEK3UeECsC0MlsAumdcbAa/qCnRdX7F97ZLpTIXZoGniOgOAFKejwMgSlVLTmtTU9PfxfifK5vAARhWx1UEaTWAFQAuyxNrL8BDpQ2WFgNYMIOPgwB71gY6AOBrRlW3pjz8eWlxi7MODEBvb2/V3n0DaYBloOJq0QyQvfS0RbH6+vpscVIWZxUYANPKtAHUVFw3g7FiRocWlwPtYyAAWlMdKyWSvsh/8o8eLSCoJy431ol9BTPPJ6L8tYIZ7tWa0hjYdBQIANOy3wBw7+Rii+/g0CpNa9gezLN9bBRd12sWnrIkt8NO5u2wt6iKnNtjBPILBIBhZXYT6PSxEblZouVrYg0/BjLCAkHMtP08GJNvXoQ9akw+I6i+BQLAtGzH847epyryRUENsFAc08xcgyr61NMuqyry1KOOQk5KuB8UgIm5F4xtalxeWUKfy2raamUul0DbvE5VRQ5El1zMQAKZli0AzPDYCAAiA8o6oxy3MzEFzSCZkbIbabQ2zFUAJVVFfs6PukY6s4GY4gBcF7wpoUTbZ7MTAKZRR9c/jiyq23EYmCy8uC7fnGiJbp1VzGTmJkmi9yfbsDPQf0Gtrl+Xewub9icAzCCMadnvArjVc3vnQH/1Jbr+4LSHdbreU7Ow7sg3BJznsXlPVeTbRAYU8Rb0YrrrrAhn+6acbDI/o8ajT00nqGF16ATJe2/QoZGL1sZivwoARQDIiWZa9mMAnvUIOEQuX9rSEv3JK+rRMmX2GwA149ddYEPCx7ohpqBZHk9d16sX1i3ZTsDy8WbM+FCLyzd6zYyU/QERbvBc66utxgpZlkcKLdwCQAGFDKvjWoL0kXfT6LruXYmWxt6caWuyo16SpLc8bnInmtdrSuMnhcQftRf7gMIymVbmNYBWeVruGT4UGc2K+Quc7wGMH/TlTpxfV5Xo/YW9Hm0hAPhQavTTFcn9AYRFnubG2N/axDXGAFxpmao+ss+HWwHAr0hHF+TOJoDbPDYOOFdJ9H6kRc2q0jDrxis/psgAnxR0XZcW1i3+kkCXT2fC4K/29/9xha7rrk+XIgOORyjPfJ0rbeZ/EZd1wVcmlOhXRfoUx9F+hZu2uO9yu9oS9Xxd59ebWIT9KzXW0jCMRYjUfjte4mTwHjiHL9Y0beC4nYm3oGIkAyzLWupg3miRP4KRLYqi7C3Ok8iAYnUrm514CyqblMU5EgCK061sVv8LAEbKHqaxT9AZvEtTomeWTcESHbUeU8ShI6rSML9Et77NAynKJy37ewaWjfeKQbdoSoOncuW7v2VvaFqZdwCaLNow71Dj0Ym+lj1gnsNAAJgp2wBB9cQ+wMRPs+tuI6Lj2rmWSxBm6QQCryai+ik+mU01Hp08XypXwBn8BALAMDrOpoiUq27VzvF4SnV/mB33Qk1r/KVUR37tAwGQ64yR7nyImLuC+hjMrwCedsxED2uxhleKsC3aJDAAuR4m0513M3MaQF3RPZ4bw34iirXEGt6cG/czew0UQK4bmzd3nzSvxrmdiFeAaKZ/JQpGB+ZDkkTbhwYj76xfv/qfYIJOjRI4gDAGWckxBYCQ6QgAAkDICoQcXmSAABCyAiGHFxkgAISsQMjhRQYIACErEHJ4kQEhA/gXptjhY28psZIAAAAASUVORK5CYII="

/***/ }),
/* 50 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon3-2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACICAYAAAC1IjQ7AAAAAXNSR0IArs4c6QAADx5JREFUeF7tnXuQU/UVx7/nZtlFVBBRsVNbfKBlk0WsjILWiqV2fNR3B2eqApuApbhJBG1HsdUJ4tv6IMligbJZEHQG6xvsdEYro3Z8jE9IdkFRi44PFK3KQ1ySezo3u1pcNje5e29ufrk5+Q/3nN/v/D7nfL2/+/j9fgT5CQEhABIGQkAIQIQgRSAEDAJyRZA6EAIiBKkBIdBNQK4IUglCQIQgNSAE5IogNSAEviMgUyMpBiEgUyOpASEgUyOpASEgUyOpASGwOwG5R5B6EAJyjyA1IATkHkFqQAjIPYLUgBCQewSpASHQi4DcLEtJCAG5WZYaEAJysyw1IATkZllqQAjIzbLUgBCQm2WpASGwJwF5amShKkbG4w0Ng+k00ulkBvuJMJSZvmaNP9AYL+dy9Ejn9PAmC02KqSIERAglJMLf2roPBulXEhAFsL+JCwN4Ugdf1xmMvlBC02KiCAERQpFENLXNP5HJtwLgQy3kjAFapTNinaHwqxb8xLRCBEQIJuCblibPZ53vB9DQz/wwwI8xfLGOYMvr/WxD3FwgIEIoADnQlpgIwj8A1DuQB2PK9JAGzF0XjKxzoD1pwmECIoQ+gI5amhym6dxJwIEO89YJeDCX06/vnH552uG2pTkbBEQIfcDzp5JLCByywbWYqw7gAQ2IrQtG1hczlr+Xn4AIoRfjwJL4GGhk3OBq5vj5KTCtBvh9kHYIwKcDOM1iynQC3a/p2Xlrp83aYNFXzB0kIELoBbMplVjNwJkFGRO2kU6/TYfCq3rbNKbi431E85hxqsUc5QC+TwfP6wxe/pZFXzF3gIAIYTeIo9viE3SiNSZcGYwzMqHIP83Y+5e0nkSaPhfAREs5ImTBtFxjbd660GXvWPIVY1sERAjf4mOmQHvyeQDjChOl9kwwHCyVuCEsJrqegZNL9cnbEbLMtKzOxzesnRJ515KvGPeLgAihB1vPO4OHTCjuJNaOSoda3rdKOv8oVuO5YDrJom8XGO26TjfJpxsWyVk0FyEAOCUWq/t0xDDj+f6oQvyI6Y50KPwHi3y/Z97YFj9VI20uwCdabKeLgTaNtZv6I0SLfdWkuQgBQKAtOR3EiwtVAANfUm7X4ZnpV3zuRJUEUq2nA3rMfBrWZ09dAC+u0wbc/MbUmR84EYu00U2g5oVwwso79/py+4C3CPihiRDmdAQjtzhdNI2p5JlaXhB0nMW2dzLTohzzrRumRT606CvmfRCoeSEEUsmrADYr8g8HdtUf+cqMGTvKVUFNbcmzQDyXgWOt9MHA1wQsomzu5vSlszZb8RXb7xOoaSGMXrFgqN6VexvA0IJXA6IZHc3hRWUvHGbyp1rPIWJjynSMxf52ENM9Wp3vtrVTZn5i0VfMa31q5E8lbyPwHwtPiWjDQZu2NK2JxbKuVQszNS1rPY/1/JTpaIv9bmfQggbWb38tFP3Uom9Nm9fsFaGprfVHOukbCNirYAUwT8qEon+vSIXEYpp/xLDfaITrmNFkKQbj7TeQyBLdsX5q+DNLvjVqXDNCGLtw4YCdA7p+DsLPmHAUdReX2RREB/hpIjI+oa7Yjzn/zZPxuHWg9SBoKxG/2JcfAzuJ6UsmvAmdnxu4q/7ZV2bM2GW9D294eF4IRy+7fW8913A5g8IAfuCNtJVlFB8ROKnv8MU7Wlq2laUHhRv1tBB6vvlZBuAwhXOgWmjvgjA50xz5t2qBlTMezwohkEpcBKAdwIByAvRo28YUqTkTjNzn0fHtMSxPCiHQnjgHDOO7IV+tJLIM48yBcEGmOfJYGdpWrknPCaHxb8kRmo/XAhisHO3qC+irHLJj1gdn/6f6QrcWseeEEEglHwP4bGsYxLowAXo8Ewyf43VCnhKCsUJMAxlrCkr65T+mA4z1w178GdPCXIGBFXyT3pe9Dj7B6xuWeUoIgVR8GUCTTauasBE6X5flr1dtmHbVVi8qoNiYDk2lBu7N2yYQIcbA+GL2AN+bCUanFLerXgvPCKF7TcEBnwO8b6F0MOP5esqe+Xpw9hfVmzLnIp+0cqWvc8fmxcwosuqOth64acv+rn5q4twwS2rJM0LwL40fTzr1+RbVIGFMg7gu29g5efZHJZGpESP/ylg9bR/2EoAxZkNmjcd1TI0adp78eUYITankZAYbL88K/PjWTDB6tSezaHNQ/lRiEgErzaeUPDXTHDXhazOICrt7RgjF1hXoRBM6m8PPVJi3kt2PXbhw0M76LuN+yWQvJ7o6EwzfquQAHAjKM0LwpxJXE3BzISY+Hw6XHSEKV0wglfgYwPCCFkQ3ZJrD1zpQc0o2UTNCYC03omPqrPeUzIICQQVSCeOAkx+bhHJLJhiZo0CoZQlBhFAWrNXXqAih+nLWZ8TFpkZyRTBPtAhBhOARAvaGIUKwx08Zb7ki2EuFCMEeP2W8RQj2UiFCsMdPGW8Rgr1UiBDs8VPGW4RgLxUiBHv8lPF2Uwgjl8cHN3ThShCdm3/2zviYCE8im7uxHDvONS2+ezjqfH/KH0BCOBjAe2B+9Jt63LHxkuhXTiRBhOAERQXacEsIYxcuHLKzvss4THyPnbMZ+FTX6KT1U8NvOoWkMTX/SA3acwAO6qPN9Vq978R1F1/2X7v9iRDsElTE3y0h+NuSc4j4pkLDJuCZdHP4FDixH5KxDWR78mkCJhTqj5mu6QiFC35aUmp6RAilklLczi0hNLUl/8LEV5riIGe+1Cz+RS3gxLkNxlhECIoXeKnhuSWEnlM3XzHbIcOYIvnqfT+xM2UxNijOdeWMLSnNznrOQeexmWnRN0rlVMhOhGCXoCL+bgmh5/+erQAuMxs6A3/tCEZm9hePP5W4h4DfF/FfkAlGWvrbx+5+IgQnKCrQhptCOCZ11367UGccFF74s2VAZ41P6M+qrp7VdsYmBGZnPW8egOwop5adihAUKGInQnBTCEa8TW2JS5hwr1nsBLzauPfw4x+48MJCu0ns4Z5fR7x980vFDg0hxuR0KLLcCXZyj+Cho6PcFgK6j6P9l3EWoekUiTnSEYomSy1Yf1s8TESJIvZrMs3hiY48merpSK4IpWZIcTvXhWBcFZa1NnJON25UC+6vamwaAGijOoItxgow058/1XowoK8nYIiJ4S7yaWPSU1o6i7Vn5e8iBCu0FLathBB6phTGM/ximwLclwlGLi6GL5BKrABgbF5s9ivLSjERQrHsVMnfKyWEnoXvHQBGmE6RiE7taA4/Vcgmfyg5oeDfe/w2Deyq95fjYEMRQpUUerEwKyWE/FWhe/ftR02FANrQtVUfszEa/aa33ch4vKFhX3rd7MDzvA/h3HLtTi1CKFZhVfL3Sgqhe4pUfPNhIvw53Ry5sTfSplT8Ggbt8d+/b1fezXhFCFVS6MXCrLQQRqXuOtSHugyAQYViNc5FrvMhsPu2MkcvSxyWyyFt5gdgh54jf+f0sLHTRFl+IoSyYHW/0UoLwRhxsQ/yeqiszgQjZ31LKNCeeByM7/7dFzkG5nQEI2aHotsGLkKwjVCNBpQQQvc+osbj1D0+0d6dEml0QXpq+OHGVOI8DXjYlCCjc+Cu+jHlPvFShKBGHduOQgUh5O8Vls7/BXTNePpjtmfUewxtHEE3Ni0221SLCZiYDkbW2AZUpAERQrkJu9S+KkIwhtuUSi5ncLH3BsZ8v8gjVyzvaI6Yn/fgEF8RgkMgK92MSkIw3hATdOPN7342uHxB2dyociz97CsmEYKNTKnkqpIQ8lOk9mQLmEv+xqgPli2ZYGSBW4xFCG6RLnM/qgnB+Io0s/2TFwk81vLQCS/7Bw0fb+WrVct99HIQIdglqIi/akLIXxVSrccBurHQ32xdQW+COdIxPj0t8rKbaEUIbtIuY18qCqFbDImiq9l6YXFs1ZkV3CIEK7QUtlVVCCWuZvuWrKOrzqykS4RghZbCtqoKIf84tYTVbIad06vOrKRLhGCFlsK2KguhxNVsjq86s5IuEYIVWgrbKi0E46rQHj9CZ3q+r+1ZjFVsdXpu3NppszZUCrEIoVLkHe5XdSHkp0jt8SMYNA+MM4yXbYYAiPAEga9NN0ffdhiJpeZECJZwqWtcDULYnZ6xGKevRTqVIixCqBR5h/utNiE4PHzbzYkQbCNUowERgr08iBDs8VPGW4RgLxUiBHv8lPEWIdhLhQjBHj9lvEUI9lIhQrDHTxlvEYK9VIgQ7PFTxruYEMAcyISixkZc8uuDQCCV2G66kwbztZlQ9AavwjNbV1tVY25qj0eZaX7BoJmaM6Hw0qoalEvBjk4lRuvAWrPuCJiVDkYK83Up1nJ14x0htCXPYuLHTUA9mwlGTi4XyGpuN9CeuBOM2aZCYDo7HQqvquZxFhG6N4ZmHMHKdT7THaeJMD3dHFnijRE7Mwp/W3IcET8DoN60ULK5g91aP+3MyKy14pkrgjHsQFviVRB+WhABIcuMKzo2fdaKWEy3hsp71k3t8V8zk3HYyVDT0TFey4Qix3qPwP9H5DUhzAbhzhIS9haAJwD6qARbz5kQ8RBm/BLA8aUNjmZnguG7S7OtTitPCcHf2roPBunvFDmJsjozVamoibfwdt9hHS0t2yoVghv9ekoI+elRKn4pQIvcgFcbffDvMsHoYq+P1XNCyK8GSyUfBOF8ryev3OMj4JF0c/gCJ89qK3fM/W3fe0IwdqVubd2HBulPAhjXXzDihxez+o5fbZh21dZaYOFJIRiJG7k8PrghSyuKbbleC0nuxxhXfzOAL9p4SfSrfvhWpYtnhZDPRvcRsDNBPBdMB1RlhtwMmngLoMUyU1sW1MJ0aHe03hZCz0iNq0N9F6ZoRJMYGF/s5ZGbtadAX10EvKAzP9BVj2W1dBWoOSHsPuBTYrG6j0cMOWQAacMUKMKKhkCa9vn+73z2/ppYLFvRQBTovCauCApwlhAUJyBCUDxBEp47BEQI7nCWXhQnIEJQPEESnjsERAjucJZeFCcgQlA8QRKeOwRECO5wll4UJyBCUDxBEp47BEQI7nCWXhQnIEJQPEESnjsERAjucJZeFCcgQlA8QRKeOwRECO5wll4UJyBCUDxBEp47BEQI7nCWXhQnIEJQPEESnjsERAjucJZeFCcgQlA8QRKeOwRECO5wll4UJyBCUDxBEp47BEQI7nCWXhQnIEJQPEESnjsE/gekYx/jEqThsgAAAABJRU5ErkJggg=="

/***/ }),
/* 51 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon4-2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 52 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/tabBar/icon4-1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/*!*****************************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/components/navBar/imgs/back.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAjCAYAAAB7NEEmAAAAAXNSR0IArs4c6QAAAPhJREFUSEut1SEOAjEQQNG/GgGSO2Axq1AoLoMgAQMGBEjugEEiUCgUAjTnQIAnTbbJpunudmZaWfEySZs/BfYzAFbABXg4rjCaDrwBY+AHzIC7Ba2DfrYvMNSiMdDBT6DUoE3gC5gCHynaCUofKgmUoMlgKioCU1Ax2IWqwDZUDTahJjCGmsEQzQLW0WygR7OCHt0Dy0hXR8Bb01sXlLIKbS8ADlXRxa6v1AS4AiG8A9ZStZ6+bHDY0yxwLNJmuKn8Jrhtnajhrh2lgrtQ95vEcAoqhlNRESxBk2EpmgRr0DZ4C2y0aBvct6Ax+AjMraiHT8AZWLiLP73hU0DVoUucAAAAAElFTkSuQmCC"

/***/ }),
/* 64 */
/*!**********************************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/components/navBar/imgs/backWhite.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 65 */
/*!******************************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/components/navBar/imgs/index.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 66 */
/*!***********************************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/components/navBar/imgs/indexWhite.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/*!**********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/banner/banner.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/banner/banner.png";

/***/ }),
/* 73 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/img1.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/goods/img1.png";

/***/ }),
/* 74 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/img2.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/goods/img2.png";

/***/ }),
/* 75 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/img3.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/goods/img3.png";

/***/ }),
/* 76 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/img4.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 77 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/img5.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 78 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/img6.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAC+CAYAAACLdLWdAAAAAXNSR0IArs4c6QAAIABJREFUeF7svQm4ZddZHbj2me+545vr1atJKpVGa7atwSi2sbEJbYZmjE2ANJAwJjSEBDppOjR0N8SEGAhjzNCYbiAfUwCHgPEU8CQk27KsWaoq1Vxvvu9OZz67v/Xvc0uypFLJkr6O5XeuPqlK79173n3nrr33/69//etXeIEPrXVrezz+SkvpLwXU9dD6sLKsntbaeYGXqJ9W34GX7Q4opXJdln0odRTQny21+uBMs/nnSqnRC/kh6lJP6sfxYRTZj0JZb4fWzUs9v/5+fQf+u90BpcbQ5e/Bdn+6FwRHn+99XBT4p06dajRnZn7cUvhBAO5/t1+m/sH1Hfj870BWarxrptn8N0qp+Lle/pzA78f9w7pw/lgBN3z+P7N+RX0HvjDugAbuV3b+tb2g96zd/1nAH6Wjm/IMfwlg6Qvj7dfvor4DL+kOrDouvrzlte57+lU+B/j9uH85CudjNehf0o2uX/yFdwdWYTt39oLg2PStXQC+1jrYmYw/AeDGL7z3Xb+j+g685DvwmW7YvH0a818Afn8y+Wno8kde8uXrC9R34Av1Dmi8s9dqCcYF+KQsVVk8pLX2vlDfc/2+6jvwUu+AUirVln0tqU4B/vZ4+G4F9Z0v9cL16+s78IV/B/Sv95rtf6y01p2daHIOWodf+G+6fof1HXhpd0ADUS9s7lE7k9HbtcbvvrTL1a+u78Ar5w6UGt+s+uPhu1GHOa+cT61+py/HHfgN1R+P7wH0q1+Oq9XXqO/AK+MOqHvVzni0roH5V8Ybrt9lfQdeljuwrnYm46yWFr8sN7O+yCvkDiilEtUfj/Qr5P3Wb7O+Ay/bHaiB/7LdyvpCr6Q7UAP/lfRp1e/1ZbsDNfBftltZX+iVdAdq4L+SPq36vb5sd6AG/st2K+sLvZLuQA38V9KnVb/Xl+0O1MB/2W5lfaFX0h2ogf9K+rTq9/qy3YEa+C/brawv9Eq6AzXwX0mfVv1eX7Y7UAP/ZbqVUXQek2gV3e5VcOzgZbrqpS9TDh/FODmHRu92OM7/fz/30u/sC/sZNfBf4uezM3gUjzzxLmzs3ItzaxO89Ut+BftXXv+Srqp1ifNP/BkOXP4GZFYHUNZzXu/syY9g0UnQ238nHnjst7F3/zfD89ov6WfvlhfXwH8Bn/T24CTWNx6GsjKMkyGGo5O45dr/Ca7t4S8+/DZsbE9Q5AX2LO7Hnbf8KyzM3fkCrvrcTzn6xEdw9uE/wK1X3o5w5krYc1eisJ8NZi6Oez/0Ttz56q+D39sHOC4+9eB/xJVHvvdF/+zd9MIa+M/zaZdljoePvhfv+/hPIMsnuOHwMrIEWN0aYycqETpNrG9sYmmPjeuvfAtuu+n/hG2/OKOKsizw13/5TuwLNQ7ueRXsch2WY6O5eD3y7s3P2vW5QFrRMSwsXIHu/tsBlWNj+2E4wbWw7drq9FKLuAb+Re7Q2tZD+I0/fAdcr0CRWWg0GG5oZInGnrkA3Y7Ck8eH6M510Q497Jm7HSfPH0crDHHZytdj397Xot1auNT9l++vr5/F333kV/HqK65GYBfwcBKuncHyuyjVDOBfBWfptYCyL1zvwU//P7hqdg8sr4HuwTugbAsKPk6tPopO59AL+rm7+Uk18C/y6f/5h78XR09/FIN+id6MwubGBLZtIY0tWLAR+jZuvepOXH/Td+JP/upbMBq5SOISRU58algqwF23fQ9ef+fzu7asrp3E3R9+F+66/nZ4xVGo8jQcbx6Wvwe6zJCXPrR9GHbQgj13LRy/i9FoGyfuezeuO7Afmu9l3xtgew0oy0eca2Slv5sx/YJ+9xr4z7hNSTrG/Y/+Bd73oX+LxfmDmJlZQbe1HwuzV4r91vmNR3D67H9CNNbYv/g2jJNtPPjQhxBnBYLQhtYAIw3PUWg0C7zx9n+OV9/w3OA/c+YJfOYTv4g7rroOdno3lMqh7FkoVUJZIcrSA4LrAXsOiE7BWbgeweJNeOThv8J+5zi6zlFk6kb4i7fB712OMt9GWtrIMPOCPvzd/KQa+M/49O954PfRac3i0N474XutZ2FjNNrEX3/su3DvJx9Bu2NhZzuH63C3zRFnGdptG76vUBRAmfPlDv7F9/wtXPdzZ2ocP/4A7v7wz+FNN10PJ71bdm67cZ1Y25XFBrS1Aq0VnGAFlr+EfPA4/O4RBCu34mN/8wt405E+0ryBwr0Fyt+Lzv5bUWYDwBpjkMzDepG5xm5ZDDXwn/VJsxPz+QfF3P/ge/FXH/lXsB0bp0/FmFt0kWUlhtslxlEBx1bCQMoicHO87jXfgbtu+y7h923bx9Fjn8VnP/EreM3hI/CL+wF3BZYqoMttKLsHZc0D7hJQprDsNpTXgy4SQCu4vsZnH/w1fMnVCyicm5HpBcBfRvfAbYByobMnkTmHkRaXHHazWzD+nL9nDfwX8fGTSvyN//Q12Nh+EjvDAkt7XJx8MsXMnIvJsITnlbAdC7aloEqFwM+Q5z7CcAa3vup/xtFP/wHuuukOhPYOdLYFy24COgKUj6KYwG1cDV2W0LoQ4NvBHAAPZbwGt7WMIPswnPIJwDqEAosogldhZv+rYDUWUEbHkdjzyNF5Eb/Z7nlJDfwX+VmfOXc33vOn34ntQYEwtDEZFGj3bJBb6W/n8H3LhDxpCUu5GE5yFGWJg43DeNtdb0KvtYx0cgo6OW5ier4P5cFpXAFYDWFolBWgLBJYdkN4ep2O4LT2w/MCeNv/AYCPUu1B3rwLcwduheW3ocsNwFIYZPM1rfk8n20N/GfcnDSN8Ld/97t48viDWNs6Bttu4w2v+wd49ImP48C+q3Hd1W/A/Mw+edVP/tA3Y+aWx7C6HiFPNXqzLlbXUvQ6DopCo9W0UWYFdK5w9HQKe9jEd3/jW7Fn/kYg3UI5eRhQDhx3AZbXg1IuyrKUP3WRotT8uw/bX4DltqCT87D8Bdh+F155EnrtPYC9gLT1VVg4/CVwgxBQBaA30E86cLw6yb0Y9nc98Le2zyKOh3jwsb/Fg49/AKPBeeggxeHrvwKe7+H0Y59APolw5Pq3wm538L4/+mV8+z96F44f/Rje/+4/xPxtGrkeQHk5ZsOOALfbdTAcFJiZcXH2iQxHVyc4dzLGd7ztLtxwxY1YmDmM0fo9KPMBvMYeOO6MLABFjQ8pzHgdZV7AbV6OUrlQyoYbdFGmW7D8GSjLgxPMA+d/BcXwCZSzb8filW+G35yH8lwU48cRW/PIdReWUxezngv8uxb4aTrB7/3ZD+DxY58Qfr7hzeNLbvsO7D1wE+ygiSgaQZe57LoaLvqTDRQo0AgamPN6CMJ5FKMdWEixvn4OG2uP4u+O/SZQTNDuuGgHLnodH+/94BYmeYyFbBbf9jVvxFL3WgS2g+HaR+C1LodtubCdUH5WFm+Z0MZqSLzPYZNaeVCWDcsO4TXnYbtNaJjk2W+0sfbxfwm7cwv23fS1aC3fCiCDLtaR5hn6SVfCLMf15V91Ec3Pi4z2XtEv27XAH0/6+Pnf/ApMxgRbCz/2L/4bMtvDgyfvQaHHQlH6dgNFWQitGHhtDOIxJtvbmBQx/LNn8fovfRui8QiZGuHeD/43uMtzKNwC59aeQGD1cX71QRzfVFhoXYVuehRvve3NmGFVNR0hSzZhOw3k0SryZEuKT25jGUU6kQqtggPlNlFkGbJ4gGTSh9+Yg23bsINZNOevhhMEcNJzOPvAn+PAre/A7KE7ASkwT1BkWzjTzzHTWUGea5SAUJy248Oy65ncuxb4eZ7iF9/zRlx5xVfjyivegrn5K3D07GfgEBQ6gqsddBptuJaHLE+wNd7CMO0jGyt09t2K/rG/wTUHb4atSpRlgvs+/XEcvv4uzC0cQqG4Q3tI8xy2H+Ddv/aD2B88hjuueSNme1egSGOk47PIxk/Cdttw/XkU2Rh5OoHlhLCdALrUGG6dwGRwDkkCDMcFDh7ah1F/A735fWivvA5ecxadThNbT/wNgu4y9lz35bDDWeh8COR9nNo8Ctu/Dr1GA6VWKLWW62plw3ZZe3hKAvGK3r5fxJvftcBP0zHG0QTjeAeNVheWFyKZDODpHJ7tya6YlSWKokChtYDEcXw89sC96M7NY2Z2HuPtdbi+hYbv4GMfvQevefNXIos5T1jLcy2l4LW6+Kmf+GrcfqWNGw+/Hi0BeYrB+Y8iaO2DAqu9Bco8huPNIo3WkYzXZKcvihJJpkQGURYZyjLDzMwcJuNtzO69AQtXvAVh6MHON9E/82nsu/Xb4XaWWQJDGZ9HlG5jdVyi3VhC4PiwbQelGEZayPJUThnLDXZlCLQrgT+J+kjSGNCFhBQnB8ext30AltJw/RBpqQS0BQEEJZw6d0vG+yfvvw9LR65Cr91ENt4BkOLUmfNYXD4Cr9OV4hexxdcoXWCuM4N/9oN34ktv7uHmK96EbvsAimSM0caDcGwT36fRpqgv08k68mQHynKhtYUszVCUtoRTzfasqDXLbIgsy2XX33vNN8HxLMwvzCLafATKX0Br398DLAKfIdwYiQ5xcmeChXYTLiw50ZTi7m9JIs6FwKTacl6cqvRFbLZfEC/ZdcBPkyGSOBIQy+7neyhKwrUQ0Du2h0Jzzy6RpgkS7oy2A60sWMrCk8NcePJDbgInizDJEth2B41uD8X0mgqi2aGsOQiaeOdPfj1uPZzipivuQic8BJX2USDAZOsxxKMzwtqU2QhBcxHJeF2SV60d5FmCyTiC7bSQZTEaLR95NkEYttGZvQzd/a+H61mYnZ2FshxkOyfQPPTlkvjqfIwiHyFHgM+uj9BzNTrNEA3H5xuD63D3dwT8fJTKgbWLOrh2FfAZLiSTLeQF41wL4zJDGLQALxBQK1ErKETJCClDC+WhAGArC1mZIypcLBYj9C0HoeOizCbwqIp0AllIfG1elFKx5YOLxgka+MP3/G+whh/Gm1/zPyB05tDr7Uc62sR4+wR2Vj+DTCm0Fm9Bvv2QgFKrAPFoA3FM0VoLjmvDtkyo0+kuwW/MIOiuwA/n4QcebNeD11xE2AP88GZT7MpH0NmOFMM+vXoOrr8ER5doeyV6jbaEcL4saBdZnstCVQzxuDB2wWNXAT+JdpAnYxSwUVgKmgyJ30QkYLURoESUJUhYVKLcQAFJpuX7oeOgFwaIRkOU6Qiq0YNlKYn/uWcK4BVpRktOkknKiqvCOEkxPvsYfv/XvxVvf9vbsNg5gnZjFp7TwNYkxkjbiLwlFF4btirQ2bgXg4f/CHBnJAxL8xgNT0PZLjoz+yR38MI5+N3LgeQsLIY1agub2aP48AP34C13/DPcePM/R5msoky2AaeJzSjG2bELx/PgQKPnA52giSwr5PfWmv+acM7ymrsi5t9VwI9GGyhYEYWLRGkBfW7ZAnC7ZERP4NpI8xLDvMA413BtCz5Dh7JEy7XlZOgkfWy5LWEOldZISg3PtjAuCniWjaQokJU8KxQsrTHTmcEv/+w3YY93Gne9+qtgtw5jXNiwSwiLE/vz6Jc22r0FIM8QHP8LlMffJzkG6cuw2YHthfDdJvzOQdjNPVBljCQ9j62dB7B+9kmcSHaARo7v+ob3oNG5CboYQucTFEUMK5jBvWd30HEdaNuDb2nMNnx5r3lRwFa+YXxkp1ew3MYX/Z6/q4A/GayZHVoppEz0wjYs24IuCqRaYZRr7OQlCmg0GK5U8W/I7iYCQxfohSFUGmGQJHBdD5ZlS5gzznJMyABBS47Qj2IErosZz0PgOIjTGE88+Ndw2wtoQqFMJ1B5gtBrAq1lOK0luEEgep5JNIT/0G/A2ngATtCC15hHs7cCu7Eop0t/cgKPnLwfT5w+hvXjQ+ijMewjHr79W+7Atdf8EMLZa6U/mHkDC2AE8sdOb0h1eNFTEtIwsV9o+lCa6iIHuqI6bc+X8OeL/bGrgD8ebaPIU2gyNraF3A8R5RpRUqBlaSS2Dcv1kBD8pYajCjhKISsJZi1hAqP35XYHw2gEi2ENTwkAcVZiNTZfywpWe4FcA6GyMOvacmLsxBMMRkNM8gJpMsayk2FPvi7PyylZppTB66GwFUb9c9hz9gPoteeQ6wSTbAfnNo/jgWMP4zOPnsLWDiu9gC0FK4W/d4OL7/+H3wu79Tq0566Esm2gnCDLJrCDeTy0uYMzsYuuXWLJt5BoCx0X6PkNYZAYnjHccfxQGJ8v9seuAj41OXmeC9tSEKCWg9QJkKU5HJdMCvnyEhkURlmJhGRlwd28RJQX4FbesoHr5ptQRQ5tWaKAJGAI9H4U4Uwcw2cIkeVY9D1YpYZlawyzEoNMIy1LhCjR09uYHR2DKgpMNh5HSW69cwXildsxLngSBNjeOIb0od/Ck+dO4ejpMzh2coDRpETDcxENKXVmKKbwqsMe3vn9tyDz34zOwl3wG12gjKWYVeapLKxIO/jg+RSBZeHypgRpcC0Le5ot+Z0Z6FAlCrslSfoX+2NXAZ9OBmRsGNrkZGEsG5kboLRtKRBRy5KTPwf/LGFpSBGL5CYZn9ChWLiQ00A6paTN0EVZ5MKYMNndiHNEeYa2RSBZGGb8WQ4mXEhKYyVwEZcKGyfvxtbpe7G/5SJsdk2HVrKFpHstTjsLmO3Ow9IKDz74Ifz+z/2oMEeOpZGmbH4vUaQZmEZcuc/FL/zwDbDdFajmqzG38iawK7jUEXQRAf48tN2ChoWPr40QFzb2ha78Ht0gRNNx5PdhDYOnRKl2hynVrgI+d7GiyBBnEUrG40xotTbgd6mMzBHDQlwCvm3BtZTs+AxTLIGOSWY9zcQV0GR+CPqygO0FEkZFsDBOIpxZPy0LodM7JPnCqNDwVA7fsTHMgDge4Oy5xzEoXDz5+Kdx7tjfwY9PYq7Xxsot34SDR96AtkO2KMFnPvV+/PF//BlhdCbDsdCxDVeh27Tx6z9yOZqtvXCbB7CZJPjIw5/CV9z1tVjZ81VI+w9D9W4xFVo7wIdPb6Kf26BhxG0LHTQcV9gopQpJogtQHPfFv9tLCr8bpx7mBH8yZmVfarMMVRgOZI2WJI9kaXKKCaRoNdW48AQo4bCR1rIpNIDNyi9Bb7uwbBujLEO/VMLwnF19EsPxCHccuQHjOJKTY5iMsNjsYJRzwVn4yKf+Evfd+15snT6KLGeFmFqaDGF3EV/2T34JLddFiBSe7+J9f/DTeOKTH0AclcK7tz2NH//mZezfuyz05kY2i99+33/FqbUUhw8ofMNbvwLXr3w9ctWE3blKZAx/efwc2l4LN8y2ZQEykbaU+f15KjzdvqQOdb5I7wDDnlE8gJIWP8kPhY3JbBe5w84mUpFs6iAYKT8gX8/ClwNHafjU4ygliepEA+NCS6Jp5Sm20hRtx8Hx04/gusuuw77OLE6Px+gPN9FzXXi2i35eIPACnNg6h/OnP42PfOgPEU0i9DdW4cDG8rVfihvf9v24ebGDPIuwOdjEB//8V7F23wex3Crx9W8+gsWuhW7bxQAH8Ycf+wjue2RDOsA6XQfXXmPj+77u1+AkA9jzb0SSJ9iZ5JgLmwJ4LgSGNwXFa4qCtd2l2NyVO/50LY/TCcbKgp1O4FCIZqJ5YX1yVmstDyUrtAyRqpif8bxQokwYmQiXTDBtzKgMdpEhLBM8MppA+aGER/2tszh04FVGw1NkcPIIKRddaSH0Gji3cRbtTk/sSLYnQ0wGW/jkR9+D/R1gJughuPJrUHRX5LVrZx5Hf/3TuKmVYKbcQDvIUfoN/OnH78Xf3vMkbMuS1ZtmKbqdBN/9LW/Hm1/zA4jRgcVwR1lwHU/6D/KCSS8FeM1dqdLc1cBPshhjx0GSpZLwemUhSSoJSv6jlSnqkPrLlCU7e0I3M6XgMOAXDrBAUBZwyxJNL8Bj4wiXWxOcGuzAmT+A8fY5NJsz8BpNlGmKqMjgKguOslAoC6cHEVYHE6y0bAS+L9XV4WgLS4GDE8c+jP6pT2Kutw+qMYdPPfAA9r3263DiwT/FoY7GXCfEfQ99HB/56CPCzHiOgz1Ly7jlpttxx+1ficXu5eiEbQSOgud6aPih6IKiLBJJBsM4y6awbvc9djXwKdDqFzFyxvEVV89d36aIq8xBtTrZHMn3pJMDyLSSYldE7h3AIC8xyTLo0sJS6GGQpbKjtvMxRl4TNk+HiNLnWZZpMU4TCZ18xxP9T5xn+Mzxk+h1urDKDN1OF1meYSZsotPs4JP3/h7OPvTXaHs99FMHd3zND2MYRUhGq3j8s38GvX0Khw9ej5Xl67Fn8XI0w1lYLEpp+v04cC0XDRcIw4acVDxt8hLwaIECSpV3B4vzzKW9q4HPmxHrAjssajHMkeqsNPZRo2D+zsKVhsT7HrU45iyQf6YhT1YCqdaY5BqDrESmgUaDhKEWZoeFL0vncBwPk7xKpkvgyfOrGAz7aDQC9Mcx9i3MYa7LsITANZKHwXgbpx75GJZXrsbl+66Eq2lRBThlBt8NjT6I71MVQmPytXyMkzG2BmvYGj2Gm468FqHXQ6aZGBvZNEtvDY+ubbuDxamB/4w7QMhvxENY1MBze2ema/r3BPiiYZnu+rqETe6eiS2/xkWhqlNBXmEKWYyAeIKwFpAIc8QnKUOHTpeNZNRVTqELOJYlyfVUHMefIZQp3dQcF4qMkoJohygso1TCqECVhGr9yQAbg02c3TqLc9unMY77cIXyDHDdZTdjeWY/QjfEMC3Q4MpRDbSewylutwQ9u37HJ/D7ZYYiy031klJdNmjI/wGKFKMg0OzUfJj/GtE9CRImsSYsIsVJvl9SZOOVwwXCpcSdVXZm81rzfbPbTr8m60P+n3kE/7SqphHTBJMXOdI8RZylGMUjbI13sDbYwNn1EyjZMinP1whcH42giVbYge96mGt1sbe3B2y7oe4og4c2XZb9L34x2sUW8q4HPuG+lSciJ2bjiYCSFcwq9Km2XeHrCXGGL9OwiOAtS4WCorfCLBbmDUxeGXHokuGHWTSi9SfY2Uco/pg58rIw4DbrQxZcRqZF2h1NgYwSCxbaipKa+VKKb9I9ZinEWYw8L2T3Z9hFxoYLjOFLK+wKbdr0fWmlbHlsnidVTyJWYanZRmMX++jveuATyNvc8U1kIeAi8CRkqUApnDeFa8pE9wx/hPiX5xtA838Zlgj45fvVBbmEqHWvFhIrxvKsKowqZAFQC1+IRFhyCHLqkmawc0AL8CUyl2tqqT5LzaHMkfK9CugDeY7jehIK+Y6L0PUluZWFp5hv8HuW0K9LYQt+DfzdEtk9+/cklDZLavTNw7A7JlZnHCMgnsYjEvbQVcHE5hcezAPIDFU7N+Nx0z5ogDpdCPyTcb9InEsyQfwezWKl91FODduidiaX5FNOAnluAbpC8AczrmcjvOKfUnQyuiKeHHwtgS3xP+Mn6ROwxVWBSe9Uc8lTYV+7B7d2Wdi9wOdvvkX3smkjRvUnFwB32IKKRZFtTpNdgtoyu/sF9W7FAlXAN0eBAa05FaokGUbuXB0SUkGVlkV69yhKJEyRSyrAVI+mqfQA5FksuUacjEyboePJri3KUALeNo0kfD90ZqArT+D5aLge0ur3YB7Mr3NxOpaN5SatU2p7kV2N/K0yld5aw+BMwUrAGjMpxs8m9Ki+L0mqKffz+6bQZWjCCxTQ00IduSYXkfxrriMu3iV5ddYLlDA2DLNEJsHQiQpQgpkV1ixFnseSBbvsxHKMUwJ3bmqAWD2m9saxfdi0DFSGE2KRzPw2pYCdEgvWDXgyHGz3TMK9Sx+7Psbn576jc8TcdaVIRcBVTL2EIk/9Kzs92RaGHmzRq2Al7E6VH0zZHmGEpkmrhD6GFqWx07TJb7oguIgYzpjQhicAn1uChjq0FqQdINkcng4sfHmuj9Dz5ASgYM7zWsYZWSrKtoQ+DG8kQqveJ99Pw7YRl1pOlkPt3i6FfBW57kZ15jM/8QGBT6Bxdxe34qeKWQQnU11jw0HgM8wp4VCXLwkuRV4G1PL3ql2ROzKfx13brCizEFhEMguASauRO0+XCNWfstPT30di9FKqrI5jYnfpF5A4n6pRanJof5JIshsGbbhiYmWJzojUJ5Ncnh5UmZoil0JclGi7LlZau9s/v97xAQxpHSJCNIY2FQwrAylDXRrg6tKw77J7S7Gr+nuVF3B3FWtvuvTIAjIJrukOrEIXyQ9M8sxLiLMBO15EImyqvEKTFswHSGmaRFpGzlUODnK+MFHmyUPNTZnDoxGWcjDOCrRcRzqt+D4v9BA4DvppLn0GXd/HIi3Fd/GjBj6AUVkI+IVBEbCauNjIF5h7FpVtiImYqd2/wOVXhakqn5VvGIcy81x+2xSqhCA1OUR1ahj0c2cnn2+eJUUw/oyylE6tOOd5o+QEYGxPVoeLSqrCOdkfCy2fjSa2xO8Oh0yIjIExPv+V8hlGVJFyYSmNGT/AXA380ZRw3rXrf1wWoBmggLWgqYdJVo2zQo4yy2HRmqMyXpW2RWUatLmjyo4tC4TXMOA2iaPR20yZHfPsyryp2serVFqATsCKmqCq7rIRfjM2/b4sc7nSM2Ak0VB0g7AQuBYajg3foqSBwGbSS5BbEsvzfdD8jafE9PtLYRNdb3cYR10M1PWOD2CiS2xWM6eIfeONk4snjtmljSMmAUfg5dqYTYkmp6rKSsIqgJ/u8GxiMTIFE/5PGSMT+xOUdiVR4LdTFqQKc8KQzhR3B60wSAsMUo0T/QTtwEboGdqTbZGuDfH88SiEo9ZeXocLoOdCTrRhfhjiSG8tNA60u+IEt5sfNfBFoVliVdoBc1jKlt3X8N6V3KACPbl9xtxiuV2hxnhkmh7cC/qcC+rOqb6nCnumRa1qIYmysroOpdFMZMm7m1PEhDdcZJkk0qJhkOKaiNkkx6C9odEB8b2axcTFx/OhejeWIyEQlaVccGyLXKFcoQZ+HeokZYlVDqZVWhq5jahsKk8maA3VSArTOI4cEcNhAAAgAElEQVRN4VopLKuE1vD+5lTgcWCSW5qVmCTYFt7fZANkbsjf8+/s8TXN3qaVkU8hdM3OzhquYYOYOzC/eCoZNpQlIy2pA0DDE8bHLBhpMJQOMUtkGGR3eL2D7Y5UdHfzo97xJVktcTbPTENVlaUybJhqcgwLY7h6idormbL40FQSGkl2qwKXaG8qeYOoNk2tVxaAoTs1Rrnx6/EcC11llKG23wIXYSr+sybplZGhUogqkZDmMQmDnEh8cPEYUlWLtJknliTk1SLlAiL7w9m7skAsG5d3OvLnbn7UwBcaU+NkGgtopLdW2BCjP54WpkpFpsXs0IapEda+4hunOnxTnaXYTJJd0dCzzZDAL5EWwDhNsRYlkpg6ti3SAzou9AIXDkwowi4pNrcQ/NSJmtMGEqNPpc08MbjoHPHvp0jNQctxxLCKP40puug+mU/w1JCMWKPhODjU5mys3Vu1lbC0LmCZXf5EGglUhFeXeNmAeypa465LUE8rsPx+RWqK8ZPpK9GSSBJjbOTmhX2LprMsIpFHz7ARJ0a7M+V7FBDlpSTUM4ErQDeODzwdTFhDAYLE+lXuwUVp3JlZmDIAZ6jENxE4buXgzCYZuiCb00ESaijpy71cBljs7kcN/OrzP5XEGBU0fHIF/BLOVHHMVHVpQG8kDLIbG42BCTQqnQ8TX8qFxWtTsfHDFtPYk8OhJK4MdSQHqOQEcnpUPb/chUPXln7YhB7+VZWLgM2k0mt+vkxroa5fa5EuUNgWer5cn5odqbdV74/9AlyBzFm4iHu+j32t9u5Gfb3jP/X5n05jjM22Lf8SKOIyWEUEotmpgM+nMHyQ6ux0556qOqUry4Bb9DGug9XRqKrymlPiKUtuw8hIoWxadLIthBz5Q/ZGrsOQyTKJhWjzjWszX+dyiBtzA9HvT8MaEz4ZuQR5fLGDqPh/jVk/wL5WqwZ+HeoYDJxJYsQSUhjWJhe35Gnz+VOCMwPaSl9TOQwLeCtpg8TSldZHwmoLSNJUgM+mEeropbIrdoYcKldJF6R9kVp6JZy7T5ZHs3hlQid2dLGgxvfHtJQ8/jgthLsn7SknkG1L0nrBAa4yy2KBa0KzXF0KlbkU7m65Qh3jP23fO5/EGFY7Ol0SpuyOxNAiO6ZTgmlCl91cFoU5DgzWjaLygtbnQhRPiUEu2huyR2belmF5uIjo00kQS6lMKFDTcE5akglrlOWmZsBQh91WXGQlZcaO9N7yROIOzzg/dF1JmMnzyH8rdzgm4aRJ+e4PtduYa9TAr2P8CvybWYatgiDjP7bEzZxXKzF1pb839GGlurkQ2kx1O0ZTYxZBYRaJxNV0UbaR55xgaMDPiSvC80geoLGVZNgcDnCg00YzCGQhEOiux/lUmVFzCvanJrZcfFxMZP45U5dafMPRc65VwGEX1WLhkWKVJSJSmkrhsm5318sV6h3/aTv+dp5hg+GAgNWwIOy5ZUxNNoUF/qleXmQJlZit0lIaxwWRL1cSBQF8NUlFkmQTsshQuWnsLv3rCnc/+jhs18Gt+1cQNhqys8subhsakiEKY/VUGtWNApTXMMI2nhbCBUlHlYQ80uluhG48PfjeReGpNK7s9tDydtdoz+dKaOodv7or21mGVRaxqgjeOARWHVPiQEaK0+z+svNLjy1DG1OVlSRX2BY6lRnmhd9nAspncBdnnJ1kmYDfMSy7lMQ43IEuDyhN59S0+suiE+N1ecjPkcBKdu4oy6QwJeQrfXYkoTUCZvL5wzSVnxuQ5uSuLxXeEtfMzqLh7m6dTr3jP33Hz1Kcol6nEnJV3SgCToYolAwwPjdaGBPfi5XHFI5iNEUYmxND4nUKyBRlwx7WxmNMaGMi5rEFXGXozsq3QfQ/4otTfYV/TocxV/ZWMrLHNJa4SLKxkTaw6aRyZmDhjKdM07IRS++uLWQQm2cIdZ4L1y8sSIV3tz/qHb9CwCDPcSaJMKLyUopY7KxiZdQUm6bOaNx5jY7HMDvyD9UFIsR/WtGr8lULbQ8b0cTMytK5ASJZGZbLNPUzJnEW8HJnruJ5Xpf8P0ErRbSp5MFkwfAdyo7NqcTilnjrVG4N3N85kWVcAi3bQZ8zbXUprYfXzs3tWtvApy/2GvjV3YiKHI/HyQVBGD0qucuzKiuN5ZUCZppkEsDSMVVp5KuOWTMmSGIS+vCYrkNTyTU6fRlCwVNFsmAK2IxPJl8j4BZaiJYglDQo6aQyi8UsNsomqOJkWNX2TLWWoJeKMXMHAb+J9XuWhbhyfmNPL8f+XDc3t9s3e/n9a+BXMCA//uB4LDy7KCCzFAVt+WSDNVPLLxhFWSb2ZoFoWpBioUkaVGQ+lpE9GF99cjxmVzfafeYLLESx8srTg03u1QljZGxCl7IoxcYTo9M0uqCplIJ9V/wZ5Pq58Kjb5wojxclaAX9u14I5vZjsysRGYNZ3cXlvpgZ+DfynMMBN+qEoRplEKD1f/Gkkp6z4dklVORaTOyurprbR50zbCqmd4eJhnM3uJyazPCn6mYZfTUDn16RlkHOnJGcwVuRlYcIpLi5TnzVhlHjoV6EVgc043VyX44a421cNMjw3LMvIHHg2aYXbl5Zw/9oqctuRhJzjg/Y2Q1zerXU69Y7/jL3voUkkdn0EIzkRSVQrZ2TTQ0sgGl/LCnUXYnY5GTglJSflaCTIXDueW8XommA1+p5hnKJhmQIWF4rR25vYXxLSqe5fpAlVQis/spRkmV8T1wWpNAOh5xiPnSwXTY8MfBDdhYMWB9jlnLyocaAZYm+71unUwH8G8B+LY+lvzYyRiBGjCb3I0MPw51PDKaE6L9gEmn3fJMG5UJi0HxmyB/fCmcBrUFKgZLSoLiqrQnrWy2khH4fs+kZ//1T5eKq351cZ/rANQIpWlV6I5rDGeYFitgKhUrh9cRGP9HfQL3IMkxTssD0y08NiLVeoY/xnBrvH4gR90zFuElHZZY2MQNj4SoosFjzQxrBVKHZjQmXyANOcMkw1QocN4dOuK9KTFQUqDmkcNM0dn1MULaSipaFTM717jPc9v99QRtbAppTpZHXR7jDcqWhJJrfU+DBp5oO+OVwKgWVjJ8swzhNYJXDt/Dzmgt3dZD79zOvk9mnoP5Ek2CrYBGIaPjqWxqAwSkxxXKjibwYfU/mBsR1kjF1ZAFb+lOKGQJaF8TxFbww/KECrrAglV5AClHmw+UQaTdgZRVZGfmaJhnJE28+qLeduadHhs55gSZzPnyMGstIVZmhN1ge4UCPO9oLCHs/BABYOtZqY9euqbR3qPGPLP5mkWBdRmIE4NTUMJ0zTyVNOCybrNcmsSJMl3ja23kZXY3p3eQ0+Ryq3HMhQsGglK0R2enFkk9eyP6uyKuRZwuks/MrTDF8lBOIVC1aPS1FiMtanRkcKV2IGa4ZJyBV5cnBWV845WxpzrsK1s7NourtrrOfFKKx6x3/anTmTpDiXG9+b6f4uoU7VFC6xduV+Zjw1jbz4Quv59GuVTkbsACUE4a5v6rpmZzYnhvjak6UR6p5ANswOC1KG768cfihfpqyhclUQI1sj85E5vRw2J522kvhWxjyFAb/021aT6169MCdCtvpR8/ifg4G1LMOplOasVaP59LufIzeunBUISqEfp176hqs3bI5ZNheaVyTpNUUqMzrCWAIau0GKybRRV0pSa3Z/UqGkOfkEM5DZnCBcOMYa3JITwZhGGYbHnApmUfB3YFDDIhx9d9gCeevC/IVFutvBX+/4T0MAp40fjWPDzlzwwzSsTkNxevlTMbnE9RXoyciYvJfgNjH/U/y/SX5F0SBjfgwojebGFMVsxlIc8kbQml5EeJaLgpNaqOWvmk+E3bfYnWUmzgmtWZlRcUE0XBstVnQdG2fT/ELTuweNlufj+tnd7ZD89MVeA/9pd2OYF3gsSaqZU4bFMZSmRp5mcDzHgKlKJKW9T/xsjBGsWIjIIrAkxJnqcsSoijs7OfvKJ38aTvHUcJQji4bAzigQqhwQWPgSbb7kD0bLzzFBF0IgBXRdD6PKi4emUS1Llg/G0qxumCBXl+g2Qhzp7m6H5Br4Fznn47LEA5NIYnwWlIS3r9SWFKYZwFWJrmbLnwltpg3joskX1QJ3ceNdaRzQRK5ZdWjxa5X9CC3whSatHNVYYS2NGWzTD5AVBZqeK9w9gU/uPsqYV9D8ytiNWIpDIoyFuZEvmCTcqDGBLk+qUmNvq4kDreZuj3Au/P71jv80KJCB+dRoYqQHxpn1qSkpMmzBaHMY+pCNISDFalDMZKdmTwaQFa1fWYxXsXnVRGJyZZMLTGXMknNWM7IkPrcdQ4UqS5SYrChPJQ1CjzKskkVjnNM4jX3e97CaVsk56VgH0rrIk+Bwt4vFxu6cYv5cq70G/tPuCqF+72gimpepS4LR4hufHe7wfJguK4YhQKNqE6Q9d6GNu4Ekx9Pm88oQil2x07hfACxmVZoRjmGHxMen4uRpbMXEtWpuMSN/TFOMsowkoVInGytC9uwWwIpPqrLERppB8SRgU0zFOl3Va2M+qIE//bhr4D9jO/j0KMKgGrsprmgl0HQqReWFsUDGjjsQtmRauDIXMtMOzfRzgleMpaTtr7LgkfCJhHt1MrDIRSMqOTVMZxcFcKIQFQWoif3ZASbVguqUMV7+xvFN3N8qZ4jLggZ24gS2a2FSsL+3kPd57WwP3brlsA51LhbsfnaSYDOjEO2pkZ1zeQyr0cB2kiMzJVqhCPkvG0pIQ4rzmQjZpg2CZiq68PWSnxpZsTGPMuy/qQWwmFVWjShmhhWvIH469LmX1URjWXPlwDYLRpgniePNyUANEMUITGYH0qdbdYSx71ZZuGVuBm2vbjmsd/yLIP/BSYLzaWYchysAqiyD7bnIc3Y+mYSVOy1BR37cyPVN9dY4GpsJJ0xIxZTKjDe/oPkRi5JqphZtRxjmUFU5bR1nIYodWYY9mvr8VAPkCnO9abM58wy+F2lMsanHz+R9i4FtVSPoui6um+nKAIn6UZETtaHU50LhWJLhRGrs+abUoyEoqxtWFaCkkZt93uJn42OSsZuKxShOKuewBjNzdlquksHQwgSZ3Zn/wyRazgJ2X0kuwfCFQ97MqE6+Oi+NASxfM5VByEhQmWzOAc5Gl8PFwCSWIZiZkG4hqwpevmXjNYuzZuhz/ZA7UMf4zwDC6TTFiYxSYcO4iHCs0ulM1QBTufKsS5GYib+5M0vDR6GRVi2LbO6WvV7aDFmdtY0RrIRRhDW5fmMhOA17lNgHmjfFny9thlX2YEKpaviDZWOSpCJB4N7OvTwU9kfDp84IdF0GfGUckm9bqDuvnv5R18B/BvCPjSY4nmsUlkK3TBFbHsjvSxN45aAsXVPV5MHFIMAwoaMBeXuNhAMYCNi8EI7+wmigahzPuDQVXy4UMXmdjgUtGd4UYgY1oM5GurUMk0P2SCaWMySqeni1aPHNbKxAlWhyEjoM0JlzsPPLLEZgzvdw81zdeVUD/3mO+/NJggfjAjpLUVZTwAm8kXLQdhXKnP6X9Ks3O61L4HHiSGUvzpAlyWnoSj982n2YQIkFMNKkmbLR4JJIJhj5IWzR0liwpY+kxCgHcmWj7ZQooxh9L6iKUZQem2nqLIBFYjdoIRQbcSOBo7f+eJLiUNvDqcQk2k4J7Gt5uK5XV21r4D8P8FejGA9nJZwiw0gbyw7pZK2axLmDuo4Fn5PDLTZxmzY/5gA0byV489woN5ncSnYgxalSePXUDVAkEWLbMcPaqkqvMD7C6xfIvQBRHCOzbfiuhSJjumpifxlMxy4xaTG0EErvr5bm8mHBvEPByqjdV4jY2GJZ2Bf4eNVs3XJYA/95gL+Z5bgvypBxZ5fQokSaZMjpc69LjKtRO2ImVbkmEGzirKDpWGySTMOqmMord3sZ1iwFKgtRkiFlLC+0oxGrsfJqxv4YCQNDmwhGViwLiF1ZtllcwgpVhrXSjkiev9C4NXTw8ChB2zGs0Hah0bMUDrYaONKtrcFr4D8P8IdFgU+MUqnAUivDOJvsCeNxk1ualkABq6glFah+5N+5a5PNkVmzgOzMDPIl+eTXbFsGveksw0jm5JoYnf9tVMp+anxiMeLJESkLSVaIrn5KhzKsYobMsGnetdAvTFLLlSWub2aFoawaaFirvabbxOF27ZBcA/95gE9gvn9rCNd1Bbip0JMG+Izrp1IEv/LRl921MLNmbVUitFl9pXSBbA8lxaaDi9Jjnh6TrBDwT63Fc+mUMtr5gDs9c4G8RCJaesbzZkYXKXjP+AEK20OtkKFNlagvqVOTWoKI6Uw3lq3pr6Nw7UwLK2EtV6iB/zzAJwj/8/YYOk7gBL4wJyz9c0CD7VgCylmHVKExjJXYnhXTyguTQx3ETIozazm0gaAmG2RDQD/OjDKT8Tifu5kXUgTr2Dw5TFMKI/o4LzCR2XIGzMwrGFrJUPVqYjmvE8iIUlOdFamEuEHI8F1ZHAy73rjQxVxQ99rWwL9EEee9myOhBrlTe3mGQRXSbGdm6JoMX2ZsXmlreDmCm/p52ZRFN280+mZnV5jQTYF0UFkIwLe1wqgs0Qo57bDAJNZwCo2mbyFPc6Ss3grADaXJR5pz56+aVyoWh50tTK1lHq4QOdVwaia+Cph3LNy+yEnmda9tDfxLAP+/bA4xTAtk1Xwqxu2tssA643KlMEgKdMxEZQF7ydOABSRbiRUIF8bUy9LYfLMYZmQGIiYW7Y0RmTGeD10LZB/J4PS3xnA9G1FUwGt48O0ShcykpR+PSWr5fnwaqZWGIhWHtmrw23TiOXMHhkHzNvDWlfm6avuMz7wuYD3HInjf9hhHCe4qMRUJMDT26xwnMjOAQSYYUpqsStn9GY9LYzldEKhIEElCKX42bBQXe0uGRtKeqJBbQCSSBguuzVAKiAYpwo4DKiYYsnC3lxZ1ZSEzck3oPEfgOxea3uVaJcd88jpGIzelVkWVGbq4eb5uOXzmx6zGcTRtKrrEPrh7vv2+rTEeGSfC5jQsYNnWOMviU1Hi6oaDJwYRbMeXVHfe1ljPNOh8z52ejA6HPjAkElanmpTCyq4uaRNu+moTxuEEMhParESz5SBOON6nmoA4bS4X2bFRbBpa1CTGRDh7U8gCibWgY8mcLdKswvzAwqwDvKoV4JbFWq7wLOAXHL1XPz7nDvzV+g7uHUyEuiQ7eEBlaLgWhkkhCemwLDHIzI5vWj9MeCMW4dzBFTDKaAhL30oTc5Nvz8nGEPSULVT8Z4s6Y11iJ+IiMbUBJrdMSknVcNo6m8vNSFBjWCvTUVhIk3ifwyzMouOKkKYUKCx6Fg55tszBfePKYv0JPzPUqYH/bEx8dGuID/UnsmPvRS5gYiwdStdHgYG20LGATQ5jM02ulWTBAJLxPZ/K3Zs7/1MjQEtoglU56IQWJhPjjhY4CuOiRKthYzgpUOQanmuKWLbjmg6WaoSo+YsRrolhMmXQzD1yw+MzdLo6AIaZxhVtH8px8ff3L9XAr4F/aQzcsz3CB3ZijJMULSasSY6DgcZGrjCOUjS7TbjjSJib1LIwycwgtlzAbkIS0eXLAjDxvTibcYicw4KTQhQXSG0HZa7R9DTGaYlslMIO3cqS0LQXkv+Xri7RCFXiaFkEZIw4P8uRn5UVRs1PqcJ+T8mJtC9gr20Ht+2ph0HUoc6lcY9jkxh/dHZTvHTOZFQ/AntVBtuxcX6UYlKySmXBR4ke+XnSldI4zt5Xku/0vjezbIXMlK4tCtbIzPAEABbnfAzHGRzfwWSSodV0sTNOzcRFUyUzcmTmDMYbUBbOVKTMRFqXGaAcFKWRPGS2wpGmg9Vhhmu6noQ+tyz0cHmvVmbWwH8BwH9yNMG7T/Ux65RCFZ6clDjkFDgVA0sNC+eTqt2Pw5TZFCLxOFAwmSWnogtkLJ8K6Bl/G8nCFNBiHcgwhSdGnMNh425eImeewJBF9DjGNEr2cV5DjBmELoK6kMhqCYXi1FiYkN055Nto28BWqnFZ28WrF2ZwsFsL1GrgvwDgr8YpfvXEBkKpxgLznsb9Q42uw5i+QCK2NkZwRk5e6EqyLZwe7tjI0gwlQw/LtBvKvCx2SOU5UsvhYYE0KTA/HyCOc9OJxapwxC4uE9p4noUoyuW6sgwE/FqayJnMVlb64rkpTA+noWigZbEfmBVbYMGz8ZWX7cFcbSvyrE9d1cnts1cCJ43/zKPnMBtQfqCxFRXYEzrYjHOMMkgnFWNs7r5CpsgwB0NDMsgvcu7cWpJTNzCKS1WU0JQ787WM+R2gzHJYPi3BbYx3Yrg+xQ8F9WkIohRRYzpWemquZrQ6MtfKs+RncGUxhJoOrDChkEZHa+xvefjGK1bElKp+fO4dUDnF4/Xjc+4AdTg/c2wNZVEgYEzuKEziAh2XM2ttrCUFhjHH9BgvSwKcCe3T4/A0KhB6QFL15eZRjpmuK4PY2J4ongu2wmLHxql+ZoY6p4XYgJtmdCP4EStC1gD4Pni6iLeOJaeMpAC8vnCj7A2gklThtp6HT45SXOXb+LbrDgm3Xz9q4F8SA9w9f+rRczIQOaTi0qWBa4GTMaUJGuMJQxpHQBd4FkJXY32Qy847hViR5lB0SPZco+tnAzhPC6XR63lIRzlcz8LRY0PsP9zCWCwdjLaHck9Key7s4jwhjMzHOCYz2RUPfFvEb7LLU88PoOFYWB3GeP2eJtJS4VuvPXjJ33c3PqHe8S/yqf/8o2cwoHJSusMtdD0lM6224xxJoRA2jJ6GETmru5QXe46WRDPPKu0+5QmOLWxMz7cxjnP0mg4efmQL7fkWvMBMK5xrOdgYZkJ5Ms+NeCKIipO7vdHkSIFKXKlMfYCvY5eXcV8wXg4LAScflohzYMa2cFU3wP945b7diOtL/s418C9yi37p8XPYTjPMhg50nGOHHVBFLskrQ4qdcY7CtzEZl+iGCqMoR8HwxzcTaZuBKyfBaj8ROjIapvA9C47nYr7rIIkzbG4lCGYbGJ4eo7mnARbRWeySQhQbSyqgSw2gSqYlgRa3BtYEDH26EPBUKbExKRDHJULfVI+v6oV4x9X7LwmC3fiEGvgX+dR/49gaHt6OUYxiwPMwF1BJCYn3R8Mcexd9YWRs30EyyeC4DsZRIjsvd+V8mIJDhRqdoDKONUxMOkpRZBlasy1wHNV4O4HTdpClZqCboWumYU7lq19JpGXcqLREmqIY8wXP0lhsejjfj3DzQhP3bkZYDj1ZQLcttnFXXbV9zk+4Bv5FgP+7J9fxyTNDKNtIBkhjznYdxHmJlmdhMCng+grxKBPqkUyMZZdgXzhj87lugGgUIZKsFXB8itE0ljou1ka5tCuOU41Gw4If+AhUgfVRccEQSoYncve3WUDTiEpDdBo1ENBu2JJ/kGXqsYklcHH3E31ct7+F41sJFjse3rDYwZsP1XKF5/qIa+BfBPj/+fQmPnx6IjOmGEvPz3hIaLldagzSAkkEzM17yOMMSa4Rtl0MdlJIv4ey4eoUo3GBxcUmNndiYJygtdjC9maEsOkgTQsETR8bR3fgt13Ekxyt+UByie2MKk+TyE57fKeFLF8VtHlAmRRIshKdhoOsLNClItRXSJICg1Rjf9PFXStzuH3v7G6MZC75O9fAv8gt+i+nNvD+02OJoffuCTDZnEjsvj0h5Viit7eBdCcRYLoNF5unh2h0A9i6QEzhWl6gt+ALVz+KjNgsHkYIuy4mOwWuOtzGJC+xsZ2a0IZDIlKZLSoU5+aI0gbT3sg1wNMlp98PBWlliT0zPlZ3EoSeDa8ssJOx/1YjTY2h7FLLxjuuXMHlta3Ic4c6WcZPqX488w787eoAf/LkADovoYdjqG4DBxcC7MSZNI2I93zCZhOFwC+haNgap0gTU8gSXQ2bvlUJ5duSzDY6nuQMSwc7OPngADsbIyxeOSf1gun4H752vDlBOBOa4W9ygNBFweQT7LwajArMNi3kWYnAt7Hej+E4DnSSYnG+gTObGV63L8SbD+3BUqtRf7jPcQdUDfznxsUn1wf49fs3cHCvjzMbOfY2Cuwwfmek4bGgxcFspCoVHNdMP0wnBbzQRmvGxWgrRc5wpuUijTJ094TYPNaH1/blz5nLutDGJ8rMrhUhmhH3m+lBhhJlRVhOFZQiY57pcvEVotZcXmzgzLkxejNMtOm0UGBv28ZmasaF/ps7jqDp1b22zxnj18B/buA/uj3Gz31yHTang1sOGj3a+gFRWqCQocxK4nKGKM1ZF5PtpJqPqzBeG6G1EAqYx5sRWgs+tk+M0V0JqqnlJnwXM4RCozPvYdLPZCKi33IE1PHI+Onw5DCuCQpWJc3nC23XRmgX6HUDnF0dIwxdmc5y8twEV+0NpVn+f7n9SF21vch5V+/4F7kxp4YRfua+dbSaFvr9FNfsa2BrkmK7n6PLkEWX2Fqnb74Fxy2RjDUaPRdh20Z/NZFdnMWnzlKAnXORLALh5qtRQlUPOlpzPvqnh3BCX2QPpDfdhiPANgPf+LpKB0RWp9TSf3tkX4Dz2zHiqEDDc+C6GvT6sRuedH3ta7j47lsvr8OcGvifHwYGcYZ/fc9peGkurmTdWQfJdoqtIRA2S/jdAMPNTBpJ2ktMfhPkrLaWjMW9qtpqYXCuj+7KDIo8r+TGQGc5wHAtRtC2oSdsPvGhkkKSYOpwZOhDNWc3aNrQuUZMmYQsAmM9TnmOowvsXQpwajVDyynhuzZ2himCtofFhosfuu3w5/dL76Jn1zv+RT5samv+9T1nsH2eIYzGzLyLRtfHaJxhuJpgbr8nLYmULXBHnmzmsuMHLRuTndTY/qkStush6ptuLe7gNKXaPraBpeuW0D87RDjXQrQ1RntPiGRAVsd0UhH8jaZCPOBsXPabmBFEjHo4+GFlJcBwJxf9PtmgyTBFo21OoplegP0NB9/32hr4F1vLNfAvcmcI9h/50BMYJVoAtD8AABJwSURBVGYQ27X7PZxci3H+xAQzy20EPQsZG8QZ6w9jKMtHTi3OvgYsR2Pz+ETCILI0rVkmuzksOlBVjSXi+VfkEteTOcrTEo1eKJVZhkluw4LXdKXSy7g/GRXIklJ6a5sdS0KiPfM+cs/GaJAjjkq4HmBzVFGU487DPXzLjbVA7aLAT0n81o/nvAM/dfeTePRoJOKw664OcXZYSCxPPr234iEelmi0LWyficXNmBnreDMW4HeWW8gmOdyGjc6Kj61jE6ncipy4BMJ5G+3QwfnTKXrLHgbnY0lgpTZLd4e8hBcCvRkPq6cncBwbXtvQmbzGzmaKLC3QZNP6sIDtAUFoY7SViZzhK69bxNfduLf+ZC8W49fAvzg2fv5Tp3Ca9EhRYPPJMfYsezIp5fzZDLP7Aqk6bZ8i0F1jF0I5gaPQnHOxcyaC5RpP+83HzuPQHfvghhbWj8XSRZXFKWaWA2kYP/OZDcxdPo88qXQ41eTEIiugJwmae0LkGTDZSTA7F6CgxmeTjFKBhQNNrJ+cIOi5KNkzsOBjuB7jHTct4w1XLNTAr4H/+WPgNx86hw/cfR57r5gB63zJpEBnzpYdm/Jf0jYF+299C1vHIglt+MjjCZxGKKD3WzYasx5G5yOoMkVnfxfrj4/gBBphw0JpK4w2TexvpiQaz3zx6clKtBY8CXP4dzewJZ43bYaG4fGdAlGicOururjn/k34gYN4nON//ZqrcN1iPQWlDnU+f9zjPZ85h/c/0EdnVqGMgRYVmUMTviSTHEHHxcaTMfI0w+IRAnpitPcHmoDOkFHY2WCOa6QGw/UcW0+uY/6KZegih2ITS89FvB0jo/qhSmqZwfK0mN3jiuw52slQZqXw+JQqcxHsuayJ048NEHY9kUOHHQuLvQBn1hPp3f2pr7oGK926alsD/0UA/08eWcPv/s15LB3wxb/G8TWyxHDtnX1tjLcSlJlCY8bD+mNb6O5tSSuisnNhcTae2BEmKB5Sk+8hnFeIdxy0lowJbLo1QLjUQ1kW2OSJwbE/bGO0FWaWfawdG8mJIcWuErLgZldCrD2xg4NXdvHk0QGWFn3x2kyTFEt72jj26KZIHH7pH9yItl9XbWvgvwjgv//YJt79gTO47OoWEgJ+EIPbbqPtYOf8GEE3QDxIRV3JgtPw/BgzB3rYOr6NJiu3NIPdSZAntiS23LVtDpArE3TmA2yeSlGkKdzQRXshRDxMMXOgJXp9kUJPSvSWfGydisWAkIslGYlLJ7TS8FtsdoG83nMtjOMCg42I5vr4ne+7va7aPs9nrurk9uJ35+6T2/i1+zYkwQxcG16XDR4l4mGBoENWJ0EyKtFbaYDN5aRTKFFodBwRkOVxCce3MVwjlUlNvi36nTxKpZNLzKJ8C7PLFsYDsyi2Tg4RdHyJ8cPZBrZODLB4RQeTQSb0Jp3V+mdHmD3YwvjcCAk9pXSJpcUA6xsRut0A47UIv/1Pb38RS333vKQG/vN81g+tDfG/v/c4ZpcCMXHNogxO08X2+Vjie2n+phsypw12PQzPk+GhvJi0ZQG/1cBkM5aFQqC7jRxl5kj1lWK3mUMh/JbCqU9tiZTBb3vIk1x28rgfo7Mcwm/72Dk3YvSP7nIb8ShGe76JjWNbGG5l2Hekg0QrDM4OsXygjdF2jLbj4Be//Zbdg+IX8ZuqhGd4/XjOO3Bye4Kf+OgZdGxgfS3G7EJDRvRwxhVj8WRIfTJ3bRvpOJXEl0BtLbiYbMUmjh/naM556J8yIjaPvPsWWxSNSs12czhBIIuovWjDdn3ogoZUFoK2hfOP9uEGDpavmcOp+9bQmvdNvB/YmGzHWDjURhEV2D4/RHeuibNHt/HaG/fgx7766vpTfb5Qpwb+xe/O6iDGj/7VCRRxCc8nQ+Oi3VRYPROj3fOwvZki6Sfo7msiTxS2nhwIhTlzIETQ87B1dACnwQqvRnPeQzrMYPtAONNCtDMR4JP5sV2NyRYrtLZw+Y2ZQMCeJTlGq0PM7O9h7fEtNGcCxDSWdajUtBB4NuYOdvDIR09JN9fs5V2sPbKFt96xD//0rVfUwK+B/+IwsBOl+Ce/9YhYeRCUjqdw5oEd+E0PrXlqhBXCeR9rD2+jOe8jnA1w7oEdWE6OzhLBnYhGf/HKHobrYzieg8lmJLs9QyXKERjH908NJRRauXkeUT+Wii8TXeYRjV6AyXaEwZmRsEZkfphYzx/qIhrEGG1NsHxZT5idbBJjsJbgHW86iLe/rpYrPN+nXoc6z3N3xkmOf/RrD6LR9ZCOJYtEHgPd5QCjjVjYHCazQScQvT0rqeEclZoxaCi1fMM8JlsTSWDJ/nAXZ4U1j0pk7NUd5TLJ3O/4siAkh2h46C42MFgbY/7wLDaObqGzt2nc0qh74/ysientJW0pMghVymIc91PsnB7iR77tenzZjcsvbrXvklfVwH+eDzrNcnzrrzwI5TnCrU/okeMqZHEhySxZmP7pSMKUhSu6SEZjNOcb0pM7XI1h07kVWnb0fbfuwfbJHQllvNATypIhTdAKsHl8ExklydVANxnpaUEWXLQdY/n6Raw+vIGla+cxPNNHc7Fp7MW3ImGPmnO+OLON1ico0hL/7gdeixsP1Nbg9Y7/IncxZv3f8nP3Y5IrxP1UwOi1HBGEFUkhgO/sbQhVyROBC2Ph8IwwLmRuHNeG3/Fge5Qa5PKaLMngtwLkcSquC4PzA2lSX3tkU0KlZGQWRDZJ0ZgNMdkYYfayngjXzj+8juVXLcrJEO9EmPRTcWZgkwsX0+DsCOkkxe/85Buwf7aeZF4D/0UCny/79l+4H1sTwAkURmuJgJz231E/kYqqEzL2Jz1pyw4/WhtJ4+zCkXkBteMZvp5hEGnP9mIH2yc3BdxirV/t8o5PTU6EwdkBuisdkSYMV0c4dMdBPP7Bx2WxEPCLVy9ImOS3PGTjTHT6zAkoaGNdgaHQe9/1FrTqqu3zfup1qHOJRfHdv/xZHD/J4pGNdJKIBz5332xCh+NCuHcKxrJJgiIz+p3mXBvjzZE8N+iFKLMMXuhj++QWGjMhktEE3b2zWHvkDHr7ZsU6sEhMUWtwto/ewTlMNkfw2w20FpqmQRcW0lEii4ea/Kg/gdvwjViNzGhRCvibTQf/9d+/5UK310tY81/UL1VxHNc8/vN8xD/yfz+CTz0whu2YMCfeiSWMIciMj6VCnqbwOLuKc6+SwiS5sw0BJ3l9ApdA9prMC+iDSc/LHF4zFBdkFqWCTgO2SznzFrxmIF1bjV4DbsNDFk3ghWxS4c/N4Qb06EnFQ1YaV+jIIK4M7L5y8WfvfMsXNWhfjl+uBv4l7uJvfeAUfufPz4PDB6mK5AKg7ICJLf+f4BdbPxnOQK+dRCzECX62H1JG3FpsIhnGAnx+L4tiqerGA+7aLrKIkgbjgz/eHBtPfJoju7acAmRtdMGkOpN8INqJ4PiuaP/FhEp8SHgS5HjNDfP497Vc4ZJrowb+JW7R2X6Mf/jj98mzzCAIA3wClS2CMspTmr+5EBi0a5RpKmM2pQ2QwFRaFgGBzKS2s9xB/1QfbuiZsZ2ebcDsUdlJR2UbyTCF12TLYSoMjkxNTzJZCDxZZNytyCVKOTXM3wv81PffgrtuqjuvLoX8GviXukMA/vG7PoMnjo1l+AJBLEPcpm5pMorHDG0QMJZl5ajAqSVmmjnjcy4MApOTEwlSnhYMj7iLE+gmTjcJ8LSTyywY09JoJh4aHx6ZiFh5a0qII/KHAnM9F3/8b7/MeOnXj+dPbusY/9II+bafvR+nTuwYcVm1w0/Hbk5nThHcxs/YhD9EpkyqfdoCEcByiJucDlRjcv4V+2tF7SYJqfHeMVbhfMisK05X4XXkKwb0Mi3FjFE0NuRa48CBJv7fH3vDpX+h+hmod/xLgIBtgN/wf92H4TY7qmKJowk6M2y5Grh8YQDQ9P/NDm0Gkps2QTPZxHRQTUf8XNiXq52doZIkyVpX/bfTsbZmlyfAzShQgbu5oOY0FLOIjlzWxbt/+I4a1i/gDtTAfwE36Vvf9WmsrhLMhTAsRRqbYF9TN8BElH+vJrGJUtkMcDOng/lTnkMfTBPJmHBFQhLzvekOXhmQmDVlVs5Toc3UOnwKfQE+Jc88bWz8/dfvxb/8xutewG9UP6UG/gvAwM/+2RP4609sQ8FBkSVm58/MpELAqUBtDJ/kQSBPp5DLNm++LAtBwD8FvNn9zZRyxvPmibZvo0hkwoRk1PIcGSd6YWCKtCuyUCavUcwhLPwf33Mj7rhq/gX8RvVTVBRFNY9/CRxsDFP8f+1dTWwbRRT+xrETEntNmgQaVCigAonUUsSBEuUKFy5cUA9UCHGDwgFUcQHuXBAnxN+hhwoEUhEHDggpB8SpEkg0qJRDJAK0UtNASXBs7ya2433ovTeTbEzSeN0Euc1ssvLa3tldf/vNm2/evJ332gc/458oK9JleYkfHNEwBOEyZ8UiJqib7dvKESGsklyStok3holqP3PG3+p2W2e0hRAppS2GthIawGM4MQRnPrTuT+lGZLK4a38Op1+fQM5WHk/t6yPgid8mQxYrdbxxegZXShz+u4Dy1Vnk+odU8nCiTUm8zAl+uAXgpKA6w7HT5cx17sTKdOBs8TfIFu0LiGyy8kdaCNH0NpdtT0ZnZpO8ttrRVQ8Q58Ct4b1TxzB+IGjz1/jdPPFTcKAcNfDO2Vmcn2V/Oj8Mfg31sCzE58ljOZQgk+0TC5zp6RW3Jkjdl1YDWb2v2cnVI2N1vIwFsAtUU3mK35+tul1522U/5FSg3MLw+bJmFW+9cAST417ipLiV8MRPgZbGxRC+/v5PnJmaR43YwtdxZforRAt/YPCeoyjsH0NPtl/8+pw0gglq+6LqjpSWQTacy0Y7uHa0loPWejh5dDajT1pZ4rv8tlyeLT37/x8+VMCrxx/CwWEfiZniNmo3zGv8dJDJCGkcoxQ2cPa7q5j6cQlxbwDQCuJ4GXE9UhkjBl1ljSZ2sANNUhncOe1glZCbZYxaeQ5FEE+Pk0s2FxaHLTSbTYwOZXHiibvx5CN3+mC0dLdvbW9P/JTAOauvidkI5bCBqfML+PbCEuYWY3m8kOI64mZNvC4cv6NxPBq2oKKdR3s19EDGqjTmQK1+hp+q0kwrIp8klxZXCODwoSKenhjFxIP7ZIpyv3SOgCd+Suwc8ZMVgMnJI66/zkeYnq3ip99DXOKp/NjrwwNePIWgxDTwf1Ozlwv/uTVYhSG27i7vlbYCPbksgiCHsfsG8fj4CB57YBCjt9/mLXzK+7XV7p74HQDZavXF+seEpjxsEssrJ4S+9PcKLv8VYbHcwHxpBYuVBmp1/q4h2VN4pmRO/8OZTAb6ezEyNIADI3mMDudx/2iAg8P9yEl0pnaG3drBJfsiLQiYKIq8H78DWiQtvyO+WP7WlUMKJFbeenCkZ6UTxErcDut6HoDi18TqvvOk7+DmtFHEE78NkDbbpVXyuE6ve12rDI74biAqSXxrxZnwyUog2zxYJZ4e5/pUaeSXnUGAiS9BtjtzuL11lM3Ir/Pba8c3uW1DK9cBclbfDloliS7bSWlj+wN7C91d/bVkwiiqGaB3V09zix7cDUxtWgGstNkgcRiHhPteyM1/juQJC+++E1nkLf2OMoiAGhN/1gA+IWqH0LaSX7idIL0qnIS+t+dxZE6S35Hcy5sOb0abxQj4zYTL4RlD5vk2y/jdtkBAw4o3kjz5masQKvHXHzRprQBJC+8t/e7QLQY+MZUwfDkDvL87p9h7R12Py3Fx+YpB8nMhf4t8SVaAvYfa//uLY+AVUyqV9uVyuWsaYuiXnUCgleSt75PnSFYAb+F3Av1tj9FsNBp3iDenWq1+Zox5dtsifof0CFj5s1VBT/b0kN5ICSL6vFAonBDiL1YqR/oymQverXkjkPqyNwECFGezR4O+votr/vtKGH5oiF66CS7eX6JHoCMEyJiPgnz+pDoY7EJE/WEYTgMY6+iovpBHoLsRmMnn848aY5Y3EJ/fVCqVw8aYcwB8Suzuvon+6tIhUCaiySAIfnHF/hOqUC6XJ03GfAPy5E+Hrd+7KxEwKFNMTxWLRTboa8umMTps+QF86WVPV95Kf1HtIzAD4Jmkpd/S4rsv5ubmBvJB8G4GeNF7e9pH2u/ZFQjwA2wfFwuFU07Tt17VtlGZ7OrMAW8aY44T8dRhfvEIdCcCxphVIvoCwNtBEFy83lVuS3xXmIiK1Wr1OTLmGIgmAboX5KM6u5MCt/5VGZ5aDqgTcBnGnDNEPxQKhU+NMTzfy7bLv19PNU18S0mLAAAAAElFTkSuQmCC"

/***/ }),
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */
/*!***********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/banner/banner2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/banner/banner2.png";

/***/ }),
/* 89 */
/*!*******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/cart.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 90 */
/*!*********************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/choice.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAACUVJREFUeF7tXX1wVNUV/523SwhJoMXwUbUgKALJxrQZ/lCYThukTJCWGTPtVIol44aMoU02WqeKTqedzPiHtTq2ZJMxmSZZGlpbHFudoYONiKE6IzAtZghZvhUStJZI1IZsTJbsu52z+SCb3X37dt992bdpzj/MkHvP+d3fvffdc8+99ywhibKyoWFBWtr1AlWoq4iwmohWCRW3gpANQgYEsgD4AfQD+BwQ/UTUI4Q4KwTOKKSc9ftntZ8rL7+arGbQVBpe09CQMZg2tAHAvQCtB5APwCgGAaADEG0A3kr3zz50vLx8YKraZRR8bJzV1YpjafZGEB4CsAVAZuxKhkr4AOyHwB5vd+9BVFerhrTFqGwagbl1dVmUIcoAPAKIZWY2IrpuugRgtxigxlMVFfwZkC7SCVz78gtzrvnslYLwBAQtkI44EYUkrgL03LyM6+4jP3jsi0RURKsjlUCHp3YrIJ4FsFQmSIm6ugHa5XVW/lmWTikE5jTW3qbY1HqANskCZrKeVjVA5afLKruM2jFMYF6z+0eCUAdgnlEwU1y/jwQqOktdfzBiN2ECl3k86Rnw1RFEqREAya5LBE+/yPrJJadzMBEsCRGY3/LiouHh4deIsDYRo1arIwSO2O32+ztKftwTL7a4CcxvcS8PBHAQwB3xGrN4+fdtNmzsKHFdjAdnXATmtdTliID6JoBb4jGSQmX/TTbl250lFaf1YtZNoKOxbgXsahsEvqpXeUqWI3yIYWW9t6zigh78uggsaK5Z6FfoXQis0KM05csQLqSpYl17adUnsdoSk8Dcl6vTyJf9NoC7YymbZn8/NnRNfOtCVdWQVrtiEujwuBsB7Jhm5OhtTpPX6eL9fFTRJHDUSd6r19p0LEcC27Wc7agEjmzPREcK7jBk92OfGqD8aNu+qAQ6PO6/AyiSjSZF9bV6na6I+/yIBI5GVf6Uoo01B7YQ27ylVWGchBE4Enb3syNp1ZCUOQTF1tqd7k/LmXxcEEagY4/7CQhwTG9GJjNA2OV9yPXrif8dQmAwDJ8ZuGiZSLL1urBXDCjLJh4PhBLocbsIqLEebusgEkDVKafLPYboBoF8enZbNu//llsHrjEkC+Zk4OlvbEDBopvR3vMxfv7Om/h00OiRCF3ydl29Y+y0b5xAR7O7CAR2XaaFZKWlYe9938Od87PH23Oo+wM88tYBCe1T7vM6K4Jc3SDQ4+YleqsE7UlXMUuxoX7jFtx9c2jgaCgwjDV762Xg2+d1uoJcBQkcdV04Gmv2obcM8Jo6uEHPfHMjvnv7qrByV78YQOG+ZhkYfDbb4OKOksd9QQJzPO77FeBVGZqTrePRNWtRdteaiDB2v3cUv+v4lxSIKlB82ul6LUhgnqe2XkCUS9GcRCUPrM7DL+4pjIjgbx+cxVNvHwRfpJEhBGrodFbuDBLo8LjPAbhThuJk6Vi/ZDl237sZCoXvTo99/CF2HtyP62pAJrzzXqdrJfEJWyAwfEWm5qnWlb9wMZqLipFut4eZPv9ZL7a//hf0+/mWnFyx2eyLyeGp2wSor8tVPXXals77Ev64+fuYnz4nzOgVXz+2HXgF/K8ZIhRsplyP+0kCnjHDgNk6mTQmj0mcLDzieOTxCDRLBPAUpWrInqcrT1uevpOFv3X8zeNvn8nSxAQeGrkxmjrCCwUvGLxwTBZeZXm15VXXdBHUxgRy7G+16cYkGmBXhV2WSPLb40fQePK4RGuaqs4wgbwCL5JlcbbNBlfBPfjaoq/gRM9/4G4/iqGAPPeBnWR2liPJvjOdeProYVlN0aOnhxye2j5AzNVTWk+ZyaOj7fLF4AZeFcZdWN6e8TYt0jmETDt62hksQ+jnEWi8ZRMsHt32MDgSMlFkjAwODHCAgAMFk6XjkysobX0Vg8PDutsuqyATyCfvoS02oP2drTsi+mRGvk0ckuLQ1OSOYZjdff/FgwdewWeG43yJNZoJ5EcqN4JmiekZrxXtA5/o6sg+nqeoGIsz+c1NqDBpTB6TmBQZmcK1F2U+Q5Dpn2k5yjxdedry9E2i9PBOpIOAu2SCkLFD0OoIXpB4YeKFI8kSdGNMcaSN7FG1HGUmjF0VXpgsIIdN3colGiXRcpTrT/wTte3HLMBdEEKT6cGEeON0FnOUNTtqNJhgfjhLb6TYco5yjHGugr4zZQFVrbMK/p690XXBko6yFofBgCoXcOxxnzf7/rPWaRlj4BBUpF1Gsh1lDQJHQvpBApvdDSA8bPaXOdp5bTS7SXeUNQgJOVSaymNN3o55NhUj56aFmv1lEUc5KsaQY838lucyA4F0dumn5GBdy9FmxBZylKMRGHqwHpzGHje/oX3A7Gk8pl/L0baQoxyNjtCrHSMEmu/OTEYTydHmaDJHbqwtES4XIXi9bcH7MgMLekhYd8tS/HJtIeanp+Ol0ydR894RabcH9NhPoEyXt6v39rDrbawod+aCZUw+CXi00+naPVYw/IpvhsqZLqTFB2MiSq0C2ld8R53qmUvm0To11iVzrjfzzCHqlND3zGFkZ1LzQxC9lFqzy3S0D3qdrjBOZp566eP9Da/TFfHZW1QCV3t+s8wG+4mZx4bos9nw9Wi5FLSfu3pqtwuIFn2dND1LEaik01kZ9cnvzINrjX4XoOZTzkrNx+YxCVxRUzN79lz6x//jk38fsgpjJeSJSSB30EzSiejDVBeBQdemsW6FsKmHCbh1en7tRlolgI8ooBRKTXsyRtho4p1WAEumKYmXyaYUmZJ4Z5zE5rolglR+J5Y7zUg8RULZ1FlacTmedumewhOVOhpfuAm2tP2AWBePMeuWpXcR8G/xlj32abwYEyKQjQRX53n0PAQq4zVqqfKE2qE+8bNYCXaixxcMtibv97XFQhX8gu/LBlVNdfXPCWJHp7Pqr0YMJzwCJxodzTHTkEJpUloDGN55xvlTjn0aEikEjiEYjeL8ysIZP7ohxJOR0pckyqJUAhkEp0HuG5jlAsTjlklewWmQhfL8vEx/jaXTIE/sxVVNz861K5m8j0x6Iu5h1dd0dseua4mOMq160kdgmLGZVPDy+u3GjxHQBkCsB4ivFhvtRAGIkwC1AeLQ9PsxAg3+OUhxXUGBqmJl2M9hjFwzGbtqwj8w4INALyn4aPznMBScm6WiXU+mSXnDIFTT/wBF/8Hkr25zqwAAAABJRU5ErkJggg=="

/***/ }),
/* 91 */
/*!******************************************************!*\
  !*** D:/我的/myapp/naicha/naicha/static/goods/del.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA2CAYAAACBWxqaAAAAAXNSR0IArs4c6QAAA9dJREFUaEPtWt9rHFUU/s5k3drWB5VqW0kq/mqhtoUSC4WWQl/yYPsPWAiSxLln3YQWan0oWBUFKeRBSkkzZ9YksAhCwDcrtIUaffEhWkQRQTGSlgZrxVUobX7szC03zMpksz8ys+luIXPedu+c833fuXfO3DtnCA2aiGzwPG9dnDBtbW1zzHw3jm/JhxpxFpELADIA4sbRAM4z84m4POICI5fLdfq+/11c4LAfEe1VSv0QJ1ZsASLyAYAzcUAr+LzLzB/GidWIgGsA9gagJnsfRSRgxO8OfK4xc2dE/8XLYwkQkW0ApkOAp5n5bBQCjuO8Q0SlrOtUKtXe19c3EyVGbAGu62a11kMlMMuydtq2/UsUcBEx2f8x5JNl5uEoMWILEJFLALoCsN+Z+cWowOZ6EZkC8NwiEaIvlVJHosaJvISGhoYeS6VSfwMo1f6PmflkVOBAwDkAxwPfuWKxuKm/v/9OlFgUEHqdiDrCjlrrpwG8pLVOlZW8JwFsD/1XAHAvCmjo2vUAngj9/lVr/U8ZXhHAb0T0VxnG9YWFhTyJyNcADsUk0FI3IpowAm4AaG8pk/jg0+Q4zqtENAhgayiOWd8bQr/NI3/JzMbHrOlZC8fsmeZC3jNE9FbFm1hE3gRg9jmLxsyRb/bVECgiYUEVy2wiYDUyXS1GMgNr5h7I5/MbZ2dnDxPRpG3bt2otK9d1X/Z9fwszXyWi8qqzxLVpS8hxnG+JaD8AQ34HM/9XScTw8PABy7ImAKSI6D2llDlTVLWmCMjlcpt93/+zxEJr3ZXJZK5UYuU4ziARnQrGfmbmXS0XUOFscJSZL1YiFpyhzTPG2HVmfjYRUCVTK34SJzPQ6ps4mYFkBipkIMp2OllCyRJKltCy14zJVqK0KJqyG02qUFKFkiqUVKHWnonXWhU6D2AgSPkUM7/wMJyJHwFwE8BTADzP87Zns1nTOlpmrut2a63zZoCIPlNKHWu5AEPANL09zxuwLOtzpdQX1UiNj4+3FQqFt7XWHel0+v3e3t7bD4WAWiQaGWvKVqIRgvV8164Ax3F6iGi0lCHLsp63bfuPehlbzfGRkZFnisWiKQ6LprXuzmQyn5ZjVOvQlHfRR5VSb9R7m7xaArTW5LruJwB6QzH3MPNPKxJgLhKRSQCvhByMs/nP9G0fpJm+tMHdEwL5npnDXP4fqtq8c113n9b6GwCPPki2K4g9T0QHlVImecusZvdRRMz3EGbdmYdUK8x07V9j5svVwOu2T8fGxh6fn5+3ARwGYD4/aIaZzwq+SqfTuZ6enn9rAdYV0Ay2jWDcB8NKCnyLGMWZAAAAAElFTkSuQmCC"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map