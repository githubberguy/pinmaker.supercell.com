/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"auth~home":"auth~home","auth":"auth","home":"home"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/BaseButton.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'BaseButton',
  props: {
    selector: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    adaptiveWidth: {
      type: Boolean,
      default: false
    },
    disabled: Boolean
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/RectangleButton.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: ButtonColors, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonColors", function() { return ButtonColors; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _PickedLabel_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PickedLabel.vue */ "./src/components/PickedLabel.vue");


const ButtonColors = {
  yellow: 'yellow',
  purple: 'purple',
  dark: 'dark',
  blue: 'blue',
  red: 'red'
};
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'RectangleButton',
  components: {
    PickedLabel: _PickedLabel_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    func: {
      type: Function,
      default: () => {}
    },
    selector: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Label'
    },
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    slanted: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator(value) {
        return Object.values(ButtonColors).includes(value);
      },
      default: ButtonColors.yellow
    },
    selected: {
      // Users selected option
      type: Boolean,
      default: false
    },
    stretch: {
      type: Boolean,
      default: false
    },
    inactive: {
      type: Boolean,
      default: false
    },
    withNoPadding: {
      type: Boolean,
      default: false
    },
    withSmallPadding: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasIcon: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    ButtonColors,
    showGlow: false,
    startTouchTarget: null
  })
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/SocialButton.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: SocialItems, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialItems", function() { return SocialItems; });
/* harmony import */ var _LinkButtonWrapper_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LinkButtonWrapper.vue */ "./src/components/LinkButtonWrapper.vue");

const SocialItems = {
  link: 'link',
  facebook: 'facebook',
  twitter: 'twitter',
  youtube: 'youtube',
  instagram: 'instagram',
  linkedin: 'linkedin',
  glassdoor: 'glassdoor',
  bilibili: 'bilibili',
  tiktok: 'tiktok'
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'SocialButton',
  components: {
    LinkButtonWrapper: _LinkButtonWrapper_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_blank'
    },
    to: {
      type: String,
      default: ''
    },
    social: {
      type: String,
      validator(value) {
        return Object.values(SocialItems).includes(value);
      },
      default: 'link'
    }
  },
  data() {
    return {
      SocialItems
    };
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Footer.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Buttons_SocialButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Buttons/SocialButton.vue */ "./src/components/Buttons/SocialButton.vue");
/* harmony import */ var _Buttons_RectangleButton_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Buttons/RectangleButton.vue */ "./src/components/Buttons/RectangleButton.vue");
/* harmony import */ var _LocaleSelect_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocaleSelect.vue */ "./src/components/LocaleSelect.vue");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _config_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/config/i18n */ "./src/config/i18n.ts");






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Footer',
  props: {
    msg: String
  },
  components: {
    SocialButton: _Buttons_SocialButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    RectangleButton: _Buttons_RectangleButton_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    LocaleSelect: _LocaleSelect_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data() {
    return {
      LOCALE_OPTIONS: _constants__WEBPACK_IMPORTED_MODULE_4__["LOCALE_OPTIONS"]
    };
  },
  methods: {
    onLocaleChange(newLocale) {
      this.$router.push({
        params: {
          lang: newLocale.value
        }
      });
      _config_i18n__WEBPACK_IMPORTED_MODULE_5__["i18n"].locale = newLocale.value;

      // Clear old attr and add new for locale specific styling
      document.documentElement.lang = '';
      document.documentElement.lang = newLocale.value;
    },
    updateAppStoreSrc(e) {
      e.target.src = '/app-store.png';
    },
    updateGPlaySrc(e) {
      e.target.src = '/play-store.png';
    }
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PickedLabel.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PickedLabel',
  props: {
    notAbsolute: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        '--size': this.isLarge ? '24px' : '18px'
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=ts ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _components_Footer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Footer.vue */ "./src/components/Footer.vue");
/* harmony import */ var _stores_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/stores/store */ "./src/stores/store.ts");



/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'App',
  components: {
    Footer: _components_Footer_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  computed: {
    ...Object(_stores_store__WEBPACK_IMPORTED_MODULE_2__["mapper"])(['footerVisible', 'pickingColor']),
    version() {
      return process ? "2.0.2" : '';
    },
    showVersion() {
      return process ?  false || "prod-aws" === 'staging' : false;
    }
  },
  created() {
    this.ssoInit();
    this.showFooter(window.innerWidth >= 1280);
    this.setIsLandscape(window.innerWidth > window.innerHeight);
    this.setIsDesktop(window.innerWidth >= 1280);
  },
  watch: {
    pickingColor(val, old) {
      if (val && !old && this.footerVisible) {
        document.body.style.overflowY = 'hidden';
        this.$refs.appWrapper.scrollTop = 0;
      } else if (!val && old && this.footerVisible) {
        document.body.style.overflowY = 'auto';
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    document.getElementsByTagName('html')[0].setAttribute('version', this.version || '');
    // Add locale class to body to handle locale specific styling
    document.documentElement.lang = this.$i18n.locale;
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    ...Object(_stores_store__WEBPACK_IMPORTED_MODULE_2__["mapper"])(['setActiveCategory', 'showFooter', 'setIsLandscape', 'setIsTablet', 'setIsDesktop']),
    ...Object(_stores_store__WEBPACK_IMPORTED_MODULE_2__["mapper"])('auth', ['ssoInit']),
    onResize() {
      this.showFooter(window.innerWidth >= 1280);
      this.setIsLandscape(window.innerWidth > window.innerHeight);
      this.setIsTablet(window.innerWidth >= 676);
      this.setIsDesktop(window.innerWidth >= 1280);
      this.updateSizes();
      this.$root.$emit(`resize`, true); // TODO: Slow down resize event
    },
    updateSizes() {
      // Workaround for iOS Safari making sure it always cover the screen
      document.body.style.minHeight = window.innerHeight + 'px';
      document.body.style.minWidth = window.innerWidth + 'px';
      document.body.style.width = '100%';
      document.body.style.minWidth = '100%';
    }
  }
}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/node-libs-browser/mock/process.js */ "./node_modules/node-libs-browser/mock/process.js")))

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=script&lang=ts":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseLink.vue?vue&type=script&lang=ts ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'BaseLink',
  props: {
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    download: {
      type: Boolean,
      default: false
    }
  },
  computed: {}
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=script&lang=ts":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/ChevronIcon.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/enums */ "./src/enums/index.ts");


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'ChevronIcon',
  props: {
    size: {
      type: Object,
      default: () => ({
        width: 24,
        height: 24
      }),
      validator: value => value.width !== undefined && typeof value.width === 'number' && value.height !== undefined && typeof value.height === 'number'
    },
    color: {
      type: String,
      default: _enums__WEBPACK_IMPORTED_MODULE_1__["Color"].Black,
      validator: value => Object.values(_enums__WEBPACK_IMPORTED_MODULE_1__["Color"]).includes(value)
    },
    direction: {
      type: String,
      default: _enums__WEBPACK_IMPORTED_MODULE_1__["Direction"].Down,
      validator: value => Object.values(_enums__WEBPACK_IMPORTED_MODULE_1__["Direction"]).includes(value)
    }
  }
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=script&lang=ts":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/GlobeIcon.vue?vue&type=script&lang=ts ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/enums */ "./src/enums/index.ts");


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'GlobeIcon',
  props: {
    size: {
      type: Object,
      default: () => ({
        width: 24,
        height: 24
      }),
      validator: value => value.width !== undefined && typeof value.width === 'number' && value.height !== undefined && typeof value.height === 'number'
    },
    color: {
      type: String,
      default: _enums__WEBPACK_IMPORTED_MODULE_1__["Color"].Black,
      validator: value => Object.values(_enums__WEBPACK_IMPORTED_MODULE_1__["Color"]).includes(value)
    }
  }
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LinkButtonWrapper.vue?vue&type=script&lang=ts":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LinkButtonWrapper.vue?vue&type=script&lang=ts ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _BaseLink_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseLink.vue */ "./src/components/BaseLink.vue");
/* harmony import */ var _Buttons_BaseButton_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Buttons/BaseButton.vue */ "./src/components/Buttons/BaseButton.vue");



/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'LinkButtonWrapper',
  components: {
    BaseLink: _BaseLink_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    BaseButton: _Buttons_BaseButton_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    selector: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    download: {
      type: Boolean,
      default: false
    },
    adaptiveWidth: {
      type: Boolean,
      default: false
    },
    disabled: Boolean
  }
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=script&lang=ts":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LocaleSelect.vue?vue&type=script&lang=ts ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/enums */ "./src/enums/index.ts");
/* harmony import */ var _Icons_ChevronIcon_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Icons/ChevronIcon.vue */ "./src/components/Icons/ChevronIcon.vue");
/* harmony import */ var _Icons_GlobeIcon_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Icons/GlobeIcon.vue */ "./src/components/Icons/GlobeIcon.vue");





