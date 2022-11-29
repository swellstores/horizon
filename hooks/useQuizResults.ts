import type { QuizResultsProducts } from 'components/molecules/QuizResults';
import { getQuizProducts } from 'lib/shop/fetchingFunctions';
import { denullifyArray } from 'lib/utils/denullify';
import type { NextRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useCurrency from 'stores/currency';
import { PURCHASE_OPTION_TYPE } from 'types/shared/products';
import useCurrencySubscription from './useCurrencySubscription';

const useQuizResults = (query: NextRouter['query']) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(
    () => new Map(),
  );
  const [selection, setSelection] = useState<QuizResultsProducts>([]);
  const [selectionSlugs, setSelectionSlugs] = useState<string[]>([]);
  const [activeCurrency] = useCurrency((state) => [state.currency]);

  const { selection: results } = useCurrencySubscription({
    callback: (currency) => getQuizProducts(selectionSlugs, currency),
    defaultData: {
      currency: activeCurrency.code,
      selection,
    },
    currencyGetter: (data) => data.currency,
  });

  const fetchQuizProductsData = useCallback(
    async (productsSlugs: string[]) => {
      if (!productsSlugs.length) return;

      const { selection: productSelection } = await getQuizProducts(
        (productsSlugs as string[]) || [],
        activeCurrency.code,
      );

      const selectedProducts: [string, number][] = denullifyArray(
        productSelection,
      ).map((result) => [
        JSON.stringify({
          productId: result.productId,
          options: result.productOptions.map((option) => ({
            id: option.id,
            valueId: option.values?.[0]?.id,
          })),
          purchaseOption: {
            type: PURCHASE_OPTION_TYPE.STANDARD,
          },
        }),
        1,
      ]);

      setSelection(productSelection);
      setSelectionSlugs(productsSlugs);
      setSelectedProducts(new Map(selectedProducts));
    },
    [activeCurrency],
  );

  // We need to fetch the products data client side based on the slugs in the query params
  // This is needed so we can have the page statically generated
  useEffect(() => {
    if (query?.products && !selectionSlugs.length) {
      const productsSlugs = query.products.toString().split(',') || [];

      fetchQuizProductsData(productsSlugs);
    }

    if (query?.name && customerName !== query?.name) {
      const name = query?.name?.toString() || '';

      setCustomerName(name);
    }
  }, [query, fetchQuizProductsData, customerName, selectionSlugs]);

  return {
    customerName,
    results,
    selectedProducts,
  };
};

export default useQuizResults;
