import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { mapProducts } from 'lib/utils/products';
import { denullifyArray } from 'lib/utils/denullify';
import useCurrencyStore from 'stores/currency';
import type { ProductData } from 'types/shared/products';
import getGQLClient from 'lib/graphql/client';

const DEBOUNCE_INTERVAL = 500;

export default function useProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ProductData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const activeCurrency = useCurrencyStore((state) => state.currency);
  const { current: client } = useRef(getGQLClient());

  async function fetchProducts(search: string) {
    if (search) {
      setIsSearching(true);
      client
        .searchProducts({ searchTerm: search, currency: activeCurrency.code })
        .then((res) => {
          const results = mapProducts(
            denullifyArray(res.data.products?.results),
          );
          setResults(results);
          setIsSearching(false);
        });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }

  const debounced = useDebouncedCallback(fetchProducts, DEBOUNCE_INTERVAL);

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    debounced(value);
  };

  function clear() {
    setSearchTerm('');
    setResults([]);
  }

  return {
    searchTerm,
    onSearchTermChange,
    isSearching,
    results,
    clear,
  };
}
