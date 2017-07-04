/**
 * Created by Michael on 04.07.2017.
 */

var crypto = require('crypto');

/**
 * Convert some string into a hash.
 *
 * @param {string} str
 *
 * @returns {string}
 */
var strToHash = function strToHash(str) {
    var hash = crypto.createHash('sha256');
    hash.update(String(str), 'utf8');
    return hash.digest('hex');
};

/**
 * Do a constant time string comparison. Always compare the complete strings against each other to get a constant time.
 * This method does not short-cut if the two string's length differs.
 *
 * @param {string} a
 * @param {string} b
 */
module.exports = function safeCompare(a, b) {
    var strA = String(a);
    var strB = String(b);
    var lenA = strA.length;
    var result = 0;

    if (lenA !== strB.length) {
        strB = strA;
        result = 1;
    }

    for (var i = 0; i < lenA; i++) {
        result |= (strA.charCodeAt(i) ^ strB.charCodeAt(i));
    }

    return result === 0;
};
