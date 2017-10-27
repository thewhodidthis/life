'use strict'

const { ok } = require('tapeless')
const life = require('./')()

const { length } = life()

ok(length, `grid size is ${length}`, 'will default')
