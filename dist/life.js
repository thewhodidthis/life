var Life = (function (Otto) {
'use strict';

// # Life
// Just another game of life runner

var mySum = function mySum(a, b) {
  return a + b;
};
var mooreEnds = function mooreEnds(n) {
  return [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n];
};

var Life = function Life(data) {
  var size = data && data.size || 1;
  var area = { size: size * size };

  var t0to = Object.assign({
    ends: mooreEnds(size),
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

  return Otto(t0to);
};

return Life;

}(Otto));
