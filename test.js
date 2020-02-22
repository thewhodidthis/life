'use strict'

const { ok } = require('tapeless')
const life = require('./')()

const { length } = life()

ok
  .describe(`grid size is ${length}`, 'will default')
  .test(length)
