import _typeof from '@babel/runtime/helpers/typeof';
import { NPdivide as divide } from '../lib/number-precision/index.js';

/**
 * parse string to number
 * @param {string} sNum
 * @param {*} format
 * @returns float number
 */
var getFloatNumber = function getFloatNumber(sNum, format) {
  if (!sNum && sNum !== 0) {
    return null;
  }
  var type = _typeof(sNum);
  if (type !== 'string') {
    return type === 'number' ? sNum : null;
  }
  var parsedNum = parseFloat(sNum.replace(/[^.-\d]/g, ''));
  if (format === 'percent' && !isNaN(parsedNum)) {
    return divide(parsedNum, 100);
  }
  return isNaN(parsedNum) ? null : parsedNum;
};

export { getFloatNumber };
