import Life from '../index.es';

const plot = document.querySelector('canvas').getContext('2d');
const plotW = plot.canvas.width;
const plotH = plot.canvas.height;

const cellSize = 10;
const size = plotW / cellSize;

const life = Life({ size });

let frames = -1;

// Draw gridlines
const guides = plot.canvas.cloneNode().getContext('2d');

for (let i = 0; i < plotW; i += 10) {
  const x = i - 0.5;

  guides.moveTo(x, 0);
  guides.lineTo(x, plotH);
}

for (let i = 0; i < plotH; i += 10) {
  const y = i - 0.5;

  guides.moveTo(0, y);
  guides.lineTo(plotW, y);
}

guides.fillStyle = 'transparent';
guides.fillRect(0, 0, plotW, plotH);
guides.strokeStyle = window.getComputedStyle(plot.canvas).borderColor;
guides.stroke();

const tick = fn => window.requestAnimationFrame(fn);
const stop = id => window.cancelAnimationFrame(id);
const draw = () => {
  if (frames % 15 === 0) {
    const grid = life();

    for (let i = 0, total = grid.length; i < total; i += 1) {
      const step = i * cellSize;
      const x = step % plotW;
      const y = Math.floor(step / plotW) * cellSize;

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

document.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  frames = frames ? stop(frames) : tick(draw);
});

window.addEventListener('load', () => {
  frames = tick(draw);
});

