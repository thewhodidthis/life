// # Life
// Just another game of life runner

import Otto from '@thewhodidthis/otto';

const mySum = (a, b) => a + b;
const mooreEnds = s => [-1, 1, -s, s, -1 - s, 1 - s, -1 + s, 1 + s];

const Life = (opts) => {
  const area = { size: opts.size * opts.size };
  const data = Object.assign({
    ends: mooreEnds(opts.size),
    seed: () => Math.floor(Math.random() * 2) % 2,
    stat: (hood, code, flag) => {
      const stats = hood.reduce(mySum);

      if (flag && (stats <= 1 || stats >= 4)) {
        return 0;
      }

      if (!flag && stats === 3) {
        return 1;
      }

      return flag;
    },
  }, opts, area);

  return Otto(data);
};

export default Life;

