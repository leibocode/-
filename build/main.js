require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//使用es6的代码,不要花里胡哨玩es8
/* harmony default export */ exports["a"] = {
  "db": "mongodb://localhost/ice",
  "base": "http://127.0.0.1:3000",
  "apiUrl": "http://jgjzkj.rjtms.com/",
  "SITE_ROOT_URL": "http://jg.imtudou.cn",
  "wechat": {
    "corpid": "ww72312644c862daf9", //企业ID 
    "secret": "UMPfSQdbLenHfmc-h-779Qsieug8Sdm3K7yKpaYQHW0", //通讯录secret
    "appsecret": "UFKu1RBnA22PLhHJIG5zmGATiCJWXlAW8EPRKlsLhGU", //应用secret
    "token": "5lCT",
    "encodingaeskey": "qajOt6CT9Kshq1XkPMNpnUtEJQLR4CzRvA407HoVcQi", //
    "agentId": 1000002
  },
  "mina": {
    "appid": "wxcac851ec7e9550e2",
    "secret": "352c61a7c8887e03643a1ff18eb8c5c8"
  },
  "shop": {
    "appID": "",
    "mchId": "",
    "notifyUrl": "",
    "key": ""
  },
  "qiniu": {
    "AK": "7VWsoiyWEKOhqmkE2KmeAY_viXCeyCXmdVOB17Kt",
    "SK": "up5V2r9layXaQQl8e_VvxZ39ogMUo-a-_wTWupDj"
  }
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wechat_lib_oauth__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony export (binding) */ __webpack_require__.d(exports, "getWechat", function() { return getWechat; });
/* harmony export (binding) */ __webpack_require__.d(exports, "getOAuth", function() { return getOAuth; });




var Wechat = __webpack_require__(28);

var wechat_file = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(__dirname, '.././config/wechat.txt');
var wechat_ticket_file = __WEBPACK_IMPORTED_MODULE_2_path___default.a.join(__dirname, '.././config/wechat_ticket.txt');
var util = __webpack_require__(26);

var wechatConfig = {
  wechat: {
    corpid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].wechat.corpid,
    secret: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].wechat.secret,
    appsecret: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].wechat.appsecret,
    tokenencodingaeskey: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].wechat.token,
    encodingaeskey: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].wechat.encodingaeskey,
    agentId: 1000002,

    getAccessToken: function getAccessToken() {
      return util.readFileAsync(wechat_file);
    },
    saveAccessToken: function saveAccessToken(data) {
      data = JSON.stringify(data);
      return util.writeFileAsync(wechat_file, data);
    },
    getTicket: function getTicket() {
      return util.readFileAsync(wechat_ticket_file);
    },
    saveTicket: function saveTicket(data) {
      data = JSON.stringify(data);
      return util.writeFileAsync(wechat_ticket_file, data);
    }
  }
};

var getWechat = function getWechat() {
  var WechatClient = new Wechat(wechatConfig.wechat);
  return WechatClient;
};

var getOAuth = function getOAuth() {
  var oauth = new __WEBPACK_IMPORTED_MODULE_1__wechat_lib_oauth__["a" /* default */](wechatConfig.wechat);
  return oauth;
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\wechat"))

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wechat__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project__ = __webpack_require__(23);



/* harmony default export */ exports["a"] = {
    wechat: __WEBPACK_IMPORTED_MODULE_0__wechat__,
    project: __WEBPACK_IMPORTED_MODULE_1__project__
};

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("transliteration");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("babel-types");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xml2js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xml2js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_xml2js__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var tpl = __webpack_require__(31);

exports.parseXMLAsync = function (xml) {
	return new Promise(function (resolve, reject) {
		__WEBPACK_IMPORTED_MODULE_0_xml2js___default.a.parseString(xml, { trim: true }, function (err, content) {
			if (err) {
				reject(err);
			} else {
				resolve(content);
			}
		});
	});
};

exports.formatMessage = function (result) {
	var message = {};
	if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {

		var keys = Object.keys(result);
		for (var i = 0; i < keys.length; i++) {
			var item = result[keys[i]];
			var key = keys[i];
			if (!(item instanceof Array) || item.length === 0) {
				continue;
			}
			if (item.length === 1) {
				var val = item[0];
				if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
					message[key] = formatMessage(val);
				} else {
					message[key] = (val || '').trim();
				}
			} else {
				message[key] = [];
				for (var j = 0; j < item.length; j++) {
					message[key].push(formatMessage(item[j]));
				}
			}
		}
	}
	return message;
};
exports.tpl = function (content, message) {
	var info = {};
	var type = 'text';
	var fromUserName = message.FromUserName;
	var toUserName = message.ToUserName;
	if (Array.isArray(content)) {
		type = 'news';
	}
	type = "text";
	info.content = content;
	info.createTime = parseInt(new Date().valueOf() / 1000);
	info.msgType = type;
	info.toUserName = fromUserName;
	info.fromUserName = toUserName;
	return tpl.compiled(info);
};

function isJson(str) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (str.indexOf('{') > -1) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}
	return false;
}

exports.sendtpl = function (content) {
	console.log(content);
	console.log(content[0]);
	var info = {};
	var type = 'text';
	if (isJson(content[1])) {
		type = 'news';
	}
	info.touser = content[0];
	info.msgType = type;
	info.content = content[1];
	return tpl.sendmsg(info);
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);

module.exports = {
	'button': [{
		'type': 'click',
		'name': '项目查询',
		'sub_button': [{
			'name': '商务项目',
			'type': 'click',
			'key': 'menu_click_business'
		}, {
			'name': '设计项目',
			'type': 'click',
			'key': 'menu_click_design'
		}, {
			'name': '重点项目',
			'type': 'click',
			'key': 'menu_click_Ech'
		}]
	}, {
		'type': 'view',
		'name': '我的项目',
		'url': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SITE_ROOT_URL + '/list'
	}, {
		'name': "平台管理",
		'type': 'view',
		'url': '' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SITE_ROOT_URL
	}]
};

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("bluebird");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("manba");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("querystring");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("request-promise");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("sha1");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("silly-datetime");

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = require("xml2js");

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = {
  /**
   * 
   * 
   */
  // router: {
  //   middleware: 'wechat-auth'
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/mint-ui/lib/style.css' }],
    script: [
    // {
    //   src: 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js'
    // },
    {
      src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
    }]
  },
  /*
  ** Global CSS
  */
  css: [{
    src: 'static/css/weui.css'
  }, {
    src: 'static/css/example.css'
  }, {
    src: 'static/font-awesome/css/font-awesome.min.css'
  }],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#399fff' },
  /*
   ** Build configuration
   */
  plugins: [{
    src: '~plugins/mint-ui', ssr: true //,
    // {
    //   src:'~plugins/fastclick',ssr:false
    // }
  }],
  build: {
    /*
     ** Run ESLINT on save
     */
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_bodyparser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_session__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_session__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return addBody; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return addSession; });



var addBody = function addBody(app) {
    app.use(__WEBPACK_IMPORTED_MODULE_0_koa_bodyparser___default()());
};

var addSession = function addSession(app) {
    app.keys = ['JG_Wx_Server'];
    var CONFIG = {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        signed: true,
        rolling: false
    };

    app.use(__WEBPACK_IMPORTED_MODULE_1_koa_session___default()(CONFIG, app));
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wechat_reply__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wechat_lib_middleware__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controllers_wechat__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_fs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sha1__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_sha1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_sha1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_script_staff__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return router; });


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }














var sd = __webpack_require__(15);

var uuid = __webpack_require__(44);

var manba = __webpack_require__(11);

var transliteration = __webpack_require__(6);

