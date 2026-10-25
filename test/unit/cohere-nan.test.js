const test = require('node:test');
const { strictEqual, deepStrictEqual } = require('node:assert');

const serialize = require('../..');

test('default serialization retains NaN as a JavaScript number', function () {
    strictEqual(serialize(NaN), 'NaN');
    strictEqual(serialize({ value: NaN }), '{"value":NaN}');
    strictEqual(serialize([NaN]), '[NaN]');

    const restored = eval('(' + serialize({ value: NaN, nested: [NaN] }) + ')');
    strictEqual(Number.isNaN(restored.value), true);
    strictEqual(Number.isNaN(restored.nested[0]), true);

    // Explicit JSON mode keeps JSON.stringify's null representation.
    deepStrictEqual(serialize({ value: NaN }, { isJSON: true }), '{"value":null}');
});
