var safeCompare = require('../src/index');
var assert      = require('assert');

describe('safe compare', function () {
    describe('should equal', function () {
        it('"foo" against "foo"', function () {
            assert.strictEqual(true, safeCompare('foo', 'foo'));
        });

        it('"hello world" against "hello world"', function () {
            assert.strictEqual(true, safeCompare('hello world', 'hello world'));
        });

        it('"你好，世界" against "你好，世界"', function () {
            assert.strictEqual(true, safeCompare('你好，世界', '你好，世界'));
        });

        it('"สวัสดีชาวโลก" against "สวัสดีชาวโลก"', function () {
            assert.strictEqual(true, safeCompare('สวัสดีชาวโลก', 'สวัสดีชาวโลก'));
        });

        it('"\\u00e8" against "\\u00e8"', function () {
            assert.strictEqual(true, safeCompare('\u00e8', '\u00e8'));
        });

        it('"\\u01e8" against "\\u01e8"', function () {
            assert.strictEqual(true, safeCompare('\u01e8', '\u01e8'));
        });
    });

    describe('should not equal', function () {
        it('"foo" against "bar"', function () {
            assert.strictEqual(false, safeCompare('foo', 'bar'));
        });

        it('"hello world" against "not hello world"', function () {
            assert.strictEqual(false, safeCompare('hello world', 'not hello world'));
        });

        it('"你好，世界" against "您好"', function () {
            assert.strictEqual(false, safeCompare('你好，世界', '您好'));
        });

        it('"สวัสดีชาวโลก" against "สวัสดี"', function () {
            assert.strictEqual(false, safeCompare('สวัสดีชาวโลก', 'สวัสดี'));
        });

        it('"\\u00e8" against "\\u01e8"', function () {
            assert.strictEqual(false, safeCompare('\u00e8', '\u01e8'));
        });

        it('"a" against "aaaaaaaaaa"', function () {
            assert.strictEqual(false, safeCompare('a', 'aaaaaaaaaa'));
        });

        it('"prefix" against "pre"', function () {
            assert.strictEqual(false, safeCompare('prefix', 'pre'));
        });

        it('"pre" against "prefix"', function () {
            assert.strictEqual(false, safeCompare('pre', 'prefix'));
        });
    });

    describe('should not throw an error for non string argument', function () {
        var testData = [
            undefined,
            void 0,
            null,
            true,
            false,
            {},
            [],
            42,
            NaN
        ];

        testData.forEach(function (data) {
            var itemContent = data;
            var itemType    = (data instanceof Array ? 'array' : typeof data);

            if (itemType === 'array') {
                itemContent = '[' + data.join(', ') + ']';
            }

            it('"' + itemContent + '" (type "' + itemType + '")', function () {
                // Test the first argument position.
                safeCompare(data, '');

                // Test the second argument position.
                safeCompare('', data);
            });
        });
    });
});