var router = function router(app) {
  var router = new __WEBPACK_IMPORTED_MODULE_1_koa_router___default.a();

  /**
   * wechat router
   */

  router.get('/wx', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
      var middle;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('/wx来了');
              middle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__wechat_lib_middleware__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].wechat, __WEBPACK_IMPORTED_MODULE_5__wechat_reply__["a" /* reply */]);
              _context.next = 4;
              return middle(ctx, next);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  router.get('/createDep', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
      var dep;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__node_script_staff__["a" /* createDep */])();

            case 2:
              dep = _context2.sent;

              console.log(dep);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  router.get('/createSatff', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__node_script_staff__["b" /* getAllUsers */])();

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  router.post('/wx', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx, next) {
      var middle;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              middle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__wechat_lib_middleware__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].wechat, __WEBPACK_IMPORTED_MODULE_5__wechat_reply__["a" /* reply */]);
              _context4.next = 3;
              return middle(ctx, next);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  router.get('/WW_verify_j4MyzAjMcHIQbgYm.txt', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5(ctx, next) {
      var data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_fs__["readFileSync"])(__dirname + './../../WW_verify_j4MyzAjMcHIQbgYm.txt');
              return _context5.abrupt('return', data);

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  router.post('/wechat-pay', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  router.get('/wechat-signature', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee7(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__controllers_wechat__["a" /* signature */])(ctx, next);

            case 2:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  router.get('/wechat-redirect', function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee8(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__controllers_wechat__["b" /* redirect */])(ctx, next);

            case 2:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());

  router.get('/wechat-oauth', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee9(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__controllers_wechat__["c" /* oauth */])(ctx, next);

            case 2:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());

  /**
   * project router
   * 
   */

  router.get('/api/EmphasisProject', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee10(ctx, next) {
      var page, query, data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (ctx.session.user) {
                _context10.next = 4;
                break;
              }

              console.log('我是session上的user');
              _context10.next = 5;
              break;

            case 4:
              return _context10.abrupt('return');

            case 5:
              page = ctx.query.page;
              query = {
                page: page,
                rows: 10
                //  console.log(user)
              };
              _context10.next = 9;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.EmphasisProject(user, query);

            case 9:
              data = _context10.sent;


              data.rows.forEach(function (item, index) {
                if (item.ProjectName && item.ProjectName.length > 10) {
                  item.ProjectName = item.ProjectName.substr(0, 10) + '...';
                }
              });

              return _context10.abrupt('return', ctx.body = {
                data: data,
                success: true
              });

            case 12:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this);
    }));

    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());

  router.get('/api/ProjectList', function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee11(ctx, next) {
      var _ctx$query, typeCode, page, query, user, data;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              console.log('数据请求来了');

              if (!ctx.session.user) {
                _context11.next = 4;
                break;
              }

              _context11.next = 5;
              break;

            case 4:
              return _context11.abrupt('return', ctx.body = {
                success: false,
                msg: '拿不到用户信息'
              });

            case 5:
              _ctx$query = ctx.query, typeCode = _ctx$query.typeCode, page = _ctx$query.page;
              query = {
                typeCode: typeCode,
                page: page,
                rows: 10
              };

              if (typeCode === '1') {
                query['Classification'] = '设计项目';
              } else if (typeCode === '2') {
                query['Classification'] = '商务项目';
              } else if (typeCode === '3') {
                query['HasMark'] = true;
              }
              user = ctx.session.user.name;

              // console.log(user)
              //let username ='super'

              _context11.next = 11;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ProjectList(user, query);

            case 11:
              data = _context11.sent;

              //const data =await api.project.ProjectList('super',query)
              if (data.rows.length > 0) {
                data.rows.forEach(function (item, index) {
                  if (item.ProjectName && item.ProjectName.length > 10) {
                    item.ProjectName = item.ProjectName.substr(0, 10) + '...';
                  }
                });
              }
              return _context11.abrupt('return', ctx.body = {
                data: data,
                success: true
              });

            case 14:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this);
    }));

    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());

  router.get('/api/GetRoles', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee12(ctx, next) {
      var user, data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              console.log('进入请求中');

              if (!ctx.session.user.name) {
                _context12.next = 4;
                break;
              }

              _context12.next = 5;
              break;

            case 4:
              return _context12.abrupt('return', ctx.body = {
                success: false,
                msg: '拿不到用户信息'
              });

            case 5:
              user = ctx.session.user;
              _context12.prev = 6;
              _context12.next = 9;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.GetRoles(user.name, user.name);

            case 9:
              data = _context12.sent;

              //const data =await api.project.GetRoles("雷博","雷博")
              ctx.body = {
                success: true,
                data: data.OrgBasic.RoleCode
              };
              _context12.next = 15;
              break;

            case 13:
              _context12.prev = 13;
              _context12.t0 = _context12['catch'](6);

            case 15:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, _this, [[6, 13]]);
    }));

    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());

  router.get('/api/ProjectDateil', function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee13(ctx, next) {
      var _ctx$query2, Id, Classification, user, query, data;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context13.next = 3;
                break;
              }

              _context13.next = 4;
              break;

            case 3:
              return _context13.abrupt('return', ctx.body = {
                success: false,
                msg: '拿不到用户信息'
              });

            case 4:
              _ctx$query2 = ctx.query, Id = _ctx$query2.Id, Classification = _ctx$query2.Classification;
              user = ctx.session.user.name;
              //const user = 'super'

              query = {
                Id: Id,
                Classification: Classification
              };

              if (!Id) {
                _context13.next = 16;
                break;
              }

              _context13.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ProjectAuditById(user, query);

            case 10:
              data = _context13.sent;

              console.log(data);
              data.rows[0].ApplyDate = manba(data.rows[0].ApplyDate).format();
              ctx.body = {
                success: true,
                data: data
              };
              _context13.next = 17;
              break;

            case 16:
              ctx.body = {
                success: false,
                msg: 'Id不存在'
              };

            case 17:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, _this);
    }));

    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());

  router.get('/api/AuditProject/:_id', function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee14(ctx, next) {
      var _id, query, user, data, BusinessData;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!ctx.session.user) {
                _context14.next = 3;
                break;
              }

              _context14.next = 4;
              break;

            case 3:
              return _context14.abrupt('return', ctx.body = {
                success: false,
                msg: '拿不到用户信息'
              });

            case 4:
              _id = ctx.params._id;
              query = {
                Id: _id

                //let username = `super`
              };
              user = ctx.session.user.name;
              _context14.next = 9;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ProjectAuditById(user, query);

            case 9:
              data = _context14.sent;

              // data.rows[0].CreateDate =manba(data.rows[0].CreateDate).format()
              data.rows[0].ApplyDate = manba(data.rows[0].ApplyDate).format();
              _context14.next = 13;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ProjectStage(user, _id);

            case 13:
              BusinessData = _context14.sent;
              return _context14.abrupt('return', ctx.body = {
                data: data,
                BusinessData: BusinessData,
                success: true
              });

            case 15:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, _this);
    }));

    return function (_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }());

  //指派联系人
  router.get('/api/GetContact', function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee15(ctx, next) {
      var user, id, data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context15.next = 3;
                break;
              }

              _context15.next = 4;
              break;

            case 3:
              return _context15.abrupt('return', ctx.body = {
                success: false,
                msg: '拿不到用户信息'
              });

            case 4:
              //const user = `super`
              user = ctx.session.user.name;
              id = ctx.query.id;
              _context15.prev = 6;
              _context15.next = 9;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.getContact(user, id);

            case 9:
              data = _context15.sent;

              data.forEach(function (item) {
                item.value = transliteration.slugify(item.UserCode).slice(0, 1);
              });
              ctx.body = {
                data: data,
                success: true
              };
              _context15.next = 17;
              break;

            case 14:
              _context15.prev = 14;
              _context15.t0 = _context15['catch'](6);

              ctx.body = {
                err: '网络请求出问题啦!',
                success: false
              };

            case 17:
            case 'end':
              return _context15.stop();
          }
        }
      }, _callee15, _this, [[6, 14]]);
    }));

    return function (_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }());

  //撤销项目
  router.get('/api/RemoveAction', function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee16(ctx, next) {
      var _ctx$query3, HandleStatus, NextSetp, PreStep, id, requestData, user, data;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              // if(ctx.session.user.name){
              // }else {
              //   return ctx.body ={
              //      success:false,
              //      msg:'拿不到用户信息'
              //    }
              // }
              //console.log(ctx.query)
              _ctx$query3 = ctx.query, HandleStatus = _ctx$query3.HandleStatus, NextSetp = _ctx$query3.NextSetp, PreStep = _ctx$query3.PreStep, id = _ctx$query3.id;
              requestData = {
                HandleStatus: 2,
                ID: id,
                NextSetp: false,
                PreSetp: true
                //let user =ctx.session.user.name
              };
              user = 'super';

              try {
                data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveAction(user, requestData);
                //console.log(data)

                ctx.body = {
                  success: true,
                  data: data
                };
              } catch (e) {
                ctx.body = {
                  success: false,
                  msg: '请联系开发者',
                  err: e
                };
              }

            case 4:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, _this);
    }));

    return function (_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }());

  //审核项目
  router.get('/api/SubmitAudit', function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee17(ctx, next) {
      var _ctx$query4, HandleStatus, NextSetp, PreStep, id, Remark, requestData, username, data;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              // if(ctx.session.user.name){
              // }else {
              //   return ctx.body ={
              //      success:false,
              //      msg:'拿不到用户信息'
              //   }
              // }
              _ctx$query4 = ctx.query, HandleStatus = _ctx$query4.HandleStatus, NextSetp = _ctx$query4.NextSetp, PreStep = _ctx$query4.PreStep, id = _ctx$query4.id, Remark = _ctx$query4.Remark;
              requestData = {
                HandleStatus: 1,
                ID: id,
                NextSetp: true,
                PreSetp: false,
                Remark: Remark,
                State: "passed"
              };
              username = 'super';
              //let user =ctx.session.user.name

              console.log('审核数据');
              console.log(requestData);
              try {
                data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveAction(username, requestData);

                ctx.body = {
                  success: true,
                  data: data
                };
              } catch (e) {
                ctx.body = {
                  success: false,
                  err: e
                };
              }

            case 6:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, _this);
    }));

    return function (_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }());

  //获取单位
  router.get('/api/getOptions', function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee18(ctx, next) {
      var user, username, _ctx$query5, OrgProperty, CompanyType, page, rows, data, res;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context18.next = 3;
                break;
              }

              _context18.next = 4;
              break;

            case 3:
              return _context18.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              user = ctx.session.user;
              username = 'super';
              _ctx$query5 = ctx.query, OrgProperty = _ctx$query5.OrgProperty, CompanyType = _ctx$query5.CompanyType, page = _ctx$query5.page, rows = _ctx$query5.rows;
              data = {
                OrgProperty: OrgProperty,
                CompanyType: CompanyType,
                page: page,
                rows: rows
              };
              _context18.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.GetOptions(user.name, data);

            case 10:
              res = _context18.sent;
              return _context18.abrupt('return', ctx.body = {
                success: true,
                data: res
              });

            case 12:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, _this);
    }));

    return function (_x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }());

  //
  router.get('/api/getClientUnit', function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee19(ctx, next) {
      var _ctx$query6, OrgProperty, page, rows, data, user, username, res;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context19.next = 3;
                break;
              }

              _context19.next = 4;
              break;

            case 3:
              return _context19.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              _ctx$query6 = ctx.query, OrgProperty = _ctx$query6.OrgProperty, page = _ctx$query6.page, rows = _ctx$query6.rows;
              data = {
                OrgProperty: OrgProperty,
                page: page,
                rows: rows
              };
              user = ctx.session.user.name;
              username = 'super';
              _context19.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.GetClientUnit(user, data);

            case 10:
              res = _context19.sent;

              ctx.body = {
                success: true,
                data: res
              };

            case 12:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, _this);
    }));

    return function (_x37, _x38) {
      return _ref19.apply(this, arguments);
    };
  }());

  //项目提交
  router.post('/api/commitProject', function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee20(ctx, next) {
      var projectInfo, user, data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context20.next = 3;
                break;
              }

              _context20.next = 4;
              break;

            case 3:
              return _context20.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              projectInfo = ctx.request.body;
              //let user = 'super'

              user = ctx.session.user.name;
              //console.log(projectInfo)

              projectInfo.form.ID = uuid.v4();
              projectInfo.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD');
              projectInfo.form.ApplyPerson = user.name;
              //  projectInfo.form.StartTime =sd.format(new Date(),'YYYY-MM-DD')
              projectInfo.form.CreateDate = sd.format(new Date(), 'YYYY-MM-DD');
              console.log(projectInfo);
              _context20.prev = 11;
              _context20.next = 14;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.CommitProject(user, projectInfo);

            case 14:
              data = _context20.sent;

              console.log(data);
              ctx.body = {
                success: true,
                data: data
              };
              _context20.next = 22;
              break;

            case 19:
              _context20.prev = 19;
              _context20.t0 = _context20['catch'](11);

              ctx.body = {
                success: false,
                err: _context20.t0
              };

            case 22:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, _this, [[11, 19]]);
    }));

    return function (_x39, _x40) {
      return _ref20.apply(this, arguments);
    };
  }());

  //搜索项目
  router.get('/api/search', function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee21(ctx, next) {
      var _ctx$query7, searchText, page, user, query, data;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context21.next = 3;
                break;
              }

              _context21.next = 4;
              break;

            case 3:
              return _context21.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              _ctx$query7 = ctx.query, searchText = _ctx$query7.searchText, page = _ctx$query7.page;
              //let user = `super`

              user = ctx.session.user.name;
              query = {
                searchText: searchText,
                page: page,
                rows: 10
              };
              _context21.prev = 7;
              _context21.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.Search(user, query);

            case 10:
              data = _context21.sent;

              data.rows.forEach(function (item, index) {
                if (item.ProjectName.length > 10) {
                  item.ProjectName = item.ProjectName.substr(0, 10) + '...';
                }
              });

              ctx.body = {
                success: true,
                data: data
              };
              _context21.next = 18;
              break;

            case 15:
              _context21.prev = 15;
              _context21.t0 = _context21['catch'](7);

              ctx.body = {
                success: false,
                err: _context21.t0
              };

            case 18:
            case 'end':
              return _context21.stop();
          }
        }
      }, _callee21, _this, [[7, 15]]);
    }));

    return function (_x41, _x42) {
      return _ref21.apply(this, arguments);
    };
  }());

  //查询每个阶段的项目详情
  router.get('/api/getSectionDetail', function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee22(ctx, next) {
      var _ctx$query8, type, Id, data, user;

      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context22.next = 3;
                break;
              }

              _context22.next = 4;
              break;

            case 3:
              return _context22.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              _ctx$query8 = ctx.query, type = _ctx$query8.type, Id = _ctx$query8.Id;
              data = null;
              //const user = `super`

              user = ctx.session.user.name;
              _context22.t0 = type;
              _context22.next = _context22.t0 === "BusinessPhase" ? 10 : _context22.t0 === "BusinessPhaseGroup" ? 14 : _context22.t0 === "QuotedPrice" ? 18 : _context22.t0 === "Biding" ? 22 : _context22.t0 === "Contract" ? 26 : _context22.t0 === "Receive" ? 30 : 34;
              break;

            case 10:
              _context22.next = 12;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.BusinessPhase(user, Id);

            case 12:
              data = _context22.sent;
              return _context22.abrupt('break', 34);

            case 14:
              _context22.next = 16;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.BusinessPhaseGroup(user, Id);

            case 16:
              data = _context22.sent;
              return _context22.abrupt('break', 34);

            case 18:
              _context22.next = 20;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.QuotedPrice(user, Id);

            case 20:
              data = _context22.sent;
              return _context22.abrupt('break', 34);

            case 22:
              _context22.next = 24;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.Biding(user, Id);

            case 24:
              data = _context22.sent;
              return _context22.abrupt('break', 34);

            case 26:
              _context22.next = 28;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.Contract(user, Id);

            case 28:
              data = _context22.sent;
              return _context22.abrupt('break', 34);

            case 30:
              _context22.next = 32;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.Receive(user, Id);

            case 32:
              data = _context22.sent;
              return _context22.abrupt('break', 34);

            case 34:
              console.log(data);
              if (data.rows.length > 0) {
                data.rows.forEach(function (item, index) {
                  item.ApplyDate = manba(item.ApplyDate).format();
                });
              }
              //data.rows[0].ApplyDate = manba(data.rows[0].ApplyDate).format()

              ctx.body = {
                success: true,
                data: data
              };

            case 37:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, _this);
    }));

    return function (_x43, _x44) {
      return _ref22.apply(this, arguments);
    };
  }());

  router.post('/api/ProjecyUpdate/:_id', function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee23(ctx, next) {
      var data, id, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context23.next = 3;
                break;
              }

              _context23.next = 4;
              break;

            case 3:
              return _context23.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              data = ctx.request.body;
              id = ctx.params._id;
              //let user = 'super'

              user = ctx.session.user.name;
              result = null;

              console.log(data);

              if (!(data[0].Type === 1)) {
                _context23.next = 14;
                break;
              }

              _context23.next = 12;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.EditBusinessManager(user, id, data);

            case 12:
              _context23.next = 17;
              break;

            case 14:
              if (!(data[0].Type === 2)) {
                _context23.next = 17;
                break;
              }

              _context23.next = 17;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.EditTechnicalManager(user, id, data);

            case 17:
              // const result =await api.project.ProjectUpdtae(user,id,data)
              console.log(result);
              ctx.body = {
                success: true,
                data: result
              };

            case 19:
            case 'end':
              return _context23.stop();
          }
        }
      }, _callee23, _this);
    }));

    return function (_x45, _x46) {
      return _ref23.apply(this, arguments);
    };
  }());

  router.get('/api/ProjectBusiness', function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee24(ctx, next) {
      var Id, user, query, data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context24.next = 3;
                break;
              }

              _context24.next = 4;
              break;

            case 3:
              return _context24.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              Id = ctx.query.Id;
              //const user = 'super'

              user = ctx.session.user.name;
              query = {
                HasApprove: true,
                value: Id,
                _valueFeild: 'value'
              };
              _context24.next = 9;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ProjectBusiness(user, query);

            case 9:
              data = _context24.sent;

              ctx.body = {
                data: data,
                success: true
              };

            case 11:
            case 'end':
              return _context24.stop();
          }
        }
      }, _callee24, _this);
    }));

    return function (_x47, _x48) {
      return _ref24.apply(this, arguments);
    };
  }());

  //提交商务阶段
  router.post('/api/BusinessCommit', function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee25(ctx, next) {
      var data, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context25.next = 3;
                break;
              }

              _context25.next = 4;
              break;

            case 3:
              return _context25.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              data = ctx.request.body;
              //let user = 'super'

              user = ctx.session.user.name;

              data.form.ID = uuid.v4();
              data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD');
              data.form.StartTime = sd.format(new Date(), 'YYYY-MM-DD');
              console.log(data);
              result = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.BusinessCommit(user, data);

              ctx.body = {
                success: true,
                data: result
              };

            case 12:
            case 'end':
              return _context25.stop();
          }
        }
      }, _callee25, _this);
    }));

    return function (_x49, _x50) {
      return _ref25.apply(this, arguments);
    };
  }());

  //商务阶段跟踪反馈
  router.post('/api/PhaseFeedback', function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee26(ctx, next) {
      var data, user, username, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              if (!ctx.session.user) {
                _context26.next = 3;
                break;
              }

              _context26.next = 4;
              break;

            case 3:
              return _context26.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              data = ctx.request.body;
              user = 'super';
              username = ctx.session.user.name;

              data.form.ApplyPerson = username;
              data.form.ChargePerson = username;
              data.form.FinishTime = sd.format(new Date(), 'YYYY-MM-DD');
              data.form.ID = uuid.v4();
              console.log('商务阶段跟踪反馈');
              console.log(data);
              _context26.next = 15;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.PhaseFeedback(username, data);

            case 15:
              result = _context26.sent;

              ctx.body = {
                success: true,
                data: result
              };

            case 17:
            case 'end':
              return _context26.stop();
          }
        }
      }, _callee26, _this);
    }));

    return function (_x51, _x52) {
      return _ref26.apply(this, arguments);
    };
  }());

  //收款登记
  router.get('/api/ReceiveGroup', function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee27(ctx, next) {
      var Id, user, username, query, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context27.next = 3;
                break;
              }

              _context27.next = 4;
              break;

            case 3:
              return _context27.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              Id = ctx.query.Id;
              user = 'super';
              username = ctx.session.user.name;
              query = {
                value: Id
              };
              _context27.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ReceiveGroup(username, query);

            case 10:
              result = _context27.sent;

              console.log(result);
              ctx.body = {
                success: true,
                data: result
              };

            case 13:
            case 'end':
              return _context27.stop();
          }
        }
      }, _callee27, _this);
    }));

    return function (_x53, _x54) {
      return _ref27.apply(this, arguments);
    };
  }());

  //收款登记提交
  router.post('/api/ReceiveCommit', function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee28(ctx, next) {
      var Id, user, username, query, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context28.next = 3;
                break;
              }

              _context28.next = 4;
              break;

            case 3:
              return _context28.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              Id = ctx.query.Id;
              user = 'super';
              username = ctx.session.user.name;
              query = {
                value: Id
              };
              _context28.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ReceiveGroup(username, query);

            case 10:
              result = _context28.sent;

              ctx.body = {
                success: true,
                data: result
              };

            case 12:
            case 'end':
              return _context28.stop();
          }
        }
      }, _callee28, _this);
    }));

    return function (_x55, _x56) {
      return _ref28.apply(this, arguments);
    };
  }());

  router.get('/api/GetBiding', function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee29(ctx, next) {
      var Id, query, user, username, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context29.next = 3;
                break;
              }

              _context29.next = 4;
              break;

            case 3:
              return _context29.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              Id = ctx.query.Id;
              query = {
                hasApprove: 'True',
                value: Id
              };
              user = 'super';
              username = ctx.session.user.name;
              //这里是跨服务调用的接口恨薄的一层，后面 最好加上一些服务熔断

              _context29.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.GetBiding(username, query);

            case 10:
              result = _context29.sent;


              ctx.body = {
                success: true,
                data: result
              };

            case 12:
            case 'end':
              return _context29.stop();
          }
        }
      }, _callee29, _this);
    }));

    return function (_x57, _x58) {
      return _ref29.apply(this, arguments);
    };
  }());

  router.get('/api/QuotedPrice', function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee30(ctx, next) {
      var Id, query, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              Id = ctx.query.Id;
              query = {
                hasApprove: 'True',
                value: Id
              };
              user = 'super';
              _context30.next = 5;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.GetQuotedPrice(user, query);

            case 5:
              result = _context30.sent;

              ctx.body = {
                success: true,
                data: result
              };

            case 7:
            case 'end':
              return _context30.stop();
          }
        }
      }, _callee30, _this);
    }));

    return function (_x59, _x60) {
      return _ref30.apply(this, arguments);
    };
  }());

  router.post('/api/CommitQuoted', function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee31(ctx, next) {
      var data, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context31.next = 3;
                break;
              }

              _context31.next = 4;
              break;

            case 3:
              return _context31.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户信息"
              });

            case 4:
              data = ctx.request.body;
              //let user = 'super'

              user = ctx.session.user.name;

              data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD');
              data.form.ApplyPerson = user;
              data.form.ID = uuid.v4();
              console.log(data);
              _context31.next = 12;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.CommitQutoedPrice(user, data);

            case 12:
              result = _context31.sent;

              //跨进程的通信,可以加一些调用之间融错,不然恨单薄的一层,

              ctx.body = {
                success: true,
                data: result
              };

            case 14:
            case 'end':
              return _context31.stop();
          }
        }
      }, _callee31, _this);
    }));

    return function (_x61, _x62) {
      return _ref31.apply(this, arguments);
    };
  }());

  router.post('/api/CommitBiding', function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee32(ctx, next) {
      var data, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              data = ctx.request.body;

              data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD');
              data.form.ApplyPerson = '超级管理员';
              data.form.ID = uuid.v4();
              user = 'super';

              console.log(data);
              //这个地方可以加一些融错,不然恨单薄的一层
              _context32.next = 8;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.CommitBiding(user, data);

            case 8:
              result = _context32.sent;

              ctx.body = {
                success: true,
                data: result
              };

            case 10:
            case 'end':
              return _context32.stop();
          }
        }
      }, _callee32, _this);
    }));

    return function (_x63, _x64) {
      return _ref32.apply(this, arguments);
    };
  }());

  router.post('/api/AuditItem', function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee33(ctx, next) {
      var form, data, user;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              form = ctx.request.body;
              data = null;
              user = 'super';

              if (!form.dataType) {
                ctx.body = {
                  success: false,
                  message: "缺少参数"
                };
              }
              _context33.t0 = form.dataType;
              _context33.next = _context33.t0 === 'BusinessPhase' ? 7 : _context33.t0 === "QuotedPrice" ? 9 : _context33.t0 === "Biding" ? 11 : _context33.t0 === "BusinessPhaseGroup" ? 13 : _context33.t0 === "Contract" ? 15 : _context33.t0 === "Receive" ? 17 : 19;
              break;

            case 7:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.SetBusinessState(user, form);
              return _context33.abrupt('break', 19);

            case 9:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveQuotedPrice(user, form);
              return _context33.abrupt('break', 19);

            case 11:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBiding(user, form);
              return _context33.abrupt('break', 19);

            case 13:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBusinessPhaseGroup(user, form);
              return _context33.abrupt('break', 19);

            case 15:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveContact(user, form);
              return _context33.abrupt('break', 19);

            case 17:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveReceive(user, form);
              return _context33.abrupt('break', 19);

            case 19:
              ctx.body = {
                success: true,
                data: data
              };

            case 20:
            case 'end':
              return _context33.stop();
          }
        }
      }, _callee33, _this);
    }));

    return function (_x65, _x66) {
      return _ref33.apply(this, arguments);
    };
  }());

  router.post('/api/RevocationItem', function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee34(ctx, next) {
      var form, data, user;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              form = ctx.request.body;
              data = null;
              user = 'super';

              if (!form.dataType) {
                ctx.body = {
                  success: false,
                  message: "缺少参数"
                };
              }
              _context34.t0 = form.dataType;
              _context34.next = _context34.t0 === 'BusinessPhase' ? 7 : _context34.t0 === "BusinessPhaseGroup" ? 9 : _context34.t0 === 'QuotedPrice' ? 11 : _context34.t0 === "Biding" ? 13 : _context34.t0 === "Contract" ? 15 : _context34.t0 === "Receive" ? 17 : 19;
              break;

            case 7:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBusiness(user, form);
              return _context34.abrupt('break', 19);

            case 9:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBusinessPhaseGroup(user, form);
              return _context34.abrupt('break', 19);

            case 11:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveQuotedPrice(user, form);
              return _context34.abrupt('break', 19);

            case 13:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBiding(user, form);
              return _context34.abrupt('break', 19);

            case 15:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveContact(user, form);
              return _context34.abrupt('break', 19);

            case 17:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveReceive(user, form);
              return _context34.abrupt('break', 19);

            case 19:
              ctx.body = {
                success: true,
                data: data
              };

            case 20:
            case 'end':
              return _context34.stop();
          }
        }
      }, _callee34, _this);
    }));

    return function (_x67, _x68) {
      return _ref34.apply(this, arguments);
    };
  }());

  router.get('/api/BusinessStage', function () {
    var _ref35 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee35(ctx, next) {
      var Id, user, data, map, phaseId;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              Id = ctx.query.Id;
              user = 'super';
              _context35.next = 4;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.BusinessStage(user, Id);

            case 4:
              data = _context35.sent;


              console.log(data);
              if (data.total > 0) {
                map = [];

                data.rows.forEach(function (item, index) {
                  if (map.length > 0) {} else {
                    map.push({
                      Id: item.ID
                    });
                  }
                });
                console.log(map);
                phaseId = map[0].Id;

                ctx.body = {
                  success: true,
                  flag: true,
                  phaseId: phaseId
                };
              } else {
                ctx.body = {
                  success: true,
                  flag: false
                };
              }

            case 7:
            case 'end':
              return _context35.stop();
          }
        }
      }, _callee35, _this);
    }));

    return function (_x69, _x70) {
      return _ref35.apply(this, arguments);
    };
  }());

  router.get('/api/GetDetailByBusiness', function () {
    var _ref36 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee36(ctx, next) {
      var Id, user, data, map, phaseId, query, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context36.next = 3;
                break;
              }

              _context36.next = 4;
              break;

            case 3:
              return _context36.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户的信息"
              });

            case 4:
              Id = ctx.query.Id;
              //let user = 'super'

              user = ctx.session.user.name;
              _context36.next = 8;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.BusinessStage(user, Id);

            case 8:
              data = _context36.sent;

              if (!(data.total > 0)) {
                _context36.next = 22;
                break;
              }

              map = [];

              data.rows.forEach(function (item, index) {
                if (item.HandleStatus == 2) {
                  if (map.length > 0) {} else {
                    map.push({
                      Id: item.ID
                    });
                  }
                }
              });
              phaseId = map[0].Id;
              query = {
                HasApprove: true,
                value: phaseId,
                _valueFeild: 'value'
              };
              _context36.next = 16;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.ProjectBusiness(user, query);

            case 16:
              result = _context36.sent;

              console.log('reusk');
              console.log(result);
              ctx.body = {
                success: true,
                data: result
              };
              _context36.next = 23;
              break;

            case 22:
              ctx.body = {
                success: true,
                data: []
              };

            case 23:
            case 'end':
              return _context36.stop();
          }
        }
      }, _callee36, _this);
    }));

    return function (_x71, _x72) {
      return _ref36.apply(this, arguments);
    };
  }());

  router.post('/api/SetDateilCommitState', function () {
    var _ref37 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee37(ctx, next) {
      var form, data, user;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context37.next = 3;
                break;
              }

              _context37.next = 4;
              break;

            case 3:
              return _context37.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户的信息"
              });

            case 4:
              form = ctx.request.body;
              data = null;
              //let user = 'super'

              user = ctx.session.user.name;

              if (!form.dataType) {
                ctx.body = {
                  success: false,
                  message: "缺少参数"
                };
              }
              _context37.t0 = form.dataType;
              _context37.next = _context37.t0 === 'BusinessPhase' ? 11 : _context37.t0 === "BusinessPhaseGroup" ? 13 : _context37.t0 === "QuotedPrice" ? 15 : _context37.t0 === "Biding" ? 17 : _context37.t0 === "Contract" ? 19 : _context37.t0 === "Receive" ? 21 : 23;
              break;

            case 11:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBusiness(user, form);
              return _context37.abrupt('break', 23);

            case 13:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBusinessPhaseGroup(user, form);
              return _context37.abrupt('break', 23);

            case 15:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveQuotedPrice(user, form);
              return _context37.abrupt('break', 23);

            case 17:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveBiding(user, form);
              return _context37.abrupt('break', 23);

            case 19:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveContact(user, form);
              return _context37.abrupt('break', 23);

            case 21:
              data = __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.RemoveReceive(user, form);
              return _context37.abrupt('break', 23);

            case 23:
              ctx.body = {
                success: true,
                data: data
              };

            case 24:
            case 'end':
              return _context37.stop();
          }
        }
      }, _callee37, _this);
    }));

    return function (_x73, _x74) {
      return _ref37.apply(this, arguments);
    };
  }());

  router.get('/api/CheckReceive', function () {
    var _ref38 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee38(ctx, next) {
      var Id, user, query, data;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context38.next = 3;
                break;
              }

              _context38.next = 4;
              break;

            case 3:
              return _context38.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户的信息"
              });

            case 4:
              Id = ctx.query.Id;
              // let user = 'super'

              user = ctx.session.user.name;
              query = {
                ProjectID: Id,
                page: 1,
                rows: 20
              };
              _context38.next = 9;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.CheckReceive(user, query);

            case 9:
              data = _context38.sent;

              if (data.total > 0) {
                // let phaseId =data.rows[0].ID
                // console.log(phaseId)
                ctx.body = {
                  success: true,
                  flag: true,
                  data: data.rows[0]
                  //     phaseId:phaseId
                };
              } else {
                ctx.body = {
                  success: true,
                  flag: false
                };
              }

            case 11:
            case 'end':
              return _context38.stop();
          }
        }
      }, _callee38, _this);
    }));

    return function (_x75, _x76) {
      return _ref38.apply(this, arguments);
    };
  }());

  router.post('/api/CommitContract', function () {
    var _ref39 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee39(ctx, next) {
      var data, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context39.next = 3;
                break;
              }

              _context39.next = 4;
              break;

            case 3:
              return _context39.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户的信息"
              });

            case 4:
              data = ctx.request.body;
              // let user = 'super'

              user = ctx.session.user.name;

              data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD');
              data.form.ApplyPerson = user;
              if (data.form.ID.length > 0) {} else {
                data.form.ID = uuid.v4();
              }
              // console.log(data)
              _context39.next = 11;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.CommitContract(user, data);

            case 11:
              result = _context39.sent;

              //跨进程的通信,可以加一些调用之间融错,不然恨单薄的一层,

              ctx.body = {
                success: true,
                data: result
              };

            case 13:
            case 'end':
              return _context39.stop();
          }
        }
      }, _callee39, _this);
    }));

    return function (_x77, _x78) {
      return _ref39.apply(this, arguments);
    };
  }());

  //检查用户的权限
  router.get('checkUser', function () {
    var _ref40 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee40(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
            case 'end':
              return _context40.stop();
          }
        }
      }, _callee40, _this);
    }));

    return function (_x79, _x80) {
      return _ref40.apply(this, arguments);
    };
  }());

  router.post('/api/CommitReceive', function () {
    var _ref41 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee41(ctx, next) {
      var data, user, result;
      return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              if (!ctx.session.user.name) {
                _context41.next = 3;
                break;
              }

              _context41.next = 4;
              break;

            case 3:
              return _context41.abrupt('return', ctx.body = {
                success: false,
                msg: "拿不到用户的信息"
              });

            case 4:
              data = ctx.request.body;
              // let user = 'super'

              user = ctx.session.user.name;

              data.form.ID = uuid.v4();
              console.log(data);
              _context41.next = 10;
              return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].project.CommitReceive(user, data);

            case 10:
              result = _context41.sent;

              ctx.body = {
                data: result,
                success: true
              };

            case 12:
            case 'end':
              return _context41.stop();
          }
        }
      }, _callee41, _this);
    }));

    return function (_x81, _x82) {
      return _ref41.apply(this, arguments);
    };
  }());

  app.use(router.routes()).use(router.allowedMethods());
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\middlewares"))

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export requestCode */
/**
 * 接口配置文件
 */
