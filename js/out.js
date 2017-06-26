/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tlomini.png";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(11)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/resolve-url-loader/index.js!../node_modules/sass-loader/lib/loader.js?sourceMap!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/resolve-url-loader/index.js!../node_modules/sass-loader/lib/loader.js?sourceMap!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(2)
var ieee754 = __webpack_require__(9)
var isArray = __webpack_require__(10)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box;\n  margin: 0 auto;\n  padding: 0 auto;\n}\n\nhtml {\n  font-size: 20px;\n}\n\nhtml,\nbody {\n  overflow-x: hidden;\n}\n\n.lato {\n  font-family: 'Lato', sans-serif;\n}\n\n.roboto_slab {\n  font-family: 'Roboto Slab', serif;\n}\n\n.container {\n  max-width: 1500px;\n  width: 100%;\n  margin: 0 auto;\n  overflow: hidden;\n  flex-wrap: wrap;\n}\n\n.nav {\n  width: 100%;\n  font-size: 2rem;\n  display: flex;\n  flex-direction: column;\n}\n\n@media (max-width: 640px) {\n  .nav {\n    margin: 0;\n  }\n}\n\n@media (max-width: 640px) {\n  .nav {\n    font-size: 1.5rem;\n  }\n}\n\n.nav .navbgr {\n  width: 100%;\n  top: 0;\n  left: 0;\n  z-index: 0;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  height: 320px;\n  overflow: hidden;\n}\n\n.nav .slide-unit {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n}\n\n.nav .slide-unit:nth-of-type(1) {\n  background-image: url(" + __webpack_require__(6) + ");\n  background-size: auto;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n@media (max-width: 640px) {\n  .nav .slide-unit:nth-of-type(1) {\n    background-size: cover;\n    background-image: url(" + __webpack_require__(0) + ");\n  }\n}\n\n.nav .slide-unit:nth-of-type(2) {\n  background-image: url(" + __webpack_require__(7) + ");\n  background-size: auto;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n@media (max-width: 640px) {\n  .nav .slide-unit:nth-of-type(2) {\n    background-size: cover;\n    background-image: url(" + __webpack_require__(0) + ");\n  }\n}\n\n.nav .slide-unit:nth-of-type(3) {\n  background-image: url(" + __webpack_require__(8) + ");\n  background-size: auto;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n@media (max-width: 640px) {\n  .nav .slide-unit:nth-of-type(3) {\n    background-size: cover;\n    background-image: url(" + __webpack_require__(0) + ");\n  }\n}\n\n.nav .active {\n  opacity: 1;\n  z-index: 2;\n}\n\n.titleholder {\n  position: relative;\n  z-index: 5;\n  align-self: flex-start;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-family: \"Roboto\", sans-serif;\n  text-transform: uppercase;\n  padding: 10px;\n  margin-top: 3rem;\n  margin-left: 4rem;\n  letter-spacing: 2px;\n}\n\n.titlebackground {\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #b3b3b3;\n  opacity: 0.3;\n}\n\n.circleholder {\n  display: flex;\n  height: 100px;\n  width: 100px;\n  justify-content: center;\n  align-items: flex-end;\n  z-index: 5 !important;\n  position: relative;\n  top: 2.5rem;\n}\n\n@media (max-width: 640px) {\n  .circleholder {\n    display: none;\n  }\n}\n\n.circle {\n  border-radius: 50%;\n  border: 3px solid #b3b3b3;\n  width: 20%;\n  height: 20%;\n  background-color: #d2d2d2;\n  margin-bottom: 20px;\n  z-index: 5 !important;\n}\n\n.headersection {\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n  background-color: #d2d2d2;\n}\n\n@media (max-width: 640px) {\n  .headersection {\n    display: table;\n  }\n}\n\n.headerholder {\n  display: flex;\n}\n\n.header {\n  text-align: center;\n  width: 50%;\n  padding: 20px;\n  background-color: #d2d2d2;\n  align-items: flex-end;\n}\n\n@media (max-width: 640px) {\n  .header {\n    width: 100%;\n  }\n}\n\n@media (max-width: 640px) {\n  #sec {\n    display: none;\n  }\n}\n\n@media (min-width: 640px) {\n  #hide {\n    display: none;\n  }\n}\n\n.sectionmain {\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n  background-color: #d2d2d2;\n}\n\n@media (max-width: 640px) {\n  .sectionmain {\n    display: table;\n  }\n}\n\n.sectiontable {\n  display: flex;\n  width: 50%;\n  background-color: #d2d2d2;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.sectiontable table {\n  border-collapse: collapse;\n  margin-bottom: 10px;\n}\n\n.sectiontablethead,\n.sectiontable th,\n.sectiontable td,\n.sectiontable tr {\n  padding: 8px;\n}\n\n.sectiontable td {\n  font-size: 0.7rem;\n}\n\n.sectiontable thead {\n  color: white;\n  background-color: #ab92e1;\n  border-bottom: 3px solid #523d80;\n  font-size: 0.9rem;\n  padding: 8px;\n}\n\n.sectiontable th {\n  font-weight: normal;\n}\n\n.sectiontable tr {\n  border-bottom: 1px dashed #ab92e1;\n}\n\n.sectiontable tbody {\n  background-color: white;\n}\n\n@media (max-width: 640px) {\n  .sectiontable {\n    width: 100%;\n    margin-right: 0px;\n  }\n}\n\n.sectioncalc {\n  width: 50%;\n  display: flex;\n  background-color: #d2d2d2;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n@media (max-width: 640px) {\n  .sectioncalc {\n    width: 100%;\n    margin-left: 0px;\n  }\n}\n\n.twocolholder {\n  display: flex;\n  margin: 0 0 0 0;\n  flex-direction: row;\n  padding-left: 10px;\n  padding-right: 10px;\n  box-sizing: border-box;\n}\n\n@media (max-width: 640px) {\n  .twocolholder {\n    width: 100%;\n  }\n}\n\n.inputholder {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n}\n\n.inputholder input {\n  width: 50%;\n  cursor: pointer;\n  text-align: center;\n}\n\n.inputfirst {\n  width: 100%;\n  margin-bottom: 20px;\n  display: flex;\n}\n\n.inputlabel {\n  color: white;\n  background-color: #ab92e1;\n  border-bottom: 3px solid #523d80;\n  width: 50%;\n  padding: 8px;\n  text-align: center;\n}\n\n.inputlabel label {\n  font-size: 0.9rem;\n}\n\n.inputsecond {\n  display: flex;\n  width: 100%;\n  margin-top: 10px;\n  margin-top: 10px;\n}\n\n.inputsecond label {\n  color: white;\n  background-color: #ab92e1;\n  border-bottom: 3px solid #523d80;\n  padding: 8px;\n  width: 100%;\n  text-align: center;\n  font-size: 0.9rem;\n}\n\ninput:focus {\n  outline-color: #d2d2d2;\n}\n\n.inputholder select {\n  font-size: 0.8rem;\n  width: 100%;\n  cursor: pointer;\n  overflow-y: auto;\n}\n\nselect:focus {\n  outline-color: #d2d2d2;\n}\n\noption {\n  padding: 3px;\n  font-size: 0.7rem;\n}\n\noption:hover {\n  background-color: #ab92e1;\n  color: #d2d2d2;\n}\n\n.selectholder {\n  padding-left: 0;\n  width: 50%;\n}\n\n.responseholder {\n  width: 50%;\n  display: flex;\n  flex-direction: column;\n  padding-right: 10px;\n  padding-left: 10px;\n  font-size: 0.7rem;\n  box-sizing: border-box;\n  margin: 0 0 0 0;\n}\n\n.tip {\n  display: flex;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  padding: 10px;\n  box-sizing: border-box;\n  line-height: 30px;\n  font-size: 0.9rem;\n  text-align: center;\n  width: 100%;\n}\n\n@media (max-width: 1030px) {\n  .tip {\n    flex-direction: column;\n    font-size: 0.8rem;\n  }\n}\n\n#brdr {\n  background-color: #523d80;\n  height: 3px;\n  width: 50%;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\n@media (max-width: 640px) {\n  .hint {\n    font-size: 0.6rem;\n  }\n}\n\n.btnholder {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\nbutton {\n  background-color: #f5bb30;\n  border: 1px solid #f5bb30;\n  font-weight: bold;\n  padding: 5px 15px 5px 15px;\n  cursor: pointer;\n  font-size: 0.8rem;\n  outline-color: #f5bb30;\n}\n\n.footer {\n  font-size: 0.6rem;\n  text-align: center;\n  align-items: center;\n  justify-content: center;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL29sYS9LVVJTL3Byb2pla3Qga29uY293eSB3ZXJzamFfZ2l0aHViL3Nhc3MvbWFpbi5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIip7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiAwIGF1dG87XG59XG5odG1se1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbmh0bWwsYm9keVxue1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbn1cblxuJGdyZXlCYWNrZ3JvdW5kOiAjZDJkMmQyO1xuJGxpZ2h0VmlvbGV0OiAjYWI5MmUxO1xuJGRhcmtWaW9sZXQ6ICM1MjNkODA7XG4keWVsbG93QnRuOiAjZjViYjMwO1xuXG5cbkBtaXhpbiB2aW9sZXRze1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICRsaWdodFZpb2xldDtcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICRkYXJrVmlvbGV0O1xufVxuXG5cbkBtaXhpbiBtZWRpYXtcbiAgQG1lZGlhKG1heC13aWR0aDogNjQwcHgpe1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4ubGF0b3tcbiAgZm9udC1mYW1pbHk6ICdMYXRvJywgc2Fucy1zZXJpZjtcbn1cblxuLnJvYm90b19zbGFie1xuICBmb250LWZhbWlseTogJ1JvYm90byBTbGFiJywgc2VyaWY7XG59XG5cbi5jb250YWluZXJ7XG4gIG1heC13aWR0aDogMTUwMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgICB9XG5cbiAgLm5hdntcbiAgICBAaW5jbHVkZSBtZWRpYTtcbiAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICB9XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC1zaXplOiAycmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgIC5uYXZiZ3J7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgei1pbmRleDogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogMzIwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gICAgLnNsaWRlLXVuaXR7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIH1cbiAgICAgIC5zbGlkZS11bml0Om50aC1vZi10eXBlKDEpe1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi9pbWcvc2xpZGUxLnBuZ1wiKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBhdXRvO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICAgIEBtZWRpYShtYXgtd2lkdGg6IDY0MHB4KXtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uL2ltZy90bG9taW5pLnBuZ1wiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAuc2xpZGUtdW5pdDpudGgtb2YtdHlwZSgyKXtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vaW1nL3NsaWRlMi5wbmdcIik7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogYXV0bztcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgICAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi9pbWcvdGxvbWluaS5wbmdcIilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLnNsaWRlLXVuaXQ6bnRoLW9mLXR5cGUoMyl7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uL2ltZy9zbGlkZTMucG5nXCIpO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGF1dG87XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgQG1lZGlhKG1heC13aWR0aDogNjQwcHgpe1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vaW1nL3Rsb21pbmkucG5nXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAuYWN0aXZle1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgfVxuICAgIH1cbiAgICAudGl0bGVob2xkZXJ7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB6LWluZGV4OiA1O1xuICAgICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIiwgc2Fucy1zZXJpZjtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgbWFyZ2luLXRvcDogM3JlbTtcbiAgICAgIG1hcmdpbi1sZWZ0OiA0cmVtO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbiAgICB9XG4gICAgLnRpdGxlYmFja2dyb3VuZHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHotaW5kZXg6IC0xO1xuICAgICAgdG9wOiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2IzYjNiMztcbiAgICAgIG9wYWNpdHk6IDAuMztcbiAgICB9XG4gICAgLmNpcmNsZWhvbGRlcntcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICB6LWluZGV4OiA1ICFpbXBvcnRhbnQ7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0b3A6IDIuNXJlbTtcbiAgICAgIEBtZWRpYShtYXgtd2lkdGg6IDY0MHB4KXtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmNpcmNsZXtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJvcmRlcjogM3B4IHNvbGlkICNiM2IzYjM7XG4gICAgICB3aWR0aDogMjAlO1xuICAgICAgaGVpZ2h0OiAyMCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJkMmQyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIHotaW5kZXg6IDUgIWltcG9ydGFudDtcbiAgICB9XG5cblxuICAuaGVhZGVyc2VjdGlvbntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRncmV5QmFja2dyb3VuZDtcbiAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG4gIH1cbiAgLmhlYWRlcmhvbGRlcntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG4gIC5oZWFkZXJ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiA1MCU7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JleUJhY2tncm91bmQ7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgIEBtZWRpYShtYXgtd2lkdGg6IDY0MHB4KXtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgfVxuICAjc2Vje1xuICAgIEBtZWRpYShtYXgtd2lkdGg6IDY0MHB4KXtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG4gICNoaWRle1xuICAgIEBtZWRpYShtaW4td2lkdGg6IDY0MHB4KXtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG4gIC5zZWN0aW9ubWFpbntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRncmV5QmFja2dyb3VuZDtcbiAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG4gIH1cbiAgLnNlY3Rpb250YWJsZXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiA1MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZXlCYWNrZ3JvdW5kO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgdGFibGV7XG4gICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICB9XG4gICAgJnRoZWFkLCB0aCwgdGQsIHRye1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgIH1cbiAgICB0ZHtcbiAgICAgIGZvbnQtc2l6ZTogMC43cmVtO1xuICAgIH1cbiAgICB0aGVhZHtcbiAgICAgIEBpbmNsdWRlIHZpb2xldHM7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICB9XG4gICAgdGh7XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIH1cbiAgICB0cntcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgJGxpZ2h0VmlvbGV0O1xuICAgIH1cbiAgICB0Ym9keXtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi1yaWdodDogMHB4O1xuICAgIH1cbiAgfVxuICAuc2VjdGlvbmNhbGN7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRncmV5QmFja2dyb3VuZDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG4gICAgfVxuICB9XG4gIC50d29jb2xob2xkZXJ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW46IDAgMCAwIDA7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIEBtZWRpYShtYXgtd2lkdGg6IDY0MHB4KXtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgfVxuICAuaW5wdXRob2xkZXJ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cbiAgLmlucHV0aG9sZGVyIGlucHV0e1xuICAgIHdpZHRoOiA1MCU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuICAuaW5wdXRmaXJzdHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cbiAgLmlucHV0bGFiZWx7XG4gICAgQGluY2x1ZGUgdmlvbGV0cztcbiAgICB3aWR0aDogNTAlO1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbGFiZWx7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICB9XG4gIH1cbiAgLmlucHV0c2Vjb25ke1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBsYWJlbHtcbiAgICAgIEBpbmNsdWRlIHZpb2xldHM7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIH1cbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICB9XG4gIGlucHV0OmZvY3Vze1xuICAgICAgb3V0bGluZS1jb2xvcjogJGdyZXlCYWNrZ3JvdW5kO1xuICAgIH1cbiAgLmlucHV0aG9sZGVyIHNlbGVjdHtcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgfVxuICBzZWxlY3Q6Zm9jdXN7XG4gICAgb3V0bGluZS1jb2xvcjogJGdyZXlCYWNrZ3JvdW5kO1xuICB9XG4gIG9wdGlvbntcbiAgICBwYWRkaW5nOiAzcHg7XG4gICAgZm9udC1zaXplOiAwLjdyZW07XG4gIH1cbiAgb3B0aW9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvciA6ICRsaWdodFZpb2xldDtcbiAgY29sb3I6ICRncmV5QmFja2dyb3VuZDtcbiAgfVxuICAuc2VsZWN0aG9sZGVye1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICB3aWR0aDogNTAlO1xuICB9XG4gIC5yZXNwb25zZWhvbGRlcntcbiAgICB3aWR0aDogNTAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBmb250LXNpemU6IDAuN3JlbTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMCAwIDAgMDtcbiAgfVxuICAudGlwe1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIEBtZWRpYShtYXgtd2lkdGg6IDEwMzBweCl7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgfVxuICB9XG4gICNicmRye1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkYXJrVmlvbGV0O1xuICAgIGhlaWdodDogM3B4O1xuICAgIHdpZHRoOiA1MCU7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgfVxuICAuaGludHtcbiAgICBAbWVkaWEobWF4LXdpZHRoOiA2NDBweCl7XG4gICAgICBmb250LXNpemU6IDAuNnJlbTtcbiAgICB9XG4gIH1cbiAgLmJ0bmhvbGRlcntcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgfVxuICBidXR0b257XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHllbGxvd0J0bjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkeWVsbG93QnRuO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHBhZGRpbmc6IDVweCAxNXB4IDVweCAxNXB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICBvdXRsaW5lLWNvbG9yOiAkeWVsbG93QnRuO1xuICB9XG4uZm9vdGVye1xuICBmb250LXNpemU6IDAuNnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUFBLENBQUMsQ0FBQTtFQUNDLFVBQVUsRUFBRSxVQUFVO0VBQ3RCLE1BQU0sRUFBRSxNQUFNO0VBQ2QsT0FBTyxFQUFFLE1BQU0sR0FDaEI7O0FBQ0QsQUFBQSxJQUFJLENBQUE7RUFDRixTQUFTLEVBQUUsSUFBSSxHQUNoQjs7QUFFRCxBQUFBLElBQUksRUFBQyxBQUFBLElBQUksQ0FDVDtFQUNJLFVBQVUsRUFBRSxNQUFNLEdBQ3JCOztBQXFCRCxBQUFBLEtBQUssQ0FBQTtFQUNILFdBQVcsRUFBRSxrQkFBa0IsR0FDaEM7O0FBRUQsQUFBQSxZQUFZLENBQUE7RUFDVixXQUFXLEVBQUUsb0JBQW9CLEdBQ2xDOztBQUVELEFBQUEsVUFBVSxDQUFBO0VBQ1IsU0FBUyxFQUFFLE1BQU07RUFDakIsS0FBSyxFQUFFLElBQUk7RUFDWCxNQUFNLEVB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 */", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).Buffer))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/slide1.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/slide2.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/slide3.png";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_main_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sass_main_scss__);

document.addEventListener("DOMContentLoaded", function() {

  //getting slides
  var slides = document.querySelectorAll(".navbgr .slide-unit")
  //counter
  var currentSlide = 0;
  //turning slider on
  var slider = setInterval(nextSlide, 1500);

  function nextSlide(){
    changeSlide(currentSlide+1);
  }

  function previousSlide() {
    changeSlide(currentSlide-1);
  }

  function changeSlide(x){
    //hiding first slide
    slides[currentSlide].className = "slide-unit";
    //adding one to counter and using modulo to cycle back to zero
    //e.g: (1+3)%3 =1; (2+3)%3 = 2, (3+3)%3 =0
    currentSlide = (x+slides.length)%slides.length;
    slides[currentSlide].className = "slide-unit active";
  }

  var sliderOn = true;
  var img_pause = document.querySelector(".circleholder div:nth-child(2)");

  function pause(){
    sliderOn = false;
    clearInterval(slider)
  }
  function play(){
    sliderOn = true;
    slider = setInterval(nextSlide, 1500);
  }

  img_pause.addEventListener("click", function(){
    if(sliderOn){
      pause();
    } else{
      play();
    }
  })

  var img_previous = document.querySelector(".circleholder div:first-child");
  var img_next = document.querySelector(".circleholder div:nth-child(3)");

  img_previous.addEventListener("click", function(){
    pause();
    nextSlide();
  })

  img_next.addEventListener("click", function(){
    pause();
    previousSlide();
  })

  var helper = document.getElementById("helper");


  helper.addEventListener("click", function(event){
    var eggVal = document.getElementById("inputEggs").value
    var productToConvTo = document.getElementById("replacer").value
    var result = document.getElementById("result")
    var tip=document.querySelectorAll(".tip");

    if (eggVal>0){
      var val=eggVal;
      var toConvert = parseFloat(val);
      var hint="";
      var banan = "Podaną ilość bananów należy zmiksować na puree. Nadają lekko wyczuwalny posmak"
      var jablko = "Polecane szczególnie do wilgotnych i puszystych ciast"
      var siemie = "Świeżo zmielone siemię zmieszać z wodą. Nadaje lekko orzechowy posmak"
      var sTofu = "Podaną ilość zmiksować lub rozgnieść widelcem"
      var chia = "Zmieszać chia z wodą w podanych proporcjach i odczekać, aż nabiorą żelowej konsystencji"
      var tahi = "Daje mocno wyczuwalny smak."
      var dynia = "Dobrze komponuje się z korzennymi przyprawami"

      switch(productToConvTo){
        case "banana": result = `${toConvert} (w sztukach)`; hint =banan;
        break;
        case "applesauce": result=`${toConvert*0.5} (w szklankach)`; hint=jablko;
        break;
        case "flaxseed": result=`${toConvert*1.5} (w łyżkach) + woda (w łyżkach): ${(toConvert*1.5)*3}`; hint=siemie;
        break;
        case "pumpkin": result=`${toConvert*0.5} (w szklankach)`; hint=dynia;
        break;
        case "potatoFlour": result=`${toConvert*2} (w łyżkach) + woda (w łyżkach: ${(toConvert*2)*3})`;
        break;
        case "silkenTofu": result=`${toConvert*0.5} (w szklankach)`; hint=sTofu;
        break;
        case "soyYoghurt": result=`${toConvert*0.5} (w szklankach)`;
        break;
        case "chia": result=`${toConvert}(w łyżkach) + woda (w łyżkach: ${(toConvert*3)})`; hint=chia;
        break;
        case "tahini": result=`${toConvert*3} (w łyżkach)`; hint=tahi;
        break;
        case "cornstarch": result=`${toConvert*2} + woda (w łyżkach: ${(toConvert*3)})`;
      }
      }
      else if((eggVal<=0) || (eggVal = NaN)){
        result = "Podaj prawidłową wartość";
        hint = " ";
      }

      document.getElementById("result").innerText = result;
      document.getElementById("hint").innerText = hint;



    })

  })


/***/ })
/******/ ]);