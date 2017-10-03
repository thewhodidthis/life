'use strict'

const test = require('tape')
const life = require('./')()

test('will default', (t) => {
  const { length } = life()

  t.ok(length, `grid size is ${length}`)
  t.end()
})
