(function () {
'use strict';

// # Otto
// Helps deal CAs

// Wrap index round edges
// http://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain
var myMod = function myMod(a, b) {
  return a - b * Math.floor(a / b);
};

// Rule to binary convert
var parseRule = function parseRule(rule) {
  // Base 2 digits
  var code = Number(rule).toString(2);

  var zeros = 1024 .toString(2).split('').slice(1).join('');
  var zerosMax = zeros.length;

  // No padding past 10
  var diff = Math.max(zerosMax, zerosMax - code.length);

  // Zero pad ruleset if need be
  return ('' + zeros + code).substr(diff).split('').reverse();
};

// Setup
var Otto = function Otto(options) {
  // Merge options and defaults
  var settings = Object.assign({
    size: 1,
    rule: 30,

    // How far from center lie the neighbors
    ends: [-1, 0, 1],

    // Flip middle cell
    seed: function seed(v, i, view) {
      return i === Math.floor(view.length * 0.5);
    },

    // Index based lookup
    stat: function stat(hood, code) {
      var flags = hood.join('').toString(2);
      var stats = parseInt(flags, 2);

      return code[stats];
    }
  }, options);

  // Rule 90 would be
  // ```['0', '1', '0', '1', '1', '0', '1']```
  var code = parseRule(settings.rule);

  // Calculate state
  var step = function step(v, i, view) {
    // Collect neighboring flags
    var hood = settings.ends.map(function (span) {
      // The index for each neighbor
      var site = myMod(span + i, view.length);

      // The state of each neighbor
      return view[site];
    });

    return settings.stat(hood, code, v);
  };

  // Clipboard, zero filled
  var grid = new Uint8Array(settings.size);
  var next = settings.seed;

  // Tick
  return function () {
    grid = grid.map(next);
    next = step;

    return grid;
  };
};

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

  var life = Object.assign({
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

  return Otto(life);
};

var plot = document.querySelector('canvas').getContext('2d');
var plotSize = plot.canvas.width;
var size = 50;
var gridArea = 50 * 30;

var life = Life({ size: size });

var frames = -1;

var tick = function tick(fn) {
  return window.requestAnimationFrame(fn);
};
var stop = function stop(id) {
  return window.cancelAnimationFrame(id);
};
var draw = function draw() {
  if (frames % 15 === 0) {
    var grid = life();

    for (var i = 0, total = gridArea; i < total; i += 1) {
      var step = i * 10;
      var x = step % plotSize;
      var y = Math.floor(step / plotSize) * 10;

      if (grid[i]) {
        plot.fillStyle = 'black';
      } else {
        plot.fillStyle = 'white';
      }

      plot.fillRect(x + 1, y + 1, 8, 8);
    }
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
