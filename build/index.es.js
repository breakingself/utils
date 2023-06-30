function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var _DURATION_DECIMAL_DIG;
var DEFAULT_NUMBER_FORMAT = 'number';
var DURATION_FORMATS_MAP = {
  H_MM: 'h:mm',
  H_MM_SS: 'h:mm:ss',
  H_MM_SS_S: 'h:mm:ss.s',
  H_MM_SS_SS: 'h:mm:ss.ss',
  H_MM_SS_SSS: 'h:mm:ss.sss'
};
var DURATION_FORMATS = [{
  name: DURATION_FORMATS_MAP.H_MM,
  type: DURATION_FORMATS_MAP.H_MM
}, {
  name: DURATION_FORMATS_MAP.H_MM_SS,
  type: DURATION_FORMATS_MAP.H_MM_SS
}];
var DURATION_DECIMAL_DIGITS = (_DURATION_DECIMAL_DIG = {}, _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM, 0), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS, 0), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS_S, 1), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS_SS, 2), _defineProperty(_DURATION_DECIMAL_DIG, DURATION_FORMATS_MAP.H_MM_SS_SSS, 3), _DURATION_DECIMAL_DIG);

var _DURATION_ZERO_DISPLA;
var DURATION_ZERO_DISPLAY = (_DURATION_ZERO_DISPLA = {}, _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM, '0:00'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS, '0:00'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS_S, '0:00.0'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS_SS, '0:00.00'), _defineProperty(_DURATION_ZERO_DISPLA, DURATION_FORMATS_MAP.H_MM_SS_SSS, '0:00.000'), _DURATION_ZERO_DISPLA);
var getMathRoundedDuration = function getMathRoundedDuration(num, duration_format) {
  var decimalDigits = DURATION_DECIMAL_DIGITS[duration_format];
  if (decimalDigits < 1) {
    return num;
  }
  var ratio = Math.pow(10, decimalDigits);
  return Math.round(num * ratio) / ratio;
};
var getDurationDecimalSuffix = function getDurationDecimalSuffix(duration_format, decimal) {
  if (duration_format === DURATION_FORMATS_MAP.H_MM_SS_S) {
    return decimal === 0 ? '.0' : '';
  }
  if (duration_format === DURATION_FORMATS_MAP.H_MM_SS_SS) {
    if (decimal === 0) {
      return '.00';
    }
    if (decimal < 10) {
      return '0';
    }
    return '';
  }
  if (duration_format === DURATION_FORMATS_MAP.H_MM_SS_SSS) {
    if (decimal === 0) {
      return '.000';
    }
    if (decimal < 10) {
      return '00';
    }
    if (decimal < 100) {
      return '0';
    }
  }
  return '';
};

/**
 * format duration to display
 * @param {number} duration
 * @param {object} formats { duration_format, ... }
 */
var getDurationDisplayString = function getDurationDisplayString(duration, formats) {
  if (!duration && duration !== 0) return '';
  var _ref = formats || {},
    duration_format = _ref.duration_format;
  duration_format = duration_format || DURATION_FORMATS_MAP.H_MM;
  if (DURATION_FORMATS.findIndex(function (format) {
    return format.type === duration_format;
  }) < 0) {
    return '';
  }
  if (duration === 0) {
    return DURATION_ZERO_DISPLAY[duration_format];
  }
  var includeDecimal = duration_format.indexOf('.') > -1;
  var positiveValue = Math.abs(duration);
  if (!includeDecimal) {
    positiveValue = Math.round(positiveValue);
  }
  positiveValue = getMathRoundedDuration(positiveValue, duration_format);
  var decimalParts = String(positiveValue).split('.');
  var decimalPartsLen = decimalParts.length;
  var decimal = 0;
  if (decimalPartsLen > 1) {
    decimal = decimalParts[decimalPartsLen - 1];
    decimal = decimal ? decimal - 0 : 0;
  }
  var decimalDigits = DURATION_DECIMAL_DIGITS[duration_format];
  var decimalSuffix = getDurationDecimalSuffix(duration_format, decimal);
  var hours = parseInt(positiveValue / 3600, 10);
  var minutes = parseInt((positiveValue - hours * 3600) / 60, 10);
  var displayString = duration < 0 ? '-' : '';
  if (duration_format === DURATION_FORMATS_MAP.H_MM) {
    displayString += "".concat(hours, ":").concat(minutes > 9 ? minutes : "0".concat(minutes));
    return displayString;
  }
  var seconds = Number.parseFloat((positiveValue - hours * 3600 - minutes * 60).toFixed(decimalDigits));
  minutes = minutes > 9 ? minutes : "0".concat(minutes);
  seconds = seconds > 9 ? seconds : "0".concat(seconds);
  displayString += "".concat(hours, ":").concat(minutes, ":").concat(seconds).concat(decimalSuffix);
  return displayString;
};

