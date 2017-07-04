/**
 * Created by Michael on 04.07.2017.
 */

var safeCompare = require('../safe-compare-alternative-hashes');
var assert      = require('assert');

describe('safe compare (alternative implementation with hashes)', function () {
    describe('should equal', function () {
        it('"foo" against "foo"', function () {
            assert.equal(true, safeCompare('foo', 'foo'));
        });

        it('"hello world" against "hello world"', function () {
            assert.equal(true, safeCompare('hello world', 'hello world'));
        });

        it('"你好，世界" against "你好，世界"', function () {
            assert.equal(true, safeCompare('你好，世界', '你好，世界'));
        });

        it('"สวัสดีชาวโลก" against "สวัสดีชาวโลก"', function () {
            assert.equal(true, safeCompare('สวัสดีชาวโลก', 'สวัสดีชาวโลก'));
        });
    });

    describe('should not equal', function () {
        it('"foo" against "bar"', function () {
            assert.equal(false, safeCompare('foo', 'bar'));
        });

        it('"hello world" against "not hello world"', function () {
            assert.equal(false, safeCompare('hello world', 'not hello world'));
        });

        it('"你好，世界" against "您好"', function () {
            assert.equal(false, safeCompare('你好，世界', '您好'));
        });

        it('"สวัสดีชาวโลก" against "สวัสดี"', function () {
            assert.equal(false, safeCompare('สวัสดีชาวโลก', 'สวัสดี'));
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

