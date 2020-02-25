// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElements = getElements;
exports.getLocalStorageItem = getLocalStorageItem;
exports.setLocalStorageItem = setLocalStorageItem;
exports.localStorageExists = localStorageExists;
exports.getDate = getDate;
exports.stringToHTML = stringToHTML;

/**
 * Get Dom elements from an identifier-string key-value pair.
 * @param {Object} map 
 */
function getElements(map) {
  Object.keys(map).forEach(function (item) {
    var domNode = document.querySelector(map[item]);
    map[item] = domNode;
  });
}
/**
 * Get object from Local Storage.
 * @param {string} item 
 */


function getLocalStorageItem(item) {
  return JSON.parse(window.localStorage.getItem(item));
}
/**
 * Set item from Local Storage to JSON value.
 * @param {string} item
 */


function setLocalStorageItem(item, value) {
  return window.localStorage.setItem("".concat(item), JSON.stringify(value));
}

;
/**
 * Set item from Local Storage to JSON value.
 * @param {string} item
 */

function localStorageExists(item) {
  return !(window.localStorage.getItem(item) === null);
}

;
/**
 * Get current date in YYYY-MM-DD format.
 */

function getDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  var dateString = "".concat(year, "-").concat(month, "-").concat(day);
  return dateString;
}
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */


function stringToHTML(str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');
  return doc.body;
}

;
},{}],"js/globals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALSTORAGE_TEMPLATE = exports.LOCALSTORAGE_NAME = void 0;
var LOCALSTORAGE_NAME = "todo-list";
exports.LOCALSTORAGE_NAME = LOCALSTORAGE_NAME;
var LOCALSTORAGE_TEMPLATE = {
  user: "mh15",
  list: [],
  categories: ["default", "CSE"]
};
exports.LOCALSTORAGE_TEMPLATE = LOCALSTORAGE_TEMPLATE;
},{}],"js/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeState = initializeState;

var _helpers = require("./helpers");

var _globals = require("./globals");

function initializeState() {
  var state;

  if (!(0, _helpers.localStorageExists)(_globals.LOCALSTORAGE_NAME)) {
    console.log("First session. Copy LOCALSTORAGE_TEMPLATE to store.");
    state = (0, _helpers.setLocalStorageItem)(_globals.LOCALSTORAGE_NAME, _globals.LOCALSTORAGE_TEMPLATE);
  } else {
    state = (0, _helpers.getLocalStorageItem)(_globals.LOCALSTORAGE_NAME);
  }

  return state;
}
},{"./helpers":"js/helpers.js","./globals":"js/globals.js"}],"js/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertInList = insertInList;
exports.deleteFromList = deleteFromList;
exports.newNote = newNote;
exports.newNoteDOM = newNoteDOM;

var _helpers = require("./helpers");

// Insert note into sorted list and return position
function insertInList(list, note) {
  list.push(note);
  var i = list.length - 1;

  while (i > 0 && note.date < list[i - 1].date) {
    list[i] = list[i - 1];
    i -= 1;
  }

  list[i] = note;
  return i;
}

function deleteFromList(list, note) {
  console.log(note);
  var i = 0;

  while (i < list.length) {
    if (list[i].date === note.date) {
      if (list[i].content === note.content) {
        if (list[i].category === note.category) {
          console.log("found and deleted");
          list.splice(i, 1);
          break;
        }
      }
    }

    i++;
  }

  return i;
}

function newNote(noteString, categoryString, dateString) {
  var dateObj = new Date(dateString);
  var noteObj = {
    content: noteString,
    category: categoryString,
    date: dateString
  }; // TODO: insertion date?

  return noteObj;
}

function newNoteDOM(noteObj, deleteCallback, checkCallback) {
  var docString = "\n        <div class=\"note\">\n            <div class=\"date\">".concat(noteObj.date, "</div>\n            <div class=\"category\">").concat(noteObj.category, "</div>\n            <div class=\"content\">").concat(noteObj.content, "</div>\n            <button class=\"delete\">Delete</button>\n        </div>\n    ");
  var node = (0, _helpers.stringToHTML)(docString);
  node.querySelector(".delete").addEventListener('click', function () {
    deleteCallback(noteObj);
  });
  return node;
}
},{"./helpers":"js/helpers.js"}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _helpers = require("./helpers");

var _state = require("./state");

var _list = require("./list");

var _globals = require("./globals");

require("../sass/main.scss");

window.addEventListener("load", onLoad); // define DOM stuff

var dom = {
  list: "#list",
  name_input: "#name_input",
  category_input: "#category_input",
  date_input: "#date_input",
  save: "#save"
};
var state; // link the state with the DOM for performant sorting

var domLink = [];

function onLoad() {
  (0, _helpers.getElements)(dom);
  console.log(dom);
  state = (0, _state.initializeState)();
  console.log(state);
  setupInput(dom);
  setupList(dom);
  dom.save.addEventListener('click', function () {
    (0, _helpers.setLocalStorageItem)(_globals.LOCALSTORAGE_NAME, state);
  });
}

function setupList() {
  state.list.forEach(function (note) {
    var node = (0, _list.newNoteDOM)(note, deleteNode);
    dom.list.appendChild(node);
    domLink.push(node);
  });
}

function setupInput(dom) {
  dom.name_input.value = "";
  dom.category_input.value = "";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var category = _step.value;
      var option = document.createElement("option");
      option.value = category;
      option.text = category;
      dom.category_input.appendChild(option);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  dom.date_input.value = (0, _helpers.getDate)();
  dom.date_input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      if (dom.name_input.value != "" && dom.category_input.value != "" && dom.date_input.value != "") {
        var note = dom.name_input.value;
        var category = dom.category_input.value;
        var date = dom.date_input.value;
        var noteObj = (0, _list.newNote)(note, category, date);
        var pos = (0, _list.insertInList)(state.list, noteObj);
        updateView(noteObj, pos);
      }
    }
  });
}

function updateView(noteObj, pos) {
  var node = (0, _list.newNoteDOM)(noteObj, deleteNode);
  dom.list.insertBefore(node, dom.list.children[pos]);
  console.log("rendering");
}

function deleteNode(noteObj) {
  var pos = (0, _list.deleteFromList)(state.list, noteObj);
  dom.list.removeChild(dom.list.children[pos]);
}
},{"./helpers":"js/helpers.js","./state":"js/state.js","./list":"js/list.js","./globals":"js/globals.js","../sass/main.scss":"sass/main.scss"}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59488" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map