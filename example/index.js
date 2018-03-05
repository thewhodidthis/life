import life from '../index.mjs'

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const plot = document.querySelector('canvas').getContext('2d')
const { width: w } = plot.canvas

const step = 20
const seed = { size: w / step }

const cell = document.createElement('canvas').getContext('2d')

const edge = 6
const span = step - edge

cell.canvas.width = cell.canvas.height = step

cell.fillRect(0, 0, step, step)
cell.beginPath()

cell.moveTo(edge, edge)
cell.lineTo(span, span)
cell.moveTo(span, edge)
cell.lineTo(edge, span)

cell.lineWidth = 2
cell.strokeStyle = 'white'
cell.stroke()

const mark = plot.createPattern(cell.canvas, 'repeat')

let beat = -1
let grid = life(seed)

const tick = fn => window.requestAnimationFrame(fn)
const draw = () => {
  if (beat % 5 === 0) {
    const data = grid()

    for (let i = 0, stop = data.length; i < stop; i += 1) {
      const s = i * step

      const x = s % w
      const y = step * Math.floor(s / w)

      plot.fillStyle = data[i] ? '#000' : mark
      plot.fillRect(x, y, step, step)
    }
  }

  beat = tick(draw)
}

document.addEventListener('click', () => {
  grid = life(seed)
})

window.addEventListener('load', () => {
  beat = tick(draw)
})
