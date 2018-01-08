'use strict';

var otto = require('@thewhodidthis/otto');

// # Life
// Just another game of life runner

var mySum = function (a, b) { return a + b; };
var mooreEnds = function (n) { return [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n]; };

var life = function (from) {
  var size = (from && from.size) || 1;
  var grid = { size: size * size };

  var data = Object.assign({
    ends: mooreEnds(size),
    seed: function () { return Math.floor(Math.random() * 2) % 2; },
    stat: function (hood, code, flag) {
      var stats = hood.reduce(mySum);

      if (flag && (stats <= 1 || stats >= 4)) {
        return 0
      }

      if (!flag && stats === 3) {
        return 1
      }

      return flag
    }
  }, from, grid);

  return otto(data)
};

module.exports = life;

