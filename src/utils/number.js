import { NPdivide } from '../lib/number-precision';

/**
 * parse string to number
 * @param {string} sNum
 * @param {*} format
 * @returns float number
 */
const getFloatNumber = (sNum, format) => {
  if (!sNum && sNum !== 0) {
    return null;
  }
  const type = typeof sNum;
  if (type !== 'string') {
    return type === 'number' ? sNum : null;
  }
  const parsedNum = parseFloat(sNum.replace(/[^.-\d]/g, ''));
  if (format === 'percent' && !isNaN(parsedNum)) {
    return NPdivide(parsedNum, 100);
  }
  return isNaN(parsedNum) ? null : parsedNum;
};

export {
  getFloatNumber,
};
