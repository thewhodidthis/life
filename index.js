'use strict';

var Otto = require('@thewhodidthis/otto');

// # Life
// Just another game of life runner

var mySum = function mySum(a, b) {
  return a + b;
};
var mooreEnds = function mooreEnds(n) {
  return [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n];
};

var Life = function Life() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { size: 1 };

  var area = { size: data.size * data.size };
  var life = Object.assign({
    ends: mooreEnds(data.size),
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
  }, data, area);

  return Otto(life);
};

module.exports = Life;
