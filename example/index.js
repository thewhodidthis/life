'use strict';

var TAU =  2 * Math.PI;

var html = document.documentElement;
var list = document.getElementById('list');

var cells = document.getElementsByTagName('input');
var items = document.getElementsByTagName('li');

var frank = cells[0];
var jones = list.removeChild(items[0]);

var framesN = Math.pow(23, 23);
var frameId;

var tots = 6;
var size = 8;

for (var i = 0, total = size * size; i < total - 1; i += 1) {
  jones.appendChild(frank.cloneNode(true, true));
}

for (var i = 0, total = tots; i < total; i += 1) {
  list.appendChild(jones.cloneNode(true, true));
}

var life = Life({
  size: 24,
});

var frame = function frame(t) {
  if (frameId % 20 === 0) {
    var grid = life().slice(0, cells.length);

    for (var c = 0; c < grid.length; c += 1) {
      cells[c].checked = grid[c];
    }
  }

  frameId = window.requestAnimationFrame(frame);
};

if (window !== window.top) {
  html.className = 'is-iframe';
}

document.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (frameId) {
    frameId = window.cancelAnimationFrame(frameId);
  } else {
    frameId = window.requestAnimationFrame(frame);
  }
}, false);

window.addEventListener('load', function (e) {
  frameId = window.requestAnimationFrame(frame);
}, false);

