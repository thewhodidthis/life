'use strict';

var Otto = require('@thewhodidthis/otto');

// # Life
// Just another game of life runner

var mySum = function mySum(a, b) {
  return a + b;
};
var mooreEnds = function mooreEnds(s) {
  return [-1, 1, -s, s, -1 - s, 1 - s, -1 + s, 1 + s];
};

var Life = function Life() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { size: 1 };

  var area = { size: opts.size * opts.size };
  var data = Object.assign({
    ends: mooreEnds(opts.size),
    seed: function seed() {
      return Math.floor(Math.random() * 2) % 2;
    },
    stat: function stat(hood, code, flag) {
      var stats = hood.reduce(mySum);

      if (flag && (stats <= 1 || stats >= 4)) {
        return 0;
      }

      if (!flag && stats === 3) {
        return 1;
      }

      return flag;
    }
  }, opts, area);

  return Otto(data);
};

module.exports = Life;
