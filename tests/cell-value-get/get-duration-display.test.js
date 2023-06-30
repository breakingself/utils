import { getDurationDisplayString } from '../../src/utils';

test('none formats', () => {
  expect(getDurationDisplayString(60)).toBe('0:01');
  expect(getDurationDisplayString(0)).toBe('0:00');
  expect(getDurationDisplayString()).toBe('');
});

test('with formats', () => {
  const formats = { duration_format: 'h:mm:ss' };
  expect(getDurationDisplayString(60, formats)).toBe('0:01:00');
  expect(getDurationDisplayString(0, formats)).toBe('0:00');
  expect(getDurationDisplayString('', formats)).toBe('');
});
