import { getCurrencyFromSettings } from './settings';

describe('getCurrencyFromSettings', () => {
  it('should return the correct currency object with defined store.currencies and store.currency', () => {
    const settings = {
      store: {
        currencies: [
          { code: 'USD', symbol: '$' },
          { code: 'EUR', symbol: '€' },
        ],
        currency: 'EUR',
      },
    };
    const result = getCurrencyFromSettings(settings);

    expect(result).toEqual({ code: 'EUR', symbol: '€' });
  });

  it('should return the default currency object with undefined store.currency', () => {
    const settings = {
      store: {
        currencies: [
          { code: 'USD', symbol: '$' },
          { code: 'EUR', symbol: '€' },
        ],
      },
    };
    const result = getCurrencyFromSettings(settings);

    expect(result).toEqual({ code: 'USD' });
  });

  it('should return the default currency object when store.currencies is undefined', () => {
    const settings = {
      store: {
        currency: 'EUR',
      },
    };
    const result = getCurrencyFromSettings(settings);

    expect(result).toEqual({ code: 'EUR' });
  });

  it('should return the default currency object when store.currencies and store.currency are undefined', () => {
    const settings = {
      store: {},
    };
    const result = getCurrencyFromSettings(settings);

    expect(result).toEqual({ code: 'USD' });
  });
});
