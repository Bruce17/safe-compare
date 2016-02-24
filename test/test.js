var safeCompare = require('../index');
var assert      = require('assert');

describe('safe compare', function () {
    describe('equal', function () {
        it('"foo" against "foo"', function () {
            assert.equal(true, safeCompare('foo', 'foo'));
        });

        it('"hello world" against "hello world"', function () {
            assert.equal(true, safeCompare('hello world', 'hello world'));
        });

        it('"?????" against "?????"', function () {
            assert.equal(true, safeCompare('?????', '?????'));
        });

        it('"????????????" against "????????????"', function () {
            assert.equal(true, safeCompare('????????????', '????????????'));
        });
    });

    describe('not equal', function () {
        it('"foo" against "bar"', function () {
            assert.equal(false, safeCompare('foo', 'bar'));
        });

        it('"hello world" against "not hello world"', function () {
            assert.equal(false, safeCompare('hello world', 'not hello world'));
        });

        it('"?????" against "??"', function () {
            assert.equal(false, safeCompare('?????', '??'));
        });

        it('"????????????" against "??????"', function () {
            assert.equal(false, safeCompare('????????????', '??????'));
        });
    });
});
