(function () {
'use strict';

// # Otto
// Helps create elementary Cellular Automata

// Wrap index round edges
// http://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain
var myMod = function (a, b) { return a - (b * Math.floor(a / b)); };

// Rule to binary convert
var parseRule = function (rule) {
  // Base 2 digits
  var code = Number(rule).toString(2);

  var zeros = (1024).toString(2).split('').slice(1).join('');
  var zerosMax = zeros.length;

  // No padding past 10
  var diff = Math.max(zerosMax, zerosMax - code.length);

  // Zero pad ruleset if need be
  return ("" + zeros + code).substr(diff).split('').reverse()
};

// Master grid maker
var otto = function (data) {
  // Merge options and defaults
  var papa = Object.assign({
    size: 1,
    rule: 30,

    // How far from center lie the neighbors
    ends: [-1, 0, 1],

    // Flip middle cell
    seed: function (v, i, view) { return i === Math.floor(view.length * 0.5); },

    // Index based lookup
    stat: function (hood, code) {
      var flags = hood.join('').toString(2);
      var stats = parseInt(flags, 2);

      return code[stats]
    }
  }, data);

  // Rule 90 would be
  // ```['0', '1', '0', '1', '1', '0', '1']```
  var code = parseRule(papa.rule);

  // Calculate state
  var step = function (v, i, view) {
    // Collect neighboring flags
    var hood = papa.ends.map(function (span) {
      // The index for each neighbor
      var site = myMod(span + i, view.length);

      // The state of each neighbor
      return view[site]
    });

    return papa.stat(hood, code, v)
  };

  // Clipboard, zero filled
  var grid = new Uint8Array(papa.size);
  var next = papa.seed;

  // Tick
  return function () {
    grid = grid.map(next);
    next = step;

    return grid
  }
};

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

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

var plot = document.querySelector('canvas').getContext('2d');
var ref = plot.canvas;
var w = ref.width;

var step = 20;
var seed = { size: w / step };

var cell = document.createElement('canvas').getContext('2d');

var edge = 6;
var span = step - edge;

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

var mark = plot.createPattern(cell.canvas, 'repeat');

var beat = -1;
var grid = life(seed);

var tick = function (fn) { return window.requestAnimationFrame(fn); };
var draw = function () {
  if (beat % 5 === 0) {
    var data = grid();

    for (var i = 0, stop = data.length; i < stop; i += 1) {
      var s = i * step;

      var x = s % w;
      var y = step * Math.floor(s / w);

      plot.fillStyle = data[i] ? '#000' : mark;
      plot.fillRect(x, y, step, step);
    }
  }

  beat = tick(draw);
};

document.addEventListener('click', function () {
  grid = life(seed);
});

window.addEventListener('load', function () {
  beat = tick(draw);
});

}());

