'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var otto = _interopDefault(require('@thewhodidthis/otto'));

// # Life
// Just another game of life runner

var mySum = function (a, b) { return a + b; };
var mooreEnds = function (n) { return [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n]; };

var life = function (data) {
  var size = (data && data.size) || 1;
  var area = { size: size * size };

  var t0to = Object.assign({
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
  }, data, area);

  return otto(t0to)
};

module.exports = life;

