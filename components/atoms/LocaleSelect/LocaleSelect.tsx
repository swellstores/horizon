import React from 'react';
import { useRouter } from 'next/router';
import { Listbox } from '@headlessui/react';
import ChevronSmallIcon from 'assets/icons/chevron-down-sm.svg';
import useLocaleStore from 'stores/locale';
import type { Locale } from 'types/shared/locale';

export interface LocaleSelectProps {
  className?: string;
}

const LocaleSelect: React.FC<LocaleSelectProps> = ({ className }) => {
  const [activeLocale, locales] = useLocaleStore((state) => [
    state.activeLocale,
    state.locales,
  ]);

  const router = useRouter();
  const { pathname, asPath, query } = router;

  function changeLocale(nextLocale: Locale) {
    router.push({ pathname, query }, asPath, { locale: nextLocale.code });
  }

  if (locales?.length < 2) {
    return null;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <Listbox value={activeLocale} onChange={changeLocale}>
        {({ open }) => (
          <div className="relative inline-block text-primary">
            <Listbox.Button
              className={`inline-flex items-center gap-2 rounded-lg border border-dividers px-4 py-2 text-md font-semibold uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:border-transparent lg:font-medium ${
                open
                  ? 'rounded-b-[0] bg-background-primary lg:border-dividers'
                  : ''
              }`}>
              {activeLocale?.name}
              <ChevronSmallIcon
                className={`w-3 transform transition ${
                  open ? '-rotate-180' : 'rotate-0'
                }`}
              />
            </Listbox.Button>
            <Listbox.Options className="absolute z-50 flex w-full flex-col gap-2 rounded-b-lg border-x border-b border-dividers bg-background-primary px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              {locales?.map((locale) => (
                <Listbox.Option key={locale.code} value={locale}>
                  {({ active }) => (
                    <span
                      className={`block cursor-pointer rounded-lg px-2 py-1 text-md font-semibold uppercase lg:font-medium ${
                        active ? 'bg-background-secondary' : ''
                      }`}>
                      {locale.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </span>
  );
};

export default LocaleSelect;
