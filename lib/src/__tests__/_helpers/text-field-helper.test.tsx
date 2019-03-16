import { makeMaskFromFormat, maskedDateFormatter } from '../../_helpers/text-field-helper';

const refuse = /[^\d]+/gi;
describe('test-field-helper', () => {
  test('maskedDateFormatter', () => {
    const formatterFn = maskedDateFormatter('__/__/____', '_', refuse);

    expect(formatterFn('21')).toBe('21/__/____');
    expect(formatterFn('21-12-21')).toBe('21/12/21__');
    expect(formatterFn('21-12-2010')).toBe('21/12/2010');
  });

  test('makeMaskFromFormat', () => {
    expect(makeMaskFromFormat('yyyy-mm-dd', '_')).toBe('____-__-__');
    expect(makeMaskFromFormat('YYYY/LL/DD', '_')).toBe('____/__/__');
    expect(makeMaskFromFormat('yyyy-mm-dd mm:hh', '_')).toBe('____-__-__ __:__');
  });
});
