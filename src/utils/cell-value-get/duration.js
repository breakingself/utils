import {
  DURATION_DECIMAL_DIGITS, DURATION_FORMATS, DURATION_FORMATS_MAP,
} from '../../constants/column-format';

const DURATION_ZERO_DISPLAY = {
  [DURATION_FORMATS_MAP.H_MM]: '0:00',
  [DURATION_FORMATS_MAP.H_MM_SS]: '0:00',
  [DURATION_FORMATS_MAP.H_MM_SS_S]: '0:00.0',
  [DURATION_FORMATS_MAP.H_MM_SS_SS]: '0:00.00',
  [DURATION_FORMATS_MAP.H_MM_SS_SSS]: '0:00.000',
};

const getMathRoundedDuration = (num, duration_format) => {
  const decimalDigits = DURATION_DECIMAL_DIGITS[duration_format];
  if (decimalDigits < 1) {
    return num;
  }
  const ratio = 10 ** decimalDigits;
  return Math.round(num * ratio) / ratio;
};

const getDurationDecimalSuffix = (duration_format, decimal) => {
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
const getDurationDisplayString = (duration, formats) => {
  if (!duration && duration !== 0) return '';
  let { duration_format } = formats || {};
  duration_format = duration_format || DURATION_FORMATS_MAP.H_MM;
  if (DURATION_FORMATS.findIndex((format) => format.type === duration_format) < 0) {
    return '';
  }
  if (duration === 0) {
    return DURATION_ZERO_DISPLAY[duration_format];
  }
  const includeDecimal = duration_format.indexOf('.') > -1;
  let positiveValue = Math.abs(duration);
  if (!includeDecimal) {
    positiveValue = Math.round(positiveValue);
  }

  positiveValue = getMathRoundedDuration(positiveValue, duration_format);
  const decimalParts = String(positiveValue).split('.');
  const decimalPartsLen = decimalParts.length;
  let decimal = 0;
  if (decimalPartsLen > 1) {
    decimal = decimalParts[decimalPartsLen - 1];
    decimal = decimal ? decimal - 0 : 0;
  }
  const decimalDigits = DURATION_DECIMAL_DIGITS[duration_format];
  const decimalSuffix = getDurationDecimalSuffix(duration_format, decimal);
  const hours = parseInt(positiveValue / 3600, 10);
  let minutes = parseInt((positiveValue - hours * 3600) / 60, 10);
  let displayString = duration < 0 ? '-' : '';
  if (duration_format === DURATION_FORMATS_MAP.H_MM) {
    displayString += `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
    return displayString;
  }
  let seconds = Number.parseFloat(
    (positiveValue - hours * 3600 - minutes * 60).toFixed(decimalDigits),
  );
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  displayString += `${hours}:${minutes}:${seconds}${decimalSuffix}`;
  return displayString;
};

export { getDurationDisplayString };