/**
 * get digits length of a number
 * @param {number} num Input number
 */
var digitLength = function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
};

/**
 * fix wrong data
 * e.g. strip(0.09999999999999998) = 0.1
 */
var strip = function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  return +parseFloat(Number(num).toPrecision(precision));
};

/**
 * convert decimal to integer.
 * Support scientific notation. If it is a decimal, it will be enlarged to an integer
 * @param {number|string} num
 */
var float2Fixed = function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
};

/**
 * exact multiplication
 */
var times = function times(numLeft, numRight) {
  var num1Changed = float2Fixed(numLeft);
  var num2Changed = float2Fixed(numRight);
  var baseNum = digitLength(numLeft) + digitLength(numRight);
  var leftValue = num1Changed * num2Changed;
  return leftValue / Math.pow(10, baseNum);
};

/**
 * exact subtraction
 */
var minus = function minus(numLeft, numRight) {
  var baseNum = Math.pow(10, Math.max(digitLength(numLeft), digitLength(numRight)));
  return (times(numLeft, baseNum) - times(numRight, baseNum)) / baseNum;
};

var separatorMap = {
  comma: ',',
  dot: '.',
  no: '',
  space: ' '
};

/**
 * removeZerosFromEnd('0.0100') // '0.01'
 * @param {string} sNumber string of numbers
 */
var removeZerosFromEnd = function removeZerosFromEnd(sNumber) {
  if (typeof sNumber !== 'string') return '';
  if (sNumber.endsWith('0')) {
    return sNumber.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
  }
  return sNumber;
};

/**
 * e.g. 1.23 // 2
 * @param {number} number
 * @returns digital length
 */