const DESKTOP_SELECT_WIDTH = 160;
const DESKTOP_SELECT_MAX_HEIGHT = 269;
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'LocaleSelect',
  components: {
    ChevronIcon: _Icons_ChevronIcon_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    GlobeIcon: _Icons_GlobeIcon_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  props: {
    value: {
      type: String,
      default: _constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_LOCALE"].value
    },
    options: {
      type: Array,
      default: () => []
    },
    textColor: {
      type: String,
      default: _enums__WEBPACK_IMPORTED_MODULE_2__["Color"].White,
      validator: value => Object.values(_enums__WEBPACK_IMPORTED_MODULE_2__["Color"]).includes(value)
    }
  },
  data: function () {
    return {
      isOpen: false,
      alignedRight: false,
      alignedBottom: false,
      desktopSelectItem: null,
      iconSize: {
        width: 18,
        height: 18
      }
    };
  },
  computed: {
    chevronDirection() {
      return this.isOpen ? _enums__WEBPACK_IMPORTED_MODULE_2__["Direction"].Up : _enums__WEBPACK_IMPORTED_MODULE_2__["Direction"].Down;
    },
    isMobile() {
      return window.innerWidth <= 736; // tablet size from sass mq,
    }
  },
  methods: {
    isOptionActive(option) {
      return option.value === this.$props.value;
    },
    onChange(e) {
      const selectedOption = this.$props.options.find(option => option.value === e.target.value);
      selectedOption && this.$emit('change', {
        ...selectedOption
      });
    },
    onChangeDesktop(e) {
      const targetValue = e.target.getAttribute('data-value');
      const selectedOption = this.$props.options.find(x => x.value === targetValue);
      // Close when change even for multiple select
      this.onCloseDesktop();
      this.$emit('change', selectedOption);
    },
    toggleDesktop() {
      if (this.isMobile) return;
      this.isOpen = !this.isOpen;
    },
    onClickOutside(e) {
      const localeSelect = this.$refs.localeSelect;
      if (!this.isMobile && localeSelect && !localeSelect.contains(e.target)) {
        this.onCloseDesktop();
        this.isOpen = false;
      }
    },
    onOpenDesktop() {
      window.addEventListener('click', this.onClickOutside);
    },
    onCloseDesktop() {
      window.removeEventListener('click', this.onClickOutside);
    },
    onResize() {
      if (this.$refs.localeSelect) {
        const localeSelect = this.$refs.localeSelect;
        // Check if we need to right-align desktop-select
        const offsetRight = window.innerWidth - (localeSelect.offsetLeft + localeSelect.clientWidth);
        if (offsetRight < DESKTOP_SELECT_WIDTH) this.alignedRight = true;else this.alignedRight = false;
        // Check if we need to bottom-align desktop-select
        let offsetTop = 0;
        let parent = localeSelect.offsetParent;
        while (parent) {
          offsetTop += parent.offsetTop;
          parent = parent.offsetParent;
        }
        const offsetBottom = document.body.clientHeight - (offsetTop + localeSelect.clientHeight);
        document.body.clientHeight;
        if (offsetBottom < DESKTOP_SELECT_MAX_HEIGHT) {
          this.alignedBottom = true;
        } else {
          this.alignedBottom = false;
        }
      }
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    isOpen() {
      if (this.isOpen) this.onOpenDesktop();else this.onCloseDesktop();
    }
  }
}));

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    ref: "appWrapper",
    staticClass: "app-wrapper",
    class: {
      "app-wrapper--noscroll": _vm.pickingColor
    }
  }, [_vm.showVersion ? _c("div", {
    staticClass: "app-wrapper__version",
    domProps: {
      textContent: _vm._s("v" + _vm.version)
    }
  }) : _vm._e(), _c("router-view"), _vm.footerVisible && !_vm.pickingColor ? _c("Footer", {
    on: {
      close: function ($event) {
        return _vm.showFooter(false);
      }
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("a", {
    staticClass: "BaseLink",
    attrs: {
      href: _vm.href,
      download: ""
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.href || _vm.to ? _c("BaseLink", {
    attrs: {
      href: _vm.href,
      to: _vm.to,
      target: _vm.target
    }
  }, [_vm._t("default")], 2) : _c("button", {
    staticClass: "BaseButton",
    class: {
      "BaseButton--selector": _vm.$props.selector,
      "BaseButton--adaptive-width": _vm.$props.adaptiveWidth
    },
    attrs: {
      disabled: _vm.disabled
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "RectangleButton",
    class: {
      "RectangleButton--slanted": _vm.$props.slanted,
      "RectangleButton--inactive": _vm.$props.inactive,
      "RectangleButton--disabled": _vm.$props.disabled,
      "RectangleButton--withNoPadding": _vm.$props.withNoPadding,
      "RectangleButton--withSmallPadding": _vm.$props.withSmallPadding,
      "RectangleButton--imageButton": _vm.$props.isImageButton,
      "RectangleButton--dark": _vm.$props.color == _vm.ButtonColors.dark,
      "RectangleButton--blue": _vm.$props.color == _vm.ButtonColors.blue,
      "RectangleButton--hasIcon": _vm.$props.hasIcon
    },
    on: {
      click: _vm.$props.func
    }
  }, [_c("div", {
    staticClass: "RectangleButton__background",
    class: {
      "RectangleButton__background--inactive": !_vm.$props.correct && _vm.$props.inactive
    }
  }, [_vm.$props.selected ? _c("div", {
    class: {
      "RectangleButton--pickedBorder": _vm.$props.selected
    }
  }) : _vm._e(), !_vm.$props.selected && _vm.$props.correct ? _c("div", {
    class: {
      "RectangleButton--correctBorder": _vm.$props.correct && _vm.$props.inactive
    }
  }) : _vm._e(), _vm.$props.selected && _vm.$props.correct && _vm.$props.inactive ? _c("div", {
    staticClass: "RectangleButton--correctIcon"
  }) : _vm._e(), _c("PickedLabel", {
    attrs: {
      disabled: _vm.$props.disabled
    }
  }, [_vm._v(" " + _vm._s(_vm.$props.label) + " ")]), _vm.$props.hasIcon ? _c("div", {
    staticClass: "RectangleButton__icon"
  }) : _vm._e()], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=template&id=4813229d&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/SocialButton.vue?vue&type=template&id=4813229d&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("LinkButtonWrapper", {
    attrs: {
      to: _vm.$props.to,
      href: _vm.$props.href,
      target: _vm.$props.target,
      "aria-label": _vm.$props.social
    }
  }, [_c("div", {
    ref: "socialButton",
    staticClass: "socialButton",
    class: {
      "socialButton--link": _vm.$props.social === _vm.SocialItems.link,
      "socialButton--twitter": _vm.$props.social === _vm.SocialItems.twitter,
      "socialButton--facebook": _vm.$props.social === _vm.SocialItems.facebook,
      "socialButton--youtube": _vm.$props.social === _vm.SocialItems.youtube,
      "socialButton--instagram": _vm.$props.social === _vm.SocialItems.instagram,
      "socialButton--linkedin": _vm.$props.social === _vm.SocialItems.linkedin,
      "socialButton--glassdoor": _vm.$props.social === _vm.SocialItems.glassdoor,
      "socialButton--bilibili": _vm.$props.social === _vm.SocialItems.bilibili,
      "socialButton--tiktok": _vm.$props.social === _vm.SocialItems.tiktok
    }
  }, [_c("div", {
    staticClass: "socialButton__icon"
  })])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=template&id=40ab164b&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Footer.vue?vue&type=template&id=40ab164b&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("footer", {
    staticClass: "footer"
  }, [_c("div", {
    staticClass: "navBar"
  }, [_c("div", {
    staticClass: "footer__navCloseButton"
  }, [_c("RectangleButton", {
    attrs: {
      slanted: "",
      color: "dark",
      label: "x",
      func: () => _vm.$emit("close")
    }
  })], 1)]), _c("div", {
    staticClass: "inner"
  }, [_c("div", {
    staticClass: "langSelect__wrapper"
  }, [_c("div", {
    staticClass: "langSelect"
  }, [_c("LocaleSelect", {
    attrs: {
      options: _vm.LOCALE_OPTIONS,
      value: _vm.$i18n.locale,
      color: "white",
      textColor: "white"
    },
    on: {
      change: _vm.onLocaleChange
    }
  })], 1)]), _c("div", {
    staticClass: "gameInfoContainer"
  }, [_c("div", {
    staticClass: "header"
  }), _c("div", {
    staticClass: "linksContainer"
  }, [_c("div", {
    staticClass: "socials"
  }, [_c("p", {
    domProps: {
      textContent: _vm._s(_vm.$t("gen_fol"))
    }
  }), _c("div", {
    staticClass: "socials__buttons"
  }, [_c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_youtube"),
      social: "youtube"
    }
  }), _c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_facebook"),
      social: "facebook"
    }
  }), _c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_instagram"),
      social: "instagram"
    }
  }), _c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_twitter"),
      social: "twitter"
    }
  }), _c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_tiktok"),
      social: "tiktok"
    }
  }), _c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_linkedin"),
      social: "linkedin"
    }
  }), _c("SocialButton", {
    attrs: {
      href: _vm.$t("footer_li_glassdoor"),
      social: "glassdoor"
    }
  })], 1)]), _c("div", {
    staticClass: "downloadButtonsContainer"
  }, [_c("p", {
    domProps: {
      textContent: _vm._s(_vm.$t("footer_gen_dl_gam"))
    }
  }), _c("a", {
    attrs: {
      href: _vm.$t("link_BS_apap"),
      target: "_blank"
    }
  }, [_c("picture", [_c("img", {
    staticClass: "apple",
    attrs: {
      src: `/Download_on_the_App_Store_Badge_${this.$i18n.locale}.svg`,
      alt: "App Store"
    },
    on: {
      error: _vm.updateAppStoreSrc
    }
  }), _c("source", {
    attrs: {
      srcset: "/app-store.png"
    }
  })])]), _c("a", {
    attrs: {
      href: _vm.$t("link_BS_apgl"),
      target: "_blank"
    }
  }, [_c("picture", [_c("img", {
    staticClass: "img-gplay",
    attrs: {
      src: `/google-play-badge__${this.$i18n.locale}.png`,
      alt: "Google Play"
    },
    on: {
      error: _vm.updateGPlaySrc
    }
  })])])])])]), _c("div", {
    staticClass: "externalLinksContainer"
  }, [_c("a", {
    attrs: {
      href: _vm.$t("footer_li_tos_url"),
      target: "_blank"
    },
    domProps: {
      textContent: _vm._s(_vm.$t("footer_li_tos_label"))
    }
  }), _c("a", {
    attrs: {
      href: _vm.$t("footer_li_pp_url"),
      target: "_blank"
    },
    domProps: {
      textContent: _vm._s(_vm.$t("footer_li_pp_label"))
    }
  }), _c("a", {
    attrs: {
      href: _vm.$t("footer_li_pg_url"),
      target: "_blank"
    },
    domProps: {
      textContent: _vm._s(_vm.$t("footer_li_pg_label"))
    }
  }), _c("a", {
    attrs: {
      href: _vm.$t("footer_li_safp_url"),
      target: "_blank"
    },
    domProps: {
      textContent: _vm._s(_vm.$t("footer_li_safp_label"))
    }
  })]), _c("div", {
    staticClass: "supercellInfoContainer"
  }, [_c("div", {
    staticClass: "addressContainer"
  }, [_c("p", {
    domProps: {
      textContent: _vm._s(_vm.$t("gen_add1"))
    }
  }), _c("p", {
    domProps: {
      textContent: _vm._s(_vm.$t("gen_add2"))
    }
  }), _c("p", {
    domProps: {
      textContent: _vm._s(_vm.$t("gen_add3"))
    }
  }), _c("p", {
    domProps: {
      textContent: _vm._s(_vm.$t("gen_add4"))
    }
  })]), _c("div", {
    staticClass: "logoContainer"
  }, [_c("a", {
    attrs: {
      href: _vm.$t("footer_li_sc_url")
    }
  }, [_c("img", {
    attrs: {
      src: "/Supercell.svg",
      alt: _vm.$t("footer_li_sc_label")
    }
  })])])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "icon",
    class: {
      [_vm.direction]: true
    },
    style: {
      height: `${_vm.size.height}px`,
      width: `${_vm.size.width}px`
    }
  }, [_c("svg", {
    staticClass: "icon__svg",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512"
    }
  }, [_c("path", {
    attrs: {
      fill: _vm.color,
      d: "M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
    }
  })])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "icon",
    style: {
      height: `${_vm.size.height}px`,
      width: `${_vm.size.width}px`
    }
  }, [_c("svg", {
    staticClass: "icon__svg",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c("circle", {
    attrs: {
      stroke: _vm.color,
      cx: "12",
      cy: "12",
      r: "10"
    }
  }), _c("line", {
    attrs: {
      stroke: _vm.color,
      x1: "2",
      y1: "12",
      x2: "22",
      y2: "12"
    }
  }), _c("path", {
    attrs: {
      stroke: _vm.color,
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
    }
  })])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LinkButtonWrapper.vue?vue&type=template&id=521c78b2":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LinkButtonWrapper.vue?vue&type=template&id=521c78b2 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _vm.href || _vm.to ? _c("BaseLink", {
    attrs: {
      href: _vm.href,
      to: _vm.to,
      target: _vm.target,
      download: _vm.download
    }
  }, [_vm._t("default")], 2) : _c("BaseButton", {
    attrs: {
      disabled: _vm.disabled,
      selector: this.selector,
      adaptiveWidth: _vm.$props.adaptiveWidth
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    ref: "localeSelect",
    staticClass: "localeSelect",
    class: {
      "localeSelect--alignedRight": _vm.alignedRight,
      "localeSelect--alignedBottom": _vm.alignedBottom
    },
    on: {
      click: _vm.toggleDesktop
    }
  }, [_c("div", {
    staticClass: "localeSelect__globe"
  }, [_c("GlobeIcon", {
    attrs: {
      color: _vm.textColor,
      size: _vm.iconSize
    }
  })], 1), _c("select", {
    staticClass: "localeSelect__select",
    class: {
      [_vm.$props.textColor]: _vm.$props.textColor
    },
    on: {
      change: _vm.onChange
    }
  }, _vm._l(_vm.$props.options, function (option) {
    return _c("option", {
      key: option.value,
      domProps: {
        value: option.value,
        selected: _vm.isOptionActive(option),
        textContent: _vm._s(_vm.$t(option.label))
      }
    });
  }), 0), _c("div", {
    staticClass: "localeSelect__chevron"
  }, [_c("ChevronIcon", {
    attrs: {
      size: {
        width: 12,
        height: 12
      },
      color: _vm.$props.textColor,
      direction: _vm.chevronDirection
    }
  })], 1), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.isMobile && _vm.isOpen,
      expression: "!isMobile && isOpen"
    }],
    ref: "desktopSelect",
    staticClass: "localeSelect__desktopOptions"
  }, _vm._l(_vm.options, function (option, index) {
    return _c("div", {
      key: `desktop-select-option-${index}`,
      ref: "desktopSelectItem",
      refInFor: true,
      staticClass: "localeSelect__desktopOption",
      class: {
        active: _vm.isOptionActive(option)
      },
      attrs: {
        "data-value": option.value
      },
      on: {
        click: _vm.onChangeDesktop
      }
    }, [_c("p", {
      staticClass: "localeSelect__desktopLabel",
      domProps: {
        textContent: _vm._s(_vm.$t(option.label))
      }
    })]);
  }), 0)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "pickedLabel",
    class: {
      "pickedLabel--disabled": _vm.$props.disabled
    },
    style: _vm.style
  }, [_c("div", {
    staticClass: "pickedLabel__container"
  }, [_c("div", {
    staticClass: "pickedLabel__background"
  }), _c("div", {
    staticClass: "pickedLabel__label",
    style: {
      transform: this.notAbsolute ? `skew(0deg)` : ""
    }
  }, [_vm._t("default")], 2)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.app-wrapper[data-v-7ba5bd90] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  touch-action: manipulation;\n}\n@media screen and (min-width: 1280px) {\n.app-wrapper[data-v-7ba5bd90] {\n    overflow-x: hidden;\n}\n}\n@media screen and (min-width: 1280px) {\n.app-wrapper--noscroll[data-v-7ba5bd90] {\n    overflow: hidden;\n}\n}\n.app-wrapper__version[data-v-7ba5bd90] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0.2rem 1rem;\n  background-color: rgba(255, 255, 255, 0.5);\n  z-index: 1000;\n  font-weight: bold;\n  font-size: 12px;\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/App.vue","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/base.scss"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EACE,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,0BAAA;AALF;ACuGE;ADxGF;IAUI,kBAAA;AALF;AACF;ACkGE;AD3FA;IAEI,gBAAA;AALJ;AACF;AAQE;EACE,iDAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,oBAAA;EACA,0CAAA;EACA,aAAA;EACA,iBAAA;EACA,eAAA;AANJ","file":"App.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.app-wrapper {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  touch-action: manipulation;\n\n  @include for-desktop {\n    // height: auto;\n    overflow-x: hidden;\n  }\n\n  &--noscroll {\n    @include for-desktop {\n      overflow: hidden;\n    }\n  }\n\n  &__version {\n    font-family: Avenir, Helvetica, Arial, sans-serif;\n    position: absolute;\n    top: 0;\n    left: 0;\n    padding: 0.2rem 1rem;\n    background-color: rgba(255, 255, 255, 0.5);\n    z-index: 1000;\n    font-weight: bold;\n    font-size: 12px;\n  }\n}\n","@import '../_mq.scss';\n\n// TODO - These are copied from other projects. Cleanup in the future.\n\n// Flexbox: center items both vertically and horizontally\n@mixin flex-center() {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n// Flexbox: center items both vertically and horizontally\n@mixin absolute-fill() {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n// Centered background image mixin\n@mixin centered-background($bg-size: auto) {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: $bg-size;\n}\n\n@mixin skew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(-10deg);\n    -moz-transform: skew(-10deg);\n    -o-transform: skew(-10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(-5deg);\n    -moz-transform: skew(-5deg);\n    -o-transform: skew(-5deg);\n  }\n}\n\n@mixin unskew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(10deg);\n    -moz-transform: skew(10deg);\n    -o-transform: skew(10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(5deg);\n    -moz-transform: skew(5deg);\n    -o-transform: skew(5deg);\n  }\n}\n\n@mixin theme-color($color, $depth: false) {\n  @if ($depth == true) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-minus1);\n    border-top: 4px solid color(#{$color}-plus1);\n  }\n  @if ($depth == false) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-main);\n    border-top: 4px solid color(#{$color}-main);\n  }\n}\n\n@mixin theme-border($shadow: true) {\n  @if ($shadow == true) {\n    box-shadow: 0 2px color(black);\n  }\n  @if ($shadow == false) {\n    box-shadow: 0 0 color(black);\n  }\n\n  border-radius: 5px;\n  border: 2px solid color(black);\n}\n\n@mixin mqAspectRatio($from: false, $until: false, $and: false) {\n  $media-query: 'screen';\n\n  @if $from {\n    $media-query: '#{$media-query} and (min-aspect-ratio: #{$from})';\n  }\n  @if $until {\n    $media-query: '#{$media-query} and (max-aspect-ratio: #{$until})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} #{$and}';\n  }\n  @media #{$media-query} {\n    @content;\n  }\n}\n\n@mixin for-landscape {\n  @media screen and (orientation: landscape) {\n    @content;\n  }\n}\n\n@mixin for-tablet {\n  @media screen and (min-width: 676px) {\n    @content;\n  }\n}\n\n@mixin for-desktop {\n  @media screen and (min-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-landscape {\n  @media screen and (orientation: landscape) and (max-width: 926px) {\n    // @media screen and (orientation: landscape) and (max-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-small {\n  @media screen and (max-width: 400px) and (max-height: 760px),\n    screen and (max-width: 760px) and (max-height: 400px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-portrait {\n  @media screen and (max-width: 420px) and (orientation: portrait) {\n    @content;\n  }\n}\n\n@mixin fast-transition {\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./fonts/lilitaone-regular-webfont.ttf */ "./src/fonts/lilitaone-regular-webfont.ttf");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ./fonts/SupercellHeadline-Bold.woff2 */ "./src/fonts/SupercellHeadline-Bold.woff2");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(/*! ./fonts/SupercellHeadline-Heavy.woff2 */ "./src/fonts/SupercellHeadline-Heavy.woff2");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(/*! ./fonts/SupercellText-Bold.woff2 */ "./src/fonts/SupercellText-Bold.woff2");
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(/*! ./fonts/SupercellText-Regular.woff2 */ "./src/fonts/SupercellText-Regular.woff2");
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(/*! ./fonts/SupercellText-Medium.woff2 */ "./src/fonts/SupercellText-Medium.woff2");
exports = ___CSS_LOADER_API_IMPORT___(true);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n@font-face {\n  font-family: \"Lilitaone\";\n  src: local(\"Lilitaone\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n  font-family: \"SupercellHeadline\";\n  src: local(\"SupercellHeadline\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  font-weight: bold;\n}\n@font-face {\n  font-family: \"SupercellHeadline\";\n  src: local(\"SupercellHeadline\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  font-weight: 900;\n}\n@font-face {\n  font-family: \"SupercellText\";\n  src: local(\"SupercellText\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  font-weight: bold;\n}\n@font-face {\n  font-family: \"SupercellText\";\n  src: local(\"SupercellText\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  font-weight: normal;\n}\n@font-face {\n  font-family: \"SupercellText\";\n  src: local(\"SupercellText\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  font-weight: 500;\n}\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  min-height: -webkit-fill-available;\n  position: relative;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\n@media screen and (min-width: 1280px) {\nhtml,\n  body {\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n}\nbody {\n  background: black;\n}\n* {\n  box-sizing: border-box;\n}\nh1 {\n  margin: 0;\n}\nbutton {\n  border: none;\n  margin: 0;\n  padding: 0;\n  background: transparent;\n  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n  line-height: normal;\n  /* Corrects font smoothing for webkit */\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n  /* Corrects inability to style clickable `input` types in iOS */\n  -webkit-appearance: none;\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/App.vue","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/base.scss"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EACE,wBAAA;EACA,gEAAA;AALF;AAQA;EACE,gCAAA;EACA,wEAAA;EACA,iBAAA;AANF;AASA;EACE,gCAAA;EACA,wEAAA;EACA,gBAAA;AAPF;AAUA;EACE,4BAAA;EACA,oEAAA;EACA,iBAAA;AARF;AAWA;EACE,4BAAA;EACA,oEAAA;EACA,mBAAA;AATF;AAYA;EACE,4BAAA;EACA,oEAAA;EACA,gBAAA;AAVF;AAaA;;EAEE,WAAA;EACA,YAAA;EACA,kCAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,gBAAA;AAXF;ACwEE;ADrEF;;IAWI,kBAAA;IACA,gBAAA;AATF;AACF;AAYA;EACE,iBAAA;AATF;AAYA;EACE,sBAAA;AATF;AAYA;EACE,SAAA;AATF;AAYA;EACE,YAAA;EACA,SAAA;EACA,UAAA;EACA,uBAAA;EAEA,4EAAA;EACA,mBAAA;EAEA,uCAAA;EACA,+BAAA;EACA,gCAAA;EAEA,+DAAA;EACA,wBAAA;AAZF","file":"App.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n@font-face {\n  font-family: 'Lilitaone';\n  src: local('Lilitaone'), url(./fonts/lilitaone-regular-webfont.ttf);\n}\n\n@font-face {\n  font-family: 'SupercellHeadline';\n  src: local('SupercellHeadline'), url(./fonts/SupercellHeadline-Bold.woff2);\n  font-weight: bold;\n}\n\n@font-face {\n  font-family: 'SupercellHeadline';\n  src: local('SupercellHeadline'), url(./fonts/SupercellHeadline-Heavy.woff2);\n  font-weight: 900;\n}\n\n@font-face {\n  font-family: 'SupercellText';\n  src: local('SupercellText'), url(./fonts/SupercellText-Bold.woff2);\n  font-weight: bold;\n}\n\n@font-face {\n  font-family: 'SupercellText';\n  src: local('SupercellText'), url(./fonts/SupercellText-Regular.woff2);\n  font-weight: normal;\n}\n\n@font-face {\n  font-family: 'SupercellText';\n  src: local('SupercellText'), url(./fonts/SupercellText-Medium.woff2);\n  font-weight: 500;\n}\n\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  min-height: -webkit-fill-available;\n  position: relative;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n\n  @include for-desktop {\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n\nbody {\n  background: black;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nh1 {\n  margin: 0;\n}\n\nbutton {\n  border: none;\n  margin: 0;\n  padding: 0;\n  background: transparent;\n\n  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n  line-height: normal;\n\n  /* Corrects font smoothing for webkit */\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n\n  /* Corrects inability to style clickable `input` types in iOS */\n  -webkit-appearance: none;\n}\n","@import '../_mq.scss';\n\n// TODO - These are copied from other projects. Cleanup in the future.\n\n// Flexbox: center items both vertically and horizontally\n@mixin flex-center() {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n// Flexbox: center items both vertically and horizontally\n@mixin absolute-fill() {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n// Centered background image mixin\n@mixin centered-background($bg-size: auto) {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: $bg-size;\n}\n\n@mixin skew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(-10deg);\n    -moz-transform: skew(-10deg);\n    -o-transform: skew(-10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(-5deg);\n    -moz-transform: skew(-5deg);\n    -o-transform: skew(-5deg);\n  }\n}\n\n@mixin unskew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(10deg);\n    -moz-transform: skew(10deg);\n    -o-transform: skew(10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(5deg);\n    -moz-transform: skew(5deg);\n    -o-transform: skew(5deg);\n  }\n}\n\n@mixin theme-color($color, $depth: false) {\n  @if ($depth == true) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-minus1);\n    border-top: 4px solid color(#{$color}-plus1);\n  }\n  @if ($depth == false) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-main);\n    border-top: 4px solid color(#{$color}-main);\n  }\n}\n\n@mixin theme-border($shadow: true) {\n  @if ($shadow == true) {\n    box-shadow: 0 2px color(black);\n  }\n  @if ($shadow == false) {\n    box-shadow: 0 0 color(black);\n  }\n\n  border-radius: 5px;\n  border: 2px solid color(black);\n}\n\n@mixin mqAspectRatio($from: false, $until: false, $and: false) {\n  $media-query: 'screen';\n\n  @if $from {\n    $media-query: '#{$media-query} and (min-aspect-ratio: #{$from})';\n  }\n  @if $until {\n    $media-query: '#{$media-query} and (max-aspect-ratio: #{$until})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} #{$and}';\n  }\n  @media #{$media-query} {\n    @content;\n  }\n}\n\n@mixin for-landscape {\n  @media screen and (orientation: landscape) {\n    @content;\n  }\n}\n\n@mixin for-tablet {\n  @media screen and (min-width: 676px) {\n    @content;\n  }\n}\n\n@mixin for-desktop {\n  @media screen and (min-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-landscape {\n  @media screen and (orientation: landscape) and (max-width: 926px) {\n    // @media screen and (orientation: landscape) and (max-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-small {\n  @media screen and (max-width: 400px) and (max-height: 760px),\n    screen and (max-width: 760px) and (max-height: 400px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-portrait {\n  @media screen and (max-width: 420px) and (orientation: portrait) {\n    @content;\n  }\n}\n\n@mixin fast-transition {\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.BaseLink[data-v-0b7f4d1b] {\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/BaseLink.vue"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EACE,kBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,UAAA;EACA,SAAA;AALF","file":"BaseLink.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.BaseLink {\n  position: relative;\n  user-select: none;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.BaseButton[data-v-7799e2fe] {\n  position: relative;\n  border: none;\n  background: none;\n  cursor: pointer;\n  padding: 0;\n  margin: 0 5px;\n  height: 100%;\n  min-width: 20%;\n}\n.BaseButton--adaptive-width[data-v-7799e2fe] {\n  min-width: 0;\n}\n.BaseButton--selector[data-v-7799e2fe] {\n  flex: 1;\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/Buttons/BaseButton.vue"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EACE,kBAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,UAAA;EACA,aAAA;EACA,YAAA;EACA,cAAA;AALF;AAOE;EACE,YAAA;AALJ;AAQE;EACE,OAAA;AANJ","file":"BaseButton.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.BaseButton {\n  position: relative;\n  border: none;\n  background: none;\n  cursor: pointer;\n  padding: 0;\n  margin: 0 5px;\n  height: 100%;\n  min-width: 20%;\n\n  &--adaptive-width {\n    min-width: 0;\n  }\n\n  &--selector {\n    flex: 1;\n  }\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.RectangleButton[data-v-7bc88353] {\n  height: 100%;\n  width: 100%;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 18px;\n  line-height: 28px;\n  min-height: 20px;\n  max-height: 51px;\n  margin-bottom: 2px;\n  pointer-events: all;\n  position: relative;\n  background-color: transparent;\n  box-shadow: 0 2px #040404;\n  border-radius: 5px;\n  border: 2px solid #040404;\n}\n.RectangleButton__icon[data-v-7bc88353] {\n  position: relative;\n  display: inline;\n  width: 32px;\n  height: 32px;\n  margin: 0 10px;\n}\n.RectangleButton[data-v-7bc88353]::after {\n  content: \"\";\n  position: absolute;\n  width: calc(100% + 4px);\n  height: calc(100% + 4px);\n  bottom: -7px;\n  left: -2px;\n  background: black;\n  border-radius: 5px;\n  opacity: 0.25;\n  z-index: -1;\n}\n.RectangleButton--inactive[data-v-7bc88353]::after {\n  display: none;\n}\n.RectangleButton__background[data-v-7bc88353] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  background-color: #9372da;\n  border-bottom: 4px solid #7952cc;\n  border-top: 4px solid #a88ae9;\n  border-radius: 2px;\n  padding: 0 20px 0 20px;\n  box-shadow: 1px 1px black, -1px -1px black;\n}\n.RectangleButton--withNoPadding .RectangleButton__background[data-v-7bc88353] {\n  min-width: 0;\n  padding: 0;\n}\n.RectangleButton--withSmallPadding .RectangleButton__background[data-v-7bc88353] {\n  min-width: 0;\n}\n.RectangleButton--hasIcon .RectangleButton__background[data-v-7bc88353] {\n  padding-left: 60px;\n}\n.RectangleButton__background[data-v-7bc88353]::after {\n  content: \" \";\n  display: block;\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 8px;\n  width: 8px;\n  -webkit-clip-path: polygon(0 0, 100% 100%, 100% 0);\n          clip-path: polygon(0 0, 100% 100%, 100% 0);\n  border-radius: 0 3px 0 0;\n}\n.RectangleButton__label[data-v-7bc88353] {\n  color: white;\n  font-size: 16px;\n  font-family: \"Lilitaone\", Arial, sans-serif;\n  text-transform: none;\n  font-weight: 400;\n  text-transform: uppercase;\n  text-shadow: -1.5px -1.5px 0 black, 0 -1.5px 0 black, 1.5px -1.5px 0 black, 1.5px 0 0 black, 1.5px 1.5px 0 black, 0 1.5px 0 black, -1.5px 1.5px 0 black, -1.5px 0 0 black, 0 3px 0 black, -1.5px 3px 0 black, 1.5px 3px 0 black;\n  text-shadow: -1.4px -1.4px 0 black, 0 -1.4px 0 black, 1.4px -1.4px 0 black, 1.4px 0 0 black, 1.4px 1.4px 0 black, 0 1.4px 0 black, -1.4px 1.4px 0 black, -1.4px 0 0 black, 0 3px 0 black, -1.4px 3px 0 black, 1.4px 3px 0 black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  position: relative;\n  padding: 6px 5px;\n}\n.RectangleButton__label[data-v-7bc88353]:lang(ru), .RectangleButton__label[data-v-7bc88353]:lang(tr), .RectangleButton__label[data-v-7bc88353]:lang(pl), .RectangleButton__label[data-v-7bc88353]:lang(jp), .RectangleButton__label[data-v-7bc88353]:lang(zh-Hant), .RectangleButton__label[data-v-7bc88353]:lang(zh-Hans), .RectangleButton__label[data-v-7bc88353]:lang(vi) {\n  font-family: Arial, Helvetica, sans-serif;\n  font-weight: 900;\n}\n.RectangleButton__label[data-v-7bc88353]:lang(zh-Hans), .RectangleButton__label[data-v-7bc88353]:lang(zh-Hant) {\n  font-weight: 500;\n}\n.RectangleButton__label[data-v-7bc88353]:lang(ar), .RectangleButton__label[data-v-7bc88353]:lang(fa) {\n  font-weight: 500;\n  direction: rtl;\n}\n.RectangleButton__label[data-v-7bc88353]:lang(he) {\n  direction: rtl;\n}\n.RectangleButton__label--incorrect[data-v-7bc88353] {\n  text-shadow: unset;\n}\n.RectangleButton--withNoPadding .RectangleButton__label[data-v-7bc88353] {\n  text-transform: none;\n  font-size: 16px;\n}\n@media (max-width: 23.4275em) {\n.RectangleButton--withNoPadding .RectangleButton__label[data-v-7bc88353] {\n    font-size: 14px;\n    line-height: 20px;\n}\n}\n@media only screen and (max-device-width: 375px) and (orientation: landscape) {\n.RectangleButton--withNoPadding .RectangleButton__label[data-v-7bc88353] {\n    font-size: 14px;\n    line-height: 18px;\n}\n}\n.RectangleButton--disabled .RectangleButton__label[data-v-7bc88353] {\n  opacity: 0.5;\n}\n.RectangleButton--selector[data-v-7bc88353] {\n  flex: 1;\n}\n.RectangleButton--slanted[data-v-7bc88353] {\n  -webkit-transform: skew(-5deg);\n  -moz-transform: skew(-5deg);\n  -o-transform: skew(-5deg);\n}\n.RectangleButton--slanted .RectangleButton_label_unskew[data-v-7bc88353] {\n  -webkit-transform: skew(5deg);\n  -moz-transform: skew(5deg);\n  -o-transform: skew(5deg);\n}\n.RectangleButton--stretch[data-v-7bc88353] {\n  width: 100%;\n}\n.RectangleButton--dark .RectangleButton__background[data-v-7bc88353] {\n  background-color: #343c52;\n  border-bottom: 4px solid #222b3f;\n  border-top: 4px solid #4b546c;\n}\n.RectangleButton--dark:active .RectangleButton__background[data-v-7bc88353], .RectangleButton--dark.RectangleButton--progress .RectangleButton__background[data-v-7bc88353] {\n  background-color: #222b3f;\n  border-color: #222b3f;\n}\n.RectangleButton--dark:active .RectangleButton__background[data-v-7bc88353]::after, .RectangleButton--dark.RectangleButton--progress .RectangleButton__background[data-v-7bc88353]::after {\n  background-color: transparent;\n}\n.RectangleButton--dark:active .RectangleButton__label[data-v-7bc88353] {\n  color: #a0a8be;\n}\n.RectangleButton--dark.RectangleButton--inactive .RectangleButton__label[data-v-7bc88353] {\n  color: #4b546c;\n}\n.RectangleButton--blue .RectangleButton__background[data-v-7bc88353] {\n  background-color: #2071ff;\n  border-bottom: 4px solid #0a52f0;\n  border-top: 4px solid #1a97ff;\n}\n.RectangleButton--blue .RectangleButton__background[data-v-7bc88353]::after {\n  background-color: #32a3fe;\n}\n.RectangleButton--blue:active .RectangleButton__background[data-v-7bc88353], .RectangleButton--blue.RectangleButton--progress .RectangleButton__background[data-v-7bc88353] {\n  background-color: #002bab;\n  border-color: #002bab;\n}\n.RectangleButton--blue:active .RectangleButton__background[data-v-7bc88353]::after, .RectangleButton--blue.RectangleButton--progress .RectangleButton__background[data-v-7bc88353]::after {\n  background-color: transparent;\n}\n.RectangleButton--blue:active .RectangleButton__label[data-v-7bc88353] {\n  color: #bcbdff;\n}\n.RectangleButton--blue:hover .RectangleButton__background[data-v-7bc88353] {\n  background-color: #2071ff;\n  border-bottom: 4px solid #0a52f0;\n  border-top: 4px solid #1a97ff;\n}\n.RectangleButton--blue:hover .RectangleButton__background[data-v-7bc88353]::after {\n  background-color: #32a3fe;\n}\n.RectangleButton--imageButton[data-v-7bc88353] {\n  width: 100%;\n  height: 100%;\n}\n.RectangleButton--imageButton .RectangleButton__background[data-v-7bc88353] {\n  width: 100%;\n  height: 100%;\n}\n.RectangleButton--imageButton .RectangleButton__label[data-v-7bc88353] {\n  width: 100%;\n  height: 100%;\n}\n.RectangleButton--imageButton .RectangleButton__label__unskew[data-v-7bc88353] {\n  width: 100%;\n  height: 100%;\n}\n.RectangleButton--inactive[data-v-7bc88353] {\n  background-color: transparent;\n  border-color: transparent;\n  box-shadow: none;\n}\n.RectangleButton--inactive .RectangleButton__background[data-v-7bc88353] {\n  background-color: transparent;\n  border-color: transparent;\n  box-shadow: none;\n}\n.RectangleButton--inactive .RectangleButton__background[data-v-7bc88353]::after {\n  background-color: transparent;\n  border-color: transparent;\n  box-shadow: none;\n}\n.RectangleButton--disabled[data-v-7bc88353] {\n  pointer-events: none;\n  opacity: 0.6;\n}\n.RectangleButton:hover--blue .RectangleButton__background[data-v-7bc88353] {\n  background-color: #2071ff;\n  border-bottom: 4px solid #0a52f0;\n  border-top: 4px solid #1a97ff;\n}\n.RectangleButton:hover .RectangleButton__background[data-v-7bc88353]::before {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  border-radius: 3px;\n  content: \" \";\n  z-index: 999;\n  background-color: rgba(0, 0, 0, 0.15);\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/Buttons/RectangleButton.vue","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/base.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/typography.scss"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EAEE,YAAA;EACA,WAAA;EACA,eAAA;EACA,qBAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,6BAAA;ECmDE,yBAAA;EAMF,kBAAA;EACA,yBAAA;AD7DF;AAME;EACE,kBAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;AAJJ;AAOE;EACE,WAAA;EACA,kBAAA;EACA,uBAAA;EACA,wBAAA;EACA,YAAA;EACA,UAAA;EACA,iBAAA;EACA,kBAAA;EACA,aAAA;EACA,WAAA;AALJ;AAQE;EACE,aAAA;AANJ;AASE;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;ECMA,yBAAA;EACA,gCAAA;EACA,6BAAA;EDNA,kBAAA;EACA,sBAAA;EACA,0CAAA;AALJ;AAMI;EACE,YAAA;EACA,UAAA;AAJN;AAMI;EACE,YAAA;AAJN;AAOI;EACE,kBAAA;AALN;AAQE;EACE,YAAA;EACA,cAAA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,WAAA;EACA,UAAA;EAEA,kDAAA;UAAA,0CAAA;EACA,wBAAA;AAPJ;AASE;EErDA,YAAA;EACA,eAAA;EACA,2CAAA;EACA,oBAAA;EACA,gBAAA;EAKE,yBAAA;EAGA,+NAAA;EAUA,+NAAA;ED7CF,aAAA;EACA,uBAAA;EACA,mBAAA;ED6EE,eAAA;EACA,kBAAA;EACA,gBAAA;AAEJ;AEvFE;EAOE,yCAAA;EACA,gBAAA;AFmFJ;AEjFE;EAEE,gBAAA;AFkFJ;AE/EE;EAEE,gBAAA;EACA,cAAA;AFgFJ;AE7EE;EACE,cAAA;AF+EJ;AAfI;EACE,kBAAA;AAiBN;AAdI;EACE,oBAAA;EACA,eAAA;AAgBN;AD0DE;AC5EE;IAII,eAAA;IACA,iBAAA;AAkBN;AACF;AAjBM;AAPF;IAQI,eAAA;IACA,iBAAA;AAoBN;AACF;AAlBI;EACE,YAAA;AAoBN;AAhBE;EACE,OAAA;AAkBJ;AAhBE;EC3EE,8BAAA;EACA,2BAAA;EACA,yBAAA;AD8FJ;AAnBI;EC/DA,6BAAA;EACA,0BAAA;EACA,wBAAA;ADqFJ;AApBE;EACE,WAAA;AAsBJ;AAlBI;EChEA,yBAAA;EACA,gCAAA;EACA,6BAAA;ADqFJ;AAbI;EACE,yBAAA;EACA,qBAAA;AAeN;AAbI;EACE,6BAAA;AAeN;AAXI;EACE,cAAA;AAaN;AATI;EACE,cAAA;AAWN;AANI;EC9FA,yBAAA;EACA,gCAAA;EACA,6BAAA;ADuGJ;AAPI;EACE,yBAAA;AASN;AAJI;EACE,yBAAA;EACA,qBAAA;AAMN;AAJI;EACE,6BAAA;AAMN;AAFI;EACE,cAAA;AAIN;AACI;ECvHA,yBAAA;EACA,gCAAA;EACA,6BAAA;ADyHJ;AADI;EACE,yBAAA;AAGN;AACE;EACE,WAAA;EACA,YAAA;AACJ;AAAI;EACE,WAAA;EACA,YAAA;AAEN;AAAI;EACE,WAAA;EACA,YAAA;AAEN;AADM;EACE,WAAA;EACA,YAAA;AAGR;AAEE;EACE,6BAAA;EACA,yBAAA;EACA,gBAAA;AAAJ;AAEI;EACE,6BAAA;EACA,yBAAA;EACA,gBAAA;AAAN;AAEI;EACE,6BAAA;EACA,yBAAA;EACA,gBAAA;AAAN;AAIE;EACE,oBAAA;EACA,YAAA;AAFJ;AAQM;ECzKF,yBAAA;EACA,gCAAA;EACA,6BAAA;ADoKJ;AASM;EC7NJ,kBAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EDyNM,kBAAA;EACA,YAAA;EACA,YAAA;EACA,qCAAA;AADR","file":"RectangleButton.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.RectangleButton {\n  $block: &;\n  height: 100%;\n  width: 100%;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 18px;\n  line-height: 28px;\n  min-height: 20px;\n  max-height: 51px;\n  margin-bottom: 2px;\n  pointer-events: all;\n  position: relative;\n  background-color: transparent;\n  @include theme-border(true);\n\n  &__icon {\n    position: relative;\n    display: inline;\n    width: 32px;\n    height: 32px;\n    margin: 0 10px;\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    width: calc(100% + 4px);\n    height: calc(100% + 4px);\n    bottom: -7px;\n    left: -2px;\n    background: black;\n    border-radius: 5px;\n    opacity: 0.25;\n    z-index: -1;\n  }\n\n  &--inactive::after {\n    display: none;\n  }\n\n  &__background {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    @include theme-color(purple, true);\n    border-radius: 2px;\n    padding: 0 20px 0 20px;\n    box-shadow: 1px 1px black, -1px -1px black; //Chrome rendering fix\n    #{$block}--withNoPadding & {\n      min-width: 0;\n      padding: 0;\n    }\n    #{$block}--withSmallPadding & {\n      min-width: 0;\n    }\n\n    #{$block}--hasIcon & {\n      padding-left: 60px;\n    }\n  }\n  &__background::after {\n    content: ' ';\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 0;\n    height: 8px;\n    width: 8px;\n    background-color: color('#32A3FE');\n    clip-path: polygon(0 0, 100% 100%, 100% 0);\n    border-radius: 0 3px 0 0;\n  }\n  &__label {\n    @include white-header-font-uppercase('button');\n    @include flex-center();\n    font-size: 18px;\n    position: relative;\n    padding: 6px 5px;\n    &--incorrect {\n      text-shadow: unset;\n    }\n\n    #{$block}--withNoPadding & {\n      text-transform: none;\n      font-size: 16px;\n      @include mq($until: mobile-regular) {\n        font-size: 14px;\n        line-height: 20px;\n      }\n      @media only screen and (max-device-width: 375px) and (orientation: landscape) {\n        font-size: 14px;\n        line-height: 18px;\n      }\n    }\n    #{$block}--disabled & {\n      opacity: 0.5;\n    }\n  }\n\n  &--selector {\n    flex: 1;\n  }\n  &--slanted {\n    @include skew();\n    #{$block}_label_unskew {\n      @include unskew();\n    }\n  }\n  &--stretch {\n    width: 100%;\n  }\n\n  &--dark {\n    #{$block}__background {\n      @include theme-color(dark, true);\n    }\n    #{$block}__background::after {\n      background-color: color('#32A3FE');\n    }\n  }\n\n  &--dark:active,\n  &--dark#{$block}--progress {\n    #{$block}__background {\n      background-color: color(dark-minus1);\n      border-color: color(dark-minus1);\n    }\n    #{$block}__background::after {\n      background-color: transparent;\n    }\n  }\n  &--dark:active {\n    #{$block}__label {\n      color: color(dark-plus2);\n    }\n  }\n  &--dark#{$block}--inactive {\n    #{$block}__label {\n      color: color(dark-plus1);\n    }\n  }\n\n  &--blue {\n    #{$block}__background {\n      @include theme-color(blue, true);\n    }\n\n    #{$block}__background::after {\n      background-color: #32a3fe;\n    }\n  }\n  &--blue:active,\n  &--blue#{$block}--progress {\n    #{$block}__background {\n      background-color: color(blue-minus2);\n      border-color: color(blue-minus2);\n    }\n    #{$block}__background::after {\n      background-color: transparent;\n    }\n  }\n  &--blue:active {\n    #{$block}__label {\n      color: color(blue-plus2);\n    }\n  }\n\n  &--blue:hover {\n    #{$block}__background {\n      @include theme-color(blue, true);\n    }\n    #{$block}__background::after {\n      background-color: #32a3fe;\n    }\n  }\n\n  &--imageButton {\n    width: 100%;\n    height: 100%;\n    #{$block}__background {\n      width: 100%;\n      height: 100%;\n    }\n    #{$block}__label {\n      width: 100%;\n      height: 100%;\n      &__unskew {\n        width: 100%;\n        height: 100%;\n      }\n    }\n  }\n\n  &--inactive {\n    background-color: transparent;\n    border-color: transparent;\n    box-shadow: none;\n\n    #{$block}__background {\n      background-color: transparent;\n      border-color: transparent;\n      box-shadow: none;\n    }\n    #{$block}__background::after {\n      background-color: transparent;\n      border-color: transparent;\n      box-shadow: none;\n    }\n  }\n\n  &--disabled {\n    pointer-events: none;\n    opacity: 0.6;\n  }\n\n  // Hover state\n  &:hover {\n    &--blue {\n      #{$block}__background {\n        @include theme-color(blue, true);\n      }\n    }\n\n    #{$block}__background {\n      &::before {\n        @include absolute-fill();\n        border-radius: 3px;\n        content: ' ';\n        z-index: 999;\n        background-color: rgba(0, 0, 0, 0.15);\n      }\n    }\n  }\n}\n","@import '../_mq.scss';\n\n// TODO - These are copied from other projects. Cleanup in the future.\n\n// Flexbox: center items both vertically and horizontally\n@mixin flex-center() {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n// Flexbox: center items both vertically and horizontally\n@mixin absolute-fill() {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n// Centered background image mixin\n@mixin centered-background($bg-size: auto) {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: $bg-size;\n}\n\n@mixin skew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(-10deg);\n    -moz-transform: skew(-10deg);\n    -o-transform: skew(-10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(-5deg);\n    -moz-transform: skew(-5deg);\n    -o-transform: skew(-5deg);\n  }\n}\n\n@mixin unskew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(10deg);\n    -moz-transform: skew(10deg);\n    -o-transform: skew(10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(5deg);\n    -moz-transform: skew(5deg);\n    -o-transform: skew(5deg);\n  }\n}\n\n@mixin theme-color($color, $depth: false) {\n  @if ($depth == true) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-minus1);\n    border-top: 4px solid color(#{$color}-plus1);\n  }\n  @if ($depth == false) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-main);\n    border-top: 4px solid color(#{$color}-main);\n  }\n}\n\n@mixin theme-border($shadow: true) {\n  @if ($shadow == true) {\n    box-shadow: 0 2px color(black);\n  }\n  @if ($shadow == false) {\n    box-shadow: 0 0 color(black);\n  }\n\n  border-radius: 5px;\n  border: 2px solid color(black);\n}\n\n@mixin mqAspectRatio($from: false, $until: false, $and: false) {\n  $media-query: 'screen';\n\n  @if $from {\n    $media-query: '#{$media-query} and (min-aspect-ratio: #{$from})';\n  }\n  @if $until {\n    $media-query: '#{$media-query} and (max-aspect-ratio: #{$until})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} #{$and}';\n  }\n  @media #{$media-query} {\n    @content;\n  }\n}\n\n@mixin for-landscape {\n  @media screen and (orientation: landscape) {\n    @content;\n  }\n}\n\n@mixin for-tablet {\n  @media screen and (min-width: 676px) {\n    @content;\n  }\n}\n\n@mixin for-desktop {\n  @media screen and (min-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-landscape {\n  @media screen and (orientation: landscape) and (max-width: 926px) {\n    // @media screen and (orientation: landscape) and (max-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-small {\n  @media screen and (max-width: 400px) and (max-height: 760px),\n    screen and (max-width: 760px) and (max-height: 400px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-portrait {\n  @media screen and (max-width: 420px) and (orientation: portrait) {\n    @content;\n  }\n}\n\n@mixin fast-transition {\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n","@mixin fallback-font() {\n  // use fallback font if too many chars are unsupported by lang\n  &:lang(ru),\n  &:lang(tr),\n  &:lang(pl),\n  &:lang(jp),\n  &:lang(zh-Hant),\n  &:lang(zh-Hans),\n  &:lang(vi) {\n    font-family: Arial, Helvetica, sans-serif;\n    font-weight: 900;\n  }\n  &:lang(zh-Hans),\n  &:lang(zh-Hant) {\n    font-weight: 500;\n  }\n\n  &:lang(ar),\n  &:lang(fa) {\n    font-weight: 500;\n    direction: rtl;\n  }\n\n  &:lang(he) {\n    direction: rtl;\n  }\n}\n\n@mixin white-header-font($font-size-type, $uppercase: false, $noShadow: false) {\n  color: white;\n  font-size: white_font_size($font-size-type);\n  font-family: 'Lilitaone', Arial, sans-serif;\n  text-transform: none;\n  font-weight: 400;\n\n  @include fallback-font;\n\n  @if ($uppercase) {\n    text-transform: uppercase;\n  }\n  @if ($font-size-type != 'small') {\n    text-shadow: -1.5px -1.5px 0 black, 0 -1.5px 0 black, 1.5px -1.5px 0 black, 1.5px 0 0 black,\n      1.5px 1.5px 0 black, 0 1.5px 0 black, -1.5px 1.5px 0 black, -1.5px 0 0 black, 0 3px 0 black,\n      -1.5px 3px 0 black, 1.5px 3px 0 black;\n  }\n  @if ($font-size-type == 'h2') {\n    text-shadow: -2px -2px 0 black, 0 -2px 0 black, 2px -2px 0 black, 2px 0 0 black, 2px 2px 0 black,\n      0 2px 0 black, -2px 2px 0 black, -2px 0 0 black, 0 3.5px 0 black, -2px 3.5px 0 black,\n      2px 3.5px 0 black;\n  }\n  @if ($font-size-type == 'body' or $font-size-type == 'button') {\n    text-shadow: -1.4px -1.4px 0 black, 0 -1.4px 0 black, 1.4px -1.4px 0 black, 1.4px 0 0 black,\n      1.4px 1.4px 0 black, 0 1.4px 0 black, -1.4px 1.4px 0 black, -1.4px 0 0 black, 0 3px 0 black,\n      -1.4px 3px 0 black, 1.4px 3px 0 black;\n  }\n  @if ($font-size-type == 'small' or $font-size-type == 'x-small') {\n    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\n  }\n  @if ($noShadow) {\n    text-shadow: unset;\n  }\n}\n\n@mixin white-header-font-uppercase($font-size-type) {\n  @include white-header-font($font-size-type, true);\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../../assets/icons/icon-social-link-white.svg */ "./src/assets/icons/icon-social-link-white.svg");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ../../assets/icons/icon-social-twitter-white.svg */ "./src/assets/icons/icon-social-twitter-white.svg");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(/*! ../../assets/icons/icon-social-facebook-white.svg */ "./src/assets/icons/icon-social-facebook-white.svg");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(/*! ../../assets/icons/icon-social-youtube-white.svg */ "./src/assets/icons/icon-social-youtube-white.svg");
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(/*! ../../assets/icons/icon-social-instagram-white.svg */ "./src/assets/icons/icon-social-instagram-white.svg");
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(/*! ../../assets/icons/icon-social-linkedin-white.svg */ "./src/assets/icons/icon-social-linkedin-white.svg");
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(/*! ../../assets/icons/icon-social-glassdoor-white.svg */ "./src/assets/icons/icon-social-glassdoor-white.svg");
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(/*! ../../assets/icons/icon-social-bilibili.svg */ "./src/assets/icons/icon-social-bilibili.svg");
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(/*! ../../assets/icons/icon-social-tiktok.svg */ "./src/assets/icons/icon-social-tiktok.svg");
exports = ___CSS_LOADER_API_IMPORT___(true);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.socialButton[data-v-4813229d] {\n  display: inline-block;\n}\n.socialButton__icon[data-v-4813229d] {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: 100% auto;\n  width: 24px;\n  height: 24px;\n}\n.socialButton--link .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n.socialButton--twitter .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n.socialButton--facebook .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n}\n.socialButton--youtube .socialButton__icon[data-v-4813229d] {\n  width: 32px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n}\n.socialButton--instagram .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n}\n.socialButton--linkedin .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n}\n.socialButton--glassdoor .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n}\n.socialButton--bilibili .socialButton__icon[data-v-4813229d] {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\n}\n.socialButton--tiktok .socialButton__icon[data-v-4813229d] {\n  height: 26px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/Buttons/SocialButton.vue","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/base.scss"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACSA;EAGE,qBAAA;AARF;AAUE;ECUA,2BAAA;EACA,4BAAA;EACA,0BDXyC;EAEvC,WAAA;EACA,YAAA;AAPJ;AASI;EACE,yDAAA;AAPN;AAUI;EACE,yDAAA;AARN;AAWI;EACE,yDAAA;AATN;AAYI;EACE,WAAA;EACA,yDAAA;AAVN;AAaI;EACE,yDAAA;AAXN;AAcI;EACE,yDAAA;AAZN;AAeI;EACE,yDAAA;AAbN;AAgBI;EACE,yDAAA;AAdN;AAiBI;EACE,YAAA;EACA,yDAAA;AAfN","file":"SocialButton.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n// TODO - Add hover state & cleanup CSS\n.socialButton {\n  $block: &;\n\n  display: inline-block;\n\n  &__icon {\n    @include centered-background($bg-size: 100% auto);\n\n    width: size(mobile, default-icon);\n    height: size(mobile, default-icon);\n\n    #{$block}--link & {\n      background-image: url('../../assets/icons/icon-social-link-white.svg');\n    }\n\n    #{$block}--twitter & {\n      background-image: url('../../assets/icons/icon-social-twitter-white.svg');\n    }\n\n    #{$block}--facebook & {\n      background-image: url('../../assets/icons/icon-social-facebook-white.svg');\n    }\n\n    #{$block}--youtube & {\n      width: layout-grid(4);\n      background-image: url('../../assets/icons/icon-social-youtube-white.svg');\n    }\n\n    #{$block}--instagram & {\n      background-image: url('../../assets/icons/icon-social-instagram-white.svg');\n    }\n\n    #{$block}--linkedin & {\n      background-image: url('../../assets/icons/icon-social-linkedin-white.svg');\n    }\n\n    #{$block}--glassdoor & {\n      background-image: url('../../assets/icons/icon-social-glassdoor-white.svg');\n    }\n\n    #{$block}--bilibili & {\n      background-image: url('../../assets/icons/icon-social-bilibili.svg');\n    }\n\n    #{$block}--tiktok & {\n      height: 26px;\n      background-image: url('../../assets/icons/icon-social-tiktok.svg');\n    }\n  }\n}\n","@import '../_mq.scss';\n\n// TODO - These are copied from other projects. Cleanup in the future.\n\n// Flexbox: center items both vertically and horizontally\n@mixin flex-center() {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n// Flexbox: center items both vertically and horizontally\n@mixin absolute-fill() {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n// Centered background image mixin\n@mixin centered-background($bg-size: auto) {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: $bg-size;\n}\n\n@mixin skew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(-10deg);\n    -moz-transform: skew(-10deg);\n    -o-transform: skew(-10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(-5deg);\n    -moz-transform: skew(-5deg);\n    -o-transform: skew(-5deg);\n  }\n}\n\n@mixin unskew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(10deg);\n    -moz-transform: skew(10deg);\n    -o-transform: skew(10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(5deg);\n    -moz-transform: skew(5deg);\n    -o-transform: skew(5deg);\n  }\n}\n\n@mixin theme-color($color, $depth: false) {\n  @if ($depth == true) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-minus1);\n    border-top: 4px solid color(#{$color}-plus1);\n  }\n  @if ($depth == false) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-main);\n    border-top: 4px solid color(#{$color}-main);\n  }\n}\n\n@mixin theme-border($shadow: true) {\n  @if ($shadow == true) {\n    box-shadow: 0 2px color(black);\n  }\n  @if ($shadow == false) {\n    box-shadow: 0 0 color(black);\n  }\n\n  border-radius: 5px;\n  border: 2px solid color(black);\n}\n\n@mixin mqAspectRatio($from: false, $until: false, $and: false) {\n  $media-query: 'screen';\n\n  @if $from {\n    $media-query: '#{$media-query} and (min-aspect-ratio: #{$from})';\n  }\n  @if $until {\n    $media-query: '#{$media-query} and (max-aspect-ratio: #{$until})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} #{$and}';\n  }\n  @media #{$media-query} {\n    @content;\n  }\n}\n\n@mixin for-landscape {\n  @media screen and (orientation: landscape) {\n    @content;\n  }\n}\n\n@mixin for-tablet {\n  @media screen and (min-width: 676px) {\n    @content;\n  }\n}\n\n@mixin for-desktop {\n  @media screen and (min-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-landscape {\n  @media screen and (orientation: landscape) and (max-width: 926px) {\n    // @media screen and (orientation: landscape) and (max-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-small {\n  @media screen and (max-width: 400px) and (max-height: 760px),\n    screen and (max-width: 760px) and (max-height: 400px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-portrait {\n  @media screen and (max-width: 420px) and (orientation: portrait) {\n    @content;\n  }\n}\n\n@mixin fast-transition {\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.footer[data-v-40ab164b] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 500;\n  height: 100%;\n  font-size: 12px;\n  font-family: \"SupercellText\", sans-serif;\n  background: #000;\n  color: white;\n  width: 100%;\n  overflow: scroll;\n}\n@media screen and (min-width: 1280px) {\n.footer[data-v-40ab164b] {\n    position: relative;\n    height: auto;\n    overflow: visible;\n}\n}\n.footer .navBar[data-v-40ab164b] {\n  position: fixed;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  overflow: hidden;\n}\n@media screen and (min-width: 1280px) {\n.footer .navBar[data-v-40ab164b] {\n    display: none;\n}\n}\n.footer__navCloseButton[data-v-40ab164b] {\n  width: 62px;\n  height: 40px;\n  margin-right: -4px;\n}\n.footer .inner[data-v-40ab164b] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  min-height: 100%;\n  width: 90%;\n  margin: 0 5%;\n}\n.footer .inner .gameInfoContainer[data-v-40ab164b] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding-bottom: 16px;\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .gameInfoContainer[data-v-40ab164b] {\n    border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n    padding: 32px 0;\n}\n}\n.footer .inner .gameInfoContainer .header[data-v-40ab164b] {\n  display: flex;\n  justify-content: space-between;\n}\n.footer .inner .gameInfoContainer .header p[data-v-40ab164b] {\n  line-height: 160%;\n  color: white;\n  font-weight: 700;\n}\n@media (min-width: 80em) {\n.footer .inner .gameInfoContainer .header p[data-v-40ab164b] {\n    font-size: 14px;\n}\n}\n.footer .inner .gameInfoContainer .linksContainer[data-v-40ab164b] {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  flex-direction: column;\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .gameInfoContainer .linksContainer[data-v-40ab164b] {\n    flex-direction: row;\n}\n}\n.footer .inner .gameInfoContainer .linksContainer .socials[data-v-40ab164b] {\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n}\n.footer .inner .gameInfoContainer .linksContainer .socials p[data-v-40ab164b] {\n  margin-bottom: 24px;\n  font-weight: 700;\n  font-size: 14px;\n}\n@media (max-width: 79.99em) {\n.footer .inner .gameInfoContainer .linksContainer .socials p[data-v-40ab164b] {\n    font-size: 12px;\n    margin-bottom: 16px;\n}\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .gameInfoContainer .linksContainer .socials[data-v-40ab164b] {\n    border-bottom: none;\n    padding-bottom: 0;\n}\n}\n.footer .inner .gameInfoContainer .linksContainer .socials a[data-v-40ab164b] {\n  padding-right: 16px;\n}\n.footer .inner .gameInfoContainer .linksContainer .downloadButtonsContainer[data-v-40ab164b] {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .gameInfoContainer .linksContainer .downloadButtonsContainer[data-v-40ab164b] {\n    border-bottom: none;\n}\n}\n.footer .inner .gameInfoContainer .linksContainer .downloadButtonsContainer p[data-v-40ab164b] {\n  font-weight: 700;\n  line-height: 100%;\n  color: white;\n  font-size: 14px;\n  margin-bottom: 24px;\n  padding-left: 10px;\n}\n@media (max-width: 79.99em) {\n.footer .inner .gameInfoContainer .linksContainer .downloadButtonsContainer p[data-v-40ab164b] {\n    font-size: 12px;\n    padding-left: 0;\n    margin-bottom: 8px;\n}\n}\n.footer .inner .gameInfoContainer .linksContainer .downloadButtonsContainer img[data-v-40ab164b] {\n  padding: 16px 0;\n  padding-right: 10px;\n  height: 70px;\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .gameInfoContainer .linksContainer .downloadButtonsContainer img[data-v-40ab164b] {\n    padding: 0 10px;\n    height: 50px;\n}\n}\n.footer .inner .externalLinksContainer[data-v-40ab164b] {\n  margin: 16px 0;\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .externalLinksContainer[data-v-40ab164b] {\n    margin: 32px 0;\n    flex-direction: row;\n    align-items: center;\n}\n}\n.footer .inner .externalLinksContainer a[data-v-40ab164b],\n.footer .inner .externalLinksContainer span[data-v-40ab164b] {\n  color: #f2f2f2;\n  text-decoration: none;\n  padding-right: 32px;\n  cursor: pointer;\n}\n.footer .inner .supercellInfoContainer[data-v-40ab164b] {\n  margin-bottom: 20px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 32px;\n}\n@media screen and (min-width: 1280px) {\n.footer .inner .supercellInfoContainer[data-v-40ab164b] {\n    margin-bottom: 0;\n}\n}\n.footer .inner .supercellInfoContainer .addressContainer p[data-v-40ab164b] {\n  line-height: 100%;\n  color: #808080;\n}\n.footer .langSelect__wrapper[data-v-40ab164b] {\n  width: 100%;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n  padding: 16px 0;\n  margin-top: 16px;\n}\n@media (min-width: 80em) {\n.footer .langSelect__wrapper[data-v-40ab164b] {\n    padding: 24px 0;\n}\n}\n.footer .langSelect[data-v-40ab164b] {\n  width: -moz-fit-content;\n  width: fit-content;\n  margin-right: 16px;\n}\n.footer .langSelect--footer[data-v-40ab164b] select {\n  font-weight: 500;\n  font-size: 13px;\n}\n.footer .langSelect[data-v-40ab164b] select {\n  border-radius: 50px;\n  border: none;\n  box-shadow: shadow(module);\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/Footer.vue"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,wCAAA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,gBAAA;AALF;AAOE;AAbF;IAcI,kBAAA;IACA,YAAA;IACA,iBAAA;AAJF;AACF;AAME;EACE,eAAA;EACA,WAAA;EACA,aAAA;EACA,yBAAA;EACA,gBAAA;AAJJ;AAMI;AAPF;IAQI,aAAA;AAHJ;AACF;AAME;EACE,WAAA;EACA,YAAA;EACA,kBAAA;AAJJ;AAOE;EACE,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;AALJ;AAOI;EACE,aAAA;EACA,sBAAA;EACA,WAAA;EACA,oBAAA;AALN;AAOM;AANF;IAOI,kDAAA;IACA,eAAA;AAJN;AACF;AAKM;EACE,aAAA;EACA,8BAAA;AAHR;AAIQ;EACE,iBAAA;EACA,YAAA;EACA,gBAAA;AAFV;ADqGE;ACtGM;IAMI,eAAA;AADV;AACF;AAIM;EACE,aAAA;EACA,8BAAA;EACA,WAAA;EACA,sBAAA;AAFR;AAIQ;AANF;IAOI,mBAAA;AADR;AACF;AAGQ;EACE,aAAA;EACA,sBAAA;EAEA,oBAAA;EACA,kDAAA;AAFV;AAIU;EACE,mBAAA;EACA,gBAAA;EACA,eAAA;AAFZ;AD0EE;AC3EQ;IAMI,eAAA;IACA,mBAAA;AADZ;AACF;AAIU;AAlBF;IAmBI,mBAAA;IACA,iBAAA;AADV;AACF;AAGU;EACE,mBAAA;AADZ;AAKQ;EACE,kDAAA;AAHV;AAKU;AAHF;IAII,mBAAA;AAFV;AACF;AAIU;EACE,gBAAA;EACA,iBAAA;EACA,YAAA;EACA,eAAA;EAEA,mBAAA;EACA,kBAAA;AAHZ;AD2CE;AC/CQ;IAUI,eAAA;IAEA,eAAA;IACA,kBAAA;AAHZ;AACF;AAMU;EACE,eAAA;EACA,mBAAA;EACA,YAAA;AAJZ;AAMY;AALF;IAMI,eAAA;IACA,YAAA;AAHZ;AACF;AASI;EACE,cAAA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;AAPN;AASM;AANF;IAOI,cAAA;IACA,mBAAA;IACA,mBAAA;AANN;AACF;AAQM;;EAEE,cAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;AANR;AAUI;EACE,mBAAA;EAMA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,mBAAA;EACA,oBAAA;AAbN;AAKM;AAHF;IAII,gBAAA;AAFN;AACF;AAWQ;EACE,iBAAA;EACA,cAAA;AATV;AAeE;EACE,WAAA;EACA,kDAAA;EACA,eAAA;EACA,gBAAA;AAbJ;ADlBE;AC2BA;IAOI,eAAA;AAZJ;AACF;AAcE;EACE,uBAAA;EAAA,kBAAA;EACA,kBAAA;AAZJ;AAeM;EACE,gBAAA;EACA,eAAA;AAbR;AAiBI;EACE,mBAAA;EACA,YAAA;EACA,0BAAA;AAfN","file":"Footer.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.footer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 500;\n  height: 100%;\n  font-size: 12px;\n  font-family: 'SupercellText', sans-serif;\n  background: #000;\n  color: white;\n  width: 100%;\n  overflow: scroll;\n\n  @media screen and (min-width: 1280px) {\n    position: relative;\n    height: auto;\n    overflow: visible;\n  }\n\n  .navBar {\n    position: fixed;\n    width: 100%;\n    display: flex;\n    justify-content: flex-end;\n    overflow: hidden;\n\n    @media screen and (min-width: 1280px) {\n      display: none;\n    }\n  }\n\n  &__navCloseButton {\n    width: 62px;\n    height: 40px;\n    margin-right: -4px;\n  }\n\n  .inner {\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    min-height: 100%;\n    width: 90%;\n    margin: 0 5%;\n\n    .gameInfoContainer {\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      padding-bottom: 16px;\n\n      @media screen and (min-width: 1280px) {\n        border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n        padding: 32px 0;\n      }\n      .header {\n        display: flex;\n        justify-content: space-between;\n        p {\n          line-height: 160%;\n          color: white;\n          font-weight: 700;\n\n          @include mq($from: laptop) {\n            font-size: 14px;\n          }\n        }\n      }\n      .linksContainer {\n        display: flex;\n        justify-content: space-between;\n        width: 100%;\n        flex-direction: column;\n\n        @media screen and (min-width: 1280px) {\n          flex-direction: row;\n        }\n\n        .socials {\n          display: flex;\n          flex-direction: column;\n\n          padding-bottom: 16px;\n          border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n\n          p {\n            margin-bottom: layout-grid(3);\n            font-weight: 700;\n            font-size: 14px;\n\n            @include mq($until: laptop) {\n              font-size: 12px;\n              margin-bottom: layout-grid(2);\n            }\n          }\n\n          @media screen and (min-width: 1280px) {\n            border-bottom: none;\n            padding-bottom: 0;\n          }\n\n          a {\n            padding-right: 16px;\n          }\n        }\n\n        .downloadButtonsContainer {\n          border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n\n          @media screen and (min-width: 1280px) {\n            border-bottom: none;\n          }\n\n          p {\n            font-weight: 700;\n            line-height: 100%;\n            color: white;\n            font-size: 14px;\n\n            margin-bottom: layout-grid(3);\n            padding-left: 10px;\n\n            @include mq($until: laptop) {\n              font-size: 12px;\n\n              padding-left: 0;\n              margin-bottom: layout-grid(1);\n            }\n          }\n\n          img {\n            padding: 16px 0;\n            padding-right: 10px;\n            height: 70px;\n\n            @media screen and (min-width: 1280px) {\n              padding: 0 10px;\n              height: 50px;\n            }\n          }\n        }\n      }\n    }\n\n    .externalLinksContainer {\n      margin: 16px 0;\n      display: flex;\n      flex-direction: column;\n      font-size: 14px;\n\n      @media screen and (min-width: 1280px) {\n        margin: 32px 0;\n        flex-direction: row;\n        align-items: center;\n      }\n\n      a,\n      span {\n        color: #f2f2f2;\n        text-decoration: none;\n        padding-right: 32px;\n        cursor: pointer;\n      }\n    }\n\n    .supercellInfoContainer {\n      margin-bottom: 20px;\n\n      @media screen and (min-width: 1280px) {\n        margin-bottom: 0;\n      }\n\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      padding-bottom: 32px;\n\n      .addressContainer {\n        p {\n          line-height: 100%;\n          color: #808080;\n        }\n      }\n    }\n  }\n\n  .langSelect__wrapper {\n    width: 100%;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.15);\n    padding: layout-grid(2) 0;\n    margin-top: layout-grid(2);\n\n    @include mq($from: laptop) {\n      padding: layout-grid(3) 0;\n    }\n  }\n  .langSelect {\n    width: fit-content;\n    margin-right: layout-grid(2);\n\n    &--footer {\n      & ::v-deep select {\n        font-weight: 500;\n        font-size: 13px;\n      }\n    }\n\n    & ::v-deep select {\n      border-radius: 50px;\n      border: none;\n      box-shadow: shadow(module);\n    }\n  }\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.icon[data-v-30fc423f] {\n  display: flex;\n  transition: transform speed(fast) cubic-bezier(0.455, 0.03, 0.515, 0.955);\n}\n.icon.up[data-v-30fc423f] {\n  transform: rotate(180deg);\n}\n.icon.right[data-v-30fc423f] {\n  transform: rotate(-90deg);\n}\n.icon.down[data-v-30fc423f] {\n  transform: unset;\n}\n.icon.left[data-v-30fc423f] {\n  transform: rotate(-90deg);\n}\n.icon__svg[data-v-30fc423f] {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  max-width: var(--max-width);\n  max-height: var(--max-height);\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/Icons/ChevronIcon.vue"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EAEE,aAAA;EACA,yEAAA;AANF;AAQE;EACE,yBAAA;AANJ;AASE;EACE,yBAAA;AAPJ;AAUE;EACE,gBAAA;AARJ;AAWE;EACE,yBAAA;AATJ;AAYE;EACE,aAAA;EACA,WAAA;EACA,YAAA;EACA,2BAAA;EACA,6BAAA;AAVJ","file":"ChevronIcon.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.icon {\n  $block: &;\n  display: flex;\n  transition: transform speed(fast) easing(in-out-quad);\n\n  &.up {\n    transform: rotate(180deg);\n  }\n\n  &.right {\n    transform: rotate(-90deg);\n  }\n\n  &.down {\n    transform: unset;\n  }\n\n  &.left {\n    transform: rotate(-90deg);\n  }\n\n  &__svg {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    max-width: var(--max-width);\n    max-height: var(--max-height);\n  }\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.icon[data-v-3dd9d69e] {\n  display: flex;\n}\n.icon__svg[data-v-3dd9d69e] {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  max-width: var(--max-width);\n  max-height: var(--max-height);\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/Icons/GlobeIcon.vue"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EAEE,aAAA;AANF;AAQE;EACE,aAAA;EACA,WAAA;EACA,YAAA;EACA,2BAAA;EACA,6BAAA;AANJ","file":"GlobeIcon.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.icon {\n  $block: &;\n  display: flex;\n\n  &__svg {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    max-width: var(--max-width);\n    max-height: var(--max-height);\n  }\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.localeSelect[data-v-41112d26] {\n  position: relative;\n  display: flex;\n  cursor: pointer;\n  z-index: 999;\n}\n.localeSelect__select[data-v-41112d26] {\n  width: 100%;\n  max-width: 100%;\n  height: 32px;\n  padding: 0 32px 0 16px;\n  border: solid 1px #dddddd;\n  border-radius: 4px;\n  cursor: pointer;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background: #fff;\n  padding-left: 32px;\n  max-height: 269px;\n  overflow: scroll;\n}\n@media (min-width: 46em) {\n.localeSelect__select[data-v-41112d26] {\n    pointer-events: none;\n}\n}\n.localeSelect__select.white[data-v-41112d26] {\n  background: transparent;\n  color: #fff;\n}\n@media (max-width: 45.99em) {\n.localeSelect__select.white option[data-v-41112d26] {\n    background: white;\n    color: black;\n}\n}\n.localeSelect__chevron[data-v-41112d26] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n  z-index: 10;\n  pointer-events: none;\n}\n.localeSelect__globe[data-v-41112d26] {\n  position: absolute;\n  cursor: pointer;\n  z-index: 10;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 36px;\n}\n.localeSelect__globe img[data-v-41112d26] {\n  width: 16px;\n  height: 16px;\n}\n.localeSelect__desktopOptions[data-v-41112d26] {\n  position: absolute;\n  left: 0;\n  top: 40px;\n  width: 160px;\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: shadow(module);\n  max-height: 269px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.localeSelect--alignedRight .localeSelect__desktopOptions[data-v-41112d26] {\n  right: 0;\n  left: unset;\n}\n.localeSelect--alignedBottom .localeSelect__desktopOptions[data-v-41112d26] {\n  bottom: 40px;\n  top: unset;\n}\n.localeSelect__desktopOption[data-v-41112d26] {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding: 16px;\n  color: #808080;\n  text-align: left;\n  border-bottom: 1px solid #f9f9f9;\n  cursor: pointer;\n  transition: color speed(fast);\n}\n.localeSelect__desktopOption[data-v-41112d26]:last-child {\n  border-bottom: 0;\n}\n.localeSelect__desktopLabel[data-v-41112d26] {\n  color: inherit;\n  pointer-events: none;\n  margin: 0;\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/LocaleSelect.vue"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;EAEE,kBAAA;EACA,aAAA;EACA,eAAA;EAEA,YAAA;AAPF;AASE;EACE,WAAA;EACA,eAAA;EACA,YAAA;EACA,sBAAA;EACA,yBAAA;EACA,kBAAA;EACA,eAAA;EACA,wBAAA;KAAA,qBAAA;UAAA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;AAPJ;ADmJE;ACxJA;IAcI,oBAAA;AALJ;AACF;AAOI;EACE,uBAAA;EACA,WAAA;AALN;AD0IE;AClIM;IACE,iBAAA;IACA,YAAA;AALR;AACF;AAUE;EACE,kBAAA;EACA,SAAA;EACA,WAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;AARJ;AAWE;EACE,kBAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;EACA,MAAA;EACA,OAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;AATJ;AAWI;EACE,WAAA;EACA,YAAA;AATN;AAaE;EACE,kBAAA;EACA,OAAA;EACA,SAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;EACA,0BAAA;EAEA,iBAAA;EACA,gBAAA;EACA,iCAAA;AAZJ;AAgBI;EACE,QAAA;EACA,WAAA;AAdN;AAmBI;EACE,YAAA;EACA,UAAA;AAjBN;AAqBE;EACE,aAAA;EACA,8BAAA;EACA,WAAA;EACA,aAAA;EACA,cAAA;EACA,gBAAA;EACA,gCAAA;EACA,eAAA;EACA,6BAAA;AAnBJ;AAqBI;EACE,gBAAA;AAnBN;AA+BE;EACE,cAAA;EACA,oBAAA;EACA,SAAA;AA7BJ","file":"LocaleSelect.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.localeSelect {\n  $block: &;\n  position: relative;\n  display: flex;\n  cursor: pointer;\n\n  z-index: 999;\n\n  &__select {\n    width: 100%;\n    max-width: 100%;\n    height: layout-grid(4);\n    padding: 0 layout-grid(4) 0 layout-grid(2);\n    border: solid 1px #dddddd;\n    border-radius: 4px;\n    cursor: pointer;\n    appearance: none;\n    background: color(white);\n    padding-left: 32px;\n    max-height: 269px; // Fit 5 items\n    overflow: scroll;\n    @include mq($from: tablet) {\n      pointer-events: none;\n    }\n\n    &.white {\n      background: transparent;\n      color: color(white);\n\n      @include mq($until: tablet) {\n        option {\n          background: white;\n          color: black;\n        }\n      }\n    }\n  }\n\n  &__chevron {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    cursor: pointer;\n    z-index: 10;\n    pointer-events: none;\n  }\n\n  &__globe {\n    position: absolute;\n    cursor: pointer;\n    z-index: 10;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    width: 36px;\n\n    & img {\n      width: 16px;\n      height: 16px;\n    }\n  }\n\n  &__desktopOptions {\n    position: absolute;\n    left: 0;\n    top: layout-grid(5);\n    width: 160px;\n    background-color: color(white);\n    border-radius: layout-grid(1);\n    box-shadow: shadow(module);\n    z-index: z-index(select);\n    max-height: 269px; // Fit 5 items\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  &--alignedRight {\n    .localeSelect__desktopOptions {\n      right: 0;\n      left: unset;\n    }\n  }\n\n  &--alignedBottom {\n    .localeSelect__desktopOptions {\n      bottom: layout-grid(5);\n      top: unset;\n    }\n  }\n\n  &__desktopOption {\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n    padding: layout-grid(2);\n    color: color(divine);\n    text-align: left;\n    border-bottom: 1px solid color(archon);\n    cursor: pointer;\n    transition: color speed(fast);\n\n    &:last-child {\n      border-bottom: 0;\n    }\n\n    &:hover:not(&--active) {\n      color: color(immortal);\n    }\n\n    &--active {\n      color: color(immortal);\n    }\n  }\n\n  &__desktopLabel {\n    color: inherit;\n    pointer-events: none;\n    margin: 0;\n  }\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, "/* stylelint-disable */\n/* stylelint-disable */\n.pickedLabel[data-v-4f766b58] {\n  color: white;\n  font-size: 12px;\n  font-family: \"Lilitaone\", Arial, sans-serif;\n  text-transform: none;\n  font-weight: 400;\n  text-transform: uppercase;\n  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\n  position: var(--position);\n  border-radius: 0;\n  z-index: 1;\n}\n.pickedLabel[data-v-4f766b58]:lang(ru), .pickedLabel[data-v-4f766b58]:lang(tr), .pickedLabel[data-v-4f766b58]:lang(pl), .pickedLabel[data-v-4f766b58]:lang(jp), .pickedLabel[data-v-4f766b58]:lang(zh-Hant), .pickedLabel[data-v-4f766b58]:lang(zh-Hans), .pickedLabel[data-v-4f766b58]:lang(vi) {\n  font-family: Arial, Helvetica, sans-serif;\n  font-weight: 900;\n}\n.pickedLabel[data-v-4f766b58]:lang(zh-Hans), .pickedLabel[data-v-4f766b58]:lang(zh-Hant) {\n  font-weight: 500;\n}\n.pickedLabel[data-v-4f766b58]:lang(ar), .pickedLabel[data-v-4f766b58]:lang(fa) {\n  font-weight: 500;\n  direction: rtl;\n}\n.pickedLabel[data-v-4f766b58]:lang(he) {\n  direction: rtl;\n}\n.pickedLabel__label[data-v-4f766b58] {\n  -webkit-transform: skew(5deg);\n  -moz-transform: skew(5deg);\n  -o-transform: skew(5deg);\n  position: relative;\n  font-size: var(--size);\n  line-height: 1.1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  text-transform: uppercase;\n  color: #ffffff;\n  filter: drop-shadow(0px 1.5px 0px #000000);\n}\n.pickedLabel--disabled .pickedLabel__label[data-v-4f766b58] {\n  opacity: 0.5;\n}", "",{"version":3,"sources":["/home/runner/work/pinmaker/pinmaker/frontend/src/styles/_mq.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/components/PickedLabel.vue","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/typography.scss","/home/runner/work/pinmaker/pinmaker/frontend/src/styles/mixins/base.scss"],"names":[],"mappings":"AAAA,sBAAA;AAAA,sBAAA;ACQA;ECqBE,YAAA;EACA,eAAA;EACA,2CAAA;EACA,oBAAA;EACA,gBAAA;EAKE,yBAAA;EAkBA,+EAAA;ED7CF,yBAAA;EACA,gBAAA;EACA,UAAA;AAAF;ACXE;EAOE,yCAAA;EACA,gBAAA;ADOJ;ACLE;EAEE,gBAAA;ADMJ;ACHE;EAEE,gBAAA;EACA,cAAA;ADIJ;ACDE;EACE,cAAA;ADGJ;AAZE;EEoCE,6BAAA;EACA,0BAAA;EACA,wBAAA;EFpCA,kBAAA;EACA,sBAAA;EACA,gBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,yBAAA;EACA,cAAA;EACA,0CAAA;AAgBJ;AAdI;EACE,YAAA;AAgBN","file":"PickedLabel.vue","sourcesContent":["/* stylelint-disable */\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n// See https://github.com/sass-mq/sass-mq/pull/10\n\n@use 'sass:math';\n\n/// Base font size on the `<body>` element\n/// Do not override this value, or things will break\n$mq-base-font-size: 16px !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n  mobile-small: 320px,\n  mobile-regular: 375px,\n  mobile: 430px,\n  // Default\n  tablet: 736px,\n  tablet-large: 900px,\n  laptop-small: 1024px,\n  laptop-medium: 1140px,\n  laptop: 1280px,\n  desktop: 1800px,\n) !default;\n\n/// Customize the media type (for example: `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @ignore @param {Number} $base-font-size [$mq-base-font-size] - `<body>` font size (deprecated)\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n  @if ($mq-base-font-size != 16px) {\n    @warn \"Overriding $mq-base-font-size will break things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if ($base-font-size != 16px) {\n    @warn \"The $base-font-size argument will be removed in sass-mq v6.0.0, as overriding it breaks things, see https://github.com/sass-mq/sass-mq/issues/122.\";\n  }\n  @if unitless($px) {\n    @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n    @return mq-px2em($px * 1px, $base-font-size);\n  } @else if unit($px) == em {\n    @return $px;\n  }\n  //@return math.div($px, $base-font-size) * 1em;\n  @return math.div($px, $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n  @if map-has-key($breakpoints, $name) {\n    @return map-get($breakpoints, $name);\n  } @else {\n    @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n  }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $until [false] - One of $mq-breakpoints\n/// @param {String | Boolean} $and [false] - Additional media query parameters\n/// @param {String} $media-type [$mq-media-type] - Media type: screen, print…\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n  $from: false,\n  $until: false,\n  $and: false,\n  $media-type: $mq-media-type,\n  $breakpoints: $mq-breakpoints\n) {\n  $min-width: 0;\n  $max-width: 0;\n  $media-query: '';\n\n  // From: this breakpoint (inclusive)\n  @if $from {\n    @if type-of($from) == number {\n      $min-width: mq-px2em($from);\n    } @else {\n      $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n    }\n  }\n\n  // Until: that breakpoint (exclusive)\n  @if $until {\n    @if type-of($until) == number {\n      $max-width: mq-px2em($until);\n    } @else {\n      $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) -\n        0.01em;\n    }\n  }\n\n  @if $min-width != 0 {\n    $media-query: '#{$media-query} and (min-width: #{$min-width})';\n  }\n  @if $max-width != 0 {\n    $media-query: '#{$media-query} and (max-width: #{$max-width})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} and #{$and}';\n  }\n\n  // Remove unnecessary media query prefix 'all and '\n  @if ($media-type == 'all' and $media-query != '') {\n    $media-type: '';\n    $media-query: str-slice(unquote($media-query), 6);\n  }\n\n  @media #{$media-type + $media-query} {\n    @content;\n  }\n}\n","\n        @import \"@/styles/variables.scss\";\n        @import \"@/styles/_mq.scss\";\n        @import \"@/styles/functions.scss\";\n        @import \"@/styles/mixins/base.scss\";\n        @import \"@/styles/mixins/typography.scss\";\n        \n\n.pickedLabel {\n  $block: &;\n  @include white-header-font-uppercase('small');\n  position: var(--position);\n  border-radius: 0;\n  z-index: 1;\n\n  &__label {\n    @include unskew();\n    position: relative;\n    font-size: var(--size);\n    line-height: 1.1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    text-transform: uppercase;\n    color: #ffffff;\n    filter: drop-shadow(0px 1.5px 0px #000000);\n\n    #{$block}--disabled & {\n      opacity: 0.5;\n    }\n  }\n}\n","@mixin fallback-font() {\n  // use fallback font if too many chars are unsupported by lang\n  &:lang(ru),\n  &:lang(tr),\n  &:lang(pl),\n  &:lang(jp),\n  &:lang(zh-Hant),\n  &:lang(zh-Hans),\n  &:lang(vi) {\n    font-family: Arial, Helvetica, sans-serif;\n    font-weight: 900;\n  }\n  &:lang(zh-Hans),\n  &:lang(zh-Hant) {\n    font-weight: 500;\n  }\n\n  &:lang(ar),\n  &:lang(fa) {\n    font-weight: 500;\n    direction: rtl;\n  }\n\n  &:lang(he) {\n    direction: rtl;\n  }\n}\n\n@mixin white-header-font($font-size-type, $uppercase: false, $noShadow: false) {\n  color: white;\n  font-size: white_font_size($font-size-type);\n  font-family: 'Lilitaone', Arial, sans-serif;\n  text-transform: none;\n  font-weight: 400;\n\n  @include fallback-font;\n\n  @if ($uppercase) {\n    text-transform: uppercase;\n  }\n  @if ($font-size-type != 'small') {\n    text-shadow: -1.5px -1.5px 0 black, 0 -1.5px 0 black, 1.5px -1.5px 0 black, 1.5px 0 0 black,\n      1.5px 1.5px 0 black, 0 1.5px 0 black, -1.5px 1.5px 0 black, -1.5px 0 0 black, 0 3px 0 black,\n      -1.5px 3px 0 black, 1.5px 3px 0 black;\n  }\n  @if ($font-size-type == 'h2') {\n    text-shadow: -2px -2px 0 black, 0 -2px 0 black, 2px -2px 0 black, 2px 0 0 black, 2px 2px 0 black,\n      0 2px 0 black, -2px 2px 0 black, -2px 0 0 black, 0 3.5px 0 black, -2px 3.5px 0 black,\n      2px 3.5px 0 black;\n  }\n  @if ($font-size-type == 'body' or $font-size-type == 'button') {\n    text-shadow: -1.4px -1.4px 0 black, 0 -1.4px 0 black, 1.4px -1.4px 0 black, 1.4px 0 0 black,\n      1.4px 1.4px 0 black, 0 1.4px 0 black, -1.4px 1.4px 0 black, -1.4px 0 0 black, 0 3px 0 black,\n      -1.4px 3px 0 black, 1.4px 3px 0 black;\n  }\n  @if ($font-size-type == 'small' or $font-size-type == 'x-small') {\n    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\n  }\n  @if ($noShadow) {\n    text-shadow: unset;\n  }\n}\n\n@mixin white-header-font-uppercase($font-size-type) {\n  @include white-header-font($font-size-type, true);\n}\n","@import '../_mq.scss';\n\n// TODO - These are copied from other projects. Cleanup in the future.\n\n// Flexbox: center items both vertically and horizontally\n@mixin flex-center() {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n// Flexbox: center items both vertically and horizontally\n@mixin absolute-fill() {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n// Centered background image mixin\n@mixin centered-background($bg-size: auto) {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: $bg-size;\n}\n\n@mixin skew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(-10deg);\n    -moz-transform: skew(-10deg);\n    -o-transform: skew(-10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(-5deg);\n    -moz-transform: skew(-5deg);\n    -o-transform: skew(-5deg);\n  }\n}\n\n@mixin unskew($big: false) {\n  @if ($big == true) {\n    -webkit-transform: skew(10deg);\n    -moz-transform: skew(10deg);\n    -o-transform: skew(10deg);\n  }\n\n  @if ($big == false) {\n    -webkit-transform: skew(5deg);\n    -moz-transform: skew(5deg);\n    -o-transform: skew(5deg);\n  }\n}\n\n@mixin theme-color($color, $depth: false) {\n  @if ($depth == true) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-minus1);\n    border-top: 4px solid color(#{$color}-plus1);\n  }\n  @if ($depth == false) {\n    background-color: color(#{$color}-main);\n    border-bottom: 4px solid color(#{$color}-main);\n    border-top: 4px solid color(#{$color}-main);\n  }\n}\n\n@mixin theme-border($shadow: true) {\n  @if ($shadow == true) {\n    box-shadow: 0 2px color(black);\n  }\n  @if ($shadow == false) {\n    box-shadow: 0 0 color(black);\n  }\n\n  border-radius: 5px;\n  border: 2px solid color(black);\n}\n\n@mixin mqAspectRatio($from: false, $until: false, $and: false) {\n  $media-query: 'screen';\n\n  @if $from {\n    $media-query: '#{$media-query} and (min-aspect-ratio: #{$from})';\n  }\n  @if $until {\n    $media-query: '#{$media-query} and (max-aspect-ratio: #{$until})';\n  }\n  @if $and {\n    $media-query: '#{$media-query} #{$and}';\n  }\n  @media #{$media-query} {\n    @content;\n  }\n}\n\n@mixin for-landscape {\n  @media screen and (orientation: landscape) {\n    @content;\n  }\n}\n\n@mixin for-tablet {\n  @media screen and (min-width: 676px) {\n    @content;\n  }\n}\n\n@mixin for-desktop {\n  @media screen and (min-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-landscape {\n  @media screen and (orientation: landscape) and (max-width: 926px) {\n    // @media screen and (orientation: landscape) and (max-width: 1280px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-small {\n  @media screen and (max-width: 400px) and (max-height: 760px),\n    screen and (max-width: 760px) and (max-height: 400px) {\n    @content;\n  }\n}\n\n@mixin for-mobile-portrait {\n  @media screen and (max-width: 420px) and (orientation: portrait) {\n    @content;\n  }\n}\n\n@mixin fast-transition {\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("e5eaf7b4", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("58127ddc", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("10580beb", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("05d2c0d7", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("64cc1864", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("c404f948", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("09b1e44e", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("824f00de", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("e1bfbe08", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("28fa3d5c", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--9-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("bf009b86", content, false, {"sourceMap":true,"shadowMode":false});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90&scoped=true */ "./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true");
/* harmony import */ var _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts */ "./src/App.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true */ "./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true");
/* harmony import */ var _App_vue_vue_type_style_index_1_id_7ba5bd90_lang_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss */ "./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_7ba5bd90_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_7ba5bd90_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7ba5bd90",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=ts":
/*!*********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--15-0!../node_modules/babel-loader/lib!../node_modules/ts-loader??ref--15-2!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true":
/*!******************************************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--9-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_7ba5bd90_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss":
/*!******************************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_id_7ba5bd90_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--9-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=1&id=7ba5bd90&lang=scss");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_id_7ba5bd90_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_id_7ba5bd90_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_id_7ba5bd90_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_id_7ba5bd90_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true":
/*!***************************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../node_modules/cache-loader/dist/cjs.js??ref--13-0!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/assets/icons/icon-social-bilibili.svg":
/*!***************************************************!*\
  !*** ./src/assets/icons/icon-social-bilibili.svg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-bilibili.52a5184c.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-facebook-white.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/icon-social-facebook-white.svg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-facebook-white.e1f81fe9.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-glassdoor-white.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/icon-social-glassdoor-white.svg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-glassdoor-white.89ebcef8.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-instagram-white.svg":
/*!**********************************************************!*\
  !*** ./src/assets/icons/icon-social-instagram-white.svg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-instagram-white.6d47bf97.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-link-white.svg":
/*!*****************************************************!*\
  !*** ./src/assets/icons/icon-social-link-white.svg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-link-white.0e37dbe8.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-linkedin-white.svg":
/*!*********************************************************!*\
  !*** ./src/assets/icons/icon-social-linkedin-white.svg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-linkedin-white.ef566917.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-tiktok.svg":
/*!*************************************************!*\
  !*** ./src/assets/icons/icon-social-tiktok.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-tiktok.2b4ca542.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-twitter-white.svg":
/*!********************************************************!*\
  !*** ./src/assets/icons/icon-social-twitter-white.svg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-twitter-white.da4f2fb0.svg";

/***/ }),

