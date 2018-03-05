(function () {
'use strict';

// # Otto
// Helps create elementary Cellular Automata

// Wrap index round edges
// http://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain
const myMod = (a, b) => a - (b * Math.floor(a / b));

// Rule to binary convert
const parseRule = (rule) => {
  // Base 2 digits
  const code = Number(rule).toString(2);

  const zeros = (1024).toString(2).split('').slice(1).join('');
  const zerosMax = zeros.length;

  // No padding past 10
  const diff = Math.max(zerosMax, zerosMax - code.length);

  // Zero pad ruleset if need be
  return `${zeros}${code}`.substr(diff).split('').reverse()
};

// Master grid maker
const otto = (data) => {
  // Merge options and defaults
  const papa = Object.assign({
    size: 1,
    rule: 30,

    // How far from center lie the neighbors
    ends: [-1, 0, 1],

    // Flip middle cell
    seed: (v, i, view) => i === Math.floor(view.length * 0.5),

    // Index based lookup
    stat: (hood, code) => {
      const flags = hood.join('').toString(2);
      const stats = parseInt(flags, 2);

      return code[stats]
    }
  }, data);

  // Rule 90 would be
  // ```['0', '1', '0', '1', '1', '0', '1']```
  const code = parseRule(papa.rule);

  // Calculate state
  const step = (v, i, view) => {
    // Collect neighboring flags
    const hood = papa.ends.map((span) => {
      // The index for each neighbor
      const site = myMod(span + i, view.length);

      // The state of each neighbor
      return view[site]
    });

    return papa.stat(hood, code, v)
  };

  // Clipboard, zero filled
  let grid = new Uint8Array(papa.size);
  let next = papa.seed;

  // Tick
  return () => {
    grid = grid.map(next);
    next = step;

    return grid
  }
};

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

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

const plot = document.querySelector('canvas').getContext('2d');
const { width: w } = plot.canvas;

const step = 20;
const seed = { size: w / step };

const cell = document.createElement('canvas').getContext('2d');

const edge = 6;
const span = step - edge;

cell.canvas.width = cell.canvas.height = step;

cell.fillRect(0, 0, step, step);
cell.beginPath();

cell.moveTo(edge, edge);
cell.lineTo(span, span);
cell.moveTo(span, edge);
cell.lineTo(edge, span);

cell.lineWidth = 2;
cell.strokeStyle = 'white';
cell.stroke();

const mark = plot.createPattern(cell.canvas, 'repeat');

let beat = -1;
let grid = life(seed);

const tick = fn => window.requestAnimationFrame(fn);
const draw = () => {
  if (beat % 5 === 0) {
    const data = grid();

    for (let i = 0, stop = data.length; i < stop; i += 1) {
      const s = i * step;

      const x = s % w;
      const y = step * Math.floor(s / w);

      plot.fillStyle = data[i] ? '#000' : mark;
      plot.fillRect(x, y, step, step);
    }
  }

  beat = tick(draw);
};

document.addEventListener('click', () => {
  grid = life(seed);
});

window.addEventListener('load', () => {
  beat = tick(draw);
});

}());
