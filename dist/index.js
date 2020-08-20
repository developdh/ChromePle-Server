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

/***/ "./src/classes/CanvasManager.ts":
/*!**************************************!*\
  !*** ./src/classes/CanvasManager.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! canvas */ \"canvas\");\n/* harmony import */ var canvas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(canvas__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_getPageBrowserHeight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getPageBrowserHeight */ \"./src/utils/getPageBrowserHeight.ts\");\n/* harmony import */ var _consts_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consts/consts */ \"./src/consts/consts.ts\");\n/* harmony import */ var _db_canvasDB__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../db/canvasDB */ \"./src/db/canvasDB.ts\");\n\r\n\r\n\r\n\r\nclass CanvasesManager {\r\n    constructor() {\r\n        this.canvases = {};\r\n        this.canvasIntervals = {};\r\n    }\r\n    hasUrl(url) {\r\n        return !!this.canvases[url];\r\n    }\r\n    async getCanvas(url) {\r\n        if (!this.canvases[url])\r\n            await this.addCanvas(url);\r\n        const canvas = this.canvases[url];\r\n        if (!this.canvasIntervals[url])\r\n            this.registerCanvas(url, canvas);\r\n        return canvas;\r\n    }\r\n    async addCanvas(url) {\r\n        const pageBrowserWidth = _consts_consts__WEBPACK_IMPORTED_MODULE_2__[\"browserWidth\"];\r\n        const pageBrowserHeight = await Object(_utils_getPageBrowserHeight__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(url);\r\n        const canvas = this.canvases[url] = new canvas__WEBPACK_IMPORTED_MODULE_0__[\"Canvas\"](pageBrowserWidth, pageBrowserHeight);\r\n        if (await Object(_db_canvasDB__WEBPACK_IMPORTED_MODULE_3__[\"checkCanvasExists\"])(url)) {\r\n            const context = canvas.getContext(\"2d\");\r\n            const image = await Object(canvas__WEBPACK_IMPORTED_MODULE_0__[\"loadImage\"])(await Object(_db_canvasDB__WEBPACK_IMPORTED_MODULE_3__[\"getCanvasData\"])(url));\r\n            if (image.height > canvas.height)\r\n                canvas.height = image.height;\r\n            context.drawImage(image, 0, 0);\r\n        }\r\n        ;\r\n    }\r\n    async unuseCanvas(url) {\r\n        const canvas = this.canvases[url];\r\n        delete this.canvases[url];\r\n        await Object(_db_canvasDB__WEBPACK_IMPORTED_MODULE_3__[\"saveCanvasData\"])(url, canvas.toBuffer());\r\n        this.unregisterCanvas(url);\r\n    }\r\n    registerCanvas(url, canvas) {\r\n        this.canvasIntervals[url] = setInterval(async () => {\r\n            await Object(_db_canvasDB__WEBPACK_IMPORTED_MODULE_3__[\"saveCanvasData\"])(url, await new Promise((solve, reject) => {\r\n                canvas.toBuffer((err, result) => {\r\n                    if (err)\r\n                        reject(err);\r\n                    else\r\n                        solve(result);\r\n                });\r\n            }));\r\n        }, 10000);\r\n    }\r\n    unregisterCanvas(url) {\r\n        clearInterval(this.canvasIntervals[url]);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasesManager);\r\n\n\n//# sourceURL=webpack:///./src/classes/CanvasManager.ts?");

/***/ }),

/***/ "./src/consts/consts.ts":
/*!******************************!*\
  !*** ./src/consts/consts.ts ***!
  \******************************/
/*! exports provided: browserWidth, browserHeight, availableUrls, canvasDBPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"browserWidth\", function() { return browserWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"browserHeight\", function() { return browserHeight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"availableUrls\", function() { return availableUrls; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvasDBPath\", function() { return canvasDBPath; });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst browserWidth = 1920;\r\nconst browserHeight = 1080;\r\nconst availableUrls = [\"www.naver.com\", \"www.google.com\"];\r\nconst canvasDBPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(__dirname, \"../db/canvas/\");\r\n\n\n//# sourceURL=webpack:///./src/consts/consts.ts?");

/***/ }),

/***/ "./src/db/canvasDB.ts":
/*!****************************!*\
  !*** ./src/db/canvasDB.ts ***!
  \****************************/