/***/ "./src/assets/icons/icon-social-youtube-white.svg":
/*!********************************************************!*\
  !*** ./src/assets/icons/icon-social-youtube-white.svg ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-social-youtube-white.c0cf507d.svg";

/***/ }),

/***/ "./src/components/BaseLink.vue":
/*!*************************************!*\
  !*** ./src/components/BaseLink.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseLink_vue_vue_type_template_id_0b7f4d1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true */ "./src/components/BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true");
/* harmony import */ var _BaseLink_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseLink.vue?vue&type=script&lang=ts */ "./src/components/BaseLink.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _BaseLink_vue_vue_type_style_index_0_id_0b7f4d1b_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true */ "./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BaseLink_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseLink_vue_vue_type_template_id_0b7f4d1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _BaseLink_vue_vue_type_template_id_0b7f4d1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0b7f4d1b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/BaseLink.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/BaseLink.vue?vue&type=script&lang=ts":
/*!*************************************************************!*\
  !*** ./src/components/BaseLink.vue?vue&type=script&lang=ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--15-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./BaseLink.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_style_index_0_id_0b7f4d1b_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=style&index=0&id=0b7f4d1b&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_style_index_0_id_0b7f4d1b_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_style_index_0_id_0b7f4d1b_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_style_index_0_id_0b7f4d1b_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_style_index_0_id_0b7f4d1b_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true":
/*!*******************************************************************************!*\
  !*** ./src/components/BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_template_id_0b7f4d1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/BaseLink.vue?vue&type=template&id=0b7f4d1b&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_template_id_0b7f4d1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseLink_vue_vue_type_template_id_0b7f4d1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/Buttons/BaseButton.vue":
/*!***********************************************!*\
  !*** ./src/components/Buttons/BaseButton.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseButton_vue_vue_type_template_id_7799e2fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true */ "./src/components/Buttons/BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true");
