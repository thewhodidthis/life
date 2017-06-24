import Life from '../index.es';

const plot = document.querySelector('canvas').getContext('2d');
const plotSize = plot.canvas.width;
const size = 50;
const gridArea = 50 * 30;

const life = Life({ size });

let frames = -1;

const tick = fn => window.requestAnimationFrame(fn);
const stop = id => window.cancelAnimationFrame(id);
const draw = () => {
  if (frames % 15 === 0) {
    const grid = life();

    for (let i = 0, total = gridArea; i < total; i += 1) {
      const step = i * 10;
      const x = step % plotSize;
      const y = Math.floor(step / plotSize) * 10;

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

document.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  frames = frames ? stop(frames) : tick(draw);
});

window.addEventListener('load', () => {
  frames = tick(draw);
});