var requestCode = {
    whole: 0,
    design: 1,
    Business: 2,
    Key: 3
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_types__);
/* harmony export (binding) */ __webpack_require__.d(exports, "EmphasisProject", function() { return EmphasisProject; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ProjectList", function() { return ProjectList; });
/* harmony export (binding) */ __webpack_require__.d(exports, "BusinessPhase", function() { return BusinessPhase; });
/* harmony export (binding) */ __webpack_require__.d(exports, "BusinessPhaseGroup", function() { return BusinessPhaseGroup; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Biding", function() { return Biding; });
/* harmony export (binding) */ __webpack_require__.d(exports, "QuotedPrice", function() { return QuotedPrice; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Contract", function() { return Contract; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Receive", function() { return Receive; });
/* harmony export (binding) */ __webpack_require__.d(exports, "DesignDeepen", function() { return DesignDeepen; });
/* harmony export (binding) */ __webpack_require__.d(exports, "DesignTask", function() { return DesignTask; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ProjectAuditById", function() { return ProjectAuditById; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ProjectStage", function() { return ProjectStage; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ProjectDelegate", function() { return ProjectDelegate; });
/* harmony export (binding) */ __webpack_require__.d(exports, "getContact", function() { return getContact; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveAction", function() { return RemoveAction; });
/* harmony export (binding) */ __webpack_require__.d(exports, "SubmitAudit", function() { return SubmitAudit; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ProjectBusiness", function() { return ProjectBusiness; });
/* harmony export (binding) */ __webpack_require__.d(exports, "BusinessStage", function() { return BusinessStage; });
/* harmony export (binding) */ __webpack_require__.d(exports, "GetOptions", function() { return GetOptions; });
/* harmony export (binding) */ __webpack_require__.d(exports, "GetClientUnit", function() { return GetClientUnit; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CommitProject", function() { return CommitProject; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CommitBiding", function() { return CommitBiding; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CommitQuotedPrice", function() { return CommitQuotedPrice; });
/* harmony export (binding) */ __webpack_require__.d(exports, "SetBusinessState", function() { return SetBusinessState; });
/* harmony export (binding) */ __webpack_require__.d(exports, "SetBusinessPhaseState", function() { return SetBusinessPhaseState; });
/* harmony export (binding) */ __webpack_require__.d(exports, "SetQuotedPriceState", function() { return SetQuotedPriceState; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveBusiness", function() { return RemoveBusiness; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveBusinessPhaseGroup", function() { return RemoveBusinessPhaseGroup; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveQuotedPrice", function() { return RemoveQuotedPrice; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveBiding", function() { return RemoveBiding; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveContact", function() { return RemoveContact; });
/* harmony export (binding) */ __webpack_require__.d(exports, "RemoveReceive", function() { return RemoveReceive; });
/* harmony export (binding) */ __webpack_require__.d(exports, "Search", function() { return Search; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ProjectUpdtae", function() { return ProjectUpdtae; });
/* harmony export (binding) */ __webpack_require__.d(exports, "EditTechnicalManager", function() { return EditTechnicalManager; });
/* harmony export (binding) */ __webpack_require__.d(exports, "EditBusinessManager", function() { return EditBusinessManager; });
/* harmony export (binding) */ __webpack_require__.d(exports, "BusinessCommit", function() { return BusinessCommit; });
/* harmony export (binding) */ __webpack_require__.d(exports, "ReceiveGroup", function() { return ReceiveGroup; });
/* harmony export (binding) */ __webpack_require__.d(exports, "GetBiding", function() { return GetBiding; });
/* harmony export (binding) */ __webpack_require__.d(exports, "PhaseFeedback", function() { return PhaseFeedback; });
/* harmony export (binding) */ __webpack_require__.d(exports, "BidingCommit", function() { return BidingCommit; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CommitQutoedPrice", function() { return CommitQutoedPrice; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CommitContract", function() { return CommitContract; });
/* harmony export (binding) */ __webpack_require__.d(exports, "GetQuotedPrice", function() { return GetQuotedPrice; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CheckReceive", function() { return CheckReceive; });
/* harmony export (binding) */ __webpack_require__.d(exports, "CommitReceive", function() { return CommitReceive; });
/* harmony export (binding) */ __webpack_require__.d(exports, "GetAllStaff", function() { return GetAllStaff; });
/* harmony export (binding) */ __webpack_require__.d(exports, "GetRoles", function() { return GetRoles; });


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * project--接口
 * 改造 把token 保存到 Vuex中 写两个方法来获取Get/Set
 */





var requests = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(options) {
        var response;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        options = Object.assign({}, options, { json: true });

                        _context.prev = 1;
                        _context.next = 4;
                        return __WEBPACK_IMPORTED_MODULE_1_request_promise___default()(options);

                    case 4:
                        response = _context.sent;
                        return _context.abrupt('return', response);

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](1);

                        console.log(_context.t0);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[1, 8]]);
    }));

    return function requests(_x) {
        return _ref.apply(this, arguments);
    };
}();
//请求api
var base = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].apiUrl;
console.log(base);
var api = {
    token: base + 'login/DoActionApp',
    phoneCode: base + '/login/GetAppRandomCode?',
    EmphasisProject: base + 'api/BasicData/Project?',
    audit: base + '/api/BasicData/Project/GetPageData?',
    project: base + 'api/BasicData/Project/Get?',
    Business: base + 'api/BasicData/BusinessPhase/Get?',
    Users: base + 'api/BasicData/Project/GetProjectManagersWithCheck/?',
    GetOptions: base + 'api/BasicData/Organization/GetOptions?',
    commitProject: base + 'api/BasicData/Project/edit/',
    RemoveAction: base + 'api/BasicData/Project/EditStateByNode',
    Action: base + 'api/BasicData/Project/EditStateByNode',
    Search: base + 'api/BasicData/Project?',
    Deleagate: base + 'api',
    DesignTask: base + 'api/BasicData/DesignTask/Get?',
    BusinessPhase: base + 'api/BasicData/BusinessPhase/Get?',
    BusinessPhaseGroup: base + 'api/BasicData/PhaseFeedback/Get?',
    QuotedPrice: base + 'api/BasicData/QuotedPrice?',
    ProjectUpdtae: base + 'api/BasicData/Project/EditProjectManagersByNode/',
    Biding: base + 'api/BasicData/Biding?',
    Contract: base + 'api/BasicData/Contract?',
    Receive: base + 'api/BasicData/Receive/Get?',
    DesignDeepen: base + 'api/BasicData/DesignDeepen?',
    ProjectStop: '' + base,
    ProjectBusiness: base + 'api/BasicData/Project/GetOptions?',
    EditTechnicalManager: base + 'api/BasicData/Project/EditTechnicalManager/',
    EditBusinessManager: base + 'api/BasicData/Project/EditBusinessManager/',
    BusinessCommit: base + 'api/BasicData/BusinessPhase/edit/',
    ReceiveGroup: base + 'api/BasicData/Contract/GetOptions?',
    GetBiding: base + 'api/BasicData/Project/GetOptions?',
    PhaseFeedback: base + 'api/BasicData/PhaseFeedback/edit/',
    CommitBiding: base + 'api/BasicData/Biding/edit/',
    CommitQuotedPrice: base + 'api/BasicData/QuotedPrice/edit/\'',
    BusinessState: base + 'api/BasicData/BusinessPhase/EditStateByNode',
    QuotedPriceState: base + 'api/BasicData/QuotedPrice/EditStateByNode',
    BidingState: base + 'api/BasicData//Biding/EditState/',
    BusinessStage: base + 'api/BasicData/BusinessPhase/Get?',
    CommitContract: base + 'api/BasicData/Contract/edit',
    CheckReceive: base + 'api/BasicData/ReceiveGroup/GetReceive?',
    CommitReceive: base + 'api/BasicData/Receive/Edit/',
    GetAllUsers: base + '/api/Sys/Users',
    ContractState: base + '/api/BasicData/Contract/EditState/',
    ReceiveState: base + '/api/BasicData/Receive/EditState',
    //PhaseFeedback:`${base}/api/BasicData/PhaseFeedback/EditState/`,
    RoleUsers: base + 'api/Sys/User/GetUserOrgBasic?'
};

var apiToken = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(username, code) {
        var api, url, options, data, err;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        api = {
                            usercode: username,
                            code: code,
                            app: true
                        };
                        url = base + 'login/DoActionApp';
                        options = {
                            method: 'POST',
                            url: url,
                            body: api
                        };
                        data = void 0;
                        _context2.prev = 4;
                        _context2.next = 7;
                        return requests(options);

                    case 7:
                        data = _context2.sent;
                        return _context2.abrupt('return', data);

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](4);
                        err = {
                            success: false,
                            msg: '后端错误,请联系开发者'
                        };
                        return _context2.abrupt('return', err);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this, [[4, 11]]);
    }));

    return function apiToken(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getPhoneCode = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(username) {
        var url, options, _data, err;

        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        url = api.phoneCode + 'UserCode=' + encodeURIComponent(username);
                        options = {
                            method: 'POST',
                            url: url
                        };
                        _context3.prev = 2;
                        _context3.next = 5;
                        return requests(options);

                    case 5:
                        _data = _context3.sent;
                        return _context3.abrupt('return', _data);

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](2);
                        err = {
                            success: false,
                            msg: '服务器错误,请联系开发者'
                        };
                        return _context3.abrupt('return', err);

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this, [[2, 9]]);
    }));

    return function getPhoneCode(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

//请求重点项目
var EmphasisProject = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(username, query) {
        var code, token, url, options, _data2;

        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context4.sent;
                        _context4.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context4.sent;
                        url = api.EmphasisProject + 'page=' + query.page + '&rows=' + query.rows;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context4.prev = 8;
                        _context4.next = 11;
                        return requests(options);

                    case 11:
                        _data2 = _context4.sent;
                        return _context4.abrupt('return', _data2);

                    case 16:
                        _context4.prev = 16;
                        _context4.t0 = _context4['catch'](8);
                        return _context4.abrupt('return', {
                            success: false,
                            err: _context4.t0,
                            msg: '请求服务端失败'
                        });

                    case 19:
                        return _context4.abrupt('return', data);

                    case 20:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[8, 16]]);
    }));

    return function EmphasisProject(_x5, _x6) {
        return _ref4.apply(this, arguments);
    };
}();

//项目列表
var ProjectList = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5(username, query) {
        var code, token, url, pageSize, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        console.log(username);
                        _context5.next = 3;
                        return getPhoneCode(username);

                    case 3:
                        code = _context5.sent;

                        console.log(code);
                        _context5.next = 7;
                        return apiToken(username, code.RandomCode);

                    case 7:
                        token = _context5.sent;
                        url = '' + api.EmphasisProject;

                        console.log(query);
                        console.log(query.typeCode);
                        console.log(query.typeCode === '1');

                        if (query.typeCode === '1') {
                            //设计项目
                            console.log('进来了');
                            url = api.EmphasisProject + 'Classification=' + encodeURI(query.Classification) + '&page=' + query.page + '&rows=' + query.rows;
                        } else if (query.typeCode === '2') {
                            url = api.EmphasisProject + 'Classification=' + encodeURI(query.Classification) + '&page=' + query.page + '&rows=' + query.rows;
                        } else if (query.typeCode === '3') {
                            console.log('进来了');
                            url = api.EmphasisProject + 'HasMark=' + query.HasMark + '&page=' + query.page + '&rows=' + query.rows;
                        } else {
                            pageSize = 10;

                            url = api.EmphasisProject + 'page=' + query.page + '&rows=' + query.rows;
                        }
                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context5.next = 17;
                        return requests(options);

                    case 17:
                        data = _context5.sent;
                        return _context5.abrupt('return', data);

                    case 19:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function ProjectList(_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();

//BusinessPhase 商务阶段跟新
var BusinessPhase = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context6.sent;
                        _context6.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context6.sent;
                        url = api.BusinessPhase + 'ProjectID=' + id;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context6.next = 10;
                        return requests(options);

                    case 10:
                        data = _context6.sent;
                        return _context6.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function BusinessPhase(_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();

//项目商务阶段进度跟踪反馈
var BusinessPhaseGroup = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee7(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context7.sent;
                        _context7.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context7.sent;
                        url = api.BusinessPhaseGroup + 'ID=' + id;

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context7.next = 11;
                        return requests(options);

                    case 11:
                        data = _context7.sent;

                        console.log(data);
                        return _context7.abrupt('return', data);

                    case 14:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function BusinessPhaseGroup(_x11, _x12) {
        return _ref7.apply(this, arguments);
    };
}();

//项目投标申请
var Biding = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee8(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context8.sent;
                        _context8.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context8.sent;
                        url = api.Biding + 'ProjectID=' + id + '&pgae=1&rows=10';
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context8.next = 10;
                        return requests(options);

                    case 10:
                        data = _context8.sent;
                        return _context8.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function Biding(_x13, _x14) {
        return _ref8.apply(this, arguments);
    };
}();

//项目报价申请
var QuotedPrice = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee9(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context9.sent;
                        _context9.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context9.sent;
                        url = api.QuotedPrice + 'ProjectID=' + id + '&page=1&rows=20';

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }

                        };
                        _context9.next = 11;
                        return requests(options);

                    case 11:
                        data = _context9.sent;
                        return _context9.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function QuotedPrice(_x15, _x16) {
        return _ref9.apply(this, arguments);
    };
}();

//合同管理
var Contract = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee10(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context10.sent;
                        _context10.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context10.sent;
                        url = api.Contract + 'ProjectID=' + id + '&page=1&rows=20';
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context10.next = 10;
                        return requests(options);

                    case 10:
                        data = _context10.sent;
                        return _context10.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function Contract(_x17, _x18) {
        return _ref10.apply(this, arguments);
    };
}();

//项目报价申请
var Receive = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee11(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context11.sent;
                        _context11.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context11.sent;
                        url = api.Receive + 'ProjectID=' + id;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context11.next = 10;
                        return requests(options);

                    case 10:
                        data = _context11.sent;
                        return _context11.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));

    return function Receive(_x19, _x20) {
        return _ref11.apply(this, arguments);
    };
}();

//项目设计深化申请
var DesignDeepen = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee12(username, id) {
        var code, token, url, options;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context12.sent;
                        _context12.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context12.sent;
                        url = api.DesignDeepen + 'ProjectID=' + id + '&page=1&rows=10';
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };

                    case 8:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));

    return function DesignDeepen(_x21, _x22) {
        return _ref12.apply(this, arguments);
    };
}();

//项目设计任务
var DesignTask = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee13(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        _context13.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context13.sent;
                        _context13.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context13.sent;
                        url = api.DesignTask + 'ProjectID=' + id;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context13.next = 10;
                        return requests(options);

                    case 10:
                        data = _context13.sent;
                        return _context13.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));

    return function DesignTask(_x23, _x24) {
        return _ref13.apply(this, arguments);
    };
}();