/* harmony import */ var _BaseButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseButton.vue?vue&type=script&lang=js */ "./src/components/Buttons/BaseButton.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _BaseButton_vue_vue_type_style_index_0_id_7799e2fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true */ "./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BaseButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseButton_vue_vue_type_template_id_7799e2fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _BaseButton_vue_vue_type_template_id_7799e2fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7799e2fe",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Buttons/BaseButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Buttons/BaseButton.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./src/components/Buttons/BaseButton.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./BaseButton.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_style_index_0_id_7799e2fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=style&index=0&id=7799e2fe&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_style_index_0_id_7799e2fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_style_index_0_id_7799e2fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_style_index_0_id_7799e2fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_style_index_0_id_7799e2fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/Buttons/BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true":
/*!*****************************************************************************************!*\
  !*** ./src/components/Buttons/BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_template_id_7799e2fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/BaseButton.vue?vue&type=template&id=7799e2fe&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_template_id_7799e2fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseButton_vue_vue_type_template_id_7799e2fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/Buttons/RectangleButton.vue":
/*!****************************************************!*\
  !*** ./src/components/Buttons/RectangleButton.vue ***!
  \****************************************************/
/*! exports provided: ButtonColors, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RectangleButton_vue_vue_type_template_id_7bc88353_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true */ "./src/components/Buttons/RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true");
/* harmony import */ var _RectangleButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RectangleButton.vue?vue&type=script&lang=js */ "./src/components/Buttons/RectangleButton.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonColors", function() { return _RectangleButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["ButtonColors"]; });

/* harmony import */ var _RectangleButton_vue_vue_type_style_index_0_id_7bc88353_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true */ "./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RectangleButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RectangleButton_vue_vue_type_template_id_7bc88353_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _RectangleButton_vue_vue_type_template_id_7bc88353_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7bc88353",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Buttons/RectangleButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Buttons/RectangleButton.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./src/components/Buttons/RectangleButton.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/*! exports provided: default, ButtonColors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./RectangleButton.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonColors", function() { return _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["ButtonColors"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_style_index_0_id_7bc88353_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=style&index=0&id=7bc88353&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_style_index_0_id_7bc88353_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_style_index_0_id_7bc88353_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_style_index_0_id_7bc88353_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_style_index_0_id_7bc88353_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/Buttons/RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./src/components/Buttons/RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_template_id_7bc88353_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/RectangleButton.vue?vue&type=template&id=7bc88353&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_template_id_7bc88353_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RectangleButton_vue_vue_type_template_id_7bc88353_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/Buttons/SocialButton.vue":
/*!*************************************************!*\
  !*** ./src/components/Buttons/SocialButton.vue ***!
  \*************************************************/
/*! exports provided: SocialItems, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SocialButton_vue_vue_type_template_id_4813229d_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SocialButton.vue?vue&type=template&id=4813229d&scoped=true */ "./src/components/Buttons/SocialButton.vue?vue&type=template&id=4813229d&scoped=true");
/* harmony import */ var _SocialButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SocialButton.vue?vue&type=script&lang=js */ "./src/components/Buttons/SocialButton.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialItems", function() { return _SocialButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["SocialItems"]; });

/* harmony import */ var _SocialButton_vue_vue_type_style_index_0_id_4813229d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true */ "./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SocialButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SocialButton_vue_vue_type_template_id_4813229d_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _SocialButton_vue_vue_type_template_id_4813229d_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4813229d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Buttons/SocialButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Buttons/SocialButton.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./src/components/Buttons/SocialButton.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/*! exports provided: default, SocialItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SocialButton.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialItems", function() { return _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["SocialItems"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true":
/*!**********************************************************************************************************!*\
  !*** ./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_style_index_0_id_4813229d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=style&index=0&id=4813229d&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_style_index_0_id_4813229d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_style_index_0_id_4813229d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_style_index_0_id_4813229d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_style_index_0_id_4813229d_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/Buttons/SocialButton.vue?vue&type=template&id=4813229d&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./src/components/Buttons/SocialButton.vue?vue&type=template&id=4813229d&scoped=true ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_template_id_4813229d_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SocialButton.vue?vue&type=template&id=4813229d&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Buttons/SocialButton.vue?vue&type=template&id=4813229d&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_template_id_4813229d_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SocialButton_vue_vue_type_template_id_4813229d_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/Footer.vue":
/*!***********************************!*\
  !*** ./src/components/Footer.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Footer_vue_vue_type_template_id_40ab164b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Footer.vue?vue&type=template&id=40ab164b&scoped=true */ "./src/components/Footer.vue?vue&type=template&id=40ab164b&scoped=true");
/* harmony import */ var _Footer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer.vue?vue&type=script&lang=js */ "./src/components/Footer.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _Footer_vue_vue_type_style_index_0_id_40ab164b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss */ "./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Footer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Footer_vue_vue_type_template_id_40ab164b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _Footer_vue_vue_type_template_id_40ab164b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "40ab164b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Footer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Footer.vue?vue&type=script&lang=js":
/*!***********************************************************!*\
  !*** ./src/components/Footer.vue?vue&type=script&lang=js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./Footer.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss":
/*!********************************************************************************************!*\
  !*** ./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_40ab164b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=style&index=0&id=40ab164b&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_40ab164b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_40ab164b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_40ab164b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_40ab164b_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/Footer.vue?vue&type=template&id=40ab164b&scoped=true":
/*!*****************************************************************************!*\
  !*** ./src/components/Footer.vue?vue&type=template&id=40ab164b&scoped=true ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_40ab164b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./Footer.vue?vue&type=template&id=40ab164b&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Footer.vue?vue&type=template&id=40ab164b&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_40ab164b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_40ab164b_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/Icons/ChevronIcon.vue":
/*!**********************************************!*\
  !*** ./src/components/Icons/ChevronIcon.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChevronIcon_vue_vue_type_template_id_30fc423f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true */ "./src/components/Icons/ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true");
/* harmony import */ var _ChevronIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChevronIcon.vue?vue&type=script&lang=ts */ "./src/components/Icons/ChevronIcon.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _ChevronIcon_vue_vue_type_style_index_0_id_30fc423f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true */ "./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ChevronIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChevronIcon_vue_vue_type_template_id_30fc423f_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChevronIcon_vue_vue_type_template_id_30fc423f_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "30fc423f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Icons/ChevronIcon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Icons/ChevronIcon.vue?vue&type=script&lang=ts":
/*!**********************************************************************!*\
  !*** ./src/components/Icons/ChevronIcon.vue?vue&type=script&lang=ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../../node_modules/babel-loader/lib!../../../node_modules/ts-loader??ref--15-2!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ChevronIcon.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_style_index_0_id_30fc423f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=style&index=0&id=30fc423f&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_style_index_0_id_30fc423f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_style_index_0_id_30fc423f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_style_index_0_id_30fc423f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_style_index_0_id_30fc423f_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/Icons/ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true":
/*!****************************************************************************************!*\
  !*** ./src/components/Icons/ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_template_id_30fc423f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/ChevronIcon.vue?vue&type=template&id=30fc423f&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_template_id_30fc423f_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChevronIcon_vue_vue_type_template_id_30fc423f_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/Icons/GlobeIcon.vue":
/*!********************************************!*\
  !*** ./src/components/Icons/GlobeIcon.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GlobeIcon_vue_vue_type_template_id_3dd9d69e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true */ "./src/components/Icons/GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true");
/* harmony import */ var _GlobeIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobeIcon.vue?vue&type=script&lang=ts */ "./src/components/Icons/GlobeIcon.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _GlobeIcon_vue_vue_type_style_index_0_id_3dd9d69e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true */ "./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GlobeIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _GlobeIcon_vue_vue_type_template_id_3dd9d69e_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _GlobeIcon_vue_vue_type_template_id_3dd9d69e_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3dd9d69e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Icons/GlobeIcon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/Icons/GlobeIcon.vue?vue&type=script&lang=ts":
/*!********************************************************************!*\
  !*** ./src/components/Icons/GlobeIcon.vue?vue&type=script&lang=ts ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../../node_modules/babel-loader/lib!../../../node_modules/ts-loader??ref--15-2!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./GlobeIcon.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_style_index_0_id_3dd9d69e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=style&index=0&id=3dd9d69e&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_style_index_0_id_3dd9d69e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_style_index_0_id_3dd9d69e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_style_index_0_id_3dd9d69e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_style_index_0_id_3dd9d69e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/Icons/GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true":
/*!**************************************************************************************!*\
  !*** ./src/components/Icons/GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_template_id_3dd9d69e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../../node_modules/babel-loader/lib!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Icons/GlobeIcon.vue?vue&type=template&id=3dd9d69e&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_template_id_3dd9d69e_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobeIcon_vue_vue_type_template_id_3dd9d69e_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/LinkButtonWrapper.vue":
/*!**********************************************!*\
  !*** ./src/components/LinkButtonWrapper.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LinkButtonWrapper_vue_vue_type_template_id_521c78b2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinkButtonWrapper.vue?vue&type=template&id=521c78b2 */ "./src/components/LinkButtonWrapper.vue?vue&type=template&id=521c78b2");
/* harmony import */ var _LinkButtonWrapper_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LinkButtonWrapper.vue?vue&type=script&lang=ts */ "./src/components/LinkButtonWrapper.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LinkButtonWrapper_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _LinkButtonWrapper_vue_vue_type_template_id_521c78b2__WEBPACK_IMPORTED_MODULE_0__["render"],
  _LinkButtonWrapper_vue_vue_type_template_id_521c78b2__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/LinkButtonWrapper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/LinkButtonWrapper.vue?vue&type=script&lang=ts":
/*!**********************************************************************!*\
  !*** ./src/components/LinkButtonWrapper.vue?vue&type=script&lang=ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkButtonWrapper_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--15-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./LinkButtonWrapper.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LinkButtonWrapper.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkButtonWrapper_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/LinkButtonWrapper.vue?vue&type=template&id=521c78b2":
/*!****************************************************************************!*\
  !*** ./src/components/LinkButtonWrapper.vue?vue&type=template&id=521c78b2 ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkButtonWrapper_vue_vue_type_template_id_521c78b2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./LinkButtonWrapper.vue?vue&type=template&id=521c78b2 */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LinkButtonWrapper.vue?vue&type=template&id=521c78b2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkButtonWrapper_vue_vue_type_template_id_521c78b2__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LinkButtonWrapper_vue_vue_type_template_id_521c78b2__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/LocaleSelect.vue":
/*!*****************************************!*\
  !*** ./src/components/LocaleSelect.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LocaleSelect_vue_vue_type_template_id_41112d26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true */ "./src/components/LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true");
/* harmony import */ var _LocaleSelect_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocaleSelect.vue?vue&type=script&lang=ts */ "./src/components/LocaleSelect.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport *//* harmony import */ var _LocaleSelect_vue_vue_type_style_index_0_id_41112d26_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true */ "./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LocaleSelect_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__["default"],
  _LocaleSelect_vue_vue_type_template_id_41112d26_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _LocaleSelect_vue_vue_type_template_id_41112d26_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "41112d26",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/LocaleSelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/LocaleSelect.vue?vue&type=script&lang=ts":
/*!*****************************************************************!*\
  !*** ./src/components/LocaleSelect.vue?vue&type=script&lang=ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--15-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--15-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./LocaleSelect.vue?vue&type=script&lang=ts */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=script&lang=ts");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_15_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_15_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_style_index_0_id_41112d26_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=style&index=0&id=41112d26&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_style_index_0_id_41112d26_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_style_index_0_id_41112d26_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_style_index_0_id_41112d26_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_style_index_0_id_41112d26_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true":
/*!***********************************************************************************!*\
  !*** ./src/components/LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_template_id_41112d26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LocaleSelect.vue?vue&type=template&id=41112d26&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_template_id_41112d26_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LocaleSelect_vue_vue_type_template_id_41112d26_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/PickedLabel.vue":
/*!****************************************!*\
  !*** ./src/components/PickedLabel.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PickedLabel_vue_vue_type_template_id_4f766b58_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true */ "./src/components/PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true");
/* harmony import */ var _PickedLabel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PickedLabel.vue?vue&type=script&lang=js */ "./src/components/PickedLabel.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport *//* harmony import */ var _PickedLabel_vue_vue_type_style_index_0_id_4f766b58_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true */ "./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PickedLabel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PickedLabel_vue_vue_type_template_id_4f766b58_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"],
  _PickedLabel_vue_vue_type_template_id_4f766b58_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4f766b58",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/PickedLabel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/PickedLabel.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/PickedLabel.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PickedLabel.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_style_index_0_id_4f766b58_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--9-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--9-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--9-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=style&index=0&id=4f766b58&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_style_index_0_id_4f766b58_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_style_index_0_id_4f766b58_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_style_index_0_id_4f766b58_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_style_index_0_id_4f766b58_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/components/PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true":
/*!**********************************************************************************!*\
  !*** ./src/components/PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_template_id_4f766b58_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4f416779-vue-loader-template"}!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4f416779-vue-loader-template\"}!./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/PickedLabel.vue?vue&type=template&id=4f766b58&scoped=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_template_id_4f766b58_scoped_true__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4f416779_vue_loader_template_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickedLabel_vue_vue_type_template_id_4f766b58_scoped_true__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/config/axios.ts":
/*!*****************************!*\
  !*** ./src/config/axios.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _stores_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/stores/store */ "./src/stores/store.ts");



axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.baseURL = _constants__WEBPACK_IMPORTED_MODULE_1__["API_URL"];
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.withCredentials = true;
axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.response.use(response => {
  return response;
}, error => {
  var _error$response;
  if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === _constants__WEBPACK_IMPORTED_MODULE_1__["API_CODE_UNAUTHORIZED"]) {
    // Log out and clear user data
    _stores_store__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch('user/clear');
  }
  return Promise.reject(error);
});

/***/ }),

/***/ "./src/config/i18n.ts":
/*!****************************!*\
  !*** ./src/config/i18n.ts ***!
  \****************************/
/*! exports provided: useBrowserLanguage, i18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useBrowserLanguage", function() { return useBrowserLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18n", function() { return i18n; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");
/* harmony import */ var _helpers_loadLocaleFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/helpers/loadLocaleFiles */ "./src/helpers/loadLocaleFiles.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]);
const useBrowserLanguage = () => {
  if (typeof navigator === 'undefined') return _constants__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_LANGUAGE"];
  // Find preferred lang in browser
  const browserLanguage = navigator.languages.map(lang => lang.split('-')[0]).find(lang => _constants__WEBPACK_IMPORTED_MODULE_3__["LANGUAGES"].includes(lang));
  // If no browser lang, use default
  return browserLanguage || _constants__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_LANGUAGE"];
};
const browserLanguage = useBrowserLanguage();
const messages = Object(_helpers_loadLocaleFiles__WEBPACK_IMPORTED_MODULE_2__["loadLocaleFiles"])();
const i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]({
  locale: browserLanguage,
  messages
});

/***/ }),

/***/ "./src/constants/elements.ts":
/*!***********************************!*\
  !*** ./src/constants/elements.ts ***!
  \***********************************/
/*! exports provided: Categories, SVG_ELEMENTS_MAP, HEAD_FEATURES, SKIN_COLOR_FEATURES, COLORING_FEATURES, RANDOMIZE_MUST_HAVE_FEATURES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Categories", function() { return Categories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVG_ELEMENTS_MAP", function() { return SVG_ELEMENTS_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEAD_FEATURES", function() { return HEAD_FEATURES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKIN_COLOR_FEATURES", function() { return SKIN_COLOR_FEATURES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORING_FEATURES", function() { return COLORING_FEATURES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANDOMIZE_MUST_HAVE_FEATURES", function() { return RANDOMIZE_MUST_HAVE_FEATURES; });
// Different categories of elements
var Categories;
(function (Categories) {
  Categories["HEAD"] = "head";
  Categories["EYES"] = "eyes";
  Categories["MOUTH"] = "mouth";
  Categories["HAIR"] = "hair";
  Categories["EFFECT"] = "effect";
  Categories["HANDS"] = "hands";
  Categories["ACCESSORIES"] = "accessories";
  Categories["EYEBROWS"] = "eyebrows";
  Categories["BEARD"] = "beard";
  Categories["SKIN_ACCESSORIES"] = "skin_accessories";
  Categories["EARRINGS"] = "earrings";
  Categories["EARS"] = "ears";
  Categories["BACKGROUND"] = "background";
})(Categories || (Categories = {}));
// How the elements map to the svg name
const SVG_ELEMENTS_MAP = {
  [Categories.HEAD]: '#Heads',
  [Categories.MOUTH]: '#Mouths',
  [Categories.HAIR]: '#Hair',
  [Categories.EYES]: '#Eyes',
  [Categories.EFFECT]: '#Effects',
  [Categories.HANDS]: '#Hands',
  [Categories.SKIN_ACCESSORIES]: '#Accessories_skin',
  [Categories.EARRINGS]: '#Earrings',
  [Categories.EARS]: '#Ears',
  [Categories.EYEBROWS]: '#Eyebrows',
  [Categories.ACCESSORIES]: '#Accessories',
  [Categories.BEARD]: '#Beard'
};
// Which features are part of the head
const HEAD_FEATURES = [Categories.ACCESSORIES, Categories.HAIR, Categories.EYEBROWS, Categories.EYES, Categories.MOUTH, Categories.BEARD, Categories.SKIN_ACCESSORIES, Categories.HEAD, Categories.EARRINGS, Categories.EARS];
// Which features are part of skin coloring
const SKIN_COLOR_FEATURES = [Categories.HANDS, Categories.EARS, Categories.HEAD];
// Color supported features
const COLORING_FEATURES = [...SKIN_COLOR_FEATURES, Categories.HAIR, Categories.BACKGROUND, Categories.BEARD];
// During randomize, these features must be there
const RANDOMIZE_MUST_HAVE_FEATURES = [Categories.HEAD, Categories.EYES, Categories.MOUTH, Categories.EARS, Categories.BACKGROUND];

/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/*! exports provided: IS_DEV, APP_VERSION, ENVIRONMENT, SENTRY_DSN, API_URL, SCID_SSO_URL, SCID_SSO_CLIENT_ID, SCID_SSO_SCOPE, SCID_SSO_OAUTH_URL, AUTHENTICATE_PATH, GAME_WIDTH, GAME_HEIGHT, SVG_NS, UPLOAD_PIN_SCALE, MESSAGE_SCID_SUCCESS, MESSAGE_SCID_FAILURE, MESSAGE_AUTH_SUCCESS, MESSAGE_AUTH_FAILURE, API_CODE_OK, API_CODE_CREATED, API_CODE_BAD_REQUEST, API_CODE_UNAUTHORIZED, API_CODE_FORBIDDEN, API_CODE_NOT_FOUND, API_CODE_INTERNAL_SERVER_ERROR, API_STATUS_PENDING, API_STATUS_SUCCESS, API_STATUS_FAILURE, DEFAULT_SCALE, MAX_SCALE, MIN_SCALE, DEFAULT_SELECTED_ASSET_COL, DEFAULT_SELECTED_ASSET_ROW, PIN_ASSETS_SPRITE, DRAW_SCALE, CENTER_ALIGN_UPLOAD_PIN, DEFAULT_PIN_BACKGROUND_COLOR, SUPPORTED_LANGS_EXP, Language, DEFAULT_LANGUAGE, LANGUAGES, DEFAULT_LOCALE, LOCALE_OPTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_DEV", function() { return IS_DEV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_VERSION", function() { return APP_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENVIRONMENT", function() { return ENVIRONMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SENTRY_DSN", function() { return SENTRY_DSN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCID_SSO_URL", function() { return SCID_SSO_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCID_SSO_CLIENT_ID", function() { return SCID_SSO_CLIENT_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCID_SSO_SCOPE", function() { return SCID_SSO_SCOPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCID_SSO_OAUTH_URL", function() { return SCID_SSO_OAUTH_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTHENTICATE_PATH", function() { return AUTHENTICATE_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_WIDTH", function() { return GAME_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_HEIGHT", function() { return GAME_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVG_NS", function() { return SVG_NS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_PIN_SCALE", function() { return UPLOAD_PIN_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_SCID_SUCCESS", function() { return MESSAGE_SCID_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_SCID_FAILURE", function() { return MESSAGE_SCID_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_AUTH_SUCCESS", function() { return MESSAGE_AUTH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_AUTH_FAILURE", function() { return MESSAGE_AUTH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_OK", function() { return API_CODE_OK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_CREATED", function() { return API_CODE_CREATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_BAD_REQUEST", function() { return API_CODE_BAD_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_UNAUTHORIZED", function() { return API_CODE_UNAUTHORIZED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_FORBIDDEN", function() { return API_CODE_FORBIDDEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_NOT_FOUND", function() { return API_CODE_NOT_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_CODE_INTERNAL_SERVER_ERROR", function() { return API_CODE_INTERNAL_SERVER_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_STATUS_PENDING", function() { return API_STATUS_PENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_STATUS_SUCCESS", function() { return API_STATUS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_STATUS_FAILURE", function() { return API_STATUS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCALE", function() { return DEFAULT_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SCALE", function() { return MAX_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_SCALE", function() { return MIN_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SELECTED_ASSET_COL", function() { return DEFAULT_SELECTED_ASSET_COL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SELECTED_ASSET_ROW", function() { return DEFAULT_SELECTED_ASSET_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PIN_ASSETS_SPRITE", function() { return PIN_ASSETS_SPRITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAW_SCALE", function() { return DRAW_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CENTER_ALIGN_UPLOAD_PIN", function() { return CENTER_ALIGN_UPLOAD_PIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PIN_BACKGROUND_COLOR", function() { return DEFAULT_PIN_BACKGROUND_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUPPORTED_LANGS_EXP", function() { return SUPPORTED_LANGS_EXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Language", function() { return Language; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LANGUAGE", function() { return DEFAULT_LANGUAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANGUAGES", function() { return LANGUAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOCALE", function() { return DEFAULT_LOCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCALE_OPTIONS", function() { return LOCALE_OPTIONS; });
const IS_DEV = "prod-aws" === 'dev';
const APP_VERSION = "2.0.2";
const ENVIRONMENT = "prod-aws";
const SENTRY_DSN = "https://ef09859d463c4deebbe764628d29c516@o315582.ingest.sentry.io/6196237";
const API_URL = "https://api.pinmaker.supercell.com";
const SCID_SSO_URL = "https://accounts.supercell.com";
const SCID_SSO_CLIENT_ID = "C54BECF8-5083-4A8C-9475-ACA4790553DF";
const SCID_SSO_SCOPE = 'social.profile social.profile_image_upload';
const SCID_SSO_OAUTH_URL = SCID_SSO_URL + '/oauth/authorize?client_id=' + SCID_SSO_CLIENT_ID + '&response_type=code&scope=' + encodeURIComponent(SCID_SSO_SCOPE);
const AUTHENTICATE_PATH = '/auth';
const GAME_WIDTH = 540;
const GAME_HEIGHT = 540;
const SVG_NS = 'http://www.w3.org/2000/svg';
const UPLOAD_PIN_SCALE = 1.1;
const MESSAGE_SCID_SUCCESS = 'success';
const MESSAGE_SCID_FAILURE = 'failure';
const MESSAGE_AUTH_SUCCESS = 'success';
const MESSAGE_AUTH_FAILURE = 'failure';
const API_CODE_OK = 200;
const API_CODE_CREATED = 201;
const API_CODE_BAD_REQUEST = 400;
const API_CODE_UNAUTHORIZED = 401;
const API_CODE_FORBIDDEN = 403;
const API_CODE_NOT_FOUND = 404;
const API_CODE_INTERNAL_SERVER_ERROR = 500;
const API_STATUS_PENDING = 'pending';
const API_STATUS_SUCCESS = 'successful';
const API_STATUS_FAILURE = 'failed';
const DEFAULT_SCALE = 1;
const MAX_SCALE = 1.5;
const MIN_SCALE = 0.5;
const DEFAULT_SELECTED_ASSET_COL = 0;
const DEFAULT_SELECTED_ASSET_ROW = 0;
const PIN_ASSETS_SPRITE = 'AssetExport_540_to-SCv20.svg';
// If we want the print of the pin into the image to be smaller or bigger than the actual scale
const DRAW_SCALE = 0.9;
// Automatically center align the uploaded pin
const CENTER_ALIGN_UPLOAD_PIN = true;
// Default pin background color - used when user uploads a pin with transparent background
const DEFAULT_PIN_BACKGROUND_COLOR = '#e6e6e6';
// Supported lang regex used for url
// Update when new lang is added
const SUPPORTED_LANGS_EXP = '/:lang(ar|da|de|en|es|fa|fi|fr|he|it|id|jp|kr|ms|nl|no|pl|pt|ru|sv|th|tr|vi|zh-Hans|zh-Hant)?';
// Supported languages
// Update when new lang is added
var Language;
(function (Language) {
  Language["ARABIC"] = "ar";
  Language["DANISH"] = "da";
  Language["PERSIAN"] = "fa";
  Language["FINNISH"] = "fi";
  Language["HEBREW"] = "he";
  Language["MALAY"] = "ms";
  Language["INDONESIAN"] = "id";
  Language["DUTCH"] = "nl";
  Language["NORWEGIAN"] = "no";
  Language["POLISH"] = "pl";
  Language["RUSSIAN"] = "ru";
  Language["SWEDISH"] = "sv";
  Language["TURKISH"] = "tr";
  Language["THAI"] = "th";
  Language["VIETNAMESE"] = "vi";
  Language["ENGLISH"] = "en";
  Language["GERMAN"] = "de";
  Language["FRENCH"] = "fr";
  Language["ITALIAN"] = "it";
  Language["SPANISH"] = "es";
  Language["PORTUGUESE"] = "pt";
  Language["JAPANESE"] = "jp";
  Language["CHINESE_TRAD"] = "zh-Hant";
  Language["CHINESE_SIM"] = "zh-Hans";
  Language["KOREAN"] = "kr";
})(Language || (Language = {}));
// Default language for app
const DEFAULT_LANGUAGE = Language.ENGLISH;
// Supported languages for
// Update when new lang is added
const LANGUAGES = [Language.ARABIC, Language.DANISH, Language.PERSIAN, Language.FINNISH, Language.HEBREW, Language.MALAY, Language.INDONESIAN, Language.DUTCH, Language.NORWEGIAN, Language.POLISH, Language.RUSSIAN, Language.SWEDISH, Language.TURKISH, Language.THAI, Language.VIETNAMESE, Language.ENGLISH, Language.GERMAN, Language.FRENCH, Language.ITALIAN, Language.SPANISH, Language.PORTUGUESE, Language.JAPANESE, Language.CHINESE_TRAD, Language.CHINESE_SIM, Language.KOREAN];
// Default locale for lang selector
const DEFAULT_LOCALE = {
  value: Language.ENGLISH,
  label: 'lang_en'
};
// Locale Selector Options
// Update when new lang is added
const LOCALE_OPTIONS = [{
  value: Language.ARABIC,
  label: 'lang_ar'
}, {
  value: Language.DANISH,
  label: 'lang_da'
}, {
  value: Language.GERMAN,
  label: 'lang_de'
}, {
  value: Language.ENGLISH,
  label: 'lang_en'
}, {
  value: Language.SPANISH,
  label: 'lang_es'
}, {
  value: Language.PERSIAN,
  label: 'lang_fa'
}, {
  value: Language.FINNISH,
  label: 'lang_fi'
}, {
  value: Language.FRENCH,
  label: 'lang_fr'
}, {
  value: Language.HEBREW,
  label: 'lang_he'
}, {
  value: Language.ITALIAN,
  label: 'lang_it'
}, {
  value: Language.JAPANESE,
  label: 'lang_jp'
}, {
  value: Language.KOREAN,
  label: 'lang_kr'
}, {
  value: Language.MALAY,
  label: 'lang_ms'
}, {
  value: Language.INDONESIAN,
  label: 'lang_id'
}, {
  value: Language.DUTCH,
  label: 'lang_nl'
}, {
  value: Language.NORWEGIAN,
  label: 'lang_no'
}, {
  value: Language.POLISH,
  label: 'lang_pl'
}, {
  value: Language.PORTUGUESE,
  label: 'lang_pt'
}, {
  value: Language.RUSSIAN,
  label: 'lang_ru'
}, {
  value: Language.SWEDISH,
  label: 'lang_sv'
}, {
  value: Language.THAI,
  label: 'lang_th'
}, {
  value: Language.TURKISH,
  label: 'lang_tr'
}, {
  value: Language.VIETNAMESE,
  label: 'lang_vi'
}, {
  value: Language.CHINESE_SIM,
  label: 'lang_zh-Hans'
}, {
  value: Language.CHINESE_TRAD,
  label: 'lang_zh-Hant'
}];

/***/ }),

/***/ "./src/directives/v-visible.ts":
/*!*************************************!*\
  !*** ./src/directives/v-visible.ts ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");

vue__WEBPACK_IMPORTED_MODULE_0__["default"].directive('visible', function (el, binding) {
  el.style.visibility = binding.value ? 'visible' : 'hidden';
  el.style.pointerEvents = binding.value ? 'inherit' : 'none';
});

/***/ }),

/***/ "./src/enums/Color.ts":
/*!****************************!*\
  !*** ./src/enums/Color.ts ***!
  \****************************/
/*! exports provided: Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
var Color;
(function (Color) {
  Color["Black"] = "black";
  Color["White"] = "white";
  Color["Error"] = "red";
  Color["Success"] = "green";
})(Color || (Color = {}));

/***/ }),

/***/ "./src/enums/Direction.ts":
/*!********************************!*\
  !*** ./src/enums/Direction.ts ***!
  \********************************/
/*! exports provided: Direction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
var Direction;
(function (Direction) {
  Direction["Up"] = "up";
  Direction["Right"] = "right";
  Direction["Down"] = "down";
  Direction["Left"] = "left";
})(Direction || (Direction = {}));

/***/ }),

/***/ "./src/enums/index.ts":
/*!****************************!*\
  !*** ./src/enums/index.ts ***!
  \****************************/
/*! exports provided: Color, Direction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Color */ "./src/enums/Color.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _Color__WEBPACK_IMPORTED_MODULE_0__["Color"]; });

/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Direction */ "./src/enums/Direction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return _Direction__WEBPACK_IMPORTED_MODULE_1__["Direction"]; });




/***/ }),

/***/ "./src/fonts/SupercellHeadline-Bold.woff2":
/*!************************************************!*\
  !*** ./src/fonts/SupercellHeadline-Bold.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/SupercellHeadline-Bold.9cfa5879.woff2";

/***/ }),

/***/ "./src/fonts/SupercellHeadline-Heavy.woff2":
/*!*************************************************!*\
  !*** ./src/fonts/SupercellHeadline-Heavy.woff2 ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/SupercellHeadline-Heavy.f9cd15cb.woff2";

/***/ }),

/***/ "./src/fonts/SupercellText-Bold.woff2":
/*!********************************************!*\
  !*** ./src/fonts/SupercellText-Bold.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/SupercellText-Bold.b2cb1a05.woff2";

/***/ }),

/***/ "./src/fonts/SupercellText-Medium.woff2":
/*!**********************************************!*\
  !*** ./src/fonts/SupercellText-Medium.woff2 ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/SupercellText-Medium.f1e41151.woff2";

/***/ }),

/***/ "./src/fonts/SupercellText-Regular.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/SupercellText-Regular.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/SupercellText-Regular.386f0d07.woff2";

/***/ }),

/***/ "./src/fonts/lilitaone-regular-webfont.ttf":
/*!*************************************************!*\
  !*** ./src/fonts/lilitaone-regular-webfont.ttf ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/lilitaone-regular-webfont.1305d321.ttf";

/***/ }),

/***/ "./src/helpers/guid.ts":
/*!*****************************!*\
  !*** ./src/helpers/guid.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Globally Unique Identifier generator that returns id in format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
/* harmony default export */ __webpack_exports__["default"] = (guid);

/***/ }),

/***/ "./src/helpers/loadLocaleFiles.ts":
/*!****************************************!*\
  !*** ./src/helpers/loadLocaleFiles.ts ***!
  \****************************************/
/*! exports provided: loadLocaleFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLocaleFiles", function() { return loadLocaleFiles; });
const loadLocaleFiles = () => {
  const locales = __webpack_require__("./src/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/");
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
};

/***/ }),

/***/ "./src/helpers/random-color.ts":
/*!*************************************!*\
  !*** ./src/helpers/random-color.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return randomColor; });
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

/***/ }),

/***/ "./src/helpers/random-enum-item.ts":
/*!*****************************************!*\
  !*** ./src/helpers/random-enum-item.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return randEnumValue; });
function randEnumValue(enumObj) {
  const enumValues = Object.values(enumObj);
  const index = Math.floor(Math.random() * enumValues.length);
  return enumValues[index];
}

/***/ }),

/***/ "./src/helpers/recursive-find-fill.ts":
/*!********************************************!*\
  !*** ./src/helpers/recursive-find-fill.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return recursiveFindFill; });
function recursiveFindFill(element, find, color) {
  if (element.nodeType !== element.ELEMENT_NODE) return;
  if (element.getAttribute('fill') === find) {
    element.setAttribute('fill', color);
  }
  if (element.hasChildNodes()) {
    element.childNodes.forEach(childNode => recursiveFindFill(childNode, find, color));
  }
}

/***/ }),

/***/ "./src/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/":
/*!****************************************************!*\
  !*** ./src/locales sync [A-Za-z0-9-_,\s]+\.json$/ ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ar.json": "./src/locales/ar.json",
	"./da.json": "./src/locales/da.json",
	"./de.json": "./src/locales/de.json",
	"./en.json": "./src/locales/en.json",
	"./es.json": "./src/locales/es.json",
	"./fa.json": "./src/locales/fa.json",
	"./fi.json": "./src/locales/fi.json",
	"./fr.json": "./src/locales/fr.json",
	"./he.json": "./src/locales/he.json",
	"./id.json": "./src/locales/id.json",
	"./it.json": "./src/locales/it.json",
	"./jp.json": "./src/locales/jp.json",
	"./kr.json": "./src/locales/kr.json",
	"./ms.json": "./src/locales/ms.json",
	"./nl.json": "./src/locales/nl.json",
	"./no.json": "./src/locales/no.json",
	"./pl.json": "./src/locales/pl.json",
	"./pt.json": "./src/locales/pt.json",
	"./ru.json": "./src/locales/ru.json",
	"./sv.json": "./src/locales/sv.json",
	"./th.json": "./src/locales/th.json",
	"./tr.json": "./src/locales/tr.json",
	"./vi.json": "./src/locales/vi.json",
	"./zh-Hans.json": "./src/locales/zh-Hans.json",
	"./zh-Hant.json": "./src/locales/zh-Hant.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/";

/***/ }),

