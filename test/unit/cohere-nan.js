const serialize = require('../../index.js');

const serialized = serialize({nan: NaN, inf: Infinity, zero: 0});
const restored = eval('(' + serialized + ')');
const actual = JSON.stringify({
  nan: Number.isNaN(restored.nan),
  infinity: restored.inf === Infinity,
  zero: restored.zero === 0,
});
const expected = JSON.stringify({nan: true, infinity: true, zero: true});
const passed = actual === expected;
console.log('COHERE_REPRO: ' + JSON.stringify({
  case: 'serialize and deserialize NaN alongside Infinity and zero',
  contract_quote: 'Serialize JavaScript to a _superset_ of JSON that includes regular expressions, dates and functions.',
  actual, expected, passed,
}));
process.exit(passed ? 0 : 1);
