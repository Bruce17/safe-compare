var safeCompare = require('../safe-compare-hashes');
var pkg = require('../package.json');

// Set some benachmark default settings.
set('iterations', pkg.benchmark.iterations);

suite('safe compare - alternative with hash (equal)', function () {
    var equal = {
        strOne: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
        strTwo: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
    };

    bench('normal compare', function () {
        equal.strOne === equal.strTwo;
    });

    bench('safe compare', function () {
        safeCompare(equal.strOne, equal.strTwo);
    });

    bench('normal compare (parameters switched)', function () {
        equal.strTwo === equal.strOne;
    });

    bench('safe compare (parameters switched)', function () {
        safeCompare(equal.strTwo, equal.strOne);
    });
});

suite('safe compare - alternative with hash (not equal)', function () {
    var notEqual = {
        strOne: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
        strTwo: 'f6a38f96511ff15cad471549b9a6ed62dc63c030bfe979dda3ca5588a1c9a5a1'
    };

    bench('normal compare', function () {
        notEqual.strOne === notEqual.strTwo;
    });

    bench('safe compare', function () {
        safeCompare(notEqual.strOne, notEqual.strTwo);
    });

    bench('normal compare (parameters switched)', function () {
        notEqual.strTwo === notEqual.strOne;
    });

    bench('safe compare (parameters switched)', function () {
        safeCompare(notEqual.strTwo, notEqual.strOne);
    });
});

suite('safe compare - alternative with hash (not equal, different length)', function () {
    var notEqual = {
        strOne: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
        strTwo: 'f6a38f96511ff15cad471549b9a6ed62'
    };

    bench('normal compare', function () {
        notEqual.strOne === notEqual.strTwo;
    });

    bench('safe compare', function () {
        safeCompare(notEqual.strOne, notEqual.strTwo);
    });

    bench('normal compare (parameters switched)', function () {
        notEqual.strTwo === notEqual.strOne;
    });

    bench('safe compare (parameters switched)', function () {
        safeCompare(notEqual.strTwo, notEqual.strOne);
    });
});
