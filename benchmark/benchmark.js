var safeCompare = require('../index');

suite('safe compare (equal)', function () {
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
});

suite('safe compare (not equal)', function () {
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
});

