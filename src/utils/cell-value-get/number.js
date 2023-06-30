import { NPminus } from '../../lib/number-precision';
import { DEFAULT_NUMBER_FORMAT } from '../../constants/column-format';
import { getDurationDisplayString } from './duration';

const separatorMap = {
  comma: ',',
  dot: '.',
  no: '',
  space: ' ',
};

/**
 * removeZerosFromEnd('0.0100') // '0.01'
 * @param {string} sNumber string of numbers
 */
const removeZerosFromEnd = (sNumber) => {
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
const getDecimalDigitsFromNumber = (number) => {
  if (Number.isInteger(number)) {
    return 0;
  }
  const decimalPart = String(number).split('.')[1];
  const digitsLength = decimalPart ? decimalPart.length : 8;
  return digitsLength > 8 ? 8 : digitsLength;
};

const toThousands = (number, { formats, isCurrency = true }) => {
  const {
    decimal = 'dot', thousands = 'no', precision = 2, enable_precision = false,
  } = formats || {};

  // handle numbers in scientific notation
  if (String(number).includes('e')) {
    if (number < 1 && number > -1) {
      // 1.convert to non-scientific number
      let numericString = number.toFixed(enable_precision ? precision : 8);

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

  const decimalString = separatorMap[decimal];
  const thousandsString = separatorMap[thousands];
  const decimalDigits = enable_precision ? precision : getDecimalDigitsFromNumber(number);
  const floatNumber = parseFloat(number.toFixed(decimalDigits));
  const isMinus = floatNumber < 0;
  let integer = Math.trunc(floatNumber);

  // format decimal part
  let decimalPart = String(Math.abs(NPminus(floatNumber, integer)).toFixed(decimalDigits)).slice(1);
  if (!enable_precision) {
    decimalPart = removeZerosFromEnd(decimalPart);
  }

  if (isCurrency) {
    if (!enable_precision) {
      decimalPart = decimalPart.length === 2
        ? decimalPart = decimalPart.padEnd(3, '0')
        : (decimalPart.substring(0, 3) || '.').padEnd(3, '0');
    }
  }
  decimalPart = decimalPart.replace(/./, decimalString);

  // format integer part
  const integerNumbers = [];
  let counter = 0;
  integer = Math.abs(integer).toString();
  for (let i = integer.length - 1; i > -1; i--) {
    counter += 1;
    integerNumbers.unshift(integer[i]);
    if (!(counter % 3) && i !== 0) {
      integerNumbers.unshift(thousandsString);
    }
  }

  return `${isMinus ? '-' : ''}${integerNumbers.join('')}${decimalPart}`;
};

/**
 * format number to display
 * @param {number} number e.g. 1, -2, 3.3
 * @param {object} formats { format, decimal, ... }
 */
const getNumberDisplayString = (number, formats) => {
  const type = Object.prototype.toString.call(number);
  if (type !== '[object Number]') {
    // return formula internal errors directly.
    if (type === '[object String]' && number.startsWith('#')) {
      return number;
    }
    return '';
  }

  if (isNaN(number) || number === Infinity || number === -Infinity) return String(number);

  // formats: old version maybe 'null'
  const { format = DEFAULT_NUMBER_FORMAT } = formats || {};
  switch (format) {
    case 'number': {
      return toThousands(number, { formats, isCurrency: false });
    }
    case 'percent': {
      return `${toThousands(Number.parseFloat((number * 100).toFixed(8)), { formats, isCurrency: false })}%`;
    }
    case 'yuan': {
      return `￥${toThousands(number, { formats })}`;
    }
    case 'dollar': {
      return `$${toThousands(number, { formats })}`;
    }
    case 'euro': {
      return `€${toThousands(number, { formats })}`;
    }
    case 'duration': {
      return getDurationDisplayString(number, formats);
    }
    case 'custom_currency': {
      if (formats.currency_symbol_position === 'after') {
        return `${toThousands(number, { formats })}${formats.currency_symbol || ''}`;
      }
      return `${formats.currency_symbol || ''}${toThousands(number, { formats })}`;
    }
    default: {
      return String(number);
    }
  }
};

export { getNumberDisplayString };
