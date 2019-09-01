"use strict";
<<<<<<< HEAD
// renaissance core
<<<<<<< HEAD:src/renaissance.js
'use strict';

class Component {
  /**
   * component
   * @constructor
   * @returns {object} this
   */
  constructor() {
    // this.beforeMap = {};
    // this.afterMap = {};
    this._events = {};

    this.init && this.after('init', this.init);

    return this;
  }

  /**
   * trigger component event handlers
   * @param event
   * @param data
   */
  trigger(event, data) {
    let beforeArr = this._events['before.' + event];
    let eventArr = this._events[event];
    let afterArr = this._events['after.' + event];
    let triggered = {};
    if (Array.isArray(beforeArr) && beforeArr.length > 0) {
      for (let i = 0; i < beforeArr.length; i++) {
        beforeArr[i](data);
      }
      triggered.before = true;
    }
    if (Array.isArray(eventArr) && eventArr.length > 0) {
      for (let i = 0; i < eventArr.length; i++) {
        eventArr[i](data);
      }
      triggered.event = true;
    }
    if (Array.isArray(afterArr) && afterArr.length > 0) {
      for (let i = 0; i < afterArr.length; i++) {
        afterArr[i](data);
      }
      triggered.after = true;
    }
    return triggered;
  }
  /**
   * register before event
   * @param {string} event
   * @param {function} callback
   */
  before(event, callback) {
    if (typeof callback !== 'function') {
      return false;
    }
    if (!Array.isArray(this._events['before.' + event])) {
      this._events['before.' + event] = [];
    }
    this._events['before.' + event].push(callback);
  }
  /**
   * add an event handler on component
   * @param {string} event
   * @param {function} callback
   * @returns {*}
   */
  on(event, callback) {
    if (typeof callback !== 'function') {
      return false;
    }
    if (!Array.isArray(this._events[event])) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
  }
  /**
   *register after event
   * @param {string} event
   * @param {function} callback
   */
  after(event, callback) {
    if (typeof callback !== 'function') {
      return false;
    }
    if (!Array.isArray(this._events['after.' + event])) {
      this._events['after.' + event] = [];
    }
    this._events['after.' + event].push(callback);
  }
  /**
   * callback for component instantiation
   */
  onInit() {
    return this.trigger('init', this);
  }
}

class Renaissance {
  constructor() {
    // private
    // registry filled and emptied when attaching and unattaching components to DOM
    // renaissance.registry = {};
    // renaissance.components = {};
    this.adapters = {};

    return this;
  }
  // private / only available for adapter and drink creators
  /**
   * register component internally
   * @param {string} name
   * @param {object} Component
   * @returns {object} component
   */
  /*
  registerComponent(name, Component) {
      this.components[name] = Component;
      // event handlers
      if (typeof component.afterMap['init'] === 'function') {
          component.afterMap['init'](component);
      }

      return component;
  };
  */
  /**
   * register an Adapter
   * @param {string} name
   * @param {constructor} Adapter
   */
  registerAdapter(name, Adapter) {
    // if name already defined on this, omit registration
    if (typeof this.adapters[name] !== 'undefined') {
      return false;
    }

    let adapter = new Adapter();
    this.adapters[name] = adapter;
    return adapter;
  };
  /**
   * register a mixin
   * @param {string} name
   * @param {constructor} Component
   * @param {function} callback
   * @returns {boolean}
   */
  registerMixin(name, Component, callback) {
    // avoid overwriting other functionality
    if (typeof Component.prototype[name] !== 'undefined') {
      return false;
    }

    // register drink on component prototype
    Component.prototype[name] = callback;

    return true;
  };
  /**
   * register a plugin
   * @param {string} name
   * @param {constructor} Plugin
   * @return {boolean} registered
   */
  registerPlugin(name, Plugin) {
    // if name already defined on this, omit registration
    if (typeof this[name] !== 'undefined') {
      return false;
    }

    // register plugin function on renaissance prototype
    this[name] = new Plugin(this);

    return true;
  };
}

const instance = new Renaissance();
const renaissance = instance;
const r = instance;