/***/ "./src/locales/ar.json":
/*!*****************************!*\
  !*** ./src/locales/ar.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"مصمم تعبيرات Brawl Stars\",\"meta_title\":\"مصمم تعبيرات Brawl Stars\",\"meta_description\":\"صمم تعبيرك المخصص في Brawl Stars\",\"gen_error\":\"هناك خطأ ما. يرجى إغلاق هذه النافذة والمحاولة مجددًا.\",\"gen_tooltip\":\"يمكنك الآن استخدام التعبيرات كصورة ملف Supercell الشخصي!\",\"gen_hidden\":\"المخفي\",\"cat_head\":\"الرأس\",\"cat_eyes\":\"العينان\",\"cat_mouth\":\"الفم\",\"cat_hair\":\"الشعر\",\"cat_effect\":\"التأثير\",\"cat_hands\":\"اليدان\",\"cat_accessories\":\"الملحقات\",\"cat_eyebrows\":\"الحاجبان\",\"cat_beard\":\"اللحية\",\"cat_skin_accessories\":\"ملحقات المظهر\",\"cat_earrings\":\"الأقراط\",\"cat_ears\":\"الأذنان\",\"cat_background\":\"الخلفية\",\"login_title\":\"سجّل الدخول لحفظ هذا التعبير كصورة ملف Supercell الشخصي\",\"login_cta\":\"تسجيل الدخول بـ Supercell\",\"login_cta_short\":\"سجل الدخول بـ\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"تسجيل الخروج\",\"switch_accounts\":\"تبديل الحسابات\",\"logged_in_as\":\"مسجل دخول بصفة\",\"login_with_supercell\":\"تسجيل الدخول بـ Supercell\",\"save_pin_title\":\"احفظ هذا التعبير كصورة ملف Supercell الشخصي\",\"save_pin_cta\":\"حفظ التعبير الآن\",\"save_cooldown_info\":\"يمكنك حفظ تعبير جديد مرة في اليوم\",\"save_pin_progress\":\"جارٍ الحفظ...\",\"save_success\":\"تم حفظ التعبير كصورة ملف Supercell الشخصي\",\"save_success_new\":\"تم حفظ الأفاتار\",\"save_error\":\"حدثت مشكلة أثناء حفظ صورة الملف الشخصي.\",\"save_disclaimer\":\"قد يتطلب الأمر بضع دقائق قبل ظهورها في اللعبة.\",\"save_success_cta\":\"موافق\",\"save_error_cta_retry\":\"إعادة المحاولة\",\"save_error_cta_back\":\"رجوع إلى المحرر\",\"save_error_ddos\":\"يمكنك تغيير صورة ملف Supercell الشخصي ثلاث مرات في الأسبوع. كرر المحاولة خلال\",\"save_error_days\":\"يومًا/أيام\",\"save_error_day\":\"يوم\",\"save_error_ddos_hours\":\"يمكنك حفظ تعبير جديد بعد\",\"save_error_hours\":\"س\",\"save_error_hour\":\"س\",\"download_title\":\"يبدو رائعًا!\",\"download_description\":\"نزّل تعبيرك المذهل وشاركه!\",\"download_cta\":\"التنزيل\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"تابعونا على\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"دليل الآباء\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/ar/\",\"footer_li_tos_label\":\"شروط الخدمة\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/ar/\",\"footer_li_pp_label\":\"سياسة الخصوصية\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/ar/\",\"footer_li_safp_label\":\"اللعب الآمن والنزيه\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/ar/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"سياسة محتوى المشجعين\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/ar/\",\"footer_gen_dl_gam\":\"نزّل ألعابنا من\"}");

/***/ }),

/***/ "./src/locales/da.json":
/*!*****************************!*\
  !*** ./src/locales/da.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars-emblemmaskine\",\"meta_title\":\"Brawl Stars-emblemmaskine\",\"meta_description\":\"Lav dit eget tilpassede Brawl Stars-emblem\",\"gen_error\":\"Noget gik galt. Luk dette vindue, og prøv igen.\",\"gen_tooltip\":\"Du kan nu bruge emblemer som dit Supercell-profilbillede!\",\"gen_hidden\":\"SKJULT\",\"cat_head\":\"Hoved\",\"cat_eyes\":\"Øjne\",\"cat_mouth\":\"Mund\",\"cat_hair\":\"Hår\",\"cat_effect\":\"Effekt\",\"cat_hands\":\"Hænder\",\"cat_accessories\":\"Tilbehør\",\"cat_eyebrows\":\"Øjenbryn\",\"cat_beard\":\"Skæg\",\"cat_skin_accessories\":\"Hudtilbehør\",\"cat_earrings\":\"Øreringe\",\"cat_ears\":\"Ører\",\"cat_background\":\"Baggrund\",\"login_title\":\"Log ind for at gemme dette emblem som dit Supercell-profilbillede\",\"login_cta\":\"Log ind med Supercell\",\"login_cta_short\":\"Log ind med\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Log ud\",\"switch_accounts\":\"Skift konto\",\"logged_in_as\":\"Logget ind som\",\"login_with_supercell\":\"Log ind med Supercell\",\"save_pin_title\":\"Gemme dette emblem som dit Supercell-profilbillede\",\"save_pin_cta\":\"Gem emblem nu\",\"save_cooldown_info\":\"Du kan gemme et nyt emblem om dagen\",\"save_pin_progress\":\"Gemmer ...\",\"save_success\":\"Emblem gemt som dit Supercell-profilbillede\",\"save_success_new\":\"Avatar gemt\",\"save_error\":\"Der opstod et problem, da profilbilledet blev gemt.\",\"save_disclaimer\":\"Det kan tage et par minutter, før du kan se det i spillet.\",\"save_success_cta\":\"Okay\",\"save_error_cta_retry\":\"Prøv igen\",\"save_error_cta_back\":\"Tilbage til editor\",\"save_error_ddos\":\"Du kan ændre profilbilledet tre gange om ugen. Prøv igen om\",\"save_error_days\":\"dage\",\"save_error_day\":\"dag\",\"save_error_ddos_hours\":\"Du kan gemme et nyt emblem om\",\"save_error_hours\":\"timer\",\"save_error_hour\":\"time\",\"download_title\":\"Ser godt ud!\",\"download_description\":\"Download og del dit seje emblem!\",\"download_cta\":\"Download\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business-ID 2336509-6\",\"gen_fol\":\"Følg os på\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Forældrevejledning\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"Servicebetingelser\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Fortrolighedspolitik\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Regler om retfærdighed og sikkerhed\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Regler for fan-indhold\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"Download vores spil fra\"}");

/***/ }),

/***/ "./src/locales/de.json":
/*!*****************************!*\
  !*** ./src/locales/de.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl-Stars-Pinmaker\",\"meta_title\":\"Brawl-Stars-Pinmaker\",\"meta_description\":\"Gestalte deinen eigenen Brawl-Stars-Pin\",\"gen_error\":\"Etwas ist schiefgelaufen. Bitte schließe dieses Fenster und versuche es erneut.\",\"gen_tooltip\":\"Du kannst nun Pins als dein Supercell-Profilbild verwenden!\",\"gen_hidden\":\"VERBORGEN\",\"cat_head\":\"Kopf\",\"cat_eyes\":\"Augen\",\"cat_mouth\":\"Mund\",\"cat_hair\":\"Haare\",\"cat_effect\":\"Effekt\",\"cat_hands\":\"Hände\",\"cat_accessories\":\"Accessoires\",\"cat_eyebrows\":\"Augenbrauen\",\"cat_beard\":\"Bart\",\"cat_skin_accessories\":\"Gesicht\",\"cat_earrings\":\"Ohrringe\",\"cat_ears\":\"Ohren\",\"cat_background\":\"Hintergrund\",\"login_title\":\"Melde dich an, um diesen Pin als Supercell-Profilbild zu speichern.\",\"login_cta\":\"Mit Supercell ID anmelden\",\"login_cta_short\":\"Anmelden mit\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Abmelden\",\"switch_accounts\":\"Konto wechseln\",\"logged_in_as\":\"Angemeldet als\",\"login_with_supercell\":\"Mit Supercell ID\",\"save_pin_title\":\"Speichere diesen Pin als Supercell-Profilbild\",\"save_pin_cta\":\"Pin jetzt speichern\",\"save_cooldown_info\":\"Du kannst einmal am Tag einen neuen Pin speichern.\",\"save_pin_progress\":\"Wird gespeichert ...\",\"save_success\":\"Der Pin wurde als dein Supercell-Profilbild gespeichert.\",\"save_success_new\":\"Avatar gespeichert\",\"save_error\":\"Beim Speichern deines Profilbilds gab es ein Problem.\",\"save_disclaimer\":\"Es kann einige Minuten dauern, bevor du ihn im Spiel siehst.\",\"save_success_cta\":\"Okay\",\"save_error_cta_retry\":\"Erneut versuchen\",\"save_error_cta_back\":\"Zurück zum Editor\",\"save_error_ddos\":\"Du kannst dein Supercell-Profilbild dreimal pro Woche ändern. Versuche es erneut in:\",\"save_error_days\":\"Tagen\",\"save_error_day\":\"Tag\",\"save_error_ddos_hours\":\"Speichern eines neuen Pins möglich in\",\"save_error_hours\":\"Stunden\",\"save_error_hour\":\"Stunde\",\"download_title\":\"Sieht toll aus!\",\"download_description\":\"Lade deinen coolen Pin herunter und teile ihn mit anderen!\",\"download_cta\":\"Herunterladen\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finnland\",\"gen_add5\":\"Unternehmens-ID 2336509-6\",\"gen_fol\":\"Folge uns auf\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Leitfaden für Eltern\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/de\",\"footer_li_tos_label\":\"Nutzungsbedingungen\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/de\",\"footer_li_pp_label\":\"Datenschutzrichtlinien\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/de\",\"footer_li_safp_label\":\"Sicheres und faires Spiel\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/de/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Richtlinien für Fan-Content\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/de\",\"footer_gen_dl_gam\":\"Hier kannst du unsere Spiele herunterladen:\"}");

/***/ }),

/***/ "./src/locales/en.json":
/*!*****************************!*\
  !*** ./src/locales/en.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars Pin Maker\",\"meta_title\":\"Brawl Stars Pin Maker\",\"meta_description\":\"Create your own custom Brawl Stars pin\",\"gen_error\":\"Something went wrong! Please close this window and try again!\",\"gen_tooltip\":\"You can now use pins as your Supercell profile picture!\",\"gen_hidden\":\"HIDDEN\",\"cat_head\":\"Head\",\"cat_eyes\":\"Eyes\",\"cat_mouth\":\"Mouth\",\"cat_hair\":\"Hair\",\"cat_effect\":\"Effect\",\"cat_hands\":\"Hands\",\"cat_accessories\":\"Accessories\",\"cat_eyebrows\":\"Eyebrows\",\"cat_beard\":\"Beard\",\"cat_skin_accessories\":\"Skin accessories\",\"cat_earrings\":\"Earrings\",\"cat_ears\":\"Ears\",\"cat_background\":\"Background\",\"login_title\":\"Log in to save this pin as your Supercell avatar\",\"login_cta\":\"Log in with Supercell ID\",\"login_cta_short\":\"Log in with\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Log Out\",\"switch_accounts\":\"Switch Accounts\",\"logged_in_as\":\"Logged in as\",\"login_with_supercell\":\"Log in with Supercell\",\"save_pin_title\":\"Save this pin as your Supercell avatar\",\"save_pin_cta\":\"Save pin now\",\"save_cooldown_info\":\"You can save a new Pin once per day\",\"save_pin_progress\":\"Saving...\",\"save_success\":\"Pin has been saved as your Supercell avatar!\",\"save_success_new\":\"Avatar saved\",\"save_error\":\"There was a problem when saving the Avatar.\",\"save_disclaimer\":\"It may take a few minutes before you see it in game.\",\"save_success_cta\":\"Okay\",\"save_error_cta_retry\":\"Try again!\",\"save_error_cta_back\":\"Back to editor!\",\"save_error_ddos\":\"You can change Supercell avatar three times per week. Try again in\",\"save_error_days\":\"days\",\"save_error_day\":\"day\",\"save_error_ddos_hours\":\"You can save a new Pin in\",\"save_error_hours\":\"hours\",\"save_error_hour\":\"hour\",\"download_title\":\"Looks great!\",\"download_description\":\"Download and share your kick ass pin!\",\"download_cta\":\"Download\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Follow us on\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Parent's Guide\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"Terms of Service\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Privacy Policy\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Safe and Fair Play\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Fan Content Policy\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"Download our games from\"}");

/***/ }),

/***/ "./src/locales/es.json":
/*!*****************************!*\
  !*** ./src/locales/es.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Creador de reacciones de Brawl Stars\",\"meta_title\":\"Creador de reacciones de Brawl Stars\",\"meta_description\":\"Crea tus propias reacciones personalizadas\",\"gen_error\":\"Algo ha salido mal. Cierra esta ventana e inténtalo de nuevo.\",\"gen_tooltip\":\"¡Ahora puedes usar reacciones como tu foto de perfil de Supercell!\",\"gen_hidden\":\"INVISIBLE\",\"cat_head\":\"Cabeza\",\"cat_eyes\":\"Ojos\",\"cat_mouth\":\"Boca\",\"cat_hair\":\"Pelo\",\"cat_effect\":\"Icono\",\"cat_hands\":\"Manos\",\"cat_accessories\":\"Accesorios\",\"cat_eyebrows\":\"Cejas\",\"cat_beard\":\"Barba\",\"cat_skin_accessories\":\"Marcas cara\",\"cat_earrings\":\"Pendientes\",\"cat_ears\":\"Orejas\",\"cat_background\":\"Fondo\",\"login_title\":\"Inicia sesión para guardar esta reacción como tu foto de perfil de Supercell\",\"login_cta\":\"Iniciar sesión con Supercell\",\"login_cta_short\":\"Iniciar sesión con\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Cerrar sesión\",\"switch_accounts\":\"Cambiar de cuenta\",\"logged_in_as\":\"Sesión iniciada con\",\"login_with_supercell\":\"Iniciar sesión con Supercell\",\"save_pin_title\":\"Guardar esta reacción como tu foto de perfil de Supercell\",\"save_pin_cta\":\"Guardar reacción\",\"save_cooldown_info\":\"Puedes guardar una reacción nueva una vez al día.\",\"save_pin_progress\":\"Guardando...\",\"save_success\":\"La reacción se ha guardado como tu foto de perfil de Supercell.\",\"save_success_new\":\"Avatar guardado\",\"save_error\":\"Se ha producido un problema al guardar la foto de perfil.\",\"save_disclaimer\":\"Quizá tarde unos minutos en aparecer en el juego.\",\"save_success_cta\":\"Vale\",\"save_error_cta_retry\":\"Probar otra vez\",\"save_error_cta_back\":\"Volver al editor\",\"save_error_ddos\":\"Puedes cambiar la foto de perfil de Supercell tres veces a la semana. Inténtalo de nuevo dentro de\",\"save_error_days\":\"días\",\"save_error_day\":\"día\",\"save_error_ddos_hours\":\"Puedes guardar una reacción nueva dentro de\",\"save_error_hours\":\"horas\",\"save_error_hour\":\"hora\",\"download_title\":\"¡Está genial!\",\"download_description\":\"¡Descarga y comparte tu increíble reacción!\",\"download_cta\":\"Descargar\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180, Helsinki\",\"gen_add4\":\"Finlandia\",\"gen_add5\":\"Identificador de empresa: 2336509-6\",\"gen_fol\":\"Síguenos en\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/BrawlStarsEs\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Guía para padres\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/es/\",\"footer_li_tos_label\":\"Condiciones del servicio\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/es/\",\"footer_li_pp_label\":\"Política de privacidad\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/es/\",\"footer_li_safp_label\":\"Juego limpio y seguro\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/es/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Política de contenidos de fans\",\"footer_li_fcp_url\":\"http://supercell.com/en/fan-content-policy/es/\",\"footer_gen_dl_gam\":\"Descarga nuestros juegos en\"}");

/***/ }),

/***/ "./src/locales/fa.json":
/*!*****************************!*\
  !*** ./src/locales/fa.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"چهرک‌ساز Brawl Stars\",\"meta_title\":\"چهرک‌ساز Brawl Stars\",\"meta_description\":\"چهرک (پین) سفارشی Brawl Stars خود را ایجاد کنید\",\"gen_error\":\"مشکلی به‌وجود آمد. لطفاً این پنجره را ببندید و دوباره امتحان کنید.\",\"gen_tooltip\":\"اکنون می‌توانید از چهرک‌ها به‌عنوان تصویر نمایه Supercell خود استفاده کنید!\",\"gen_hidden\":\"پنهان‌شده\",\"cat_head\":\"سر\",\"cat_eyes\":\"چشم‌ها\",\"cat_mouth\":\"دهان\",\"cat_hair\":\"مو\",\"cat_effect\":\"اثر\",\"cat_hands\":\"دست‌ها\",\"cat_accessories\":\"لوازم جانبی\",\"cat_eyebrows\":\"ابروها\",\"cat_beard\":\"ریش\",\"cat_skin_accessories\":\"لوازم جانبی جلد\",\"cat_earrings\":\"گوشواره\",\"cat_ears\":\"گوش‌ها\",\"cat_background\":\"پس‌زمینه\",\"login_title\":\"برای ذخیره این چهرک به‌عنوان تصویر نمایه Supercell خود، وارد سیستم شوید\",\"login_cta\":\"ورود به سیستم با Supercell\",\"login_cta_short\":\"وارد شدن با\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"خروج از سیستم\",\"switch_accounts\":\"جابه‌جایی بین حساب‌ها\",\"logged_in_as\":\"با این نام وارد شده‌اید\",\"login_with_supercell\":\"ورود به سیستم با Supercell\",\"save_pin_title\":\"این چهرک را به‌عنوان تصویر نمایه Supercell خود ذخیره کنید\",\"save_pin_cta\":\"ذخیره چهرک همین‌حالا\",\"save_cooldown_info\":\"یک بار در روز می‌توانید برچسب جدیدی ذخیره کنید\",\"save_pin_progress\":\"درحال ذخیره‌سازی...\",\"save_success\":\"چهرک به‌عنوان تصویر نمایه Supercell شما ذخیره شده است\",\"save_success_new\":\"آواتار ذخیره شد\",\"save_error\":\"هنگام ذخیره‌سازی تصویر نمایه، مشکلی روی داد.\",\"save_disclaimer\":\"ممکن است نمایش آن در بازی چند دقیقه طول بکشد.\",\"save_success_cta\":\"تأیید\",\"save_error_cta_retry\":\"دوباره تلاش کنید\",\"save_error_cta_back\":\"بازگشت به ویرایشگر\",\"save_error_ddos\":\"می‌توانید تصویر نمایه Supercell خود را سه بار در هفته تغییر دهید. ظرف این مدت دوباره تلاش کنید\",\"save_error_days\":\"روز\",\"save_error_day\":\"روز\",\"save_error_ddos_hours\":\"پس از گذشت این مدت، می‌توانید برچسب جدیدی ذخیره کنید:\",\"save_error_hours\":\"ساعت\",\"save_error_hour\":\"ساعت\",\"download_title\":\"عالی است!\",\"download_description\":\"چهرک محشر خود را دانلود و اشتراک‌گذاری کنید!\",\"download_cta\":\"دانلود\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"شناسه کسب‌وکار 2336509-6\",\"gen_fol\":\"ما را دنبال کنید در\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"راهنمای والدین\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/fa/\",\"footer_li_tos_label\":\"شرایط استفاده از خدمات\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"خط‌مشی حریم خصوصی\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"خط‌مشی بازی سالم و عادلانه\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/fa/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"قوانین مربوط به محتوا برای طرفداران\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"دانلود بازی‌های ما از\"}");

/***/ }),

/***/ "./src/locales/fi.json":
/*!*****************************!*\
  !*** ./src/locales/fi.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars Pin Maker\",\"meta_title\":\"Brawl Stars Pin Maker\",\"meta_description\":\"Luo oma Brawl Stars -pinnisi\",\"gen_error\":\"Jokin meni pieleen. Sulje tämä ikkuna ja yritä uudelleen.\",\"gen_tooltip\":\"Nyt voit käyttää merkkejä Supercell-profiilikuvanasi!\",\"gen_hidden\":\"PIILOTETTU\",\"cat_head\":\"Pää\",\"cat_eyes\":\"Silmät\",\"cat_mouth\":\"Suu\",\"cat_hair\":\"Hiukset\",\"cat_effect\":\"Efekti\",\"cat_hands\":\"Kädet\",\"cat_accessories\":\"Asusteet\",\"cat_eyebrows\":\"Kulmakarvat\",\"cat_beard\":\"Parta\",\"cat_skin_accessories\":\"Iho\",\"cat_earrings\":\"Korvakorut\",\"cat_ears\":\"Korvat\",\"cat_background\":\"Tausta\",\"login_title\":\"Kirjaudu sisään, niin voit tallentaa tämän pinnin Supercell-profiilikuvaksesi.\",\"login_cta\":\"Kirjaudu Supercell ID:llä\",\"login_cta_short\":\"Kirjaudu sisään\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID:llä\",\"logout_cta\":\"Kirjaudu ulos\",\"switch_accounts\":\"Vaihda tiliä\",\"logged_in_as\":\"Kirjautuneena:\",\"login_with_supercell\":\"Kirjaudu Supercell\",\"save_pin_title\":\"Tallenna tämä pinni Supercell-profiilikuvaksesi.\",\"save_pin_cta\":\"Tallenna pinni\",\"save_cooldown_info\":\"Voit tallentaa uuden pinnin kerran päivässä.\",\"save_pin_progress\":\"Tallennetaan...\",\"save_success\":\"Pinni on tallennettu Supercell-profiilikuvaksesi.\",\"save_success_new\":\"Profiilikuva tallennettu.\",\"save_error\":\"Profiilikuvasi tallennuksessa oli ongelma.\",\"save_disclaimer\":\"Saattaa kulua muutama minuutti, ennen kuin näet profiilikuvasi pelissä.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Yritä uudelleen\",\"save_error_cta_back\":\"Palaa editoriin\",\"save_error_ddos\":\"Voit vaihtaa Supercell-profiilikuvasi kolmesti viikossa. Yritä uudelleen\",\"save_error_days\":\"päivän kuluttua\",\"save_error_day\":\"päivän kuluttua\",\"save_error_ddos_hours\":\"Voit tallentaa uuden pinnin\",\"save_error_hours\":\"tunnin kuluttua\",\"save_error_hour\":\"tunnin kuluttua\",\"download_title\":\"Hienoa!\",\"download_description\":\"Lataa ja jaa hieno pinnisi\",\"download_cta\":\"Lataa\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Suomi\",\"gen_add5\":\"Y-tunnus 2336509-6\",\"gen_fol\":\"Seuraa meitä\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Vanhempien opas\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/fi/\",\"footer_li_tos_label\":\"Käyttöehdot\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/fi/\",\"footer_li_pp_label\":\"Yksityisyyskäytäntö\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/fi/\",\"footer_li_safp_label\":\"Turvallinen ja reilu peli\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/fi/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Fanisisällön käytäntö\",\"footer_li_fcp_url\":\"http://supercell.com/en/fan-content-policy/fi/\",\"footer_gen_dl_gam\":\"Lataa pelimme:\"}");

/***/ }),

/***/ "./src/locales/fr.json":
/*!*****************************!*\
  !*** ./src/locales/fr.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Créateur d'émotes Brawl Stars\",\"meta_title\":\"Créateur d'émotes Brawl Stars\",\"meta_description\":\"Créez votre propre émote Brawl Stars\",\"gen_error\":\"Une erreur s'est produite. Veuillez fermer la fenêtre et réessayer.\",\"gen_tooltip\":\"Utilisez vos émotes en photo de profil Supercell !\",\"gen_hidden\":\"MASQUÉ\",\"cat_head\":\"Tête\",\"cat_eyes\":\"Yeux\",\"cat_mouth\":\"Bouche\",\"cat_hair\":\"Cheveux\",\"cat_effect\":\"Effet\",\"cat_hands\":\"Mains\",\"cat_accessories\":\"Accessoires\",\"cat_eyebrows\":\"Sourcils\",\"cat_beard\":\"Barbe\",\"cat_skin_accessories\":\"Accessoires faciaux\",\"cat_earrings\":\"Boucles d'oreille\",\"cat_ears\":\"Oreilles\",\"cat_background\":\"Arrière-plan\",\"login_title\":\"Connectez-vous pour utiliser cette émote en photo de profil Supercell\",\"login_cta\":\"Connexion à Supercell\",\"login_cta_short\":\"Se connecter avec\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Déconnexion\",\"switch_accounts\":\"Changement de compte\",\"logged_in_as\":\"Connecté en tant que\",\"login_with_supercell\":\"Connexion à Supercell\",\"save_pin_title\":\"Utilisez cette émote en photo de profil Supercell\",\"save_pin_cta\":\"Sauvegarder l'émote\",\"save_cooldown_info\":\"Vous pouvez sauvegarder une nouvelle émote par jour.\",\"save_pin_progress\":\"Sauvegarde...\",\"save_success\":\"L'émote est désormais votre photo de profil Supercell.\",\"save_success_new\":\"Avatar sauvegardé\",\"save_error\":\"Une erreur s'est produite pendant la sauvegarde de la photo de profil.\",\"save_disclaimer\":\"Cela peut prendre jusqu'à quelques minutes avant de voir le changement en jeu.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Réessayer\",\"save_error_cta_back\":\"Retour à l'éditeur\",\"save_error_ddos\":\"Vous pouvez modifier votre photo de profil Supercell trois fois par semaine. Veuillez réessayer dans\",\"save_error_days\":\"jours\",\"save_error_day\":\"jour\",\"save_error_ddos_hours\":\"Vous pourrez sauvegarder une nouvelle émote dans\",\"save_error_hours\":\"heures\",\"save_error_hour\":\"heure\",\"download_title\":\"Un vrai chef-d'œuvre !\",\"download_description\":\"Téléchargez et partagez votre super émote !\",\"download_cta\":\"Télécharger\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finlande\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Suivez-nous sur\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Guide des parents\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/fr/\",\"footer_li_tos_label\":\"Conditions d'utilisation\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/fr/\",\"footer_li_pp_label\":\"Politique de confidentialité\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/fr/\",\"footer_li_safp_label\":\"Sécurité et équité du jeu\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/fr/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Règlement sur les contenus de fan\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/fr/\",\"footer_gen_dl_gam\":\"Téléchargez nos jeux via\"}");

/***/ }),

/***/ "./src/locales/he.json":
/*!*****************************!*\
  !*** ./src/locales/he.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"יצרן סיכות Brawl Stars\",\"meta_title\":\"יצרן סיכות Brawl Stars\",\"meta_description\":\"צרו סיכת Brawl Stars משלכם\",\"gen_error\":\"משהו השתבש. יש לסגור חלון זה ולנסות שוב.\",\"gen_tooltip\":\"מעכשיו אפשר להשתמש בסיכות בתור תמונת פרופיל ב-Supercell!\",\"gen_hidden\":\"נסתר\",\"cat_head\":\"ראש\",\"cat_eyes\":\"עיניים\",\"cat_mouth\":\"פה\",\"cat_hair\":\"שיער\",\"cat_effect\":\"אפקט\",\"cat_hands\":\"ידיים\",\"cat_accessories\":\"אביזרים\",\"cat_eyebrows\":\"גבות\",\"cat_beard\":\"זקן\",\"cat_skin_accessories\":\"אביזרי סקין\",\"cat_earrings\":\"עגילים\",\"cat_ears\":\"אוזניים\",\"cat_background\":\"רקע\",\"login_title\":\"יש להתחבר כדי לשמור את הסיכה בתור תמונת פרופיל ב-Supercell\",\"login_cta\":\"התחברות עם Supercell\",\"login_cta_short\":\"התחברות עם\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"התנתקות\",\"switch_accounts\":\"החלפת חשבונות\",\"logged_in_as\":\"חיבור כ-\",\"login_with_supercell\":\"התחברות עם Supercell\",\"save_pin_title\":\"אפשר לשמור את הסיכה בתור תמונת פרופיל ב-Supercell\",\"save_pin_cta\":\"שמירה על הסיכה עכשיו\",\"save_cooldown_info\":\"אפשר לשמור סיכה חדשה פעם ביום\",\"save_pin_progress\":\"מבצע שמירה…\",\"save_success\":\"הסיכה נשמרה בתור תמונת הפרופיל שלך\",\"save_success_new\":\"האווטר נשמר\",\"save_error\":\"צצה בעיה בעת השמירה של תמונת הפרופיל.\",\"save_disclaimer\":\"ייתכן שיעברו כמה דקות עד שאפשר יהיה לראות זאת שוב.\",\"save_success_cta\":\"אישור\",\"save_error_cta_retry\":\"ניסיון נוסף\",\"save_error_cta_back\":\"חזרה לעריכה\",\"save_error_ddos\":\"אפשר לשנות את תמונת הפרופיל ב-Supercell שלוש פעמים בשבוע. ניתן לנסות שוב בעוד\",\"save_error_days\":\"ימים\",\"save_error_day\":\"יום\",\"save_error_ddos_hours\":\"באפשרותך לשמור סיכה חדשה תוך\",\"save_error_hours\":\"שעות\",\"save_error_hour\":\"שעה\",\"download_title\":\"נראה נהדר!\",\"download_description\":\"זה הזמן להוריד ולשתף את הסיכה המגניבה שלך!\",\"download_cta\":\"הורדה\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"פינלנד\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"מוזמנים לעקוב אחרינו:\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"מדריך להורים\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"תנאי השירות\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"מדיניות הפרטיות\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"משחק הוגן ובטוח\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"מדיניות לגבי תוכן מעריצים\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"זה הזמן להוריד את המשחקים שלנו מאתר\"}");

/***/ }),

/***/ "./src/locales/id.json":
/*!*****************************!*\
  !*** ./src/locales/id.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Kreator Pin Brawl Stars\",\"meta_title\":\"Kreator Pin Brawl Stars\",\"meta_description\":\"Buat Pin Brawl Stars sendiri!\",\"gen_error\":\"Terjadi kesalahan. Silakan tutup jendela ini dan coba lagi.\",\"gen_tooltip\":\"Pin kini bisa digunakan sebagai foto profil Supercell!\",\"gen_hidden\":\"TERSEMBUNYI\",\"cat_head\":\"Kepala\",\"cat_eyes\":\"Mata\",\"cat_mouth\":\"Mulut\",\"cat_hair\":\"Rambut\",\"cat_effect\":\"Efek\",\"cat_hands\":\"Tangan\",\"cat_accessories\":\"Aksesori\",\"cat_eyebrows\":\"Alis\",\"cat_beard\":\"Jenggot\",\"cat_skin_accessories\":\"Aksen Wajah\",\"cat_earrings\":\"Anting\",\"cat_ears\":\"Telinga\",\"cat_background\":\"Latar\",\"login_title\":\"Masuk untuk menyimpan Pin ini sebagai foto profil Supercell.\",\"login_cta\":\"Masuk dengan Supercell\",\"login_cta_short\":\"Masuk dengan\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Keluar\",\"switch_accounts\":\"Beralih Akun\",\"logged_in_as\":\"Masuk sebagai\",\"login_with_supercell\":\"Masuk dengan Supercell\",\"save_pin_title\":\"Simpan Pin ini sebagai foto profil Supercell.\",\"save_pin_cta\":\"Simpan Pin\",\"save_cooldown_info\":\"Kamu dapat menyimpan satu Pin baru setiap hari\",\"save_pin_progress\":\"Menyimpan ...\",\"save_success\":\"Pin telah disimpan sebagai foto profil Supercell.\",\"save_success_new\":\"Avatar disimpan\",\"save_error\":\"Terjadi kesalahan saat menyimpan foto profil.\",\"save_disclaimer\":\"Mungkin diperlukan beberapa menit sebelum avatar muncul di game.\",\"save_success_cta\":\"Oke\",\"save_error_cta_retry\":\"Coba lagi\",\"save_error_cta_back\":\"Kembali ke editor\",\"save_error_ddos\":\"Foto profil Supercell hanya dapat diganti maksimum tiga kali per minggu. Coba lagi dalam\",\"save_error_days\":\"hari\",\"save_error_day\":\"hari\",\"save_error_ddos_hours\":\"Kamu dapat menyimpan Pin baru dalam\",\"save_error_hours\":\"jam\",\"save_error_hour\":\"jam\",\"download_title\":\"Bagus!\",\"download_description\":\"Unduh dan bagikan Pin keren milikmu!\",\"download_cta\":\"Unduh\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finlandia\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Ikuti kami di\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Panduan Orang Tua\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/id/\",\"footer_li_tos_label\":\"Ketentuan Layanan\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Kebijakan Privasi\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Main Aman dan Bersih\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/id/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Kebijakan Konten Penggemar\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/id/\",\"footer_gen_dl_gam\":\"Unduh game dari\"}");

/***/ }),

