import { getFloatNumber } from '../src/utils/number';

test('parse string to number with number format.', () => {
  const format = 'number';
  expect(getFloatNumber('', format)).toBe(null); // null
  expect(getFloatNumber({ a: 10 }, format)).toBe(null); // null
  expect(getFloatNumber('dtable-utils', format)).toBe(null); // not contains number
  expect(getFloatNumber(0, format)).toBe(0); // 0
  expect(getFloatNumber(10, format)).toBe(10); // number
  expect(getFloatNumber('10', format)).toBe(10); // positive integer
  expect(getFloatNumber('-10', format)).toBe(-10); // negative integer
  expect(getFloatNumber('0', format)).toBe(0); // '0'
  expect(getFloatNumber('1.2', format)).toBe(1.2); // positive float
  expect(getFloatNumber('-1.2', format)).toBe(-1.2); // positive float
  expect(getFloatNumber('10dtable', format)).toBe(10); // contains both string and number
  expect(getFloatNumber('-dtable10', format)).toBe(-10); // contains both string and number
  expect(getFloatNumber('1-2table', format)).toBe(1); // start with number and split with '-'
  expect(getFloatNumber('1dtable.dtable-2', format)).toBe(1); // the dot not after the number
  expect(getFloatNumber('-1.d2table.1d0table2', format)).toBe(-1.2); // extract number, '-', ',' in sequence from given string
});

test('parse string to number with percent format.', () => {
  const format = 'percent';
  expect(getFloatNumber('12.35%', format)).toBe(0.1235); // contains '%'
  expect(getFloatNumber('12.35', format)).toBe(0.1235); // not contains '%'
  expect(getFloatNumber('12.35%.23', format)).toBe(0.1235);
  expect(getFloatNumber('12.35.23%.23%', format)).toBe(0.1235);
});
