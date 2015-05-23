// ECMAScript Version 6 'String.prototype.includes()' Polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
