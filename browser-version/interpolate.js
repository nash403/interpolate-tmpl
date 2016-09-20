(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["interpolate"] = factory();
	else
		root["interpolate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var interpolate = __webpack_require__(1);
	module.exports = interpolate;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _ = __webpack_require__(2);

	function getRe(delimiter) {
	  switch (delimiter) {
	    case "<%%>":
	      return (/<%\s*([^<>%]*[^\s])\s*%>/g
	      );
	    case "<$$>":
	      return (/<\$\s*([^<>$]*[^\s])\s*\$>/g
	      );
	    case "<##>":
	      return (/<#\s*([^<>#]*[^\s])\s*#>/g
	      );
	    case "{{}}":
	      return (/\{\{\s*([^{}]*[^\s])\s*\}\}/g
	      );
	    case "[[]]":
	      return (/\[\[\s*([^\[\]]*[^\s])\s*\]\]/g
	      );
	    case "{}":
	      return (/\{\s*([^{}]*[^\s])\s*\}/g
	      );
	    case "[]":
	      return (/\[\s*([^\[\]]*[^\s])\s*\]/g
	      );
	    default:
	      return (/\{\{\s*([^{}]*[^\s])\s*\}\}/g
	      );
	  }
	};

	function normFnCall(call) {
	  var call_cpy = call.slice();
	  call_cpy = call_cpy.startsWith('"') || call_cpy.startsWith("'") ? call_cpy.slice(1, -1) : call_cpy;
	  var re = /\(([^)]+)\)/g;
	  var args = re.exec(call_cpy);
	  return args ? { val: call_cpy.replace(re, '()'), args: args[1].split(',').map(function (v) {
	      v = v.trim();return parseInt(v) || (v.startsWith("\"") || v.startsWith("'") ? v.slice(1, -1) : v);
	    }) } : { val: call_cpy, args: [] };
	};

	module.exports = function (tmpl, data, delimiter) {
	  var re = delimiter ? getRe(delimiter) : /\{\{\s*([^{}]*[^\s])\s*\}\}/g;
	  return tmpl.slice().replace(re, function (match, key) {
	    var normKey = normFnCall(key);
	    return _.apply(undefined, [normKey.val, data].concat(_toConsumableArray(normKey.args))) || match;
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var get_safe = __webpack_require__(3);
	module.exports = get_safe;


/***/ },
/* 3 */
/***/ function(module, exports) {

	// Utils
	const isFnCall = function (key){
	  if (typeof key !== 'string') return false;
	  return key.slice(-2) === "()";
	};

	/*
	 * @param {key} string concatenation of nested keys in this form: 'foo.bar.toto'.
	 *  You can even call a function if the last key ends with '()'.
	 * @param {obj} the object we are accessing
	 * @param {...args} a sequence of arguments that may be passed to the function we are calling
	 * @return a nested value OR the result of a nested function OR undefined
	 */
	module.exports = (key, obj, ...args) => {
	  let splitted = key.split('.');
	  let lastkey = splitted.pop();
	  let isFnCallLastkey = isFnCall(lastkey);
	  lastkey = isFnCallLastkey ? lastkey.slice(0,-2) : lastkey;
	  let beforelast = splitted.reduce((a,b) => {
	    return a && a[b];
	  }, obj);
	  return beforelast && (typeof beforelast === 'object') && (isFnCallLastkey ? beforelast[lastkey](...args) : beforelast[lastkey]);
	};


/***/ }
/******/ ])
});
;