var getDecimalDigitsFromNumber = function getDecimalDigitsFromNumber(number) {
  if (Number.isInteger(number)) {
    return 0;
  }
  var decimalPart = String(number).split('.')[1];
  var digitsLength = decimalPart ? decimalPart.length : 8;
  return digitsLength > 8 ? 8 : digitsLength;
};
var toThousands = function toThousands(number, _ref) {
  var formats = _ref.formats,
    _ref$isCurrency = _ref.isCurrency,
    isCurrency = _ref$isCurrency === void 0 ? true : _ref$isCurrency;
  var _ref2 = formats || {},
    _ref2$decimal = _ref2.decimal,
    decimal = _ref2$decimal === void 0 ? 'dot' : _ref2$decimal,
    _ref2$thousands = _ref2.thousands,
    thousands = _ref2$thousands === void 0 ? 'no' : _ref2$thousands,
    _ref2$precision = _ref2.precision,
    precision = _ref2$precision === void 0 ? 2 : _ref2$precision,
    _ref2$enable_precisio = _ref2.enable_precision,
    enable_precision = _ref2$enable_precisio === void 0 ? false : _ref2$enable_precisio;

  // handle numbers in scientific notation
  if (String(number).includes('e')) {
    if (number < 1 && number > -1) {
      // 1.convert to non-scientific number
      var numericString = number.toFixed(enable_precision ? precision : 8);

      // 2.remove 0 from end of the number which not set precision. e.g. 0.100000
      if (!enable_precision) {
        numericString = removeZerosFromEnd(numericString);
      }

      // 3.remove minus from number which equal to 0. e.g. '-0.00'
      if (parseFloat(numericString) === 0) {
        return numericString.startsWith('-') ? numericString.substring(1) : numericString;
      }
      return numericString;
    }
    return number;
  }
  var decimalString = separatorMap[decimal];
  var thousandsString = separatorMap[thousands];
  var decimalDigits = enable_precision ? precision : getDecimalDigitsFromNumber(number);
  var floatNumber = parseFloat(number.toFixed(decimalDigits));
  var isMinus = floatNumber < 0;
  var integer = Math.trunc(floatNumber);

  // format decimal part
  var decimalPart = String(Math.abs(minus(floatNumber, integer)).toFixed(decimalDigits)).slice(1);
  if (!enable_precision) {
    decimalPart = removeZerosFromEnd(decimalPart);
  }
  if (isCurrency) {
    if (!enable_precision) {
      decimalPart = decimalPart.length === 2 ? decimalPart = decimalPart.padEnd(3, '0') : (decimalPart.substring(0, 3) || '.').padEnd(3, '0');
    }
  }
  decimalPart = decimalPart.replace(/./, decimalString);

  // format integer part
  var integerNumbers = [];
  var counter = 0;
  integer = Math.abs(integer).toString();
  for (var i = integer.length - 1; i > -1; i--) {
    counter += 1;
    integerNumbers.unshift(integer[i]);
    if (!(counter % 3) && i !== 0) {
      integerNumbers.unshift(thousandsString);
    }
  }
  return "".concat(isMinus ? '-' : '').concat(integerNumbers.join('')).concat(decimalPart);
};

/**
 * format number to display
 * @param {number} number e.g. 1, -2, 3.3
 * @param {object} formats { format, decimal, ... }
 */
var getNumberDisplayString = function getNumberDisplayString(number, formats) {
  var type = Object.prototype.toString.call(number);
  if (type !== '[object Number]') {
    // return formula internal errors directly.
    if (type === '[object String]' && number.startsWith('#')) {
      return number;
    }
    return '';
  }
  if (isNaN(number) || number === Infinity || number === -Infinity) return String(number);

  // formats: old version maybe 'null'
  var _ref3 = formats || {},
    _ref3$format = _ref3.format,
    format = _ref3$format === void 0 ? DEFAULT_NUMBER_FORMAT : _ref3$format;
  switch (format) {
    case 'number':
      {
        return toThousands(number, {
          formats: formats,
          isCurrency: false
        });
      }
    case 'percent':
      {
        return "".concat(toThousands(Number.parseFloat((number * 100).toFixed(8)), {
          formats: formats,
          isCurrency: false
        }), "%");
      }
    case 'yuan':
      {
        return "\uFFE5".concat(toThousands(number, {
          formats: formats
        }));
      }
    case 'dollar':
      {
        return "$".concat(toThousands(number, {
          formats: formats
        }));
      }
    case 'euro':
      {
        return "\u20AC".concat(toThousands(number, {
          formats: formats
        }));
      }
    case 'duration':
      {
        return getDurationDisplayString(number, formats);
      }
    case 'custom_currency':
      {
        if (formats.currency_symbol_position === 'after') {
          return "".concat(toThousands(number, {
            formats: formats
          })).concat(formats.currency_symbol || '');
        }
        return "".concat(formats.currency_symbol || '').concat(toThousands(number, {
          formats: formats
        }));
      }
    default:
      {
        return String(number);
      }
  }
};

export { DEFAULT_NUMBER_FORMAT, DURATION_DECIMAL_DIGITS, DURATION_FORMATS, DURATION_FORMATS_MAP, getDurationDisplayString, getNumberDisplayString };
