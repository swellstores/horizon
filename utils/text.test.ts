import { fallbackString, parseTextWithVariables } from './text';

describe('text utils', () => {
  describe('#parseTextWithVariables', () => {
    it('returns the original text when no matching variables are present in the text', () => {
      const text = 'Hi there {name}, how is weather in {city}?';
      const variables = { temperature: '30C' };

      const parsedText = parseTextWithVariables(text, variables);

      expect(parsedText).toBe(text);
    });

    it('returns new text with variables replaced by their values', () => {
      const text = 'Hi there {name}, how is weather in {city}?';
      const variables = { name: 'John', city: 'Paris' };

      const parsedText = parseTextWithVariables(text, variables);

      expect(parsedText).toBe('Hi there John, how is weather in Paris?');
    });
  });

  describe('#fallbackString', () => {
    it('returns the first argument when it is a string', () => {
      const text = fallbackString('original', 'fallback');

      expect(text).toBe('original');
    });

    it('returns the fallback argument when first argument is null or undefined', () => {
      const text = fallbackString(null, 'fallback');

      expect(text).toBe('fallback');

      const otherText = fallbackString(undefined, 'fallback');

      expect(otherText).toBe('fallback');
    });

    it('returns empty string when first argument is null or undefined and fallback is not provided', () => {
      const text = fallbackString(null);

      expect(text).toBe('');
    });
  });
});