/***/ "./src/locales/it.json":
/*!*****************************!*\
  !*** ./src/locales/it.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Creatore di reazioni di Brawl Stars\",\"meta_title\":\"Creatore di reazioni di Brawl Stars\",\"meta_description\":\"Crea la tua reazione di Brawl Stars personalizzata.\",\"gen_error\":\"Qualcosa è andato storto. Chiudi la finestra e riprova.\",\"gen_tooltip\":\"Puoi usare una reazione come immagine del tuo profilo di Supercell!\",\"gen_hidden\":\"ASSENTE/I\",\"cat_head\":\"Testa\",\"cat_eyes\":\"Occhi\",\"cat_mouth\":\"Bocca\",\"cat_hair\":\"Capelli\",\"cat_effect\":\"Effetti\",\"cat_hands\":\"Mani\",\"cat_accessories\":\"Accessori\",\"cat_eyebrows\":\"Sopracciglia\",\"cat_beard\":\"Barba\",\"cat_skin_accessories\":\"Dettagli viso\",\"cat_earrings\":\"Orecchini\",\"cat_ears\":\"Orecchie\",\"cat_background\":\"Sfondo\",\"login_title\":\"Accedi per usare questa reazione come immagine del tuo profilo di Supercell.\",\"login_cta\":\"Accedi con Supercell\",\"login_cta_short\":\"Accedi con\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Esci\",\"switch_accounts\":\"Cambia account\",\"logged_in_as\":\"Connesso come:\",\"login_with_supercell\":\"Accedi con Supercell\",\"save_pin_title\":\"Usa questa reazione come immagine del tuo profilo di Supercell.\",\"save_pin_cta\":\"Salva reazione\",\"save_cooldown_info\":\"Puoi salvare una nuova reazione una volta al giorno.\",\"save_pin_progress\":\"Salvataggio...\",\"save_success\":\"La reazione è ora l'immagine del tuo profilo di Supercell.\",\"save_success_new\":\"Avatar salvato\",\"save_error\":\"Si è verificato un problema durante il salvataggio dell'immagine del profilo.\",\"save_disclaimer\":\"Potrebbero volerci alcuni minuti prima di vederlo in gioco.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Riprova\",\"save_error_cta_back\":\"Torna all'editor\",\"save_error_ddos\":\"Non puoi cambiare l'immagine del profilo di Supercell più di tre volte a settimana. Riprova tra\",\"save_error_days\":\"giorni\",\"save_error_day\":\"giorno\",\"save_error_ddos_hours\":\"Puoi salvare una nuova reazione tra\",\"save_error_hours\":\"ore\",\"save_error_hour\":\"ora\",\"download_title\":\"Mica male!\",\"download_description\":\"Scarica e condividi il tuo capolavoro!\",\"download_cta\":\"Scarica\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finlandia\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Seguici su:\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Guida per i genitori\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/it/\",\"footer_li_tos_label\":\"Condizioni d'Uso\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/it/\",\"footer_li_pp_label\":\"Normativa sulla privacy\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/it/\",\"footer_li_safp_label\":\"Sicurezza e correttezza del gioco\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/it/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Politica sui contenuti dei fan\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/it/\",\"footer_gen_dl_gam\":\"Scarica i nostri giochi da\"}");

/***/ }),

/***/ "./src/locales/jp.json":
/*!*****************************!*\
  !*** ./src/locales/jp.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"ブロスタ ピンズメーカー\",\"meta_title\":\"ブロスタ ピンズメーカー\",\"meta_description\":\"ブロスタのオリジナルピンズを作りましょう\",\"gen_error\":\"何らかの問題が発生しました。このウィンドウを閉じて再度お試しください。\",\"gen_tooltip\":\"ピンズがSupercellのプロフィール画像として使えるようになりました！\",\"gen_hidden\":\"非表示\",\"cat_head\":\"輪郭\",\"cat_eyes\":\"目\",\"cat_mouth\":\"口\",\"cat_hair\":\"髪型\",\"cat_effect\":\"エフェクト\",\"cat_hands\":\"手\",\"cat_accessories\":\"アクセサリー\",\"cat_eyebrows\":\"まゆ毛\",\"cat_beard\":\"ヒゲ\",\"cat_skin_accessories\":\"肌の装飾\",\"cat_earrings\":\"イヤリング\",\"cat_ears\":\"耳\",\"cat_background\":\"背景\",\"login_title\":\"ピンズをSupercellのプロフィール画像として保存するには、ログインしてください\",\"login_cta\":\"Supercell IDで\",\"login_cta_short\":\"次のアカウントでログイン：\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"ログアウト\",\"switch_accounts\":\"アカウントの切り替え\",\"logged_in_as\":\"ログイン中のユーザー：\",\"login_with_supercell\":\"Supercell IDで\",\"save_pin_title\":\"このピンズをSupercellのプロフィール画像として保存\",\"save_pin_cta\":\"ピンズを保存\",\"save_cooldown_info\":\"新しいピンズの保存は1日1個までです\",\"save_pin_progress\":\"保存中...\",\"save_success\":\"Supercellのプロフィール画像としてピンズを保存しました\",\"save_success_new\":\"アバターを保存しました\",\"save_error\":\"プロフィール画像の保存中に問題が発生しました。\",\"save_disclaimer\":\"アバターがゲーム内に表示されるまで時間がかかる場合があります。\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"やり直す\",\"save_error_cta_back\":\"編集に戻る\",\"save_error_ddos\":\"Supercellのプロフィール画像は週に3回まで変更できます。次に変更できるようになるまで：\",\"save_error_days\":\"日\",\"save_error_day\":\"日\",\"save_error_ddos_hours\":\"新しいピンズが保存可能になるまで：\",\"save_error_hours\":\"時間\",\"save_error_hour\":\"時間\",\"download_title\":\"完成です！\",\"download_description\":\"オリジナルピンズをダウンロード＆シェアしましょう！\",\"download_cta\":\"ダウンロード\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"フォロー\",\"footer_li_youtube\":\"https://www.youtube.com/c/brawlstarsjapan\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars_jp/\",\"footer_li_twitter\":\"https://twitter.com/brawlstarsjp\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"保護者の皆さまへ\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/jp/\",\"footer_li_tos_label\":\"サービス利用規約\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/jp/\",\"footer_li_pp_label\":\"プライバシーポリシー\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/jp/\",\"footer_li_safp_label\":\"安全で公平なプレイのために\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/jp/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"ファンコンテンツポリシー\",\"footer_li_fcp_url\":\"http://supercell.com/en/fan-content-policy/jp/\",\"footer_gen_dl_gam\":\"ゲームのダウンロードはこちら\"}");

/***/ }),

/***/ "./src/locales/kr.json":
/*!*****************************!*\
  !*** ./src/locales/kr.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"브롤스타즈 핀 메이커\",\"meta_title\":\"브롤스타즈 핀 메이커\",\"meta_description\":\"나만의 브롤스타즈 핀을 만들어보세요.\",\"gen_error\":\"문제가 발생했습니다. 해당 창을 닫고 다시 시도해 보세요.\",\"gen_tooltip\":\"이제 핀을 Supercell 프로필 이미지로 사용할 수 있습니다!\",\"gen_hidden\":\"숨김\",\"cat_head\":\"머리\",\"cat_eyes\":\"눈\",\"cat_mouth\":\"입\",\"cat_hair\":\"헤어\",\"cat_effect\":\"이펙트\",\"cat_hands\":\"손\",\"cat_accessories\":\"액세서리\",\"cat_eyebrows\":\"눈썹\",\"cat_beard\":\"수염\",\"cat_skin_accessories\":\"피부 효과\",\"cat_earrings\":\"귀걸이\",\"cat_ears\":\"귀\",\"cat_background\":\"배경\",\"login_title\":\"이 핀을 Supercell 프로필 이미지로 저장하려면 로그인하세요.\",\"login_cta\":\"Supercell ID로 로그인\",\"login_cta_short\":\"다음 계정으로 로그인:\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"로그아웃\",\"switch_accounts\":\"계정 전환\",\"logged_in_as\":\"다음 계정으로 로그인 중\",\"login_with_supercell\":\"Supercell ID로 로그인\",\"save_pin_title\":\"이 핀을 Supercell 프로필 이미지로 저장\",\"save_pin_cta\":\"지금 핀 저장하기\",\"save_cooldown_info\":\"하루에 한 번 신규 핀을 저장할 수 있습니다.\",\"save_pin_progress\":\"저장 중...\",\"save_success\":\"핀이 Supercell 프로필 이미지로 저장되었습니다.\",\"save_success_new\":\"아바타 저장됨\",\"save_error\":\"프로필 이미지를 저장하는 데 문제가 발생했습니다.\",\"save_disclaimer\":\"게임에 표시되는 데 시간이 소요될 수 있습니다.\",\"save_success_cta\":\"확인\",\"save_error_cta_retry\":\"다시 시도\",\"save_error_cta_back\":\"편집기로 돌아가기\",\"save_error_ddos\":\"Supercell 프로필 이미지는 주 3회 변경할 수 있습니다. 다음에 다시 시도해 주세요.\",\"save_error_days\":\"일\",\"save_error_day\":\"일\",\"save_error_ddos_hours\":\"신규 핀 저장 대기 시간:\",\"save_error_hours\":\"시간\",\"save_error_hour\":\"시간\",\"download_title\":\"멋지네요!\",\"download_description\":\"다운로드해 멋진 핀을 공유하세요!\",\"download_cta\":\"다운로드\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"팔로우하기\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"보호자용 가이드\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/ko\",\"footer_li_tos_label\":\"이용 약관\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/ko\",\"footer_li_pp_label\":\"개인정보 처리방침\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/ko\",\"footer_li_safp_label\":\"안전하고 공정한 게임 이용\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/ko/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"팬 콘텐츠 정책\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"슈퍼셀 게임 다운로드:\"}");

/***/ }),

/***/ "./src/locales/ms.json":
/*!*****************************!*\
  !*** ./src/locales/ms.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Pembuat Pin Brawl Stars\",\"meta_title\":\"Pembuat Pin Brawl Stars\",\"meta_description\":\"Cipta pin Brawl Stars anda sendiri\",\"gen_error\":\"Ada sesuatu yang tidak kena. Sila tutup tetingkap ini dan cuba lagi.\",\"gen_tooltip\":\"Kini anda boleh menggunakan pin sebagai gambar profil Supercell anda!\",\"gen_hidden\":\"TERSEMBUNYI\",\"cat_head\":\"Kepala\",\"cat_eyes\":\"Mata\",\"cat_mouth\":\"Mulut\",\"cat_hair\":\"Rambut\",\"cat_effect\":\"Kesan\",\"cat_hands\":\"Tangan\",\"cat_accessories\":\"Aksesori\",\"cat_eyebrows\":\"Kening\",\"cat_beard\":\"Janggut\",\"cat_skin_accessories\":\"Tanda-tanda muka\",\"cat_earrings\":\"Subang\",\"cat_ears\":\"Telinga\",\"cat_background\":\"Latar\",\"login_title\":\"Log masuk untuk simpan pin ini sebagai gambar profil Supercell anda.\",\"login_cta\":\"Log masuk dengan Supercell\",\"login_cta_short\":\"Log masuk dengan\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Log keluar\",\"switch_accounts\":\"Tukar Akaun\",\"logged_in_as\":\"Log masuk sebagai\",\"login_with_supercell\":\"Log masuk dengan Supercell\",\"save_pin_title\":\"Simpan pin ini sebagai gambar profil Supercell anda.\",\"save_pin_cta\":\"Simpan pin\",\"save_cooldown_info\":\"Anda boleh simpan satu pin baharu sekali setiap hari\",\"save_pin_progress\":\"Menyimpan...\",\"save_success\":\"Pin telah disimpan sebagai gambar profil Supercell anda.\",\"save_success_new\":\"Avatar disimpan\",\"save_error\":\"Berlaku ralat ketika menyimpan gambar profil.\",\"save_disclaimer\":\"Ia mungkin mengambil beberapa minit untuk melihatnya dalam permainan.\",\"save_success_cta\":\"Okey\",\"save_error_cta_retry\":\"Cuba lagi\",\"save_error_cta_back\":\"Undur ke editor\",\"save_error_ddos\":\"Anda boleh menukar gambar profil Supercell tiga kali seminggu. Cuba lagi dalam\",\"save_error_days\":\"hari\",\"save_error_day\":\"hari\",\"save_error_ddos_hours\":\"Anda boleh simpan pin baharu dalam\",\"save_error_hours\":\"jam\",\"save_error_hour\":\"jam\",\"download_title\":\"Nampak hebat!\",\"download_description\":\"Muat turun dan kongsi pin ciptaan anda!\",\"download_cta\":\"Muat turun\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"ID Perniagaan 2336509-6\",\"gen_fol\":\"Ikuti kami di\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Panduan Ibu Bapa\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/ms/\",\"footer_li_tos_label\":\"Terma Perkhidmatan\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Dasar Privasi\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Bermain dengan Selamat dan Adil\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/ms/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Dasar Kandungan Peminat\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/ms/\",\"footer_gen_dl_gam\":\"Muat turun permainan kami dari\"}");

/***/ }),

/***/ "./src/locales/nl.json":
/*!*****************************!*\
  !*** ./src/locales/nl.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars-reactiemaker\",\"meta_title\":\"Brawl Stars-reactiemaker\",\"meta_description\":\"Maak je eigen Brawl Stars-reactie!\",\"gen_error\":\"Er is iets fout gegaan. Sluit dit venster en probeer het opnieuw.\",\"gen_tooltip\":\"Je kunt nu reacties gebruiken als je Supercell-profielafbeelding!\",\"gen_hidden\":\"VERBORGEN\",\"cat_head\":\"Hoofd\",\"cat_eyes\":\"Ogen\",\"cat_mouth\":\"Mond\",\"cat_hair\":\"Haar\",\"cat_effect\":\"Effect\",\"cat_hands\":\"Handen\",\"cat_accessories\":\"Accessoires\",\"cat_eyebrows\":\"Wenkbrauwen\",\"cat_beard\":\"Baard\",\"cat_skin_accessories\":\"Skinaccessoires\",\"cat_earrings\":\"Oorbellen\",\"cat_ears\":\"Oren\",\"cat_background\":\"Achtergrond\",\"login_title\":\"Log in om deze reactie als je Supercell-profielafbeelding op te slaan\",\"login_cta\":\"Aanmelden met Supercell\",\"login_cta_short\":\"Inloggen met\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Afmelden\",\"switch_accounts\":\"Van account wisselen\",\"logged_in_as\":\"Aangemeld als\",\"login_with_supercell\":\"Aanmelden met Supercell\",\"save_pin_title\":\"Sla deze reactie op als je Supercell-profielafbeelding\",\"save_pin_cta\":\"Reactie nu opslaan\",\"save_cooldown_info\":\"Je kunt één keer per dag een nieuwe reactie opslaan.\",\"save_pin_progress\":\"Aan het opslaan...\",\"save_success\":\"De reactie is opgeslagen als je Supercell-profielafbeelding.\",\"save_success_new\":\"Avatar opgeslagen\",\"save_error\":\"Er is iets fout gegaan bij het opslaan van de profielafbeelding.\",\"save_disclaimer\":\"Het kan een paar minuten duren voordat je de avatar in het spel ziet.\",\"save_success_cta\":\"Oké\",\"save_error_cta_retry\":\"Opnieuw proberen\",\"save_error_cta_back\":\"Terug naar editor\",\"save_error_ddos\":\"Je kunt je Supercell-profielafbeelding drie keer per week wijzigen. Probeer het opnieuw over\",\"save_error_days\":\"dagen\",\"save_error_day\":\"dag\",\"save_error_ddos_hours\":\"Je kunt een nieuwe reactie opslaan over\",\"save_error_hours\":\"uur\",\"save_error_hour\":\"uur\",\"download_title\":\"Ziet er goed uit!\",\"download_description\":\"Download en deel je geweldige zelfgemaakte reactie!\",\"download_cta\":\"Downloaden\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Bedrijfsregistratienummer 2336509-6\",\"gen_fol\":\"Volg ons op\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Richtlijnen voor ouders\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/nl/\",\"footer_li_tos_label\":\"Algemene voorwaarden\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/nl/\",\"footer_li_pp_label\":\"Privacybeleid\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Beleid voor een veilig en eerlijk spel\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/nl/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Beleid voor fancontent\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/nl/\",\"footer_gen_dl_gam\":\"Download onze spellen via\"}");

/***/ }),

/***/ "./src/locales/no.json":
/*!*****************************!*\
  !*** ./src/locales/no.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars‘ pinmaskin\",\"meta_title\":\"Brawl Stars‘ pinmaskin\",\"meta_description\":\"Lag din egen Brawl Stars-pin\",\"gen_error\":\"Noe gikk galt. Lukk vinduet og prøv på nytt.\",\"gen_tooltip\":\"Nå kan du bruke pins som bilde på Supercell-profilen din!\",\"gen_hidden\":\"SKJULT\",\"cat_head\":\"Hode\",\"cat_eyes\":\"Øyne\",\"cat_mouth\":\"Munn\",\"cat_hair\":\"Hår\",\"cat_effect\":\"Effekt\",\"cat_hands\":\"Hender\",\"cat_accessories\":\"Tilbehør\",\"cat_eyebrows\":\"Øyenbryn\",\"cat_beard\":\"Skjegg\",\"cat_skin_accessories\":\"Hudtilbehør\",\"cat_earrings\":\"Øreringer\",\"cat_ears\":\"Ører\",\"cat_background\":\"Bakgrunn\",\"login_title\":\"Logg på for å lagre pinsen som bilde på Supercell-profilen din\",\"login_cta\":\"Logg inn med Supercell\",\"login_cta_short\":\"Logg inn med\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Logg ut\",\"switch_accounts\":\"Bytt konto\",\"logged_in_as\":\"Pålogget som\",\"login_with_supercell\":\"Logg inn med Supercell\",\"save_pin_title\":\"Lagre pinsen som bilde på Supercell-profilen din\",\"save_pin_cta\":\"Lagre pin nå\",\"save_cooldown_info\":\"Du kan lagre én ny pin hver dag\",\"save_pin_progress\":\"Lagrer ...\",\"save_success\":\"Pinsen er blitt lagret som bilde på Supercell-profilen din\",\"save_success_new\":\"Avatar lagret\",\"save_error\":\"Det oppsto et problem under lagringen av profilbildet.\",\"save_disclaimer\":\"Det kan ta noen minutter før du ser den i spillet.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Prøv igjen\",\"save_error_cta_back\":\"Tilbake til redigeringen\",\"save_error_ddos\":\"Du kan endre bilde på Supercell-profilen din tre ganger i uken. Prøv igjen om\",\"save_error_days\":\"dager\",\"save_error_day\":\"dag\",\"save_error_ddos_hours\":\"Du kan lagre en ny pin om\",\"save_error_hours\":\"timer\",\"save_error_hour\":\"time\",\"download_title\":\"Ser flott ut!\",\"download_description\":\"Last ned og del den råtøffe pinen din!\",\"download_cta\":\"Last ned\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Følg oss på\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Veiledning for foreldre\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"Tjenestevilkår\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Retningslinjer for personvern\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Trygg og rettferdig spilling\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/no/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Retningslinjer for brukerinnhold\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"Last ned spillene våre fra\"}");

/***/ }),

/***/ "./src/locales/pl.json":
/*!*****************************!*\
  !*** ./src/locales/pl.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Kreator odznak Brawl Stars\",\"meta_title\":\"Kreator odznak Brawl Stars\",\"meta_description\":\"Stwórz własną odznakę Brawl Stars\",\"gen_error\":\"Coś poszło nie tak. Zamknij okno i spróbuj ponownie.\",\"gen_tooltip\":\"Możesz teraz używać odznak jako zdjęcia profilowego Supercell!\",\"gen_hidden\":\"UKRYTO\",\"cat_head\":\"Głowa\",\"cat_eyes\":\"Oczy\",\"cat_mouth\":\"Usta\",\"cat_hair\":\"Włosy\",\"cat_effect\":\"Efekt\",\"cat_hands\":\"Dłonie\",\"cat_accessories\":\"Akcesoria\",\"cat_eyebrows\":\"Brwi\",\"cat_beard\":\"Broda\",\"cat_skin_accessories\":\"Akcesoria do skóry\",\"cat_earrings\":\"Kolczyki\",\"cat_ears\":\"Uszy\",\"cat_background\":\"Tło\",\"login_title\":\"Zaloguj się, aby zapisać odznakę jako zdjęcie profilowe Supercell\",\"login_cta\":\"Zaloguj się za pomocą Supercell\",\"login_cta_short\":\"Zaloguj się przy pomocy\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Wyloguj\",\"switch_accounts\":\"Przełączanie między kontami\",\"logged_in_as\":\"Zalogowano jako\",\"login_with_supercell\":\"Zaloguj się za pomocą Supercell\",\"save_pin_title\":\"Zapisz tę odznakę jako zdjęcie profilowe Supercell\",\"save_pin_cta\":\"Zapisz odznakę teraz\",\"save_cooldown_info\":\"Nową odznakę możesz zapisać raz dziennie\",\"save_pin_progress\":\"Zapisywanie...\",\"save_success\":\"Odznaka została zapisana jako zdjęcie profilowe Supercell\",\"save_success_new\":\"Zapisano awatara\",\"save_error\":\"Podczas zapisywania zdjęcia profilowego wystąpił problem.\",\"save_disclaimer\":\"Może minął kilka minut, zanim awatar będzie widoczny w grze.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Spróbuj ponownie\",\"save_error_cta_back\":\"Wróć do edytora\",\"save_error_ddos\":\"Możesz zmienić zdjęcie profilowe Supercell trzy razy w tygodniu. Spróbuj ponownie za\",\"save_error_days\":\"dni\",\"save_error_day\":\"dzień\",\"save_error_ddos_hours\":\"Możesz zapisać nową odznakę za\",\"save_error_hours\":\"godz.\",\"save_error_hour\":\"godz.\",\"download_title\":\"Wygląda świetnie!\",\"download_description\":\"Pobierz i udostępnij swoją odlotową odznakę!\",\"download_cta\":\"Pobierz\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finlandia\",\"gen_add5\":\"Nr rejestracyjny firmy 2336509-6\",\"gen_fol\":\"Obserwuj nas na\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Przewodnik dla rodzica\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"Regulamin\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Polityka prywatności\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Bezpieczna i sprawiedliwa rozgrywka\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Polityka dotycząca fanowskiej twórczości\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"Pobierz nasze gry z\"}");

/***/ }),

/***/ "./src/locales/pt.json":
/*!*****************************!*\
  !*** ./src/locales/pt.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Criador de reações de Brawl Stars\",\"meta_title\":\"Criador de reações de Brawl Stars\",\"meta_description\":\"Crie sua própria reação de Brawl Stars!\",\"gen_error\":\"Algo deu errado. Feche esta janela e tente de novo.\",\"gen_tooltip\":\"Agora é possível usar reações como sua imagem de perfil da Supercell!\",\"gen_hidden\":\"OCULTO\",\"cat_head\":\"Cabeça\",\"cat_eyes\":\"Olhos\",\"cat_mouth\":\"Boca\",\"cat_hair\":\"Cabelo\",\"cat_effect\":\"Efeito\",\"cat_hands\":\"Mãos\",\"cat_accessories\":\"Acessórios\",\"cat_eyebrows\":\"Sobrancelhas\",\"cat_beard\":\"Barba\",\"cat_skin_accessories\":\"Personalização\",\"cat_earrings\":\"Brincos\",\"cat_ears\":\"Orelhas\",\"cat_background\":\"Plano de fundo\",\"login_title\":\"Faça login para salvar esta reação como sua imagem de perfil da Supercell.\",\"login_cta\":\"Iniciar sessão com Supercell\",\"login_cta_short\":\"Conecte-se com\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Sair\",\"switch_accounts\":\"Trocar de conta\",\"logged_in_as\":\"Conectou-se como\",\"login_with_supercell\":\"Iniciar sessão com Supercell\",\"save_pin_title\":\"Salve esta reação como sua imagem de perfil da Supercell.\",\"save_pin_cta\":\"Salvar reação\",\"save_cooldown_info\":\"É possível salvar uma nova reação por dia.\",\"save_pin_progress\":\"Salvando...\",\"save_success\":\"A reação foi salva como sua imagem de perfil da Supercell.\",\"save_success_new\":\"Avatar salvo\",\"save_error\":\"Algo deu errado ao salvar a imagem de perfil.\",\"save_disclaimer\":\"Pode levar alguns minutos até que ele apareça no jogo.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Tentar de novo\",\"save_error_cta_back\":\"Voltar ao editor\",\"save_error_ddos\":\"Você pode mudar a imagem de perfil da Supercell até 3 vezes em uma semana. Tente novamente em\",\"save_error_days\":\"dias\",\"save_error_day\":\"dia\",\"save_error_ddos_hours\":\"Você pode salvar uma nova reação em\",\"save_error_hours\":\"horas\",\"save_error_hour\":\"hora\",\"download_title\":\"Ficou ótimo!\",\"download_description\":\"Baixe e compartilhe sua reação irada!\",\"download_cta\":\"Baixar\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinque\",\"gen_add4\":\"Finlândia\",\"gen_add5\":\"Identificador comercial 2336509-6\",\"gen_fol\":\"Siga-nos no\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Guia para Pais\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/pt/\",\"footer_li_tos_label\":\"Termos de Uso\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/pt/\",\"footer_li_pp_label\":\"Política de Privacidade\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/pt/\",\"footer_li_safp_label\":\"Política de Jogo Limpo e Seguro\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/pt/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com\",\"footer_li_fcp_label\":\"Política de Conteúdo para Fãs\",\"footer_li_fcp_url\":\"http://supercell.com/en/fan-content-policy/pt/\",\"footer_gen_dl_gam\":\"Baixe nossos jogos em\"}");

/***/ }),

/***/ "./src/locales/ru.json":
/*!*****************************!*\
  !*** ./src/locales/ru.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Редактор значков Brawl Stars\",\"meta_title\":\"Редактор значков Brawl Stars\",\"meta_description\":\"Создайте свой значок Brawl Stars\",\"gen_error\":\"Что-то пошло не так. Закройте это окно и повторите попытку.\",\"gen_tooltip\":\"Теперь вы можете использовать значки в качестве изображения профиля Supercell!\",\"gen_hidden\":\"СКРЫТО\",\"cat_head\":\"Голова\",\"cat_eyes\":\"Глаза\",\"cat_mouth\":\"Рот\",\"cat_hair\":\"Волосы\",\"cat_effect\":\"Эффект\",\"cat_hands\":\"Руки\",\"cat_accessories\":\"Аксессуары\",\"cat_eyebrows\":\"Брови\",\"cat_beard\":\"Борода\",\"cat_skin_accessories\":\"Кожа\",\"cat_earrings\":\"Серьги\",\"cat_ears\":\"Уши\",\"cat_background\":\"Фон\",\"login_title\":\"Войдите, чтобы сохранить значок как изображение профиля Supercell\",\"login_cta\":\"Войти с Supercell\",\"login_cta_short\":\"Войти с помощью\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Выйти\",\"switch_accounts\":\"Сменить учетную запись\",\"logged_in_as\":\"Вы вошли как\",\"login_with_supercell\":\"Войти с Supercell\",\"save_pin_title\":\"Сохраните значок как изображение профиля Supercell\",\"save_pin_cta\":\"Сохранить значок\",\"save_cooldown_info\":\"Можно сохранять по 1 новому значку в день\",\"save_pin_progress\":\"Сохранение...\",\"save_success\":\"Значок сохранен как изображение профиля Supercell\",\"save_success_new\":\"Аватар сохранён\",\"save_error\":\"При сохранении изображения профиля возникла проблема.\",\"save_disclaimer\":\"Может пройти несколько минут, прежде чем аватар отобразится в игре.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Повторить попытку\",\"save_error_cta_back\":\"Вернуться в редактор\",\"save_error_ddos\":\"Менять изображение профиля Supercell можно три раза в неделю. Повторите попытку через\",\"save_error_days\":\"дн.\",\"save_error_day\":\"день.\",\"save_error_ddos_hours\":\"Сохранить новый значок можно через\",\"save_error_hours\":\"ч.\",\"save_error_hour\":\"ч.\",\"download_title\":\"Отлично получилось!\",\"download_description\":\"Скачайте свой новый крутой значок и поделитесь им!\",\"download_cta\":\"Скачать\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Подпишитесь на нас в\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Справочник для родителей\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/ru/\",\"footer_li_tos_label\":\"Условия пользования\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/ru/\",\"footer_li_pp_label\":\"Политика конфиденциальности\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/ru/\",\"footer_li_safp_label\":\"Правила безопасной и честной игры\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/ru/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Правила создания фанатского контента\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/ru/\",\"footer_gen_dl_gam\":\"Наши игры можно скачать из\"}");

/***/ }),

/***/ "./src/locales/sv.json":
/*!*****************************!*\
  !*** ./src/locales/sv.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars avatarverktyg\",\"meta_title\":\"Brawl Stars avatarverktyg\",\"meta_description\":\"Skapa din alldeles egna Brawl Stars-avatar\",\"gen_error\":\"Något gick fel. Stäng det här fönstret och försök igen.\",\"gen_tooltip\":\"Nu kan du använda en avatar som Supercell-profilbild!\",\"gen_hidden\":\"GÖMD\",\"cat_head\":\"Huvud\",\"cat_eyes\":\"Ögon\",\"cat_mouth\":\"Mun\",\"cat_hair\":\"Hår\",\"cat_effect\":\"Effekt\",\"cat_hands\":\"Händer\",\"cat_accessories\":\"Accessoarer\",\"cat_eyebrows\":\"Ögonbryn\",\"cat_beard\":\"Skägg\",\"cat_skin_accessories\":\"Hudaccessoarer\",\"cat_earrings\":\"Örhängen\",\"cat_ears\":\"Öron\",\"cat_background\":\"Bakgrund\",\"login_title\":\"Logga in för att spara denna avatar som din Supercell-profilbild\",\"login_cta\":\"Logga in med Supercell\",\"login_cta_short\":\"Logga in med\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Logga ut\",\"switch_accounts\":\"Växla mellan konton\",\"logged_in_as\":\"Inloggad som\",\"login_with_supercell\":\"Logga in med Supercell\",\"save_pin_title\":\"Spara denna avatar som din Supercell-profilbild\",\"save_pin_cta\":\"Spara avatar nu\",\"save_cooldown_info\":\"Du kan spara en ny avatar en gång om dagen\",\"save_pin_progress\":\"Sparar...\",\"save_success\":\"Avataren har sparats som din Supercell-profilbild\",\"save_success_new\":\"Avatar sparad\",\"save_error\":\"Det uppstod ett fel när profilbilden skulle sparas.\",\"save_disclaimer\":\"Det kan ta några minuter innan du ser den i spelet.\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"Försök igen\",\"save_error_cta_back\":\"Tillbaka till redigeraren\",\"save_error_ddos\":\"Du kan byta Supercell-profilbild tre gånger per vecka. Försök igen om\",\"save_error_days\":\"dagar\",\"save_error_day\":\"dag\",\"save_error_ddos_hours\":\"Du kan spara en ny avatar om\",\"save_error_hours\":\"timmar\",\"save_error_hour\":\"timme\",\"download_title\":\"Snyggt!\",\"download_description\":\"Ladda ner din grymma avatar och dela den!\",\"download_cta\":\"Ladda ner\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsingfors\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"Följ oss på\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Föräldraguide\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"Användarvillkor\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Integritetspolicy\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Säkerhet och fair play\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Policy för spelarinnehåll\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"Ladda ner våra spel från\"}");

/***/ }),

/***/ "./src/locales/th.json":
/*!*****************************!*\
  !*** ./src/locales/th.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"ตัวสร้างอีโมจิ Brawl Stars\",\"meta_title\":\"ตัวสร้างอีโมจิ Brawl Stars\",\"meta_description\":\"สร้างอีโมจิ Brawl Stars ในแบบของคุณ\",\"gen_error\":\"มีบางอย่างผิดพลาด โปรดปิดหน้าต่างนี้และลองอีกครั้ง\",\"gen_tooltip\":\"ตอนนี้คุณสามารถใช้อีโมจิเป็นรูปประวัติ Supercell ได้แล้ว!\",\"gen_hidden\":\"ซ่อนอยู่\",\"cat_head\":\"หัว\",\"cat_eyes\":\"ตา\",\"cat_mouth\":\"ปาก\",\"cat_hair\":\"ผม\",\"cat_effect\":\"เอฟเฟกต์\",\"cat_hands\":\"มือ\",\"cat_accessories\":\"เครื่องประดับ\",\"cat_eyebrows\":\"คิ้ว\",\"cat_beard\":\"หนวด\",\"cat_skin_accessories\":\"เครื่องประดับสกิน\",\"cat_earrings\":\"ต่างหู\",\"cat_ears\":\"หู\",\"cat_background\":\"พื้นหลัง\",\"login_title\":\"ล็อกอินเพื่อบันทึกอีโมจินี้เป็นรูปประวัติ Supercell\",\"login_cta\":\"ล็อกอินด้วย Supercell\",\"login_cta_short\":\"ล็อกอินด้วย\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"ล็อกเอาท์\",\"switch_accounts\":\"เปลี่ยนบัญชี\",\"logged_in_as\":\"ล็อกอินในฐานะ\",\"login_with_supercell\":\"ล็อกอินด้วย Supercell\",\"save_pin_title\":\"บันทึกอีโมจินี้เป็นรูปประวัติ Supercell\",\"save_pin_cta\":\"บันทึกอีโมจิตอนนี้\",\"save_cooldown_info\":\"คุณสามารถบันทึกอีโมจิใหม่ได้หนึ่งครั้งต่อวัน\",\"save_pin_progress\":\"กำลังบันทึก...\",\"save_success\":\"อีโมจิได้รับการบันทึกเป็นรูปประวัติ Supercell ของคุณแล้ว\",\"save_success_new\":\"บันทึกรูปตัวแทนแล้ว\",\"save_error\":\"เกิดปัญหาขณะกำลังบันทึกรูปประวัติของคุณ\",\"save_disclaimer\":\"อาจใช้เวลาสักครู่หนึ่งก่อนที่คุณจะเห็นในเกม\",\"save_success_cta\":\"ตกลง\",\"save_error_cta_retry\":\"ลองอีกครั้ง\",\"save_error_cta_back\":\"กลับไปยังตัวแก้ไข\",\"save_error_ddos\":\"คุณสามารถเปลี่ยนรูปประวัติ Supercell ได้สามครั้งต่อสัปดาห์ ลองอีกครั้งใน\",\"save_error_days\":\"วัน\",\"save_error_day\":\"วัน\",\"save_error_ddos_hours\":\"คุณสามารถบันทึกอีโมจิใหม่ได้ใน\",\"save_error_hours\":\"ชั่วโมง\",\"save_error_hour\":\"ชั่วโมง\",\"download_title\":\"ดูดี!\",\"download_description\":\"ดาวน์โหลดและแชร์อีโมจิสุดเฟี้ยวของคุณ!\",\"download_cta\":\"ดาวน์โหลด\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"ติดตามเราทาง\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"คำแนะนำผู้ปกครอง\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/\",\"footer_li_tos_label\":\"เงื่อนไขการให้บริการ\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"นโยบายความเป็นส่วนตัว\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"การเล่นที่ปลอดภัยและยุติธรรม\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/th/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"นโยบายเนื้อหาแฟนเกม\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/th/\",\"footer_gen_dl_gam\":\"ดาวน์โหลดเกมของเราจาก\"}");

/***/ }),

