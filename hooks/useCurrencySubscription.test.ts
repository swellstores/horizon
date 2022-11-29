import { renderHook, act } from '@testing-library/react-hooks';
import useCurrency from 'stores/currency';
import useCurrencySubscription from './useCurrencySubscription';

const callback = async (currency: string) => {
  return {
    currency,
    items: [
      {
        id: '1',
        currency,
      },
      {
        id: '2',
        currency,
      },
    ],
  };
};

const currencyGetter = (data: Record<string, unknown>) =>
  data.currency as string;

describe('useCurrencySubscription', () => {
  it('renders the hook correctly', async () => {
    const { result: useCurrencySubscriptionResult } = renderHook(() =>
      useCurrencySubscription({
        defaultData: {
          currency: 'USD',
          items: [
            {
              id: '1',
              currency: 'USD',
            },
            {
              id: '2',
              currency: 'USD',
            },
          ],
        },
        callback,
        currencyGetter,
      }),
    );
    expect(useCurrencySubscriptionResult.current.currency).toBe('USD');
  });

  it('updates the initial currency with the current currency from the store', async () => {
    const { result: useCurrencySubscriptionResult, waitForNextUpdate } =
      renderHook(() =>
        useCurrencySubscription({
          defaultData: {
            // The store is initialized with 'USD' as the currency. So this should be updated to 'USD' after the hook is called.
            currency: 'EUR',
            items: [
              {
                id: '1',
                currency: 'EUR',
              },
              {
                id: '2',
                currency: 'EUR',
              },
            ],
          },
          callback,
          currencyGetter,
        }),
      );

    // Wait for the hook to update the currency.
    await waitForNextUpdate();

    expect(useCurrencySubscriptionResult.current.currency).toBe('USD');
    expect(useCurrencySubscriptionResult.current.items[0].currency).toBe('USD');
  });

  it('allows for any key to be used as currency', async () => {
    const randomKey = Math.random().toString(36).substring(7);

    const { result: useCurrencySubscriptionResult } = renderHook(() =>
      useCurrencySubscription({
        defaultData: {
          [randomKey]: 'USD',
        },
        callback: async (currency: string) => {
          return {
            [randomKey]: currency,
          };
        },
        currencyGetter: (data: Record<string, unknown>) =>
          data[randomKey] as string,
      }),
    );

    expect(useCurrencySubscriptionResult.current[randomKey]).toBe('USD');
  });

  it('updates the data when the currency changes on the store', async () => {
    const { result: setCurrency } = renderHook(() =>
      useCurrency((store) => store.setCurrency),
    );

    const { result: useCurrencySubscriptionResult, waitForNextUpdate } =
      renderHook(() =>
        useCurrencySubscription({
          defaultData: {
            currency: 'USD',
            items: [
              {
                id: '1',
                currency: 'USD',
              },
              {
                id: '2',
                currency: 'USD',
              },
            ],
          },
          callback,
          currencyGetter,
        }),
      );

    expect(useCurrencySubscriptionResult.current.currency).toEqual('USD');
    expect(useCurrencySubscriptionResult.current.items[0].currency).toBe('USD');
    act(() => {
      setCurrency.current({
        code: 'EUR',
        symbol: '€',
      });
    });
    await waitForNextUpdate();

    expect(useCurrencySubscriptionResult.current.currency).toEqual('EUR');
    expect(useCurrencySubscriptionResult.current.items[0].currency).toBe('EUR');
  });
});
