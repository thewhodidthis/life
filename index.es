// # Life
// Just another game of life runner

import Otto from '@thewhodidthis/otto';

const mySum = (a, b) => a + b;
const mooreEnds = n => [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n];

const Life = (data = { size: 1 }) => {
  const area = { size: data.size * data.size };
  const life = Object.assign({
    ends: mooreEnds(data.size),
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
  }, data, area);

  return Otto(life);
};

export default Life;

