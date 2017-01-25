import * as constants from './constants';
import utils from './utils';

/**
 * @class Internal
 */
export class Internal {
  constructor(base) {
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
  }

  init() {
    this.detectAnimation();
    this.setListener(this.Base.target);
  }

  setListener(target) {
    let ar_target = [], element;

    if (this.listening) return;

    // to array if string
    target = Array.isArray(target) ? target : [target];
    // merge
    Array.prototype.push.apply(ar_target, target);

    ar_target.forEach((el, i) => {
      element = utils.evaluate(el);

      if (!element) return;

      let id = this._ids++;
      element._id = id;
      this.targets[id] = {
        element: element
      };

      this.addResizeListener(element);
    });

    this.listening = true;
  }

  removeListener() {
    this.targets.forEach(target => {
      this.removeResizeListener(target.element);
    });
    this.targets = [];
    this.listening = false;
  }

  detectAnimation() {
    /* Detect CSS Animations support to detect element display/re-attach */
    let animation = false,
        animationstring = 'animation', //eslint-disable-line no-unused-vars
        keyframeprefix = '',
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms'],
        startEvents = [
          'webkitAnimationStart',
          'animationstart',
          'oAnimationStart',
          'MSAnimationStart'
        ],
        pfx  = '',
        elm = document.createElement('fakeelement'),
        i = 0;

    animation = elm.style.animationName !== undefined;

    if (animation === false) {
      for (; i < domPrefixes.length; i++) {
        if (elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          this.animation.startevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }

    const animationKeyframes = [
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
  }

  trigger(element) {
    this.Base.dispatchEvent(constants.eventType.RESIZE, {
      element: {
        target: element,
        offset: utils.offset(element)
      },
      window: utils.getWindowSize()
    });
  }

  scrollListener(evt) {
    var this_ = this;
    var element = evt.target.parentNode.parentNode;

    this_.resetTriggers(element);
    if (element.__resizeRAF__) utils.cancelFrame(element.__resizeRAF__);

    element.__resizeRAF__ = utils.requestFrame(function () {
      if (this_.checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function () {
          this_.trigger(element);
        });
      }
    });
  }

  addResizeListener(element) {
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
  }

  removeResizeListener(element) {
    element.__resizeListeners__.splice(
      element.__resizeListeners__.indexOf(element._id), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', this.handleScrollListener);
      element.__resizeTriggers__ =
        !element.removeChild(element.__resizeTriggers__);
    }
  }

  createStyles() {

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

    if (this.stylesCreated) return;

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    this.stylesCreated = true;
  }

  resetTriggers(element) {
    let triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;

    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  }

  checkTriggers(element) {
    return element.offsetWidth !== element.__resizeLast__.width ||
              element.offsetHeight !== element.__resizeLast__.height;
  }
}
