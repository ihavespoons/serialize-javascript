const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const serialize = require('../../index');

test('negative zero survives scalar and nested round trips', () => {
    const values = [-0, {value: -0}, [-0, 0]];
    for (const value of values) {
        const restored = vm.runInNewContext('(' + serialize(value) + ')');
        if (typeof value === 'number') {
            assert.ok(Object.is(restored, -0));
        } else if (Array.isArray(value)) {
            assert.ok(Object.is(restored[0], -0));
            assert.ok(Object.is(restored[1], 0));
        } else {
            assert.ok(Object.is(restored.value, -0));
        }
    }
});
