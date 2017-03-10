'use strict';

var html = document.documentElement;
var plot = document.querySelector('canvas').getContext('2d');

var size = plot.canvas.width;
var life = Life({
  size: size,
});

var framesN = Math.pow(22, 22);
var frameId;

var frame = function frame(r) {
  var grid = life();

  for (var j = 0; j < grid.length; j += 1) {
    var x = j % size;
    var y = Math.floor(j / size);

    if (grid[j]) {
      plot.fillStyle = 'black';
    } else {
      plot.fillStyle = 'white';
    }

    plot.fillRect(x, y, 1, 1);
  }

  if (frameId > framesN) {
    frameId = window.cancelAnimationFrame(frameId);
  } else {
    frameId = window.requestAnimationFrame(frame);
  }
};

html.className = 'html';

if (window !== window.top) {
  html.className += ' is-iframe';
}

window.addEventListener('load', function(e) {
  frameId = window.requestAnimationFrame(frame);
}, false);

