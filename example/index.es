import life from '../index.mjs'

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const plot = document.querySelector('canvas').getContext('2d')
const { width: w } = plot.canvas

const cellSize = 20
const gridSize = w / cellSize

const cell = document.createElement('canvas').getContext('2d')

cell.canvas.width = cell.canvas.height = cellSize

const edge = 5
const span = cellSize - edge

cell.strokeStyle = 'white'

cell.fillRect(0, 0, cellSize, cellSize)
cell.beginPath()
cell.moveTo(edge, edge)
cell.lineTo(span, span)
cell.moveTo(span, edge)
cell.lineTo(edge, span)
cell.stroke()

const mark = plot.createPattern(cell.canvas, 'repeat')

let beat = -1
let grid = life({ size: gridSize })

const tick = fn => window.requestAnimationFrame(fn)
const draw = () => {
  if (beat % 5 === 0) {
    const data = grid()

    for (let i = 0, stop = data.length; i < stop; i += 1) {
      const step = i * cellSize

      const x = step % w
      const y = cellSize * Math.floor(step / w)

      plot.fillStyle = data[i] ? '#000' : mark
      plot.fillRect(x, y, cellSize, cellSize)
    }
  }

  beat = tick(draw)
}

document.addEventListener('click', () => {
  grid = life({ size: gridSize })
})

window.addEventListener('load', () => {
  beat = tick(draw)
})
