import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Transition } from '@headlessui/react';
import Input from 'components/atoms/Input';
import ProductCount from 'components/atoms/ProductCount';
import ProductPreviewCard from 'components/atoms/ProductPreviewCard';
import CloseIcon from 'assets/icons/close.svg';
import useProductSearch from 'hooks/useProductSearch';
import useClassNames from 'hooks/useClassNames';
import ProductPreviewCardSimple from 'components/atoms/ProductPreviewCard/ProductPreviewCardSimple';

// TODO: i18n
const placeholderLabel = 'Search by product name or SKU';

interface SearchMenuProps {
  closeMenu: () => void;
  show: boolean;
  openDelay: number | undefined;
}

const SearchMenu: React.FC<SearchMenuProps> = ({
  closeMenu,
  show,
  openDelay,
}) => {
  const { searchTerm, onSearchTermChange, isSearching, results, clear } =
    useProductSearch();
  const hideProducts = useMemo(
    () => !results.length && !isSearching,
    [isSearching, results.length],
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (!show) {
      timeout = setTimeout(() => clear(), openDelay ?? 300);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [clear, openDelay, show]);

  const productsEl = useRef<HTMLUListElement>(null);

  const getHeight = useCallback(() => {
    if (productsEl.current && show && results.length > 2) {
      const maxHeight =
        window.innerHeight - productsEl.current.getBoundingClientRect().top;

      productsEl.current.style.maxHeight = `${maxHeight}px`;

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [results, show]);

  useEffect(() => {
    getHeight();

    window.addEventListener('resize', getHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', getHeight);
    };
  }, [getHeight]);

  const searchMenuClassNames = useClassNames(
    'mx-auto max-w-screen-3xl px-4 pt-2 lg:px-14 lg:pt-4',
    {
      'pb-6 lg:pb-10': hideProducts,
    },
  );

  const productsClassNames = useClassNames(
    'mt-4 grid w-full grid-cols-2 gap-4 overflow-y-auto lg:grid-cols-4 lg:gap-y-8 lg:gap-x-6',
    {
      hidden: hideProducts,
      'pb-6 lg:pb-10': !hideProducts,
    },
  );

  const productCountClassNames = useClassNames('mt-4 lg:mt-8', {
    hidden: hideProducts,
  });

  return (
    <div className="relative z-[-1]">
      <Transition
        show={show}
        className="shadow-md absolute w-full bg-background-primary transition-transform"
        enter={`ease-out duration-[600ms] ${
          openDelay ? 'delay-[1000ms] lg:delay-[300ms]' : 'delay-[300ms]'
        }`}
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="ease-in delay-[200ms] duration-[400ms]"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full">
        <div className={searchMenuClassNames}>
          <form className="flex w-full items-center">
            <Input
              value={searchTerm}
              onChange={onSearchTermChange}
              placeholder={placeholderLabel}
              icon="material-symbols:search-rounded"
              className="flex-auto"
            />
            <button
              className="ml-6 hidden lg:inline-block"
              type="button"
              onClick={closeMenu}>
              <CloseIcon className="h-5 w-5 text-primary" />
            </button>
          </form>
          <ProductCount
            count={results.length}
            className={productCountClassNames}
          />
          <ul ref={productsEl} className={productsClassNames}>
            {isSearching
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <li key={i}>
                      <ProductPreviewCard loading product={undefined} />
                    </li>
                  ))
              : results.map((product) => (
                  <li key={product.id}>
                    <ProductPreviewCardSimple
                      className="animate-fade-in duration-75"
                      product={product}
                    />
                  </li>
                ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default SearchMenu;
