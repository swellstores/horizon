import create from 'zustand';
import type { Locale } from 'types/shared/locale';

interface LocaleState {
  locales: Locale[];
  activeLocale: Locale | null;
  setLocales: (locales: Locale[]) => void;
  setActiveLocale: (locale: Locale) => void;
}

const useLocaleStore = create<LocaleState>((set) => ({
  activeLocale: null,
  locales: [],
  setLocales: (locales) => set(() => ({ locales })),
  setActiveLocale: (activeLocale) => set(() => ({ activeLocale })),
}));

export default useLocaleStore;
