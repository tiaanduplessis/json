(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.json = factory());
}(this, (function () { 'use strict';

var stringify = require('fast-safe-stringify');
var parseJSON = require('parse-json');

var JSON = {
  stringify: stringify,
  parse: function parse (json, reviver, filename, cb) {
    if (arguments.length === 2) {
      cb = reviver;
      reviver = null;
    }

    try {
      var result = parseJSON(json, reviver, filename);
      cb(null, result);
    } catch (error) {
      cb(error);
    }
  }
};

return JSON;

})));
