/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CanvasesManager.ts":
/*!********************************!*\
  !*** ./src/CanvasesManager.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _getPageBrowserHeight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPageBrowserHeight */ \"./src/getPageBrowserHeight.ts\");\n\r\nclass CanvasesManager {\r\n    constructor() {\r\n        this.canvases = {};\r\n    }\r\n    hasUrl(url) {\r\n        return !!this.canvases[url];\r\n    }\r\n    async getCanvas(url) {\r\n        if (!this.canvases[url])\r\n            await this.addCanvas(url);\r\n    }\r\n    async addCanvas(url) {\r\n        const pageBrowserheight = await Object(_getPageBrowserHeight__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(url);\r\n        console.log(`${url}의 페이지 길이 : ${pageBrowserheight}px`);\r\n        //this.canvases[domainName] = new Canvas()\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasesManager);\r\n\n\n//# sourceURL=webpack:///./src/CanvasesManager.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/*! exports provided: browserWidth, browserHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"browserWidth\", function() { return browserWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"browserHeight\", function() { return browserHeight; });\nconst browserWidth = 1920;\r\nconst browserHeight = 1080;\r\n\n\n//# sourceURL=webpack:///./src/consts.ts?");

/***/ }),

/***/ "./src/getPageBrowserHeight.ts":
/*!*************************************!*\
  !*** ./src/getPageBrowserHeight.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var selenium_webdriver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! selenium-webdriver */ \"selenium-webdriver\");\n/* harmony import */ var selenium_webdriver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(selenium_webdriver__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n\r\n\r\nfunction sleep(ms) {\r\n    return new Promise(solve => {\r\n        setTimeout(solve, ms);\r\n    });\r\n}\r\nasync function getPageBrowserHeight(url) {\r\n    console.log(\"-\");\r\n    const driver = await new selenium_webdriver__WEBPACK_IMPORTED_MODULE_0__[\"Builder\"]().forBrowser(\"chrome\").build();\r\n    console.log(\"-\");\r\n    await driver.get(url);\r\n    console.log(\"-\");\r\n    await driver.manage().window().setSize(_consts__WEBPACK_IMPORTED_MODULE_1__[\"browserWidth\"], _consts__WEBPACK_IMPORTED_MODULE_1__[\"browserHeight\"]);\r\n    console.log(\"-\");\r\n    await sleep(500);\r\n    return await driver.executeScript(\"return window.innerHeight\");\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (getPageBrowserHeight);\r\n\n\n//# sourceURL=webpack:///./src/getPageBrowserHeight.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _CanvasesManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CanvasesManager */ \"./src/CanvasesManager.ts\");\n\r\n\r\n\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\r\nconst server = http__WEBPACK_IMPORTED_MODULE_1___default.a.createServer(app);\r\nconst io = socket_io__WEBPACK_IMPORTED_MODULE_2___default()(server);\r\nconst canvasesManager = new _CanvasesManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\r\nio.on(\"connection\", socket => {\r\n    console.log(\"소켓만들어짐\");\r\n    socket.on(\"ping\", _ => {\r\n        console.log(\"핑옴\");\r\n        socket.emit(\"pong\", \"HI\");\r\n    });\r\n});\r\nserver.listen(80, () => {\r\n    console.log(\"서버 돌림\");\r\n});\r\ncanvasesManager.getCanvas(\"https://www.naver.com/\");\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "selenium-webdriver":
/*!*************************************!*\
  !*** external "selenium-webdriver" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"selenium-webdriver\");\n\n//# sourceURL=webpack:///external_%22selenium-webdriver%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });