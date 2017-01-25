import { Internal } from './internal';
import { Emitter } from './emitter';
import utils from './utils';

/**
 * Principal class. Will be passed as argument to others.
 * @class Base
 */
export default class Base extends Emitter {
  /**
   * @constructor
   * @param {String|Array<String>|Element|Array<Element>} target String or
   * array of string, DOM node or array of nodes.
   * @param {Object|undefined} opt_options Options.
   */
  constructor(target, opt_options = {}) {
    utils.assert(Array.isArray(target)
        || utils.typeOf(target) === 'string'
        || utils.isElement(target),
        '`target` should be Element, <Array>Element, String or <Array>String.'
    );
    super();
    this.target = target;
    Base.Internal = new Internal(this);
  }

  reAddListener() {
    Base.Internal.setListener(this.target);
  }

  removeListener() {
    Base.Internal.removeListener();
  }
}
