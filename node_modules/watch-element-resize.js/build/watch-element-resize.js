/**
 * A (yet another) cross-browser, event-based, element resize watcher.
 * https://github.com/jonataswalker/watch-element-resize.js
 * Version: v2.0.1
 * Built: 2016-10-07T17:50:10-03:00
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.WatchElementResize = factory());
}(this, (function () { 'use strict';

var eventType = {
  RESIZE: 'resize'
};

/**
 * @module utils
 * All the helper functions needed in this project
 */
var utils = {
  /**
   * @param {HTMLElement} element
   * @param {String} prop
   * @returns {String|Number}
   */
  getComputedStyle: function getComputedStyle(element, prop) {
    if (element.currentStyle) {
      return element.currentStyle[prop];
    } else if (window.getComputedStyle) {
      return window.getComputedStyle(element, null).getPropertyValue(prop);
    } else {
      return element.style[prop];
    }
  },
  offset: function offset(element) {
    var rect = element.getBoundingClientRect();
    var docEl = document.documentElement;
    return {
      left: rect.left + window.pageXOffset - docEl.clientLeft,
      top: rect.top + window.pageYOffset - docEl.clientTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  },
  getWindowSize: function getWindowSize() {
    return {
      width:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      height:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    };
  },
  $: function $(id) {
    id = (id[0] === '#') ? id.substr(1, id.length) : id;
    return document.getElementById(id);
  },
  isElement: function isElement(obj) {
    // DOM, Level2
    if ('HTMLElement' in window) {
      return (!!obj && obj instanceof HTMLElement);
    }
    // Older browsers
    return (!!obj && typeof obj === 'object' &&
                obj.nodeType === 1 && !!obj.nodeName);
  },
  evaluate: function evaluate(element) {
    var el;
    switch (this.toType(element)) {
      case 'window':
      case 'htmldocument':
      case 'element':
        el = element;
        break;
      case 'string':
        el = this.$(element);
        break;
      default:
        console.warn('Unknown type');
    }
    this.assert(el, 'Can\'t evaluate: @param ' + element);
    return el;
  },
  toType: function toType(obj) {
    if (obj === window && obj.document && obj.location) {
      return 'window';
    } else if (obj === document) {
      return 'htmldocument';
    } else if (typeof obj === 'string') {
      return 'string';
    } else if (this.isElement(obj)) {
      return 'element';
    }
  },
  typeOf: function typeOf(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  },
  assert: function assert(condition, message) {
    if (!condition) {
      message = message || 'Assertion failed';
      if (typeof Error !== 'undefined') {
        throw new Error(message);
      }
      throw message; // Fallback
    }
  },
  requestFrame: (function () {
    var raf = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || function (fn) { return window.setTimeout(fn, 20); };
    return function (fn) { return raf(fn); };
  })(),
  cancelFrame: (function () {
    var cancel =  window.cancelAnimationFrame
        || window.mozCancelAnimationFrame
        || window.webkitCancelAnimationFrame
        || window.clearTimeout;
    return function (id) { return cancel(id); };
  })()
};

/**
 * @class Internal
 */
var Internal = function Internal(base) {
  this.Base = base;
  this.stylesCreated = false;
  this.animation = {
    name: 'resizeanim',
    keyframes: undefined,
    style: undefined,
    startevent: 'animationstart'
  };

  // handle re-adding listener
  this.listening = false;

  // increment internal ids
  this._ids = 0;

  // these are the targets we're working on
  this.targets = [];

  // keep `this` scope
  this.handleScrollListener = this.scrollListener.bind(this);

  this.init();
};

Internal.prototype.init = function init () {
  this.detectAnimation();
  this.setListener(this.Base.target);
};

Internal.prototype.setListener = function setListener (target) {
    var this$1 = this;

  var ar_target = [], element;

  if (this.listening) { return; }

  // to array if string
  target = Array.isArray(target) ? target : [target];
  // merge
  Array.prototype.push.apply(ar_target, target);

  ar_target.forEach(function (el, i) {
    element = utils.evaluate(el);

    if (!element) { return; }

    var id = this$1._ids++;
    element._id = id;
    this$1.targets[id] = {
      element: element
    };

    this$1.addResizeListener(element);
  });

  this.listening = true;
};

Internal.prototype.removeListener = function removeListener () {
    var this$1 = this;

  this.targets.forEach(function (target) {
    this$1.removeResizeListener(target.element);
  });
  this.targets = [];
  this.listening = false;
};

Internal.prototype.detectAnimation = function detectAnimation () {
    var this$1 = this;

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation', //eslint-disable-line no-unused-vars
      keyframeprefix = '',
      domPrefixes = ['Webkit', 'Moz', 'O', 'ms'],
      startEvents = [
        'webkitAnimationStart',
        'animationstart',
        'oAnimationStart',
        'MSAnimationStart'
      ],
      pfx= '',
      elm = document.createElement('fakeelement'),
      i = 0;

  animation = elm.style.animationName !== undefined;

  if (animation === false) {
    for (; i < domPrefixes.length; i++) {
      if (elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined) {
        pfx = domPrefixes[i];
        animationstring = pfx + 'Animation';
        keyframeprefix = '-' + pfx.toLowerCase() + '-';
        this$1.animation.startevent = startEvents[i];
        animation = true;
        break;
      }
    }
  }

  var animationKeyframes = [
    '@',
    keyframeprefix,
    'keyframes ',
    this.animation.name,
    ' { from { opacity: 0; } to { opacity: 0; }}'
  ].join('');

  this.animation = {
    keyframes: animationKeyframes,
    style: keyframeprefix + 'animation: 1ms ' + this.animation.name + ';'
  };
};

Internal.prototype.trigger = function trigger (element) {
  this.Base.dispatchEvent(eventType.RESIZE, {
    element: {
      target: element,
      offset: utils.offset(element)
    },
    window: utils.getWindowSize()
  });
};

Internal.prototype.scrollListener = function scrollListener (evt) {
  var this_ = this;
  var element = evt.target.parentNode.parentNode;

  this_.resetTriggers(element);
  if (element.__resizeRAF__) { utils.cancelFrame(element.__resizeRAF__); }

  element.__resizeRAF__ = utils.requestFrame(function () {
    if (this_.checkTriggers(element)) {
      element.__resizeLast__.width = element.offsetWidth;
      element.__resizeLast__.height = element.offsetHeight;
      element.__resizeListeners__.forEach(function () {
        this_.trigger(element);
      });
    }
  });
};

Internal.prototype.addResizeListener = function addResizeListener (element) {
  var this_ = this;

  if (!element.__resizeTriggers__) {
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    this.createStyles();

    element.__resizeLast__ = {};
    element.__resizeListeners__ = [];
    (element.__resizeTriggers__ = document.createElement('div')).className =
      'resize-triggers';
    element.__resizeTriggers__.innerHTML =
      '<div class="expand-trigger"><div></div></div>' +
      '<div class="contract-trigger"></div>';
    element.appendChild(element.__resizeTriggers__);

    this.resetTriggers(element);
    element.addEventListener('scroll', this.handleScrollListener, true);

    /* Listen for a css animation to detect element display/re-attach */
    if (this.animation.startevent) {
      element.__resizeTriggers__.addEventListener(this.animation.startevent,
        function (e) {
          if (e.animationName === this.animation.name) {
            this_.resetTriggers(element);
          }
        });
    }
  }
  // FIXME what to do with this thing?
  element.__resizeListeners__.push(element._id);
};

Internal.prototype.removeResizeListener = function removeResizeListener (element) {
  element.__resizeListeners__.splice(
    element.__resizeListeners__.indexOf(element._id), 1);
  if (!element.__resizeListeners__.length) {
    element.removeEventListener('scroll', this.handleScrollListener);
    element.__resizeTriggers__ =
      !element.removeChild(element.__resizeTriggers__);
  }
};

Internal.prototype.createStyles = function createStyles () {

  var anim = this.animation;

  //opacity:0 works around a chrome bug
  // https://code.google.com/p/chromium/issues/detail?id=286360

  var css = [
    anim.keyframes ? anim.keyframes : '',
    '.resize-triggers {',
    anim.style ? anim.style : '',
    'visibility:hidden;opacity:0;} ',
    '.resize-triggers, .resize-triggers > div,',
    '.contract-trigger:before { content: " ";display:block;',
    'position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;}',
    '.resize-triggers>div{background:#eee;overflow:auto;}',
    '.contract-trigger:before{width:200%;height:200%;}'
  ].join('');

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (this.stylesCreated) { return; }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
  this.stylesCreated = true;
};

Internal.prototype.resetTriggers = function resetTriggers (element) {
  var triggers = element.__resizeTriggers__,
      expand = triggers.firstElementChild,
      contract = triggers.lastElementChild,
      expandChild = expand.firstElementChild;

  contract.scrollLeft = contract.scrollWidth;
  contract.scrollTop = contract.scrollHeight;
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  expand.scrollLeft = expand.scrollWidth;
  expand.scrollTop = expand.scrollHeight;
};

Internal.prototype.checkTriggers = function checkTriggers (element) {
  return element.offsetWidth !== element.__resizeLast__.width ||
            element.offsetHeight !== element.__resizeLast__.height;
};

/**
 * Based on https://github.com/metafizzy/ev-emitter
 * @class Emitter
 */
var Emitter = function Emitter() {
  // set events hash
  this._events = this._events || {};
  // set onceEvents hash
  this._onceEvents = this._onceEvents || {};
};

Emitter.prototype.on = function on (eventName, listener) {
  if (!eventName || !listener) { return; }
  // set listeners array
  var listeners = this._events[eventName] = this._events[eventName] || [];
  // only add once
  if (listeners.indexOf(listener) === -1) { listeners.push(listener); }
  return this;
};

Emitter.prototype.once = function once (eventName, listener) {
  if (!eventName || !listener) { return; }
  // add event
  this.on(eventName, listener);
  // set onceListeners object
  var onceListeners =
    this._onceEvents[eventName] =
      this._onceEvents[eventName] || {};
  // set flag
  onceListeners[listener] = true;
  return this;
};
Emitter.prototype.off = function off (eventName, listener) {
  var listeners = this._events && this._events[eventName];
  if (!listeners || !listeners.length) { return; }
  var index = listeners.indexOf(listener);
  if (index !== -1) { listeners.splice(index, 1); }
  return this;
};

Emitter.prototype.dispatchEvent = function dispatchEvent (eventName, obj) {
    var this$1 = this;
    if ( obj === void 0 ) obj = {};

  var listeners = this._events && this._events[eventName];
  if (!listeners || !listeners.length) { return; }

  var i = 0;
  var listener = listeners[i];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[eventName];

  while (listener) {
    var isOnce = onceListeners && onceListeners[listener];
    if (isOnce) {
      // remove listener
      // remove before trigger to prevent recursion
      this$1.off(eventName, listener);
      // unset once flag
      delete onceListeners[listener];
    }
    // trigger listener
    listener.call(this$1, obj);
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }
  return this;
};

/**
 * Principal class. Will be passed as argument to others.
 * @class Base
 */
var Base = (function (Emitter$$1) {
  function Base(target, opt_options) {
    if ( opt_options === void 0 ) opt_options = {};

    utils.assert(Array.isArray(target)
        || utils.typeOf(target) === 'string'
        || utils.isElement(target),
        '`target` should be Element, <Array>Element, String or <Array>String.'
    );
    Emitter$$1.call(this);
    this.target = target;
    Base.Internal = new Internal(this);
  }

  if ( Emitter$$1 ) Base.__proto__ = Emitter$$1;
  Base.prototype = Object.create( Emitter$$1 && Emitter$$1.prototype );
  Base.prototype.constructor = Base;

  Base.prototype.reAddListener = function reAddListener () {
    Base.Internal.setListener(this.target);
  };

  Base.prototype.removeListener = function removeListener () {
    Base.Internal.removeListener();
  };

  return Base;
}(Emitter));

return Base;

})));