/*! exports provided: checkCanvasExists, getCanvasData, saveCanvasData, deleteCanvasData, getCanvasNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkCanvasExists\", function() { return checkCanvasExists; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCanvasData\", function() { return getCanvasData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveCanvasData\", function() { return saveCanvasData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteCanvasData\", function() { return deleteCanvasData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCanvasNames\", function() { return getCanvasNames; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _consts_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consts/consts */ \"./src/consts/consts.ts\");\n\r\n\r\n\r\nfunction escapeUrl(url) {\r\n    return url;\r\n}\r\nfunction toFilename(url) {\r\n    return `${escapeUrl(url)}.png`;\r\n}\r\nasync function checkCanvasExists(url) {\r\n    return (await fs__WEBPACK_IMPORTED_MODULE_0___default.a.promises.readdir(_consts_consts__WEBPACK_IMPORTED_MODULE_2__[\"canvasDBPath\"])).includes(toFilename(url));\r\n}\r\nasync function getCanvasData(url) {\r\n    return await fs__WEBPACK_IMPORTED_MODULE_0___default.a.promises.readFile(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(_consts_consts__WEBPACK_IMPORTED_MODULE_2__[\"canvasDBPath\"], toFilename(url)));\r\n}\r\nasync function saveCanvasData(url, data) {\r\n    await fs__WEBPACK_IMPORTED_MODULE_0___default.a.promises.writeFile(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(_consts_consts__WEBPACK_IMPORTED_MODULE_2__[\"canvasDBPath\"], toFilename(url)), data);\r\n}\r\nasync function deleteCanvasData(url) {\r\n    await fs__WEBPACK_IMPORTED_MODULE_0___default.a.promises.unlink(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(_consts_consts__WEBPACK_IMPORTED_MODULE_2__[\"canvasDBPath\"], toFilename(url)));\r\n}\r\nasync function getCanvasNames() {\r\n    return await fs__WEBPACK_IMPORTED_MODULE_0___default.a.promises.readdir(_consts_consts__WEBPACK_IMPORTED_MODULE_2__[\"canvasDBPath\"]);\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/db/canvasDB.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _socketIo_socketIoServer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socketIo/socketIoServer */ \"./src/socketIo/socketIoServer.ts\");\n/* harmony import */ var _classes_CanvasManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/CanvasManager */ \"./src/classes/CanvasManager.ts\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\nconst canvasManager = new _classes_CanvasManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\r\nconst server = http__WEBPACK_IMPORTED_MODULE_1___default.a.createServer(app);\r\nconst io = Object(_socketIo_socketIoServer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(server, canvasManager);\r\n// FOR TEST\r\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_4___default.a.resolve(__dirname, \"../static/\")));\r\nserver.listen(80, () => {\r\n    console.log(\"[express] 서버 돌림\");\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/socketIo/socketIoServer.ts":
/*!****************************************!*\
  !*** ./src/socketIo/socketIoServer.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _consts_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts/consts */ \"./src/consts/consts.ts\");\n\r\n\r\nfunction rgbToRGB(rgb) {\r\n    return [rgb >> 4 * 2 * 2, (rgb >> 4 * 2 * 1) % (16 ** 2), rgb % (16 ** 2)];\r\n}\r\nfunction hasUrlRoom(socket) {\r\n    return Object.keys(socket.rooms).some((roomName) => roomName.startsWith(\"URL_\"));\r\n}\r\nfunction getUrlRoomName(socket) {\r\n    return Object.keys(socket.rooms).find((roomName) => roomName.startsWith(\"URL_\"));\r\n}\r\nfunction socketIoServer(server, canvasManager) {\r\n    const io = socket_io__WEBPACK_IMPORTED_MODULE_0___default()(server);\r\n    io.on(\"connection\", socket => {\r\n        console.log(\"[socket.io] 소켓만들어짐\");\r\n        socket.on(\"setUrl\", async (url) => {\r\n            if (typeof url != \"string\")\r\n                return;\r\n            if (!_consts_consts__WEBPACK_IMPORTED_MODULE_1__[\"availableUrls\"].includes(url))\r\n                return;\r\n            if (hasUrlRoom(socket))\r\n                return;\r\n            console.log(`[socket.io] setUrl :: ${url}`);\r\n            socket.join(`URL_${url}`);\r\n            const canvas = (await canvasManager.getCanvas(url));\r\n            socket.emit(\"initCanvas\", {\r\n                width: canvas.width,\r\n                height: canvas.height,\r\n                dataURL: canvas.toDataURL()\r\n            });\r\n        });\r\n        socket.on(\"disconnecting\", reason => {\r\n            const url_roomName = getUrlRoomName(socket);\r\n            if (!url_roomName)\r\n                return;\r\n            console.log(`[socket.io] ROOM :: ${url_roomName} 소켓 종료`);\r\n            const url = url_roomName.substr(4);\r\n            const sockets = io.sockets.adapter.rooms[url_roomName].sockets;\r\n            if (sockets && Object.keys(sockets).length) {\r\n                canvasManager.unuseCanvas(url);\r\n            }\r\n        });\r\n        //draw\r\n        socket.on(\"draw\", async (drawData) => {\r\n            if (typeof drawData != \"object\")\r\n                return;\r\n            const url_roomName = getUrlRoomName(socket);\r\n            if (!url_roomName)\r\n                return;\r\n            const url = url_roomName.substr(4);\r\n            const { startX, startY, endX, endY, radius, rgb, alpha } = {\r\n                startX: 0,\r\n                startY: 0,\r\n                endX: 0,\r\n                endY: 0,\r\n                radius: 0,\r\n                rgb: 0,\r\n                alpha: 0,\r\n                ...drawData\r\n            };\r\n            const canvas = await canvasManager.getCanvas(url);\r\n            const ctx = canvas.getContext(\"2d\");\r\n            const [r, g, b] = rgbToRGB(rgb);\r\n            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;\r\n            ctx.lineCap = \"round\";\r\n            ctx.lineWidth = radius;\r\n            ctx.beginPath();\r\n            ctx.moveTo(startX, startY);\r\n            ctx.lineTo(endX, endY);\r\n            ctx.stroke();\r\n            io.to(url_roomName).emit(\"draw\", {\r\n                startX,\r\n                startY,\r\n                endX,\r\n                endY,\r\n                radius,\r\n                rgb,\r\n                alpha\r\n            });\r\n        });\r\n        socket.on(\"remove\", async (drawData) => {\r\n        });\r\n    });\r\n    return io;\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (socketIoServer);\r\n\n\n//# sourceURL=webpack:///./src/socketIo/socketIoServer.ts?");

