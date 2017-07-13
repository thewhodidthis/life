(function () {
'use strict';

// # Otto
// Helps deal CAs

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

// Maker
var Otto = function (data) {
  // Merge options and defaults
  var t0to = Object.assign({
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
  var code = parseRule(t0to.rule);

  // Calculate state
  var step = function (v, i, view) {
    // Collect neighboring flags
    var hood = t0to.ends.map(function (span) {
      // The index for each neighbor
      var site = myMod(span + i, view.length);

      // The state of each neighbor
      return view[site]
    });

    return t0to.stat(hood, code, v)
  };

  // Clipboard, zero filled
  var grid = new Uint8Array(t0to.size);
  var next = t0to.seed;

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

var Life = function (data) {
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

  return Otto(t0to)
};

var plot = document.querySelector('canvas').getContext('2d');
var plotW = plot.canvas.width;
var plotH = plot.canvas.height;

var cellSize = 10;
var size = plotW / cellSize;

var life = Life({ size: size });

var frames = -1;

// Draw gridlines
var guides = plot.canvas.cloneNode().getContext('2d');

for (var i = 0; i < plotW; i += 10) {
  var x = i - 0.5;

  guides.moveTo(x, 0);
  guides.lineTo(x, plotH);
}

for (var i$1 = 0; i$1 < plotH; i$1 += 10) {
  var y = i$1 - 0.5;

  guides.moveTo(0, y);
  guides.lineTo(plotW, y);
}

guides.fillStyle = 'transparent';
guides.fillRect(0, 0, plotW, plotH);
guides.strokeStyle = window.getComputedStyle(plot.canvas).borderColor;
guides.stroke();

var tick = function (fn) { return window.requestAnimationFrame(fn); };
var stop = function (id) { return window.cancelAnimationFrame(id); };
var draw = function () {
  if (frames % 15 === 0) {
    var grid = life();

    for (var i = 0, total = grid.length; i < total; i += 1) {
      var step = i * cellSize;
      var x = step % plotW;
      var y = Math.floor(step / plotW) * cellSize;

      if (grid[i]) {
        plot.fillStyle = 'black';
      } else {
        plot.fillStyle = 'white';
      }

      plot.fillRect(x, y, cellSize, cellSize);
    }

    plot.drawImage(guides.canvas, 0, 0);
  }

  frames = tick(draw);
};

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

document.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  frames = frames ? stop(frames) : tick(draw);
});

window.addEventListener('load', function () {
  frames = tick(draw);
});

}());

