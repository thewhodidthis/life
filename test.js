'use strict'

const test = require('tape')
const Otto = require('./')

test('will fake new and default', (t) => {
  const otto = Otto()
  const grid = otto()
  const mock = new Otto()()

  t.ok(grid.length, `grid size is ${grid.length} `)
  t.ok(mock.length, `mock size is ${mock.length} `)
  t.equals(grid.length, mock.length, 'grid size === mock size')
  t.end()
})
