import life from '../index.mjs'

const plot = document.querySelector('canvas').getContext('2d')
const { width: w, height: h } = plot.canvas

const size = 10
const grid = life({ size: w / size })

// Draw gridlines
const guides = plot.canvas.cloneNode().getContext('2d')

for (let i = 0; i < w; i += 10) {
  const x = i - 0.5

  guides.moveTo(x, 0)
  guides.lineTo(x, h)
}

for (let i = 0; i < h; i += 10) {
  const y = i - 0.5

  guides.moveTo(0, y)
  guides.lineTo(w, y)
}

guides.fillStyle = 'transparent'
guides.fillRect(0, 0, w, h)
guides.strokeStyle = '#ddd'
guides.stroke()

let frames = -1

const tick = fn => window.requestAnimationFrame(fn)
const stop = id => window.cancelAnimationFrame(id)

const draw = () => {
  if (frames % 15 === 0) {
    const data = grid()

    for (let i = 0, total = data.length; i < total; i += 1) {
      const step = i * size

      const x = step % w
      const y = size * Math.floor(step / w)

      if (data[i]) {
        plot.fillStyle = '#000'
      } else {
        plot.fillStyle = '#eee'
      }

      plot.fillRect(x, y, size, size)
    }

    plot.drawImage(guides.canvas, 0, 0)
  }

  frames = tick(draw)
}

if (window !== window.top) {
  document.documentElement.className += ' is-iframe'
}

document.addEventListener('click', () => {
  frames = frames ? stop(frames) : tick(draw)
})

window.addEventListener('load', () => {
  frames = tick(draw)
})
