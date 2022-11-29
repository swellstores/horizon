import React from 'react';
import { Listbox } from '@headlessui/react';
import useCurrencyStore from 'stores/currency';
import ChevronSmallIcon from 'assets/icons/chevron-down-sm.svg';

export interface CurrencySelectProps {
  className?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ className }) => {
  const [activeCurrency, currencies, setCurrency] = useCurrencyStore(
    (state) => [state.currency, state.currencies, state.setCurrency],
  );

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      {(currencies?.length ?? 0) > 1 ? (
        <Listbox value={activeCurrency} onChange={setCurrency}>
          {({ open }) => (
            <div className="relative inline-block text-primary">
              <Listbox.Button
                className={`inline-flex items-center gap-2 rounded-lg border border-dividers px-4 py-2 text-md font-semibold uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:border-transparent lg:font-medium ${
                  open
                    ? 'rounded-b-[0] bg-background-primary lg:border-dividers'
                    : ''
                }`}>
                {activeCurrency.symbol} {activeCurrency.code}
                <ChevronSmallIcon
                  className={`w-3 transform transition ${
                    open ? '-rotate-180' : 'rotate-0'
                  }`}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute z-50 flex w-full flex-col gap-2 rounded-b-lg border-x border-b border-dividers bg-background-primary px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {currencies?.map((currency) => (
                  <Listbox.Option key={currency.code} value={currency}>
                    {({ active }) => (
                      <span
                        className={`block cursor-pointer rounded-lg px-2 py-1 text-md font-semibold uppercase lg:font-medium ${
                          active ? 'bg-background-secondary' : ''
                        }`}>
                        {currency.symbol} {currency.code}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      ) : (
        <span className="text-md font-semibold uppercase text-primary lg:font-medium">
          {activeCurrency.code}
        </span>
      )}
    </span>
  );
};

export default CurrencySelect;
