/******/ (function(modules) { // webpackBootstrap
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

	__webpack_require__(1);

	var _ResultsView = __webpack_require__(5);

	var _ResultsView2 = _interopRequireDefault(_ResultsView);

	var _SearchView = __webpack_require__(6);

	var _SearchView2 = _interopRequireDefault(_SearchView);

	var _PostcodeService = __webpack_require__(7);

	var _PostcodeService2 = _interopRequireDefault(_PostcodeService);

	var _clipboard = __webpack_require__(9);

	var _clipboard2 = _interopRequireDefault(_clipboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startApplication() {
	  var postcodeService = new _PostcodeService2.default();
	  var resultsView = new _ResultsView2.default();
	  var searchView = new _SearchView2.default({ searchAction: function searchAction(postcodes) {

	      resultsView.clearTable();

	      postcodes.forEach(function (postcode, i) {

	        setTimeout(function () {

	          postcodeService.getPostcodeLocation({ postcode: postcode }).then(function (locations) {
	            return resultsView.render(locations);
	          }).catch(function (error) {
	            return console.error(error);
	          });
	        }, i * 1000);
	      });
	    } });

	  new _clipboard2.default('#copy-table', {
	    text: function text(trigger) {
	      return resultsView.getTableHTML();
	    }
	  });
	} /**
	   * Created by Craig on 05/02/2016.
	   */

	window.onload = startApplication;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "textarea.form-control {\n  margin-top: 10px;\n  height: 80%;\n}\n#input {\n  height: 600px;\n}\n@media all and (max-width: 992px) {\n  #input {\n    height: auto;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Craig on 07/02/2016.
	 */

	var ResultsView = function () {
	  function ResultsView() {
	    _classCallCheck(this, ResultsView);

	    this.containerElement = document.getElementById('location-results');
	    this.tableElement = document.createElement('table');
	    this.tableElement.className = 'table table-condensed table-hover';
	    this.tbody = document.createElement('tbody');
	    this.tableElement.innerHTML = '\n      <thead>\n        <tr>\n          <th>Postcode</th>\n          <th>Longitude</th>\n          <th>Latitude</th>\n        </tr>\n      </thead>\n    ';
	    this.tableElement.appendChild(this.tbody);
	    this.containerElement.appendChild(this.tableElement);
	  }

	  _createClass(ResultsView, [{
	    key: 'clearTable',
	    value: function clearTable() {
	      this.tbody.innerHTML = '';
	    }
	  }, {
	    key: 'render',
	    value: function render(locations) {

	      var tr = document.createElement('tr');

	      tr.innerHTML = locations.map(function (location) {
	        return '\n      <td>' + location.address_components[0].long_name + '</td>\n      <td>' + location.geometry.location.lng() + '</td>\n      <td>' + location.geometry.location.lat() + '</td>\n    ';
	      });

	      this.tbody.appendChild(tr);
	    }
	  }, {
	    key: 'getTableHTML',
	    value: function getTableHTML() {
	      return this.tableElement.outerHTML;
	    }
	  }]);

	  return ResultsView;
	}();

	exports.default = ResultsView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Craig on 07/02/2016.
	 */

	var SearchView = function () {
	  function SearchView(_ref) {
	    var searchAction = _ref.searchAction;

	    _classCallCheck(this, SearchView);

	    this.postcodeInput = document.getElementById('input-postcode');
	    this.getCoordinatesButton = document.getElementById('getCoordinates');
	    this.searchAction = searchAction;
	    this.getCoordinatesButton.onclick = this.searchForCoordinates.bind(this);
	  }

	  _createClass(SearchView, [{
	    key: 'searchForCoordinates',
	    value: function searchForCoordinates() {
	      var postcodes = this.postcodeInput.value.trim().split('\n');
	      this.searchAction(postcodes);
	    }
	  }]);

	  return SearchView;
	}();

	exports.default = SearchView;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Craig on 07/02/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _google = __webpack_require__(8);

	var _google2 = _interopRequireDefault(_google);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PostcodeService = function () {
	  function PostcodeService() {
	    _classCallCheck(this, PostcodeService);

	    this.geocoder = new _google2.default.maps.Geocoder();
	  }

	  /**
	   *
	   * @param postcode
	   * @returns {Promise}
	   */

	  _createClass(PostcodeService, [{
	    key: 'getPostcodeLocation',
	    value: function getPostcodeLocation(_ref) {
	      var _this = this;

	      var postcode = _ref.postcode;

	      return new Promise(function (resolve, reject) {

	        _this.geocoder.geocode({ 'address': postcode }, function (results, status) {
	          if (status === _google2.default.maps.GeocoderStatus.OK) {
	            resolve(results);
	          } else {
	            reject('Geocode was not successful for the following reason: ' + status);
	          }
	        });
	      });
	    }
	  }]);

	  return PostcodeService;
	}();

	exports.default = PostcodeService;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = google;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _clipboardAction = __webpack_require__(10);

	var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

	var _tinyEmitter = __webpack_require__(12);

	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	var _goodListener = __webpack_require__(13);

	var _goodListener2 = _interopRequireDefault(_goodListener);

	/**
	 * Base class which takes one or more elements, adds event listeners to them,
	 * and instantiates a new `ClipboardAction` on each click.
	 */

	var Clipboard = (function (_Emitter) {
	    _inherits(Clipboard, _Emitter);

	    /**
	     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	     * @param {Object} options
	     */

	    function Clipboard(trigger, options) {
	        _classCallCheck(this, Clipboard);

	        _Emitter.call(this);

	        this.resolveOptions(options);
	        this.listenClick(trigger);
	    }

	    /**
	     * Helper function to retrieve attribute value.
	     * @param {String} suffix
	     * @param {Element} element
	     */

	    /**
	     * Defines if attributes would be resolved using internal setter functions
	     * or custom functions that were passed in the constructor.
	     * @param {Object} options
	     */

	    Clipboard.prototype.resolveOptions = function resolveOptions() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	        this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	        this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	    };

	    /**
	     * Adds a click event listener to the passed trigger.
	     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	     */

	    Clipboard.prototype.listenClick = function listenClick(trigger) {
	        var _this = this;

	        this.listener = _goodListener2['default'](trigger, 'click', function (e) {
	            return _this.onClick(e);
	        });
	    };

	    /**
	     * Defines a new `ClipboardAction` on each click event.
	     * @param {Event} e
	     */

	    Clipboard.prototype.onClick = function onClick(e) {
	        var trigger = e.delegateTarget || e.currentTarget;

	        if (this.clipboardAction) {
	            this.clipboardAction = null;
	        }

	        this.clipboardAction = new _clipboardAction2['default']({
	            action: this.action(trigger),
	            target: this.target(trigger),
	            text: this.text(trigger),
	            trigger: trigger,
	            emitter: this
	        });
	    };

	    /**
	     * Default `action` lookup function.
	     * @param {Element} trigger
	     */

	    Clipboard.prototype.defaultAction = function defaultAction(trigger) {
	        return getAttributeValue('action', trigger);
	    };

	    /**
	     * Default `target` lookup function.
	     * @param {Element} trigger
	     */

	    Clipboard.prototype.defaultTarget = function defaultTarget(trigger) {
	        var selector = getAttributeValue('target', trigger);

	        if (selector) {
	            return document.querySelector(selector);
	        }
	    };

	    /**
	     * Default `text` lookup function.
	     * @param {Element} trigger
	     */

	    Clipboard.prototype.defaultText = function defaultText(trigger) {
	        return getAttributeValue('text', trigger);
	    };

	    /**
	     * Destroy lifecycle.
	     */

	    Clipboard.prototype.destroy = function destroy() {
	        this.listener.destroy();

	        if (this.clipboardAction) {
	            this.clipboardAction.destroy();
	            this.clipboardAction = null;
	        }
	    };

	    return Clipboard;
	})(_tinyEmitter2['default']);

	exports['default'] = Clipboard;
	function getAttributeValue(suffix, element) {
	    var attribute = 'data-clipboard-' + suffix;

	    if (!element.hasAttribute(attribute)) {
	        return;
	    }

	    return element.getAttribute(attribute);
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _select = __webpack_require__(11);

	var _select2 = _interopRequireDefault(_select);

	/**
	 * Inner class which performs selection from either `text` or `target`
	 * properties and then executes copy or cut operations.
	 */

	var ClipboardAction = (function () {
	    /**
	     * @param {Object} options
	     */

	    function ClipboardAction(options) {
	        _classCallCheck(this, ClipboardAction);

	        this.resolveOptions(options);
	        this.initSelection();
	    }

	    /**
	     * Defines base properties passed from constructor.
	     * @param {Object} options
	     */

	    ClipboardAction.prototype.resolveOptions = function resolveOptions() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        this.action = options.action;
	        this.emitter = options.emitter;
	        this.target = options.target;
	        this.text = options.text;
	        this.trigger = options.trigger;

	        this.selectedText = '';
	    };

	    /**
	     * Decides which selection strategy is going to be applied based
	     * on the existence of `text` and `target` properties.
	     */

	    ClipboardAction.prototype.initSelection = function initSelection() {
	        if (this.text && this.target) {
	            throw new Error('Multiple attributes declared, use either "target" or "text"');
	        } else if (this.text) {
	            this.selectFake();
	        } else if (this.target) {
	            this.selectTarget();
	        } else {
	            throw new Error('Missing required attributes, use either "target" or "text"');
	        }
	    };

	    /**
	     * Creates a fake textarea element, sets its value from `text` property,
	     * and makes a selection on it.
	     */

	    ClipboardAction.prototype.selectFake = function selectFake() {
	        var _this = this;

	        var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

	        this.removeFake();

	        this.fakeHandler = document.body.addEventListener('click', function () {
	            return _this.removeFake();
	        });

	        this.fakeElem = document.createElement('textarea');
	        // Prevent zooming on iOS
	        this.fakeElem.style.fontSize = '12pt';
	        // Reset box model
	        this.fakeElem.style.border = '0';
	        this.fakeElem.style.padding = '0';
	        this.fakeElem.style.margin = '0';
	        // Move element out of screen horizontally
	        this.fakeElem.style.position = 'absolute';
	        this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
	        // Move element to the same position vertically
	        this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
	        this.fakeElem.setAttribute('readonly', '');
	        this.fakeElem.value = this.text;

	        document.body.appendChild(this.fakeElem);

	        this.selectedText = _select2['default'](this.fakeElem);
	        this.copyText();
	    };

	    /**
	     * Only removes the fake element after another click event, that way
	     * a user can hit `Ctrl+C` to copy because selection still exists.
	     */

	    ClipboardAction.prototype.removeFake = function removeFake() {
	        if (this.fakeHandler) {
	            document.body.removeEventListener('click');
	            this.fakeHandler = null;
	        }

	        if (this.fakeElem) {
	            document.body.removeChild(this.fakeElem);
	            this.fakeElem = null;
	        }
	    };

	    /**
	     * Selects the content from element passed on `target` property.
	     */

	    ClipboardAction.prototype.selectTarget = function selectTarget() {
	        this.selectedText = _select2['default'](this.target);
	        this.copyText();
	    };

	    /**
	     * Executes the copy operation based on the current selection.
	     */

	    ClipboardAction.prototype.copyText = function copyText() {
	        var succeeded = undefined;

	        try {
	            succeeded = document.execCommand(this.action);
	        } catch (err) {
	            succeeded = false;
	        }

	        this.handleResult(succeeded);
	    };

	    /**
	     * Fires an event based on the copy operation result.
	     * @param {Boolean} succeeded
	     */

	    ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
	        if (succeeded) {
	            this.emitter.emit('success', {
	                action: this.action,
	                text: this.selectedText,
	                trigger: this.trigger,
	                clearSelection: this.clearSelection.bind(this)
	            });
	        } else {
	            this.emitter.emit('error', {
	                action: this.action,
	                trigger: this.trigger,
	                clearSelection: this.clearSelection.bind(this)
	            });
	        }
	    };

	    /**
	     * Removes current selection and focus from `target` element.
	     */

	    ClipboardAction.prototype.clearSelection = function clearSelection() {
	        if (this.target) {
	            this.target.blur();
	        }

	        window.getSelection().removeAllRanges();
	    };

	    /**
	     * Sets the `action` to be performed which can be either 'copy' or 'cut'.
	     * @param {String} action
	     */

	    /**
	     * Destroy lifecycle.
	     */

	    ClipboardAction.prototype.destroy = function destroy() {
	        this.removeFake();
	    };

	    _createClass(ClipboardAction, [{
	        key: 'action',
	        set: function set() {
	            var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];

	            this._action = action;

	            if (this._action !== 'copy' && this._action !== 'cut') {
	                throw new Error('Invalid "action" value, use either "copy" or "cut"');
	            }
	        },

	        /**
	         * Gets the `action` property.
	         * @return {String}
	         */
	        get: function get() {
	            return this._action;
	        }

	        /**
	         * Sets the `target` property using an element
	         * that will be have its content copied.
	         * @param {Element} target
	         */
	    }, {
	        key: 'target',
	        set: function set(target) {
	            if (target !== undefined) {
	                if (target && typeof target === 'object' && target.nodeType === 1) {
	                    this._target = target;
	                } else {
	                    throw new Error('Invalid "target" value, use a valid Element');
	                }
	            }
	        },

	        /**
	         * Gets the `target` property.
	         * @return {String|HTMLElement}
	         */
	        get: function get() {
	            return this._target;
	        }
	    }]);

	    return ClipboardAction;
	})();

	exports['default'] = ClipboardAction;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	function select(element) {
	    var selectedText;

	    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
	        element.focus();
	        element.setSelectionRange(0, element.value.length);

	        selectedText = element.value;
	    }
	    else {
	        if (element.hasAttribute('contenteditable')) {
	            element.focus();
	        }

	        var selection = window.getSelection();
	        var range = document.createRange();

	        range.selectNodeContents(element);
	        selection.removeAllRanges();
	        selection.addRange(range);

	        selectedText = selection.toString();
	    }

	    return selectedText;
	}

	module.exports = select;


