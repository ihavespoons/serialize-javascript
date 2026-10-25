const { describe, it } = require('node:test');
const { strictEqual } = require('node:assert');
const serialize = require('../../');

describe('NaN serialization', function () {
    it('round trips NaN alongside Infinity and zero', function () {
        const obj = { nan: NaN, inf: Infinity, zero: 0 };
        const restored = eval('(' + serialize(obj) + ')');
        strictEqual(Number.isNaN(restored.nan), true);
        strictEqual(restored.inf, Infinity);
        strictEqual(restored.zero, 0);
    });
});