//项目基本信息
var ProjectAuditById = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee14(username, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        _context14.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context14.sent;
                        _context14.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context14.sent;
                        url = api.project + 'ID=' + query.Id;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context14.next = 10;
                        return requests(options);

                    case 10:
                        data = _context14.sent;
                        return _context14.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));

    return function ProjectAuditById(_x25, _x26) {
        return _ref14.apply(this, arguments);
    };
}();

//项目阶段
var ProjectStage = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee15(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context15.sent;
                        _context15.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context15.sent;
                        url = api.Business + 'ProjectID=' + id;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context15.next = 10;
                        return requests(options);

                    case 10:
                        data = _context15.sent;
                        return _context15.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));

    return function ProjectStage(_x27, _x28) {
        return _ref15.apply(this, arguments);
    };
}();

//项目委托信息
var ProjectDelegate = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee16(username, id) {
        var code, token;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context16.sent;
                        _context16.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context16.sent;

                    case 6:
                    case 'end':
                        return _context16.stop();
                }
            }
        }, _callee16, this);
    }));

    return function ProjectDelegate(_x29, _x30) {
        return _ref16.apply(this, arguments);
    };
}();

var getContact = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee17(username, id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        _context17.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context17.sent;
                        _context17.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context17.sent;
                        url = api.Users + 'ProjectID=' + id;

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context17.next = 11;
                        return requests(options);

                    case 11:
                        data = _context17.sent;
                        return _context17.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));

    return function getContact(_x31, _x32) {
        return _ref17.apply(this, arguments);
    };
}();

var RemoveAction = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee18(user, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        _context18.next = 2;
                        return getPhoneCode(user);

                    case 2:
                        code = _context18.sent;
                        _context18.next = 5;
                        return apiToken(user, code.RandomCode);

                    case 5:
                        token = _context18.sent;

                        console.log(query);
                        url = api.RemoveAction + '/' + query.ID;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: query
                        };
                        _context18.next = 11;
                        return requests(options);

                    case 11:
                        data = _context18.sent;
                        return _context18.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));

    return function RemoveAction(_x33, _x34) {
        return _ref18.apply(this, arguments);
    };
}();

//提交审核
var SubmitAudit = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee19(user, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        _context19.next = 2;
                        return getPhoneCode(user);

                    case 2:
                        code = _context19.sent;
                        _context19.next = 5;
                        return apiToken(user, code.RandomCode);

                    case 5:
                        token = _context19.sent;
                        url = api.RemoveAction + '/' + query.ID;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: query
                        };
                        _context19.next = 10;
                        return __WEBPACK_IMPORTED_MODULE_1_request_promise___default()(options);

                    case 10:
                        data = _context19.sent;
                        return _context19.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context19.stop();
                }
            }
        }, _callee19, this);
    }));

    return function SubmitAudit(_x35, _x36) {
        return _ref19.apply(this, arguments);
    };
}();

//商务阶段详细
var ProjectBusiness = function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee20(user, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        _context20.next = 2;
                        return getPhoneCode(user);

                    case 2:
                        code = _context20.sent;
                        _context20.next = 5;
                        return apiToken(user, code.RandomCode);

                    case 5:
                        token = _context20.sent;
                        url = api.ProjectBusiness + 'HasApprove=' + query.HasApprove + '&value=' + query.value + '&_valueFeild=value';
                        options = {
                            method: 'Get',
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context20.next = 10;
                        return __WEBPACK_IMPORTED_MODULE_1_request_promise___default()(options);

                    case 10:
                        data = _context20.sent;
                        return _context20.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));

    return function ProjectBusiness(_x37, _x38) {
        return _ref20.apply(this, arguments);
    };
}();

//商务最新的阶段
var BusinessStage = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee21(username, Id) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        _context21.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context21.sent;
                        _context21.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context21.sent;
                        url = api.BusinessStage + 'ProjectID=' + Id;

                        console.log(url);
                        options = {
                            method: 'get',
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context21.next = 11;
                        return requests(options);

                    case 11:
                        data = _context21.sent;
                        return _context21.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));

    return function BusinessStage(_x39, _x40) {
        return _ref21.apply(this, arguments);
    };
}();

