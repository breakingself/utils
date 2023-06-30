import { getNumberDisplayString } from '../../src/utils';

test('none-formats', () => {
  const testList = [
    [25, '25'],
    // integer which contains decimal
    [25.00, '25'],
    // float number with digits is 2, 8, 9
    [25.03, '25.03'],
    [25.00000003, '25.00000003'],
    [25.000000003, '25'],
    [0.000001, '0.000001'],
    [1e-7, '0.0000001'],
    [-1e-8, '-0.00000001'],
  ];
  testList.forEach((item) => expect(getNumberDisplayString(item[0])).toBe(item[1]));
});

test('with formats', () => {
  const testList = [
    // number with decimal and thousands
    [2500000000.03, { format: 'number' }, '2500000000.03'],
    [2500000000.03, { format: 'number', decimal: 'comma', thousands: 'dot' }, '2.500.000.000,03'],
    [2500000000.03, { format: 'number', decimal: 'dot', thousands: 'comma' }, '2,500,000,000.03'],
    // negative number with decimal and thousands
    [-800000, { format: 'number', decimal: 'dot', thousands: 'comma' }, '-800,000'],
    [-8800000, { format: 'number', decimal: 'dot', thousands: 'comma' }, '-8,800,000'],
    [-880000, { format: 'dollar', decimal: 'dot', thousands: 'comma' }, '$-880,000.00'],
    // percent with decimal and thousands
    [2500000.1234, { format: 'percent' }, '250000012.34%'],
    [2500000.1234, { format: 'percent', decimal: 'comma', thousands: 'dot' }, '250.000.012,34%'],
    [2500000.1234, { format: 'percent', decimal: 'dot', thousands: 'comma' }, '250,000,012.34%'],
    [-2500000.1234, { format: 'percent', decimal: 'dot', thousands: 'comma' }, '-250,000,012.34%'],
    // percent with default format
    [0.56, { format: 'percent' }, '56%'],
    [0.57, { format: 'percent' }, '57%'],
    [0.58, { format: 'percent' }, '58%'],
    [0.28, { format: 'percent' }, '28%'],
    [-0.28, { format: 'percent' }, '-28%'],
    [0.56000000009, { format: 'percent' }, '56.00000001%'],
    [0.560000000009, { format: 'percent' }, '56%'],
    [1e-7, { format: 'percent' }, '0.00001%'],
    [1e-7, { format: 'yuan' }, '￥0.0000001'],
    [-1e-7, { format: 'yuan' }, '￥-0.0000001'],
    [-1e-8, { format: 'number' }, '-0.00000001'],
    // format is currency_symbol
    [0.56, { format: 'custom_currency', currency_symbol: '%^&' }, '%^&0.56'],
    [-0.56, { format: 'custom_currency', currency_symbol: '%^&' }, '%^&-0.56'],
    // format is currency_symbol and currency_symbol is null
    [0.56, { format: 'custom_currency' }, '0.56'],
  ];
  testList.forEach((item) => {
    expect(getNumberDisplayString(item[0], item[1])).toBe(item[2]);
  });
});

test('with precision', () => {
  const enable_precision = true;
  const testList = [
    [0.1234, { format: 'number', precision: 0, enable_precision }, '0'],
    [0.1234, { format: 'number', precision: 1, enable_precision }, '0.1'],
    [0.1234, { format: 'number', precision: 2, enable_precision }, '0.12'],
    [1e-7, { format: 'number', precision: 2, enable_precision }, '0.00'],
    [0.1234, { format: 'number', precision: 4, enable_precision }, '0.1234'],
    [-0.1234, { format: 'number', precision: 4, enable_precision }, '-0.1234'],
    // percent with precision
    [0.1234, { format: 'percent', precision: 0, enable_precision }, '12%'],
    [0.1234, { format: 'percent', precision: 1, enable_precision }, '12.3%'],
    [0.1234, { format: 'percent', precision: 2, enable_precision }, '12.34%'],
    [0.1234, { format: 'percent', precision: 4, enable_precision }, '12.3400%'],
    [0.0386, { format: 'percent', precision: 0, enable_precision }, '4%'],
    [0.0386, { format: 'percent', precision: 2, enable_precision }, '3.86%'],
    [1e-7, { format: 'percent', precision: 2, enable_precision }, '0.00%'],
    [1e-7, { format: 'yuan', precision: 2, enable_precision }, '￥0.00'],
    [-1e-7, { format: 'yuan', precision: 2, enable_precision }, '￥0.00'],
    [-1e-8, { format: 'number', precision: 2, enable_precision }, '0.00'],
    [0.0386, { format: 'percent', precision: 4, enable_precision }, '3.8600%'],
    [-0.0386, { format: 'percent', precision: 4, enable_precision }, '-3.8600%'],
  ];
  testList.forEach((item) => {
    expect(getNumberDisplayString(item[0], item[1])).toBe(item[2]);
  });
});