/***/ "./src/locales/tr.json":
/*!*****************************!*\
  !*** ./src/locales/tr.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Brawl Stars Rozet Oluşturucu\",\"meta_title\":\"Brawl Stars Rozet Oluşturucu\",\"meta_description\":\"Kendi özel Brawl Stars rozetini oluştur!\",\"gen_error\":\"Bir hata oluştu. Lütfen bu pencereyi kapatıp tekrar dene.\",\"gen_tooltip\":\"Rozetler artık Supercell profil resmi olarak kullanılabiliyor!\",\"gen_hidden\":\"GİZLİ\",\"cat_head\":\"Kafa\",\"cat_eyes\":\"Göz\",\"cat_mouth\":\"Ağız\",\"cat_hair\":\"Saç\",\"cat_effect\":\"Efekt\",\"cat_hands\":\"El\",\"cat_accessories\":\"Aksesuar\",\"cat_eyebrows\":\"Kaş\",\"cat_beard\":\"Sakal\",\"cat_skin_accessories\":\"Yüz Aksesuarı\",\"cat_earrings\":\"Küpe\",\"cat_ears\":\"Kulak\",\"cat_background\":\"Arka Plan\",\"login_title\":\"Bu rozeti Supercell profil resmin olarak kaydetmek için giriş yap.\",\"login_cta\":\"Supercell ID ile\",\"login_cta_short\":\"Giriş yapılacak hesap:\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Çıkış yap\",\"switch_accounts\":\"Hesap değiştir\",\"logged_in_as\":\"Giriş yapan:\",\"login_with_supercell\":\"Supercell ID ile\",\"save_pin_title\":\"Bu rozeti Supercell profil resmin olarak kaydet.\",\"save_pin_cta\":\"Rozeti hemen kaydet\",\"save_cooldown_info\":\"Günde bir yeni rozet kaydedebilirsin.\",\"save_pin_progress\":\"Kaydediliyor...\",\"save_success\":\"Rozet, Supercell profil resmin olarak kaydedildi.\",\"save_success_new\":\"Avatar kaydedildi.\",\"save_error\":\"Profil resmi kaydedilirken bir sorun oluştu.\",\"save_disclaimer\":\"Rozeti oyunda görmek için birkaç dakika beklemen gerekebilir.\",\"save_success_cta\":\"Tamam\",\"save_error_cta_retry\":\"Tekrar dene\",\"save_error_cta_back\":\"Düzenleyiciye geri dön\",\"save_error_ddos\":\"Supercell profil resmini haftada üç kez değiştirebilirsin. Şu kadar süre sonra tekrar dene:\",\"save_error_days\":\"gün\",\"save_error_day\":\"gün\",\"save_error_ddos_hours\":\"Yeni rozet kaydetmek için kalan süre:\",\"save_error_hours\":\"saat\",\"save_error_hour\":\"saat\",\"download_title\":\"Harika oldu!\",\"download_description\":\"Havalı rozetini indir ve arkadaşlarınla paylaş!\",\"download_cta\":\"İndir\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finlandiya\",\"gen_add5\":\"Şirket Kimliği 2336509-6\",\"gen_fol\":\"Bizi takip etmek için:\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Ebeveyn Kılavuzu\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/tr/\",\"footer_li_tos_label\":\"Hizmet Koşulları\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/tr/\",\"footer_li_pp_label\":\"Gizlilik Politikası\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/tr/\",\"footer_li_safp_label\":\"Güvenli ve Adil Oyun Ortamı\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/tr/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Hayran İçeriği Politikası\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"Oyunlarımıza şuradan ulaşabilirsin:\"}");

/***/ }),

/***/ "./src/locales/vi.json":
/*!*****************************!*\
  !*** ./src/locales/vi.json ***!
  \*****************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"Trình tạo Huy hiệu Brawl Stars\",\"meta_title\":\"Trình tạo Huy hiệu Brawl Stars\",\"meta_description\":\"Tạo huy hiệu Brawl Stars tùy chỉnh của riêng bạn\",\"gen_error\":\"Đã xảy ra sự cố. Vui lòng đóng cửa sổ này và thử lại.\",\"gen_tooltip\":\"Hiện bạn có thể dùng huy hiệu làm ảnh đại diện Supercell của mình!\",\"gen_hidden\":\"ẨN\",\"cat_head\":\"Đầu\",\"cat_eyes\":\"Mắt\",\"cat_mouth\":\"Miệng\",\"cat_hair\":\"Tóc\",\"cat_effect\":\"Hiệu ứng\",\"cat_hands\":\"Tay\",\"cat_accessories\":\"Phụ kiện\",\"cat_eyebrows\":\"Lông mày\",\"cat_beard\":\"Râu\",\"cat_skin_accessories\":\"Chi tiết trên da\",\"cat_earrings\":\"Bông tai\",\"cat_ears\":\"Tai\",\"cat_background\":\"Nền\",\"login_title\":\"Hãy đăng nhập để lưu huy hiệu này làm ảnh đại diện Supercell của bạn.\",\"login_cta\":\"Đăng nhập bằng Supercell\",\"login_cta_short\":\"Đăng nhập bằng\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"Đăng xuất\",\"switch_accounts\":\"Chuyển đổi tài khoản\",\"logged_in_as\":\"Đã đăng nhập bằng\",\"login_with_supercell\":\"Đăng nhập bằng Supercell\",\"save_pin_title\":\"Lưu huy hiệu này làm ảnh đại diện Supercell của bạn.\",\"save_pin_cta\":\"Lưu huy hiệu ngay\",\"save_cooldown_info\":\"Bạn có thể lưu Huy hiệu mới một lần mỗi ngày\",\"save_pin_progress\":\"Đang lưu...\",\"save_success\":\"Huy hiệu đã được lưu làm ảnh đại diện Supercell của bạn.\",\"save_success_new\":\"Đã lưu ảnh đại diện\",\"save_error\":\"Đã xảy ra sự cố khi lưu ảnh đại diện.\",\"save_disclaimer\":\"Bạn có thể nhìn thấy huy hiệu này trong trò chơi sau vài phút.\",\"save_success_cta\":\"Ok\",\"save_error_cta_retry\":\"Thử lại\",\"save_error_cta_back\":\"Quay lại trình chỉnh sửa\",\"save_error_ddos\":\"Bạn có thể thay đổi ảnh đại diện Supercell 3 lần mỗi tuần. Hãy thử lại sau:\",\"save_error_days\":\"ngày\",\"save_error_day\":\"ngày\",\"save_error_ddos_hours\":\"Bạn có thể lưu Huy hiệu mới sau\",\"save_error_hours\":\"giờ\",\"save_error_hour\":\"giờ\",\"download_title\":\"Trông đẹp lắm!\",\"download_description\":\"Tải về và chia sẻ huy hiệu thú vị của bạn!\",\"download_cta\":\"Tải về\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Phần Lan\",\"gen_add5\":\"ID Doanh nghiệp 2336509-6\",\"gen_fol\":\"Theo dõi chúng tôi trên\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"Hướng dẫn dành cho Phụ huynh\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/vi/\",\"footer_li_tos_label\":\"Điều khoản dịch vụ\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/\",\"footer_li_pp_label\":\"Chính sách Quyền riêng tư\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/\",\"footer_li_safp_label\":\"Chơi Công bằng và An toàn\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/vi/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"Chính sách Nội dung tạo bởi Người hâm mộ\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/vi/\",\"footer_gen_dl_gam\":\"Tải về các trò chơi của chúng tôi từ\"}");

/***/ }),

/***/ "./src/locales/zh-Hans.json":
/*!**********************************!*\
  !*** ./src/locales/zh-Hans.json ***!
  \**********************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"《荒野乱斗》表情制作器\",\"meta_title\":\"《荒野乱斗》表情制作器\",\"meta_description\":\"制作您自己的《荒野乱斗》个性表情\",\"gen_error\":\"出现错误。请关闭此窗口后重试。\",\"gen_tooltip\":\"您现在可以使用表情作为Supercell头像啦！\",\"gen_hidden\":\"已隐藏\",\"cat_head\":\"头\",\"cat_eyes\":\"眼睛\",\"cat_mouth\":\"嘴巴\",\"cat_hair\":\"头发\",\"cat_effect\":\"特效\",\"cat_hands\":\"手\",\"cat_accessories\":\"配饰\",\"cat_eyebrows\":\"眉毛\",\"cat_beard\":\"胡子\",\"cat_skin_accessories\":\"皮肤配饰\",\"cat_earrings\":\"耳环\",\"cat_ears\":\"耳朵\",\"cat_background\":\"背景\",\"login_title\":\"登录以将此表情保存为您的Supercell头像\",\"login_cta\":\"使用Supercell登录\",\"login_cta_short\":\"选择登录账号\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"登出\",\"switch_accounts\":\"切换账号\",\"logged_in_as\":\"当前登录账号为\",\"login_with_supercell\":\"使用Supercell登录\",\"save_pin_title\":\"将此表情保存为您的Supercell头像\",\"save_pin_cta\":\"立即保存表情\",\"save_cooldown_info\":\"您每天可保存一款新表情\",\"save_pin_progress\":\"正在保存...\",\"save_success\":\"已成功将表情保存为您的Supercell头像\",\"save_success_new\":\"头像已保存\",\"save_error\":\"保存头像时出错。\",\"save_disclaimer\":\"您可能需要稍等几分钟才能在游戏中看到它。\",\"save_success_cta\":\"好的\",\"save_error_cta_retry\":\"再试一次\",\"save_error_cta_back\":\"返回编辑器\",\"save_error_ddos\":\"您每周只能更换三次Supercell头像，再次更换需等待\",\"save_error_days\":\"天\",\"save_error_day\":\"天\",\"save_error_ddos_hours\":\"保存新表情需等待\",\"save_error_hours\":\"小时\",\"save_error_hour\":\"小时\",\"download_title\":\"看起来不错！\",\"download_description\":\"下载并分享您的酷炫表情！\",\"download_cta\":\"下载\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"关注我们\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCooVYzDxdwTtGYAkcPmOgOw\",\"footer_li_facebook\":\"https://www.facebook.com/brawlstars/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://www.weibo.com/bs365\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"家长指南\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/cn/\",\"footer_li_tos_label\":\"服务条款\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/cn/\",\"footer_li_pp_label\":\"隐私保护政策\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/cn/\",\"footer_li_safp_label\":\"账号安全和游戏公平\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/cn/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"玩家内容条款\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/cn\",\"footer_gen_dl_gam\":\"下载我们的游戏\"}");

/***/ }),

/***/ "./src/locales/zh-Hant.json":
/*!**********************************!*\
  !*** ./src/locales/zh-Hant.json ***!
  \**********************************/
/*! exports provided: lang_en, lang_de, lang_fr, lang_it, lang_es, lang_pt, lang_jp, lang_zh-Hant, lang_kr, lang_zh-Hans, lang_nl, lang_no, lang_tr, lang_ru, lang_fa, lang_ar, lang_id, lang_ms, lang_vi, lang_th, lang_fi, lang_da, lang_sv, lang_pl, lang_he, meta_sitename, meta_title, meta_description, gen_error, gen_tooltip, gen_hidden, cat_head, cat_eyes, cat_mouth, cat_hair, cat_effect, cat_hands, cat_accessories, cat_eyebrows, cat_beard, cat_skin_accessories, cat_earrings, cat_ears, cat_background, login_title, login_cta, login_cta_short, login_supercell, login_supercell_id, logout_cta, switch_accounts, logged_in_as, login_with_supercell, save_pin_title, save_pin_cta, save_cooldown_info, save_pin_progress, save_success, save_success_new, save_error, save_disclaimer, save_success_cta, save_error_cta_retry, save_error_cta_back, save_error_ddos, save_error_days, save_error_day, save_error_ddos_hours, save_error_hours, save_error_hour, download_title, download_description, download_cta, gen_add1, gen_add2, gen_add3, gen_add4, gen_add5, gen_fol, footer_li_youtube, footer_li_facebook, footer_li_instagram, footer_li_twitter, footer_li_tiktok, footer_li_linkedin, footer_li_glassdoor, link_BS_apap, link_BS_apgl, footer_li_pg_label, footer_li_pg_url, footer_li_tos_label, footer_li_tos_url, footer_li_pp_label, footer_li_pp_url, footer_li_safp_label, footer_li_safp_url, footer_li_sc_label, footer_li_sc_url, footer_li_fcp_label, footer_li_fcp_url, footer_gen_dl_gam, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"lang_en\":\"English\",\"lang_de\":\"Deutsch\",\"lang_fr\":\"Français\",\"lang_it\":\"Italiano\",\"lang_es\":\"Español\",\"lang_pt\":\"Português\",\"lang_jp\":\"日本語\",\"lang_zh-Hant\":\"繁體中文\",\"lang_kr\":\"한국어\",\"lang_zh-Hans\":\"简体中文\",\"lang_nl\":\"Nederlands\",\"lang_no\":\"Norsk\",\"lang_tr\":\"Türkçe\",\"lang_ru\":\"Русский\",\"lang_fa\":\"فارسی\",\"lang_ar\":\"عربي\",\"lang_id\":\"Bahasa Indonesia\",\"lang_ms\":\"Bahasa Melayu\",\"lang_vi\":\"Tiếng Việt\",\"lang_th\":\"ภาษาไทย\",\"lang_fi\":\"Suomi\",\"lang_da\":\"Dansk\",\"lang_sv\":\"Svenska\",\"lang_pl\":\"Polski\",\"lang_he\":\"עִברִית\",\"meta_sitename\":\"《荒野亂鬥》表情編輯器\",\"meta_title\":\"《荒野亂鬥》表情編輯器\",\"meta_description\":\"製作您自己的《荒野亂鬥》表情\",\"gen_error\":\"發生錯誤。請關閉此視窗後再試一次。\",\"gen_tooltip\":\"您現在可以使用表情作為Supercell頭像囉！\",\"gen_hidden\":\"已隱藏\",\"cat_head\":\"頭部\",\"cat_eyes\":\"眼睛\",\"cat_mouth\":\"嘴巴\",\"cat_hair\":\"頭髮\",\"cat_effect\":\"效果\",\"cat_hands\":\"手部\",\"cat_accessories\":\"配飾\",\"cat_eyebrows\":\"眉毛\",\"cat_beard\":\"鬍子\",\"cat_skin_accessories\":\"造型配飾\",\"cat_earrings\":\"耳環\",\"cat_ears\":\"耳朵\",\"cat_background\":\"背景\",\"login_title\":\"登入以將此表情儲存為您的Supercell ID頭像\",\"login_cta\":\"使用Supercell ID登入\",\"login_cta_short\":\"選擇登入帳號\",\"login_supercell\":\"Supercell\",\"login_supercell_id\":\"ID\",\"logout_cta\":\"登出\",\"switch_accounts\":\"切換帳號\",\"logged_in_as\":\"目前登入帳號為\",\"login_with_supercell\":\"使用Supercell ID登入\",\"save_pin_title\":\"將此表情儲存為您的Supercell ID頭像\",\"save_pin_cta\":\"立即儲存表情\",\"save_cooldown_info\":\"你每天可儲存1款新表情\",\"save_pin_progress\":\"正在儲存...\",\"save_success\":\"已將表情儲存為您的Supercell ID頭像\",\"save_success_new\":\"頭像已儲存\",\"save_error\":\"儲存頭像時發生錯誤。\",\"save_disclaimer\":\"您可能需要稍等幾分鐘才能在遊戲中看到它。\",\"save_success_cta\":\"OK\",\"save_error_cta_retry\":\"請再試一次\",\"save_error_cta_back\":\"返回編輯器\",\"save_error_ddos\":\"您每週只能更換3次Supercell頭像，再次更換需等待\",\"save_error_days\":\"天\",\"save_error_day\":\"天\",\"save_error_ddos_hours\":\"儲存新表情需等待\",\"save_error_hours\":\"小時\",\"save_error_hour\":\"小時\",\"download_title\":\"看起來很讚！\",\"download_description\":\"下載並分享您的酷炫表情！\",\"download_cta\":\"下載\",\"gen_add1\":\"Supercell Oy\",\"gen_add2\":\"Jätkäsaarenlaituri 1\",\"gen_add3\":\"00180 Helsinki\",\"gen_add4\":\"Finland\",\"gen_add5\":\"Business ID 2336509-6\",\"gen_fol\":\"追蹤我們\",\"footer_li_youtube\":\"https://www.youtube.com/channel/UCG8VflfBJVkyYAu89PWqlfw\",\"footer_li_facebook\":\"https://www.facebook.com/BrawlStarsTW/\",\"footer_li_instagram\":\"https://www.instagram.com/brawlstars/\",\"footer_li_twitter\":\"https://twitter.com/brawlstars\",\"footer_li_tiktok\":\"https://www.tiktok.com/@brawlstars\",\"footer_li_linkedin\":\"https://www.linkedin.com/company/supercell/\",\"footer_li_glassdoor\":\"https://www.glassdoor.com/Overview/Working-at-Supercell-EI_IE511675.11,20.htm\",\"link_BS_apap\":\"https://supr.cl/BrawlAppStore\",\"link_BS_apgl\":\"https://supr.cl/BrawlGooglePlay\",\"footer_li_pg_label\":\"家長指南\",\"footer_li_pg_url\":\"https://supercell.com/en/parents/tw/\",\"footer_li_tos_label\":\"服務條款\",\"footer_li_tos_url\":\"https://supercell.com/en/terms-of-service/tw/\",\"footer_li_pp_label\":\"隱私保護政策\",\"footer_li_pp_url\":\"https://supercell.com/en/privacy-policy/tw/\",\"footer_li_safp_label\":\"帳號安全和遊戲公平\",\"footer_li_safp_url\":\"https://supercell.com/en/safe-and-fair-play/tw/\",\"footer_li_sc_label\":\"Supercell\",\"footer_li_sc_url\":\"https://supercell.com/\",\"footer_li_fcp_label\":\"玩家內容條款\",\"footer_li_fcp_url\":\"https://supercell.com/en/fan-content-policy/\",\"footer_gen_dl_gam\":\"下載我們的遊戲\"}");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _sentry_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/vue */ "./node_modules/@sentry/vue/esm/index.js");
/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/App.vue */ "./src/App.vue");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _stores_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/stores/store */ "./src/stores/store.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/router */ "./src/router/index.ts");
/* harmony import */ var _config_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/i18n */ "./src/config/i18n.ts");
/* harmony import */ var _config_axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/config/axios */ "./src/config/axios.ts");
/* harmony import */ var _directives_v_visible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directives/v-visible */ "./src/directives/v-visible.ts");







// Configs

// Directives

// Vue setup
vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.productionTip = false;
// Sentry setup
_sentry_vue__WEBPACK_IMPORTED_MODULE_1__["init"]({
  Vue: vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  dsn: _constants__WEBPACK_IMPORTED_MODULE_3__["SENTRY_DSN"],
  debug: _constants__WEBPACK_IMPORTED_MODULE_3__["IS_DEV"],
  release: `pinmaker@${_constants__WEBPACK_IMPORTED_MODULE_3__["APP_VERSION"]}`,
  environment: _constants__WEBPACK_IMPORTED_MODULE_3__["ENVIRONMENT"],
  logErrors: _constants__WEBPACK_IMPORTED_MODULE_3__["IS_DEV"],
  attachProps: true,
  attachStacktrace: true
});
// Render app
new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
  render: h => h(_App_vue__WEBPACK_IMPORTED_MODULE_2__["default"]),
  store: _stores_store__WEBPACK_IMPORTED_MODULE_4__["default"],
  router: _router__WEBPACK_IMPORTED_MODULE_5__["default"],
  i18n: _config_i18n__WEBPACK_IMPORTED_MODULE_6__["i18n"]
}).$mount('#app');

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ "./src/router/routes.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _config_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/config/i18n */ "./src/config/i18n.ts");





vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
const router = new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  mode: 'history',
  base: "/",
  routes: _routes__WEBPACK_IMPORTED_MODULE_2__["routes"]
});
// Route guard for language handling
router.beforeEach((to, _from, next) => {
  // Find Lang in URL
  const urlLang = to.path.split('/')[1];
  const isLangSupported = _constants__WEBPACK_IMPORTED_MODULE_3__["LANGUAGES"].find(lang => {
    return lang === urlLang;
  });
  if (isLangSupported) {
    // Set language from route
    _config_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].locale = urlLang;
  }
  // If there is no lang set in URL, redirect to i18n langauge (browser lang or default lang)
  if (!urlLang) {
    return next({
      path: _config_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].locale
    });
  }
  return next();
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/router/routeNames.ts":
/*!**********************************!*\
  !*** ./src/router/routeNames.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const routesNames = {
  home: 'home',
  auth: 'auth',
  lang: 'lang'
};
/* harmony default export */ __webpack_exports__["default"] = (routesNames);

/***/ }),

/***/ "./src/router/routes.ts":
/*!******************************!*\
  !*** ./src/router/routes.ts ***!
  \******************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _routeNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routeNames */ "./src/router/routeNames.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _config_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/config/i18n */ "./src/config/i18n.ts");



const routes = [{
  path: _constants__WEBPACK_IMPORTED_MODULE_1__["SUPPORTED_LANGS_EXP"],
  name: _routeNames__WEBPACK_IMPORTED_MODULE_0__["default"].home,
  component: () => Promise.all(/*! import() | home */[__webpack_require__.e("auth~home"), __webpack_require__.e("home")]).then(__webpack_require__.bind(null, /*! @/views/Home.vue */ "./src/views/Home.vue"))
}, {
  // Won't localize auth in url - but content will be translatable
  path: '/auth',
  name: _routeNames__WEBPACK_IMPORTED_MODULE_0__["default"].auth,
  component: () => Promise.all(/*! import() | auth */[__webpack_require__.e("auth~home"), __webpack_require__.e("auth")]).then(__webpack_require__.bind(null, /*! @/views/Auth.vue */ "./src/views/Auth.vue"))
}, {
  path: '*',
  redirect: {
    path: _config_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].locale
  }
}];

/***/ }),

/***/ "./src/stores/auth.ts":
/*!****************************!*\
  !*** ./src/stores/auth.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/router */ "./src/router/index.ts");
/* harmony import */ var _router_routeNames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/router/routeNames */ "./src/router/routeNames.ts");
/* harmony import */ var typed_vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typed-vuex */ "./node_modules/typed-vuex/dist/index.mjs");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _helpers_guid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/helpers/guid */ "./src/helpers/guid.ts");
/* harmony import */ var _config_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/config/i18n */ "./src/config/i18n.ts");








const state = () => ({
  authenticateStatus: null,
  logoutStatus: null,
  ssoInited: false,
  loginError: false
});
const getters = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_3__["getterTree"])(state, {
  authenticateStatus: state => state.authenticateStatus,
  logoutStatus: state => state.logoutStatus,
  ssoInited: state => state.ssoInited
});
const mutations = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_3__["mutationTree"])(state, {
  setAuthenticateStatus: (state, status) => {
    state.authenticateStatus = status;
  },
  setLogoutStatus: (state, status) => {
    state.logoutStatus = status;
  },
  setSsoInited: (state, bool) => {
    state.ssoInited = bool;
  },
  setLoginError: (state, bool) => {
    state.loginError = bool;
  }
});
const actions = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_3__["actionTree"])({
  state,
  getters,
  mutations
}, {
  ssoInit({
    getters,
    dispatch,
    commit
  }) {
    if (window.SSOSDK) {
      const sso = new window.SSOSDK({
        clientId: _constants__WEBPACK_IMPORTED_MODULE_5__["SCID_SSO_CLIENT_ID"],
        scope: _constants__WEBPACK_IMPORTED_MODULE_5__["SCID_SSO_SCOPE"],
        ssoBaseUrl: _constants__WEBPACK_IMPORTED_MODULE_5__["SCID_SSO_URL"],
        onLogin: async ({
          accountId,
          authorizationCode
        }) => {
          dispatch('ssoLoginHandler', {
            accountId,
            authorizationCode
          }).then(() => {
            if (!getters.ssoInited) commit('setSsoInited', true);
          }).catch(() => {});
        },
        onLogout: async () => {
          dispatch('ssoLogoutHandler').then(() => {
            if (!getters.ssoInited) commit('setSsoInited', true);
          }).catch(() => {});
        }
      });
      const {
        selectedAccountId
      } = sso.start();
      if (selectedAccountId) {
        // User likely has a valid SSO session and onLogin() will be called soon.
        // Note that this is "optimistic", as the value is returned before
        // making any network calls. The user may have been logged out
        // remotely and instead onLogout() will be called, but if the website's
        // own session is valid and matches the same account as this, it's okay
        // to already show user data here.
      } else {
        // User does not have SSO session. Have the user log in through normal
        // route.
        dispatch('ssoLogoutHandler').then(() => {
          if (!getters.ssoInited) commit('setSsoInited', true);
        }).catch(() => {});
      }
    }
  },
  ssoLoginHandler({
    rootGetters,
    dispatch
  }, {
    accountId,
    authorizationCode
  }) {
    return dispatch('authenticate', authorizationCode);
  },
  ssoLogoutHandler({
    dispatch,
    rootGetters
  }) {
    if (rootGetters['user/isLoggedIn']) {
      return dispatch('logout');
    } else {
      return Promise.resolve();
    }
  },
  ssoLogin({
    state,
    getters,
    commit,
    dispatch
  }) {
    // Save app state before redirecting to SCID
    dispatch('saveAppStateToLocalStorage', null, {
      root: true
    });
    // Set and save state for login - used later in the login phase
    const loginState = Object(_helpers_guid__WEBPACK_IMPORTED_MODULE_6__["default"])();
    window.localStorage.setItem('loginState', loginState);
    // eslint-disable-next-line no-console
    if (!_constants__WEBPACK_IMPORTED_MODULE_5__["SCID_SSO_OAUTH_URL"] && _constants__WEBPACK_IMPORTED_MODULE_5__["ENVIRONMENT"] === 'dev') console.warn('DEV NOTE: Missing .env var');
    // Pass locale to SCID login window to localize it
    const langString = `&lang=${_config_i18n__WEBPACK_IMPORTED_MODULE_7__["i18n"].locale}`;
    const url = _constants__WEBPACK_IMPORTED_MODULE_5__["SCID_SSO_OAUTH_URL"] + langString + '&redirect_uri=' + window.location.origin + _constants__WEBPACK_IMPORTED_MODULE_5__["AUTHENTICATE_PATH"] + '&state=' + encodeURIComponent(loginState);
    window.location.href = url;
  },
  ssoPostLogin({
    commit
  }) {
    const code = decodeURI(_router__WEBPACK_IMPORTED_MODULE_1__["default"].currentRoute.query.code);
    const state = decodeURI(_router__WEBPACK_IMPORTED_MODULE_1__["default"].currentRoute.query.state);
    const loginState = window.localStorage.getItem('loginState');
    window.localStorage.removeItem('loginState');
    if (code && state === loginState) {
      _router__WEBPACK_IMPORTED_MODULE_1__["default"].push({
        name: _router_routeNames__WEBPACK_IMPORTED_MODULE_2__["default"].home
      }).catch(() => {});
    } else {
      // TODO - handle state mismatch
    }
  },
  authenticate({
    getters,
    commit,
    dispatch
  }, code) {
    // Authenticate SCID user
    commit('setAuthenticateStatus', _constants__WEBPACK_IMPORTED_MODULE_5__["API_STATUS_PENDING"]);
    return axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('/users/login', {
      code: code
    }).then(response => {
      dispatch('user/setUserId', response.data.userId, {
        root: true
      });
      dispatch('user/setUsername', response.data.username, {
        root: true
      });
      dispatch('user/setProfileImage', response.data.profileImage, {
        root: true
      });
      if (response.data && response.data.profileImageUploadCooldown) {
        dispatch('user/setProfileImageUploadCooldown', response.data.profileImageUploadCooldown, {
          root: true
        });
      }
      commit('setAuthenticateStatus', _constants__WEBPACK_IMPORTED_MODULE_5__["API_STATUS_SUCCESS"]);
      return Promise.resolve(response);
    }).catch(error => {
      commit('setAuthenticateStatus', _constants__WEBPACK_IMPORTED_MODULE_5__["API_STATUS_FAILURE"]);
      return Promise.reject(error);
    });
  },
  logout({
    commit,
    dispatch
  }) {
    commit('setLogoutStatus', _constants__WEBPACK_IMPORTED_MODULE_5__["API_STATUS_PENDING"]);
    return axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('/users/logout').then(response => {
      dispatch('user/clear', null, {
        root: true
      });
      commit('setLogoutStatus', _constants__WEBPACK_IMPORTED_MODULE_5__["API_STATUS_SUCCESS"]);
      return Promise.resolve(response);
    }).catch(error => {
      dispatch('user/clear', null, {
        root: true
      });
      commit('setLogoutStatus', _constants__WEBPACK_IMPORTED_MODULE_5__["API_STATUS_FAILURE"]);
      return Promise.reject(error);
    });
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions
});

/***/ }),

/***/ "./src/stores/pin-store.ts":
/*!*********************************!*\
  !*** ./src/stores/pin-store.ts ***!
  \*********************************/
/*! exports provided: RECOVER_QUERY_ID, RECOVER_QUERY_VALUE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECOVER_QUERY_ID", function() { return RECOVER_QUERY_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECOVER_QUERY_VALUE", function() { return RECOVER_QUERY_VALUE; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array-buffer.detached.js */ "./node_modules/core-js/modules/es.array-buffer.detached.js");
/* harmony import */ var core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_detached_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array-buffer.transfer.js */ "./node_modules/core-js/modules/es.array-buffer.transfer.js");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array-buffer.transfer-to-fixed-length.js */ "./node_modules/core-js/modules/es.array-buffer.transfer-to-fixed-length.js");
/* harmony import */ var core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_transfer_to_fixed_length_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_replace_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.replace-all.js */ "./node_modules/core-js/modules/es.string.replace-all.js");
/* harmony import */ var core_js_modules_es_string_replace_all_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_all_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.typed-array.at.js */ "./node_modules/core-js/modules/es.typed-array.at.js");
/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.typed-array.find-last.js */ "./node_modules/core-js/modules/es.typed-array.find-last.js");
/* harmony import */ var core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.typed-array.find-last-index.js */ "./node_modules/core-js/modules/es.typed-array.find-last-index.js");
/* harmony import */ var core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.typed-array.set.js */ "./node_modules/core-js/modules/es.typed-array.set.js");
/* harmony import */ var core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-reversed.js */ "./node_modules/core-js/modules/es.typed-array.to-reversed.js");
/* harmony import */ var core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-sorted.js */ "./node_modules/core-js/modules/es.typed-array.to-sorted.js");
/* harmony import */ var core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.typed-array.with.js */ "./node_modules/core-js/modules/es.typed-array.with.js");
/* harmony import */ var core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_with_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-exception.stack.js */ "./node_modules/core-js/modules/web.dom-exception.stack.js");
/* harmony import */ var core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/web.url-search-params.delete.js */ "./node_modules/core-js/modules/web.url-search-params.delete.js");
/* harmony import */ var core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_delete_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/web.url-search-params.has.js */ "./node_modules/core-js/modules/web.url-search-params.has.js");
/* harmony import */ var core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_has_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/web.url-search-params.size.js */ "./node_modules/core-js/modules/web.url-search-params.size.js");
/* harmony import */ var core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_size_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var typed_vuex__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! typed-vuex */ "./node_modules/typed-vuex/dist/index.mjs");
/* harmony import */ var intrinsic_scale__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! intrinsic-scale */ "./node_modules/intrinsic-scale/dist/intrinsic-scale.common-js.js");
/* harmony import */ var intrinsic_scale__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(intrinsic_scale__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");
/* harmony import */ var _helpers_random_color__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @/helpers/random-color */ "./src/helpers/random-color.ts");
/* harmony import */ var _constants_elements__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @/constants/elements */ "./src/constants/elements.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _helpers_recursive_find_fill__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @/helpers/recursive-find-fill */ "./src/helpers/recursive-find-fill.ts");

























