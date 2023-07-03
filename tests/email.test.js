import { isValidEmail } from '../src/utils/email';

test('validate email.', () => {
  expect(isValidEmail('qiang.xiao@seafile.com')).toBe(true);
  expect(isValidEmail('qiang-xiao@seafile.com')).toBe(true);
  expect(isValidEmail('qiang_xiao@seafile.com')).toBe(true);
  expect(isValidEmail('qiang+xiao@seafile.com')).toBe(false);
  expect(isValidEmail('qiang.xiao@seafile.')).toBe(false);
  expect(isValidEmail('qiang.xiao@.com')).toBe(false);
  expect(isValidEmail('qiang.xiaoseafile.com')).toBe(false);
});
