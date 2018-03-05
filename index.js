'use strict';

var otto = require('@thewhodidthis/otto');

// # Life

const mySum = (a, b) => a + b;
const mooreEnds = n => [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n];

const life = (from) => {
  const size = (from && from.size) || 1;
  const grid = { size: size * size };

  const data = Object.assign({
    ends: mooreEnds(size),
    seed: () => Math.floor(Math.random() * 2) % 2,
    stat: (hood, code, flag) => {
      const stats = hood.reduce(mySum);

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
