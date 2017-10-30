// const NONE = 0;
// const ERROR = 1;
// const WARN = 2;
// const INFO = 3;
// const LOG = 4;
// const ALL = 99;

const console = window.console; // ref it otherwise console may be modified by others.

const outputToConsole = (args) => {
  var key = Array.prototype.shift.call(args);
  if (console[key]) {
    console[key].apply(console, args);
  } else {
    if (key.length === 1) {
      if (typeof key[0] !== 'string') {
        key[0] = JSON.stringify(key[0]);
      }
      window.alert(key[0]);
    } else {
      window.alert(JSON.stringify(key));
    }
  }
};

const PackConsole = {
  __isShow: true,
  __level: 5, // reports message level
  __parseJSON: false, // TODO
  __prefix: (args) => {
    Array.prototype.splice.call(args, 1, 0, '[UTC ' + (new Date().toISOString().slice(11, 23)) + ']');
    return args;
  },
  // __suffix: '', // TODO:
  get isShow () {
    return this.__isShow;
  },
  set isShow (isShow) {
    this.__isShow = isShow;
    return this.__isShow;
  },
  get level () {
    return this.__level;
  },
  /**
   * [level description]
   * Logger.ALL = 99; // reports everything.
   * Logger.LOG = 4; // reports all messages except trace
   * Logger.INFO = 3; // reports all messages except debug and trace
   * Logger.WARN = 2; // reports all messages except info, debug and trace
   * Logger.ERROR = 1; // reports only error and fatal messages
   * Logger.NONE = 0; // reports no messages at all
   * @return {[type]} [description]
   */
  set level (level) {
    this.__level = parseInt(level, 10) || 0;
    return this.__level;
  },
  output (args) {
    if (!this.__isShow) {
      return false;
    }
    args = this.modifyResult(args);
    outputToConsole(args);
  },
  modifyResult (result) {
    let args = result;
    switch (typeof this.__prefix) {
      case 'string':
      case 'number':
        Array.prototype.splice.call(result, 1, 0, this.__prefix);
        break;
      case 'function':
        args = this.__prefix(result);
        break;
    }
    return args;
  },
  error (...args) {
    if (this.__level < 1) {
      return false;
    }
    Array.prototype.unshift.call(args, 'error');
    this.output(args);
  },
  warn (...args) {
    if (this.__level < 2) {
      return false;
    }
    Array.prototype.unshift.call(args, 'warn');
    this.output(args);
  },
  info (...args) {
    if (this.__level < 3) {
      return false;
    }
    Array.prototype.unshift.call(args, 'info');
    this.output(args);
  },
  log (...args) {
    if (this.__level < 4) {
      return false;
    }
    Array.prototype.unshift.call(args, 'log');
    this.output(args);
  },
};

// export default PackConsole;
module.exports = PackConsole;
