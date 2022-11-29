import create from 'zustand';
import type { Locale } from 'types/shared/locale';

export const initialLocales: Locale[] = [
  {
    name: 'English',
    code: 'en',
    fallback: null,
    defaultCurrency: 'USD',
  },
  {
    name: 'Spanish',
    code: 'es-ES',
    fallback: null,
    defaultCurrency: 'EUR',
  },
];

interface LocaleState {
  locales: Locale[];
  activeLocale: Locale;
  setLocales: (locales: Locale[]) => void;
  setActiveLocale: (locale: Locale) => void;
}

const useLocaleStore = create<LocaleState>((set) => ({
  activeLocale: initialLocales[0],
  locales: initialLocales,
  setLocales: (locales) => set(() => ({ locales })),
  setActiveLocale: (activeLocale) => set(() => ({ activeLocale })),
}));

export default useLocaleStore;
