# safe-compare
Constant-time comparison algorithm to prevent Node.js timing attacks.

For more information about Node.js timing attacks, please visit https://snyk.io/blog/node-js-timing-attack-ccc-ctf/.

## Installation

```
$ npm install safe-compare --save
```


## Usage

```javascript
var safeCompare = require('safe-compare');

safeCompare('hello world', 'hello world'); // -> true

safeCompare('hello', 'not hello'); // -> false
safeCompare('hello foo', 'hello bar'); // -> false
```


## Tests

```
$ npm test
```


## What's the improvement of this package?

This Node.js module is a improvement of the two existing modules [scmp](https://github.com/freewil/scmp) and [secure-compare](https://github.com/vdemedes/secure-compare). It uses the best parts of both implementations.

The implementation of [scmp](https://github.com/freewil/scmp) is a good base, but it has a shorter execution time if the string's length is not equal. The package [secure-compare](https://github.com/vdemedes/secure-compare) always compares the two input strings, but its implementation is not as clean as in [scmp](https://github.com/freewil/scmp).


## License

safe-compare is released under the MIT license.
