'use strict'

const test = require('tape')
const life = require('./')()

test('will default', (t) => {
  const grid = life()

  t.ok(grid.length, `grid size is ${grid.length}`)
  t.end()
})
