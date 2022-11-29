import { parseTextWithVariables } from './text';

describe('parseTextWithVariables', () => {
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