var GetOptions = function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee22(username, query) {
        var OrgProperty, CompanyType, rows, page, code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        OrgProperty = query.OrgProperty, CompanyType = query.CompanyType, rows = query.rows, page = query.page;

                        console.log(query);
                        _context22.next = 4;
                        return getPhoneCode(username);

                    case 4:
                        code = _context22.sent;
                        _context22.next = 7;
                        return apiToken(username, code.RandomCode);

                    case 7:
                        token = _context22.sent;
                        url = api.GetOptions + 'OrgProperty=' + encodeURI(OrgProperty) + '&CompanyType=' + encodeURI(CompanyType) + '&page=' + page + '&rows=' + rows;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context22.next = 12;
                        return requests(options);

                    case 12:
                        data = _context22.sent;
                        return _context22.abrupt('return', data);

                    case 14:
                    case 'end':
                        return _context22.stop();
                }
            }
        }, _callee22, this);
    }));

    return function GetOptions(_x41, _x42) {
        return _ref22.apply(this, arguments);
    };
}();

var GetClientUnit = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee23(username, query) {
        var OrgProperty, rows, page, code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        OrgProperty = query.OrgProperty, rows = query.rows, page = query.page;
                        _context23.next = 3;
                        return getPhoneCode(username);

                    case 3:
                        code = _context23.sent;
                        _context23.next = 6;
                        return apiToken(username, code.RandomCode);

                    case 6:
                        token = _context23.sent;
                        url = api.GetOptions + 'OrgProperty=' + encodeURI(OrgProperty) + '&page=' + page + '&rows=' + rows;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context23.next = 11;
                        return requests(options);

                    case 11:
                        data = _context23.sent;
                        return _context23.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context23.stop();
                }
            }
        }, _callee23, this);
    }));

    return function GetClientUnit(_x43, _x44) {
        return _ref23.apply(this, arguments);
    };
}();

var CommitProject = function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee24(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        _context24.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context24.sent;
                        _context24.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context24.sent;
                        url = '' + api.commitProject;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context24.next = 10;
                        return requests(options);

                    case 10:
                        data = _context24.sent;
                        return _context24.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context24.stop();
                }
            }
        }, _callee24, this);
    }));

    return function CommitProject(_x45, _x46) {
        return _ref24.apply(this, arguments);
    };
}();

var CommitBiding = function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee25(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        _context25.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context25.sent;
                        _context25.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context25.sent;
                        url = '' + api.CommitBiding;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context25.next = 10;
                        return requests(options);

                    case 10:
                        data = _context25.sent;
                        return _context25.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context25.stop();
                }
            }
        }, _callee25, this);
    }));

    return function CommitBiding(_x47, _x48) {
        return _ref25.apply(this, arguments);
    };
}();

var CommitQuotedPrice = function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee26(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        _context26.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context26.sent;
                        _context26.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context26.sent;
                        url = api.CommitQuotedPrice + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context26.next = 10;
                        return requests(options);

                    case 10:
                        data = _context26.sent;
                        return _context26.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context26.stop();
                }
            }
        }, _callee26, this);
    }));

    return function CommitQuotedPrice(_x49, _x50) {
        return _ref26.apply(this, arguments);
    };
}();

//审核数据
var SetBusinessState = function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee27(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee27$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        _context27.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context27.sent;
                        _context27.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context27.sent;
                        url = api.BusinessState + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context27.next = 10;
                        return requests(options);

                    case 10:
                        data = _context27.sent;
                        return _context27.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context27.stop();
                }
            }
        }, _callee27, this);
    }));

    return function SetBusinessState(_x51, _x52) {
        return _ref27.apply(this, arguments);
    };
}();

//审核商务阶段跟踪反馈数据
var SetBusinessPhaseState = function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee28(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        _context28.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context28.sent;
                        _context28.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context28.sent;
                        url = api.BusinessState + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context28.next = 10;
                        return requests(options);

                    case 10:
                        data = _context28.sent;
                        return _context28.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context28.stop();
                }
            }
        }, _callee28, this);
    }));

    return function SetBusinessPhaseState(_x53, _x54) {
        return _ref28.apply(this, arguments);
    };
}();

//审核报价申请
var SetQuotedPriceState = function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee29(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee29$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        _context29.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context29.sent;
                        _context29.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context29.sent;
                        url = api.QuotedPriceState + '/' + form.ID;
                        options = {
                            method: "post",
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context29.next = 10;
                        return requests(options);

                    case 10:
                        data = _context29.sent;
                        return _context29.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context29.stop();
                }
            }
        }, _callee29, this);
    }));

    return function SetQuotedPriceState(_x55, _x56) {
        return _ref29.apply(this, arguments);
    };
}();

//商务阶段提交撤销
var RemoveBusiness = function () {
    var _ref30 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee30(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee30$(_context30) {
            while (1) {
                switch (_context30.prev = _context30.next) {
                    case 0:
                        _context30.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context30.sent;
                        _context30.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context30.sent;
                        url = api.BusinessState + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context30.next = 10;
                        return requests(options);

                    case 10:
                        data = _context30.sent;
                        return _context30.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context30.stop();
                }
            }
        }, _callee30, this);
    }));

    return function RemoveBusiness(_x57, _x58) {
        return _ref30.apply(this, arguments);
    };
}();

//商务阶段撤销提交
var RemoveBusinessPhaseGroup = function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee31(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee31$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        _context31.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context31.sent;
                        _context31.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context31.sent;
                        url = api.PhaseFeedback + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context31.next = 10;
                        return requests(options);

                    case 10:
                        data = _context31.sent;
                        return _context31.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context31.stop();
                }
            }
        }, _callee31, this);
    }));

    return function RemoveBusinessPhaseGroup(_x59, _x60) {
        return _ref31.apply(this, arguments);
    };
}();

//报价申请数据撤销
var RemoveQuotedPrice = function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee32(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee32$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        _context32.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context32.sent;
                        _context32.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context32.sent;
                        url = api.QuotedPriceState + '/' + form.ID;

                        console.log(url);
                        options = {
                            method: "post",
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context32.next = 11;
                        return requests(options);

                    case 11:
                        data = _context32.sent;
                        return _context32.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context32.stop();
                }
            }
        }, _callee32, this);
    }));

    return function RemoveQuotedPrice(_x61, _x62) {
        return _ref32.apply(this, arguments);
    };
}();

//撤销投标申请
var RemoveBiding = function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee33(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee33$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        _context33.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context33.sent;
                        _context33.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context33.sent;
                        url = api.BidingState + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context33.next = 10;
                        return requests(options);

                    case 10:
                        data = _context33.sent;
                        return _context33.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context33.stop();
                }
            }
        }, _callee33, this);
    }));

    return function RemoveBiding(_x63, _x64) {
        return _ref33.apply(this, arguments);
    };
}();

//合同
var RemoveContact = function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee34(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee34$(_context34) {
            while (1) {
                switch (_context34.prev = _context34.next) {
                    case 0:
                        _context34.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context34.sent;
                        _context34.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context34.sent;
                        url = api.ContractState + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context34.next = 10;
                        return requests(options);

                    case 10:
                        data = _context34.sent;
                        return _context34.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context34.stop();
                }
            }
        }, _callee34, this);
    }));

    return function RemoveContact(_x65, _x66) {
        return _ref34.apply(this, arguments);
    };
}();

//收款登记
var RemoveReceive = function () {
    var _ref35 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee35(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee35$(_context35) {
            while (1) {
                switch (_context35.prev = _context35.next) {
                    case 0:
                        _context35.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context35.sent;
                        _context35.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context35.sent;
                        url = api.ReceiveState + '/' + form.ID;
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context35.next = 10;
                        return requests(options);

                    case 10:
                        data = _context35.sent;
                        return _context35.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context35.stop();
                }
            }
        }, _callee35, this);
    }));

    return function RemoveReceive(_x67, _x68) {
        return _ref35.apply(this, arguments);
    };
}();

//搜索
var Search = function () {
    var _ref36 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee36(username, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee36$(_context36) {
            while (1) {
                switch (_context36.prev = _context36.next) {
                    case 0:
                        console.log(query);
                        _context36.next = 3;
                        return getPhoneCode(username);

                    case 3:
                        code = _context36.sent;
                        _context36.next = 6;
                        return apiToken(username, code.RandomCode);

                    case 6:
                        token = _context36.sent;
                        url = api.Search + 'ProjectName=' + encodeURI(query.searchText) + '&page=' + query.page + '&rows=' + query.rows;

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context36.next = 12;
                        return requests(options);

                    case 12:
                        data = _context36.sent;
                        return _context36.abrupt('return', data);

                    case 14:
                    case 'end':
                        return _context36.stop();
                }
            }
        }, _callee36, this);
    }));

    return function Search(_x69, _x70) {
        return _ref36.apply(this, arguments);
    };
}();

var ProjectUpdtae = function () {
    var _ref37 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee37(username, id, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee37$(_context37) {
            while (1) {
                switch (_context37.prev = _context37.next) {
                    case 0:
                        _context37.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context37.sent;
                        _context37.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context37.sent;
                        url = '' + api.ProjectUpdtae + id;
                        options = {
                            url: url,
                            method: 'POST',
                            body: form,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context37.next = 10;
                        return requests(options);

                    case 10:
                        data = _context37.sent;
                        return _context37.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context37.stop();
                }
            }
        }, _callee37, this);
    }));

    return function ProjectUpdtae(_x71, _x72, _x73) {
        return _ref37.apply(this, arguments);
    };
}();

//更新技术指派人
var EditTechnicalManager = function () {
    var _ref38 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee38(username, id, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee38$(_context38) {
            while (1) {
                switch (_context38.prev = _context38.next) {
                    case 0:
                        _context38.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context38.sent;

                        console.log(code);
                        _context38.next = 6;
                        return apiToken(username, code.RandomCode);

                    case 6:
                        token = _context38.sent;

                        console.log(token);
                        url = '' + api.EditTechnicalManager + id;
                        options = {
                            url: url,
                            method: 'POST',
                            body: form,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context38.next = 12;
                        return requests(options);

                    case 12:
                        data = _context38.sent;
                        return _context38.abrupt('return', data);

                    case 14:
                    case 'end':
                        return _context38.stop();
                }
            }
        }, _callee38, this);
    }));

    return function EditTechnicalManager(_x74, _x75, _x76) {
        return _ref38.apply(this, arguments);
    };
}();

// 更新商务阶段指派人
var EditBusinessManager = function () {
    var _ref39 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee39(username, id, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee39$(_context39) {
            while (1) {
                switch (_context39.prev = _context39.next) {
                    case 0:
                        _context39.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context39.sent;
                        _context39.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context39.sent;

                        console.log(token);
                        url = '' + api.EditBusinessManager + id;
                        options = {
                            url: url,
                            method: 'POST',
                            body: form,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context39.next = 11;
                        return requests(options);

                    case 11:
                        data = _context39.sent;
                        return _context39.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context39.stop();
                }
            }
        }, _callee39, this);
    }));

    return function EditBusinessManager(_x77, _x78, _x79) {
        return _ref39.apply(this, arguments);
    };
}();

//商务阶段更新提交
var BusinessCommit = function () {
    var _ref40 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee40(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee40$(_context40) {
            while (1) {
                switch (_context40.prev = _context40.next) {
                    case 0:
                        _context40.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context40.sent;
                        _context40.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context40.sent;
                        url = '' + api.BusinessCommit;
                        options = {
                            url: url,
                            method: 'POST',
                            body: form,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context40.next = 10;
                        return requests(options);

                    case 10:
                        data = _context40.sent;
                        return _context40.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context40.stop();
                }
            }
        }, _callee40, this);
    }));

    return function BusinessCommit(_x80, _x81) {
        return _ref40.apply(this, arguments);
    };
}();

//项目收款登记
var ReceiveGroup = function () {
    var _ref41 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee41(username, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee41$(_context41) {
            while (1) {
                switch (_context41.prev = _context41.next) {
                    case 0:
                        _context41.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context41.sent;
                        _context41.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context41.sent;

                        //http://localhost:2437/api/BasicData/Contract/GetOptions?value=62253760-EA67-42DD-A14D-0B0D259DCE34&_valueFeild=value
                        url = api.ReceiveGroup + 'value=' + query.value + '&_valueFeild=value';

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context41.next = 11;
                        return requests(options);

                    case 11:
                        data = _context41.sent;

                        console.log(data);
                        return _context41.abrupt('return', data);

                    case 14:
                    case 'end':
                        return _context41.stop();
                }
            }
        }, _callee41, this);
    }));

    return function ReceiveGroup(_x82, _x83) {
        return _ref41.apply(this, arguments);
    };
}();

//项目投标
var GetBiding = function () {
    var _ref42 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee42(username, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee42$(_context42) {
            while (1) {
                switch (_context42.prev = _context42.next) {
                    case 0:
                        console.log('xxx');
                        _context42.next = 3;
                        return getPhoneCode(username);

                    case 3:
                        code = _context42.sent;
                        _context42.next = 6;
                        return apiToken(username, code.RandomCode);

                    case 6:
                        token = _context42.sent;
                        url = api.GetBiding + 'HasApprove=' + query.hasApprove + '&value=' + query.value + '&_valueFeild=value';

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context42.next = 12;
                        return requests(options);

                    case 12:
                        data = _context42.sent;

                        console.log(data);
                        return _context42.abrupt('return', data);

                    case 15:
                    case 'end':
                        return _context42.stop();
                }
            }
        }, _callee42, this);
    }));

    return function GetBiding(_x84, _x85) {
        return _ref42.apply(this, arguments);
    };
}();

//项目商务阶段跟踪任务反馈提交 
var PhaseFeedback = function () {
    var _ref43 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee43(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee43$(_context43) {
            while (1) {
                switch (_context43.prev = _context43.next) {
                    case 0:
                        _context43.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context43.sent;
                        _context43.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context43.sent;
                        url = '' + api.PhaseFeedback;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        _context43.next = 10;
                        return requests(options);

                    case 10:
                        data = _context43.sent;
                        return _context43.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context43.stop();
                }
            }
        }, _callee43, this);
    }));

    return function PhaseFeedback(_x86, _x87) {
        return _ref43.apply(this, arguments);
    };
}();

var BidingCommit = function () {
    var _ref44 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee44() {
        var code, token, url, options;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee44$(_context44) {
            while (1) {
                switch (_context44.prev = _context44.next) {
                    case 0:
                        _context44.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context44.sent;
                        _context44.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context44.sent;
                        url = '';
                        options = {
                            method: 'post',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };

                    case 8:
                    case 'end':
                        return _context44.stop();
                }
            }
        }, _callee44, this);
    }));

    return function BidingCommit() {
        return _ref44.apply(this, arguments);
    };
}();

var CommitQutoedPrice = function () {
    var _ref45 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee45(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee45$(_context45) {
            while (1) {
                switch (_context45.prev = _context45.next) {
                    case 0:
                        _context45.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context45.sent;
                        _context45.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context45.sent;
                        url = '' + api.CommitQuotedPrice;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        data = requests(options);
                        return _context45.abrupt('return', data);

                    case 10:
                    case 'end':
                        return _context45.stop();
                }
            }
        }, _callee45, this);
    }));

    return function CommitQutoedPrice(_x88, _x89) {
        return _ref45.apply(this, arguments);
    };
}();

