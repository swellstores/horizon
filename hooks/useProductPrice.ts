import { useMemo } from 'react';
import useCurrencyStore from 'stores/currency';
import type { CurrencyPrice } from 'types/shared/currency';

export default function useProductPrice(
  productPrice?: number,
  productCurrency?: string,
  currencyPrices?: CurrencyPrice[],
) {
  const [activeCurrency, formatPrice] = useCurrencyStore((state) => [
    state.currency,
    state.formatPrice,
  ]);

  const priceInCurrency = useMemo(
    () =>
      currencyPrices?.find((price) => price.currency === activeCurrency.code),
    [activeCurrency.code, currencyPrices],
  );

  const selectedPrice = useMemo(
    () =>
      priceInCurrency?.price
        ? priceInCurrency.price
        : productCurrency === activeCurrency.code
        ? productPrice
        : null,
    [
      activeCurrency.code,
      productCurrency,
      productPrice,
      priceInCurrency?.price,
    ],
  );

  const formattedPrice = useMemo(
    () => (selectedPrice ? formatPrice(selectedPrice) : null),
    [formatPrice, selectedPrice],
  );

  return {
    formattedPrice,
  };
}