/***/ },
/* 12 */
/***/ function(module, exports) {

	function E () {
		// Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
		on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	module.exports = E;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(14);
	var delegate = __webpack_require__(15);

	/**
	 * Validates all params and calls the right
	 * listener function based on its target type.
	 *
	 * @param {String|HTMLElement|HTMLCollection|NodeList} target
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listen(target, type, callback) {
	    if (!target && !type && !callback) {
	        throw new Error('Missing required arguments');
	    }

	    if (!is.string(type)) {
	        throw new TypeError('Second argument must be a String');
	    }

	    if (!is.fn(callback)) {
	        throw new TypeError('Third argument must be a Function');
	    }

	    if (is.node(target)) {
	        return listenNode(target, type, callback);
	    }
	    else if (is.nodeList(target)) {
	        return listenNodeList(target, type, callback);
	    }
	    else if (is.string(target)) {
	        return listenSelector(target, type, callback);
	    }
	    else {
	        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
	    }
	}

	/**
	 * Adds an event listener to a HTML element
	 * and returns a remove listener function.
	 *
	 * @param {HTMLElement} node
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenNode(node, type, callback) {
	    node.addEventListener(type, callback);

	    return {
	        destroy: function() {
	            node.removeEventListener(type, callback);
	        }
	    }
	}

	/**
	 * Add an event listener to a list of HTML elements
	 * and returns a remove listener function.
	 *
	 * @param {NodeList|HTMLCollection} nodeList
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenNodeList(nodeList, type, callback) {
	    Array.prototype.forEach.call(nodeList, function(node) {
	        node.addEventListener(type, callback);
	    });

	    return {
	        destroy: function() {
	            Array.prototype.forEach.call(nodeList, function(node) {
	                node.removeEventListener(type, callback);
	            });
	        }
	    }
	}

	/**
	 * Add an event listener to a selector
	 * and returns a remove listener function.
	 *
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenSelector(selector, type, callback) {
	    return delegate(document.body, selector, type, callback);
	}

	module.exports = listen;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Check if argument is a HTML element.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.node = function(value) {
	    return value !== undefined
	        && value instanceof HTMLElement
	        && value.nodeType === 1;
	};

	/**
	 * Check if argument is a list of HTML elements.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.nodeList = function(value) {
	    var type = Object.prototype.toString.call(value);

	    return value !== undefined
	        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
	        && ('length' in value)
	        && (value.length === 0 || exports.node(value[0]));
	};

	/**
	 * Check if argument is a string.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.string = function(value) {
	    return typeof value === 'string'
	        || value instanceof String;
	};

	/**
	 * Check if argument is a function.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.fn = function(value) {
	    var type = Object.prototype.toString.call(value);

	    return type === '[object Function]';
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var closest = __webpack_require__(16);

	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @param {Boolean} useCapture
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);

	    element.addEventListener(type, listenerFn, useCapture);

	    return {
	        destroy: function() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    }
	}

	/**
	 * Finds closest match and invokes callback.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Function}
	 */
	function listener(element, selector, type, callback) {
	    return function(e) {
	        e.delegateTarget = closest(e.target, selector, true);

	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    }
	}

	module.exports = delegate;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var matches = __webpack_require__(17)

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode
	  }
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	
	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ }
/******/ ]);