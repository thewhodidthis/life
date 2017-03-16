const test = require('tape');
const Otto = require('../');

test('will default', (t) => {
  const otto = Otto();
  const grid = otto();

  t.ok(grid.length);
  t.end();
});