var CommitContract = function () {
    var _ref46 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee46(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee46$(_context46) {
            while (1) {
                switch (_context46.prev = _context46.next) {
                    case 0:
                        _context46.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context46.sent;
                        _context46.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context46.sent;
                        url = '' + api.CommitContract;
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            body: form
                        };
                        data = requests(options);

                    case 9:
                    case 'end':
                        return _context46.stop();
                }
            }
        }, _callee46, this);
    }));

    return function CommitContract(_x90, _x91) {
        return _ref46.apply(this, arguments);
    };
}();

var GetQuotedPrice = function () {
    var _ref47 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee47(username, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee47$(_context47) {
            while (1) {
                switch (_context47.prev = _context47.next) {
                    case 0:
                        _context47.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context47.sent;
                        _context47.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context47.sent;
                        url = api.GetBiding + 'HasApprove=' + query.hasApprove + '&value=' + query.value + '&_valueFeild=value';
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context47.next = 10;
                        return requests(options);

                    case 10:
                        data = _context47.sent;
                        return _context47.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context47.stop();
                }
            }
        }, _callee47, this);
    }));

    return function GetQuotedPrice(_x92, _x93) {
        return _ref47.apply(this, arguments);
    };
}();

//检查当前项目有没有合同
var CheckReceive = function () {
    var _ref48 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee48(username, query) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee48$(_context48) {
            while (1) {
                switch (_context48.prev = _context48.next) {
                    case 0:
                        _context48.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context48.sent;
                        _context48.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context48.sent;
                        url = api.CheckReceive + 'ProjectID=' + query.ProjectID + '&page=' + query.page + '&rows=' + query.rows;

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context48.next = 11;
                        return requests(options);

                    case 11:
                        data = _context48.sent;
                        return _context48.abrupt('return', data);

                    case 13:
                    case 'end':
                        return _context48.stop();
                }
            }
        }, _callee48, this);
    }));

    return function CheckReceive(_x94, _x95) {
        return _ref48.apply(this, arguments);
    };
}();

//添加收款登记
var CommitReceive = function () {
    var _ref49 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee49(username, form) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee49$(_context49) {
            while (1) {
                switch (_context49.prev = _context49.next) {
                    case 0:
                        _context49.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context49.sent;
                        _context49.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context49.sent;
                        url = '' + api.CommitReceive;
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            method: 'POST',
                            body: form
                        };
                        _context49.next = 10;
                        return requests(options);

                    case 10:
                        data = _context49.sent;
                        return _context49.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context49.stop();
                }
            }
        }, _callee49, this);
    }));

    return function CommitReceive(_x96, _x97) {
        return _ref49.apply(this, arguments);
    };
}();

//导入人员

var GetAllStaff = function () {
    var _ref50 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee50(url, username, form) {
        var code, token, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee50$(_context50) {
            while (1) {
                switch (_context50.prev = _context50.next) {
                    case 0:
                        _context50.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context50.sent;
                        _context50.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context50.sent;

                        console.log(url);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            }
                        };
                        _context50.next = 10;
                        return requests(options);

                    case 10:
                        data = _context50.sent;
                        return _context50.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context50.stop();
                }
            }
        }, _callee50, this);
    }));

    return function GetAllStaff(_x98, _x99, _x100) {
        return _ref50.apply(this, arguments);
    };
}();

//权限--用户角色
var GetRoles = function () {
    var _ref51 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee51(username, userCode) {
        var code, token, url, options, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee51$(_context51) {
            while (1) {
                switch (_context51.prev = _context51.next) {
                    case 0:
                        _context51.next = 2;
                        return getPhoneCode(username);

                    case 2:
                        code = _context51.sent;
                        _context51.next = 5;
                        return apiToken(username, code.RandomCode);

                    case 5:
                        token = _context51.sent;
                        url = api.RoleUsers + 'UserCode=' + encodeURI(userCode);
                        options = {
                            url: url,
                            headers: {
                                Authorization: token.token
                            },
                            method: 'Get'
                        };
                        _context51.next = 10;
                        return requests(options);

                    case 10:
                        data = _context51.sent;
                        return _context51.abrupt('return', data);

                    case 12:
                    case 'end':
                        return _context51.stop();
                }
            }
        }, _callee51, this);
    }));

    return function GetRoles(_x101, _x102) {
        return _ref51.apply(this, arguments);
    };
}();

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wechat__ = __webpack_require__(2);
/* harmony export (immutable) */ exports["getAuthorizeURL"] = getAuthorizeURL;
/* harmony export (binding) */ __webpack_require__.d(exports, "getUserByCode", function() { return getUserByCode; });


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 微信接口
 */


var client = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__wechat__["getWechat"])();

// export async function getSignatureAsync (url) {
//   const data = await client.fetchAccessToken()
//   const token = data.access_token
//   const ticketData = await client.fetchTicket(token)
//   const ticket = ticketData.ticket

//   let params = client.sign(ticket, url)
//   params.appId = client.appID

//   return params
// }

function getAuthorizeURL() {
  var oauth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__wechat__["getOAuth"])();
  return oauth.getAuthorizeUrl.apply(oauth, arguments);
}

var getUserByCode = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(code) {
    var oauth, ticket, data, user;
    return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            oauth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__wechat__["getOAuth"])();
            _context.next = 3;
            return client.fetchTicket();

          case 3:
            ticket = _context.sent;
            _context.next = 6;
            return oauth.fetchAccessToken(ticket.access_token, code);

          case 6:
            data = _context.sent;
            _context.next = 9;
            return oauth.fetchUserInfo(ticket.access_token, data.user_ticket);

          case 9:
            user = _context.sent;
            return _context.abrupt('return', {
              userid: user.userid,
              name: user.name,
              mobile: user.mobile,
              gender: user.gender,
              email: user.email,
              avatar: user.avatar,
              qr_code: user.qr_code
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getUserByCode(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_querystring__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_querystring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_querystring__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return signature; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return redirect; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return oauth; });


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 负责和微信打交道控制器
 */





var signature = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var url, params;
    return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = ctx.query.url;


            if (!url) ctx.throw(404);

            url = decodeURIComponent(url);

            _context.next = 5;
            return __WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */].wechat.getSignatureAsync(url);

          case 5:
            params = _context.sent;


            ctx.body = {
              success: true,
              data: params
            };

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signature(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var redirect = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var target, scope, _ctx$query, visit, id, params, url;

    return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            target = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].SITE_ROOT_URL + '/oauth';

            console.log(target + '域名');
            scope = 'snsapi_privateinfo';
            _ctx$query = ctx.query, visit = _ctx$query.visit, id = _ctx$query.id;
            params = id ? visit + '_' + id : visit;
            url = __WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */].wechat.getAuthorizeURL(scope, target, params);

            ctx.redirect(url);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function redirect(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var oauth = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    var url, urlObj, params, code, user;
    return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = ctx.query.url;

            console.log(url);
            url = decodeURIComponent(url);

            urlObj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_url__["parse"])(url);
            params = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_querystring__["parse"])(urlObj.query);
            code = params.code;
            _context3.next = 8;
            return __WEBPACK_IMPORTED_MODULE_4__api__["a" /* default */].wechat.getUserByCode(code);

          case 8:
            user = _context3.sent;

            ctx.session.user = user;
            ctx.body = {
              success: true,
              data: user
            };

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function oauth(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);


var Promise = __webpack_require__(10);

exports.readFileAsync = function (fpath) {
	return new Promise(function (resolve, reject) {
		__WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFile(fpath, function (err, content) {
			if (err) {
				reject(err);
			} else {
				resolve(content);
			}
		});
	});
};
exports.writeFileAsync = function (fpath, content) {
	return new Promise(function (resolve, reject) {
		__WEBPACK_IMPORTED_MODULE_0_fs___default.a.writeFile(fpath, content, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return getAllUsers; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return createDep; });
/* unused harmony export clearDepData */


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



//获取所有的人员,批量添加到企业微信的通讯录中
var transliteration = __webpack_require__(6);

var getAllUsers = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
        var page, base, url, username, map, dep, form, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        page = 1;
                        base = 'http://localhost:2437/';
                        //const url = `http://jgjzkj.rjtms.com/api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=${page}&rows=20`

                        url = base + 'api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=' + page + '&rows=70';
                        username = 'super';
                        map = [];
                        dep = [];
                        form = [];
                        _context.next = 9;
                        return __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].project.GetAllStaff(url, username, form);

                    case 9:
                        data = _context.sent;

                        console.log('\u5171\u62FF\u5230' + data.rows.length + '\u6761\u6570\u636E');
                        if (data.rows.length > 0) {
                            data.rows.forEach(function (item, index) {
                                //transliteration.slugify(item.UserName)
                                map.push({});
                            });
                        } else {
                            console.log('已经抓取全部数据');
                        }
                        console.log('清洗之后数据');
                        console.log(map.length);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function getAllUsers() {
        return _ref.apply(this, arguments);
    };
}();

var createDep = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var page, username, form, base, url, dep, data;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        page = 1;
                        username = 'super';
                        form = [];
                        base = 'http://localhost:2437/';
                        //const url = `http://jgjzkj.rjtms.com/api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=${page}&rows=20`

                        url = base + 'api/sys/user/Get?UserName=&UserCode=&OrgName=&UserType=&DepartmentTitle=&page=' + page + '&rows=70';
                        dep = [];


                        console.log('开始抓取数据');

                        _context2.next = 9;
                        return __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].project.GetAllStaff(url, username, form);

                    case 9:
                        data = _context2.sent;

                        if (data.rows.length > 0) {
                            data.rows.forEach(function (item, index) {
                                if (item.OrgName === '上海建顾减震科技有限公司') {
                                    //console.log('不用管')
                                } else {
                                    dep.forEach(function (item, index) {
                                        if (item.name === item.OrgName) {} else {
                                            dep.push({
                                                "name": item.OrgName,
                                                "parentid": 1
                                            });
                                        }
                                    });
                                }
                            });
                            //  page++
                        } else {
                            console.log('已经抓取全部数据');
                        }
                        console.log(dep);
                        return _context2.abrupt('return', dep);

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function createDep() {
        return _ref2.apply(this, arguments);
    };
}();

var clearDepData = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(depName, depMap) {
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        depMap.forEach(function (item, index) {
                            if (item.name === depName) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    }));

    return function clearDepData(_x, _x2) {
        return _ref3.apply(this, arguments);
    };
}();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var Promise = __webpack_require__(10);
var request = Promise.promisify(__webpack_require__(42));
var util = __webpack_require__(8);
var fs = __webpack_require__(5);
var menu = __webpack_require__(9);
var crypto = __webpack_require__(34);
//https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRECT
var prefix = 'https://qyapi.weixin.qq.com/cgi-bin/';
var api = {
  accessToken: prefix + 'gettoken?',
  users: {
    create: prefix + 'user/create?',
    get: prefix + 'user/get?',
    update: prefix + 'user/update?',
    del: prefix + 'user/delete?',
    dellist: prefix + 'user/batchdelete?',
    getdepartment: prefix + 'user/simplelist?',
    getdepartmentdetail: prefix + 'user/list'
  },
  department: {
    create: prefix + 'department/create?',
    update: prefix + 'department/update?',
    del: prefix + 'department/delete?',
    get: prefix + 'department/list?'
  },
  tag: {
    create: prefix + 'tag/create?',
    update: prefix + 'tag/update?',
    del: prefix + 'tag/delete?',
    getUsers: prefix + 'tag/get?',
    addUsers: prefix + 'tag/addtagusers?',
    delUsers: prefix + 'tag/deltagusers',
    getlist: prefix + 'tag/list?'
  },
  menu: {
    create: prefix + 'menu/create?',
    get: prefix + 'menu/get?',
    del: prefix + 'menu/delete?'
  },
  send: prefix + 'message/send?',
  media: {
    upload: prefix + 'media/upload?',
    get: prefix + 'media/get?'
  }

};
function Wechat(opts) {
  // var that=this;
  console.log(opts);
  this.corpid = opts.corpid;
  this.secret = opts.secret;
  this.agentId = opts.agentId;
  this.appsecret = opts.appsecret;
  this.getAccessToken = opts.getAccessToken;
  this.saveAccessToken = opts.saveAccessToken;
  this.getTicket = opts.getTicket;
  this.saveTicket = opts.saveTicket; //encodingaeskey
  this.encodingaeskey = opts.encodingaeskey;
  this.token = opts.token;
  this.fetchAccessToken();
  this.fetchTicket();

  //验证开发者服务器
  this.aesKey = new Buffer(opts.encodingaeskey + '=', 'base64');
  this.iv = this.aesKey.slice(0, 16);
};
Wechat.prototype.PKCS7Decoder = function (buff) {
  var pad = buff[buff.length - 1];
  if (pad < 1 || pad > 32) {
    pad = 0;
  }
  return buff.slice(0, buff.length - pad);
};
/**
 * [timestamp 时间戳函数]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @param    {[type]}   delay [description]
 * @return   {[type]}         [description]
 */
Wechat.prototype.timestamp = function (delay) {
  delay = Number(delay) || 0;
  return parseInt(new Date().valueOf() / 1000) + delay * 1000;
};

/**
 * [encrypt 给响应下消息进行加密]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @param    {[xml]}   xmlMsg [要加密的消息]
 * @return   返回加密的密文
 */
Wechat.prototype.encrypt = function (xmlMsg) {
  var random16 = crypto.pseudoRandomBytes(16);
  var msg = new Buffer(xmlMsg);
  var msgLength = new Buffer(4);
  msgLength.writeUInt32BE(msg.length, 0);
  var corpid = new Buffer(this.corpid);
  var rawMsg = Buffer.concat([random16, msgLength, msg, corpid]);
  var cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv);
  var cipheredMsg = Buffer.concat([cipher.update(rawMsg), cipher.final()]);

  return cipheredMsg.toString('base64');
};

/**
 * [decrypr  接收用户的消息进行解密]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @param    {[type]}   echostr [description]
 * @return   返回解密后明文
 */
Wechat.prototype.decrypr = function (echostr) {
  var aesCipher = crypto.createDecipheriv("aes-256-cbc", this.aesKey, this.iv);
  aesCipher.setAutoPadding(false);
  var decipheredBuff = Buffer.concat([aesCipher.update(echostr, 'base64'), aesCipher.final()]);
  decipheredBuff = this.PKCS7Decoder(decipheredBuff);
  var len_netOrder_corpid = decipheredBuff.slice(16);
  var msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0);
  var result = len_netOrder_corpid.slice(4, msg_len + 4).toString();

  return result; // 返回一个解密后的明文
};
/**
 * [getSignature description]
 * @Author   leibo
 * @DateTime 2017-09-27
 */
Wechat.prototype.getSignature = function (token, timestamp, nonce, echostr) {
  var key = [token, timestamp, nonce, echostr].sort().join('');
  var sha1 = crypto.createHash('sha1');
  sha1.update(key);
  return sha1.digest('hex');
};
//验证此次的消息是微信服务器发送的
Wechat.prototype.verifyURL = function (signature, token, timestamp, nonce, echostr) {
  return this.getSignature(token, timestamp, nonce, echostr) == signature;
};
/**
 * [encryptMsgs 消息加密]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @return   {[xml]}   返回给微信服务器
 */
