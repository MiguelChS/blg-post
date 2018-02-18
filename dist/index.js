(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/typings-for-css-modules-loader/lib/index.js??ref--2-1!./index.css", function() {
		var newContent = require("!!../node_modules/typings-for-css-modules-loader/lib/index.js??ref--2-1!./index.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(10);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/typings-for-css-modules-loader/lib/index.js??ref--2-1!./index.css", function() {
		var newContent = require("!!../../node_modules/typings-for-css-modules-loader/lib/index.js??ref--2-1!./index.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(12);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/typings-for-css-modules-loader/lib/index.js??ref--2-1!./index.css", function() {
		var newContent = require("!!../../node_modules/typings-for-css-modules-loader/lib/index.js??ref--2-1!./index.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
__webpack_require__(3);
const index_css_1 = __webpack_require__(3);
const footer_1 = __webpack_require__(9);
const detallePost_1 = __webpack_require__(11);
exports.Post = ({ urlImage, dateString, detalle }) => {
    return (React.createElement("article", { className: index_css_1.PostBlog },
        React.createElement("div", { className: index_css_1.postThumb },
            React.createElement("a", { href: "" },
                React.createElement("img", { src: urlImage, alt: "" }))),
        React.createElement("div", { className: index_css_1.postContent },
            React.createElement(detallePost_1.DetallePost, Object.assign({}, detalle)),
            React.createElement(footer_1.Footer, { fecha: dateString }))));
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._1AbxTA5eUeuod00S8sTn_6 {\n    background: #fff;\n    margin-bottom: 50px;\n    -webkit-box-shadow: 0 0 2px 0 rgba(51, 51, 51, 0.08), 0 0 2px 0 rgba(51, 51, 51, 0.08);\n    box-shadow: 0 0 2px 0 rgba(51, 51, 51, 0.08), 0 0 2px 0 rgba(51, 51, 51, 0.08);\n}\n\n._1AbxTA5eUeuod00S8sTn_6>div._34t_pcUiXL66UfcEigQlL4 {\n    overflow: hidden;\n    padding: 40px;\n}\n\n@media (max-width: 450px) {\n    ._1AbxTA5eUeuod00S8sTn_6>div._34t_pcUiXL66UfcEigQlL4 {\n        padding: 15px;\n    }\n}\n\n._1AbxTA5eUeuod00S8sTn_6>div._2oKg6WfZnAfZrU0jF7-ZhL>a {\n    color: #444;\n    text-decoration: none;\n    -webkit-transition: all 0.33s;\n    -moz-transition: all 0.33s;\n    -ms-transition: all 0.33s;\n    -o-transition: all 0.33s;\n    transition: all 0.33s;\n    line-height: 1.4;\n}\n\n._1AbxTA5eUeuod00S8sTn_6>div._2oKg6WfZnAfZrU0jF7-ZhL>a>img {\n    width: 100%;\n}", ""]);

// exports
exports.locals = {
	"PostBlog": "_1AbxTA5eUeuod00S8sTn_6",
	"postContent": "_34t_pcUiXL66UfcEigQlL4",
	"postThumb": "_2oKg6WfZnAfZrU0jF7-ZhL"
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
__webpack_require__(4);
const index_css_1 = __webpack_require__(4);
exports.Footer = ({ fecha }) => {
    return (React.createElement("div", { className: index_css_1.postFooter },
        React.createElement("ul", { className: `pull-left list-inline ${index_css_1.author}` },
            React.createElement("li", null, fecha)),
        React.createElement("ul", { className: `pull-right list-inline ${index_css_1.socialRed}` },
            React.createElement("li", null,
                React.createElement("a", { href: "" },
                    React.createElement("i", { className: "fa fa-facebook" }))),
            React.createElement("li", null,
                React.createElement("a", { href: "" },
                    React.createElement("i", { className: "fa fa-twitter" }))),
            React.createElement("li", null,
                React.createElement("a", { href: "" },
                    React.createElement("i", { className: "fa fa-pinterest" }))),
            React.createElement("li", null,
                React.createElement("a", { href: "" },
                    React.createElement("i", { className: "fa fa-google-plus" }))),
            React.createElement("li", null,
                React.createElement("a", { href: "" },
                    React.createElement("i", { className: "fa fa-instagram" }))))));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._7oVoF3phyCBMHMbClVJuf {\n    overflow: hidden;\n    border-top: 1px solid #e2e2e2;\n    margin-top: 40px;\n    padding-top: 20px;\n    line-height: 1;\n    margin-bottom: 0;\n    padding-bottom: 0;\n}\n\n@media (max-width: 450px) {\n    ._7oVoF3phyCBMHMbClVJuf>ul {\n        float: none !important;\n        text-align: center;\n        margin-bottom: 10px;\n        display: block;\n    }\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.cL6-lvjMt3NXbSu1Fr1Py {\n    color: #777;\n    font-style: italic;\n    font-size: 14px;\n    margin-left: 0;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.cL6-lvjMt3NXbSu1Fr1Py>li {\n    margin: 0;\n    padding: 0;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.cL6-lvjMt3NXbSu1Fr1Py>li>a {\n    color: #777;\n    line-height: 1;\n    margin-bottom: 0;\n    padding-bottom: 0;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.cL6-lvjMt3NXbSu1Fr1Py>li>a:hover {\n    color: #da521e;\n    text-decoration: none;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.lrVaHOzvNyIpgM1uM0Bw6 {\n    line-height: 1;\n    margin-bottom: 0;\n    padding-bottom: 0;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.lrVaHOzvNyIpgM1uM0Bw6>li:first-child {\n    padding-left: 0px;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.lrVaHOzvNyIpgM1uM0Bw6>li:last-child {\n    padding-right: 0px;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.lrVaHOzvNyIpgM1uM0Bw6>li>a {\n    color: #c2c2c2;\n    font-size: 16px;\n    padding-left: 3px;\n}\n\n._7oVoF3phyCBMHMbClVJuf>ul.lrVaHOzvNyIpgM1uM0Bw6>li>a:hover {\n    color: #da521e;\n}", ""]);

// exports
exports.locals = {
	"postFooter": "_7oVoF3phyCBMHMbClVJuf",
	"author": "cL6-lvjMt3NXbSu1Fr1Py",
	"socialRed": "lrVaHOzvNyIpgM1uM0Bw6"
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
__webpack_require__(5);
const index_css_1 = __webpack_require__(5);
exports.DetallePost = (props) => {
    return (React.createElement("div", { className: index_css_1.detallePost },
        React.createElement("div", { className: `${index_css_1.title} text-center text-uppercase` },
            React.createElement("a", { href: "#" }, props.categoria),
            React.createElement("h2", null,
                React.createElement("a", { href: props.linkPost }, props.title))),
        React.createElement("div", { className: index_css_1.entryContent },
            React.createElement("p", null, props.descripcion)),
        React.createElement("div", { className: `${index_css_1.continueReading} text-center text-uppercase` },
            React.createElement("a", { href: props.linkPost }, "Continue Reading"))));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK {\n    margin: 0 auto 22px;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK>a {\n    color: #da521e;\n    display: inline-block;\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 1px;\n    margin-bottom: 10px;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK>a:hover {\n    text-decoration: none;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK>h2 {\n    color: #444;\n    font-size: 24px;\n    letter-spacing: 0.5px;\n    font-weight: bold;\n    font-family: \"Oswald\", sans-serif;\n    margin-top: 0;\n}\n\n@media (max-width: 768px) {\n    ._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK>h2 {\n        font-size: 21px;\n    }\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK>h2>a {\n    color: #444;\n    text-decoration: none;\n    -webkit-transition: all 0.33s;\n    -moz-transition: all 0.33s;\n    -ms-transition: all 0.33s;\n    -o-transition: all 0.33s;\n    transition: all 0.33s;\n    line-height: 1.4;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._3prZ2IJFIKd7MRpNMEp1hK>h2>a:hover {\n    color: #da521e;\n    text-decoration: none;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._1S6K5-II004GvcTRGRG_V3 {\n    margin-bottom: 35px;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._1S6K5-II004GvcTRGRG_V3>p {\n    font-size: 15px;\n    line-height: 25px;\n    padding-top: 0;\n    margin-top: 0;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._7i834lzQeJSQ7gtY3xvCn>a {\n    border: 1px solid #da521e;\n    color: #da521e;\n    display: inline-block;\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 1px;\n    padding: 10px 18px;\n}\n\n._3D0Kt1fHT2mrO1_2NDGof>div._7i834lzQeJSQ7gtY3xvCn>a:hover {\n    background: #da521e;\n    color: #fff;\n    text-decoration: none;\n}", ""]);

// exports
exports.locals = {
	"detallePost": "_3D0Kt1fHT2mrO1_2NDGof",
	"title": "_3prZ2IJFIKd7MRpNMEp1hK",
	"entryContent": "_1S6K5-II004GvcTRGRG_V3",
	"continueReading": "_7i834lzQeJSQ7gtY3xvCn"
};

/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map