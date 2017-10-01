// # Life
// Just another game of life runner

import otto from '@thewhodidthis/otto'

const mySum = (a, b) => a + b
const mooreEnds = n => [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n]

const life = (data) => {
  const size = (data && data.size) || 1
  const area = { size: size * size }

  const t0to = Object.assign({
    ends: mooreEnds(size),
    seed: () => Math.floor(Math.random() * 2) % 2,
    stat: (hood, code, flag) => {
      const stats = hood.reduce(mySum)

      if (flag && (stats <= 1 || stats >= 4)) {
        return 0
      }

      if (!flag && stats === 3) {
        return 1
      }

      return flag
    }
  }, data, area)

  return otto(t0to)
}

export default life
