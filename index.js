/**
 * @author Michael Raith
 * @date   24.02.2016 12:04
 */

'use strict';

var crypto = require('crypto');


/**
 * Call native "crypto.timingSafeEqual" methods.
 * All passed values will be converted into strings first.
 *
 * Runtime is always corresponding to the length of the first parameter (string
 * a).
 *
 * @param {string} a
 * @param {string} b
 *
 * @return {boolean}
 */
var nativeTimingSafeEqual = function nativeTimingSafeEqual(a, b) {
    var strA = String(a);
    var strB = String(b);
    var aLen = Buffer.byteLength(strA);
    var bLen = Buffer.byteLength(strB);

    // Always use length of a to avoid leaking the length. Even if this is a
    // false positive because one is a prefix of the other, the explicit length
    // check at the end will catch that.
    var bufA = Buffer.allocUnsafe(aLen);
    bufA.write(strA);
    var bufB = Buffer.allocUnsafe(aLen);
    bufB.write(strB);

    return crypto.timingSafeEqual(bufA, bufB) && aLen === bLen;
};


module.exports = nativeTimingSafeEqual;