const USE_SCALED_DRAW = _constants__WEBPACK_IMPORTED_MODULE_20__["DRAW_SCALE"] !== 1;
function createSVGGroup(id, width = _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"], height = _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"]) {
  const svgEl = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_20__["SVG_NS"], 'g');
  svgEl.setAttribute('id', id);
  svgEl.setAttribute('x', '0');
  svgEl.setAttribute('y', '0');
  svgEl.setAttribute('width', `${width}`);
  svgEl.setAttribute('height', `${height}`);
  return svgEl;
}
const RECOVER_QUERY_ID = 'recover';
const RECOVER_QUERY_VALUE = 'true';
const RECOVER_STORAGE_ID = 'pin.recover.state';
const history = [];
const featureBase = {
  scale: _constants__WEBPACK_IMPORTED_MODULE_20__["DEFAULT_SCALE"],
  selectedAssetCol: _constants__WEBPACK_IMPORTED_MODULE_20__["DEFAULT_SELECTED_ASSET_COL"],
  selectedAssetRow: _constants__WEBPACK_IMPORTED_MODULE_20__["DEFAULT_SELECTED_ASSET_ROW"]
};
const state = () => ({
  saveStatus: null,
  undoCount: 0,
  pinContainer: null,
  features: {
    ears: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].EARS,
      container: createSVGGroup('ears'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    earrings: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].EARRINGS,
      container: createSVGGroup('earrings'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    head: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].HEAD,
      container: createSVGGroup('head'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    skin_accessories: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].SKIN_ACCESSORIES,
      container: createSVGGroup('skinAccessories'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    beard: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].BEARD,
      container: createSVGGroup('beard'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    mouth: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].MOUTH,
      container: createSVGGroup('mouth'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    eyes: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].EYES,
      container: createSVGGroup('eyes'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    eyebrows: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].EYEBROWS,
      container: createSVGGroup('eyebrows'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    hair: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].HAIR,
      container: createSVGGroup('hair'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    hands: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].HANDS,
      container: createSVGGroup('hands'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    accessories: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].ACCESSORIES,
      container: createSVGGroup('accessories'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    effect: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].EFFECT,
      container: createSVGGroup('effect'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#fff',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    },
    background: {
      ...featureBase,
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].BACKGROUND,
      container: createSVGGroup('background'),
      element: null,
      assets: [],
      selectedAsset: -1,
      hidden: false,
      color: '#2F63DF',
      position: {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      },
      rotation: 0
    }
  },
  mainFeature: {
    ...featureBase,
    name: 'main',
    container: createSVGGroup('main'),
    element: null,
    assets: [],
    selectedAsset: -1,
    hidden: false,
    color: '#fff',
    position: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: 0
    },
    rotation: 0
  },
  activeBackgroundPatternDesktop: null
});
const getters = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_17__["getterTree"])(state, {
  saveStatus: state => state.saveStatus,
  pinFeatures: state => {
    return Object.values(state.features);
  },
  activeFeature: (state, getters, rootState) => {
    return state.features[rootState.activeCategory];
  },
  selectedAsset: (state, getters) => {
    return getters.activeFeature.selectedAsset;
  },
  hasAssets: (state, getters) => {
    const feature = getters.activeFeature;
    return feature.assets.length > 1;
  },
  assetsLength: (state, getters) => {
    return getters.activeFeature.assets.length;
  },
  visible: (state, getters) => {
    const feature = getters.activeFeature;
    if (feature.hidden) {
      return false;
    }
    if (feature.assets.length === 0) return true;
    return feature.selectedAsset !== -1;
  },
  color: (state, getters) => {
    return getters.activeFeature.color;
  },
  position: (state, getters) => {
    return getters.activeFeature.position;
  },
  rotation: (state, getters) => {
    return getters.activeFeature.rotation;
  },
  scale: (state, getters) => {
    return getters.activeFeature.scale;
  }
});
const mutations = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_17__["mutationTree"])(state, {
  setSaveStatus: (state, status) => {
    state.saveStatus = status;
  },
  undo: state => {
    const prevState = history.pop();
    if (prevState) {
      Object.assign(state, prevState);
      state.undoCount = history.length;
    }
  },
  saveUndoState: state => {
    history.push(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_19___default()(state));
    state.undoCount = history.length;
  },
  setPinContainer: (state, pinContainer) => {
    state.pinContainer = pinContainer;
  },
  setActiveBackgroundPatternDesktop(state, pattern) {
    state.activeBackgroundPatternDesktop = pattern;
  },
  setSkinColor: (state, color) => {
    _constants_elements__WEBPACK_IMPORTED_MODULE_22__["SKIN_COLOR_FEATURES"].forEach(name => {
      const featureName = name;
      state.features = {
        ...state.features,
        [featureName]: {
          ...state.features[featureName],
          color: color
        }
      };
    });
  },
  setHairColor: (state, color) => {
    state.features = {
      ...state.features,
      hair: {
        ...state.features.hair,
        color: color
      }
    };
  },
  setSelectedAssetOf(state, {
    name,
    asset
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        selectedAsset: asset
      }
    };
  },
  setHiddenOf(state, {
    name,
    hidden
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        hidden
      }
    };
  },
  setColorOf(state, {
    name,
    color
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        color: color
      }
    };
  },
  setPositionOf(state, {
    name,
    x,
    y
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        position: {
          x,
          y
        }
      }
    };
  },
  setOffsetOf(state, {
    name,
    x,
    y
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        offset: {
          x,
          y
        }
      }
    };
  },
  setRotationOf(state, {
    name,
    rotation
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        rotation
      }
    };
  },
  setScalingOf(state, {
    name,
    scale
  }) {
    state.features = {
      ...state.features,
      [name]: {
        ...state.features[name],
        scale
      }
    };
  },
  setMainFeature(state, settings) {
    state.mainFeature = {
      ...state.mainFeature,
      ...settings
    };
  }
});
const actions = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_17__["actionTree"])({
  state,
  getters,
  mutations
}, {
  async initializePin({
    state,
    getters,
    commit
  }) {
    if (state.pinContainer) return state.pinContainer;
    // Create inline SVG
    const pinContainer = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_20__["SVG_NS"], 'svg'); // create a new svg element
    commit('setPinContainer', pinContainer);
    pinContainer.setAttribute('xmlns', _constants__WEBPACK_IMPORTED_MODULE_20__["SVG_NS"]); // set namespace
    pinContainer.setAttribute('version', '1.1'); // set version
    pinContainer.setAttribute('id', 'svgelement'); // set the width and height of our svg
    pinContainer.setAttribute('width', '100%'); // set the width of the element to 100%
    pinContainer.setAttribute('height', '100%'); // set the height of the element to 100%
    pinContainer.setAttribute('viewBox', '0 0 ' + _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"] + ' ' + _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"]);
    pinContainer.setAttribute('preserveAspectRatio', 'xMidYMid meet'); // set the preserveAspectRatio of the element
    pinContainer.style.transformOrigin = '0 0'; // scale from top left
    pinContainer.style.overflow = 'visible';
    // Create a wrapping group of all SVG elements for later scale manipulation
    const mainGroup = createSVGGroup('main');
    // Add dropshadow definition to SVG
    const feDropshadow = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_20__["SVG_NS"], 'feDropShadow');
    feDropshadow.setAttribute('dx', '0');
    feDropshadow.setAttribute('dy', '8');
    feDropshadow.setAttribute('stdDeviation', '0');
    feDropshadow.setAttribute('flood-color', '#000');
    feDropshadow.setAttribute('flood-opacity', '1');
    const dropshadowFilter = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_20__["SVG_NS"], 'filter');
    dropshadowFilter.setAttribute('id', 'dropshadow');
    dropshadowFilter.appendChild(feDropshadow);
    const defs = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_20__["SVG_NS"], 'defs');
    defs.appendChild(dropshadowFilter);
    if (USE_SCALED_DRAW) {
      mainGroup === null || mainGroup === void 0 || mainGroup.appendChild(defs);
    } else {
      pinContainer.appendChild(defs);
    }
    // Create head container and add to SVG
    const headContainer = createSVGGroup('head');
    headContainer.setAttribute('filter', 'url(#dropshadow)');
    if (USE_SCALED_DRAW) {
      mainGroup === null || mainGroup === void 0 || mainGroup.append(headContainer);
    } else {
      pinContainer.append(headContainer);
    }
    // Add dropshadow to hands
    state.features.hands.container.setAttribute('filter', 'url(#dropshadow)');
    // Load assets & add to SVG
    const axiosInstance = axios__WEBPACK_IMPORTED_MODULE_23___default.a.create({
      baseURL: '/'
    });
    const res = await axiosInstance.get('/' + _constants__WEBPACK_IMPORTED_MODULE_20__["PIN_ASSETS_SPRITE"]);
    // Cleans up the SVG by removing unnecessary elements
    const cleanedRes = res.data.replaceAll(/data-name="[^"]*"/gm, '');
    const parser = new DOMParser();
    const assetsDoc = parser.parseFromString(cleanedRes, 'image/svg+xml');
    getters.pinFeatures.forEach(feature => {
      var _assetsDoc$querySelec;
      const svgName = _constants_elements__WEBPACK_IMPORTED_MODULE_22__["SVG_ELEMENTS_MAP"][feature.name];
      if (!svgName) return;
      // Add to SVG
      if (_constants_elements__WEBPACK_IMPORTED_MODULE_22__["HEAD_FEATURES"].includes(feature.name)) {
        headContainer.append(feature.container);
      } else {
        if (USE_SCALED_DRAW) {
          mainGroup === null || mainGroup === void 0 || mainGroup.append(feature.container);
        } else {
          pinContainer.append(feature.container);
        }
      }
      // @ts-ignore
      feature.assets = ((_assetsDoc$querySelec = assetsDoc.querySelector(svgName)) === null || _assetsDoc$querySelec === void 0 ? void 0 : _assetsDoc$querySelec.children) || [];
    });
    if (USE_SCALED_DRAW) {
      pinContainer.append(mainGroup || '');
    }
    // Return the pinContainer so it can be added to the DOM
    return pinContainer;
  },
  savePinToLocalStorage({
    state
  }) {
    localStorage.setItem(RECOVER_STORAGE_ID, JSON.stringify(state.features));
  },
  recoverPinFromLocalStorage({
    getters,
    commit
  }) {
    return new Promise((resolve, reject) => {
      const recoverStateStorage = localStorage.getItem(RECOVER_STORAGE_ID);
      if (!recoverStateStorage) reject(new Error('No recover state found'));
      // Recover state found - Move on with parsing
      else {
        const recoverState = JSON.parse(recoverStateStorage);
        getters.pinFeatures.forEach(feature => {
          const name = feature.name;
          const recoverFeature = recoverState[name];
          commit('setHiddenOf', {
            name,
            hidden: recoverFeature.hidden
          });
          commit('setColorOf', {
            name,
            color: recoverFeature.color
          });
          commit('setPositionOf', {
            name,
            x: recoverFeature.position.x,
            y: recoverFeature.position.y
          });
          commit('setOffsetOf', {
            name,
            x: recoverFeature.offset.x,
            y: recoverFeature.offset.y
          });
          commit('setRotationOf', {
            name,
            rotation: recoverFeature.rotation
          });
          commit('setScalingOf', {
            name,
            scale: recoverFeature.scale
          });
          commit('setSelectedAssetOf', {
            name,
            asset: recoverFeature.selectedAsset
          });
        });
        localStorage.removeItem(RECOVER_STORAGE_ID);
        resolve();
      }
    });
  },
  savePin({
    state,
    commit,
    dispatch
  }) {
    commit('setSaveStatus', _constants__WEBPACK_IMPORTED_MODULE_20__["API_STATUS_PENDING"]);
    const data = JSON.parse(JSON.stringify(state.features));
    // Add main node settings
    const mainNodeData = JSON.parse(JSON.stringify(state.mainFeature));
    data.main = mainNodeData;
    // Add background settings
    if (state.activeBackgroundPatternDesktop) {
      const src = state.activeBackgroundPatternDesktop.src;
      const filename = src.split('/').pop();
      data.backgroundPattern = filename;
    }
    if (data.background.hidden) {
      data.background.color = _constants__WEBPACK_IMPORTED_MODULE_20__["DEFAULT_PIN_BACKGROUND_COLOR"];
      data.background.hidden = false;
    }
    return axios__WEBPACK_IMPORTED_MODULE_23___default.a.post('/pins', data).then(response => {
      commit('setSaveStatus', _constants__WEBPACK_IMPORTED_MODULE_20__["API_STATUS_SUCCESS"]);
      // Update user profile image with saved pin
      return dispatch('getUploadPinBlob');
    }).then(response => {
      dispatch('user/setUpdatedProfileImage', response, {
        root: true
      });
      return Promise.resolve();
    }).catch(error => {
      commit('setSaveStatus', _constants__WEBPACK_IMPORTED_MODULE_20__["API_STATUS_FAILURE"]);
      return Promise.reject(error);
    });
  },
  randomizePin({
    state,
    getters,
    commit,
    dispatch
  }) {
    // Reset to initial values
    getters.pinFeatures.forEach(feature => {
      const name = feature.name;
      commit('setHiddenOf', {
        name,
        hidden: true
      }); // commit('setHiddenOf', { name, hidden: false })
      commit('setColorOf', {
        name,
        color: '#fff'
      });
      commit('setPositionOf', {
        name,
        x: 0,
        y: 0
      });
      commit('setOffsetOf', {
        name,
        x: 0,
        y: 0
      });
      commit('setRotationOf', {
        name,
        rotation: 0
      });
      commit('setScalingOf', {
        name,
        scale: _constants__WEBPACK_IMPORTED_MODULE_20__["DEFAULT_SCALE"]
      });
    });
    // Random colors
    commit('setSkinColor', Object(_helpers_random_color__WEBPACK_IMPORTED_MODULE_21__["default"])());
    commit('setHairColor', Object(_helpers_random_color__WEBPACK_IMPORTED_MODULE_21__["default"])());
    commit('setColorOf', {
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].BACKGROUND,
      color: Object(_helpers_random_color__WEBPACK_IMPORTED_MODULE_21__["default"])()
    });
    commit('setColorOf', {
      name: _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].BEARD,
      color: Object(_helpers_random_color__WEBPACK_IMPORTED_MODULE_21__["default"])()
    });
    // Randomize features
    getters.pinFeatures.forEach(feature => {
      // When feature only has 2 assets, decrease the chance of showing that feature
      const chance = feature.assets.length > 2 ? 0.65 : 0.2;
      const mustHave = _constants_elements__WEBPACK_IMPORTED_MODULE_22__["RANDOMIZE_MUST_HAVE_FEATURES"].includes(feature.name);
      const addFeature = mustHave ? true : Math.random() < chance;
      const randomAssetNr = Math.round(Math.random() * (feature.assets.length - 1));
      // Fix for correct initial hidden flag
      commit('setSelectedAssetOf', {
        name: feature.name,
        asset: addFeature ? randomAssetNr : 0
      });
      commit('setHiddenOf', {
        name: feature.name,
        hidden: !addFeature
      });
    });
    // Make sure features have the correct offset after randomize
    getters.pinFeatures.forEach(feature => {
      dispatch('updateFeatureOffset', feature);
    });
  },
  undo({
    state,
    commit,
    dispatch
  }) {
    commit('undo');
    // Re-add element because undo loses reference to feature.element
    dispatch('removeFeatureElement', state.features.beard);
    dispatch('addFeatureElement', state.features.beard);
  },
  nextAsset({
    commit,
    state,
    getters
  }) {
    const {
      activeFeature
    } = getters;
    commit('saveUndoState');
    if (activeFeature.hidden) {
      commit('setHiddenOf', {
        name: activeFeature.name,
        hidden: false
      });
    }
    commit('setSelectedAssetOf', {
      name: activeFeature.name,
      asset: activeFeature.selectedAsset >= activeFeature.assets.length - 1 ? 0 : activeFeature.selectedAsset + 1
    });
  },
  prevAsset({
    commit,
    state,
    getters
  }) {
    const {
      activeFeature
    } = getters;
    commit('saveUndoState');
    if (activeFeature.hidden) {
      commit('setHiddenOf', {
        name: activeFeature.name,
        hidden: false
      });
    }
    commit('setSelectedAssetOf', {
      name: activeFeature.name,
      asset: activeFeature.selectedAsset <= 0 ? activeFeature.assets.length - 1 : activeFeature.selectedAsset - 1
    });
  },
  toggleAsset({
    commit,
    state,
    getters
  }) {
    const {
      activeFeature
    } = getters;
    commit('saveUndoState');
    if (activeFeature.selectedAsset === -1 && activeFeature.assets.length > 0) {
      commit('setSelectedAssetOf', {
        name: activeFeature.name,
        asset: 0
      });
    } else {
      commit('setHiddenOf', {
        name: activeFeature.name,
        hidden: !activeFeature.hidden
      });
    }
  },
  removeFeatureElement({
    state
  }, feature) {
    Array.from(feature.container.children).forEach(child => child.remove());
    feature.element = null;
  },
  async addFeatureElement({
    dispatch
  }, feature) {
    // Create copy of asset and add it to the SVG
    const element = feature.assets[feature.selectedAsset].cloneNode(true);
    feature.element = element;
    feature.container.append(element);
    // Set element so its in view (tilemap)
    const bb = feature.element.getBBox();
    const col = Math.floor(bb.x / _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"]) * _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"] + 0;
    const row = Math.floor(bb.y / _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"]) * _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"] + 0;
    feature.element.setAttribute('transform', `translate(${-col}, ${-row})`);
    feature.selectedAssetCol = col;
    feature.selectedAssetRow = row;
    dispatch('updateFeatureOffset', feature);
    dispatch('applyElementColor', {
      feature
    });
  },
  updateFeatureOffset({
    state
  }, feature) {
    const featureBBox = feature.container.getBBox();
    // Get how much user has moved
    const moved = {
      x: feature.position.x - feature.offset.x,
      y: feature.position.y - feature.offset.y
    };
    // Save offset, how much SVG is moved from top left corner
    feature.offset = {
      x: featureBBox.x + featureBBox.width / 2,
      y: featureBBox.y + featureBBox.height / 2
    };
    // Set new position
    feature.position = {
      x: Math.max(Math.min(feature.offset.x + moved.x, _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"]), 0),
      y: Math.max(Math.min(feature.offset.y + moved.y, _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"]), 0)
    };
  },
  applyElementColor({
    state
  }, {
    feature,
    prevColor = '#fff'
  }) {
    if (!feature.element) return;
    Object(_helpers_recursive_find_fill__WEBPACK_IMPORTED_MODULE_24__["default"])(feature.element, prevColor, feature.color);
  },
  setPosition({
    commit,
    getters
  }, {
    x,
    y
  }) {
    const {
      activeFeature
    } = getters;
    commit('setPositionOf', {
      name: activeFeature.name,
      x,
      y
    });
  },
  setColor({
    commit,
    state,
    getters
  }, color) {
    const {
      activeFeature
    } = getters;
    if (activeFeature.name === _constants_elements__WEBPACK_IMPORTED_MODULE_22__["Categories"].HAIR) {
      commit('setHairColor', color);
      return;
    }
    if (_constants_elements__WEBPACK_IMPORTED_MODULE_22__["SKIN_COLOR_FEATURES"].includes(activeFeature.name)) {
      commit('setSkinColor', color);
      return;
    }
    commit('setColorOf', {
      name: activeFeature.name,
      color: color
    });
  },
  setRotation({
    commit,
    state,
    getters
  }, rotation) {
    const {
      activeFeature
    } = getters;
    commit('setRotationOf', {
      name: activeFeature.name,
      rotation
    });
  },
  setScale({
    commit,
    state,
    getters
  }, scale) {
    const {
      activeFeature
    } = getters;
    commit('setScalingOf', {
      name: activeFeature.name,
      scale
    });
  },
  getClonedPinSVG({
    state
  }) {
    if (!state.pinContainer) return;
    const pin = state.pinContainer.cloneNode(true);
    pin.setAttribute('width', _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"] + '');
    pin.setAttribute('height', _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"] + '');
    return pin;
  },
  async getDownloadPinBlob({
    dispatch
  }) {
    const svg = await dispatch('getClonedPinSVG');
    // Apply draw scale to the main container group of the SVG before print
    if (USE_SCALED_DRAW) {
      const mainGroup = svg.getElementsByTagName('g')[0];
      mainGroup.setAttribute('transform-origin', `${_constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"] / 2} ${_constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"] / 2}`);
      mainGroup.setAttribute('transform', `scale(${_constants__WEBPACK_IMPORTED_MODULE_20__["DRAW_SCALE"]})`);
    }
    const blob = await dispatch('getPinBlob', svg);
    return blob;
  },
  async getUploadPinBlob({
    state,
    dispatch,
    commit
  }) {
    const svg = await dispatch('getClonedPinSVG');
    // Calculate vertical center based on head size
    if (_constants__WEBPACK_IMPORTED_MODULE_20__["CENTER_ALIGN_UPLOAD_PIN"]) {
      // Hide all head elements with hidden flag
      let countHiddenHeadElements = 0;
      let feature;
      for (const featureKey in state.features) {
        feature = state.features[featureKey];
        if (_constants_elements__WEBPACK_IMPORTED_MODULE_22__["HEAD_FEATURES"].includes(feature.name) && feature.hidden) {
          feature.container.setAttribute('display', 'none');
          countHiddenHeadElements++;
        }
      }
      // Check if all head elements are hidden
      const isAllHeadElementsHidden = _constants_elements__WEBPACK_IMPORTED_MODULE_22__["HEAD_FEATURES"].length === countHiddenHeadElements;
      // Calculate (only if at least one head element is visible)
      if (!isAllHeadElementsHidden) {
        const headElm = document.querySelector('#head');
        const headElmBox = headElm.getBBox();
        const offsetY = (_constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"] - headElmBox.height) * 0.5 - headElmBox.y;
        // Save settings for later use when sending recipe to backend
        commit('setMainFeature', {
          position: {
            x: 0,
            y: offsetY
          },
          scale: _constants__WEBPACK_IMPORTED_MODULE_20__["UPLOAD_PIN_SCALE"]
        });
        const mainGroup = svg.getElementsByTagName('g')[0];
        mainGroup.setAttribute('transform-origin', `${_constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"] / 2} ${_constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"] / 2}`);
        mainGroup.setAttribute('transform-box', 'view-box');
        mainGroup.setAttribute('transform', `translate(0 ${offsetY}) scale(${_constants__WEBPACK_IMPORTED_MODULE_20__["UPLOAD_PIN_SCALE"]})`);
      }
      // Restore hidden head elements
      for (const featureKey in state.features) {
        feature = state.features[featureKey];
        if (_constants_elements__WEBPACK_IMPORTED_MODULE_22__["HEAD_FEATURES"].includes(feature.name) && feature.hidden) {
          feature.container.removeAttribute('display');
        }
      }
    }
    const blob = await dispatch('getPinBlob', svg);
    return blob;
  },
  async getPinBlob({
    state
  }, svg) {
    /**
     * Create pin image
     */
    const pin = svg;
    const pinImage = new Image();
    pinImage.src = URL.createObjectURL(new Blob([pin.outerHTML], {
      type: 'image/svg+xml'
    }));
    await new Promise((resolve, reject) => {
      pinImage.onload = () => resolve(true);
      pinImage.onerror = () => reject(new Error());
    });
    /**
     * Create canvas to render SVG pin & background in
     */
    const scale = 1024 / _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"];
    const canvas = document.createElement('canvas');
    canvas.style.transformOrigin = '0 0'; // scale from top left
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d', {
      alpha: true
    });
    ctx.scale(scale, scale);
    /**
     * Draw gradient
     */
    if (!state.features.background.hidden) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const gradient = ctx.createRadialGradient(512 / scale, 512 / scale, 75, 512 / scale, 512 / scale, 250);
      gradient.addColorStop(0, state.features.background.color + '40');
      gradient.addColorStop(0.5, state.features.background.color + '99');
      gradient.addColorStop(1, state.features.background.color);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    /**
     * Draw SVG pin & background
     */
    const drawPinInCanvas = () => {
      ctx.drawImage(pinImage, 0, 0, _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_WIDTH"], _constants__WEBPACK_IMPORTED_MODULE_20__["GAME_HEIGHT"]);
    };
    if (state.activeBackgroundPatternDesktop) {
      const bgImage = new Image();
      bgImage.src = state.activeBackgroundPatternDesktop.src;
      await new Promise(resolve => bgImage.onload = () => resolve(true));
      const {
        width,
        height,
        x,
        y
      } = Object(intrinsic_scale__WEBPACK_IMPORTED_MODULE_18__["cover"])(ctx.canvas.width, ctx.canvas.height, bgImage.width, bgImage.height);
      ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, x, y, width, height);
      drawPinInCanvas();
      bgImage.remove();
    } else {
      drawPinInCanvas();
    }
    // Create base64 data
    const data = canvas.toDataURL();
    // Cleanup
    pin.remove();
    canvas.remove();
    return data;
  },
  async downloadPin({
    state,
    dispatch
  }) {
    const data = await dispatch('getDownloadPinBlob');
    /**
     * Create actual download link
     */
    // Define fallback download method
    const link = document.createElement('a');
    const makeDownload = () => {
      link.download = 'pin.png';
      link.href = data;
      link.innerHTML = 'Download PNG';
      link.click();
    };
    // Create a file from the base64 data
    const arr = data.split(',');
    // @ts-ignore: Array is possible null
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // Create files array for native share
    const files = [new File([u8arr], 'pin.png', {
      type: mime,
      lastModified: new Date().getTime()
    })];
    const mobileRegexp = /android|iphone|kindle|ipad/i;
    const isMobile = mobileRegexp.test(navigator.userAgent);
    const canUseNativeShare = isMobile && navigator.canShare && navigator.canShare({
      files
    });
    // Try native share or fallback to download method
    if (canUseNativeShare) {
      try {
        navigator.share({
          files,
          title: 'Brawl Stars Pin Maker',
          text: 'Download your Brawl Stars pin!'
        });
      } catch (error) {
        // Fallback to download method
      }
      // Detect if iOS and run pin storage
      if (window && /iP(ad|od|hone)/i.test(window.navigator.userAgent)) {
        localStorage.setItem(RECOVER_STORAGE_ID, JSON.stringify(state.features));
        window.location.href = `${window.location.pathname}?${RECOVER_QUERY_ID}=${RECOVER_QUERY_VALUE}`;
      }
    } else {
      makeDownload();
    }
    /**
     * Cleanup
     */
    link.remove();
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions
});

/***/ }),

/***/ "./src/stores/store.ts":
/*!*****************************!*\
  !*** ./src/stores/store.ts ***!
  \*****************************/
/*! exports provided: typedStore, mapper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typedStore", function() { return typedStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapper", function() { return mapper; });
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var typed_vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typed-vuex */ "./node_modules/typed-vuex/dist/index.mjs");
/* harmony import */ var _stores_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/stores/auth */ "./src/stores/auth.ts");
/* harmony import */ var _stores_user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/stores/user */ "./src/stores/user.ts");
/* harmony import */ var _stores_pin_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/stores/pin-store */ "./src/stores/pin-store.ts");
/* harmony import */ var _constants_elements__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/constants/elements */ "./src/constants/elements.ts");
/* harmony import */ var _helpers_random_enum_item__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/helpers/random-enum-item */ "./src/helpers/random-enum-item.ts");
/* harmony import */ var _config_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/config/i18n */ "./src/config/i18n.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/router */ "./src/router/index.ts");












vue__WEBPACK_IMPORTED_MODULE_2__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_3__["default"]);
const APP_RECOVER_STORAGE_ID = 'app.recover.state';
var EditMode;
(function (EditMode) {
  EditMode["ACTIONS"] = "actions";
  EditMode["MOVE"] = "move";
  EditMode["ROTATE"] = "rotate";
  EditMode["SCALE"] = "scale";
  EditMode["PICKING_COLOR"] = "picking-color";
  EditMode["DOWNLOAD"] = "download";
  EditMode["UPLOAD"] = "upload";
})(EditMode || (EditMode = {}));
const state = () => ({
  footerVisible: false,
  editMode: EditMode.ACTIONS,
  categoryMenuOpen: false,
  activeCategory: Object(_helpers_random_enum_item__WEBPACK_IMPORTED_MODULE_9__["default"])(_constants_elements__WEBPACK_IMPORTED_MODULE_8__["Categories"]),
  isLandscape: false,
  isTablet: false,
  isDesktop: false,
  controlsScale: 1,
  previewBox: false,
  uploadTooltip: window.localStorage.getItem('uploadTooltip') !== '0'
});
const getters = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_4__["getterTree"])(state, {
  editing: state => state.editMode !== EditMode.DOWNLOAD && state.editMode !== EditMode.UPLOAD,
  moving: state => state.editMode === EditMode.MOVE,
  rotating: state => state.editMode === EditMode.ROTATE,
  scaling: state => state.editMode === EditMode.SCALE,
  pickingColor: state => state.editMode === EditMode.PICKING_COLOR,
  interacting: state => state.editMode === EditMode.MOVE || state.editMode === EditMode.ROTATE || state.editMode === EditMode.SCALE || state.editMode === EditMode.PICKING_COLOR,
  downloading: state => state.editMode === EditMode.DOWNLOAD,
  uploading: state => state.editMode === EditMode.UPLOAD,
  colorPickerSupported(state) {
    return _constants_elements__WEBPACK_IMPORTED_MODULE_8__["COLORING_FEATURES"].includes(state.activeCategory);
  },
  previewBox: (state, getters) => {
    return state.previewBox;
  },
  uploadTooltip: state => state.uploadTooltip
});
const mutations = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_4__["mutationTree"])(state, {
  setControlsScale(state, scale) {
    state.controlsScale = scale;
  },
  setCategoryMenuOpen(state, open) {
    state.categoryMenuOpen = open;
  },
  setActiveCategory(state, category) {
    state.activeCategory = category;
  },
  showFooter(state, open) {
    state.footerVisible = open;
  },
  setEditMode(state, mode) {
    state.editMode = mode;
  },
  setIsLandscape(state, isLandscape) {
    state.isLandscape = isLandscape;
  },
  setIsTablet(state, isTablet) {
    state.isTablet = isTablet;
  },
  setIsDesktop(state, isDesktop) {
    state.isDesktop = isDesktop;
  },
  setPreviewBox(state, show) {
    state.previewBox = show;
  },
  setUploadTooltip(state, show) {
    state.uploadTooltip = show;
    if (!show) {
      window.localStorage.setItem('uploadTooltip', '0');
    } else {
      window.localStorage.removeItem('uploadTooltip');
    }
  }
});
const actions = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_4__["actionTree"])({
  state,
  getters,
  mutations
}, {
  saveAppStateToLocalStorage({
    state,
    getters,
    dispatch
  }) {
    // App
    const appState = {
      locale: _config_i18n__WEBPACK_IMPORTED_MODULE_10__["i18n"].locale,
      editMode: state.editMode
    };
    window.localStorage.setItem(APP_RECOVER_STORAGE_ID, JSON.stringify(appState));
    // Pin
    dispatch('pin/savePinToLocalStorage', null, {
      root: true
    });
  },
  loadAppStateFromLocalStorage({
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      // Load pin
      dispatch('pin/recoverPinFromLocalStorage', null, {
        root: true
      }).then(() => {
        // Load app state
        const recoverStateStorage = localStorage.getItem(APP_RECOVER_STORAGE_ID);
        if (!recoverStateStorage) reject(new Error('No saved app state found'));
        // Saved app state found - Move on with parsing
        else {
          const recoverState = JSON.parse(recoverStateStorage);
          // Set locale
          _router__WEBPACK_IMPORTED_MODULE_11__["default"].push({
            path: recoverState.locale
          }).catch(() => {});
          // Set edit mode
          if (recoverState.editMode) dispatch('setEditMode', recoverState.editMode);
        }
        window.localStorage.removeItem(APP_RECOVER_STORAGE_ID);
        resolve();
      }).catch(() => {
        reject(new Error('Failed to load app state'));
      });
    });
  },
  setActiveCategory({
    commit
  }, category) {
    commit('setActiveCategory', category);
    commit('setCategoryMenuOpen', false);
  },
  showFooter({
    commit
  }, show) {
    commit('showFooter', show);
  },
  setEditMode({
    commit
  }, editMode) {
    commit('setEditMode', editMode);
  },
  setMoving({
    commit
  }, moving) {
    commit('setEditMode', moving ? EditMode.MOVE : EditMode.ACTIONS);
  },
  setRotating({
    commit
  }, rotating) {
    commit('setEditMode', rotating ? EditMode.ROTATE : EditMode.ACTIONS);
  },
  setScaling({
    commit
  }, scaling) {
    commit('setEditMode', scaling ? EditMode.SCALE : EditMode.ACTIONS);
  },
  setPickingColor({
    commit
  }, pickingColor) {
    commit('setEditMode', pickingColor ? EditMode.PICKING_COLOR : EditMode.ACTIONS);
  },
  finishEditingDownload({
    commit
  }, finished) {
    commit('setEditMode', finished ? EditMode.DOWNLOAD : EditMode.ACTIONS);
  },
  finishEditingUpload({
    commit
  }, finished) {
    commit('setEditMode', finished ? EditMode.UPLOAD : EditMode.ACTIONS);
  },
  showPreviewBox({
    commit
  }, show) {
    commit('setPreviewBox', show);
  },
  showUploadTooltip({
    commit
  }, show) {
    commit('setUploadTooltip', show);
  }
});
const storePattern = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    pin: _stores_pin_store__WEBPACK_IMPORTED_MODULE_7__["default"],
    auth: _stores_auth__WEBPACK_IMPORTED_MODULE_5__["default"],
    user: _stores_user__WEBPACK_IMPORTED_MODULE_6__["default"]
  }
};
// Exports
const store = new vuex__WEBPACK_IMPORTED_MODULE_3__["default"].Store(storePattern);
const typedStore = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_4__["useAccessor"])(store, storePattern);
const mapper = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_4__["createMapper"])(typedStore);
vue__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.$typedStore = typedStore;
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./src/stores/user.ts":
/*!****************************!*\
  !*** ./src/stores/user.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typed_vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typed-vuex */ "./node_modules/typed-vuex/dist/index.mjs");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants */ "./src/constants/index.ts");



const state = () => ({
  getStatus: null,
  userId: window.localStorage.getItem('userId') || '',
  username: '',
  profileImage: '',
  profileImageUploadCooldown: 0,
  updatedProfileImage: ''
});
const getters = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_0__["getterTree"])(state, {
  getStatus: state => state.getStatus,
  userId: state => state.userId,
  isLoggedIn: state => state.userId !== '',
  isUploadCooldown: state => state.profileImageUploadCooldown > 0
});
const mutations = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_0__["mutationTree"])(state, {
  setGetStatus: (state, status) => {
    state.getStatus = status;
  },
  setUserId: (state, userId) => {
    state.userId = userId;
    if (userId !== '') {
      window.localStorage.setItem('userId', userId);
    } else {
      window.localStorage.removeItem('userId');
    }
  },
  setUsername: (state, username) => {
    state.username = username;
  },
  setProfileImage: (state, profileImage) => {
    state.profileImage = profileImage;
  },
  setUpdatedProfileImage: (state, profileImage) => {
    state.updatedProfileImage = profileImage;
  },
  setProfileImageUploadCooldown: (state, cooldown) => {
    state.profileImageUploadCooldown = cooldown;
  }
});
const actions = Object(typed_vuex__WEBPACK_IMPORTED_MODULE_0__["actionTree"])({
  state,
  getters,
  mutations
}, {
  getUser({
    commit,
    rootGetters
  }) {
    commit('setGetStatus', _constants__WEBPACK_IMPORTED_MODULE_2__["API_STATUS_PENDING"]);
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/users/me').then(response => {
      commit('setGetStatus', _constants__WEBPACK_IMPORTED_MODULE_2__["API_STATUS_SUCCESS"]);
      commit('setUserId', response.data.userId);
      commit('setUsername', response.data.username);
      commit('setProfileImage', response.data.profileImage);
      commit('setProfileImageUploadCooldown', response.data.profileImageUploadCooldown);
      return Promise.resolve(response);
    }).catch(error => {
      commit('setGetStatus', _constants__WEBPACK_IMPORTED_MODULE_2__["API_STATUS_FAILURE"]);
      return Promise.reject(error);
    });
  },
  setUserId({
    commit
  }, userId) {
    commit('setUserId', userId);
  },
  setUsername({
    commit
  }, username) {
    commit('setUsername', username);
  },
  setProfileImage({
    commit
  }, profileImage) {
    commit('setProfileImage', profileImage);
  },
  setUpdatedProfileImage({
    commit
  }, profileImage) {
    commit('setUpdatedProfileImage', profileImage);
  },
  setProfileImageUploadCooldown({
    commit
  }, cooldown) {
    commit('setProfileImageUploadCooldown', cooldown);
  },
  clear: ({
    commit
  }) => {
    commit('setUserId', '');
    commit('setUsername', '');
    commit('setProfileImage', '');
    commit('setProfileImageUploadCooldown', 0);
  }
});
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions
});

/***/ }),

/***/ 0:
/*!**********************************************************************************************!*\
  !*** multi ./node_modules/@sentry/webpack-plugin/src/sentry-webpack.module.js ./src/main.ts ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/runner/work/pinmaker/pinmaker/frontend/node_modules/@sentry/webpack-plugin/src/sentry-webpack.module.js */"./node_modules/@sentry/webpack-plugin/src/sentry-webpack.module.js");
module.exports = __webpack_require__(/*! ./src/main.ts */"./src/main.ts");


/***/ })

/******/ });
//# sourceMappingURL=app.js.map