Wechat.prototype.encryptMsgs = function (replyxml, opts) {
  var options = opts || {};
  var encrypt = this.encrypt(replyxml);
  var nonce = options.nonce || parseInt(Math.random() * 100000000000, 10);
  var timestamp = this.timestamp();
  var msgsignature = this.getSignature(this.token, timestamp, nonce, encrypt);
  var resxml = '\n      <xml>\n        <Encrypt><![CDATA[' + encrypt + ']]></Encrypt>\n        <MsgSignature><![CDATA[' + msgsignature + ']]></MsgSignature>\n        <TimeStamp>' + timestamp + '</TimeStamp>\n        <Nonce><![CDATA[' + nonce + ']]></Nonce>\n      </xml>\n    ';
  return resxml;
};
//消息解密
Wechat.prototype.decryptMsg = function (msgSignature, token, timestamp, nonce, echostr) {
  var msgencrypt = echostr.Encrypt;
  if (this.getSignature(token, timestamp, nonce, msgencrypt) != msgSignature) {
    console.log('消息签名不一致');
    return false;
  }
  var decryptedMsg = this.decrypr(msgencrypt);
  // return parseXML(decryptedMsg,{explicitArray:false});
};

//获取access_token
Wechat.prototype.fetchAccessToken = function () {
  var that = this;
  return new Promise(function (resolve, reject) {

    if (that.access_token && that.expires_in) {
      if (that.isValidAccessToken(that)) {
        //access_token合法向下传递
        resolve(that);
      }
    }
    //重新获取access_token
    that.getAccessToken().then(function (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return that.updateAccessToken();
      }
      if (that.isValidAccessToken(data)) {
        return Promise.resolve(data);
      } else {
        return that.updateAccessToken();
      }
    }).then(function (data) {
      that.saveAccessToken(data);
      //access_token合法向下传递
      resolve(data);
    });
  });
};
//获取消息权限的access_token
Wechat.prototype.fetchTicket = function (access_token) {
  var that = this;
  return new Promise(function (resolve, reject) {

    that.getTicket().then(function (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return that.updateTicket(access_token);
      }
      if (that.isValidTicket(data)) {
        return Promise.resolve(data);
      } else {
        return that.updateTicket(access_token);
      }
    }).then(function (data) {
      that.saveTicket(data);

      resolve(data);
    });
  });
};

//添加成员
Wechat.prototype.createUser = function (form) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.users.create + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: form, json: true }).then(function (response) {});
    });
  });
};

//读取成员
Wechat.prototype.getUser = function (userid) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.users.get + "access_token=" + data.access_token + '&userid=' + userid;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        resolve(response.body);
      });
    });
  });
};

//更新成员
Wechat.prototype.updateUser = function (form) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.users.update + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: form, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//删除成员
Wechat.prototype.delUser = function (userid) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.users.get + "access_token=" + data.access_token + '&userid=' + userid;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};
//批量删除成员
Wechat.prototype.delUserList = function (useridlist) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.users.dellist + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//获取部门成员
Wechat.prototype.getDepartment = function (depid, fetch) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.users.getdepartment + "access_token=" + data.access_token + '&department_id=' + depid + '&fetch_child=' + fetch;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//获取部门成员详情
Wechat.prototype.getDepartmentdetail = function () {};

//创建部门
Wechat.prototype.createDep = function (form) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.department.create + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: form, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//更新部门
Wechat.prototype.updateDep = function (form) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.department.update + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, form: form, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//删除部门
Wechat.prototype.delDep = function (depid) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.department.del + 'access_token=' + data.access_token + '&id' + depid;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//获取部门列表
Wechat.prototype.getDep = function (depid) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.department.get + "access_token=" + data.access_token + "&id=" + depid;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body.errmsg);
        console.log(response.body);
      });
    });
  });
};

