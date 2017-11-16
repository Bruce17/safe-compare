/**
 * @author Michael Raith
 * @date   24.02.2016 12:04
 */

'use strict';

var crypto = require('crypto');
var bufferAlloc = require('buffer-alloc')


/**
 * Do a constant time string comparison. Always compare the complete strings
 * against each other to get a constant time. This method does not short-cut
 * if the two string's length differs.
 *
 * @param {string} a
 * @param {string} b
 * 
 * @return {boolean}
 */
var safeCompare = function safeCompare(a, b) {
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


/**
 * Call native "crypto.timingSafeEqual" methods.
 * All passed values will be converted into strings first.
 * 
 * @param {string} a
 * @param {string} b
 * 
 * @return {boolean}
 */
var nativeTimingSafeEqual = function nativeTimingSafeEqual(a, b) {
    var strA = String(a);
    var strB = String(b);
    
    var len = Math.max(strA.length, strB.length);
    
    var bufA = bufferAlloc(len, strA, 'binary');
    var bufB = bufferAlloc(len, strB, 'binary');
    
    return crypto.timingSafeEqual(bufA, bufB);
};


module.exports = (
    typeof crypto.timingSafeEqual !== 'undefined' ?
        nativeTimingSafeEqual :
        safeCompare
);
