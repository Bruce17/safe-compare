var safeCompare = require('../index');
var assert      = require('assert');

describe('safe compare', function () {
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

        it('"\\u00e8" against "\\u00e8"', function () {
            assert.equal(true, safeCompare('\u00e8', '\u00e8'));
        });

        it('"\\u01e8" against "\\u01e8"', function () {
            assert.equal(true, safeCompare('\u01e8', '\u01e8'));
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

        it('"\\u00e8" against "\\u01e8"', function () {
            assert.equal(false, safeCompare('\u00e8', '\u01e8'));
        });
        
        it('"a" against "aaaaaaaaaa"', function () {
            assert.equal(false, safeCompare('a', 'aaaaaaaaaa'));
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