module.exports = {
  Renaissance,
  renaissance,
  r,
  Component
}
=======
Object.defineProperty(exports, "__esModule", { value: true });
// interface IComponent {
//   init: Function
//   render: Function
// }
var Component = /** @class */ (function () {
    /**
     * component
     * @constructor
     * @returns {object} this
     */
=======

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Generated by CoffeeScript 2.4.1
(function () {
  // renaissance core
  var Component, Renaissance, instance, r, renaissance;

  Component =
  /*#__PURE__*/
  function () {
    /*
    component
    @constructor
    @returns {object} this
    */
>>>>>>> 5af278f... Port to coffeescript
    function Component() {
      _classCallCheck(this, Component);

      this._events = {}; // to be defined in component extending class

      this.after('init', this.init);
      this.onInit();
      this;
    }
    /*
    trigger component event handlers
    @param {string} event
    @param {object} data
    */


    _createClass(Component, [{
      key: "trigger",
      value: function trigger(event, data) {
        var afterArr, beforeArr, eventArr, fn, i, j, k, len, len1, len2, triggered;
        beforeArr = this._events['before.' + event];
        eventArr = this._events[event];
        afterArr = this._events['after.' + event];
        triggered = {
          before: false,
          event: false,
          after: false
        };

        if (Array.isArray(beforeArr) && beforeArr.length > 0) {
          // runBefore = (fn) -> fn(data)
          // (fn) -> fn(data) for fn in beforeArr
          for (i = 0, len = beforeArr.length; i < len; i++) {
            fn = beforeArr[i];

            (function (fn) {
              return fn(data);
            })(fn);
          } // for (let i = 0; i < beforeArr.length; i++) {
          //   beforeArr[i](data)
          // }


          triggered.before = true;
        }

        if (Array.isArray(eventArr) && eventArr.length > 0) {
          // (fn) -> fn(data) for fn in eventArr
          for (j = 0, len1 = eventArr.length; j < len1; j++) {
            fn = eventArr[j];

            (function (fn) {
              return fn(data);
            })(fn);
          } // for (let i = 0; i < eventArr.length; i++) {
          //   eventArr[i](data)
          // }


          triggered.event = true;
        }

        if (Array.isArray(afterArr) && afterArr.length > 0) {
          for (k = 0, len2 = afterArr.length; k < len2; k++) {
            fn = afterArr[k];

            (function (fn) {
              return fn(data);
            })(fn);
          } // for (let i = 0; i < afterArr.length; i++) {
          //   afterArr[i](data)
          // }


          triggered.after = true;
        }

        return triggered;
      }
      /*
      register before event
      @param {string} event
      @param {function} callback
      */

    }, {
      key: "before",
      value: function before(event, callback) {
        if (typeof callback !== 'function') {
          return false;
        }

        if (!Array.isArray(this._events['before.' + event])) {
          this._events['before.' + event] = [];
        }

        return this._events['before.' + event].push(callback);
      }
      /*
      add an event handler on component
      @param {string} event
      @param {function} callback
      @returns {*}
      */

    }, {
      key: "on",
      value: function on(event, callback) {
        if (typeof callback !== 'function') {
          return false;
        }

        if (!Array.isArray(this._events[event])) {
          this._events[event] = [];
        }

        return this._events[event].push(callback);
      }
      /*
      register after event
      @param {string} event
      @param {function} callback
      */

    }, {
      key: "after",
      value: function after(event, callback) {
        if (typeof callback !== 'function') {
          return false;
        }

        if (!Array.isArray(this._events['after.' + event])) {
          this._events['after.' + event] = [];
        }

        return this._events['after.' + event].push(callback);
      }
      /*
      callback for component instantiation
      */

    }, {
      key: "onInit",
      value: function onInit() {
        return this.trigger('init', this);
      }
    }]);

    return Component;
  }();

  Renaissance =
  /*#__PURE__*/
  function () {
    function Renaissance() {
      _classCallCheck(this, Renaissance);

      // private
      // registry filled and emptied when attaching and unattaching components to DOM
      // renaissance.registry = {};
      // renaissance.components = {};
      this.adapters = {};
      this;
    } // private / only available for adapter and drink creators

    /*
    register component internally
    @param {string} name
    @param {object} Component
    @returns {object} component
    */

    /*
    registerComponent(name, Component) {
    this.components[name] = Component;
    // event handlers
    if (typeof component.afterMap['init'] === 'function') {
        component.afterMap['init'](component);
    }
     return component;
    };
    */

    /*
    register an Adapter
    @param {string} name
    @param {constructor} Adapter
    */


    _createClass(Renaissance, [{
      key: "registerAdapter",
      value: function registerAdapter(name, Adapter) {
        var adapter; // if name already defined on this, omit registration

        if (typeof this.adapters[name] !== 'undefined') {
          return false;
        }

        adapter = new Adapter();
        this.adapters[name] = adapter;
        return adapter;
      }
      /*
      register a mixin
      @param {string} name
      @param {constructor} Component
      @param {function} callback
      @returns {boolean}
      */

    }, {
      key: "registerMixin",
      value: function registerMixin(name, Component, callback) {
        // avoid overwriting other functionality
        if (typeof Component.prototype[name] !== 'undefined') {
          return false;
        } // register drink on component prototype


        Component.prototype[name] = callback;
        return true;
      }
      /*
      register a plugin
      @param {string} name
      @param {constructor} Plugin
      @return {boolean} registered
      */

    }, {
      key: "registerPlugin",
      value: function registerPlugin(name, Plugin) {
        // if name already defined on this, omit registration
        if (typeof this[name] !== 'undefined') {
          return false;
        } // register plugin function on renaissance prototype


        this[name] = new Plugin(this);
        return true;
      }
    }]);

    return Renaissance;
<<<<<<< HEAD
}());
exports.Renaissance = Renaissance;
var instance = new Renaissance();
var renaissance = instance;
exports.renaissance = renaissance;
var r = instance;
exports.r = r;
//# sourceMappingURL=renaissance.js.map
>>>>>>> refs/rewritten/typescript:dist/renaissance.js
=======
  }();

  instance = new Renaissance();
  renaissance = instance;
  r = instance;
  module.exports = {
    Renaissance: Renaissance,
    renaissance: renaissance,
    r: r,
    Component: Component
  };
}).call(void 0);
//# sourceMappingURL=renaissance.js.map
>>>>>>> 5af278f... Port to coffeescript
