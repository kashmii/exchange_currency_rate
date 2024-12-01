import { isValidDateFormat, isDateInRange } from '../../src/utils/dateUtils';

describe('isValidDateFormat', () => {
  test('should return true when the date string is in the correct format', () => {
    expect(isValidDateFormat('2024-01-01')).toBe(true);
  });

  test('should return false when the date string is not in the correct format', () => {
    expect(isValidDateFormat('2024-1-1')).toBe(false);
    expect(isValidDateFormat('2024-01-01T00:00:00.000Z')).toBe(false);
    expect(isValidDateFormat('2024-01-01T00:00:00')).toBe(false);
    expect(isValidDateFormat('2024-01-01 00:00:00')).toBe(false);
    expect(isValidDateFormat('2024/01/01')).toBe(false);
    expect(isValidDateFormat('01-01-2024')).toBe(false);
    expect(isValidDateFormat('01/01/2024')).toBe(false);
    expect(isValidDateFormat('2024-01-32')).toBe(false);
    expect(isValidDateFormat('2024-13-01')).toBe(false);
    expect(isValidDateFormat('2024-00-01')).toBe(false);
    expect(isValidDateFormat('2024-01-00')).toBe(false);
  });
});

describe('isDateInRange', () => {
  test('should return true when the date is within the range', () => {
    expect(isDateInRange('2024-01-01')).toBe(true);
    expect(isDateInRange('1999-01-01')).toBe(true);
    expect(isDateInRange(new Date().toISOString().split('T')[0])).toBe(true);
  });

  test('should return false when the date is not within the range', () => {
    expect(isDateInRange('1998-12-31')).toBe(false);

    expect(
      isDateInRange(new Date('1998-12-31').toISOString().split('T')[0])
    ).toBe(false);

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 1);
    const tomorrow = baseDate;
    expect(isDateInRange(tomorrow.toString())).toBe(false);

    expect(
      isDateInRange(tomorrow.toISOString().split('T')[0] + 'T00:00:00.000Z')
    ).toBe(false);
  });
});