/***/ }),

/***/ "./src/utils/getPageBrowserHeight.ts":
/*!*******************************************!*\
  !*** ./src/utils/getPageBrowserHeight.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var selenium_webdriver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! selenium-webdriver */ \"selenium-webdriver\");\n/* harmony import */ var selenium_webdriver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(selenium_webdriver__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _consts_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts/consts */ \"./src/consts/consts.ts\");\n/* harmony import */ var selenium_webdriver_chrome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! selenium-webdriver/chrome */ \"selenium-webdriver/chrome\");\n/* harmony import */ var selenium_webdriver_chrome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(selenium_webdriver_chrome__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! selenium-webdriver/lib/logging */ \"selenium-webdriver/lib/logging\");\n/* harmony import */ var selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\nfunction sleep(ms) {\r\n    return new Promise(solve => {\r\n        setTimeout(solve, ms);\r\n    });\r\n}\r\nasync function getPageBrowserHeight(url) {\r\n    console.log(\"[selenium] 시작\");\r\n    const driverBuilder = await new selenium_webdriver__WEBPACK_IMPORTED_MODULE_0__[\"Builder\"]().forBrowser(\"chrome\");\r\n    const loggingPrefs = new selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Preferences\"]();\r\n    loggingPrefs.setLevel(selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Type\"].BROWSER, selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Level\"].OFF);\r\n    loggingPrefs.setLevel(selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Type\"].CLIENT, selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Level\"].OFF);\r\n    loggingPrefs.setLevel(selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Type\"].DRIVER, selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Level\"].OFF);\r\n    loggingPrefs.setLevel(selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Type\"].PERFORMANCE, selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Level\"].OFF);\r\n    loggingPrefs.setLevel(selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Type\"].SERVER, selenium_webdriver_lib_logging__WEBPACK_IMPORTED_MODULE_3__[\"Level\"].OFF);\r\n    const options = new selenium_webdriver_chrome__WEBPACK_IMPORTED_MODULE_2__[\"Options\"]();\r\n    options.headless();\r\n    options.windowSize({\r\n        width: _consts_consts__WEBPACK_IMPORTED_MODULE_1__[\"browserWidth\"],\r\n        height: _consts_consts__WEBPACK_IMPORTED_MODULE_1__[\"browserHeight\"]\r\n    });\r\n    driverBuilder.setLoggingPrefs(loggingPrefs);\r\n    driverBuilder.setChromeOptions(options);\r\n    const driver = await driverBuilder.build();\r\n    await driver.get(`http://${url}`);\r\n    await sleep(1000);\r\n    const offsetHeight = await driver.executeScript(\"return document.body.offsetHeight\");\r\n    await driver.close();\r\n    console.log(\"[selenium] 종료\");\r\n    return offsetHeight;\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (getPageBrowserHeight);\r\n\n\n//# sourceURL=webpack:///./src/utils/getPageBrowserHeight.ts?");

/***/ }),

/***/ "canvas":
/*!*************************!*\
  !*** external "canvas" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"canvas\");\n\n//# sourceURL=webpack:///external_%22canvas%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "selenium-webdriver":
/*!*************************************!*\
  !*** external "selenium-webdriver" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"selenium-webdriver\");\n\n//# sourceURL=webpack:///external_%22selenium-webdriver%22?");

/***/ }),

/***/ "selenium-webdriver/chrome":
/*!********************************************!*\
  !*** external "selenium-webdriver/chrome" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"selenium-webdriver/chrome\");\n\n//# sourceURL=webpack:///external_%22selenium-webdriver/chrome%22?");

/***/ }),

/***/ "selenium-webdriver/lib/logging":
/*!*************************************************!*\
  !*** external "selenium-webdriver/lib/logging" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"selenium-webdriver/lib/logging\");\n\n//# sourceURL=webpack:///external_%22selenium-webdriver/lib/logging%22?");

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