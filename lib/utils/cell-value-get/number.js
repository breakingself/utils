import { NPminus as minus } from '../../lib/number-precision/index.js';
import { DEFAULT_NUMBER_FORMAT } from '../../constants/column-format.js';
import { getDurationDisplayString } from './duration.js';

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

export { getNumberDisplayString };
