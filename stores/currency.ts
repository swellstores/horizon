import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Currency } from 'types/shared/currency';

export const initialCurrencies: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
  },
  {
    code: 'EUR',
    symbol: '€',
  },
];

const useCurrency = create(
  subscribeWithSelector((set) => ({
    currency: initialCurrencies[0],
    currencies: initialCurrencies,
    setCurrency: (currency: Currency) => set(() => ({ currency })),
    setCurrencies: (currencies: Currency[]) => set(() => ({ currencies })),
    formatPrice: new Intl.NumberFormat(undefined, {
      currency: 'USD',
      style: 'currency',
    }).format,
  })),
);

useCurrency.subscribe(
  (state) => state.currency,
  (currency) => {
    useCurrency.setState({
      formatPrice: new Intl.NumberFormat(undefined, {
        currency: currency.code,
        style: 'currency',
      }).format,
    });
  },
);

export default useCurrency;
