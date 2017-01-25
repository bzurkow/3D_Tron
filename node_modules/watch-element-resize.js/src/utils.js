/**
 * @module utils
 * All the helper functions needed in this project
 */
export default {
  /**
   * @param {HTMLElement} element
   * @param {String} prop
   * @returns {String|Number}
   */
  getComputedStyle(element, prop) {
    if (element.currentStyle) {
      return element.currentStyle[prop];
    } else if (window.getComputedStyle) {
      return window.getComputedStyle(element, null).getPropertyValue(prop);
    } else {
      return element.style[prop];
    }
  },
  offset(element) {
    let rect = element.getBoundingClientRect();
    let docEl = document.documentElement;
    return {
      left: rect.left + window.pageXOffset - docEl.clientLeft,
      top: rect.top + window.pageYOffset - docEl.clientTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  },
  getWindowSize() {
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
  $(id) {
    id = (id[0] === '#') ? id.substr(1, id.length) : id;
    return document.getElementById(id);
  },
  isElement(obj) {
    // DOM, Level2
    if ('HTMLElement' in window) {
      return (!!obj && obj instanceof HTMLElement);
    }
    // Older browsers
    return (!!obj && typeof obj === 'object' &&
                obj.nodeType === 1 && !!obj.nodeName);
  },
  evaluate(element) {
    let el;
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
  toType(obj) {
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
  typeOf(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  },
  assert(condition, message) {
    if (!condition) {
      message = message || 'Assertion failed';
      if (typeof Error !== 'undefined') {
        throw new Error(message);
      }
      throw message; // Fallback
    }
  },
  requestFrame: (function () {
    let raf = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || function (fn) { return window.setTimeout(fn, 20); };
    return function (fn) { return raf(fn); };
  })(),
  cancelFrame: (function () {
    let cancel =  window.cancelAnimationFrame
        || window.mozCancelAnimationFrame
        || window.webkitCancelAnimationFrame
        || window.clearTimeout;
    return function (id) { return cancel(id); };
  })()
};
