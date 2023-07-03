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

/**
 * exact division
 */
var divide = function divide(numLeft, numRight) {
  var num1Changed = float2Fixed(numLeft);
  var num2Changed = float2Fixed(numRight);

  // fix: e.g. 10 ** -4 = 0.00009999999999999999，use 'strip' to fix
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(numRight) - digitLength(numLeft))));
};

export { divide as NPdivide, minus as NPminus };
