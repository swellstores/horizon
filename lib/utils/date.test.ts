import { formatDateToLocale, formatDateToMonthYear } from './date';

const MINUTE = 60000;
const ENGLISH_LOCALE = 'en';

const defaultLocale = Intl.DateTimeFormat().resolvedOptions().locale;
const invalidDate = new Date('0-0-0-0');

// Get the timezone offset to create timezone-independent dates when formatting
const timezoneOffset = new Date().getTimezoneOffset() * MINUTE;

const date = new Date(new Date('2022-01-10').getTime() + timezoneOffset);
const date2 = new Date(new Date('2020-10-31').getTime() + timezoneOffset);

describe('Date formatting utils', () => {
  describe('formatDateToMonthYear', () => {
    it('returns an empty string if the date is invalid', () => {
      expect(formatDateToMonthYear(invalidDate)).toBe('');
    });

    it('returns the correct date', () => {
      expect(formatDateToMonthYear(date, ENGLISH_LOCALE)).toBe('January, 2022');
      expect(formatDateToMonthYear(date2, ENGLISH_LOCALE)).toBe(
        'October, 2020',
      );
    });

    it('formats the date with the specified locale', () => {
      expect(formatDateToMonthYear(date, 'pt')).toBe('janeiro, 2022');
      expect(formatDateToMonthYear(date, 'es')).toBe('enero, 2022');
    });

    it('falls back to the default locale if no locale is specified', () => {
      const resultWithNoLocale = formatDateToMonthYear(date);
      const resultWithDefaultLocale = formatDateToMonthYear(
        date,
        defaultLocale,
      );

      expect(resultWithNoLocale).toBe(resultWithDefaultLocale);
    });

    it('falls back to the default locale if the specified locale is invalid', () => {
      const resultWithInvalidLocale = formatDateToMonthYear(date, 'invalid');
      const resultWithDefaultLocale = formatDateToMonthYear(
        date,
        defaultLocale,
      );

      expect(resultWithInvalidLocale).toBe(resultWithDefaultLocale);
    });
  });

  describe('formatDateToLocale', () => {
    it('returns an empty string if the date is invalid', () => {
      expect(formatDateToLocale(invalidDate)).toBe('');
    });

    it('returns the correct date', () => {
      expect(formatDateToLocale(date, ENGLISH_LOCALE)).toBe('Jan 10, 2022');
      expect(formatDateToLocale(date2, ENGLISH_LOCALE)).toBe('Oct 31, 2020');
    });

    it('formats the date with the specified locale', () => {
      expect(formatDateToLocale(date, 'pt')).toBe('10 de jan. de 2022');
      expect(formatDateToLocale(date, 'es')).toBe('10 ene 2022');
    });

    it('falls back to the default locale if no locale is specified', () => {
      const resultWithNoLocale = formatDateToLocale(date);
      const resultWithDefaultLocale = formatDateToLocale(date, defaultLocale);

      expect(resultWithNoLocale).toBe(resultWithDefaultLocale);
    });

    it('falls back to the default locale if the specified locale is invalid', () => {
      const resultWithInvalidLocale = formatDateToLocale(date, 'invalid');
      const resultWithDefaultLocale = formatDateToLocale(date, defaultLocale);

      expect(resultWithInvalidLocale).toBe(resultWithDefaultLocale);
    });
  });
});
