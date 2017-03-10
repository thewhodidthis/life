// # Life
// Just another game of life clone

import Otto from '@thewhodidthis/otto';

const mySum = (a, b) => a + b;
const mooreEnds = s => [-1, 1, -s, s, -1 - s, 1 - s, -1 + s, 1 + s];

const Life = (opts) => {
  const data = Object.assign({
    ends: mooreEnds(opts.size),
    seed: () => Math.floor(Math.random() * 2) % 2,
    stat: (code, hood, v) => {
      const stats = hood.reduce(mySum);

      if ((stats <= 1 || stats >= 4) && v === 1) {
        return 0;
      }

      if (stats === 3 && v === 0) {
        return 1;
      }

      return v;
    },
  }, opts, {
    size: opts.size * opts.size,
  });

  return Otto(data);
};

export default Life;

