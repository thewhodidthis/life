(() => {
  // ../node_modules/.pnpm/@thewhodidthis+otto@2.0.0/node_modules/@thewhodidthis/otto/main.js
  var myMod = (a, b) => a - b * Math.floor(a / b);
  var parseRule = (rule) => {
    const code = Number(rule).toString(2);
    const zeros = 1024 .toString(2).split("").slice(1).join("");
    const zerosMax = zeros.length;
    const diff = Math.max(zerosMax, zerosMax - code.length);
    return `${zeros}${code}`.substr(diff).split("").reverse();
  };
  var otto = (data) => {
    const papa = Object.assign({
      size: 1,
      rule: 30,
      ends: [-1, 0, 1],
      seed: (_, i, view) => i === Math.floor(view.length * 0.5),
      stat: (hood, code2) => {
        const flags = hood.join("").toString(2);
        const stats = parseInt(flags, 2);
        return code2[stats];
      }
    }, data);
    const code = parseRule(papa.rule);
    const step2 = (v, i, view) => {
      const hood = papa.ends.map((span2) => {
        const site = myMod(span2 + i, view.length);
        return view[site];
      });
      return papa.stat(hood, code, v);
    };
    let grid2 = new Uint8Array(papa.size);
    let next = papa.seed;
    return () => {
      grid2 = grid2.map(next);
      next = step2;
      return grid2;
    };
  };
  var main_default = otto;

  // ../main.js
  var mySum = (a, b) => a + b;
  var mooreEnds = (n) => [-1, 1, -n, n, -1 - n, 1 - n, -1 + n, 1 + n];
  var life = (from) => {
    const size = from && from.size || 1;
    const grid2 = { size: size * size };
    const data = Object.assign({
      ends: mooreEnds(size),
      seed: () => Math.floor(Math.random() * 2) % 2,
      stat: (hood, _, flag) => {
        const stats = hood.reduce(mySum);
        if (flag && (stats <= 1 || stats >= 4)) {
          return 0;
        }
        if (!flag && stats === 3) {
          return 1;
        }
        return flag;
      }
    }, from, grid2);
    return main_default(data);
  };
  var main_default2 = life;

  // index.js
  if (window !== window.top) {
    document.documentElement.classList.add("is-iframe");
  }
  var plot = document.querySelector("canvas").getContext("2d");
  var { width: w } = plot.canvas;
  var step = 20;
  var seed = { size: w / step };
  var cell = document.createElement("canvas").getContext("2d");
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
  cell.strokeStyle = "white";
  cell.stroke();
  var mark = plot.createPattern(cell.canvas, "repeat");
  var beat = -1;
  var grid = main_default2(seed);
  var tick = (fn) => window.requestAnimationFrame(fn);
  var draw = () => {
    if (beat % 5 === 0) {
      const data = grid();
      for (let i = 0, stop = data.length; i < stop; i += 1) {
        const s = i * step;
        const x = s % w;
        const y = step * Math.floor(s / w);
        plot.fillStyle = data[i] ? "#000" : mark;
        plot.fillRect(x, y, step, step);
      }
    }
    beat = tick(draw);
  };
  document.addEventListener("click", () => {
    grid = main_default2(seed);
  });
  window.addEventListener("load", () => {
    beat = tick(draw);
  });
})();
