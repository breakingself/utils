import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { DURATION_FORMATS_MAP, DURATION_FORMATS, DURATION_DECIMAL_DIGITS } from '../../constants/column-format.js';

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

export { getDurationDisplayString };