//创建标签
Wechat.prototype.createTag = function (form) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.tag.create + 'access_token=' + data.access_token;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//修改标签
Wechat.prototype.updateTag = function (form) {
  var that = this;
  return new Promise(function (response, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.tag.update + 'access_token=' + data.access_token;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//删除标签
Wechat.prototype.delTag = function (tagid) {
  var that = this;
  return new Promise(function (response, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.tag.del + "access_token=" + data.access_token + '&tagid=' + tagid;
      request({ method: 'POST', url: url, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//获取标签成员
Wechat.prototype.getUserbyTag = function (tagid) {
  var that = this;
  return new Promise(function (response, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.tag.getUsers + 'access_token=' + data.access_token + '&tagid=' + tagid;
      request({ method: 'POST', url: url, json: ture }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//增加标签成员
Wechat.prototype.addUsersByTag = function () {};

//创建菜单
Wechat.prototype.createMenu = function (menu) {
  var that = this;
  var agentId = that.agentId;
  return new Promise(function (resolve, reject) {
    that.fetchTicket().then(function (data) {

      var url = api.menu.create + 'access_token=' + data.access_token + '&agentid=' + agentId;
      request({ method: 'POST', url: url, body: menu, json: true }).then(function (response) {
        resolve(response);
      }, function (err) {
        reject(err);
      });
    });
  });
};

//删除菜单
Wechat.prototype.delMenu = function () {
  var that = this;
  var agentId = that.agentId;
  return new Promise(function (resolve, reject) {
    that.fetchTicket().then(function (data) {

      var url = api.menu.del + 'access_token=' + data.access_token + '&agentid=' + agentId;
      request({ method: 'GET', url: url, json: true }).then(function (response) {
        resolve(response);
      }, function (err) {
        reject(err);
      });
    });
  });
};

//推送消息
Wechat.prototype.sendMessgae = function (reply) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var msg = util.sendtpl(reply);
    console.log(msg);
    that.fetchTicket().then(function (data) {
      var url = api.send + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: msg, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//发送图文消息
Wechat.prototype.Mpnews = function (username, reply) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var msg = {
      "touser": username,
      "toparty": "@all",
      "totag": "@all",
      "msgtype": "news",
      "agentid": 1000002,
      "news": {
        "articles": [{
          "title": reply.title,
          "description": reply.description,
          "url": reply.url,
          "picurl": reply.picurl,
          "btntxt": "详情"
        }]
      }
    };
    that.fetchTicket().then(function (data) {
      var url = api.send + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: msg, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//发送卡片消息
Wechat.prototype.sendMessgaebycard = function (username, reply) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var msg = {
      "touser": username,
      "msgtype": "textcard",
      "agentid": 1000002,
      "textcard": {
        "title": reply.title,
        "description": reply.description,
        "url": reply.url,
        "btntxt": "详情"
      }
    };
    that.fetchTicket().then(function (data) {
      var url = api.send + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: msg, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//发送文本文本消息
Wechat.prototype.sendMessgaebyText = function (username, content) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var msg = {
      "touser": username,
      "toparty": "@all",
      "totag": "@all",
      "msgtype": "text",
      "agentid": 1000002,
      "text": {
        "content": content
      },
      "safe": 0
    };
    that.fetchTicket().then(function (data) {
      var url = api.send + "access_token=" + data.access_token;
      request({ method: 'POST', url: url, body: msg, json: true }).then(function (response) {
        console.log(response.body);
      });
    });
  });
};

//获取用户信息
Wechat.prototype.getUserInfo = function (openId) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.fetchAccessToken().then(function (data) {
      var url = api.user.getUser + "access_token=" + data.access_token + '&openid' + openId + '&lang=zh_CN';

      request({ url: url, json: true }).then(function (response) {
        var _data = response.body;
        console.log(_data);
        resolve(_data);
      });
    });
  });
};
Wechat.prototype.isValidAccessToken = function (data) {
  if (!data || !data.access_token || !data.expires_in) {
    return false;
  } else {
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = new Date().getTime();
    if (now < expires_in) {
      return true;
    } else {
      return false;
    }
  }
};

Wechat.prototype.isValidTicket = function (data) {
  if (!data || !data.ticket || !data.expires_in) {
    return false;
  } else {
    var ticket = data.ticket;
    var expires_in = data.expires_in;
    var now = new Date().getTime();
    if (ticket && now < expires_in) {
      return true;
    } else {
      return false;
    }
  }
};
Wechat.prototype.updateAccessToken = function () {
  var corpid = this.corpid;
  var secret = this.secret;
  var url = api.accessToken + 'corpid=' + corpid + '&corpsecret=' + secret;
  return new Promise(function (resolve, reject) {

    request({ url: url, json: true }).then(function (response) {
      var data = response.body;
      var now = new Date().getTime();
      var expires_in = now + (data.expires_in - 20) * 1000;
      data.expires_in = expires_in;
      resolve(data);
    });
  });
};

Wechat.prototype.updateTicket = function (access_token) {
  var appsecret = this.appsecret;
  var corpid = this.corpid;
  var url = api.accessToken + 'corpid=' + corpid + '&corpsecret=' + appsecret;
  return new Promise(function (resolve, reject) {

    request({ url: url, json: true }).then(function (response) {
      var data = response.body;
      var now = new Date().getTime();
      var expires_in = now + (data.expires_in - 20) * 1000;
      data.expires_in = expires_in;
      resolve(data);
    });
  });
};
//回复消息
Wechat.prototype.reply = function () {
  var msgEncrypt = this.msgEncrypt;
};
module.exports = Wechat;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sha1__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sha1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sha1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_raw_body__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_raw_body___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_raw_body__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_xml2js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_xml2js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_xml2js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wechat_index__ = __webpack_require__(2);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






var Wechat = __webpack_require__(2);

/* harmony default export */ exports["a"] = function (opts, reply) {
	var wechat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__wechat_index__["getWechat"])();
	return function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
			var token, msg_signature, nonce, encodingaeskey, timestamp, echostr, str, a, data, content, xmlmsg, json, message, replyBody, msg, xml, msgEncrypt, opt;
			return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							token = opts.token;
							msg_signature = ctx.query.msg_signature;
							nonce = ctx.query.nonce;
							encodingaeskey = opts.encodingaeskey;
							timestamp = ctx.query.timestamp;
							echostr = ctx.query.echostr;
							str = [token, timestamp, nonce, encodingaeskey].sort().join('');

							if (!(ctx.method === 'GET')) {
								_context.next = 12;
								break;
							}

							console.log('验证服务器');
							if (wechat.verifyURL(msg_signature, token, timestamp, nonce, echostr)) {
								a = wechat.decrypr(echostr);

								ctx.body = a;
							} else {
								ctx.body = "wang:不是微信服务器";
							}
							_context.next = 38;
							break;

						case 12:
							if (!(ctx.method === 'POST')) {
								_context.next = 38;
								break;
							}

							_context.next = 15;
							return __WEBPACK_IMPORTED_MODULE_2_raw_body___default()(ctx.req, {
								length: ctx.length,
								limit: "1mb",
								encoding: ctx.charset
							});

						case 15:
							data = _context.sent;
							_context.next = 18;
							return __WEBPACK_IMPORTED_MODULE_3__util__["parseXMLAsync"](data);

						case 18:
							content = _context.sent;

							//对消息解密 Encrypt
							console.log(content);
							console.log(content.xml.Encrypt[0]);
							xmlmsg = wechat.decrypr(content.xml.Encrypt[0]);

							console.log(xmlmsg);
							json = "";

							__WEBPACK_IMPORTED_MODULE_4_xml2js___default.a.parseString(xmlmsg, { trim: true }, function (err, content) {
								json = content;
							});
							message = __WEBPACK_IMPORTED_MODULE_3__util__["formatMessage"](json.xml); //把用户消息抓转为json

							ctx.weixin = message; //挂载到this上
							console.log(message);
							_context.next = 30;
							return reply.apply(ctx, [ctx, next]);

						case 30:
							replyBody = ctx.body;
							msg = ctx.weixin;
							xml = __WEBPACK_IMPORTED_MODULE_3__util__["tpl"](replyBody, msg);
							msgEncrypt = wechat.encryptMsgs(xml);
							opt = {
								nonce: nonce
							};

							ctx.status = 200;
							ctx.type = 'application/xml';
							ctx.body = msgEncrypt;

						case 38:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function wechatMiddle(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return wechatMiddle;
	}();
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request_promise__);


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var api = {
    AuthorizeUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
    AccessTokenUrl: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
    UserInfoUrl: 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserdetail?',
    getUser: 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?'
};

var workOAuth = function () {
    function workOAuth(opts) {
        _classCallCheck(this, workOAuth);

        this.corpId = opts.corpid;
        this.corpSecret = opts.appsecret;
        this.agentId = opts.agentId;
    }

    _createClass(workOAuth, [{
        key: 'request',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(options) {
                var response;
                return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                options = Object.assign({}, options, { json: true });

                                _context.prev = 1;
                                _context.next = 4;
                                return __WEBPACK_IMPORTED_MODULE_1_request_promise___default()(options);

                            case 4:
                                response = _context.sent;
                                return _context.abrupt('return', response);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);

                                console.log(_context.t0);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function request(_x) {
                return _ref.apply(this, arguments);
            }

            return request;
        }()
    }, {
        key: 'getAuthorizeUrl',
        value: function getAuthorizeUrl() {
            var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'snsapi_privateinfo';
            var target = arguments[1];
            var state = arguments[2];

            var url = api.AuthorizeUrl + 'appid=' + this.corpId + '&redirect_uri=' + encodeURIComponent(target) + '&response_type=code&scope=' + scope + '&agentid=' + this.agentId + '&state=' + state + '#wechat_redirect';
            return url;
        }
    }, {
        key: 'fetchAccessToken',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(access_token, code) {
                var url, data;
                return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                url = api.getUser + 'access_token=' + access_token + '&code=' + code;
                                _context2.next = 3;
                                return this.request({ url: url });

                            case 3:
                                data = _context2.sent;
                                return _context2.abrupt('return', data);

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function fetchAccessToken(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return fetchAccessToken;
        }()
    }, {
        key: 'fetchUserInfo',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(access_token, user_ticket) {
                var url, options, data;
                return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                url = api.UserInfoUrl + 'access_token=' + access_token;
                                options = {
                                    method: 'POST',
                                    url: url,
                                    body: {
                                        "user_ticket": user_ticket
                                    }
                                };
                                _context3.next = 4;
                                return this.request(options);

                            case 4:
                                data = _context3.sent;
                                return _context3.abrupt('return', data);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function fetchUserInfo(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return fetchUserInfo;
        }()
    }]);

    return workOAuth;
}();

/* harmony default export */ exports["a"] = workOAuth;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var ejs = __webpack_require__(35);
var heredoc = __webpack_require__(36);

var tpl = heredoc(function () {/*
                               <xml>
                               <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
                               <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
                               <CreateTime><%= createTime%></CreateTime>
                               <MsgType><![CDATA[<%= msgType %>]]></MsgType>
                               <% if(msgType==='text') {%>
                               <Content><![CDATA[<%= content%>]]></Content>
                               <%} else if(msgType==='image') {%>
                               <Image>
                               <MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
                               </Image>
                               <%} else if(msgType==='voice') {%>
                               <Voice>
                               <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
                               </Voice>
                               <%} else if(msgType==='video') {%>
                               <Video>
                               <MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
                               <Title><![CDATA[<%= content.title%>]]></Title>
                               <Description><![CDATA[<%= content.description %>]]></Description>
                               </Video>
                               <%} else if(msgType==='music') {%>
                               <Music>
                               <Title><![CDATA[<%= content.title%>]]></Title>
                               <Description><![CDATA[<%= content.description %>]]></Description>
                               <MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
                               <HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
                               <ThumbMediaId><![CDATA[<%= content.mediaId%>]]></ThumbMediaId>
                               </Music>
                               <%} else if(msgType==='news') {%>
                               <ArticleCount><%= content.length%></ArticleCount>
                               <Articles>
                               <% content.forEach(function(item){%>
                               <item>
                               <Title><![CDATA[<%= item.title%>]]></Title> 
                               <Description><![CDATA[<%=item.description%>]]></Description>
                               <PicUrl><![CDATA[<%= item.picUrl%>]]></PicUrl>
                               <Url><![CDATA[<%= item.url%>]]></Url>
                               </item>
                               <% }) %>
                               </Articles>
                               <% } %>
                               </xml>
                               */});
//  "toparty":"@all",
//"totag":"@all",
var tplmsg = heredoc(function () {/*
                                  {
                                  "touser":"<%= touser%>",
                                  "msgtype":"<%= msgType%>",
                                  "agentid":1000002,
                                  <% if(msgType==='text'){%>
                                  "text":{
                                  "content":"<%= content%>"
                                  },
                                  "safe":0
                                  <% } else if(msgType==='image'){%>
                                  "image":{
                                  "media_id":<%= content.media_id%>,
                                  },
                                  "safe":0
                                  <% } else if(msgType==='voice'){%>
                                  "voice":{
                                  "media_id":<%= content.media_id%>,
                                  }
                                  <% } else if(msgType==='file'){%>
                                  "file":{
                                  "media_id" : "1Yv-zXfHjSjU-7LH-GwtYqDGS-zz6w22KmWAT5COgP7o",
                                  }
                                  <% } else if(msgType==='news'){%>
                                  "news":{
                                  "articles":[
                                  {
                                  "title":"<%= content.title%>",
                                  "description":"<%= content.description%>",
                                  "url":"<%= content.url%>",
                                  "picurl":"<%= content.picurl%>",
                                  "btntxt":"<%= content.btntxt%>"
                                  }
                                  ]
                                  }
                                  <% }else if(msgType==='textcard'){%>
                                  "textcard":{
                                  "title":<%= title%>,
                                  "description":<%= description%>,
                                  "url":<%= url%>,
                                  "btntxt":<%= btntxt%>
                                  }
                                  <% }%>
                                  }
                                  */});
var compiled = ejs.compile(tpl);
var sendmsg = ejs.compile(tplmsg);
exports = module.exports = {
	compiled: compiled,
	sendmsg: sendmsg
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wechat__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_constants__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_constants__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return reply; });
/* unused harmony export send */


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







var path = __webpack_require__(3);
var querystring = __webpack_require__(12);
var manba = __webpack_require__(11);
var menu = __webpack_require__(9);
var sd = __webpack_require__(15);
var transliteration = __webpack_require__(6);

var client = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__wechat__["getWechat"])();
var tip = '欢迎来到建顾管理管理应用,当前版本v1.0.0.\n' + '1~查询项目请以项目开头跟上空格,项目名称结尾的格式输入.\n' + '2~文本回复请输入1,2,建顾,以及任意文案\n' + '3~项目操作请点击下方菜单,点击项目查询,查询到当前用户最新的项目,点击我的项目进入项目列表,点击建顾进入平台首页.\n' + '4~当前版本v1,您有更好的想法请联系开发者.';

// const getAll = async()=>{
// 	console.log(api.project.GetAllStaff())
// }

// getAll()


// client.delMenu().then((data)=>{
// 	console.log(data)
// })

client.createMenu(menu).then(function (data) {
	console.log(data);
});

//client.createMenu(menu).then(()=>{
//	console.log('创建成功')
//})

var reply = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
		var message, reply, date, username, person, usercode, data, params, title, result, sendMsg, card, msg, content, searchText, query, projects, project, _card;

		return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						message = ctx.weixin;

						console.log(message);
						reply = 'sorry';
						date = manba().format("ll");
						username = message.FromUserName;

						console.log(username);
						_context.next = 8;
						return client.getUser(username);

					case 8:
						person = _context.sent;

						console.log('微信回复');
						console.log(person);
						usercode = person.name;

						console.log(usercode);

						if (!(message.MsgType === 'event')) {
							_context.next = 34;
							break;
						}

						if (!(message.Event === "subscribe")) {
							_context.next = 19;
							break;
						}

						reply = tip;
						client.sendMessgaebyText(message.FromUserName, reply);
						_context.next = 32;
						break;

					case 19:
						if (!(message.Event === 'click')) {
							_context.next = 31;
							break;
						}

						data = null;
						params = {
							typeCode: '0',
							page: 1,
							rows: 10
						};
						title = '商务项目';

						if (message.EventKey === 'menu_click_business') {
							params['Classification'] = '商务项目';
							params["typeCode"] = '2';
						} else if (message.EventKey === 'menu_click_design') {
							params['Classification'] = '设计项目';
							title = '设计项目';
							params["typeCode"] = '1';
						} else if (message.EventKey === 'menu_click_Ech') {
							params["HasMark"] = true;
							title = '重点项目';
							params["typeCode"] = '3';
						}
						//console.log(params)
						_context.next = 26;
						return __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].project.ProjectList(usercode, params);

					case 26:
						result = _context.sent;

						console.log(result);
						if (result.rows.length > 0) {
							sendMsg = result.rows[0];
							card = {
								title: '项目查询:' + title,
								description: "<div class=\"gray\">查询时间:" + sd.format(new Date(), 'YYYY-MM-DD') + "</div> <div class=\"normal\">项目类型:" + sendMsg.Classification + "</div><div class=\"highlight\">项目名称:" + sendMsg.ProjectName + "</div>",
								url: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].SITE_ROOT_URL + '/detail?ID=' + sendMsg.ID
							};

							client.sendMessgaebycard(message.FromUserName, card);
						} else {
							msg = '您当前没有项目哦';

							client.sendMessgaebyText(message.FromUserName, msg);
						}

						_context.next = 32;
						break;

					case 31:
						if (message.Event === 'view') {
							//跳转到详情
						}

					case 32:
						_context.next = 71;
						break;

					case 34:
						if (!(message.MsgType === 'text')) {
							_context.next = 70;
							break;
						}

						content = message.Content;

						reply = '\u60A8\u8BF4\u7684' + content + '\u590D\u6742\u4E86,\u6211\u4E0D\u61C2.....';

						if (!(content === "1")) {
							_context.next = 41;
							break;
						}

						reply = '\u4F60\u597D\uFF0C\u6B22\u8FCE\u6765\u5230\u5EFA\u987E\u9879\u76EE\u7BA1\u7406';
						_context.next = 67;
						break;

					case 41:
						if (!(content === "2")) {
							_context.next = 45;
							break;
						}

						reply = 'Hi, \u5FEB\u53BB\u67E5\u8BE2\u6211\u7684\u9879\u76EE\u5427';
						_context.next = 67;
						break;

					case 45:
						if (!(content === "建顾")) {
							_context.next = 49;
							break;
						}

						reply = '\u4E0A\u6D77\u5EFA\u987E\u51CF\u9707\u79D1\u6280\u6709\u9650\u516C\u53F8\u662F\u4E00\u5BB6\u63D0\u4F9B\u7ED3\u6784\u51CF\u9694\u9707\u7CFB\u7EDF\u89E3\u51B3\u65B9\u6848\u7684\u9AD8\u79D1\u6280\u4F01\u4E1A\uFF0C\u6CE8\u518C\u8D44\u91D1\u4E3A7000\u4E07\uFF0C\u6240\u6D89\u53CA\u7684\u5DE5\u7A0B\u9886\u57DF\u904D\u5E03\u5EFA\u7B51\u3001\u6865\u6881\u3001\u7535\u529B\u3001\u57FA\u7840\u8BBE\u65BD\u3001\u8BBE\u5907\u3001\u519B\u5DE5\u3001\u77F3\u5316\u3001\u6784\u7B51\u7269\u3001\u65B0\u80FD\u6E90\u7B49\u65B9\u9762\u3002\u4F9D\u6258\u4E8E\u540C\u6D4E\u5927\u5B66\u5F3A\u5927\u7684\u667A\u5E93\u652F\u6301\uFF0C\u516C\u53F8\u62E5\u6709\u672C\u884C\u4E1A\u8D85\u5F3A\u7684\u6280\u672F\u56E2\u961F\uFF0C\u7814\u53D1\u9AA8\u5E72\u5747\u5177\u6709\u540D\u6821\u535A\u58EB\u5B66\u4F4D\uFF0C\u5728\u7ED3\u6784\u8BBE\u8BA1\u4F18\u5316\u54A8\u8BE2\u3001\u51CF\u9694\u9707\u4EA7\u54C1\u7814\u53D1\u3001\u8BBE\u8BA1\u53CA\u5E94\u7528\u7B49\u65B9\u9762\u79EF\u7D2F\u4E86\u6DF1\u539A\u7684\u7ECF\u9A8C\uFF0C\u4E0E\u6B64\u914D\u5957\u7684\u7CBE\u7EC6\u5316\u7684\u751F\u4EA7\u5236\u9020\u4E0E\u5DE5\u7A0B\u5B9E\u65BD\u961F\u4F0D\u5219\u4E3A\u89E3\u51B3\u65B9\u6848\u7684\u7CFB\u7EDF\u843D\u5730\u63D0\u4F9B\u4E86\u5207\u5B9E\u7684\u4FDD\u969C\u3002\u516C\u53F8\u603B\u90E8\u5728\u4E0A\u6D77\uFF0C\u4E0B\u8BBE\u5E02\u573A\u3001\u8BBE\u8BA1\u3001\u751F\u4EA7\u3001\u7814\u53D1\u3001\u5DE5\u7A0B\u7B49\u90E8\u95E8\uFF0C\u5E76\u5728\u65B0\u7586\u3001\u4E91\u5357\u5EFA\u7ACB\u5206\u516C\u53F8\uFF0C\u897F\u5B89\u3001\u6B66\u6C49\u3001\u6210\u90FD\u3001\u6DF1\u5733\u3001\u5317\u4EAC\u3001\u6D77\u5357\u7B49\u5730\u8BBE\u7ACB\u4E1A\u52A1\u5206\u652F\u673A\u6784';
						_context.next = 67;
						break;

					case 49:
						if (!(content.indexOf('项目') !== -1)) {
							_context.next = 66;
							break;
						}

						searchText = content.substr(3);

						console.log(searchText);
						query = {
							searchText: searchText,
							page: '1',
							rows: 10
							//console.log(query)
						};
						_context.next = 55;
						return __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].project.Search(usercode, query);

					case 55:
						projects = _context.sent;

						//console.log(projects)
						project = projects.rows[0];

						if (!(projects.rows.length > 0)) {
							_context.next = 63;
							break;
						}

						_card = {
							title: "项目查询",
							description: "<div class=\"gray\">查询时间:" + sd.format(new Date(), 'YYYY-MM-DD') + "</div> <div class=\"normal\">项目类型:" + project.Classification + "</div><div class=\"highlight\">项目名称:" + project.ProjectName + "</div>",
							url: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].SITE_ROOT_URL + '/detail?ID=' + project.ID
						};

						client.sendMessgaebycard(message.FromUserName, _card);
						return _context.abrupt('return');

					case 63:
						reply = '\u6CA1\u6709' + searchText + '\u8FD9\u4E2A\u9879\u76EE\u54E6,\u70B9\u51FB<a href="' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].SITE_ROOT_URL + '/project/commit">\u6DFB\u52A0\u9879\u76EE</a>';

					case 64:
						_context.next = 67;
						break;

					case 66:
						reply = tip;

					case 67:
						client.sendMessgaebyText(message.FromUserName, reply);
						_context.next = 71;
						break;

					case 70:
						if (message.MsgType === 'voice') {
							//语音识别在企业微信中没有开放,
							//   const voiceText = message.Recognition
							//   console.log(voiceText)
						}

					case 71:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, _this);
	}));

	return function reply(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

//为网站调用抛出的接口
//这个地方没有做权限控制,
//解决方式:1.最简单的就是锁定ip,
// 2.添加OAuth协议
var send = function send(ctx, next) {
	if (!ctx.req._parsedUrl.query) {
		ctx.body = "参数错误";
		return;
	}
	var params = querystring.parse(ctx.req._parsedUrl.query);
	var msg = params.msg;
	var username = params.username;
	if (msg === '' || username === '' || typeof msg === 'undefined' || typeof username === 'undefined') {
		ctx.body = "参数不合法";
		return;
	}

	if (msg.length > 100 || username.length > 5) {
		ctx.body = "参数长度过大";
		return;
	}
	//根据名字请求接口 GET
	client.sendMessgae(username, msg);
};

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = require("constants");

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = require("crypto");

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports = require("ejs");

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports = require("heredoc");

/***/ },
/* 37 */
/***/ function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ },
/* 38 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 39 */
/***/ function(module, exports) {

module.exports = require("koa-session");

/***/ },
/* 40 */
/***/ function(module, exports) {

module.exports = require("raw-body");

/***/ },
/* 41 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = require("url");

/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = require("uuid");

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middlewares_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middlewares_router__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_types__);


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



//import R from 'ramda'






// Import and Set Nuxt.js options
var config = __webpack_require__(17);
config.dev = !("development" === 'production');

var r = function r(path) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_path__["resolve"])(__dirname, path);
};
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
//const MIDDLEWARES = ['common', 'router']


//import './wechat-lib'

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);

    //console.log(r)
    this.app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
    this.useMiddleWares(this.app);
  }

  _createClass(Server, [{
    key: 'useMiddleWares',
    value: function useMiddleWares(app) {

      // return m=>{
      // 	m.forEach(o=>{
      // 		require(`${r('./middlewares')}/${o}`)(MIDDLEWARES)
      // 	})
      // }

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__middlewares_common__["a" /* addBody */])(app);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__middlewares_common__["b" /* addSession */])(app);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__middlewares_router__["a" /* router */])(app);
    }
  }, {
    key: 'start',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var _this = this;

        var nuxt, builder;
        return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

              case 2:
                nuxt = _context2.sent;

                if (!config.dev) {
                  _context2.next = 14;
                  break;
                }

                _context2.prev = 4;
                builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
                _context2.next = 8;
                return builder.build();

              case 8:
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](4);

                console.error(_context2.t0); // eslint-disable-line no-console
                process.exit(1);

              case 14:

                this.app.use(function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                    return __WEBPACK_IMPORTED_MODULE_0_H_wechat_enterprise_wechat_line_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return next();

                          case 2:
                            ctx.status = 200;
                            ctx.req.session = ctx.session;

                            return _context.abrupt('return', new Promise(function (resolve, reject) {
                              ctx.res.on('close', resolve);
                              ctx.res.on('finish', resolve);
                              nuxt.render(ctx.req, ctx.res, function (promise) {
                                promise.then(resolve).catch(reject);
                              });
                            }));

                          case 7:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());

                this.app.listen(port, host);
                console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 10]]);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return Server;
}();

var app = new Server();

app.start();
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }
/******/ ]);
//# sourceMappingURL=main.map