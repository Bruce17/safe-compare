/**
 * Created by Michael on 04.07.2017.
 */

'use strict';

module.exports = function safeCompare(a, b) {
    var strA = String(a);
    var strB = String(b);
    var len = Math.max(strA.length, strB.length); // FIXME: May not be timing safe
    var result = 0;

    for (var i = 0; i < len; i++) {
        var posA = (i % strA.length);
        var posB = (i % strB.length);

        // Ensure the value are equals
        result |= (strA.charCodeAt(posA) ^ strB.charCodeAt(posB));

        // Ensure the positions are equals
        result |= (posA ^ posB);
    }

    return result === 0;
};
